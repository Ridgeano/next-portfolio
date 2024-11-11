"use client"

import { useState, useRef } from 'react'
import Image from "next/legacy/image"
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700'] })

export default function CompanyDirectory() {
  const [currentImage] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const images = [
    '/companyDirectory.png',
  ]

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
              className="inline-flex items-center text-white hover:bg-blue-600 transition-colors bg-zinc-950 bg-opacity-50 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-600"
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
            Company Directory
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-zinc-400 max-w-2xl border-l-4 border-blue-600 pl-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A comprehensive web application for managing and searching company personnel, departments and locations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative aspect-video bg-zinc-800 rounded-lg overflow-hidden border-4 border-blue-600">
              <Image 
                src={images[currentImage]} 
                alt="Project screenshot" 
                layout="fill" 
              />
              <AnimatePresence>
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                />
              </AnimatePresence>
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
                {['HTML', 'CSS', 'JavaScript', 'jQuery', 'PHP', 'MySQL'].map((tech, index) => (
                  <motion.li 
                    key={tech} 
                    className="bg-zinc-800 text-white px-3 py-1 rounded-full text-sm border border-blue-600 cursor-pointer hover:bg-blue-600 transition-colors"
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
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Mobile-first, responsive design
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  CRUD functionality for personnel management
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Advanced search capabilities
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Department and location management
                </li>
              </ul>
            </div>
            <motion.div
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="http://seanridgeon.infinityfreeapp.com/companydirectory/" 
                rel="noopener noreferrer" target="_blank"
                className="inline-flex items-center px-6 py-3 border-2 
                border-blue-600 text-lg font-medium rounded-full text-white hover:bg-blue-600 transition-colors"
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
          <h2 className="text-4xl font-bold mb-8 text-white uppercase tracking-tight inline-block border-b-2 border-blue-600 pb-2">Project Details</h2>
          <div className="prose prose-lg max-w-none text-zinc-400 space-y-6">
            <p>
              The Company Directory is a comprehensive web application designed to manage and display company 
              personnel information.
            </p>
            <p>
              One of the main challenges was implementing a robust search functionality that allows users to 
              find staff, departments and locations using single or multiple criteria. This required careful 
              consideration of database design and query optimization to ensure fast and accurate results.
            </p>
            <p>
              The user interface, built with HTML, CSS and enhanced with JavaScript & jQuery, offers a 
              responsive design that works seamlessly on both mobile devices and desktop computers. This approach ensures an optimal user experience across all platforms.
            </p>
            <p>
              By leveraging PHP for server-side processing and MySQL for data storage, I created a powerful and 
              efficient backend system. The use of AJAX for asynchronous requests allows for smooth interactions 
              and real-time updates without page reloads, resulting in a fast and responsive application.
            </p>
            <p>
              To ensure data integrity and enhance user experience, comprehensive error checking has been implemented on both 
              the front-end and back-end. This minimizes user errors, validates input data and provides meaningful feedback. 
              Resulting in a robust and reliable system for managing company information.
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