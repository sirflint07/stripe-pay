import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import CourseCard from "@/components/CourseCard";
import HeroHeaderTitle from "@/components/HeroHeaderTitle";

export default async function Home() {
  const courses = await fetchQuery(api.courses.getCourses, {});

  return (
    <section className="lg:w-[90vw] md:w-4/5 mx-auto py-4 w-[88%] mb-8 md:mb-16">
      <HeroHeaderTitle />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.slice(0, 6).map((course) => (
          <CourseCard course={course} key={course._id} />
        ))}
      </div>
    </section>
  );
}