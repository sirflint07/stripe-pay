import { httpAction } from "./_generated/server";
import { httpRouter } from "convex/server";
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { api } from "./_generated/api";
import stripe from '../lib/stripe';
import resend from '../lib/resend';
import WelcomeEmail from '../components/emails/WelcomeEmail'




const http = httpRouter();

const clerkWebhook = httpAction(async (ctx, request) => {
    const webHookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webHookSecret) {
        console.error("CLERK_WEBHOOK_SECRET is missing");
        return new Response("Webhook secret not configured", { status: 500 });
    }

  
    const svix_id = request.headers.get('svix-id');
    const svix_signature = request.headers.get('svix-signature');
    const svix_timestamp = request.headers.get('svix-timestamp');

    if (!svix_id || !svix_signature || !svix_timestamp) {
        console.error("Missing Svix headers");
        return new Response('Missing Svix headers', { status: 400 });
    }

   
    const payload = await request.text();
    
    const wh = new Webhook(webHookSecret);
    let evt: WebhookEvent;

    try {
        evt = wh.verify(payload, {
            'svix-id': svix_id,
            'svix-signature': svix_signature,
            'svix-timestamp': svix_timestamp
        }) as WebhookEvent;
    } catch (err) {
        console.error('Webhook verification failed:', err);
        return new Response('Invalid signature', { status: 400 });
    }

   
    if (evt.type === 'user.created') {
        console.log('Processing user.created event:', evt.data);
        
        try {
            const { id, email_addresses, first_name, last_name } = evt.data;
            const email = email_addresses[0]?.email_address;
            
            if (!email) {
                console.error('No email address found');
                return new Response('No email address found', { status: 400 });
            }

            const name = `${first_name || ''} ${last_name || ''}`.trim();
            
            // Create Stripe customer
            const customer = await stripe.customers.create({
                email,
                name: name || undefined,
                metadata: { clerkId: id }
            });

            console.log('Created Stripe customer:', customer.id);
            
            // Create user in Convex
            const result = await ctx.runMutation(api.users.createUser, {
                email,
                name,
                clerkId: id,
                stripeCustomerId: customer.id
            });

           if (process.env.NODE_ENV === 'development') {
             await resend.emails.send({
                from: 'CourseKindom <onboarding@resend.dev>',
                to: email,
                subject: 'Welcome to CourseKindom!',
                react: WelcomeEmail({ name, url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses` })
            })
           }

            console.log('Created Convex user:', result);
            
            return new Response('User created successfully', { status: 200 });
        } catch (error) {
            console.error('Error processing user.created:', error);
            return new Response('Error processing user creation', { status: 500 });
        }
    }

    return new Response('Event type not handled', { status: 200 });
});

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: clerkWebhook
});

export default http;

// WelcomeEmail({ name, url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses` })