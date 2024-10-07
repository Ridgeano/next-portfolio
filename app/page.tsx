"use client"

import { useState} from "react"
import { motion, AnimatePresence} from "framer-motion"
import { Preloader } from "@/components/Preloader"

import Hero from "@/components/Hero"
import Nav from "@/components/Nav"
import CursorFollower from "@/components/ui/cursorFollow"
import ScrollingBanner from "@/components/scrollingBanner"
import FeaturedWork from "@/components/FeaturedWork"
import Contact from "@/components/Contact"
import AboutMe from "@/components/AboutMe"


export default function Component() {
  const [isLoading, setIsLoading] = useState(true)
  const handleLoadingComplete = () => {
    setTimeout(() => setIsLoading(false), 500) 
  }

  return (
    <div className="min-h-screen bg-zinc-100">
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
    <FeaturedWork/>
    <ScrollingBanner phrase={"What you can expect from me"}/>
    <AboutMe/>
    <Contact/>
    </motion.main>
    </div>
  )
}