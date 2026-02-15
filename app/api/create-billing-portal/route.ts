import { api } from "@/convex/_generated/api"
import stripe from "@/lib/stripe"
import { auth } from "@clerk/nextjs"
import { ConvexHttpClient } from "convex/browser"
import { NextResponse } from "next/server"


export const POST = async () => {
    const convex =  new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
    const {userId} = auth()

    if (!userId) {
        return new Response("Unauthorized", { status: 401 })
    }

    try {
        const user =  await convex.query(api.users.getUserByClerkId, { clerkId: userId })

        if (!user || !user.stripeCustomerId) {
            return NextResponse.json({error: "User not found or already has a Stripe customer ID"}, { status: 400 })
        }

        const sessions = await stripe.billingPortal.sessions.create({
            customer: user.stripeCustomerId,
            return_url: 'http://localhost:4000/billing'
        })
        return NextResponse.json({ url: sessions.url })
    } catch (error) {
        console.log("Error creating billing portal session: ", error)
        return NextResponse.json({error: "Failed to create billing portal session"}, { status: 500 })
    }
}