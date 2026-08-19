import { desc, eq, and, like } from "drizzle-orm";
import { recruitments } from "~/db/schema";
import type { AppDb } from "~/db/index.server";

const listFields = {
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
};

export async function getLatestRecruitments(db: AppDb, limit = 24) {
  return db.select(listFields).from(recruitments)
    .where(eq(recruitments.status, "published"))
    .orderBy(desc(recruitments.createdAt)).limit(Math.min(limit, 100));
}

export async function getRecruitmentBySlug(db: AppDb, slug: string) {
  const result = await db.select().from(recruitments)
    .where(eq(recruitments.slug, slug)).limit(1);
  return result[0] || null;
}

export async function getPublishedSlugs(db: AppDb) {
  const result = await db.select({ slug: recruitments.slug }).from(recruitments)
    .where(eq(recruitments.status, "published"))
    .orderBy(desc(recruitments.createdAt));
  return result.map((item) => item.slug);
}

export async function getRecruitmentsList(
  db: AppDb,
  filters: { state?: string; qualification?: string; search?: string }
) {
  const conditions = [eq(recruitments.status, "published")];
  if (filters.state) conditions.push(eq(recruitments.state, filters.state));
  if (filters.qualification) conditions.push(like(recruitments.minimumQualification, `%${filters.qualification}%`));
  if (filters.search) conditions.push(like(recruitments.title, `%${filters.search}%`));

  return db.select(listFields).from(recruitments)
    .where(and(...conditions))
    .orderBy(desc(recruitments.createdAt)).limit(100);
}
