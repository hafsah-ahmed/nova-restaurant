"use client";

import { Hero3D } from "./Hero3D";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 25,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 25,
  });

  const backgroundX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-14, 14]
  );

  const backgroundY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [-10, 10]
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const sectionLinks = [
    { number: "01", label: "MENU", href: "#menu" },
    { number: "02", label: "STORY", href: "#story" },
    { number: "03", label: "GALLERY", href: "#gallery" },
  ];

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* 3D layer */}
      <div className="pointer-events-none absolute inset-0 z-[5]">
        <Hero3D />
      </div>

      {/* Cinematic background */}
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0"
      >
        <motion.div
          style={{
            x: backgroundX,
            y: backgroundY,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=90')",
          }}
          className="absolute -inset-6 bg-cover bg-center"
        />

        {/* Warm cinematic overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Subtle warm glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300/10 blur-[140px]" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col justify-between px-5 pb-8 pt-28 text-white sm:px-8 lg:px-12">

        {/* Top information */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-300" />

            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
              Islamabad · Pakistan
            </span>
          </div>

          <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 sm:block">
            Est. MMXXIV
          </span>
        </motion.div>

        {/* Hero content */}
        <div className="flex flex-1 items-center">
          <div className="w-full">
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.65,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-orange-200 sm:text-xs"
            >
              A dining experience after dark
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-5xl font-display text-[clamp(4rem,11vw,10.5rem)] font-medium leading-[0.78] tracking-[-0.045em]"
            >
              Where the
              <br />
              evening{" "}
              <em className="font-normal text-orange-200">
                begins.
              </em>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.15,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            >
              <p className="max-w-md text-sm leading-7 text-white/70 sm:text-base">
                Seasonal plates, quiet conversations and the soft glow
                of a room designed for lingering.
              </p>

              <motion.a
                href="#reserve"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="group flex w-fit items-center gap-4 rounded-full border border-white/30 bg-white/10 px-5 py-3 backdrop-blur-md transition-colors duration-500 hover:bg-white hover:text-black"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                  Discover NOVA
                </span>

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.4}
                  className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Hero section navigation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 1.35,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute right-5 top-1/2 hidden -translate-y-1/2 sm:block lg:right-12"
        >
          <div className="flex flex-col items-end gap-5">
            {sectionLinks.map((item) => (
              <motion.a
                key={item.number}
                href={item.href}
                whileHover={{ x: -6 }}
                className="group flex items-center gap-3"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/65 transition-colors duration-300 group-hover:text-white">
                  {item.number}
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/65 transition-colors duration-300 group-hover:text-white">
                  {item.label}
                </span>

                <span className="h-px w-5 bg-white/30 transition-all duration-300 group-hover:w-9 group-hover:bg-white/70" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Bottom details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.5,
            duration: 1,
          }}
          className="flex items-end justify-between border-t border-white/20 pt-5"
        >
          <div className="flex gap-8">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                Hours
              </p>

              <p className="mt-1 text-xs text-white/70">
                Tue — Sun · 5:30 — 11
              </p>
            </div>

            <div className="hidden sm:block">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                Address
              </p>

              <p className="mt-1 text-xs text-white/70">
                14 Solace Lane
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.a
            href="#story"
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="group flex items-center gap-3"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
              Scroll
            </span>

            <span className="grid size-9 place-items-center rounded-full border border-white/20 transition-colors duration-300 group-hover:bg-white group-hover:text-black">
              <ArrowDown size={14} strokeWidth={1.3} />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}