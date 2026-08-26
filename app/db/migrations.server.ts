import { createClient } from "@libsql/client";

const migrations = [
  {
    id: "003_upsc_advertisement_52_2026",
    sql: `INSERT OR IGNORE INTO recruitments (
  id, slug, title, short_title, organisation, department, recruitment_category,
  advertisement_number, description, number_of_posts, state, location, job_type,
  employment_type, minimum_qualification, experience_required, minimum_age,
  maximum_age, age_as_on_date, age_relaxation, pay_level, salary_description,
  application_start_date, application_last_date, application_mode, application_fee,
  fee_details, selection_process, written_exam, interview, document_verification,
  official_organisation, official_notification_url, official_application_url,
  official_source_url, source_title, source_published_date, source_last_checked,
  last_verified_at, status, meta_title, meta_description, keywords, published_at
) VALUES (
  'upsc-advt-52-2026-apfc',
  'upsc-epfo-apfc-recruitment-2026-advt-52',
  'UPSC EPFO Assistant Provident Fund Commissioner Recruitment 2026 – Advertisement No. 52/2026',
  'UPSC EPFO APFC Recruitment 2026',
  'Union Public Service Commission (UPSC)',
  'Employees’ Provident Fund Organisation (EPFO), Ministry of Labour & Employment',
  'Central Government',
  '52/2026 (Special)',
  'UPSC invites online applications for direct recruitment to 80 Assistant Provident Fund Commissioner posts in the Employees’ Provident Fund Organisation under the Ministry of Labour & Employment. Candidates should read the official Special Advertisement No. 52/2026 and instructions before applying.',
  80,
  'All India',
  'India',
  'Central Government',
  'Permanent / Central Government',
  'Bachelor’s Degree from a recognised university or equivalent qualification.',
  'No mandatory experience stated for the basic eligibility; diploma in Company Law, Labour Laws or Public Administration is desirable.',
  21,
  35,
  '2026-09-11',
  'Age relaxation applies as per Government of India rules and the official notification.',
  'Level-10',
  'Pay Matrix Level-10 as per the 7th Central Pay Commission.',
  '2026-08-22',
  '2026-09-11',
  'Online',
  '₹25',
  'General/OBC/EWS candidates: ₹25. SC/ST/PwBD and women candidates are exempt as specified in the official notice.',
  'Recruitment Test followed by Interview, as prescribed by UPSC.',
  1,
  1,
  1,
  'Union Public Service Commission (UPSC)',
  'https://www.upsc.gov.in/recruitment/recruitment-advertisement',
  'https://upsconline.nic.in/ora/',
  'https://www.upsc.gov.in/recruitment/recruitment-advertisement',
  'UPSC Special Advertisement No. 52/2026 – Direct Recruitment for Assistant Provident Fund Commissioner',
  '2026-08-21',
  '2026-08-26',
  '2026-08-26',
  'published',
  'UPSC EPFO APFC Recruitment 2026 | 80 Posts | Advt No. 52/2026',
  'UPSC EPFO APFC Recruitment 2026: 80 Assistant Provident Fund Commissioner vacancies, graduate eligibility, Level-10 pay and online applications from 22 August to 11 September 2026.',
  'UPSC EPFO recruitment 2026, APFC recruitment, Assistant Provident Fund Commissioner, Advertisement 52/2026, UPSC jobs, government jobs 2026, EPFO jobs',
  CURRENT_TIMESTAMP
);`,
  },
] as const;

export async function runMigrations() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.DATABASE_AUTH_TOKEN;

  if (!url) throw new Error("DATABASE_URL is not configured.");

  const client = createClient({ url, ...(authToken ? { authToken } : {}) });

  await client.execute(`
    CREATE TABLE IF NOT EXISTS _app_migrations (
      id TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  for (const migration of migrations) {
    const applied = await client.execute({
      sql: "SELECT id FROM _app_migrations WHERE id = ? LIMIT 1",
      args: [migration.id],
    });

    if (applied.rows.length > 0) continue;

    // Migration SQL must be idempotent. This allows safe retries if a
    // serverless invocation is interrupted after the SQL succeeds.
    await client.execute(migration.sql);
    await client.execute({
      sql: "INSERT OR IGNORE INTO _app_migrations (id) VALUES (?)",
      args: [migration.id],
    });
  }
}
