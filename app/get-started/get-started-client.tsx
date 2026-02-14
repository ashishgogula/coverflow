'use client'

import {
  Github,
  CircleCheck,
  Copy,
  LayoutGrid,
  ChevronDown,
  ChevronUp,
  Minimize2,
  Maximize2,
} from 'lucide-react'
import { useState, useRef } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { motion, type Variants, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { CoverFlow, CoverFlowItem } from '@/registry/coverflow/coverflow'
import CoverFlowPlayground from './CoverFlowPlayground'

const animeItems: CoverFlowItem[] = [
  { id: 1, image: '/anime/Sanemi.jpeg', title: 'Sanemi Sanemi' },
  { id: 2, image: '/anime/Obanai.jpeg', title: 'Obanai Iguro' },
  { id: 3, image: '/anime/Mitsuri.jpeg', title: 'Mitsuri Kanroji' },
  { id: 4, image: '/anime/giyu.jpeg', title: 'Giyu Tomioka' },
  { id: 5, image: '/anime/Shinobu.jpeg', title: 'Shinobu Kocho' },
  { id: 6, image: '/anime/kanao.jpeg', title: 'Kanao Tsuyuri' },
  { id: 7, image: '/anime/Tanjiro.jpeg', title: 'Tanjiro Kamado' },
  { id: 8, image: '/anime/Nezuko.jpeg', title: 'Nezuko Kamado' },
  { id: 9, image: '/anime/Zenitsu.jpeg', title: 'Zenitsu Agatsuma' },
  { id: 10, image: '/anime/InosukeH.jpeg', title: 'Inosuke Hashibira' },
  { id: 11, image: '/anime/tokitou.jpeg', title: 'Muichiro Tokito' },
]

export default function GetStartedClient({
  componentCode,
}: {
  componentCode: string
}) {
  const [copied, setCopied] = useState(false)
  const [packageManager, setPackageManager] = useState('pnpm')
  const [installMethod, setInstallMethod] = useState<'shadcn' | 'primitive'>(
    'shadcn',
  )
  const [manualCopied, setManualCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [usageCopied, setUsageCopied] = useState(false)
  const usageCodeRef = useRef<HTMLPreElement | null>(null)

  const copyUsageCode = () => {
    if (!usageCodeRef.current) return
    navigator.clipboard.writeText(usageCodeRef.current.innerText)
    setUsageCopied(true)
    setTimeout(() => setUsageCopied(false), 2000)
  }

  const copyManualCode = () => {
    navigator.clipboard.writeText(componentCode)
    setManualCopied(true)
    setTimeout(() => setManualCopied(false), 2000)
  }

  const commands = {
    pnpm: 'pnpm dlx shadcn add https://ashishgogula.in/r/coverflow.json',
    npm: 'npx shadcn add https://ashishgogula.in/r/coverflow.json',
    yarn: 'npx shadcn add https://ashishgogula.in/r/coverflow.json',
    bun: 'bun x shadcn add https://ashishgogula.in/r/coverflow.json',
  }

  const primitiveCommands = {
    pnpm: 'pnpm add @ashishgogula/coverflow',
    npm: 'npm install @ashishgogula/coverflow',
    yarn: 'yarn add @ashishgogula/coverflow',
    bun: 'bun add @ashishgogula/coverflow',
  }

  const copyCommand = () => {
    const current = installMethod === 'shadcn' ? commands : primitiveCommands
    navigator.clipboard.writeText(
      current[packageManager as keyof typeof current],
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

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
              viewport={{ once: true, margin: '-50px' }}
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
                    enableClickToSnap={true}
                    enableScroll={true}
                    scrollSensitivity={100}
                  />
                </div>
                <div className="p-6 overflow-x-auto">
                  <div className="flex justify-end mb-3">
                    <motion.button
                      whileHover={{ scale: 1.0 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyUsageCode}
                      className="text-muted-foreground hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-2 hover:bg-zinc-200 dark:hover:bg-white/5 rounded-md"
                    >
                      {usageCopied ? (
                        <>
                          <CircleCheck className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                        </>
                      )}
                    </motion.button>
                  </div>
                  <pre
                    ref={usageCodeRef}
                    className="text-sm font-mono text-muted-foreground leading-relaxed"
                  >
                    {`
import { CoverFlow, type CoverFlowItem } from "@/components/ui/coverflow";

const animeItems: CoverFlowItem[] = [
  { id: 1, image: "/anime/Sanemi.jpeg", title: "Sanemi Sanemi" },
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
        enableScroll={true}
        scrollSensitivity={100}
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
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-8"
            >
              <motion.h3
                variants={fadeUp}
                className="text-2xl font-medium tracking-tight"
              >
                Installation
              </motion.h3>

              <motion.div variants={fadeUp} className="space-y-4">
                <div className="flex items-center gap-4 border-b border-border/40 pb-2">
                  <motion.button
                    layout
                    onClick={() => setInstallMethod('shadcn')}
                    className={cn(
                      'text-sm font-medium transition-colors relative py-1',
                      installMethod === 'shadcn'
                        ? 'text-zinc-900 dark:text-zinc-100'
                        : 'text-muted-foreground hover:text-zinc-900 dark:hover:text-zinc-100',
                    )}
                  >
                    Shadcn
                    {installMethod === 'shadcn' && (
                      <motion.div
                        layoutId="activeInstallTab"
                        className="absolute -bottom-[9px] left-0 right-0 h-[2px] bg-zinc-900 dark:bg-zinc-100"
                      />
                    )}
                  </motion.button>
                  <motion.button
                    layout
                    onClick={() => setInstallMethod('primitive')}
                    className={cn(
                      'text-sm font-medium transition-colors relative py-1',
                      installMethod === 'primitive'
                        ? 'text-zinc-900 dark:text-zinc-100'
                        : 'text-muted-foreground hover:text-zinc-900 dark:hover:text-zinc-100',
                    )}
                  >
                    Primitive
                    {installMethod === 'primitive' && (
                      <motion.div
                        layoutId="activeInstallTab"
                        className="absolute -bottom-[9px] left-0 right-0 h-[2px] bg-zinc-900 dark:bg-zinc-100"
                      />
                    )}
                  </motion.button>
                </div>
                <div className="rounded-2xl border border-border/40 bg-card shadow-sm">
                  <div className="flex rounded-t-2xl items-center justify-between p-2 px-4 border-b border-zinc-200 dark:border-white/10 bg-secondary/50">
                    <div className="flex items-center gap-4">
                      <div className="text-muted-foreground">
                        <LayoutGrid className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-4">
                        {['pnpm', 'yarn', 'npm', 'bun'].map((pm) => (
                          <button
                            key={pm}
                            onClick={() => setPackageManager(pm)}
                            className={cn(
                              'text-sm font-medium transition-colors relative py-1',
                              packageManager === pm
                                ? 'text-zinc-900 dark:text-zinc-100'
                                : 'text-muted-foreground hover:text-zinc-900 dark:hover:text-zinc-100',
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
                    <motion.button
                      whileHover={{ scale: 1.0 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyCommand}
                      className="text-muted-foreground hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-2 hover:bg-zinc-200 dark:hover:bg-white/5 rounded-md"
                    >
                      {copied ? (
                        <CircleCheck className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </motion.button>
                  </div>
                  <div className="p-4 font-mono text-sm text-zinc-900 dark:text-zinc-100 overflow-x-auto min-h-[56px] flex items-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={installMethod + packageManager}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {installMethod === 'shadcn' ? (
                          <>
                            {packageManager === 'pnpm' && (
                              <>
                                <span className="text-blue-600 dark:text-blue-400">
                                  pnpm
                                </span>{' '}
                                <span className="text-blue-600 dark:text-blue-400">
                                  dlx
                                </span>{' '}
                              </>
                            )}
                            {packageManager === 'npm' && (
                              <span className="text-blue-600 dark:text-blue-400">
                                npx
                              </span>
                            )}
                            {packageManager === 'yarn' && (
                              <span className="text-blue-600 dark:text-blue-400">
                                npx
                              </span>
                            )}
                            {packageManager === 'bun' && (
                              <>
                                <span className="text-blue-600 dark:text-blue-400">
                                  bun
                                </span>{' '}
                                <span className="text-blue-600 dark:text-blue-400">
                                  x
                                </span>{' '}
                              </>
                            )}{' '}
                            <span className="text-teal-600 dark:text-cyan-400">
                              shadcn@latest
                            </span>{' '}
                            <span className="text-blue-600 dark:text-blue-400">
                              add
                            </span>{' '}
                            <span className="text-zinc-500 dark:text-zinc-400">
                              https://coverflow.ashishgogula.in/r/coverflow.json
                            </span>
                          </>
                        ) : (
                          <>
                            {packageManager === 'pnpm' && (
                              <>
                                <span className="text-blue-600 dark:text-blue-400">
                                  pnpm
                                </span>{' '}
                                <span className="text-blue-600 dark:text-blue-400">
                                  add
                                </span>{' '}
                              </>
                            )}
                            {packageManager === 'npm' && (
                              <>
                                <span className="text-blue-600 dark:text-blue-400">
                                  npm
                                </span>{' '}
                                <span className="text-blue-600 dark:text-blue-400">
                                  install
                                </span>{' '}
                              </>
                            )}
                            {packageManager === 'yarn' && (
                              <>
                                <span className="text-blue-600 dark:text-blue-400">
                                  yarn
                                </span>{' '}
                                <span className="text-blue-600 dark:text-blue-400">
                                  add
                                </span>{' '}
                              </>
                            )}
                            {packageManager === 'bun' && (
                              <>
                                <span className="text-blue-600 dark:text-blue-400">
                                  bun
                                </span>{' '}
                                <span className="text-blue-600 dark:text-blue-400">
                                  add
                                </span>{' '}
                              </>
                            )}{' '}
                            <span className="text-zinc-500 dark:text-zinc-400">
                              @ashishgogula/coverflow
                            </span>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-4">
                <div className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                  Manual
                </div>
                <div className="rounded-2xl border border-border/40 bg-card shadow-sm overflow-hidden">
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      1. Install dependencies:
                    </p>
                    <div className="rounded-lg bg-secondary/50 p-3 font-mono text-xs mb-6">
                      npm install motion
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      2. Copy the component code into{' '}
                      <code className="text-foreground bg-secondary/50 px-1 py-0.5 rounded">
                        components/coverflow.tsx
                      </code>
                    </p>

                    <div className="relative rounded-lg bg-secondary/50 border border-border/50 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-secondary/30">
                        <span className="text-xs font-medium text-muted-foreground">
                          coverflow.tsx
                        </span>
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.0 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-muted-foreground hover:text-foreground transition-colors p-1.5 hover:bg-background/50 rounded-md"
                          >
                            {isExpanded ? (
                              <Minimize2 className="w-3.5 h-3.5" />
                            ) : (
                              <Maximize2 className="w-3.5 h-3.5" />
                            )}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.0 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={copyManualCode}
                            className="text-muted-foreground hover:text-foreground transition-colors p-1.5 hover:bg-background/50 rounded-md"
                          >
                            {manualCopied ? (
                              <CircleCheck className="w-3.5 h-3.5" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </motion.button>
                        </div>
                      </div>
                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? 'auto' : 400,
                        }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative overflow-hidden"
                      >
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-xs font-mono text-muted-foreground leading-relaxed">
                            {componentCode}
                          </pre>
                        </div>
                        {!isExpanded && (
                          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                        )}
                      </motion.div>
                      <div className="border-t border-border/50 bg-secondary/30 p-2 flex justify-center">
                        <button
                          onClick={() => setIsExpanded(!isExpanded)}
                          className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-background/50"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-3.5 h-3.5" />
                              Collapse code
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3.5 h-3.5" />
                              Expand code
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-8"
            >
              <motion.h3
                variants={fadeUp}
                className="text-2xl font-medium tracking-tight"
              >
                Interactive Example
              </motion.h3>
              <motion.div variants={fadeUp}>
                <CoverFlowPlayground />
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
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
                        false
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Enable or disable reflection effect.
                      </td>
                    </tr>
                    <tr className="group hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-mono text-foreground">
                        enableClickToSnap
                      </td>
                      <td className="p-4 font-mono text-xs text-blue-500">
                        boolean
                      </td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">
                        true
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Enable or disable clicking on items to snap them to the
                        center.
                      </td>
                    </tr>
                    <tr className="group hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-mono text-foreground">
                        enableScroll
                      </td>
                      <td className="p-4 font-mono text-xs text-blue-500">
                        boolean
                      </td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">
                        true
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Enable or disable horizontal wheel scroll snapping.
                      </td>
                    </tr>
                    <tr className="group hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-mono text-foreground">
                        scrollSensitivity
                      </td>
                      <td className="p-4 font-mono text-xs text-blue-500">
                        number
                      </td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">
                        100
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Wheel delta threshold required before snapping to next
                        card.
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
  )
}
