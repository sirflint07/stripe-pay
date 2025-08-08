import { httpAction } from "./_generated/server";
import { httpRouter } from "convex/server";
import {Webhook} from 'svix';
import { WebhookEvent} from '@clerk/nextjs/server';
import { api } from "./_generated/api";
import stripe from '../lib/stripe'

const http = httpRouter()

const clerkWebhook = httpAction(async (ctx, request) => {
    const webHookSecret = process.env.CLERK_SIGNIN_SECRET

    if (!webHookSecret) {
        throw new Error("Missing the CLERK_WEBHOOK_SECRET")
    }

    const svix_id = request.headers.get('svix-id')
    const svix_signature = request.headers.get('svix-signature')
    const svix_timestamps =  request.headers.get('svix-timestamps')

    if (!svix_id || !svix_signature || !svix_timestamps) {
        return new Response('Error occured, unale to get svix headers', {status: 400})
    }

    const payload =  await request.json()
    const body =  JSON.stringify(payload)

    const hook = new Webhook(webHookSecret)

    let event: WebhookEvent;

    try {
        event = hook.verify(body, {
        "svix-id": svix_id,
        "svix-signature": svix_signature,
        "svix-timestamps": svix_timestamps
    }) as WebhookEvent
    } catch (error) {
        console.error("Error verifying webhook:", error);
        return new Response('Error verifying webhook', {status: 400})
    }

    const eventType = event.type;

    if (eventType === "user.created") {
        const {id, email_addresses, first_name, last_name} = event.data;
        const email = email_addresses[0]?.email_address
        const name =`${first_name || ""} ${last_name || ""}`.trim()

        try {
            const customer = await stripe.customers.create({
                email,
                name,
                metadata: {clerkId: id}
            })

            await ctx.runMutation(api.users.createUser, {
                email,
                name,
                clerkId: id,
                stripeCustomerId: customer.id
            })
        } catch (error) {
            console.error("Error creating user:", error);
            return new Response('Error creating user', {status: 500})
        }
    }

   return new Response('User created event processed', {status: 200});
})

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: clerkWebhook
})

export default http;