'use client'

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Preloader } from "@/components/Preloader"
import Hero from "@/components/Hero"
import Nav from "@/components/Nav"
import CursorFollower from "@/components/ui/cursorFollow"
import ScrollingBanner from "@/components/scrollingBanner"
import FeaturedWork from "@/components/FeaturedWork"
import Contact from "@/components/Contact"
import Summary from "@/components/Summary"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const [shouldShowPreloader, setShouldShowPreloader] = useState(false)

  const handleLoadingComplete = () => {
    setTimeout(() => setIsLoading(false), 300) 
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const currentHeroRef = heroRef.current

    if (currentHeroRef) {
      observer.observe(currentHeroRef)
    }

    return () => {
      if (currentHeroRef) {
        observer.unobserve(currentHeroRef)
      }
    }
  }, [])

  useEffect(() => {
    const isInitialLoad = sessionStorage.getItem('initialLoad') === null;
    const isRootPath = window.location.pathname === '/';

    if (isInitialLoad && isRootPath) {
      setShouldShowPreloader(true);
      sessionStorage.setItem('initialLoad', 'false');
    } else {
      setIsLoading(false);
    }

    const handleBeforeUnload = () => {
      sessionStorage.removeItem('initialLoad');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <motion.main
      className="relative min-h-screen bg-zinc-100"
      initial={false}
      animate={isLoading ? { height: "100vh", overflow: "hidden" } : { height: "auto", overflow: "hidden" }}
    >
      <AnimatePresence>
        {shouldShowPreloader && isLoading && (
          <Preloader key="preloader" onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <CursorFollower />
      {!isLoading && <Nav isHeroVisible={isHeroVisible} />}
      <div ref={heroRef}>
        <Hero />
      </div>
      <FeaturedWork />
      <ScrollingBanner phrase={"What you can expect from me"} />
      <Summary />
      <Contact />
    </motion.main>
  )
}