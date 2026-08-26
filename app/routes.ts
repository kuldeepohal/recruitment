import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("jobs", "routes/jobs.tsx"),
  route("recruitment/:slug", "routes/recruitment.$slug.tsx"),
  route("teacher-recruitment", "routes/teacher-recruitment.tsx"),
  route("articles", "routes/articles.tsx"),
  route("articles/government-job-eligibility-for-freshers", "routes/articles.government-job-eligibility-for-freshers.tsx"),
  route("sitemap.xml", "routes/sitemap.xml.tsx"),
] satisfies RouteConfig;
