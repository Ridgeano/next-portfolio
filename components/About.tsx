"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function About() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div ref={containerRef} className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-pink-800 opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="sm:flex sm:items-start sm:justify-between">
          <motion.div
            className="sm:w-1/2 sm:sticky sm:top-24 sm:self-start"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl sm:text-6xl font-bold leading-tight mb-8 text-white">
              about<br />me
            </h2>
          </motion.div>
          <div className="sm:w-1/2 space-y-24 mt-12 sm:mt-0">
            <motion.div className="space-y-8 ">
              {[
                {
                  text: "I'm a passionate software developer based in the UK, with a keen eye for creating efficient, scalable, and user-friendly applications. With a strong foundation in both front-end and back-end technologies, I bring a holistic approach to every project I undertake.",
                  heading: null
                },
                {
                  heading: "SKILLS & EXPERTISE",
                  text: "My toolkit includes React, Next.js, TypeScript, and Node.js, allowing me to build robust full-stack applications. I'm also well-versed in modern development practices such as CI/CD, test-driven development, and agile methodologies."
                },
                {
                  heading: "WHY WORK WITH ME?",
                  text: "I'm not just a coder; I'm a problem solver. I thrive on challenges and am always eager to learn new technologies. My commitment to clean, maintainable code and my ability to communicate complex technical concepts to non-technical stakeholders make me an asset to any development team."
                },
                /*{
                  heading: "LOOKING FORWARD",
                  text: "I'm always on the lookout for exciting projects and opportunities to grow. Whether it's a startup looking to build their MVP or an established company needing to modernize their tech stack, I'm ready to bring my skills and enthusiasm to the table."
                }*/
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={paragraphVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {item.heading && (
                    <h3 className="text-3xl sm:text-4xl font-bold text-pink-500 mb-4">
                      {item.heading}
                    </h3>
                  )}
                  <p className="text-lg sm:text-xl text-white">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}