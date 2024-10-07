import { ArrowUpRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { Montserrat } from 'next/font/google'
import { useRef } from 'react'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700'] })

export default function AboutMe() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.section 
      ref={ref}
      className={`${montserrat.className} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-base sm:text-lg lg:text-xl font-medium text-zinc-500 mb-3 sm:mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
      </motion.h2>
      <motion.h1 
        className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 sm:mb-10 lg:mb-12 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        I am a self-motivated, forward-thinking Full Stack Developer with a keen interest in UX/UI design. My goal is to create efficient, user-friendly web applications that not only function flawlessly but also provide an exceptional user experience.
      </motion.h1>
      
      <div className="grid md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-sm sm:text-base lg:text-lg font-medium text-zinc-500 mb-3 sm:mb-4">Technologies & Skills</h3>
          <ul className="space-y-2 sm:space-y-3">
            <li className="flex items-center">
              <span className="w-24 sm:w-28 font-medium">Frontend:</span>
              <span className="text-sm sm:text-base">HTML, CSS, JavaScript, React</span>
            </li>
            <li className="flex items-center">
              <span className="w-24 sm:w-28 font-medium">Backend:</span>
              <span className="text-sm sm:text-base">Node.js, Express, Python</span>
            </li>
            <li className="flex items-center">
              <span className="w-24 sm:w-28 font-medium">Database:</span>
              <span className="text-sm sm:text-base">MongoDB, MySQL</span>
            </li>
            <li className="flex items-center">
              <span className="w-24 sm:w-28 font-medium">UX/UI Design:</span>
              <span className="text-sm sm:text-base">Figma, Responsive Design</span>
            </li>
            <li className="flex items-center">
              <span className="w-24 sm:w-28 font-medium">Version Control:</span>
              <span className="text-sm sm:text-base">Git, GitHub</span>
            </li>
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-base sm:text-base lg:text-lg text-zinc-700 mb-6 sm:mb-8">
            I bring a comprehensive approach to web development, bridging the gap between frontend and backend technologies. My expertise spans across modern JavaScript frameworks, server-side programming, and database management. I'm passionate about creating efficient, scalable applications that not only perform well but also provide an exceptional user experience.
          </p>

          <motion.button
            className="group inline-flex items-center bg-violet-500 text-zinc-950 font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-violet-400 transition duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            More about me
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}