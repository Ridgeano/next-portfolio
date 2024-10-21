"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { User, X } from "lucide-react"

const menuItems = [
  { title: "LinkedIn", href: "https://linkedin.com/in/sean-ridgeon-a49798124" },
  { title: "Resume", href: "https://example.com/resume" },
  { title: "GitHub", href: "https://github.com/ridgeano" },
]

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    },
    open: {
      opacity: 1,
      transition: { duration: 0.4, ease: [0, 0, 0.2, 1] }
    }
  }

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-16 flex justify-between items-center px-4 mt-4 z-[40]">
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-block text-2xl font-bold text-white px-3 py-2 rounded-lg bg-zinc-950 bg-opacity-50 backdrop-blur-sm transition-shadow duration-300 ease-in-out hover:shadow-[0_0_15px_theme(colors.violet.500)]">
            {isMobile ? "sr" : "sean ridgeon"}
          </div>
        </motion.div>
        <motion.button
          className={`w-12 h-12 flex justify-center items-center focus:outline-none rounded-lg bg-zinc-950 bg-opacity-50 backdrop-blur-sm transition-shadow duration-300 ease-in-out ${
            isOpen
              ? "shadow-[0_0_20px_theme(colors.violet.500)]"
              : "hover:shadow-[0_0_20px_theme(colors.violet.500)]"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open contact menu"}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X className="w-7 h-7 text-white" />
            ) : (
              <User className="w-7 h-7 text-white" />
            )}
          </motion.div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-20 right-4 z-[30]"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <nav>
              <ul className="space-y-4">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.title}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={item.href}
                      className="inline-block text-lg font-bold lowercase text-white hover:text-black px-4 py-2 rounded-lg bg-violet-500 bg-opacity-80 backdrop-blur-sm hover:bg-opacity-100 transition-all duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}