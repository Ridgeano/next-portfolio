'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Montserrat } from 'next/font/google'
import CrystalShape from './ui/crystalShape'
import { Code, Blocks, Palette, Server, FileCode, Globe, Database, Layout } from 'lucide-react'

const montserrat = Montserrat({ subsets: ['latin'] })

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <CrystalShape />
    </>
  )
}

export default function Summary() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const skills = [
    { name: 'React', icon: Code },
    { name: 'Next.js', icon: Globe },
    { name: 'Three.js & WebGL', icon: Blocks },
    { name: 'Node.js & Express', icon: Server },
    { name: 'UI/UX Design', icon: Layout },
    { name: 'Python, Flask', icon: FileCode },
    { name: 'JavaScript', icon: Code },
    { name: 'PHP', icon: FileCode },
    { name: 'jQuery', icon: Code },
    { name: 'Git & MySQL', icon: Database },
    { name: 'HTML5 & CSS', icon: Globe },
    { name: 'Figma', icon: Palette },
  ]

  return (
    <div className="w-full bg-zinc-900" id="summary">
      <motion.section 
        ref={ref}
        className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 sm:py-20 lg:py-24"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-12 items-center">
          <motion.div 
            className="lg:col-span-1 xl:col-span-2 order-2 lg:order-1"
            variants={itemVariants}
          >
            <div className="aspect-square w-full max-w-[600px] mx-auto">
              <Canvas dpr={[1, 2]} performance={{ min: 0.5 }}>
                <Scene />
              </Canvas>
            </div>
            <motion.p 
              className={`${montserrat.className} text-center text-white mt-4 text-base font-medium`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Click to transform the shape
            </motion.p>
          </motion.div>
          <motion.div className="lg:col-span-1 xl:col-span-3 space-y-6 order-1 lg:order-2 text-right" variants={itemVariants}>
            <h2 className="lowercase text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Building Innovative Solutions with <span className="text-violet-500">Precision</span> and Passion
            </h2>
            <p className={`${montserrat.className} text-base sm:text-lg md:text-xl lg:text-2xl text-white w-full ml-auto`}>
              I focus on creating holistic digital solutions that seamlessly integrate frontend aesthetics with robust backend functionality. By prioritizing both technical excellence and user-centric design, I deliver exceptional web experiences.
            </p>
            <div className={`${montserrat.className} text-white w-full ml-auto`}>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-end space-x-2">
                    <span>{skill.name}</span>
                    <skill.icon className="w-5 h-5 text-violet-500" />
                  </div>
                ))}
              </div>
            </div>
            <div className={`${montserrat.className} mt-8 text-white text-base sm:text-lg md:text-xl w-full ml-auto space-y-6`}>
              <p>
                My journey has been one of continuous learning and adaptation. I studied Applied Computer Science at the University of Leeds and have also dedicated significant time to self-driven learning, all while balancing full-time roles in Gastronomy & Hospitality. This background has taught me the importance of resilience, problem-solving, and the ability to think outside the box when approaching complex challenges.
              </p>
              <hr className="border-t border-violet-500 w-1/2 ml-auto" />
              <p>
                When I&apos;m not immersed in the world of code, you can find me playing favourite games including
                World of Warcraft, League of Legends, and MTG: Arena.
                I enjoy building and tinkering with my 3D printer and contributing to the open-source Voron community.
                I also stay active by going to the gym and enjoy spending time with friends and family.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}