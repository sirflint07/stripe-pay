import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
    args: {
        email: v.string(),
        clerkId: v.string(),
        name: v.string(),
        stripeCustomerId: v.string()
    },
    handler: async (ctx, args) => {
        const { db } = ctx;
        const existingUser = await db.query("users").withIndex("by_clerkId", q => q.eq("clerkId", args.clerkId)).unique();

        if (existingUser) {
            return existingUser;
        }

        const user = await db.insert("users", {
            email: args.email,
            clerkId: args.clerkId,
            name: args.name,
            stripeCustomerId: args.stripeCustomerId
        });

        return user;
    }
})

export const getUserByClerkId = query({
    args: {
        clerkId: v.string()
    },
    handler: async (ctx, args) => {
        const { db } = ctx;
        return await db.query("users").withIndex("by_clerkId", q => q.eq("clerkId", args.clerkId)).unique();
    }
})

export const getUserByStripeCustomerId = query({
    args: {stripeCustomerId: v.string()},
    handler: async (ctx, args) => {
        return await ctx.db.query('users').withIndex('by_stripeCustomerId', q => q.eq('stripeCustomerId', args.stripeCustomerId)).unique()
    }
})

export const getUserAccess = query({
    args: {userId: v.id("users"), courseId: v.id("courses")},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("Unauthorized: User identity is required to access this resource.");
        }

        const user = await ctx.db.get(args.userId)

        if (!user) {
            throw new ConvexError('User not found');
        }

        if (user.currentSubscriptionId) {
            const subscription = await ctx.db.get(user.currentSubscriptionId);
            if (subscription && subscription.status === 'active') {
                return {hasAccess: true, AccessType: "subscription"};
            }
        }

        const purchase = await ctx.db.query("purchases").withIndex('by_userId_and_courseId', (q) => q.eq('courseId', args.courseId).eq('userId', args.userId)).unique()

        if (!purchase) {
            return {hasAccess: false}
        } else {
            return {hasAccess: true, AccessType: 'course'}
        }
    }
})