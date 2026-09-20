import { ArrowRight } from 'lucide-react'

export function PlanesBanner() {
  return (
    <a
      href="https://useplanes.com/?utm_source=coverflow"
      target="_blank"
      rel="noopener noreferrer"
      className="m-wrap sticky top-0 z-[101] flex h-9 items-center justify-center gap-2 border-x border-b border-dashed border-border bg-background px-4 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      <span>Cover Flow is part of <span className="font-semibold text-foreground">Planes</span>, a library of 100+ animated React components</span>
      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
    </a>
  )
}
