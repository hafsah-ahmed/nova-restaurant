"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Menu as MenuIcon,
  X,
} from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navItems = [
    {
      label: "Menu",
      href: "#menu",
    },
    {
      label: "Story",
      href: "#story",
    },
    {
      label: "Gallery",
      href: "#gallery",
    },
  ];

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        animate={{
          backgroundColor: scrolled
            ? "rgba(246, 241, 232, 0.96)"
            : "rgba(20, 17, 15, 0.10)",
          borderColor: scrolled
            ? "rgba(33, 30, 26, 0.10)"
            : "rgba(255, 255, 255, 0.16)",
          boxShadow: scrolled
            ? "0 10px 40px rgba(20, 15, 10, 0.08)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed left-0 top-0 z-50 w-full border-b backdrop-blur-xl"
      >
        <div
          className={`mx-auto flex max-w-[1500px] items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:px-12 ${
            scrolled
              ? "h-[72px] sm:h-[78px]"
              : "h-20 sm:h-24"
          }`}
        >
          {/* Logo */}
          <motion.a
            href="#top"
            animate={{
              color: scrolled ? "#211e1a" : "#ffffff",
            }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex items-center gap-3"
          >
            <span className="font-display text-[25px] tracking-[0.18em] sm:text-[29px]">
              NOVA
            </span>

            <span className="h-2 w-2 rounded-full bg-[#b85c3a]" />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center md:flex">
            <div
              className={`flex items-center rounded-full border px-2 py-2 backdrop-blur-md transition-all duration-500 ${
                scrolled
                  ? "border-black/[0.08] bg-black/[0.025]"
                  : "border-white/[0.14] bg-black/[0.10]"
              }`}
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ y: -1 }}
                  className={`group relative rounded-full px-5 py-2.5 font-mono text-[9px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                    scrolled
                      ? "text-nova-espresso hover:text-nova-espresso"
                      : "text-white hover:text-white"
                  }`}
                >
                  {item.label}

                  <span
                    className={`absolute bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-8 ${
                      scrolled
                        ? "bg-nova-espresso/50"
                        : "bg-orange-200/70"
                    }`}
                  />
                </motion.a>
              ))}
            </div>
          </nav>

          {/* Reserve Button */}
          <motion.a
            href="#reserve"
            whileHover={{
              scale: 1.035,
            }}
            whileTap={{
              scale: 0.97,
            }}
            animate={{
              backgroundColor: scrolled
                ? "#211e1a"
                : "#f6f1e8",
              color: scrolled
                ? "#f6f1e8"
                : "#211e1a",
            }}
            transition={{
              duration: 0.4,
            }}
            className="group hidden items-center gap-3 rounded-full px-6 py-3.5 font-mono text-[9px] uppercase tracking-[0.24em] md:flex"
          >
            <span>Reserve a table</span>

            <motion.span
              whileHover={{
                x: 3,
                y: -2,
              }}
              className="flex"
            >
              <ArrowUpRight
                size={14}
                strokeWidth={1.4}
              />
            </motion.span>
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            onClick={() =>
              setMobileOpen((current) => !current)
            }
            whileTap={{
              scale: 0.94,
            }}
            animate={{
              color: scrolled ? "#211e1a" : "#ffffff",
              backgroundColor: scrolled
                ? "rgba(33, 30, 26, 0.06)"
                : "rgba(255, 255, 255, 0.10)",
              borderColor: scrolled
                ? "rgba(33, 30, 26, 0.10)"
                : "rgba(255, 255, 255, 0.15)",
            }}
            transition={{
              duration: 0.4,
            }}
            className="relative z-[60] grid size-11 place-items-center rounded-full border md:hidden"
            aria-label={
              mobileOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={mobileOpen}
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                >
                  <X size={19} strokeWidth={1.4} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                >
                  <MenuIcon size={19} strokeWidth={1.4} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-0 top-full w-full border-t border-black/10 bg-nova-cream shadow-2xl md:hidden"
            >
              <div className="px-5 py-8 sm:px-8">
                <div className="mb-7 flex items-center gap-3">
                  <span className="h-px w-7 bg-nova-espresso/30" />

                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-nova-espresso/50">
                    Explore NOVA
                  </span>
                </div>

                <div className="flex flex-col">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={closeMobile}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      className="group flex items-center justify-between border-b border-nova-espresso/10 py-5"
                    >
                      <span className="font-display text-4xl text-nova-espresso">
                        {item.label}
                      </span>

                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.2}
                        className="text-nova-espresso/40 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </motion.a>
                  ))}
                </div>

                <motion.a
                  href="#reserve"
                  onClick={closeMobile}
                  className="mt-7 flex items-center justify-between rounded-full bg-nova-espresso px-6 py-4 text-nova-cream"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em]">
                    Reserve a table
                  </span>

                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.4}
                  />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}