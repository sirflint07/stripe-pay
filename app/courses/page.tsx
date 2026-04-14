import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs";
import AllCoursesClient from "./_components/AllCourses";


export default async function AllCourses() {
  
  const courses = await fetchQuery(api.courses.getCourses, {});
  const { userId } = auth();
  
  let userData = null;
  let subscription = null;
  let hasProAccess = false;
  let accessMap: Record<string, boolean> = {};
  let categories = ['all', 'design', 'web development'];

  if (userId) {
    userData = await fetchQuery(api.users.getUserByClerkId, { clerkId: userId });
    
    if (userData) {
      subscription = await fetchQuery(api.subscriptions.getUserSubscription, { 
        userId: userData._id 
      });
      hasProAccess = subscription?.status === 'active';
      
      if (courses.length > 0) {
        accessMap = await fetchQuery(api.purchases.getBulkPurchaseAccess, {
          userId: userData._id,
          courseIds: courses.map(c => c._id)
        });
      }
    }
  }

  
  return (
    <AllCoursesClient 
      initialCourses={courses}
      initialAccessMap={accessMap}
      initialHasProAccess={hasProAccess}
      categories={categories}
    />
  );
}