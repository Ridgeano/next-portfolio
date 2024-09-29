"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { SparkleBackground } from "@/components/SparkleBackground"
import { Landing } from "@/components/Landing"
import { Preloader } from "@/components/Preloader"
import { About } from "@/components/About"
import { TransitionSlide } from "@/components/TransitionSlide"
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
    setIsScrolledPast70(latest > 0.7)
  })

  return (
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
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.div
        ref={contentRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        <CursorFollower />
        <SparkleBackground isScrolledPast70={isScrolledPast70} />
        <Landing />
        <About />
        <TransitionSlide/>
      </motion.div>
    </motion.main>
  )
}