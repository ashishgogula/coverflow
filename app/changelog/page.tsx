import fs from 'fs'
import path from 'path'
import { Navbar } from '@/components/navbar'
import ChangelogClient from './changelog-client'

type Section = { type: string; items: string[] }
type Entry = { version: string; date: string; sections: Section[] }

function parseChangelog(md: string): Entry[] {
  const entries: Entry[] = []
  const lines = md.split('\n')

  let current: Entry | null = null
  let currentSection: Section | null = null

  for (const raw of lines) {
    const line = raw.trimEnd()

    const versionMatch = line.match(/^## \[([^\]]+)\]\s*-\s*(.+)/)
    if (versionMatch) {
      if (currentSection && current) current.sections.push(currentSection)
      if (current) entries.push(current)
      current = { version: versionMatch[1], date: versionMatch[2].trim(), sections: [] }
      currentSection = null
      continue
    }

    const sectionMatch = line.match(/^### (.+)/)
    if (sectionMatch && current) {
      if (currentSection) current.sections.push(currentSection)
      currentSection = { type: sectionMatch[1].trim(), items: [] }
      continue
    }

    const itemMatch = line.match(/^- (.+)/)
    if (itemMatch) {
      if (!currentSection && current) {
        currentSection = { type: 'Notes', items: [] }
      }
      currentSection?.items.push(itemMatch[1].trim())
    }
  }

  if (currentSection && current) current.sections.push(currentSection)
  if (current) entries.push(current)

  return entries
}

export default function ChangelogPage() {
  const md = fs.readFileSync(path.join(process.cwd(), 'CHANGELOG.md'), 'utf8')
  const entries = parseChangelog(md)

  return (
    <div className="m-shell">
      <Navbar />
      <ChangelogClient entries={entries} />
    </div>
  )
}
