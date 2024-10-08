"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)

  const handleLoadingComplete = () => {
    setTimeout(() => setIsLoading(false), 500) 
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting)
      },
      { threshold: 0.1 } // Trigger when 10% of the hero is visible
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

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
        <CursorFollower />
        <Nav isHeroVisible={isHeroVisible} />
        <div ref={heroRef}>
          <Hero />
        </div>
        <FeaturedWork />
        <ScrollingBanner phrase={"What you can expect from me"} />
        <AboutMe />
        <Contact />
      </motion.main>
    </div>
  )
}