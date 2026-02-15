import PurchaseButton from '@/components/PurchaseButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/convex/_generated/api'
import { auth, SignedIn, SignedOut } from '@clerk/nextjs'

import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { fetchQuery } from 'convex/nextjs'
import { ArrowLeftCircle, CheckCircle, MinusCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PiHandPointing } from "react-icons/pi";

const AllCourses = async () => {
  const courses = await fetchQuery(api.courses.getCourses, {})
   const { userId } = auth()
   console.log('userID: ',userId)

    let userData = null
    let subscription = null
    let hasProAccess = false

     if (userId) {
    userData = await fetchQuery(api.users.getUserByClerkId, { clerkId: userId })
    
    if (userData) {
      subscription = await fetchQuery(api.subscriptions.getUserSubscription, { 
        userId: userData._id 
      })
      
      
      hasProAccess = subscription?.status === 'active'
      console.log('User subscription status: ', hasProAccess)
    }
  }
  
  return (
    <main className='w-[95vw] lg:w-4/5 mx-auto py-12 overflow-hidden'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-bold mb-4 text-gray-600'>All Courses</h1>
        <Link href="/" className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeftCircle className="w-6 h-6" />
          Back to Home
        </Link>
        </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto">
      
        {courses.map((course) => (
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
      <Link href={`courses/${course._id}`} className="text-sm font-medium text-primary hover:underline opacity-50 transition-opacity">
       {
        hasProAccess ? (
           <Badge className=" bg-green-100 text-green-700 border-green-200 hover:bg-green-200">
    <CheckCircle className="w-3 h-3 mr-1" />
    Enrolled
  </Badge>
        ) : (
          <Badge variant="outline" className="bg-white text-gray-800 border-gray-300">
  <MinusCircle className="w-3 h-3 mr-1" />
  Unenrolled
</Badge>
        )
       }
      </Link>
    </div>
    <div className="flex items-center space-x-2 justify-between w-full">
      <SignedOut>
        <Button asChild variant="default" className="ml-2 text-sm font-medium">
          <Link href={'/sign-in'}>Register</Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <PurchaseButton courseId={course._id}/>
      </SignedIn>
    </div>
  </CardFooter>
</Card>
        ))}
      </div>
      <div className='flex justify-end py-6'>
        <Button variant="outline" className="mx-4">
        <Link href="#" className='flex items-center gap-1'><span className='inline-block text-sm'>Back to top</span> <span className='inline-block'><PiHandPointing size={14} /></span></Link>
      </Button>
      </div>
      
      </main>
  )
}

export default AllCourses