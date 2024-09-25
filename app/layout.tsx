import './globals.css'
import type { Metadata } from 'next'
import { Major_Mono_Display } from 'next/font/google'
import { SmoothScroll } from '@/components/SmoothScroll'

const majorMonoDisplay = Major_Mono_Display({
  subsets: ["latin"],
  weight: "400",
  variable: '--font-major-mono-display',
})

export const metadata: Metadata = {
  title: 'Sean Ridgeon - Software Developer',
  description: 'Portfolio of Sean Ridgeon, a software developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${majorMonoDisplay.variable} font-major-mono antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}