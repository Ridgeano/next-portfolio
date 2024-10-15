'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'


const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700'] })

export default function gazetteer() {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    '',
    '',
    '',
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center text-zinc-900 hover:text-zinc-600">
            <ChevronLeft className="h-5 w-5 mr-2" />
            <span className="text-lg font-semibold lowercase">Back</span>
          </Link>
        </div>
      </header>

      <main className={`${montserrat.className} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12`}>
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Project Showcase: Interactive 3D Website
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative aspect-video bg-zinc-200 rounded-lg overflow-hidden">
              <Image 
                src={images[currentImage]} 
                alt="Project screenshot" 
                layout="fill" 
                objectFit="cover"
              />
              <button 
                onClick={prevImage} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextImage} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 mb-2">Project Overview</h2>
              <p className="text-zinc-600">
                An immersive 3D website showcasing interactive product displays and animations using Three.js and React Three Fiber.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 mb-2">Technologies Used</h2>
              <ul className="list-disc list-inside text-zinc-600">
                <li>Next.js</li>
                <li>Three.js</li>
                <li>React Three Fiber</li>
                <li>Framer Motion</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 mb-2">Key Features</h2>
              <ul className="list-disc list-inside text-zinc-600">
                <li>Responsive 3D product viewer</li>
                <li>Interactive animations</li>
                <li>Optimized performance</li>
                <li>Accessibility considerations</li>
              </ul>
            </div>
            <Link 
              href="#" 
              className="inline-flex items-center px-4 py-2 border 
              border-transparent text-base font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700"
            >
              Visit Live Site
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-zinc-900 mb-6">Project Details</h2>
          <div className="prose prose-lg max-w-none text-zinc-600">
            <p>
              This project aimed to create an engaging and interactive 3D website to showcase products in a unique and immersive way. By leveraging the power of Three.js and React Three Fiber, we were able to create a seamless 3D experience that works across devices.
            </p>
            <p>
              One of the main challenges was optimizing the 3D renders for performance, especially on mobile devices. We implemented level-of-detail (LOD) techniques and lazy loading to ensure smooth performance across all platforms.
            </p>
            <p>
              Accessibility was another key focus. We ensured that all interactive elements were keyboard navigable and included appropriate ARIA labels. For users who prefer reduced motion, we implemented alternative animations that respect their preferences.
            </p>
            <p>
              The result is a highly interactive, visually stunning website that provides users with a unique way to explore products in 3D space, setting our client apart from their competitors.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}