// import { v } from "convex/values";
// import { mutation } from "./_generated/server";

// export const recordPurchase = mutation({
//     args: {
//         courseId: v.id("courses"), 
//         userId: v.id("users"), 
//         amount: v.number(),
//         stripePurchaseId: v.string(),
//         purchaseDate: v.optional(v.string())
//     },
//     handler: async(ctx, args) => {
//        const {courseId, userId, amount, stripePurchaseId} = args
//        const purchaseId = await ctx.db.insert("purchases", {
//             courseId,
//             userId,
//             amount,
//             stripePurchaseId,
//             purchaseDate: new Date()
//         })

//         return purchaseId;
//     }
// })


import { v } from "convex/values";
import { mutation } from "./_generated/server";

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

    // Record new purchase
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
