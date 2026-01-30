"use client";

import { CoverFlow, CoverFlowItem } from "@/components/coverflow";
import { ThemeToggle } from "@/components/theme-toggle";
import { Github, Heart, Check, Copy, Layers, Command, Zap, Smartphone, Moon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";

const albums: CoverFlowItem[] = [
  { id: 1, image: "/covers/cover-01.svg", title: "Midnight Dreams", subtitle: "The Dreamers • 2024" },
  { id: 2, image: "/covers/cover-02.svg", title: "Surf Waves", subtitle: "Ocean Sounds • 2023" },
  { id: 3, image: "/covers/cover-03.svg", title: "Neon Nights", subtitle: "Synthwave Collective • 2024" },
  { id: 4, image: "/covers/cover-04.svg", title: "Urban Jungle", subtitle: "City Beats • 2022" },
  { id: 5, image: "/covers/cover-05.svg", title: "Mountain Echoes", subtitle: "Nature Ambient • 2023" },
  { id: 6, image: "/covers/cover-06.svg", title: "Coffee House", subtitle: "Acoustic Vibes • 2024" },
  { id: 7, image: "/covers/cover-07.svg", title: "Vinyl Classics", subtitle: "Retro Hits • 2021" },
  { id: 8, image: "/covers/cover-08.svg", title: "Golden Hour", subtitle: "Sunset Melodies • 2023" },
  { id: 9, image: "/covers/cover-09.svg", title: "Deep Space", subtitle: "Ambient Cosmos • 2025" },
  { id: 10, image: "/covers/cover-10.svg", title: "Summer Vibes", subtitle: "Beach Party • 2022" }
];

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [itemSize, setItemSize] = useState({ width: 400, height: 400 });
  const installCommand = useMemo(() => "npx shadcn add coverflow", []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemSize({ width: 240, height: 240 });
      } else {
        setItemSize({ width: 400, height: 400 });
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const copyCommand = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="m-shell">
      <header className="m-nav">
        <div className="m-navSurface">
          <div className="m-navInner">
            <div className="m-navBrand">
              <span>Cover Flow</span>
            </div>
            <nav className="m-navLinks" aria-label="Primary">
              <Link className="m-navLink" href="#demo">
                Demo
              </Link>
              <Link className="m-navLink" href="#principles">
                Principles
              </Link>
              <Link
                className="m-navLink"
                href="https://github.com/your-repo/coverflow"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </Link>
              <Link
                className="m-navLink"
                href="https://github.com/sponsors/your-handle"
                target="_blank"
                rel="noreferrer"
              >
                Sponsor
              </Link>
            </nav>
            <div className="m-navRight">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="m-wrap relative z-10 flex flex-col items-center text-center">
            <div className="m-kicker mb-6">A classic interaction, reimagined.</div>
            <h1 className="m-h1 mb-8 max-w-[20ch]">
              Cover Flow for React.
            </h1>
            <p className="m-sub mb-12 max-w-[60ch]">
              Fluid, physical motion with zero layout shifts. 
              <br className="hidden md:block" />
              Built for the modern web with Motion and Tailwind.
            </p>
            
            <div className="flex flex-col items-center gap-8 mb-20">
               <div className="flex flex-wrap items-center justify-center gap-4">
                  <a className="m-btn m-btnPrimary" href="#demo">
                    View Demo
                  </a>
                  <button
                    type="button"
                    onClick={copyCommand}
                    className="m-btn m-btnSecondary font-mono text-xs"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {installCommand}
                  </button>
               </div>
               
               <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                  <Link
                    href="https://github.com/your-repo/coverflow"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </Link>
                  <Link
                    href="https://github.com/sponsors/your-handle"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                    Sponsor
                  </Link>
               </div>
             </div>
          </div>

          <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mb-24" id="demo">
             <div className="relative w-full aspect-[16/9] md:aspect-[2/1] flex flex-col items-center justify-center">
                <CoverFlow
                  items={albums}
                  itemWidth={itemSize.width}
                  itemHeight={itemSize.height}
                  className="w-full h-full z-10"
                />
             </div>
             <div className="text-center mt-8 text-sm text-muted-foreground/60 font-medium tracking-wide">
                Drag to browse • Arrow keys to navigate
             </div>
          </div>

          <div className="m-wrap">
             <div className="m-divider" />
             
             {/* Bento Grid Features */}
             <div className="m-bentoGrid" id="principles">
                {/* Large Feature: Physics */}
                <div className="m-bentoCard m-bentoCardWide flex flex-col justify-between">
                   <div className="relative z-10">
                      <div className="m-bentoIcon">
                         <Zap className="h-6 w-6" />
                      </div>
                      <h3 className="m-bentoTitle">Fluid Physics Engine</h3>
                      <p className="m-bentoBody max-w-[40ch]">
                         Driven by real-time spring physics, not linear timelines. The motion feels weighty, responsive, and interruptible at any frame.
                      </p>
                   </div>
                   <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 bg-gradient-to-l from-foreground/10 to-transparent pointer-events-none" />
                </div>

                {/* Tall Feature: Keyboard */}
                <div className="m-bentoCard m-bentoCardTall flex flex-col justify-end">
                   <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <Command className="h-48 w-48" />
                   </div>
                   <div className="relative z-10">
                      <h3 className="m-bentoTitle">Keyboard First</h3>
                      <p className="m-bentoBody">
                         Fully accessible with arrow key navigation and focus management.
                      </p>
                      <div className="mt-6 flex gap-2">
                         <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background/50 font-mono text-sm shadow-sm">←</div>
                         <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background/50 font-mono text-sm shadow-sm">→</div>
                      </div>
                   </div>
                </div>

                {/* Small Feature: Layout */}
                <div className="m-bentoCard m-bentoCardSmall">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                         <Layers className="h-5 w-5" />
                      </div>
                   </div>
                   <h3 className="text-lg font-semibold">Zero Layout Shift</h3>
                   <p className="text-sm text-muted-foreground mt-2">
                      Isolated transforms ensure the surrounding layout never jumps.
                   </p>
                </div>

                {/* Small Feature: Mobile */}
                <div className="m-bentoCard m-bentoCardSmall">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                         <Smartphone className="h-5 w-5" />
                      </div>
                   </div>
                   <h3 className="text-lg font-semibold">Touch Ready</h3>
                   <p className="text-sm text-muted-foreground mt-2">
                      1:1 gesture tracking with velocity-aware throwing.
                   </p>
                </div>

                 {/* Small Feature: Dark Mode */}
                 <div className="m-bentoCard m-bentoCardSmall md:col-span-6 md:row-span-1 flex items-center justify-between">
                   <div>
                      <h3 className="text-lg font-semibold">Dark Mode Native</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                         Optimized for deep blacks and vibrant highlights.
                      </p>
                   </div>
                   <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground">
                      <Moon className="h-6 w-6" />
                   </div>
                </div>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}
