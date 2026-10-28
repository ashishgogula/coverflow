import type { NextConfig } from "next";

// Cloudflare build (worker/build.sh): static export served as Workers Static Assets.
const cloudflare = process.env.NEXT_PUBLIC_CLOUDFLARE === "1";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    qualities: [75, 100],
    ...(cloudflare && { unoptimized: true }),
  },
  ...(cloudflare && {
    output: "export",
    typescript: { ignoreBuildErrors: true },
  }),
};

export default nextConfig;
