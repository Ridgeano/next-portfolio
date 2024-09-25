"use client"
import React from "react"
import { SparklesCore } from "./ui/sparkles"


export function SparkleBackground() {
  return (
    <div className="fixed inset-0 h-screen w-screen 
    bg-[linear-gradient(to_top,_var(--tw-gradient-stops))]
     from-pink-950 from-5% to-zinc-950 to-30%">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={4.2}
        particleDensity={7}
        className="w-full h-full"
        particleColor="#831843"
      />
    </div>
  )
}