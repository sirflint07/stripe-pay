import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        email: v.string(),
        clerkId: v.string(),
        name: v.string(),
        stripeCustomerId: v.string(),
        currentSubscriptionId: v.optional(v.id("subscriptions"))
    }).
    index("by_clerkId", ["clerkId"])
    .index("by_stripeCustomerId", ["stripeCustomerId"])
    .index('by_currentsubscriptionId', ["currentSubscriptionId"]),

    courses: defineTable({
        title: v.string(),
        description: v.string(),
        imageUrl: v.string(),
        price: v.number(),
        category: v.optional(v.string())
    }).index('by_category', ["category"])
    .index('by_title', ["title"]),

    purchases: defineTable({
        userId: v.id('users'),
        courseId: v.id('courses'),
        amount: v.number(),
        stripePurchaseId: v.string(),
        purchaseDate: v.any()
    }).index("by_userId_and_courseId", ["courseId" , "userId"])
    .index("by_stripePurchaseId", ["stripePurchaseId"])
    .index("by_userId", ["userId"]),

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