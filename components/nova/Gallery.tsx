"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

type GalleryCollection = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  cover: string;
  images: {
    src: string;
    alt: string;
    caption: string;
    number: string;
  }[];
};

const galleryCollections: GalleryCollection[] = [
  {
    id: "room",
    title: "The Room",
    eyebrow: "01 — The Room",
    description:
      "Warm textures, quiet corners and a dining room designed to let the evening unfold slowly.",
    cover:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=80",
    images: [
      {
        src:
          "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=80",
        alt: "Elegant restaurant interior",
        caption: "A room shaped by warm light",
        number: "01",
      },
      {
        src:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
        alt: "Restaurant dining room",
        caption: "Quiet corners made for lingering",
        number: "02",
      },
      {
        src:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
        alt: "Fine dining restaurant interior",
        caption: "An intimate setting after dark",
        number: "03",
      },
    ],
  },

  {
    id: "table",
    title: "The Table",
    eyebrow: "02 — The Table",
    description:
      "Every plate, glass and detail comes together around the table.",
    cover:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=80",
    images: [
      {
        src:
          "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=80",
        alt: "Fine dining dish",
        caption: "Plates prepared with intention",
        number: "01",
      },
      {
        src:
          "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=80",
        alt: "Beautiful restaurant dish",
        caption: "Seasonal ingredients take centre stage",
        number: "02",
      },
      {
        src:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
        alt: "Restaurant food on a table",
        caption: "Food made for sharing slowly",
        number: "03",
      },
    ],
  },

  {
    id: "evening",
    title: "The Evening",
    eyebrow: "03 — The Evening",
    description:
      "As the lights soften, NOVA becomes a place for long conversations and unhurried dinners.",
    cover:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1400&q=80",
    images: [
      {
        src:
          "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1400&q=80",
        alt: "Restaurant dining at evening",
        caption: "Golden light across the dining room",
        number: "01",
      },
      {
        src:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
        alt: "Restaurant atmosphere",
        caption: "Evenings designed to move slowly",
        number: "02",
      },
      {
        src:
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
        alt: "Elegant evening restaurant",
        caption: "Where dinner becomes an occasion",
        number: "03",
      },
    ],
  },

  {
    id: "craft",
    title: "The Craft",
    eyebrow: "04 — The Craft",
    description:
      "Behind every dish is a process built around patience, precision and beautiful ingredients.",
    cover:
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1400&q=80",
    images: [
      {
        src:
          "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1400&q=80",
        alt: "Restaurant food preparation",
        caption: "Precision behind every plate",
        number: "01",
      },
      {
        src:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=80",
        alt: "Fresh ingredients and food",
        caption: "Simple ingredients, carefully handled",
        number: "02",
      },
      {
        src:
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1400&q=80",
        alt: "Chef preparing food",
        caption: "The quiet work behind the experience",
        number: "03",
      },
    ],
  },
];

