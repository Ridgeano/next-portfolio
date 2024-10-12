import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const navItems = [
  { title: "HOME", href: "/" },
  { title: "PROJECTS", href: "/#projects" },
  { title: "ABOUT", href: "/about" },
  { title: "CONTACT", href: "/contact" }
]

const socialItems = [
  { title: "LinkedIn", href: "https://linkedin.com" },
  { title: "Résumé", href: "https://twitter.com" },
  { title: "GitHub", href: "https://github.com" },
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
      scale: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0, 0, 0.2, 1] }
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-16 flex justify-between items-center px-4 mt-4 z-[40]">
        <div className="flex-1">
          <AnimatePresence>
            {isHeroVisible && (
              <motion.div
                className="text-2xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                sean ridgeon
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          className="w-12 h-12 flex flex-col justify-center items-center focus:outline-none rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ease-out ${isOpen ? 'bg-black rotate-45 translate-y-1' : 'bg-black'}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ease-out ${isOpen ? 'bg-black opacity-0' : 'bg-black opacity-100 my-1'}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ease-out ${isOpen ? 'bg-black -rotate-45 -translate-y-1' : 'bg-black'}`}></span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed bg-violet-500 flex flex-col rounded-lg z-[30] ${
              isMobile
                ? 'inset-2'
                : 'top-2 right-2 w-80 h-auto max-h-[calc(100vh-1rem)]'
            }`}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{ originX: 1, originY: 0 }}
          >
            <div className={`flex flex-col h-full ${isMobile ? 'p-4' : 'p-8'}`}>
              <nav className="flex-grow mt-16">
                <ul className="space-y-6">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={item.href} className="text-2xl font-bold lowercase text-black hover:underline">
                        {item.title}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto pt-8">
                <ul className="flex flex-wrap gap-4">
                  {socialItems.map((item) => (
                    <li key={item.title}>
                      <Link href={item.href} className="text-sm font-bold lowercase text-black hover:underline">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}