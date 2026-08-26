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
  'upsc-advt-52-2026-apfc', 'upsc-epfo-apfc-recruitment-2026-advt-52',
  'UPSC EPFO Assistant Provident Fund Commissioner Recruitment 2026 – Advertisement No. 52/2026',
  'UPSC EPFO APFC Recruitment 2026', 'Union Public Service Commission (UPSC)',
  'Employees’ Provident Fund Organisation (EPFO), Ministry of Labour & Employment', 'Central Government', '52/2026 (Special)',
  'UPSC invites online applications for direct recruitment to 80 Assistant Provident Fund Commissioner posts in EPFO.', 80, 'All India', 'India', 'Central Government', 'Permanent / Central Government',
  'Bachelor’s Degree from a recognised university or equivalent qualification.',
  'No mandatory experience stated for the basic eligibility; relevant diploma may be desirable.', 21, 35, '2026-09-11',
  'Age relaxation applies as per Government of India rules and the official notification.', 'Level-10', 'Pay Matrix Level-10 as per the 7th Central Pay Commission.',
  '2026-08-22', '2026-09-11', 'Online', '₹25', 'Fee exemptions apply as specified in the official notice.',
  'Recruitment Test followed by Interview, as prescribed by UPSC.', 1, 1, 1,
  'Union Public Service Commission (UPSC)', 'https://www.upsc.gov.in/recruitment/recruitment-advertisement', 'https://upsconline.nic.in/ora/', 'https://www.upsc.gov.in/recruitment/recruitment-advertisement',
  'UPSC Special Advertisement No. 52/2026 – Direct Recruitment for Assistant Provident Fund Commissioner', '2026-08-21', '2026-08-26', '2026-08-26', 'published',
  'UPSC EPFO APFC Recruitment 2026 | 80 Posts | Advt No. 52/2026',
  'UPSC EPFO APFC Recruitment 2026: 80 Assistant Provident Fund Commissioner vacancies and official application information.',
  'UPSC EPFO recruitment 2026, APFC recruitment, Assistant Provident Fund Commissioner, Advertisement 52/2026, UPSC jobs, EPFO jobs', CURRENT_TIMESTAMP
);`,
  },
  {
    id: "004_mpsc_advt_02_2025_assistant_professor",
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
  'mpsc-manipur-advt-02-2025-assistant-professor',
  'mpsc-manipur-assistant-professor-recruitment-2025-advt-02-2025',
  'MPSC Manipur Assistant Professor Recruitment 2025 – Advertisement No. 02/2025',
  'MPSC Manipur Assistant Professor Recruitment 2025',
  'Manipur Public Service Commission (MPSC)',
  'Higher Education Department, Government of Manipur',
  'State Government',
  '02/2025',
  'Manipur Public Service Commission invited applications for direct recruitment to 419 Assistant Professor posts in Government Colleges under the Higher Education Department, Manipur. The recruitment covered multiple disciplines including Arts, Humanities, Education, Social Sciences, Sciences, Languages and Physical Education.',
  419,
  'Manipur',
  'Manipur, India',
  'State Government',
  'Permanent / State Government',
  'Master’s degree with at least 55% marks in the concerned/relevant/allied subject from an Indian University or equivalent degree from an accredited foreign university, with NET/SET/SLET or applicable UGC exemption as prescribed in the notification.',
  'As prescribed for Assistant Professor eligibility under the applicable UGC/Manipur rules; candidates must satisfy the subject-specific requirements in the official advertisement.',
  21,
  38,
  '2025-12-05',
  'Age relaxation applies to reserved categories and other eligible groups as prescribed by the Government of Manipur and the official notification.',
  'PB-3 / Academic Pay Level as prescribed',
  'Pay scale stated in the original advertisement as PB-3 ₹15,600–39,100 plus Academic Grade Pay ₹6,000 (pre-revised), with applicable revised pay rules.',
  '2025-12-15',
  '2026-01-23',
  'Online',
  '₹600 General/OBC; ₹400 SC/ST',
  'Application fee and exemptions are subject to the official advertisement and subsequent notices.',
  'Shortlisting based on academic score followed by Interview / Personality Test as prescribed by the notification and subsequent modifications.',
  0,
  1,
  1,
  'Manipur Public Service Commission (MPSC)',
  'https://mpscmanipur.gov.in/Recruitment_Advertisement.html',
  'https://empsconline.gov.in/Notice.aspx',
  'https://mpscmanipur.gov.in/Recruitment_Advertisement.html',
  'Advt. No. 02/2025 – Direct recruitment of 419 Assistant Professors under Higher Education Department, Manipur',
  '2025-12-05',
  '2026-08-26',
  '2026-08-26',
  'published',
  'MPSC Manipur Assistant Professor Recruitment 2025 | 419 Posts | Advt. No. 02/2025',
  'MPSC Manipur Assistant Professor Recruitment 2025: 419 vacancies in Government Colleges under Higher Education Department, eligibility, age limit, dates and official links.',
  'MPSC Manipur recruitment 2025, Assistant Professor recruitment, Advt 02/2025, Manipur PSC jobs, 419 Assistant Professor vacancies, Higher Education Department Manipur',
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

    await client.execute(migration.sql);
    await client.execute({
      sql: "INSERT OR IGNORE INTO _app_migrations (id) VALUES (?)",
      args: [migration.id],
    });
  }
}
