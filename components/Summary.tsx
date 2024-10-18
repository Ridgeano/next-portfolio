"use client"

import { motion, useInView } from 'framer-motion'
import { Montserrat } from 'next/font/google'
import { useRef } from 'react'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700'] })

export default function Summary() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="w-full bg-zinc-900 py-12 md:py-16 lg:py-20" id="summary">
      <motion.section 
        ref={ref}
        className="w-full max-w-[2400px] mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex flex-col space-y-6 md:space-y-8 lg:space-y-10">
          <motion.h2 
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl
            font-bold text-white text-right lowercase leading-tight border-r-4 pr-6 border-violet-500"
            variants={itemVariants}
          >
            I focus on creating holistic digital solutions that seamlessly integrate frontend aesthetics with robust backend functionality. By prioritizing both technical excellence and user-centric design.
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className={`${montserrat.className} text-lg sm:text-xl lg:text-2xl text-zinc-200`}
          >
            My approach to web development goes beyond just writing code. I ensure that every project not only meets but exceeds expectations in terms of performance, scalability, and user satisfaction. My commitment to clean, maintainable code and comprehensive documentation facilitates smooth collaboration and efficient future updates.
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="bg-zinc-800 p-4 sm:p-6 lg:p-8 rounded-lg border-l-4 border-violet-500 lowercase"
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl text-white font-semibold mb-4">Technical Proficiencies</h3>
            <ul className="text-base sm:text-lg lg:text-xl text-zinc-400 grid grid-cols-2 gap-3 lg:gap-4">
              <li>• Frontend: HTML, CSS, JavaScript, React, Three.js</li>
              <li>• Backend: Node.js, Express, Python</li>
              <li>• Database: MongoDB, MySQL</li>
              <li>• UX/UI Design: Figma</li>
              <li>• Version Control: Git, GitHub</li>
              <li>• Performance Optimization</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}