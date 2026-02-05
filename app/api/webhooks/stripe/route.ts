import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import stripe from "@/lib/stripe";
import { SubscriptionData } from "@/types/Courses";
import { ConvexHttpClient } from "convex/browser";
import Stripe from "stripe"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function POST (req: Request) {
    console.log("All headers:", Object.fromEntries(req.headers.entries()))
const body = await req.text()
const signature = req.headers.get("stripe-signature") ?? req.headers.get("Stripe-Signature");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!signature || !webhookSecret) {
    console.error("Missing stripe signature header or webhook secret env var");
    return new Response("Missing signature or webhook secret", { status: 400 });
  }

let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature!, webhookSecret!)
    } catch (error) {
        console.log("Error verifying webhook signature:", error)
        return new Response("Webhook error", { status: 400 })
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed':
                await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
                break;
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
            await handleSubscriptionUpsert(event.data.object as Stripe.Subscription, event.type)
            break
            default:
                console.log("Unhandled event type:", event.type)
                break;
        }
    } catch (error) {
       console.log("Error handling webhook event:", error)
       return new Response("Webhook handler error", { status: 400 })
    }

    return new Response("Success", { status: 200 })
}


async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    const courseId = session.metadata?.courseId
    const customerId = session.customer as string

    if (!courseId || !customerId ) {
        throw new Error("Missing customer or course ID in session metadata")
    }

    const user = await convex.query(api.users.getUserByStripeCustomerId, {stripeCustomerId: customerId})

    if (!user) {
        throw new Error("User not found for customer ID: " + customerId)
    }

    await convex.mutation(api.purchases.recordPurchase, {
        userId: user._id,
        courseId: courseId as Id<"courses">,
        amount: session.amount_total as number,
        stripePurchaseId: session.id
    })

    console.log("Recorded purchase: user=", user._id, "course=", courseId, "amount=", session.amount_total);
}

async function handleSubscriptionUpsert(subscription: Stripe.Subscription, eventType: string) {
    if (subscription.status !== 'active' || !subscription.latest_invoice || subscription.latest_invoice === undefined) {
        console.log(`Subscription ${subscription.id} is not active. Skipping upsert. Subscription Status is ${subscription.status}`);
        return;
    }

    const customerId = subscription.customer as string;
    const user = await convex.query(api.users.getUserByStripeCustomerId, { stripeCustomerId: customerId });

    if (!user) {
        throw new Error("User not found for customer ID: " + customerId);
    }

    try {
      const subscriptionData: SubscriptionData = {
        userId: user._id,
        planType: subscription.items.data[0].plan.interval as 'month' | 'year',
        currentPeriodStart: subscription.items.data[0].current_period_start,
        currentPeriodEnd: subscription.items.data[0].current_period_end,
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end
    }
    await convex.mutation(api.subscriptions.upsertSubscription, subscriptionData)
    console.log(`Successfully subscribed to ${eventType} with a sub id of ${subscription.id}`)
    } catch (error) {
        console.log(error)
    }
}