import { Id } from "@/convex/_generated/dataModel";

export interface Course {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
}

export interface SubscriptionData {
  status: string;
  userId: Id<"users">;
  planType: "month" | "year";
  currentPeriodStart: number;
  currentPeriodEnd: number;
  stripeSubscriptionId: string;
  cancelAtPeriodEnd: boolean; // Add this
}