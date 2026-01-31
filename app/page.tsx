"use client";

import { CoverFlow, CoverFlowItem } from "@/components/coverflow";
import { ThemeToggle } from "@/components/theme-toggle";
import { Github, Heart, Check, Copy, Layers, Command, Zap, Smartphone, Moon, Plus } from "lucide-react";
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

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(timeoutId);
    }
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
              <Link href="/">Cover Flow</Link>
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
        <div className="m-wrap border-x  border-dashed border-border min-h-screen relative">
           <div className="m-gridLines">
              <div className="m-gridLine" />
              <div className="m-gridLine" />
           </div>

           <section className="relative py-20 m-sectionBorder">
              <Plus className="m-plusIcon m-plusIcon-tl z-[999]" />
              <Plus className="m-plusIcon m-plusIcon-tr z-[999]" />
              <Plus className="m-plusIcon m-plusIcon-bl z-[999]" />
              <Plus className="m-plusIcon m-plusIcon-br z-[999]" />

              <div className="relative z-10 flex flex-col items-center text-center px-4">
                <div className="m-kicker mb-6">A classic interaction, reimagined.</div>
                <h1 className="m-h1 mb-8 max-w-[20ch]">
                  Cover Flow for React.
                </h1>
                <p className="m-sub mb-12 max-w-[60ch]">
                  Fluid, physical motion with zero layout shifts. 
                  <br className="hidden md:block" />
                  Built for the modern web with Motion and Tailwind.
                </p>
                
                <div className="flex flex-col items-center gap-8">
                   <div className="flex flex-wrap items-center justify-center gap-4">
                      <Link className="m-btn m-btnPrimary" href="/get-started">
                        Get Started
                      </Link>
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
           </section>

           <div className="w-full  border-dashed border-border/70 relative">

             <Plus className="m-plusIcon m-plusIcon-bl" />
             <Plus className="m-plusIcon m-plusIcon-br" />
             
             <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-24" id="demo">
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
           </div>

           <div className="py-24 relative m-sectionBorder border-top">
             <Plus className="m-plusIcon m-plusIcon-bl" />
             <Plus className="m-plusIcon m-plusIcon-br" />

             {/* Bento Grid Features */}
             <div className="m-bentoGrid px-6" id="principles">
                {/* Large Feature: Physics */}
                <div className="m-bentoCard m-bentoCardWide flex flex-col justify-between overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                      <Zap className="h-[500px] w-[500px]" />
                   </div>
                   <div className="relative z-10">
                      <h3 className="m-bentoTitle">Fluid Physics Engine</h3>
                      <p className="m-bentoBody max-w-[40ch]">
                         Driven by real-time spring physics, not linear timelines. The motion feels weighty, responsive, and interruptible at any frame.
                      </p>
                   </div>
                </div>

                {/* Tall Feature: Keyboard */}
                <div className="m-bentoCard m-bentoCardTall flex flex-col justify-between overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                      <Command className="h-48 w-48" />
                   </div>
                   <div className="relative z-10">
                      <h3 className="m-bentoTitle">Keyboard First</h3>
                      <p className="m-bentoBody">
                         Fully accessible with arrow key navigation and focus management.
                      </p>
                   </div>
                   <div className="flex justify-center gap-3 mt-8 opacity-80">
                         <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-background/50 font-mono text-lg shadow-sm">←</div>
                         <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-background/50 font-mono text-lg shadow-sm">→</div>
                   </div>
                </div>

                {/* Small Feature: Layout */}
                <div className="m-bentoCard m-bentoCardSmall flex flex-col justify-between overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                      <Layers className="h-40 w-40" />
                   </div>
                   <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-2">Zero Layout Shift</h3>
                      <p className="text-sm text-muted-foreground">
                         Isolated transforms ensure the surrounding layout never jumps.
                      </p>
                   </div>
                </div>

                {/* Small Feature: Mobile */}
                <div className="m-bentoCard m-bentoCardSmall flex flex-col justify-between overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                      <Smartphone className="h-40 w-40" />
                   </div>
                   <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-2">Touch Ready</h3>
                      <p className="text-sm text-muted-foreground">
                         1:1 gesture tracking with velocity-aware throwing.
                      </p>
                   </div>
                </div>

                 {/* Small Feature: Dark Mode */}
                 <div className="m-bentoCard m-bentoCardSmall flex flex-col justify-between overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                      <Moon className="h-40 w-40" />
                   </div>
                   <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-1">Dark Mode Native</h3>
                      <p className="text-sm text-muted-foreground">
                         Optimized for deep blacks and vibrant highlights.
                      </p>
                   </div>
                </div>
             </div>
           </div>
           
           <footer className="m-foot border-t border-dashed border-border/70 relative" aria-label="Footer">
              
              <div className="m-footInner px-6">
                <div className="text-sm font-medium">Cover Flow</div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <Link
                    className="transition-colors hover:text-foreground"
                    href="https://github.com/your-repo/coverflow"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </Link>
                  <Link
                    className="transition-colors hover:text-foreground"
                    href="https://github.com/sponsors/your-handle"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Sponsor
                  </Link>
                </div>
              </div>
           </footer>
        </div>
      </main>
    </div>
  );
}