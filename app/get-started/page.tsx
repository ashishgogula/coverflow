"use client";

import { Github, Check, Copy, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CoverFlow, CoverFlowItem } from "@/components/coverflow";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const animeItems: CoverFlowItem[] = [
  { id: 1, image: "/anime/Shinazugawa.jpeg", title: "Sanemi Shinazugawa" },
  { id: 2, image: "/anime/Obanai.jpeg", title: "Obanai Iguro" },
  { id: 3, image: "/anime/Mitsuri.jpeg", title: "Mitsuri Kanroji" },
  { id: 4, image: "/anime/giyu.jpeg", title: "Giyu Tomioka" },
  { id: 5, image: "/anime/Shinobu.jpeg", title: "Shinobu Kocho" },
  { id: 6, image: "/anime/kanao.jpeg", title: "Kanao Tsuyuri" },
  { id: 7, image: "/anime/Tanjiro.jpeg", title: "Tanjiro Kamado" },
  { id: 8, image: "/anime/Nezuko.jpeg", title: "Nezuko Kamado" },
  { id: 9, image: "/anime/Zenitsu.jpeg", title: "Zenitsu Agatsuma" },
  { id: 10, image: "/anime/InosukeH.jpeg", title: "Inosuke Hashibira" },
  { id: 11, image: "/anime/tokitou.jpeg", title: "Muichiro Tokito" },
];

