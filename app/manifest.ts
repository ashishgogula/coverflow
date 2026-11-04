import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cover Flow — iOS-Style Coverflow Component for React',
    short_name: 'Cover Flow',
    description:
      'Open-source React coverflow component with iOS-like spring physics. Built with Motion and Tailwind CSS.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
