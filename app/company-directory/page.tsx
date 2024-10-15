"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700'] })

export default function Company() {
  const [currentImage, setCurrentImage] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      if (link && link.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const id = link.getAttribute('href')?.slice(1)
        const element = document.getElementById(id!)
        if (element) {
          const headerHeight = headerRef.current?.offsetHeight || 0
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-100">
      <header ref={headerRef} className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center text-zinc-900 hover:text-zinc-600">
            <ChevronLeft className="h-5 w-5 mr-2" />
            <span className="text-lg font-semibold lowercase">Back</span>
          </Link>
        </div>
      </header>

      <main className={`${montserrat.className} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12`} style={{ paddingTop: 'calc(1rem + var(--header-height, 64px))' }}>
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Company Directory
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
                A mobile-first website that provides comprehensive profiles for all countries, presenting demographic, climatic, and geographical data using third-party APIs.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 mb-2">Technologies Used</h2>
              <ul className="list-disc list-inside text-zinc-600">
                <li>HTML/CSS</li>
                <li>JavaScript</li>
                <li>jQuery (DOM Manipulation / AJAX)</li>
                <li>PHP (cURL)</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 mb-2">Key Features</h2>
              <ul className="list-disc list-inside text-zinc-600">
                <li>Mobile-first design</li>
                <li>Comprehensive country profiles</li>
                <li>Integration with third-party APIs</li>
                <li>Responsive layout for desktop and mobile</li>
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
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-zinc-900 mb-6">Project Details</h2>
          <div className="prose prose-lg max-w-none text-zinc-600">
            <p>
              The Gazetteer project is designed as a &quot;mobile first&quot; website that operates equally well on desktop computers. It aims to provide comprehensive profiles for all countries, presenting demographic, climatic, and geographical data.
            </p>
            <p>
              One of the main challenges was integrating various third-party APIs to fetch and display accurate and up-to-date information for each country. We used PHP cURL for server-side requests to interact with these external APIs, ensuring data consistency and reliability.
            </p>
            <p>
              The user interface was built using HTML and CSS, with JavaScript and jQuery adding dynamic functionality and interactivity. This approach allowed us to create a responsive design that adapts seamlessly to different screen sizes, from mobile devices to desktop computers.
            </p>
            <p>
              AJAX was utilized to handle asynchronous HTTP requests, providing a smooth user experience when fetching data for different countries without requiring page reloads. This resulted in a fast, efficient application that feels native on both mobile and desktop platforms.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}