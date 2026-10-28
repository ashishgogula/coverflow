/**
 * Writes out/_headers and out/_redirects after the static export, because
 * Workers Static Assets ignore next.config.ts. Rules for paths the Worker runs
 * first are skipped: it applies them itself (worker/index.ts).
 */

import fs from "node:fs"
import path from "node:path"
import nextConfig from "../next.config"
import { headerRules } from "./next-config"

const OUT = path.join(process.cwd(), "out")

export function workerFirstPaths(): string[] {
  const jsonc = fs.readFileSync(path.join(process.cwd(), "wrangler.jsonc"), "utf-8")
  return JSON.parse(jsonc.replace(/^\s*\/\/.*$/gm, "")).assets.run_worker_first ?? []
}

export async function buildHeadersFile(): Promise<string> {
  const workerFirst = new Set(workerFirstPaths())
  const blocks = [
    // Matches Vercel: content-hashed build output is immutable.
    "/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable",
  ]
  for (const rule of await headerRules()) {
    if (workerFirst.has(rule.pattern)) continue
    blocks.push([rule.pattern, ...rule.headers.map((h) => `  ${h.key}: ${h.value}`)].join("\n"))
  }
  return `${blocks.join("\n\n")}\n`
}

export async function buildRedirectsFile(): Promise<string> {
  const redirects = (await nextConfig.redirects?.()) ?? []
  return redirects
    .map((r) => `${r.source} ${r.destination} ${"permanent" in r && r.permanent ? 308 : (r.statusCode ?? 307)}\n`)
    .join("")
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  if (!fs.existsSync(path.join(OUT, "index.html"))) {
    throw new Error("build-assets: out/index.html missing; run the static export first")
  }
  Promise.all([buildHeadersFile(), buildRedirectsFile()]).then(([headers, redirects]) => {
    fs.writeFileSync(path.join(OUT, "_headers"), headers)
    fs.writeFileSync(path.join(OUT, "_redirects"), redirects)
    console.log("build-assets: wrote out/_headers and out/_redirects")
  })
}
