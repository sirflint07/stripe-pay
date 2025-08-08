// app/page.tsx
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CardContent, Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const courses = await fetchQuery(api.courses.getCourses, {});

  return (
    <div className="w-[88%] mx-auto py-12 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Card key={course._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <AspectRatio ratio={16/9} className="bg-muted rounded-lg overflow-hidden">
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
            </CardHeader>
            <CardContent className="pt-4">
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription className="mt-2 line-clamp-2">
                {course.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2">
              <div className="flex items-center justify-between mb-2 w-full mx-auto pl-3">
                <span className="font-semibold">${course.price.toFixed(2)}</span>
              <button className="text-sm font-medium text-primary hover:underline opacity-50 transition-opacity">
                View Details
              </button>
              </div>
              <div className="flex items-center space-x-2 justify-between w-full">
                <Button variant="outline" className="text-sm font-medium">
                <Link href={'/cart'}>Add to Cart</Link>
              </Button>
              <SignedOut>
                <Button variant="default" className="ml-2 text-sm font-medium">
                  <Link href={'/sign-in'}>Register</Link></Button>
              </SignedOut>
              <SignedIn>
                <Button variant="ghost" className="ml-2 text-sm font-medium">Enroll</Button>
              </SignedIn>
              
              </div>
              
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}