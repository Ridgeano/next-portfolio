"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function TransitionSlide() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const textScale = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 1.2, 20])
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.4], [0, 1, 1, 0])


  return (
    <div ref={containerRef} className="h-[200vh] w-full relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          className="relative flex items-center justify-center w-full h-full px-4"
          style={{ scale: textScale, opacity: textOpacity }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-zinc-300 tracking-widest text-center">
            PROJECTS
          </h1>
        </motion.div>
      </div>
    </div>
  )
}