export default function GetStarted() {
  const [copied, setCopied] = useState(false);
  const [packageManager, setPackageManager] = useState("pnpm");

  const commands = {
    pnpm: "pnpm dlx shadcn add https://ashishgogula.in/r/coverflow.json",
    npm: "npx shadcn add https://ashishgogula.in/r/coverflow.json",
    yarn: "npx shadcn add https://ashishgogula.in/r/coverflow.json",
    bun: "bun x shadcn add https://ashishgogula.in/r/coverflow.json",
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(
      commands[packageManager as keyof typeof commands],
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  return (
    <div className="m-shell">
      <Navbar />

      <main>
        <div className="m-wrap border-x border-dashed border-border min-h-screen relative">
          <div className="m-gridLines">
            <div className="m-gridLine" />
            <div className="m-gridLine" />
          </div>

          <section
            id="get-started"
            className="max-w-4xl mx-auto space-y-16 py-12 relative z-10 px-6"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                variants={fadeUp}
                className="text-4xl font-semibold tracking-tight mb-8"
              >
                Get Started
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-xl text-muted-foreground mb-8 leading-relaxed"
              >
                Install the component via CLI or copy the source code directly
                into your project.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-8"
            >
              <motion.h3
                variants={fadeUp}
                className="text-2xl font-medium tracking-tight"
              >
                Usage
              </motion.h3>
              <motion.div
                variants={fadeUp}
                className="rounded-2xl border border-border/40 bg-secondary/20 overflow-hidden shadow-sm"
              >
                <div className="h-[400px] w-full border-b border-border/40 relative bg-background">
                  <CoverFlow
                    items={animeItems}
                    itemWidth={250}
                    itemHeight={250}
                    initialIndex={5}
                    enableReflection={true}
                  />
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className="text-sm font-mono text-muted-foreground leading-relaxed">
                    {`
import { CoverFlow, CoverFlowItem } from "@/components/ui/coverflow";

const animeItems: CoverFlowItem[] = [
  { id: 1, image: "/anime/Shinazugawa.jpeg", title: "Sanemi Shinazugawa" },
  { id: 2, image: "/anime/Obanai.jpeg", title: "Obanai Iguro" },
  { id: 3, image: "/anime/Mitsuri.jpeg", title: "Mitsuri Kanroji" },
  { id: 4, image: "/anime/giyu.jpeg", title: "Giyu Tomioka" },
  { id: 5, image: "/anime/Shinobu.jpeg", title: "Shinobu Kocho" },
  { id: 6, image: "/anime/kanao.jpeg", title: "Kanao Tsuyuri" },
  { id: 7, image: "/anime/Tanjiro.jpeg", title: "Tanjiro Kamado" },
  { id: 8, image: "/anime/Nezuko.jpeg", title: "Nezuko Kamado" },
  { id: 9, image: "/anime/Zenitsu.jpeg", title: "Zenitsu Agatsuma" },
  { id: 10, image: "/anime/Inosuke.jpeg", title: "Inosuke Hashibira" },
  { id: 11, image: "/anime/tokitou.jpeg", title: "Muichiro Tokito" },
];

export default function CoverFlowDemo() {
  return (
    <div className="h-[400px] w-full border-b border-border/40 relative bg-background">
      <CoverFlow
        items={animeItems}
        itemWidth={250}
        itemHeight={250}
        initialIndex={3}
        enableReflection={true}
      />
    </div>
  );
}
`}
                  </pre>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-8"
            >
              <motion.h3
                variants={fadeUp}
                className="text-2xl font-medium tracking-tight"
              >
                Installation
              </motion.h3>

              <motion.div variants={fadeUp} className="space-y-4">
                <div className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                  CLI
                </div>
                <div className="rounded-2xl border border-border/40 bg-card shadow-sm">
                  <div className="flex rounded-t-2xl items-center justify-between p-2 px-4 border-b border-zinc-200 dark:border-white/10 bg-secondary/50">
                    <div className="flex items-center gap-4">
                      <div className="text-muted-foreground">
                        <LayoutGrid className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-4">
                        {["pnpm", "yarn", "npm", "bun"].map((pm) => (
                          <button
                            key={pm}
                            onClick={() => setPackageManager(pm)}
                            className={cn(
                              "text-sm font-medium transition-colors relative py-1",
                              packageManager === pm
                                ? "text-zinc-900 dark:text-zinc-100"
                                : "text-muted-foreground hover:text-zinc-900 dark:hover:text-zinc-100",
                            )}
                          >
                            {pm}
                            {packageManager === pm && (
                              <motion.div
                                layoutId="activeTab"
                                className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-zinc-900 dark:bg-zinc-100"
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={copyCommand}
                      className="text-muted-foreground hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-2 hover:bg-zinc-200 dark:hover:bg-white/5 rounded-md"
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="p-4 font-mono text-sm text-zinc-900 dark:text-zinc-100 overflow-x-auto">
                    {packageManager === "pnpm" && (
                      <>
                        <span className="text-blue-600 dark:text-blue-400">
                          pnpm
                        </span>{" "}
                        <span className="text-blue-600 dark:text-blue-400">
                          dlx
                        </span>{" "}
                      </>
                    )}
                    {packageManager === "npm" && (
                      <span className="text-blue-600 dark:text-blue-400">
                        npx
                      </span>
                    )}
                    {packageManager === "yarn" && (
                      <span className="text-blue-600 dark:text-blue-400">
                        npx
                      </span>
                    )}
                    {packageManager === "bun" && (
                      <>
                        <span className="text-blue-600 dark:text-blue-400">
                          bun
                        </span>{" "}
                        <span className="text-blue-600 dark:text-blue-400">
                          x
                        </span>{" "}
                      </>
                    )}{" "}
                    <span className="text-teal-600 dark:text-cyan-400">
                      shadcn@latest
                    </span>{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      add
                    </span>{" "}
                    <span className="text-zinc-500 dark:text-zinc-400">
                      https://coverflow.ashishgogula.in/r/coverflow.json
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-4">
                <div className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                  Manual
                </div>
                <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
                  <p className="text-sm text-muted-foreground mb-4">
                    1. Install dependencies:
                  </p>
                  <div className="rounded-lg bg-secondary/50 p-3 font-mono text-xs mb-6">
                    npm install motion
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    2. Copy the component code into{" "}
                    <code className="text-foreground bg-secondary/50 px-1 py-0.5 rounded">
                      components/coverflow.tsx
                    </code>
                  </p>
                  <Link
                    href="https://github.com/ashishgogula/coverflow/blob/main/components/coverflow.tsx"
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    View Source <Github className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-8"
            >
              <motion.h3
                variants={fadeUp}
                className="text-2xl font-medium tracking-tight"
              >
                Props
              </motion.h3>
              <motion.div
                variants={fadeUp}
                className="overflow-hidden rounded-2xl border border-border/40 shadow-sm"
              >
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary/30 text-muted-foreground font-medium">
                    <tr>
                      <th className="p-4 font-medium">Prop</th>
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Default</th>
                      <th className="p-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40 bg-card/50">
                    <tr className="group hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-mono text-foreground">items</td>
                      <td className="p-4 font-mono text-xs text-blue-500">
                        CoverFlowItem[]
                      </td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">
                        -
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Array of items to display.
                      </td>
                    </tr>
                    <tr className="group hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-mono text-foreground">
                        itemWidth
                      </td>
                      <td className="p-4 font-mono text-xs text-blue-500">
                        number
                      </td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">
                        400
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Width of each card in pixels.
                      </td>
                    </tr>
                    <tr className="group hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-mono text-foreground">
                        itemHeight
                      </td>
                      <td className="p-4 font-mono text-xs text-blue-500">
                        number
                      </td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">
                        400
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Height of each card in pixels.
                      </td>
                    </tr>
                    <tr className="group hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-mono text-foreground">
                        stackSpacing
                      </td>
                      <td className="p-4 font-mono text-xs text-blue-500">
                        number
                      </td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">
                        100
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Spacing between stacked cards.
                      </td>
                    </tr>
                    <tr className="group hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-mono text-foreground">
                        centerGap
                      </td>
                      <td className="p-4 font-mono text-xs text-blue-500">
                        number
                      </td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">
                        250
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Gap between the center card and the stack.
                      </td>
                    </tr>
                    <tr className="group hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-mono text-foreground">
                        rotation
                      </td>
                      <td className="p-4 font-mono text-xs text-blue-500">
                        number
                      </td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">
                        50
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Rotation angle (in degrees) for stacked cards.
                      </td>
                    </tr>
                    <tr className="group hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-mono text-foreground">
                        initialIndex
                      </td>
                      <td className="p-4 font-mono text-xs text-blue-500">
                        number
                      </td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">
                        0
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Index of the initially selected item.
                      </td>
                    </tr>
                    <tr className="group hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-mono text-foreground">
                        enableReflection
                      </td>
                      <td className="p-4 font-mono text-xs text-blue-500">
                        boolean
                      </td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">
                        true
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Enable or disable reflection effect.
                      </td>
                    </tr>
                    <tr className="group hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-mono text-foreground">
                        onItemClick
                      </td>
                      <td className="p-4 font-mono text-xs text-blue-500">
                        function
                      </td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">
                        -
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Callback when an item is clicked.
                      </td>
                    </tr>
                    <tr className="group hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-mono text-foreground">
                        onIndexChange
                      </td>
                      <td className="p-4 font-mono text-xs text-blue-500">
                        function
                      </td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">
                        -
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Callback when the active index changes.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            </motion.div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  );
}
