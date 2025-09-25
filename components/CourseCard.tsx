"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Course } from '@/types/Courses';
import PurchaseButton from "./PurchaseButton";
import { Id } from "@/convex/_generated/dataModel";

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.005, opacity: 0.9 }}
      key={course._id}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <Link href={`courses/${course._id}`}>
            <AspectRatio ratio={16/9} className="bg-muted rounded-lg overflow-hidden">
              <Image
                src={course.imageUrl}
                alt={course.title}
                fill
                className="object-cover"
              />
            </AspectRatio>
          </Link>
        </CardHeader>
        
        <CardContent className="pt-4">
          <Link href={`courses/${course._id}`}>
            <CardTitle className="text-lg">{course.title}</CardTitle>
            <CardDescription className="mt-2 line-clamp-2">
              {course.description}
            </CardDescription>
          </Link>
        </CardContent>
        
        <CardFooter className="flex flex-col items-start space-y-2">
          <div className="flex items-center justify-between mb-2 w-full mx-auto pl-3">
            <span className="font-semibold">${course.price.toFixed(2)}</span>
            <Link href={`courses/${course._id}`} className="text-sm font-medium text-primary hover:underline opacity-50 transition-opacity">
              View Details
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 justify-between w-full">
            <Button variant="outline" className="text-sm font-medium" asChild>
              <Link href="/cart">Add to Cart</Link>
            </Button>
            
            <SignedOut>
              <Button variant="default" className="ml-2 text-sm font-medium" asChild>
                {/* <Link href="/sign-in">Register</Link> */}
                <SignInButton mode="modal">Register</SignInButton>
              </Button>
            </SignedOut>
            
            <SignedIn>
              <PurchaseButton courseId={course._id as Id<"courses">} />
            </SignedIn>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CourseCard;