import { v } from "convex/values";
import { mutation } from "./_generated/server";

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