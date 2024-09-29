'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, MapPin } from 'lucide-react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Form submitted:', { name, email, message })
    setName('')
    setEmail('')
    setMessage('')
    setIsSubmitting(false)
  }

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4 relative overflow-hidden">
      <div className="max-w-4xl w-full z-10">
        <motion.h2 
          className="text-5xl font-bold mb-12 text-center text-pink-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          let's connect
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4 lowercase">get in touch</h3>
            <p className="text-gray-300 lowercase">
              have a project in mind? want to collaborate? or just want to say hi? 
              i'd love to hear from you!
            </p>
            <div className="flex items-center space-x-4 text-gray-300 lowercase">
              <MapPin className="h-6 w-6" />
              <span>leeds, uk</span>
            </div>
            <div className="flex items-center space-x-4 text-gray-300 lowercase">
              <Linkedin className="h-6 w-6" />
              <a href="https://www.linkedin.com/in/sean-ridgeon-a49798124/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-800 transition-colors">linkedin</a>
            </div>
            <div className="flex items-center space-x-4 text-gray-300 lowercase">
              <Github className="h-6 w-6" />
              <a href="https://github.com/Ridgeano" target="_blank" rel="noopener noreferrer" className="hover:text-pink-800 transition-colors">github</a>
            </div>
          </motion.div>
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1 lowercase">name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-800 text-white"
                placeholder="your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 lowercase">email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-800 text-white"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1 lowercase">message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-800 text-white resize-none"
                placeholder="your message here..."
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full py-3 px-6 text-white bg-pink-800 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-800 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-colors duration-300 lowercase"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'send message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}