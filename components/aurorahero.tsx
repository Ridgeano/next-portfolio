"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
import { Rubik_Mono_One } from "next/font/google";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";

const rubikMonoOne = Rubik_Mono_One({
  display: "swap",
  variable: "--font-rubik-mono-one",
  weight: "400",
  subsets: ["latin"],
});

export function AuroraHero() {
  return (
    <>
      <StarsBackground 
      className="bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))]  from-pink-950 from-5% to-zinc-950 to-45%" 
      starDensity={0.00005}/>
      <motion.div
        initial={{ opacity: 0.0, y: 800 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="dark relative flex flex-col justify-between h-screen gap-4"
      >
        <div className="text-6xl md:text-9xl font-bold text-wrap dark:text-pink-800 text-center">
          Sean Ridgeon
        </div>
        <div className="text-3xl md:text-6xl font-bold text-wrap dark:text-white text-center">
          Software Developer
        </div>
        <div className="flex-grow"></div>
        <div className="font-extralight text-center md:text-4xl dark:text-neutral-200 py-4">
          SCROLL UP TO CONTINUE
        </div>
      </motion.div>
    </>
  );
}
