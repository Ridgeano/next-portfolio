import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const menuItems = [
  { title: "LinkedIn", href: "https://linkedin.com/in/sean-ridgeon-a49798124" },
  { title: "Resume", href: "https://example.com/resume" },
  { title: "GitHub", href: "https://github.com/ridgeano" },
]

interface NavProps {
  isHeroVisible: boolean
}

export default function Nav({ isHeroVisible }: NavProps) {
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
        <div className="flex-1">
          <AnimatePresence>
            {(
              <motion.div
                className="inline-block text-2xl font-bold text-white px-3 py-2 rounded-lg bg-zinc-950 bg-opacity-50 backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {isMobile ? "sr" : "sean ridgeon"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          className="w-12 h-12 flex flex-col justify-center 
          items-center focus:outline-none rounded-lg bg-zinc-950 bg-opacity-50 backdrop-blur-sm"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ease-out ${isOpen ? 'bg-white rotate-45 translate-y-1' : 'bg-white'}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ease-out ${isOpen ? 'bg-white opacity-0' : 'bg-white opacity-100 my-1'}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ease-out ${isOpen ? 'bg-white -rotate-45 -translate-y-1' : 'bg-white'}`}></span>
        </button>
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