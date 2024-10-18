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
  const [shouldShowPreloader, setShouldShowPreloader] = useState(false)

  const handleLoadingComplete = () => {
    setTimeout(() => setIsLoading(false), 300) 
  }

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
      className="relative min-h-dvh bg-zinc-900"
      initial={false}
      animate={isLoading ? { height: "100dvh", overflow: "hidden" } : { height: "auto", overflow: "hidden" }}
    >
      <AnimatePresence>
        {shouldShowPreloader && isLoading && (
          <Preloader key="preloader" onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <CursorFollower />
      <Nav/>
      <Hero />
      <FeaturedWork />
      <ScrollingBanner phrase={"What you can expect from me"} />
      <Summary />
      <Contact />
    </motion.main>
  )
}