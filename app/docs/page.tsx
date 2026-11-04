import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import GetStartedClient from '../get-started/get-started-client'

const SITE_URL = 'https://coverflow.ashishgogula.in'

export const metadata: Metadata = {
  title: 'Docs — Install the React Coverflow Component',
  description:
    'Install Cover Flow for React via the shadcn CLI, npm, pnpm, yarn, or bun. Usage examples, live playground, presets, and the full props reference for the iOS-style coverflow component.',
  alternates: {
    canonical: '/docs',
  },
  openGraph: {
    title: 'Cover Flow Docs — Install the React Coverflow Component',
    description:
      'Installation, usage examples, live playground, and props reference for the iOS-style Cover Flow component for React.',
    url: `${SITE_URL}/docs`,
  },
}

const breadcrumbStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Cover Flow',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Docs',
      item: `${SITE_URL}/docs`,
    },
  ],
}

export default function DocsPage() {
  const componentCode = fs.readFileSync(
    path.join(process.cwd(), 'registry/coverflow/coverflow.tsx'),
    'utf8',
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <GetStartedClient componentCode={componentCode} />
    </>
  )
}
