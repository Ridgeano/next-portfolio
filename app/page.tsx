"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Preloader } from "@/components/Preloader"

import Hero from "@/components/Hero"
import Nav from "@/components/Nav"
import CursorFollower from "@/components/ui/cursorFollow"


export default function Component() {
  const [isLoading, setIsLoading] = useState(true)
  const [isScrolledPast70, setIsScrolledPast70] = useState(false)
  const contentRef = useRef(null)

  const handleLoadingComplete = () => {
    setTimeout(() => setIsLoading(false), 500) 
  }

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsScrolledPast70(latest > 0.5)
  })

  return (
    <div className="min-h-screen bg-gray-100">
    <motion.main
      className="relative"
      initial={false}
      animate={isLoading ? { height: "100vh", overflow: "hidden" } : { height: "auto", overflow: "visible" }}
    >

      <AnimatePresence>
        {isLoading && (
          <Preloader key="preloader" onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
    <CursorFollower/>
    <Nav/>
    <Hero/>
    </motion.main>
    </div>
  )
}