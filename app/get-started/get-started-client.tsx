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
import { useRef, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { motion, type Variants, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { CoverFlow, CoverFlowItem } from '@/registry/coverflow/coverflow'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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

const FALLBACK_DOCS_URL =
  'https://coverflow.ashishgogula.in/docs/get-started.mdx'

function MarkdownLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M22.27 19.385H1.73A1.73 1.73 0 010 17.655V6.345a1.73 1.73 0 011.73-1.73h20.54A1.73 1.73 0 0124 6.345v11.308a1.73 1.73 0 01-1.73 1.731zM5.769 15.923v-4.5l2.308 2.885 2.307-2.885v4.5h2.308V8.078h-2.308l-2.307 2.885-2.308-2.885H3.46v7.847zM21.232 12h-2.309V8.077h-2.307V12h-2.308l3.461 4.039z"
        fill="currentColor"
      />
    </svg>
  )
}

function V0Logo() {
  return (
    <svg viewBox="0 0 40 20" aria-hidden="true" className="h-4 w-4">
      <path
        d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
        fill="currentColor"
      />
      <path
        d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ChatGPTLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66ZM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ClaudeLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"
        fill="currentColor"
      />
    </svg>
  )
}

function SciraLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M6.935 2.26a.262.262 0 0 1 .203.485 10.785 10.785 0 1 0 12.619 16.65.262.262 0 1 1 .41.327A11.309 11.309 0 0 1 11.264 24h-.08A11.31 11.31 0 0 1 6.935 2.26Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M18.382 8.45c.134 0 .246.1.261.234.133 1.194.527 2.094 1.161 2.728.635.635 1.535 1.03 2.73 1.162a.262.262 0 0 1 0 .521c-1.195.133-2.095.528-2.73 1.162-.634.634-1.028 1.534-1.161 2.729a.262.262 0 0 1-.522 0c-.132-1.195-.527-2.095-1.161-2.73-.634-.633-1.535-1.028-2.729-1.16a.263.263 0 0 1 0-.522c1.194-.133 2.095-.527 2.729-1.162.634-.634 1.029-1.534 1.161-2.729l.002-.012a.263.263 0 0 1 .26-.221Zm0 2.274a4.373 4.373 0 0 1-.865 1.245 4.372 4.372 0 0 1-1.245.866c.471.221.888.508 1.245.865.357.357.644.774.865 1.245.222-.472.509-.888.866-1.245a4.375 4.375 0 0 1 1.244-.865 4.373 4.373 0 0 1-1.244-.866 4.373 4.373 0 0 1-.866-1.245Z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M13.562 1.15c.054 0 .099.04.105.093.112 1.014.449 1.79 1 2.342.551.552 1.328.888 2.342 1a.105.105 0 0 1 0 .21c-1.014.112-1.79.448-2.342 1-.551.551-.888 1.328-1 2.342a.105.105 0 0 1-.21 0c-.112-1.014-.448-1.79-1-2.342-.55-.552-1.328-.888-2.341-1a.105.105 0 0 1 0-.21c1.013-.112 1.79-.448 2.341-1 .552-.551.888-1.328 1-2.342a.105.105 0 0 1 .105-.093ZM20.78 0c.053 0 .098.04.104.093.084.756.334 1.333.743 1.741.408.408.985.659 1.74.743a.105.105 0 0 1 0 .209c-.756.084-1.332.334-1.74.742-.409.409-.66.985-.743 1.741a.105.105 0 0 1-.209 0c-.084-.756-.334-1.332-.743-1.74-.408-.409-.984-.66-1.74-.743a.105.105 0 0 1 0-.209c.756-.084 1.332-.335 1.74-.743.409-.408.66-.985.743-1.74A.105.105 0 0 1 20.78 0Z"
      />
    </svg>
  )
}

function ProviderLogo({
  provider,
}: {
  provider: 'v0' | 'chatgpt' | 'claude' | 'scira'
}) {
  if (provider === 'v0') {
    return <V0Logo />
  }

  if (provider === 'chatgpt') {
    return <ChatGPTLogo />
  }

  if (provider === 'claude') {
    return <ClaudeLogo />
  }

  return <SciraLogo />
}

function ProviderIcon({
  provider,
}: {
  provider: 'v0' | 'chatgpt' | 'claude' | 'scira'
}) {
  return (
    <span className="inline-flex h-4 w-4 items-center justify-center text-muted-foreground">
      <ProviderLogo provider={provider} />
    </span>
  )
}

function MarkdownIcon() {
  return (
    <span className="inline-flex h-4 w-4 items-center justify-center text-muted-foreground">
      <MarkdownLogo />
    </span>
  )
}

