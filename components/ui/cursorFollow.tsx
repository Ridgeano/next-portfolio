"use client"

import { useState, useEffect } from 'react'
import { motion, useSpring, useMotionValue, useMotionValueEvent } from 'framer-motion'

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 150, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useMotionValueEvent(cursorX, "change", (latest) => {
    if (!isVisible && latest !== -100) {
      setIsVisible(true)
    }
  })

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10)
      cursorY.set(e.clientY - 10)
    }

    window.addEventListener("mousemove", moveCursor)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="cursor-follower"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: isVisible ? 1 : 0,
        mixBlendMode: "difference",
      }}
    >
      <div className="w-5 h-5 rounded-full bg-white" />
    </motion.div>
  )
}