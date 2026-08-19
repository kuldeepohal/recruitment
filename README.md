# GovJob Central

A fast, SEO-first government recruitment discovery platform built with React Router, Vite, TypeScript, Tailwind CSS, Drizzle ORM and a libSQL-compatible database.

## Goals

- Publish a large number of structured recruitment pages.
- Make every published recruitment discoverable through search engines.
- Provide clear links to official recruitment notifications and application portals.
- Support useful job-search filters and future content/guide pages.
- Keep the application portable across Node-compatible hosting providers.

## Runtime

- React Router SSR
- Vite
- TypeScript
- Tailwind CSS
- Drizzle ORM
- libSQL/Turso-compatible database
- Node.js 22+

The application no longer requires Cloudflare D1 at runtime. Configure `DATABASE_URL` and optional `DATABASE_AUTH_TOKEN` through environment variables.

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

Set a real database connection before loading database-backed pages.

## Production

```bash
npm run build
npm start
```

A Dockerfile is included for container-based deployment.

## Deployment strategy

The application is intentionally kept at the Node/HTTP runtime layer so it can be adapted to Vercel, Netlify, Render, Railway, a VPS, or a container platform without changing the database/business logic.

For a serverless platform, use that platform's React Router adapter/runtime configuration rather than adding platform-specific database code to application routes.

## SEO and reach

The project includes dynamic metadata, canonical URL support, Open Graph metadata, `JobPosting` structured data, `robots.txt`, an XML sitemap, clean recruitment slugs, and internal links between listings and detail pages.

The content strategy should grow around useful landing pages such as state-wise jobs, qualification-wise jobs, organisation/exam hubs, application guides, eligibility explainers, admit-card/result updates and FAQs. Avoid thin duplicate pages; each page should add useful information.

## Trust and monetization

Every recruitment should identify its official source and send applicants to official notification/application links. Sponsored or affiliate content must be clearly labelled and must never be presented as an official government link.

Potential relevant monetization categories include clearly labelled education, exam-preparation, books, productivity tools and other job-seeker resources. Monetization should remain secondary to accurate recruitment information and good page performance.

## Data quality

Recruitment records should be verified against the official source before publishing. Store source URL, notification URL, application URL, last-checked timestamp and publication status so stale information can be reviewed and updated.
