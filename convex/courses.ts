import { mutation, query } from "./_generated/server";
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

export const getFilteredCourses = query({
  args: {
    searchTerm: v.optional(v.string()),
    sortBy: v.optional(v.union(
      v.literal("name-asc"),
      v.literal("name-desc"),
      v.literal("price-asc"),
      v.literal("price-desc")
    )),
    category: v.optional(v.union(
      v.literal("all"),
      v.literal("design"),
      v.literal("web-development")
    )),
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { searchTerm, sortBy = "name-asc", category = "all", limit = 20 } = args;
    
    
    let courses = await ctx.db.query("courses").collect();
    
   
    if (searchTerm && searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase().trim();
      courses = courses.filter((course) => {
        return (
          course.title.toLowerCase().includes(term) ||
          course.description.toLowerCase().includes(term)
        );
      });
    }
    
    
    if (category !== "all") {
      courses = courses.filter((course) => course.category === category);
    }
    
    
    courses.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
    
    
    const start = 0;
    const end = limit;
    const paginatedCourses = courses.slice(start, end);
    
    return {
      courses: paginatedCourses,
      total: courses.length,
      hasMore: courses.length > end,
    };
  },
});


export const removeDuplicateCourses = mutation({
  handler: async (ctx) => {
    
    const allCourses = await ctx.db.query("courses").collect();
    
    
    const seen = new Map<string, { id: any, title: string, price: number }>();
    const duplicatesToDelete: any[] = [];
    
    for (const course of allCourses) {
      const normalizedTitle = course.title.toLowerCase().trim();
      
      if (seen.has(normalizedTitle)) {
        
        duplicatesToDelete.push(course._id);
        console.log(`Duplicate found: "${course.title}" (ID: ${course._id})`);
      } else {
        seen.set(normalizedTitle, {
          id: course._id,
          title: course.title,
          price: course.price
        });
      }
    }
    
    
    for (const id of duplicatesToDelete) {
      await ctx.db.delete(id);
    }
    
    return {
      deleted: duplicatesToDelete.length,
      remaining: allCourses.length - duplicatesToDelete.length,
      kept: seen.size,
      duplicateTitles: Array.from(seen.entries())
        .filter(([_, info]) => info)
        .map(([title]) => title)
    };
  },
});