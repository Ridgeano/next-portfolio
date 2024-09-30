"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

export function Projects() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <div className="relative min-h-screen lowercase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-5xl sm:text-6xl font-bold leading-tight mb-4 text-zinc-950">
            PROJECTS
          </h2>
        </div>
        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 h-full w-full z-10"
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {active && typeof active === "object" ? (
            <div className="fixed inset-0 grid place-items-center z-[100]">
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="flex absolute top-4 right-4 items-center justify-center bg-white rounded-full h-8 w-8 sm:h-10 sm:w-10"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[500px] sm:max-w-[800px] h-full sm:h-auto sm:max-h-[90%] 
                flex flex-col bg-white dark:bg-neutral-900 overflow-hidden sm:rounded-3xl"
              >
                <motion.div layoutId={`image-${active.title}-${id}`}>
                  <Image
                    priority
                    width={800}
                    height={400}
                    src={active.src}
                    alt={active.title}
                    className="w-full h-60 sm:h-80 object-cover object-top"
                  />
                </motion.div>

                <div className="flex flex-col justify-between flex-grow">
                  <div className="flex flex-col sm:flex-row justify-between items-start p-4 sm:p-6">
                    <div className="mb-4 sm:mb-0">
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="text-2xl sm:text-3xl font-bold text-neutral-700 dark:text-neutral-200"
                      >
                        {active.title}
                      </motion.h3>
                    </div>

                    <motion.a
                      layoutId={`button-${active.title}-${id}`}
                      href={active.ctaLink}
                      target="_blank"
                      className="px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg rounded-full font-bold bg-green-500 text-white"
                    >
                      {active.ctaText}
                    </motion.a>
                  </div>
                  <div className="pt-4 relative px-4 sm:px-6 flex-grow">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-neutral-600 text-base sm:text-lg h-60 sm:h-auto pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                    >
                      {typeof active.content === "function"
                        ? active.content()
                        : active.content}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        {/*CARD PREVIEW*/}
        <ul className="max-w-7xl mx-auto w-full gap-6 px-4 sm:px-6 lg:px-8 ">
          {cards.map((card, index) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={`card-${card.title}-${id}`}
              onClick={() => setActive(card)}
              className="p-4 sm:p-6 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-pink-500 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 sm:gap-6 flex-col md:flex-row">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <Image
                    width={160}
                    height={160}
                    src={card.src}
                    alt={card.title}
                    className="h-40 w-40 sm:h-48 sm:w-48 md:h-20 md:w-20 rounded-lg object-cover object-top"
                  />
                </motion.div>
                <div className="">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="text-xl sm:text-2xl font-medium text-zinc-950 dark:text-neutral-200 text-center md:text-left"
                  >
                    {card.title}
                  </motion.h3>
                </div>
              </div>
              <motion.button
                layoutId={`button-${card.title}-${id}`}
                className="px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
              >
                {card.ctaText}
              </motion.button>
            </motion.div>
          ))}
        </ul>
      </div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 sm:h-6 sm:w-6 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    title: "gazetteer",
    src: "/gazetteer.png",
    ctaText: "Github",
    ctaLink: "https://github.com",
    content: () => {
      return (
        <p>
          A "mobile first" web application that will operates equally
          well on desktop computers. Gazetter provides comprehensive
          profiles for all countries, presenting demographic, climatic,
          geographical data.
        </p>
      );
    },
  },
  {
    title: "PROJECT 2",
    src: "/nuxt-port-logo.png",
    ctaText: "Github",
    ctaLink: "https://github.com",
    content: () => {
      return (
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      );
    },
  },
  {
    title: "Portfolio",
    src: "/nuxt-port-logo.png",
    ctaText: "Github",
    ctaLink: "https://github.com/Ridgeano/next-portfolio",
    content: () => {
      return (
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      );
    },
  },
];
