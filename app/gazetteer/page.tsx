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
    <div className="min-h-screen bg-zinc-900 text-white">
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.a
            href="/"
            onClick={handleBackClick}
            className="inline-flex items-center text-white hover:bg-sky-400 transition-colors bg-zinc-950 bg-opacity-50 backdrop-blur-sm px-4 py-2 rounded-full border border-sky-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="mr-2"
              animate={{ x: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.span>
            <span className="text-lg font-semibold lowercase tracking-wider">Back</span>
          </motion.a>
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
            className="text-xl sm:text-2xl text-zinc-400 max-w-2xl border-l-4 border-sky-600 pl-4"
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
            <div className="relative aspect-video bg-zinc-800 rounded-lg overflow-hidden border-2 border-sky-600">
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
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-sky-600 text-white rounded-full p-2 shadow-md transition-transform hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextImage} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-sky-600 text-white rounded-full p-2 shadow-md transition-transform hover:scale-110"
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
              <motion.ul className="flex flex-wrap gap-2">
                {['HTML', 'CSS', 'JavaScript', 'jQuery', 'PHP'].map((tech, index) => (
                  <motion.li 
                    key={tech} 
                    className="bg-zinc-800 text-white px-3 py-1 rounded-full text-sm border border-sky-600 cursor-pointer hover:bg-sky-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {tech}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white uppercase tracking-wide">Key Features</h2>
              <ul className="space-y-2 text-zinc-400">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-600 rounded-full mr-2"></span>
                  Mobile-first design
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-600 rounded-full mr-2"></span>
                  Comprehensive country profiles
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-600 rounded-full mr-2"></span>
                  Integration with third-party APIs
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-600 rounded-full mr-2"></span>
                  Responsive layout
                </li>
              </ul>
            </div>
            <motion.div
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="http://seanridgeon.infinityfreeapp.com/gazetteer/" 
                rel="noopener noreferrer" target="_blank"
                className="inline-flex items-center px-6 py-3 border-2 
                border-sky-600 text-lg font-medium rounded-full text-white hover:bg-sky-400 transition-colors"
              >
                Visit Live Site
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-white uppercase tracking-tight inline-block border-b-2 border-sky-600 pb-2">Project Details</h2>
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
          <footer className="text-center text-zinc-200 mt-6 md:mt-10 text-sm">
          <p>&copy; 2024 Sean Ridgeon. All rights reserved.</p>
        </footer>
        </motion.div>
      </main>
    </div>
  )
}