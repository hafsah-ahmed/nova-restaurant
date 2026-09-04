"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

export function Hero3D() {
  const [isDesktop, setIsDesktop] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    {
      stiffness: 120,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    {
      stiffness: 120,
      damping: 20,
    }
  );

  const imageX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-12, 12]),
    {
      stiffness: 100,
      damping: 25,
    }
  );

  const imageY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-12, 12]),
    {
      stiffness: 100,
      damping: 25,
    }
  );

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDesktop, mouseX, mouseY]);

  return (
    <div
      className="pointer-events-none absolute right-[4%] top-[16%] z-[5] hidden md:block lg:right-[7%] lg:top-[18%]"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative h-[180px] w-[180px] lg:h-[230px] lg:w-[230px]"
      >
        {/* Glow */}
        <div
          className="absolute inset-4 rounded-full bg-orange-200/20 blur-3xl"
          style={{
            transform: "translateZ(-40px)",
          }}
        />

        {/* Dish */}
        <motion.div
          style={{
            x: imageX,
            y: imageY,
            transform: "translateZ(45px)",
          }}
          className="absolute inset-0 overflow-hidden rounded-full border border-white/30 shadow-2xl"
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=90')",
            }}
          />

          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30" />
        </motion.div>

        {/* Outer ring */}
        <div
          className="absolute -inset-3 rounded-full border border-white/20"
          style={{
            transform: "translateZ(20px)",
          }}
        />

        {/* Small floating label */}
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transform: "translateZ(80px)",
          }}
          className="absolute -bottom-5 -left-12 rounded-full border border-white/20 bg-black/35 px-4 py-2 backdrop-blur-xl"
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/80">
            Seasonal · 01
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}