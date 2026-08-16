import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  passwordHash: text("password_hash").notNull(),
  role: text("role").default("user").notNull(), 
  status: text("status").default("active").notNull(),
  emailVerified: integer("email_verified").default(0).notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
  lastLogin: text("last_login"),
});

export const profiles = sqliteTable("profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  firstName: text("first_name"),
  lastName: text("last_name"),
  dateOfBirth: text("date_of_birth"),
  gender: text("gender"),
  category: text("category"),
  highestQualification: text("highest_qualification"),
  state: text("state"),
  district: text("district"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const recruitments = sqliteTable("recruitments", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  shortTitle: text("short_title"),
  organisation: text("organisation").notNull(),
  department: text("department"),
  recruitmentCategory: text("recruitment_category"),
  advertisementNumber: text("advertisement_number"),
  description: text("description"),
  numberOfPosts: integer("number_of_posts"),
  vacancyDetails: text("vacancy_details"),
  state: text("state"),
  district: text("district"),
  location: text("location"),
  jobType: text("job_type"),
  employmentType: text("employment_type"),

  // Qualifications & Eligibility
  minimumQualification: text("minimum_qualification"),
  preferredQualification: text("preferred_qualification"),
  subjectRequirements: text("subject_requirements"),
  experienceRequired: text("experience_required"),
  certificationsRequired: text("certifications_required"),
  specialRequirements: text("special_requirements"),

  // Age Criteria
  minimumAge: integer("minimum_age"),
  maximumAge: integer("maximum_age"),
  ageAsOnDate: text("age_as_on_date"),
  ageRelaxation: text("age_relaxation"),
  categorySpecificAgeRules: text("category_specific_age_rules"),

  // Salary
  payLevel: text("pay_level"),
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  salaryDescription: text("salary_description"),
  allowances: text("allowances"),

  // Application
  applicationStartDate: text("application_start_date"),
  applicationLastDate: text("application_last_date"),
  applicationMode: text("application_mode"),
  applicationFee: text("application_fee"),
  feeDetails: text("fee_details"),
  paymentMethod: text("payment_method"),

  // Selection Process
  selectionProcess: text("selection_process"),
  writtenExam: integer("written_exam").default(0),
  skillTest: integer("skill_test").default(0),
  interview: integer("interview").default(0),
  physicalTest: integer("physical_test").default(0),
  documentVerification: integer("document_verification").default(1),

  // Source of Truth
  officialOrganisation: text("official_organisation"),
  officialNotificationUrl: text("official_notification_url"),
  officialApplicationUrl: text("official_application_url"),
  officialSourceUrl: text("official_source_url"),
  sourceTitle: text("source_title"),
  sourcePublishedDate: text("source_published_date"),
  sourceLastChecked: text("source_last_checked"),
  lastVerifiedAt: text("last_verified_at"),

  // Status
  status: text("status").default("draft"),

  // SEO Metadata
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  canonicalUrl: text("canonical_url"),
  keywords: text("keywords"),

  // Timestamps
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
  publishedAt: text("published_at"),
  expiresAt: text("expires_at"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Recruitment = typeof recruitments.$inferSelect;
export type NewRecruitment = typeof recruitments.$inferInsert;