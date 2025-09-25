"use client"
import React from 'react'
import { motion } from 'framer-motion'

const HeroHeaderTitle = () => {
  return (
    <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}

    className="w-[88%] mx-auto py-12 overflow-hidden">
      <div className="text-center mt-10 mb-12">
      <h2 className="text-6xl max-lg:text-3xl font-extrabold mb-2">
  <span className="bg-gradient-to-br from-amber-400 to-orange-600 
                  bg-clip-text text-transparent">
    Premium Course Collection
  </span>
</h2>
  <h3 className="text-3xl font-medium">
  <span className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 
                  bg-clip-text text-transparent
                  animate-gradient bg-300%">
    Expert-Led Courses
  </span>
</h3>
<span className="text-gray-600">
    Start Learning Today
  </span>
</div>
</motion.div>
  )
}

export default HeroHeaderTitle