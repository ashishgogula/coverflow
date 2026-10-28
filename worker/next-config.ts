/**
 * next.config.ts headers() in Cloudflare's terms, so both hosts read one
 * source. Static assets never reach the Worker: build-assets.ts writes these
 * rules into out/_headers for them, and the Worker applies them itself to what
 * it serves (Cloudflare skips _headers for Worker responses).
 */

import nextConfig from "../next.config"

export type HeaderRule = { pattern: string; headers: { key: string; value: string }[] }

/** A next.config `source` as a Cloudflare path pattern. Throws on anything unmapped. */
export function toPattern(source: string): string {
  if (source === "/(.*)") return "/*"
  if (source.endsWith("/:path*")) return `${source.slice(0, -"/:path*".length)}/*`
  if (!/[:()*]/.test(source)) return source
  throw new Error(`No Cloudflare pattern for next.config source "${source}"`)
}

export function matches(pattern: string, pathname: string): boolean {
  return pattern.endsWith("/*") ? pathname.startsWith(pattern.slice(0, -1)) : pathname === pattern
}

/** In next.config order: a later rule's header wins over an earlier one, as on Vercel. */
export async function headerRules(): Promise<HeaderRule[]> {
  const rules = (await nextConfig.headers?.()) ?? []
  return rules.map((rule) => ({ pattern: toPattern(rule.source), headers: rule.headers }))
}
