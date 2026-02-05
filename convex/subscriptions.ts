import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const getUserSubscription = query({
    args: {userId: v.id("users")},
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId)

        if (!user) {
            throw new Error('User not found')
        }
        if (!user?.currentSubscriptionId) return null;

        const subscription = await ctx.db.get(user?.currentSubscriptionId)
        if (!subscription) return null

        return subscription
    },
})

export const upsertSubscription = mutation({
    args: {
        userId: v.id("users"),
        planType: v.union(v.literal('month'), v.literal('year')),
        currentPeriodStart: v.number(),
        currentPeriodEnd: v.number(),
        stripeSubscriptionId: v.string(),
        status: v.string(),
        cancelAtPeriodEnd: v.boolean()
    },
    handler: async (ctx, args) => {
        const existingSubscription = await ctx.db.query("subscriptions").withIndex("by_stripeSubscriptionId", q => q.eq('stripeSubscriptionId', args.stripeSubscriptionId)).unique()

        if (existingSubscription) {
            ctx.db.patch(existingSubscription._id, args)
        } else {
            const newSubscriptionId = await ctx.db.insert("subscriptions", args)
            await ctx.db.patch(args.userId, { currentSubscriptionId: newSubscriptionId})
    }
    return { success: true}
}});