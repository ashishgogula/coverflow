'use client'

import { motion } from 'motion/react'

export function Footer() {
  return (
    <motion.footer
      className="m-foot border-t border-b border-dashed border-border/70 relative mb-4"
      aria-label="Footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="m-footInner px-6">
        <div className="text-sm font-medium flex flex-wrap gap-1">
          <span>Built by</span>
          <a
            href="https://ashishgogula.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4 font-semibold hover:underline"
          >
            Ashish Gogula
          </a>
          <span>· Hosted on</span>
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4 font-semibold hover:underline"
          >
            Vercel
          </a>
          <span>· Source code on</span>
          <a
            href="https://github.com/ashishgogula/coverflow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4 font-semibold hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.footer>
  )
}
