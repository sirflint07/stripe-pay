"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { ArrowLeft, Badge, BookOpen, CheckCircle, Clock, Loader, Star, Users } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import PurchaseButton from '@/components/PurchaseButton'

const CourseDetailsPage = ({params}: {params: {courseId: Id<"courses">}} ) => {
    const {user, isLoaded: isUserLoaded} = useUser()
    const userData = useQuery(api.users.getUserByClerkId, {clerkId: user?.id ?? ""})
    const courseData = useQuery(api.courses.getCourseById, {courseId: params.courseId})
    const userAccess = useQuery(api.users.getUserAccess, userData ? {
        userId: userData?._id,
        courseId: params.courseId
    } : "skip") || {hasAccess: false}
    console.log('User Access:', userAccess)

    
    if (!isUserLoaded && courseData === undefined) {
      return <CourseDetailSkeleton />
    }

    if (courseData === null) {
      return notFound()
    }
    if (userAccess) {
      console.log('A')
    }

     // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const modules = [
    {
      id: "1",
      title: "Introduction to JavaScript",
      lessons: 5,
      duration: "1h 30m"
    },
    {
      id: "2",
      title: "Variables and Data Types",
      lessons: 7,
      duration: "2h 15m"
    },
    {
      id: "3",
      title: "Functions and Scope",
      lessons: 6,
      duration: "2h 0m"
    }
  ];


  return (
    <section className='w-[90vw] mx-auto py-8 px-4'>
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className=""
    >
      <motion.div variants={itemVariants}>
        <Link href="/courses" className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Course Content */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants}>
            <Badge className="mb-4">
              JavaScript
            </Badge>
            <motion.h1 
              className="text-4xl font-bold tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {courseData?.title}
            </motion.h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-medium">4.8</span>
                    <span className="text-muted-foreground">(1245 reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>8560 students</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{courseData?.description}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Duration: 10 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-muted-foreground" />
                    <span>Certificate of Completion</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {userAccess.hasAccess && <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Course Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {modules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {module.lessons} lessons • {module.duration}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>}
        </div>

        
        <div className="space-y-6">
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="sticky top-6 shadow-lg">
              <div className="relative overflow-hidden rounded-t-lg h-48">
                <Image
                  src={courseData?.imageUrl || ""}
                  alt={courseData?.title || ""}
                  fill
                  className="object-cover"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">${courseData?.price.toFixed(2)}</CardTitle>
                    <CardDescription className="line-through">
                      ${(courseData?.price || 1 * 1.5).toFixed(2)}
                    </CardDescription>
                  </div>
                  <Badge className="animate-pulse">
                    33% OFF
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Duration: 6 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-muted-foreground" />
                    <span>Certificate of Completion</span>
                  </div>
                </div>
                {/* <Button className="w-full" size="lg">
                  Enroll Now
                </Button> */}
                <PurchaseButton courseId={params.courseId} />
                <Button variant="outline" className="w-full">
                  Add to Wishlist
                </Button>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                30-day money-back guarantee
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">JD</span>
                  </div>
                  <div>
                    <h4 className="font-medium">John Doe</h4>
                    <p className="text-sm text-muted-foreground">
                      Senior JavaScript Developer
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
    </section>
  )
}

export default CourseDetailsPage

function CourseDetailSkeleton () {
  return (
    <div className='container mx-auto py-8 px-4 relative'>
      <div className='mx-auto'>
        <Loader className='animate-spin h-10 w-10 text-gray-900 z-20 absolute top-1/2 left-1/2' />
      </div>
			<Card className='max-w-4xl mx-auto'>
				<CardHeader>
					<Skeleton className='w-full h-[600px] rounded-md' />
				</CardHeader>
				<CardContent>
					<Skeleton className='h-10 w-3/4 mb-4' />
					<Skeleton className='h-4 w-full mb-2' />
					<Skeleton className='h-4 w-full mb-2' />
					<Skeleton className='h-4 w-2/3 mb-6' />
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
						<Skeleton className='h-10 w-full' />
						<Skeleton className='h-10 w-full' />
					</div>
				</CardContent>
			</Card>
		</div>
  )
}