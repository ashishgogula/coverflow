'use client'

import { Footer } from '@/components/footer'
import { Plus } from 'lucide-react'
import { motion, type Variants } from 'motion/react'

type Section = { type: string; items: string[] }
type Entry = { version: string; date: string; sections: Section[] }

const tagColors: Record<string, string> = {
  Added: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
  Changed: 'text-amber-600 dark:text-amber-400 bg-amber-500/10',
  Improved: 'text-blue-600 dark:text-blue-400 bg-blue-500/10',
  Fixed: 'text-rose-600 dark:text-rose-400 bg-rose-500/10',
  Chore: 'text-muted-foreground bg-secondary/60',
  Notes: 'text-muted-foreground bg-secondary/60',
  'Initial Release': 'text-purple-600 dark:text-purple-400 bg-purple-500/10',
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

function renderItem(item: string) {
  return item.replace(
    /`([^`]+)`/g,
    '<code class="font-mono text-[12px] bg-secondary/80 px-1 py-0.5 rounded text-foreground">$1</code>',
  )
}

export default function ChangelogClient({ entries }: { entries: Entry[] }) {
  const latest = entries[0]?.version

  return (
    <main>
      <div className="m-wrap border-x border-dashed border-t-0 min-h-screen relative">
        <section className="relative pt-20 pb-12 border-b border-dashed border-border">
          <motion.div
            className="px-6 max-w-2xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/40 backdrop-blur-sm text-xs font-medium text-muted-foreground">
                <span className="flex h-1.5 w-1.5 rounded-full bg-foreground/70" />
                What&apos;s new
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp} className="m-h1 mb-4">
              Changelog
            </motion.h1>
           
          </motion.div>
        </section>

        <div className="py-16 relative">
          <Plus className="m-plusIcon m-plusIcon-bl" />
          <Plus className="m-plusIcon m-plusIcon-br" />

          <motion.div
            className="max-w-2xl mx-auto px-6 flex flex-col"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <div className="relative">
              <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border/50" />

            {entries.map((entry) => (
              <motion.div
                key={entry.version}
                variants={fadeUp}
                className="relative pl-10 pb-14"
              >
                <div className="absolute left-0 top-[3px] flex h-4 w-4 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="font-mono text-sm font-semibold">
                    v{entry.version}
                  </span>
                  {entry.version === latest && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-foreground text-background">
                      Latest
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {entry.date}
                  </span>
                </div>

                <div className="flex flex-col gap-5">
                  {entry.sections.map((section) => (
                    <div key={section.type}>
                      <span
                        className={`inline-block text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md mb-2 ${tagColors[section.type] ?? 'text-muted-foreground bg-secondary/60'}`}
                      >
                        {section.type}
                      </span>
                      <ul className="flex flex-col gap-1.5">
                        {section.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                            <span
                              dangerouslySetInnerHTML={{ __html: renderItem(item) }}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </main>
  )
}
