"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { SparkleBackground } from "@/components/SparkleBackground"
import { Landing } from "@/components/Landing"
import { Preloader } from "@/components/Preloader"
import { About } from "@/components/About"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setTimeout(() => setIsLoading(false), 500) // Add a small delay for smoother transition
  }
  const { scrollYProgress } = useScroll();

  return (
    <main className="relative">
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
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        <SparkleBackground />
        <Landing />
        <About/>
      </motion.div>
    </main>
  )
}