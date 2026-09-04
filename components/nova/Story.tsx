"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight } from "lucide-react";
import { useRef } from "react";

export function Story() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const numberY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative overflow-hidden bg-background py-28 sm:py-36 lg:py-44"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

        {/* Section heading */}
        <div className="mb-20 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-nova-terracotta" />

              <span className="eyebrow text-nova-terracotta">
                01 — The Story
              </span>
            </div>

            <h2 className="mt-7 max-w-4xl font-display text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.82] tracking-[-0.045em] text-foreground">
              A place for
              <br />
              <em className="font-normal text-nova-terracotta">
                slow evenings.
              </em>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: 0.15,
              duration: 0.8,
            }}
            className="max-w-xs text-sm leading-7 text-nova-muted lg:mb-2"
          >
            Not simply a restaurant.
            <br />
            A room designed around
            <br />
            the moment the sun disappears.
          </motion.p>
        </div>

        {/* Main story */}
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden"
          >
            <div className="aspect-[4/5] overflow-hidden bg-nova-cream">
              <motion.div
                style={{ y: imageY }}
                className="h-[120%] w-full"
              >
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=90')",
                  }}
                />
              </motion.div>
            </div>

            {/* Image label */}
            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full border border-white/20 bg-black/30 px-4 py-2.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-200" />

              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/80">
                The room · after sunset
              </span>
            </div>

            {/* Floating number */}
            <motion.span
              style={{ y: numberY }}
              className="absolute -right-3 -top-8 font-display text-[130px] leading-none text-foreground/5 sm:-right-8 sm:text-[180px]"
            >
              01
            </motion.span>
          </motion.div>

          {/* Text */}
          <div className="lg:pb-8">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="max-w-2xl font-display text-3xl leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                NOVA was imagined around one simple idea:
                <em className="text-nova-terracotta">
                  {" "}dinner should have a rhythm.
                </em>
              </p>

              <div className="mt-8 max-w-xl space-y-5 text-sm leading-7 text-nova-muted sm:text-base">
                <p>
                  As daylight fades across the terrace, the room changes with
                  it. The lights become warmer. Conversations become quieter.
                  The first plates begin to arrive.
                </p>

                <p>
                  Our kitchen follows the seasons, working with ingredients
                  chosen for their character rather than their complexity.
                  Nothing is rushed. Nothing is overworked.
                </p>

                <p>
                  Every detail is designed to give you permission to stay a
                  little longer.
                </p>
              </div>

              {/* Signature */}
              <div className="mt-12 flex items-end justify-between border-t border-nova-border pt-7">
                <div>
                  <p className="font-display text-2xl italic text-foreground">
                    Maren Voss
                  </p>

                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-nova-muted">
                    Executive Chef
                  </p>
                </div>

                <motion.a
                  href="#menu"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                  className="group flex items-center gap-3 text-nova-muted"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
                    Explore the menu
                  </span>

                  <span className="grid size-10 place-items-center rounded-full border border-nova-border transition-colors duration-300 group-hover:bg-nova-espresso group-hover:text-background">
                    <ArrowDownRight
                      size={15}
                      strokeWidth={1.3}
                    />
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mt-24 border-t border-nova-border pt-6 sm:mt-32"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-nova-muted">
              From the kitchen
            </span>

            <p className="font-display text-xl italic text-foreground/70 sm:text-2xl">
              "Let the evening take its time."
            </p>

            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-nova-muted">
              MMXXIV
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}