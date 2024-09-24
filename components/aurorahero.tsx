"use client";
 
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
import {Rubik_Mono_One} from "next/font/google"

const rubikMonoOne = Rubik_Mono_One({
  display: 'swap',
  variable: '--font-rubik-mono-one',
  weight: "400",
  subsets: ['latin'] 
}) 
 
export function AuroraHero() {
  return (
    <AuroraBackground 
    className="dark bg-gradient-to-b from-zinc-950 from-10% via-pink-550 via-65% to-pink-800"
    showRadialGradient = {true}>
      <motion.div
        initial={{ opacity: 0.0, y:200 }}
        whileInView={{ opacity: 1, y:0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col justify-between h-screen gap-4"

      >
        <div className="text-5xl md:text-8xl font-bold text-wrap dark:text-white text-center">
          Sean Ridgeon
        </div>
        <div className="flex-grow"></div>
        <div className="font-extralight text-center md:text-4xl dark:text-neutral-200 py-4">
          And this, is chemical burn.
        </div>
      </motion.div>
    </AuroraBackground>
  );
}