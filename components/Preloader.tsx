"use client"

import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onLoadingComplete: () => void
}

interface Point {
  x: number
  y: number
}

export function Preloader({ onLoadingComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isCracking, setIsCracking] = useState(false)
  const [shouldHidePercentage, setShouldHidePercentage] = useState(false)

  const generateCrackPattern = () => {
    const points: Point[] = []
    const numPoints = 25
    const width = 100
    const height = 100
    const margin = 5

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: margin + Math.random() * (width - 2 * margin),
        y: margin + Math.random() * (height - 2 * margin)
      })
    }

    const cracks: string[] = []
    points.forEach((point) => {
      const closestPoints = findClosestPoints(point, points, 3)
      closestPoints.forEach(closePoint => {
        cracks.push(`M${point.x},${point.y} L${closePoint.x},${closePoint.y}`)
      })
    })

    return cracks
  }

  const findClosestPoints = (point: Point, points: Point[], num: number) => {
    return points
      .filter(p => p !== point)
      .sort((a, b) => 
        Math.hypot(a.x - point.x, a.y - point.y) - Math.hypot(b.x - point.x, b.y - point.y)
      )
      .slice(0, num)
  }

  // Generate crack pattern once and saves it
  const crackPaths = useMemo(() => generateCrackPattern(), [])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          setIsCracking(true)
          return 100
        }
        return prevProgress + 1
      })
    }, 2)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (isCracking) {
      const hidePercentageTimeout = setTimeout(() => {
        setShouldHidePercentage(true)
      }, 1800) // Hide percentage 200ms before completion

      const crackTimeout = setTimeout(() => {
        setIsComplete(true)
      }, 2000)

      return () => {
        clearTimeout(hidePercentageTimeout)
        clearTimeout(crackTimeout)
      }
    }
  }, [isCracking])

  useEffect(() => {
    if (isComplete) {
      const completeTimeout = setTimeout(() => {
        onLoadingComplete()
      }, 1000)
      return () => clearTimeout(completeTimeout)
    }
  }, [isComplete, onLoadingComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-zinc-900 overflow-hidden z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="crackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />{/*Blue 600*/}
                <stop offset="50%" stopColor="#7c3aed" /> {/*Violet 600*/}
                <stop offset="100%" stopColor="#c026d3" />{/*Fuchsia 600*/}
              </linearGradient>
            </defs>
            <motion.g
              initial="hidden"
              animate={isCracking ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: {},
              }}
              transition={{
                staggerChildren: 0.01,
              }}
            >
              {crackPaths.map((path, index) => (
                <motion.path
                  key={index}
                  d={path}
                  stroke="url(#crackGradient)"
                  strokeWidth="0.2"
                  fill="none"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { pathLength: 1, opacity: 0.7 }
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              ))}
            </motion.g>
          </svg>
          
          <div className="relative w-80 h-80 flex items-center justify-center">
            <AnimatePresence>
              {!shouldHidePercentage && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-white text-9xl font-bold"
                  initial={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {progress}%
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}