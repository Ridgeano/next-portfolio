"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ScrollingBannerProps {
  phrase: string
  speed?: number
}

export default function ScrollingBanner({ phrase, speed = 50 }: ScrollingBannerProps) {
  const [loopNum, setLoopNum] = useState(1)
  const [textWidth, setTextWidth] = useState(0)

  useEffect(() => {
    const calculateTextWidth = () => {
      const textElement = document.createElement("span")
      textElement.style.visibility = "hidden"
      textElement.style.position = "absolute"
      textElement.style.fontSize = window.innerWidth < 640 ? "1.5rem" : "3rem" // Adjust font size based on screen width
      textElement.innerText = `${phrase} · ` // Include the interpunct in the width calculation
      document.body.appendChild(textElement)
      const calculatedWidth = textElement.offsetWidth
      document.body.removeChild(textElement)

      // Determine how many times we need to repeat the phrase to fill the screen
      const screenWidth = window.innerWidth
      const repeats = Math.ceil(screenWidth / calculatedWidth) + 1

      setTextWidth(calculatedWidth)
      setLoopNum(repeats)
    }

    calculateTextWidth()

    // Recalculate on window resize
    window.addEventListener('resize', calculateTextWidth)

    return () => {
      window.removeEventListener('resize', calculateTextWidth)
    }
  }, [phrase])

  // Don't render anything if textWidth is 0
  if (textWidth === 0) {
    return null
  }

  return (
    <div className="overflow-hidden whitespace-nowrap bg-zinc-950 py-4 sm:py-8">
      <motion.div
        className="inline-block"
        animate={{
          x: [-textWidth, 0],
        }}
        transition={{
          x: {
            duration: textWidth / speed,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {Array.from({ length: loopNum }).map((_, index) => (
          <span key={index} className="mr-4 sm:mr-8 text-2xl sm:text-4xl font-bold text-zinc-100 lowercase">
            {phrase} <span>·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}