export function Gallery() {
  const [selectedCollection, setSelectedCollection] =
    useState<GalleryCollection | null>(null);

  /*
   * Prevent the page behind the full-screen gallery
   * from scrolling.
   */
  useEffect(() => {
    if (!selectedCollection) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedCollection]);

  /*
   * Allow ESC to close the gallery.
   */
  useEffect(() => {
    if (!selectedCollection) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCollection(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCollection]);

  return (
    <>
      <section
        id="gallery"
        className="relative overflow-hidden bg-nova-espresso px-5 py-24 text-nova-cream sm:px-8 sm:py-32 lg:px-12 lg:py-40"
      >
        <div className="mx-auto max-w-[1500px]">

          {/* HEADER */}
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
                <em className="font-normal text-orange-200">
                  after dark.
                </em>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-white/40">
              Designed around the rhythm of an evening — warm light,
              quiet corners and plates worth remembering.
            </p>
          </div>

          {/* GALLERY GRID */}
          <div className="mt-16 grid auto-rows-[260px] gap-3 sm:mt-20 sm:auto-rows-[320px] md:grid-cols-3">

            {galleryCollections.map((collection, index) => (
              <motion.button
                key={collection.id}
                type="button"
                onClick={() => setSelectedCollection(collection)}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileTap={{
                  scale: 0.985,
                }}
                className={`group relative overflow-hidden rounded-[1.5rem] text-left outline-none focus-visible:ring-2 focus-visible:ring-orange-200/70 ${

                  index === 0
                    ? "md:col-span-2 md:row-span-2"
                    : ""
                }`}
              >
                {/* IMAGE */}

                <img
                  src={collection.cover}
                  alt={collection.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* OVERLAY */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-90" />

                {/* TOP NUMBER */}

                <span className="absolute left-5 top-5 font-mono text-[8px] tracking-[0.2em] text-white/60 sm:left-7 sm:top-7">
                  0{index + 1}
                </span>

                {/* OPEN ICON */}

                <span className="absolute right-5 top-5 grid size-10 translate-y-2 place-items-center rounded-full border border-white/25 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:right-7 sm:top-7">
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.3}
                  />
                </span>

                {/* TITLE */}

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/45">
                    Explore
                  </span>

                  <h3 className="mt-1 font-display text-3xl text-white sm:text-4xl">
                    {collection.title}
                  </h3>

                  <p className="mt-2 max-w-xs text-xs leading-5 text-white/45 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {collection.images.length} moments from NOVA
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* CLOSING STATEMENT */}

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

      {/* =====================================================
          FULL-SCREEN GALLERY
         ===================================================== */}

      <AnimatePresence>
        {selectedCollection && (
          <motion.div
            key={selectedCollection.id}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-nova-espresso text-nova-cream"
          >
            {/* BACKGROUND */}

            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,190,120,0.08),transparent_35%)]" />

            <div className="relative min-h-screen px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">

              {/* TOP BAR */}

              <motion.header
                initial={{
                  opacity: 0,
                  y: -15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.1,
                  duration: 0.45,
                }}
                className="mx-auto flex max-w-[1500px] items-center justify-between border-b border-white/10 pb-6"
              >
                <button
                  type="button"
                  onClick={() => setSelectedCollection(null)}
                  className="group flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white"
                >
                  <ArrowLeft
                    size={15}
                    strokeWidth={1.3}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />

                  Back to gallery
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCollection(null)}
                  aria-label="Close gallery"
                  className="grid size-10 place-items-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <X
                    size={17}
                    strokeWidth={1.3}
                  />
                </button>
              </motion.header>

              {/* DETAIL HEADER */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.16,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mx-auto max-w-[1500px] pb-12 pt-14 sm:pb-16 sm:pt-20 lg:pt-24"
              >
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-orange-300" />

                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-orange-200/70">
                    {selectedCollection.eyebrow}
                  </span>
                </div>

                <div className="mt-6 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                  <h2 className="font-display text-6xl leading-[0.85] tracking-[-0.05em] sm:text-8xl lg:text-[8rem]">
                    {selectedCollection.title}
                  </h2>

                  <p className="max-w-md text-sm leading-7 text-white/40">
                    {selectedCollection.description}
                  </p>
                </div>
              </motion.div>

              {/* THREE IMAGE LAYOUT */}

              <div className="mx-auto grid max-w-[1500px] gap-5 lg:grid-cols-12">

                {selectedCollection.images.map((image, index) => (
                  <motion.figure
                    key={image.src}
                    initial={{
                      opacity: 0,
                      y: 35,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.2 + index * 0.09,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`group ${

                      index === 0
                        ? "lg:col-span-7"
                        : index === 1
                          ? "lg:col-span-5 lg:mt-20"
                          : "lg:col-span-8 lg:col-start-3 lg:mt-4"
                    }`}
                  >
                    {/* IMAGE */}

                    <div className="relative overflow-hidden rounded-[1.5rem] bg-white/[0.03]">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="block h-auto max-h-[75vh] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />

                      {/* IMAGE NUMBER */}

                      <span className="absolute left-5 top-5 font-mono text-[8px] tracking-[0.2em] text-white/65">
                        {image.number}
                      </span>
                    </div>

                    {/* TWO-LINE CAPTION */}

                    <figcaption className="mt-4 flex items-start justify-between gap-5 border-t border-white/10 pt-4">
                      <p className="max-w-sm font-display text-xl leading-tight text-white/85 sm:text-2xl">
                        {image.caption}
                      </p>

                      <span className="shrink-0 pt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
                        NOVA
                      </span>
                    </figcaption>
                  </motion.figure>
                ))}
              </div>

              {/* BOTTOM */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.55,
                  duration: 0.5,
                }}
                className="mx-auto mt-20 max-w-[1500px] border-t border-white/10 py-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
                    {selectedCollection.title} · NOVA Islamabad
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedCollection(null)}
                    className="group flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-orange-200"
                  >
                    Return to gallery

                    <ArrowLeft
                      size={14}
                      strokeWidth={1.3}
                      className="transition-transform duration-300 group-hover:-translate-x-1"
                    />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}