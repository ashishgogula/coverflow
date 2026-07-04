import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

const SITE_URL = 'https://coverflow.ashishgogula.in'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Cover Flow — iOS-Style Coverflow Component for React',
    template: '%s · Cover Flow for React',
  },
  description:
    'Open-source React coverflow component with iOS-like spring physics. Drag, touch, wheel and keyboard ready. Built with Motion and Tailwind CSS. Install via shadcn CLI or npm.',
  keywords: [
    'coverflow',
    'cover flow',
    'react coverflow',
    'coverflow component',
    'react coverflow component',
    'cover flow react',
    'iOS cover flow',
    'iTunes cover flow',
    '3d carousel react',
    'react carousel',
    'shadcn coverflow',
    'shadcn carousel',
    'framer motion carousel',
    'motion carousel',
    'nextjs coverflow',
    'tailwind carousel',
    'album art carousel',
  ],
  authors: [{ name: 'Ashish Gogula', url: 'https://ashishgogula.in' }],
  creator: 'Ashish Gogula',
  publisher: 'Ashish Gogula',
  category: 'technology',
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Cover Flow — iOS-Style Coverflow Component for React',
    description:
      'Open-source React coverflow component with iOS-like spring physics. Drag, touch, wheel and keyboard ready. Built with Motion and Tailwind CSS.',
    url: SITE_URL,
    siteName: 'Cover Flow',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Cover Flow — iOS-style coverflow carousel component for React',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cover Flow — iOS-Style Coverflow Component for React',
    description:
      'Open-source React coverflow component with iOS-like spring physics. Built with Motion and Tailwind CSS.',
    images: ['/og.png'],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Cover Flow',
      alternateName: [
        'coverflow',
        'React Cover Flow',
        'Cover Flow for React',
        'React coverflow component',
      ],
      description:
        'iOS-style coverflow carousel component for React with real spring physics.',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#software`,
      name: 'Cover Flow',
      alternateName: 'coverflow',
      url: SITE_URL,
      description:
        'Open-source iOS-style coverflow carousel component for React. Real-time spring physics via Motion (Framer Motion), Tailwind CSS styling, drag, touch, wheel and keyboard interactions, spatial audio feedback, dark mode, and zero layout shift. Installable through the shadcn CLI or as an npm package.',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'React component',
      operatingSystem: 'Web',
      softwareVersion: '1.1.2',
      license: 'https://opensource.org/licenses/MIT',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      downloadUrl: 'https://www.npmjs.com/package/@ashishgogula/coverflow',
      installUrl: `${SITE_URL}/docs`,
      softwareHelp: { '@type': 'CreativeWork', url: `${SITE_URL}/docs` },
      releaseNotes: `${SITE_URL}/changelog`,
      screenshot: `${SITE_URL}/og.png`,
      author: { '@id': `${SITE_URL}/#person` },
      sameAs: [
        'https://github.com/ashishgogula/coverflow',
        'https://www.npmjs.com/package/@ashishgogula/coverflow',
      ],
      keywords:
        'coverflow, cover flow, react coverflow component, iOS cover flow, 3d carousel, shadcn, framer motion',
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Ashish Gogula',
      url: 'https://ashishgogula.in',
      sameAs: ['https://github.com/ashishgogula'],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground overflow-x-hidden mx-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
