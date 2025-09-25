import { ConvexError, v } from "convex/values";
import stripe from "../lib/stripe";
import { api } from "./_generated/api";
import { action } from "./_generated/server";
import ratelimit from "../lib/ratelimit";

export const createCheckoutSession = action({
    args: {courseId: v.id('courses')},
    handler: async (ctx, args):Promise<{checkoutUrl: string | null}> => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new ConvexError("Unauthorized");
        }

        const user = await ctx.runQuery(api.users.getUserByClerkId, {clerkId: identity.subject})

        if(!user) {
            throw new ConvexError("User not found");
        }

        const ratelimitkey = `checkout-rate-limit/${user._id}`
        const {success} = await ratelimit.limit(ratelimitkey)

        if (!success) {
            throw new Error("Rate limit exceeded");
        }

        const course = await ctx.runQuery(api.courses.getCourseById, {courseId: args.courseId})

        if (!course) {
            throw new ConvexError("Course not found");
        }

        const session = await stripe.checkout.sessions.create({
            customer: user.stripeCustomerId,
            payment_method_types: ['card'],
            line_items: [
                {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: course.title,
                        description: course.description,
                        images: [course.imageUrl]
                    },
                    unit_amount: Math.round(course.price * 100),
                },
                quantity: 1
            }
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course._id}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course._id}`,
            metadata: {
                courseId: args.courseId,
                userId: user._id
            }
        })
        return {checkoutUrl: session.url}
  }
})