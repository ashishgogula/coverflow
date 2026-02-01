"use client";

import { CoverFlow, CoverFlowItem } from "@/components/coverflow";
import { Navbar } from "@/components/navbar";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Github,
  Heart,
  Check,
  Copy,
  Layers,
  Command,
  Zap,
  Smartphone,
  Moon,
  Plus,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { motion, type Variants } from "motion/react";
import Image from "next/image";

const albums: CoverFlowItem[] = [
  {
    id: 1,
    image: "/covers/cover-01.svg",
    title: "Midnight Dreams",
    subtitle: "The Dreamers • 2024",
  },
  {
    id: 2,
    image: "/covers/cover-02.svg",
    title: "Surf Waves",
    subtitle: "Ocean Sounds • 2023",
  },
  {
    id: 3,
    image: "/covers/cover-03.svg",
    title: "Neon Nights",
    subtitle: "Synthwave Collective • 2024",
  },
  {
    id: 4,
    image: "/covers/cover-04.svg",
    title: "Urban Jungle",
    subtitle: "City Beats • 2022",
  },
  {
    id: 5,
    image: "/covers/cover-05.svg",
    title: "Mountain Echoes",
    subtitle: "Nature Ambient • 2023",
  },
  {
    id: 6,
    image: "/covers/cover-10.svg",
    title: "Summer Vibes",
    subtitle: "Beach Party • 2022",
  },

  {
    id: 7,
    image: "/covers/cover-07.svg",
    title: "Vinyl Classics",
    subtitle: "Retro Hits • 2021",
  },
  {
    id: 8,
    image: "/covers/cover-08.svg",
    title: "Golden Hour",
    subtitle: "Sunset Melodies • 2023",
  },
  {
    id: 9,
    image: "/covers/cover-09.svg",
    title: "Deep Space",
    subtitle: "Ambient Cosmos • 2025",
  },

  {
    id: 10,
    image: "/covers/cover-06.svg",
    title: "Coffee House",
    subtitle: "Acoustic Vibes • 2024",
  },
];

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [itemSize, setItemSize] = useState({ width: 400, height: 400 });
  const [initialIndex, setInitialIndex] = useState(0);
  const installCommand = useMemo(() => "coming soon", []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerWidth < 768) {
          setItemSize({ width: 240, height: 240 });
        } else {
          setItemSize({ width: 400, height: 400 });
        }
      }, 100);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const copyCommand = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: 12,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="m-shell">
      <Navbar />

      <main>
        <div className="m-wrap border-x border-dashed border-t-0 min-h-screen relative">
          <section className="relative pt-20 border-dashed border-border">
            <motion.div
              className="relative z-10 flex flex-col items-center text-center px-4"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/40 backdrop-blur-sm transition-colors hover:bg-secondary/80 hover:border-border/80 cursor-default">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-foreground/70" />
                  <span className="text-xs font-medium text-muted-foreground">
                    A classic interaction, reimagined.
                  </span>
                </div>
              </motion.div>
              <motion.h2 variants={fadeUp} className="m-h1 mb-4 max-w-[20ch]">
                iOS-like Cover Flow for React.
              </motion.h2>
              <motion.p variants={fadeUp} className="m-sub mb-12 max-w-[60ch]">
                Fluid, physical motion with zero layout shifts.
                <br className="hidden md:block" />
                Built for the modern web with Motion and Tailwind.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center gap-8"
              >
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link className="m-btn m-btnPrimary" href="/get-started">
                    Get Started
                  </Link>
                  <button
                    type="button"
                    onClick={copyCommand}
                    className="m-btn m-btnSecondary font-mono text-xs"
                  >
                    {copied ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    {installCommand}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </section>

          <div className="w-full border-dashed border-border/70 relative">
            <div
              className="max-w-[1400px] mx-auto px-4 md:px-8 pb-20 scroll-mt-18"
              id="demo"
            >
              <motion.div
                initial={{ opacity: 0, y: 54 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                onViewportEnter={() => {
                  setTimeout(() => {
                    setInitialIndex(5);
                  }, 1200);
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-[600px] aspect-[16/9] md:aspect-[2/1] flex flex-col items-center justify-center"
              >
                <CoverFlow
                  items={albums}
                  itemWidth={itemSize.width}
                  itemHeight={itemSize.height}
                  initialIndex={initialIndex}
                  className="w-full h-full z-10"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 1.2,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-center mt-8 text-sm text-muted-foreground/60 font-medium tracking-wide"
              >
                Drag to browse • Arrow keys to navigate
              </motion.div>
            </div>
          </div>

          <div className="py-20 relative m-sectionBorder border-top">
            <Plus className="m-plusIcon m-plusIcon-bl" />
            <Plus className="m-plusIcon m-plusIcon-br" />

            <motion.div
              className="m-bentoGrid px-6 scroll-mt-24"
              id="principles"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px", amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.div
                variants={cardVariant}
                className="m-bentoCard m-bentoCardWide flex flex-col justify-between overflow-hidden min-h-[280px] md:min-h-[320px]"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                  <Zap className="h-[200px] w-[200px] md:h-[400px] md:w-[400px]" />
                </div>
                <div className="relative z-10">
                  <h3 className="m-bentoTitle">Fluid Physics Engine</h3>
                  <p className="m-bentoBody max-w-[40ch]">
                    Driven by real-time spring physics, not linear timelines.
                    The motion feels weighty, responsive, and interruptible at
                    any frame.
                  </p>
                </div>
              </motion.div>

              {/* Tall Feature: Keyboard */}
              <motion.div
                variants={cardVariant}
                className="m-bentoCard m-bentoCardTall flex flex-col justify-between overflow-hidden min-h-[280px] md:min-h-[320px]"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                  <Command className="h-40 w-40" />
                </div>
                <div className="relative z-10">
                  <h3 className="m-bentoTitle">Keyboard First</h3>
                  <p className="m-bentoBody">
                    Fully accessible with arrow key navigation and focus
                    management.
                  </p>
                </div>
                <div className="flex justify-center gap-3 mt-6 opacity-80">
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl border border-border bg-background/50 font-mono text-base shadow-sm">
                    ←
                  </div>
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl border border-border bg-background/50 font-mono text-base shadow-sm">
                    →
                  </div>
                </div>
              </motion.div>

              {/* Small Feature: Layout */}
              <motion.div
                variants={cardVariant}
                className="m-bentoCard m-bentoCardSmall flex flex-col justify-between overflow-hidden min-h-[180px] md:min-h-[220px]"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                  <Layers className="h-24 w-24 md:h-32 md:w-32" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold mb-2 tracking-tight">
                    Zero Layout Shift
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground font-medium tracking-wide opacity-90">
                    Isolated transforms ensure the surrounding layout never
                    jumps.
                  </p>
                </div>
              </motion.div>

              {/* Small Feature: Mobile */}
              <motion.div
                variants={cardVariant}
                className="m-bentoCard m-bentoCardSmall flex flex-col justify-between overflow-hidden min-h-[180px] md:min-h-[220px]"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                  <Smartphone className="h-24 w-24 md:h-32 md:w-32" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold mb-2 tracking-tight">
                    Touch Ready
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground font-medium tracking-wide opacity-90">
                    1:1 gesture tracking with velocity-aware throwing.
                  </p>
                </div>
              </motion.div>

              {/* Small Feature: Dark Mode */}
              <motion.div
                variants={cardVariant}
                className="m-bentoCard m-bentoCardSmall flex flex-col justify-between overflow-hidden min-h-[180px] md:min-h-[220px]"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                  <Moon className="h-24 w-24 md:h-32 md:w-32" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold mb-2 tracking-tight">
                    Dark Mode Native
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground font-medium tracking-wide opacity-90">
                    Optimized for deep blacks and vibrant highlights.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="py-16 relative border-dashed border-border/70 scroll-mt-24"
            id="support"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="max-w-xl mx-auto px-6 text-center">

              <motion.h2
                variants={fadeUp}
                className="text-2xl md:text-3xl font-semibold tracking-tight mb-4"
              >
                Support this open-source work
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-base text-muted-foreground leading-relaxed mb-8 text-balance"
              >
                Your sponsorship means a lot to open-source projects like this
                one.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex items-center justify-center gap-3"
              >
                <Link
                  href="https://github.com/sponsors/ashishgogula"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform active:scale-[0.98] hover:opacity-90"
                >
                  <Star className="h-4 w-4 fill-current" />
                  Sponsor
                </Link>
              </motion.div>
            </div>

            <Plus className="m-plusIcon m-plusIcon-bl" />
            <Plus className="m-plusIcon m-plusIcon-br" />
          </motion.div>

          <motion.footer
            className="m-foot border-t border-b border-dashed border-border/70 relative mb-4"
            aria-label="Footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="m-footInner px-6">
              <div className="text-sm font-medium flex flex-wrap  gap-1">
                <span>Built by</span>
                <a
                  href="https://ashishgogula.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:underline underline-offset-4 underline"
                >
                  Ashish Gogula
                </a>
                <span>, source code available on</span>
                <a
                  href="https://github.com/ashishgogula/coverflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:underline underline-offset-4 underline"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.footer>
        </div>
      </main>
    </div>
  );
}
