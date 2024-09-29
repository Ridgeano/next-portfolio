import { SparklesCore } from "@/components/ui/sparkles"
import { motion } from "framer-motion"

interface SparkleBackgroundProps {
  isScrolledPast70: boolean
}

export function SparkleBackground({ isScrolledPast70 }: SparkleBackgroundProps) {
  return (
    <motion.div 
      className="fixed inset-0 h-screen w-screen bg-[linear-gradient(to_top,_var(--tw-gradient-stops))]"
      animate={{
        "--tw-gradient-from": isScrolledPast70 ? "#ec407a" : "#4c0519", // pink-400 : pink-950
        "--tw-gradient-to": isScrolledPast70 ? "#D4D4D8" : "#09090b", // zinc-300 : zinc-950
        "--tw-gradient-stops": "var(--tw-gradient-from) 5%, var(--tw-gradient-to) 30%"
      }}
      transition={{ duration: 0.5 }}
    >
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={4.2}
        particleDensity={7}
        className="w-full h-full"
        particleColor="#ec4899" // pink-500
      />
    </motion.div>
  )
}