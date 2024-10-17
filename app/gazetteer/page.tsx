"use client"

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700'] })

export default function Gazetteer() {
  const [currentImage, setCurrentImage] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const images = [
    '/placeholder.svg?height=720&width=1280',
    '/placeholder.svg?height=720&width=1280',
    '/placeholder.svg?height=720&width=1280',
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.replace('/')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a
              href="/"
              onClick={handleBackClick}
              className="inline-flex items-center text-white hover:text-zinc-300 transition-colors bg-zinc-950 bg-opacity-50 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              <span className="text-lg font-semibold uppercase tracking-wider">Back</span>
            </a>
          </div>
        </div>
      </header>

      <main className={`${montserrat.className} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12`}>
        <div className="pt-8 mb-16">
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 text-white uppercase tracking-tighter"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Gazetteer
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-zinc-400 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A mobile-first website providing comprehensive country profiles with demographic, climatic, and geographical data.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative aspect-video bg-zinc-800 rounded-lg overflow-hidden">
              <Image 
                src={images[currentImage]} 
                alt="Project screenshot" 
                layout="fill" 
                objectFit="cover"
              />
              <AnimatePresence>
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-zinc-900 bg-opacity-50"
                />
              </AnimatePresence>
              <button 
                onClick={prevImage} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-zinc-950 rounded-full p-2 shadow-md transition-transform hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextImage} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-zinc-950 rounded-full p-2 shadow-md transition-transform hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white uppercase tracking-wide">Technologies</h2>
              <ul className="flex flex-wrap gap-2">
                {['HTML', 'CSS', 'JavaScript', 'jQuery', 'PHP'].map((tech) => (
                  <li key={tech} className="bg-zinc-800 text-white px-3 py-1 rounded-full text-sm">{tech}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white uppercase tracking-wide">Key Features</h2>
              <ul className="space-y-2 text-zinc-400">
                <li>• Mobile-first design</li>
                <li>• Comprehensive country profiles</li>
                <li>• Integration with third-party APIs</li>
                <li>• Responsive layout</li>
              </ul>
            </div>
            <Link 
              href="#" 
              className="inline-flex items-center px-6 py-3 border-2 
              border-white text-lg font-medium rounded-full text-white hover:bg-white hover:text-zinc-950 transition-colors"
            >
              Visit Live Site
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-white uppercase tracking-tight">Project Details</h2>
          <div className="prose prose-lg max-w-none text-zinc-400 space-y-6">
            <p>
              The Gazetteer project is a mobile-first website designed to provide comprehensive profiles for all countries. It presents demographic, climatic, and geographical data in an intuitive and visually appealing manner.
            </p>
            <p>
              One of the main challenges was integrating various third-party APIs to fetch and display accurate and up-to-date information for each country. We used PHP cURL for server-side requests, ensuring data consistency and reliability across the platform.
            </p>
            <p>
              The user interface, built with HTML, CSS, and enhanced with JavaScript and jQuery, offers a responsive design that adapts seamlessly to various screen sizes. This approach ensures an optimal viewing experience on both mobile devices and desktop computers.
            </p>
            <p>
              By leveraging AJAX for asynchronous HTTP requests, we created a smooth and interactive user experience. Users can fetch data for different countries without page reloads, resulting in a fast and efficient application that feels native on any device.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}