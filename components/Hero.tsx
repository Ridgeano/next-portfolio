import { motion } from "framer-motion"
import { ChevronDown } from 'lucide-react'
import GlassShards from "./ui/glassShards"

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-zinc-950">
      <GlassShards />
      <main className="absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-8 md:p-16 z-10">
        <motion.div 
          className="w-full max-w-3xl text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4 break-words whitespace-normal">
            <span className="block relative z-10 text-white text-outline-zinc">crafting</span>
            <span className="block relative z-10 text-white text-outline-zinc">digital</span>
            <span className="block relative z-10 text-white text-outline-zinc">experiences</span>
          </h1>
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light tracking-wide mr-auto relative z-10 text-left text-white text-outline-zinc-thin break-words whitespace-normal">
              full stack web developer turning ideas into elegant, efficient, and user-friendly web solutions
            </p>
          </motion.div>
        </motion.div>
      </main>
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <ChevronDown className="w-8 h-8 animate-bounce text-white" />
      </motion.div>
    </div>
  )
}