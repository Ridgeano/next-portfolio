"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '../lib/projects'

export default function FeaturedWork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const titleVariants = {
    hidden: { opacity: 0, y: '1rem' },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.7
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: '1rem' },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="w-full bg-zinc-900" id='projects'>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24" ref={containerRef}>
        <motion.h2 
          ref={titleRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 sm:mb-10 lg:mb-12 pl-4 border-l-4 border-violet-500 w-fit lowercase text-white"
          variants={titleVariants}
          initial="hidden"
          animate={isTitleInView ? "visible" : "hidden"}
        >
          Recent Projects
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="w-full"
            >
              <Link href={project.url} passHref>
                <div
                  className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group h-0 pb-[66.67%]"
                  onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                  onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent pt-8 pb-4 px-4 sm:px-6">
                    <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white text-sm sm:text-base">
                      {project.subtitle}
                    </p>
                  </div>
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-white text-lg font-semibold px-6 py-3 border-2 lowercase border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300">
                        View Project
                      </span>
                    </motion.div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}