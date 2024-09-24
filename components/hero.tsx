"use client";
import React from "react";
import { MaskContainer } from "./ui/svg-mask-effect";

export function Hero() {
  return (
    <div className="h-[60rem] w-full flex items-center justify-center overflow-hidden">
      <MaskContainer
        revealText={
          <p className="max-w-4xl mx-auto text-black text-center text-6xl font-bold">
            Hey! I'm Sean Ridgeon, software developer who loves building cool,
            user-friendly web apps.
          </p>
        }
        className="h-[60rem] w-full uppercase"
      >
        <p className="max-w-4xl mx-auto text-center text-6xl font-bold">
          HEY! I'm <span className="text-red-500">SEAN RIDGEON</span>,
          software developer who loves building cool, user-friendly web apps.
        </p>
      </MaskContainer>
    </div>
  );
}
