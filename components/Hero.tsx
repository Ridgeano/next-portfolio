import { motion } from "framer-motion"
import { ChevronDown } from 'lucide-react'
import GlassShards from "./ui/glassShards"

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden lowercase bg-zinc-950">
      <GlassShards />
      <main className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 z-10">
        <motion.div 
          className="w-full max-w-3xl text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-extrabold tracking-tight mb-4">
            <span className="block relative z-10 text-white text-outline-white">crafting</span>
            <span className="block relative z-10 text-white text-outline-white">digital</span>
            <span className="block relative z-10 text-white text-outline-white">experiences</span>
          </h1>
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl 
            font-light tracking-wide mr-auto relative z-10 text-left text-white text-outline-white-thin">
              full stack web developer turning ideas into elegant, efficient, and user-friendly web solutions
            </p>
          </motion.div>
        </motion.div>
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <ChevronDown className="w-8 h-8 animate-bounce text-white" />
        </motion.div>
      </main>
    </div>
  )
}