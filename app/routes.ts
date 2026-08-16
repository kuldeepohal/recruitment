import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // 1. Maps the root URL "/" to our home.tsx file
  index("routes/home.tsx"),
  
  // 2. Maps "/jobs" to our search and filter page
  route("jobs", "routes/jobs.tsx"),
  
  // 3. Maps "/recruitment/anything" to our dynamic detail page
  route("recruitment/:slug", "routes/recruitment.$slug.tsx"),
] satisfies RouteConfig;