'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Montserrat } from 'next/font/google'
import { useFormState } from 'react-dom'
import { submitContactForm } from '@/api/contact'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700'] })

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [state, formAction] = useFormState(submitContactForm, { errors: {}, message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    formAction(formData)
  }

  return (
    <section className="bg-zinc-950 text-white py-8 md:py-16 lowercase min-h-screen md:min-h-[600px] flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-6 md:mb-10 text-center tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let&apos;s Create Together
        </motion.h2>
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-10">
          <motion.div 
            className="w-full md:w-1/3 mb-6 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Get in Touch</h3>
            <p className="mb-4 md:mb-6 text-white text-sm md:text-base">I&apos;m always looking for new opportunities. 
              Send me a message and let&apos;s create something amazing.</p>
          </motion.div>
          <motion.div 
            className="w-full md:w-1/2 lowercase"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form action={formAction} onSubmit={handleSubmit} className="space-y-3 md:space-y-4 lowercase">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${montserrat.className} w-full px-3 py-2 bg-zinc-900 border-2 border-gray-700 rounded-md focus:border-violet-500 transition-colors duration-300 outline-none text-sm`}
                  required
                />
                {state.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${montserrat.className} w-full px-3 py-2 bg-zinc-900 border-2 border-gray-700 rounded-md focus:border-violet-500 transition-colors duration-300 outline-none text-sm`}
                  required
                />
                {state.errors?.email && <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">message</label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className={`${montserrat.className} w-full px-3 py-2 bg-zinc-900 border-2 border-gray-700 rounded-md focus:border-violet-500 transition-colors duration-300 outline-none resize-none text-sm`}
                  required
                ></textarea>
                {state.errors?.message && <p className="text-red-500 text-xs mt-1">{state.errors.message[0]}</p>}
              </div>
              <motion.button
                type="submit"
                className="w-full bg-violet-500 text-black font-bold py-2 px-4 rounded-full hover:bg-violet-400 transition duration-300 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                send message
              </motion.button>
            </form>
            {state.message && (
              <motion.p 
                className={`mt-4 text-center ${state.message.includes('error') ? 'text-red-500' : 'text-green-500'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {state.message}
              </motion.p>
            )}
          </motion.div>
        </div>
        <footer className="text-center text-zinc-200 mt-6 md:mt-10 text-sm">
          <p>&copy; 2024 Sean Ridgeon. All rights reserved.</p>
        </footer>
      </div>
    </section>
  )
}