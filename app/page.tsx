"use client"

import { SparkleBackground } from "@/components/SparkleBackground"
import { Landing } from "@/components/Landing"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="relative">
      <SparkleBackground />
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Landing />
        </motion.div>
      )}
    </main>
  )
}