"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { projects } from '../lib/projects'

export default function FeaturedWork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      setIsMounted(false)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    projectRefs.current = projectRefs.current.slice(0, projects.length)
  }, [])

  useEffect(() => {
    if (isMobile && isMounted) {
      const observers = projectRefs.current.map((ref, index) => {
        if (ref) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  setHoveredIndex(index)
                }, 300) // 300ms delay
              } else {
                setHoveredIndex(null)
              }
            },
            { threshold: 0.7 } // Increased threshold to 70%
          )
          observer.observe(ref)
          return observer
        }
        return null
      })

      return () => {
        observers.forEach((observer) => observer && observer.disconnect())
      }
    }
  }, [isMobile, isMounted])

  if (!isMounted) {
    return null
  }

  const handleProjectClick = (url: string) => {
    router.push(url)
  }

  return (
    <div className="container mx-auto px-4 py-16" id='projects'>
      <div className="max-w-8xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 pl-4 border-l-4 border-violet-500 w-fit lowercase">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                ref={(el) => {
                  if (el) projectRefs.current[index] = el;
                }}
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                onHoverStart={() => !isMobile && setHoveredIndex(index)}
                onHoverEnd={() => !isMobile && setHoveredIndex(null)}
                onClick={() => handleProjectClick(project.url)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-64"
                />
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.h3
                        className="text-white text-2xl font-bold mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p
                        className="text-white text-lg"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {project.subtitle}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}