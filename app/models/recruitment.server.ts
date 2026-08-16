import { desc, eq, and, like } from "drizzle-orm";
import { recruitments } from "~/db/schema";
import type { AppDb } from "~/db/index.server";

// 1. Fetch Latest Jobs (Used on the Homepage)
export async function getLatestRecruitments(db: AppDb, limit = 10) {
  return db
    .select({
      id: recruitments.id,
      slug: recruitments.slug,
      title: recruitments.title,
      organisation: recruitments.organisation,
      numberOfPosts: recruitments.numberOfPosts,
      minimumQualification: recruitments.minimumQualification,
      minimumAge: recruitments.minimumAge,
      maximumAge: recruitments.maximumAge,
      applicationLastDate: recruitments.applicationLastDate,
      state: recruitments.state,
      status: recruitments.status,
    })
    .from(recruitments)
    .where(eq(recruitments.status, "published"))
    .orderBy(desc(recruitments.createdAt))
    .limit(limit);
}

// 2. Fetch Single Job by Slug (Used on the Recruitment Detail Page)
export async function getRecruitmentBySlug(db: AppDb, slug: string) {
  const result = await db
    .select()
    .from(recruitments)
    .where(eq(recruitments.slug, slug))
    .limit(1);
    
  return result[0] || null;
}

// 3. Fetch Filtered Jobs (Used on the /jobs Listing Page)
export async function getRecruitmentsList(
  db: AppDb,
  filters: { state?: string; qualification?: string; search?: string }
) {
  const conditions = [eq(recruitments.status, "published")];

  if (filters.state) {
    conditions.push(eq(recruitments.state, filters.state));
  }
  if (filters.qualification) {
    conditions.push(like(recruitments.minimumQualification, `%${filters.qualification}%`));
  }
  if (filters.search) {
    conditions.push(like(recruitments.title, `%${filters.search}%`));
  }

  return db
    .select({
      id: recruitments.id,
      slug: recruitments.slug,
      title: recruitments.title,
      organisation: recruitments.organisation,
      numberOfPosts: recruitments.numberOfPosts,
      minimumQualification: recruitments.minimumQualification,
      minimumAge: recruitments.minimumAge,
      maximumAge: recruitments.maximumAge,
      applicationLastDate: recruitments.applicationLastDate,
      state: recruitments.state,
      status: recruitments.status,
    })
    .from(recruitments)
    .where(and(...conditions))
    .orderBy(desc(recruitments.createdAt))
    .limit(50);
}