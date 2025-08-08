import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        email: v.string(),
        clerkId: v.string(),
        name: v.string(),
        stripeCustomerId: v.string(),
        currentSubscriptionId: v.optional(v.id("subcriptions"))
    }).index("by_clerkId", ["clerkId"]),

    courses: defineTable({
        title: v.string(),
        description: v.string(),
        imageUrl: v.string(),
        price: v.number()
    }),

    purchases: defineTable({
        userId: v.id('users'),
        courseId: v.id('courses'),
        amount: v.number(),
        stripePurchaseId: v.string(),
        purchaseDate: v.number()
    }).index("by_userId_and_courseId", ["courseId" , "userId"]),

    subscriptions: defineTable({
        userId: v.id("users"),
        planType: v.union(v.literal('month'), v.literal('year')),
        currentPeriodStart: v.number(),
        currentPeriodEnd: v.number(),
        stripeSubscriptionId: v.string(),
        status: v.string(),
        cancelAtPeriodEnd: v.boolean()
    }).index("by_stripeSubscriptionId", ["stripeSubscriptionId"])
})