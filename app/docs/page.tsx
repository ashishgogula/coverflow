import fs from 'fs'
import path from 'path'
import GetStartedClient from '../get-started/get-started-client'

export default function DocsPage() {
  const componentCode = fs.readFileSync(
    path.join(process.cwd(), 'registry/coverflow/coverflow.tsx'),
    'utf8',
  )

  return <GetStartedClient componentCode={componentCode} />
}
