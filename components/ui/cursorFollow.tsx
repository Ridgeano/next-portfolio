"use client"

import { useState, useEffect } from 'react'
import { motion, useSpring, useMotionValue, useMotionValueEvent } from 'framer-motion'

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useMotionValueEvent(cursorX, "change", (latest) => {
    if (!isVisible && latest !== -100) {
      setIsVisible(true)
    }
  })

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20)
      cursorY.set(e.clientY - 20)
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
      }}
    >
      <div className="w-10 h-10 rounded-full border-2 border-pink-500 opacity-50 " />
    </motion.div>
  )
}