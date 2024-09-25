"use client";
import React from "react";
import { SparklesCore } from "./ui/sparkles";
import { motion } from "framer-motion";
import { Rubik_Mono_One,Major_Mono_Display } from "next/font/google";
 
const rubikMonoOne = Rubik_Mono_One({
  subsets: ["latin"],
  weight: "400",
});
const majorMonoDisplay = Major_Mono_Display({
  subsets: ["latin"],
  weight: "400",
});

export function SparkleHero() {
  return (
    //STARSBACKGROUND
    <>
  <div className={`${majorMonoDisplay.className} dark relative h-screen gap-4 bg-[linear-gradient(to_top,_var(--tw-gradient-stops))] from-pink-950 from-5% to-zinc-950 to-30% flex flex-col items-center justify-center overflow-hidden`}>
    
    <div className="absolute inset-0 h-screen">
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

    <motion.div
      initial={{ opacity: 0.0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 2.0,
        ease: "easeInOut",
      }}
      className="relative flex flex-col justify-between h-screen gap-4"
    >
      <div className= "text-6xl md:text-9xl font-bold text-wrap dark:text-pink-800 text-center">
        SEAN RIDGEON
      </div>
      <div className="text-3xl md:text-6xl font-bold text-wrap dark:text-white text-center">
        software developer
      </div>
      <div className="flex-grow"></div>
      </motion.div>
      <div className="font-extralight text-center md:text-4xl dark:text-neutral-200 py-4">
        scroll up to continue
      </div>
  </div>
  </>
    
  );
}