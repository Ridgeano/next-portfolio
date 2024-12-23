import type { Metadata } from 'next'
import { Major_Mono_Display } from 'next/font/google'
import { SmoothScroll } from '@/components/SmoothScroll'
import { SpeedInsights } from '@vercel/speed-insights/next'

const majorMonoDisplay = Major_Mono_Display({
  subsets: ["latin"],
  weight: "400",
  variable: '--font-major-mono-display',
})

export const metadata: Metadata = {
  title: 'Sean Ridgeon - Software Developer',
  description: 'A self-motivated, forward-thinking Full Stack Developer with a keen interest in UX/UI',
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${majorMonoDisplay.variable}`}>
      <SmoothScroll>{children}</SmoothScroll>
      <SpeedInsights />
    </div>
  )
}