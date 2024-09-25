"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function Preloader({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          onLoadingComplete()
          return 100
        }
        return prevProgress + 1
      })
    }, 30)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-pink-800"
      initial={{ clipPath: 'inset(0 0 0 0)' }}
      animate={{ clipPath: progress === 100 ? 'inset(100% 0 0 0)' : 'inset(0 0 0 0)' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="text-white text-9xl">{progress}%</div>
    </motion.div>
  )
}