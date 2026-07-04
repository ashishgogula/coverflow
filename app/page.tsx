import type { Metadata } from 'next'
import { Plus } from 'lucide-react'
import HomeClient from './home-client'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

const faqs = [
  {
    question: 'What is Cover Flow?',
    answer:
      'Cover Flow is the iconic 3D carousel interaction Apple introduced in iTunes and iOS, where album covers fan out in 3D space and snap to center as you browse. This project is an open-source recreation of that coverflow effect as a React component, rebuilt with real spring physics instead of scripted animations.',
  },
  {
    question: 'How do I add a coverflow carousel to a React app?',
    answer:
      'Install the Cover Flow component with the shadcn CLI — npx shadcn add https://ashishgogula.in/r/coverflow.json — or from npm as @ashishgogula/coverflow. Then render the CoverFlow component with your items. It works in any modern React or Next.js App Router project.',
  },
  {
    question: 'Does it work with Next.js, Tailwind CSS, and shadcn/ui?',
    answer:
      'Yes. The component is written in TypeScript, styled with Tailwind CSS, follows shadcn/ui conventions, and supports dark mode via next-themes. Isolated 3D transforms mean the surrounding layout never shifts.',
  },
  {
    question: 'Is the coverflow component accessible?',
    answer:
      'Yes. It supports arrow-key navigation, focus management, and reduced-motion preferences, alongside drag, touch, click-to-snap, and horizontal scroll-wheel input.',
  },
  {
    question: "How is this different from Swiper's coverflow effect?",
    answer:
      "Swiper's coverflow effect applies CSS transforms along a fixed timeline. This component drives every card with real-time, interruptible spring physics from Motion (Framer Motion), with velocity-aware throwing and 1:1 gesture tracking — so it feels like the original iOS Cover Flow rather than a slideshow transition.",
  },
  {
    question: 'Is it free to use?',
    answer:
      'Yes. Cover Flow is MIT-licensed and open source on GitHub, free for personal and commercial projects.',
  },
]

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

function FaqSection() {
  return (
    <section
      id="faq"
      className="py-16 relative border-t border-dashed border-border/70 scroll-mt-24"
    >
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 text-center">
          Frequently asked questions
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed mb-10 text-center text-balance">
          Everything about using the Cover Flow coverflow component in your
          React project.
        </p>
        <div className="border-y border-dashed border-border/70 divide-y divide-dashed divide-border/70">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item group">
              <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none select-none text-base font-semibold tracking-tight transition-colors hover:text-foreground/80 [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out group-open:rotate-45" />
              </summary>
              <p className="pb-5 pr-8 text-[15px] leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <HomeClient faq={<FaqSection />} />
    </>
  )
}
