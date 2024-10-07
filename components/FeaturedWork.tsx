"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import gazetteer from '../public/gazetteer.png'
import nextjs_port from '../public/nextjs-port.png'

interface Project {
  title: string
  subtitle: string
  image: StaticImageData
}

const projects: Project[] = [
  {
    title: "gazetteer",
    subtitle: "Web App",
    image: gazetteer
  },
  {
    title: "company directory",
    subtitle: "Web App",
    image: gazetteer
  },
  {
    title: "portfolio",
    subtitle: "next.js",
    image: nextjs_port
  },
]

export default function FeaturedWork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    projectRefs.current = projectRefs.current.slice(0, projects.length)
  }, [projects])

  if (!isMounted) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 pl-4 border-l-4
         border-violet-500 w-fit lowercase">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                ref={(el) => {
                  if (el) projectRefs.current[index] = el;
                }}
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
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
        <div className="mt-12 text-right">
          <motion.button
            className="group inline-flex items-center lowercase bg-violet-500 text-zinc-950 font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-violet-400 transition duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            More Projects
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}