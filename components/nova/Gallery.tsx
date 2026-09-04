"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=85",
    alt: "Elegant restaurant interior",
    title: "The Room",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=85",
    alt: "Fine dining dish",
    title: "The Table",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1000&q=85",
    alt: "Restaurant dining",
    title: "The Evening",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1000&q=85",
    alt: "Restaurant food",
    title: "The Craft",
    className: "",
  },
];

export function Gallery() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-nova-espresso px-5 py-24 text-nova-cream sm:px-8 sm:py-32 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-orange-300" />

              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-orange-200/70">
                03 — Gallery
              </span>
            </div>

            <h2 className="mt-6 font-display text-6xl leading-[0.85] tracking-[-0.05em] sm:text-8xl lg:text-[9rem]">
              A place
              <br />
              <em className="font-normal text-orange-200">after dark.</em>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/40">
            Designed around the rhythm of an evening — warm light,
            quiet corners and plates worth remembering.
          </p>
        </div>

        {/* Gallery */}
        <div className="mt-16 grid auto-rows-[260px] gap-3 sm:mt-20 sm:auto-rows-[320px] md:grid-cols-3">
          {images.map((image, index) => (
            <motion.figure
              key={image.src}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.8,
                delay: index * 0.08,
              }}
              className={`group relative overflow-hidden rounded-[1.5rem] ${image.className}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-7">
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/50">
                    0{index + 1}
                  </span>

                  <h3 className="mt-1 font-display text-2xl text-white sm:text-3xl">
                    {image.title}
                  </h3>
                </div>

                <span className="grid size-10 translate-y-3 place-items-center rounded-full border border-white/30 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={15} strokeWidth={1.3} />
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Closing statement */}
        <div className="mt-16 border-t border-white/10 pt-7 sm:mt-24">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
              NOVA · Islamabad · MMXXIV
            </p>

            <a
              href="#reserve"
              className="group flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-orange-200"
            >
              Come dine with us
              <ArrowUpRight
                size={14}
                strokeWidth={1.3}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}