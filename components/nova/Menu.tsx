"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Starters", "Mains", "Desserts", "Drinks"];

const menuItems = [
  {
    name: "NOVA Burrata",
    category: "Starters",
    description:
      "Creamy burrata, heirloom tomatoes, basil oil and smoked sea salt.",
    price: "2,450",
    image:
      "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=65&fm=webp",
    number: "01",
  },
  {
    name: "Truffle Tagliolini",
    category: "Mains",
    description:
      "Hand-cut pasta, black truffle, aged parmesan and cultured butter.",
    price: "3,850",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=65&fm=webp",
    number: "02",
  },
  {
    name: "Charred Sea Bass",
    category: "Mains",
    description:
      "Line-caught sea bass, saffron broth, fennel and preserved lemon.",
    price: "4,250",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=65&fm=webp",
    number: "03",
  },
  {
    name: "NOVA Chocolate",
    category: "Desserts",
    description:
      "Dark chocolate crémeux, roasted hazelnut and warm cocoa crumble.",
    price: "1,850",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=65&fm=webp",
    number: "04",
  },
  {
    name: "Burnt Basque Cheesecake",
    category: "Desserts",
    description:
      "Silky cheesecake, vanilla cream and seasonal berry compote.",
    price: "1,650",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=65&fm=webp",
    number: "05",
  },
  {
    name: "Midnight Espresso",
    category: "Drinks",
    description:
      "Double espresso, dark chocolate and a whisper of orange.",
    price: "950",
    image:
      "https://images.unsplash.com/photo-1510707577719-ae7c14805e32?auto=format&fit=crop&w=800&q=65&fm=webp",
    number: "06",
  },
];

export function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-nova-cream px-5 py-24 text-nova-espresso sm:px-8 sm:py-32 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Header */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-nova-espresso/40" />

              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-nova-espresso/50">
                01 — Menu
              </span>
            </div>

            <h2 className="mt-6 max-w-xl font-display text-6xl leading-[0.85] tracking-[-0.05em] sm:text-8xl lg:text-[9rem]">
              Made for
              <br />
              <em className="font-normal">lingering.</em>
            </h2>
          </div>

          <div className="max-w-xl lg:ml-auto">
            <p className="text-base leading-7 text-nova-espresso/55 sm:text-lg">
              A seasonal menu built around honest ingredients, slow
              techniques and the kind of dishes that deserve another
              glass of wine.
            </p>

            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.25em] text-nova-espresso/35">
              Islamabad · Seasonal selection
            </p>
          </div>
        </div>

        {/* Category navigation */}
        <div className="mt-16 flex gap-2 overflow-x-auto border-b border-nova-espresso/10 pb-4 sm:mt-20">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative shrink-0 rounded-full px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  active
                    ? "bg-nova-espresso text-nova-cream"
                    : "border border-nova-espresso/10 text-nova-espresso/50 hover:border-nova-espresso/30 hover:text-nova-espresso"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Menu grid */}
        <motion.div
          layout
          className="mt-8 grid gap-px bg-nova-espresso/10 md:grid-cols-2"
        >
          {filteredItems.map((item, index) => (
            <motion.article
              layout
              key={item.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.05,
              }}
              className="group relative overflow-hidden bg-nova-cream"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70" />

                {/* Number */}
                <span className="absolute left-5 top-5 font-mono text-[9px] tracking-[0.2em] text-white/70">
                  {item.number}
                </span>

                {/* Category */}
                <span className="absolute right-5 top-5 rounded-full border border-white/30 bg-black/10 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
                  {item.category}
                </span>

                {/* Hover icon */}
                <div className="absolute bottom-5 right-5 grid size-11 translate-y-3 place-items-center rounded-full bg-white text-nova-espresso opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={16} strokeWidth={1.4} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-5">
                  <h3 className="font-display text-3xl tracking-[-0.03em] sm:text-4xl">
                    {item.name}
                  </h3>

                  <span className="shrink-0 pt-1 font-mono text-[10px] tracking-[0.08em] text-nova-espresso/60">
                    PKR {item.price}
                  </span>
                </div>

                <p className="mt-4 max-w-md text-sm leading-6 text-nova-espresso/50">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom note */}
        <div className="mt-12 flex flex-col gap-5 border-t border-nova-espresso/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-nova-espresso/35">
            Menu changes with the season
          </p>

          <a
            href="#reserve"
            className="group flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em]"
          >
            Reserve your table

            <ArrowUpRight
              size={14}
              strokeWidth={1.3}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}