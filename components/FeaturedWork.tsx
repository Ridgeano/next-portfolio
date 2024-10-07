"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Project {
  title: string
  subtitle: string
  image: string
}

const projects: Project[] = [
  {
    title: "gazetteer",
    subtitle: "Web App",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "company directory",
    subtitle: "Web App",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "portfolio",
    subtitle: "Website",
    image: "/placeholder.svg?height=400&width=600"
  },
]

export default function FeaturedWork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={400}
              className="object-cover w-full h-64"
            />
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3
                className="text-white text-2xl font-bold mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: hoveredIndex === index ? 0 : 20, opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {project.title}
              </motion.h3>
              <motion.p
                className="text-white text-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: hoveredIndex === index ? 0 : 20, opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {project.subtitle}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}