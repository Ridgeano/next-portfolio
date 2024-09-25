"use client"

import { motion } from "framer-motion"

export function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 2.0,
        ease: "easeInOut",
      }}
      className="dark relative flex flex-col justify-between h-screen gap-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-6xl md:text-9xl font-bold text-wrap dark:text-pink-800 text-center"
      >
        SEAN RIDGEON
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="text-3xl md:text-6xl font-bold text-wrap dark:text-white text-center"
      >
        software developer
      </motion.div>
      <div className="flex-grow"></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="font-extralight text-center md:text-4xl dark:text-neutral-200 py-12 "
      >
        scroll down to continue
      </motion.div>
    </motion.div>
  )
}
