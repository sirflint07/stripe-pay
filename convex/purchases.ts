import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const recordPurchase = mutation({
  args: {
    courseId: v.id("courses"),
    userId: v.id("users"),
    amount: v.number(),
    stripePurchaseId: v.string(),
  },
  handler: async (ctx, args) => {
    // Prevent duplicate entries for the same Stripe transaction
    const existing = await ctx.db
      .query("purchases")
      .withIndex("by_stripePurchaseId", q =>
        q.eq("stripePurchaseId", args.stripePurchaseId)
      )
      .unique();

    if (existing) {
      throw new Error("Purchase already recorded");
    }

    
    const purchaseId = await ctx.db.insert("purchases", {
      courseId: args.courseId,
      userId: args.userId,
      amount: args.amount,
      stripePurchaseId: args.stripePurchaseId,
      purchaseDate: Date.now(),
    });

    return await ctx.db.get(purchaseId);
  },
});

export const getPurchaseAccess = query({
  args: {
    userId: v.id("users"),
    courseId: v.id("courses")
  },
  handler: async (ctx, args) => {
    const purchase = await ctx.db.query("purchases")
      .withIndex("by_userId_and_courseId", q =>
        q.eq("courseId", args.courseId).eq("userId", args.userId)
      )
      .unique();

   if (!purchase) {
            return {hasAccess: false}
        } else {
            return {hasAccess: true, AccessType: 'course'}
        }
  }
})


export const getBulkPurchaseAccess = query({
  args: {
    userId: v.id("users"),
    courseIds: v.array(v.id("courses"))
  },
  handler: async (ctx, args) => {
    // Fetch all purchases for this user
    const purchases = await ctx.db
      .query("purchases")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
    
    // Create a Set of purchased course IDs for quick lookup
    const purchasedCourseIds = new Set(
      purchases
        .filter(p => args.courseIds.includes(p.courseId))
        .map(p => p.courseId.toString())
    );
    
    // Return access status for each course
    const result: Record<string, boolean> = {};
    args.courseIds.forEach(courseId => {
      result[courseId.toString()] = purchasedCourseIds.has(courseId.toString());
    });
    
    return result;
  }
});