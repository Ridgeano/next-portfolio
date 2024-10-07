"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', { name, email, message })
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <section className="bg-zinc-950 text-white py-12 md:py-24 lowercase min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-8 md:mb-16 text-center tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let's Create Together
        </motion.h2>
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-16">
          <motion.div 
            className="w-full md:w-1/3 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Get in Touch</h3>
            <p className="mb-6 md:mb-8 text-gray-400">I'm always looking for new opportunities. Send me a message and let's create something amazing.</p>
          </motion.div>
          <motion.div 
            className="w-full md:w-1/2 lowercase"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 lowercase">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border-2 border-gray-700 rounded-md focus:border-violet-500 transition-colors duration-300 outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border-2 border-gray-700 rounded-md focus:border-violet-500 transition-colors duration-300 outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-zinc-900 border-2 border-gray-700 rounded-md focus:border-violet-500 transition-colors duration-300 outline-none resize-none"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-violet-500 text-black font-bold py-3 px-6 rounded-full hover:bg-violet-400 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                send message
              </motion.button>
            </form>
          </motion.div>
        </div>
        <footer className="text-center text-zinc-200 mt-8 md:mt-16">
          <p>&copy; 2024 Sean Ridgeon. All rights reserved.</p>
        </footer>
      </div>
    </section>
  )
}