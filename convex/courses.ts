import { query } from "./_generated/server";
import { v } from "convex/values";

export const getCourses = query({
    args: {},
    handler: async (ctx) => {
       const courses = await ctx.db.query('courses').collect()
       return courses
    }
})

export const getCourseById = query({
    args: {courseId: v.id('courses')},
    handler: async (ctx, args) => {
        const course =  await ctx.db.get(args.courseId)
        return course
    }
})


export const searchCourses = query({
  args: {
    searchTerm: v.string(),
  },
  handler: async (ctx, args) => {
    const { searchTerm } = args;
    const allCourses = await ctx.db.query("courses").collect();
    
    if (!searchTerm || searchTerm.trim() === "") {
      return {
        courses: await ctx.db.query("courses").take(50),
        total: await ctx.db.query("courses").collect().then(c => c.length)
      };
    }

    const term = searchTerm.toLowerCase().trim();
    
    
    
    const filteredCourses = allCourses.filter((course) => {
      return (
        course.title.toLowerCase().includes(term) ||
        // course.description.toLowerCase().includes(term) ||
        (course.category && course.category.toLowerCase().includes(term))
      );
    });
    
    return {
      courses: filteredCourses.slice(0, 50),
    };
  },
});


export const advancedSearchCourses = query({
  args: {
    searchTerm: v.string(),
    category: v.optional(v.string()),
    priceRange: v.optional(v.object({ min: v.number(), max: v.number() })),
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { searchTerm, category, priceRange, limit = 20 } = args;
    
    let query = ctx.db.query("courses");
    
    
    if (category) {
      query = query.filter((q) => q.eq(q.field("category"), category));
    }
    
    if (priceRange) {
      query = query.filter((q) => 
        q.and(
          q.gte(q.field("price"), priceRange.min),
          q.lte(q.field("price"), priceRange.max)
        )
      );
    }
    
    const allCourses = await query.collect();
    
   
    const term = searchTerm?.toLowerCase().trim() || "";
    const filteredCourses = allCourses.filter((course) => {
      if (!term) return true;
      return (
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term)
      );
    });
    
    
    const start = 0;
    const end = limit;
    const paginatedCourses = filteredCourses.slice(start, end);
    
    return {
      courses: paginatedCourses,
      total: filteredCourses.length,
      hasMore: filteredCourses.length > end,
    };
  },
});