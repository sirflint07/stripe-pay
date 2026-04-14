"use client";

import { useState, useCallback, useMemo } from "react";
import PurchaseButton from '@/components/PurchaseButton';
import SearchBar from '@/components/SearchBar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { ArrowLeftCircle, CheckCircle, MinusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PiHandPointing } from "react-icons/pi";
import FilterMenu from "./FilterMenu.tsx";


interface AllCoursesClientProps {
  initialCourses: any[];
  initialAccessMap: Record<string, boolean>;
  initialHasProAccess: boolean;
  categories: string[];
}

export default function AllCoursesClient({ 
  initialCourses, 
  initialAccessMap, 
  initialHasProAccess,
  categories 
}: AllCoursesClientProps) {
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "price-asc" | "price-desc">("name-asc");
  const [category, setCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSortChange = useCallback((newSortBy: typeof sortBy) => {
    setSortBy(newSortBy);
  }, []);
  
  const handleCategoryChange = useCallback((newCategory: string) => {
    setCategory(newCategory);
  }, []);
  
  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);
  
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = [...initialCourses];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(term) || 
        course.description.toLowerCase().includes(term)
      );
    }
    

    if (category !== "all") {
      filtered = filtered.filter(course => 
        course.category?.toLowerCase() === category.toLowerCase()
      );
    }
    
   
    filtered.sort((a, b) => {
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
    
    return filtered;
  }, [initialCourses, searchTerm, sortBy, category]);
  
  return (
    <main className='w-[95vw] lg:w-4/5 mx-auto py-12 overflow-hidden'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-bold mb-4 text-gray-600 flex items-baseline gap-2'>
          <span>All Courses</span>
          <span className='text-lg font-semibold text-emerald-600 bg-slate-200 rounded-lg py-2 px-4'>{filteredAndSortedCourses.length}</span>
        </h1>
        <Link href="/" className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeftCircle className="w-6 h-6" />
          Back to Home
        </Link>
      </div>

      <div className="mb-16 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className='w-full md:max-w-3xl'>
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        </div>
        <div className='w-full md:max-w-3xl'>
          <FilterMenu
            sortBy={sortBy}
            onSortChange={handleSortChange}
            category={category}
            onCategoryChange={handleCategoryChange}
            categories={categories}
          />
        </div>
      </div>
      
      {filteredAndSortedCourses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No courses found</p>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto">
          {filteredAndSortedCourses.map((course) => {
            const hasAccess = initialHasProAccess || initialAccessMap[course._id.toString()] || false;
            return (
              <Card key={course._id} className="hover:shadow-lg transition-shadow">
                <Link href={`courses/${course._id}`} className="block">
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
                </Link>
                
                <CardFooter className="flex flex-col items-start space-y-2">
                  <div className="flex items-center justify-between mb-2 w-full mx-auto pl-3">
                    <span className="font-semibold">${course.price.toFixed(2)}</span>
                    
                    {hasAccess ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Enrolled
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-white text-gray-800 border-gray-300">
                        <MinusCircle className="w-3 h-3 mr-1" />
                        Unenrolled
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 justify-between w-full">
                    <SignedOut>
                      <Button asChild variant="default" className="ml-2 text-sm font-medium">
                        <Link href={'/sign-in'}>Register</Link>
                      </Button>
                    </SignedOut>
                    <SignedIn>
                      <PurchaseButton courseId={course._id} />
                    </SignedIn>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
      
      <div className='flex justify-end py-6'>
        <Button variant="outline" className="mx-4">
          <Link href="#" className='flex items-center gap-1'>
            <span className='inline-block text-sm'>Back to top</span>
            <PiHandPointing size={14} />
          </Link>
        </Button>
      </div>
    </main>
  );
}