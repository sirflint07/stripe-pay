import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const recordPurchase = mutation({
    args: {
        courseId: v.id("courses"), 
        userId: v.id("users"), 
        amount: v.number(),
        stripePurchaseId: v.string()
    },
    handler: async(ctx, args) => {
       const {courseId, userId, amount, stripePurchaseId} = args
       const purchaseId = await ctx.db.insert("purchases", {
            courseId,
            userId,
            amount,
            stripePurchaseId,
            purchaseDate: new Date()
        })

        return purchaseId;
    }
})