function ProviderRow({
  provider,
  label,
  onClick,
  highlighted = false,
}: {
  provider: 'v0' | 'chatgpt' | 'claude' | 'scira'
  label: string
  onClick: () => void
  highlighted?: boolean
}) {
  return (
    <DropdownMenuItem asChild className={highlighted ? 'bg-accent' : undefined}>
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left cursor-pointer"
      >
        <ProviderIcon provider={provider} />
        {label}
      </button>
    </DropdownMenuItem>
  )
}

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
  const [pageCopied, setPageCopied] = useState(false)
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

  const copyPageMdx = async () => {
    try {
      const response = await fetch('/docs/get-started.mdx')
      if (!response.ok) return

      const mdx = await response.text()
      await navigator.clipboard.writeText(mdx)

      setPageCopied(true)
      setTimeout(() => setPageCopied(false), 2000)
    } catch {}
  }

  const getDocsMdxUrl = () => {
    if (typeof window === 'undefined') return FALLBACK_DOCS_URL
    return `${window.location.origin}/docs/get-started.mdx`
  }

  const buildAssistantPrompt = (docsUrl: string) =>
    `I'm looking at this component documentation: ${docsUrl}
I want to use it in a React (TypeScript) project.
Help me understand how to use it step-by-step, including explaining key concepts, showing practical examples with TypeScript code.
Be ready to answer follow-up questions and help debug issues based on the documentation.`

  const openInAssistant = async (
    provider: 'v0' | 'chatgpt' | 'claude' | 'scira',
  ) => {
    const prompt = buildAssistantPrompt(getDocsMdxUrl())
    const targetUrls = {
      v0: `https://v0.app/?q=${encodeURIComponent(prompt)}`,
      chatgpt: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(prompt)}`,
      claude: `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
      scira: `https://scira.ai/?q=${encodeURIComponent(prompt)}`,
    } as const

    try {
      await navigator.clipboard.writeText(prompt)
    } catch {}

    window.open(targetUrls[provider], '_blank', 'noopener,noreferrer')
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
            className="max-w-4xl mx-auto space-y-16 py-12 relative z-10 px-6 overflow-visible"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative z-50"
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
              <motion.div variants={fadeUp}>
                <DropdownMenu>
                  <div className="inline-flex items-stretch rounded-xl border border-border/70 dark:border-white/15 bg-secondary shadow-sm overflow-visible z-30">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={copyPageMdx}
                      className="inline-flex w-[154px] items-center justify-center px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/70 transition-colors rounded-l-xl"
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className="relative h-4 w-4">
                          <Copy
                            className={cn(
                              'absolute inset-0 h-4 w-4 transition-opacity duration-200',
                              pageCopied ? 'opacity-0' : 'opacity-100',
                            )}
                          />
                          <CircleCheck
                            className={cn(
                              'absolute inset-0 h-4 w-4 transition-opacity duration-200',
                              pageCopied ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                        </span>
                        <span className="relative h-5 w-[74px]">
                          <span
                            className={cn(
                              'absolute inset-0 transition-opacity duration-200',
                              pageCopied ? 'opacity-0' : 'opacity-100',
                            )}
                          >
                            Copy Page
                          </span>
                          <span
                            className={cn(
                              'absolute inset-0 transition-opacity duration-200',
                              pageCopied ? 'opacity-100' : 'opacity-0',
                            )}
                          >
                            Copied
                          </span>
                        </span>
                      </span>
                    </motion.button>

                    <DropdownMenuTrigger asChild>
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        type="button"
                        aria-label="Open copy options"
                        className="group inline-flex items-center justify-center px-3 text-foreground border-l border-border/70 dark:border-white/15 hover:bg-secondary/70 data-[state=open]:bg-secondary/70 transition-colors rounded-r-xl"
                      >
                        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </motion.button>
                    </DropdownMenuTrigger>
                  </div>

                  <DropdownMenuContent
                    align="start"
                    sideOffset={10}
                    className="w-[300px] max-w-[calc(100vw-2rem)] p-2 bg-secondary border-border/70 dark:border-white/15"
                  >
                    <DropdownMenuItem asChild>
                      <a
                        href="/docs/get-started.mdx"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full cursor-pointer"
                      >
                        <MarkdownIcon />
                        View as Markdown
                      </a>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <ProviderRow
                      provider="v0"
                      label="Open in v0"
                      onClick={() => openInAssistant('v0')}
                    />

                    <ProviderRow
                      provider="chatgpt"
                      label="Open in ChatGPT"
                      onClick={() => openInAssistant('chatgpt')}
                      highlighted
                    />

                    <ProviderRow
                      provider="claude"
                      label="Open in Claude"
                      onClick={() => openInAssistant('claude')}
                    />

                    <ProviderRow
                      provider="scira"
                      label="Open in Scira AI"
                      onClick={() => openInAssistant('scira')}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
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
                    enableScroll={true}
                    scrollThreshold={60}
                    centerGap={180}
                    stackSpacing={60}
                    enableReflection={true}
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
      items={animeItems}
        itemWidth={250}
        itemHeight={250}
        initialIndex={5}
        enableScroll={true}
        scrollThreshold={60}
        centerGap={180}
        stackSpacing={60}
        enableReflection={true}
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
                        scrollThreshold
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
