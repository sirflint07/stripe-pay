// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import Link from 'next/link';
// import React from 'react'

// const CoursePurchaseSuccess = ({params, searchParams}: {params: {courseId: string}; searchParams: {searchParams: {session_id: string}}}) => {

//     const {courseId} = params
//     const {session_id} = searchParams

//   return (
//     <div className='container min-h-screen flex flex-col items-center justify-center py-10 px-4'>
//         <Card>
//             <CardContent>
//                 <h1 className='text-2xl font-bold mb-4'>Thank you for your purchase!</h1>
//                 <p className='text-lg'>Your order has been successfully processed.</p>
//                 <div>
//                     <p>Your transaction ID is: <strong>{session_id}</strong></p>
//                 </div>
//                 <div>
//                     <Link href={`/courses/${courseId}`} className='text-blue-500 hover:underline'>
//                         <Button variant='outline'>Go back to your course</Button>
//                     </Link>
//                     <Link href={`/courses/`} className='text-blue-500 hover:underline'>
//                         <Button variant='outline'>View All Courses</Button>
//                     </Link>
//                     <Link href={`/courses/${courseId}/resources`} className='text-blue-500 hover:underline'>
//                         <Button variant='outline'>View course resources</Button>
//                     </Link>
//                 </div>
//             </CardContent>
//         </Card>
//     </div>
//   )
// }

// export default CoursePurchaseSuccess

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Download, Home, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const CoursePurchaseSuccess = ({params, searchParams}: {params: {courseId: string}; searchParams: {session_id: string}}) => {
    const { courseId } = params;
    const { session_id } = searchParams;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-10 px-4'>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="w-full max-w-2xl"
            >
                <Card className='border-0 shadow-xl rounded-2xl overflow-hidden'>
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                        <motion.div
                            variants={itemVariants}
                            className="text-center"
                        >
                            <CheckCircle className="w-20 h-20 mx-auto mb-4" />
                            <CardTitle className="text-3xl font-bold mb-2">
                                Purchase Successful!
                            </CardTitle>
                            <p className="text-lg opacity-90">
                                Welcome to your new course journey
                            </p>
                        </motion.div>
                    </div>

                    <CardContent className='p-8'>
                        <motion.div variants={itemVariants} className="text-center mb-8">
                            <p className="text-lg text-gray-700 mb-6">
                                Your order has been successfully processed and you now have full access to the course content.
                            </p>
                            
                            <div className="bg-gray-100 rounded-lg p-4 mb-6">
                                <p className="text-sm text-gray-600 mb-2">Transaction ID</p>
                                <p className="font-mono text-gray-800 text-sm bg-white p-2 rounded border">
                                    {session_id}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div 
                            variants={itemVariants}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                        >
                            <Button 
                                asChild 
                                className="h-12 bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300"
                                size="lg"
                            >
                                <Link href={`/courses/${courseId}`}>
                                    <BookOpen className="w-5 h-5 mr-2" />
                                    Start Learning
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>

                            <Button 
                                asChild 
                                variant="outline" 
                                className="h-12 border-gray-300 hover:bg-gray-50 transition-all duration-300"
                                size="lg"
                            >
                                <Link href={`/courses/${courseId}/resources`}>
                                    <Download className="w-5 h-5 mr-2" />
                                    Resources
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div 
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4 border-t border-gray-200"
                        >
                            <Button 
                                asChild 
                                variant="ghost" 
                                className="text-gray-600 hover:text-gray-800"
                                size="sm"
                            >
                                <Link href="/courses">
                                    <Home className="w-4 h-4 mr-2" />
                                    Browse More Courses
                                </Link>
                            </Button>
                            
                            <span className="text-gray-400 hidden sm:block">•</span>
                            
                            <Button 
                                asChild 
                                variant="ghost" 
                                className="text-gray-600 hover:text-gray-800"
                                size="sm"
                            >
                                <Link href="/dashboard">
                                    Go to Dashboard
                                </Link>
                            </Button>
                        </motion.div>
                    </CardContent>
                </Card>

                <motion.div
                    variants={itemVariants}
                    className="text-center mt-6"
                >
                    <p className="text-sm text-gray-500">
                        Need help?{' '}
                        <Link href="/support" className="text-emerald-600 hover:underline">
                            Contact support
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default CoursePurchaseSuccess;