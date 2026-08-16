import type { Config } from "@react-router/dev/config";

export default {
  // This explicitly enables Server-Side Rendering (SSR).
  // Without this, Vite looks for an index.html file that doesn't exist.
  // SSR is required for your Cloudflare D1 database architecture.
  ssr: true,
} satisfies Config;