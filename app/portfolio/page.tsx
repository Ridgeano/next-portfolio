"use client"

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700'] })

export default function NextJsPortfolio() {
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
            <motion.a
              href="/"
              onClick={handleBackClick}
              className="inline-flex items-center text-white hover:bg-fuchsia-600 transition-colors bg-zinc-950 bg-opacity-50 backdrop-blur-sm px-4 py-2 rounded-full border border-fuchsia-600"
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
            Next.js Portfolio
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-zinc-400 max-w-2xl border-l-4 border-fuchsia-600 pl-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A dynamic, 3D-enhanced portfolio website built with Next.js and React Three Fiber, showcasing my projects and skills as a web developer.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative aspect-video bg-zinc-800 rounded-lg overflow-hidden border-2 border-fuchsia-600">
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
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-fuchsia-600 text-white rounded-full p-2 shadow-md transition-transform hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextImage} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-fuchsia-600 text-white rounded-full p-2 shadow-md transition-transform hover:scale-110"
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
                {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'React Three Fiber', 'Framer Motion'].map((tech, index) => (
                  <motion.li 
                    key={tech} 
                    className="bg-zinc-800 text-white px-3 py-1 rounded-full text-sm border border-fuchsia-600 cursor-pointer hover:bg-fuchsia-600 transition-colors"
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
                  <span className="w-2 h-2 bg-fuchsia-600 rounded-full mr-2"></span>
                  3D glass shard hero container
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-fuchsia-600 rounded-full mr-2"></span>
                  Responsive design with smooth animations
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-fuchsia-600 rounded-full mr-2"></span>
                  Server-side rendering for optimal performance
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-fuchsia-600 rounded-full mr-2"></span>
                  Interactive project showcases
                </li>
              </ul>
            </div>
            <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.div
              whileHover={{ scale: 1.05, x: 0 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="inline-flex items-center px-6 py-3 border-2 
                border-fuchsia-600 text-lg font-medium rounded-full text-white hover:bg-fuchsia-600 transition-colors"
              >
                Currently Viewing
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 0, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <span className="block w-3 h-3 rounded-full bg-white"></span>
                </motion.span>
              </div>
            </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-white uppercase tracking-tight inline-block border-b-2 border-fuchsia-600 pb-2">Project Details</h2>
          <div className="prose prose-lg max-w-none text-zinc-400 space-y-6">
          <p>
            This Next.js Portfolio project represents a significant leap in my development skills, 
            combining cutting-edge web technologies with 3D graphics to create a unique and 
            engaging user experience. The standout feature is the hero container, which utilizes 
            React Three Fiber to render an intricate, interactive 3D glass shard effect that 
            immediately captures visitors&apos; attention.
          </p>
          <p>
            One of the main challenges was integrating the 3D elements seamlessly with the rest of the 
            website while maintaining optimal performance. This required careful optimization of the 
            Three.js scenes and judicious use of React&apos;s useEffect and useMemo hooks to manage 
            render cycles efficiently.
          </p>
          <p>
            The portfolio showcases my projects through a combination of static generation for faster 
            initial page loads and client-side transitions for smooth navigation. Each project page 
            features interactive elements that allow visitors to explore the technologies used and 
            key features implemented.
          </p>
          <p>
            Leveraging the power of Next.js and TypeScript, the codebase is structured for 
            scalability and maintainability. The use of Tailwind CSS allowed for rapid styling 
            iterations, while Framer Motion brought fluid animations to life, enhancing the overall 
            user experience without compromising on performance.
          </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}