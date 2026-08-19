import type { LoaderFunctionArgs } from "react-router";
import { createDb } from "~/db/index.server";
import { getPublishedSlugs } from "~/models/recruitment.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const origin = (process.env.SITE_URL || new URL(request.url).origin).replace(/\/$/, "");
  const slugs = await getPublishedSlugs(createDb());
  const urls = [
    `${origin}/`,
    `${origin}/jobs`,
    ...slugs.map((slug) => `${origin}/recruitment/${encodeURIComponent(slug)}`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
    .map((url) => `<url><loc>${escapeXml(url)}</loc></url>`)
    .join("")}\n</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
};

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export default function Sitemap() {
  return null;
}
