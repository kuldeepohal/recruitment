import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData, Link } from "react-router";
import { createDb } from "~/db/index.server";
import { getRecruitmentBySlug } from "~/models/recruitment.server";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.job) return [{ title: "Recruitment Not Found | GovJob Central" }, { name: "robots", content: "noindex" }];
  const description = data.job.metaDescription || `Check eligibility, vacancies, important dates and official application links for ${data.job.title} at ${data.job.organisation}.`;
  return [
    { title: data.job.metaTitle || `${data.job.title} | GovJob Central` },
    { name: "description", content: description.slice(0, 160) },
    { property: "og:title", content: data.job.metaTitle || data.job.title },
    { property: "og:description", content: description.slice(0, 160) },
    { property: "og:type", content: "article" },
    ...(data.job.canonicalUrl ? [{ tagName: "link", rel: "canonical", href: data.job.canonicalUrl }] : []),
  ];
};

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  if (!params.slug) throw new Response("Not Found", { status: 404 });
  const env = (context as any).cloudflare?.env;
  if (!env?.DB) throw new Response("Database is not configured", { status: 503 });
  const job = await getRecruitmentBySlug(createDb(env.DB as D1Database), params.slug);
  if (!job || job.status !== "published") throw new Response("Recruitment Not Found", { status: 404 });
  return { job };
};

export default function RecruitmentDetail() {
  const { job } = useLoaderData<typeof loader>();
  const formatDate = (value: string | null | undefined) => value ? new Date(value).toLocaleDateString("en-IN") : "TBA";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      <header className="bg-white border-b border-gray-200 px-4 py-4 md:px-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-700">GovJob Central</Link>
          <Link to="/jobs" className="text-sm font-medium text-gray-500 hover:text-blue-600">← Browse Jobs</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase">{job.organisation}</span>
          <h1 className="text-3xl font-bold mt-2 mb-3 text-gray-900 leading-tight">{job.title}</h1>
          <div className="flex flex-wrap gap-2 text-sm">
            {job.state && <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full">{job.state}</span>}
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">PUBLISHED</span>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div><p className="text-xs text-gray-500 mb-1">Total Vacancies</p><p className="font-bold text-lg">{job.numberOfPosts ?? "N/A"}</p></div>
          <div><p className="text-xs text-gray-500 mb-1">Qualification</p><p className="font-bold text-lg">{job.minimumQualification || "See Notification"}</p></div>
          <div><p className="text-xs text-gray-500 mb-1">Age Limit</p><p className="font-bold text-lg">{job.minimumAge ?? "-"} - {job.maximumAge ?? "-"} Yrs</p></div>
          <div><p className="text-xs text-gray-500 mb-1">Last Date</p><p className="font-bold text-lg text-red-600">{formatDate(job.applicationLastDate)}</p></div>
        </div>
        {job.description && <section className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6 p-6"><h2 className="text-xl font-bold mb-4 border-l-4 border-blue-600 pl-3">About This Recruitment</h2><p className="text-gray-700 whitespace-pre-line leading-7">{job.description}</p></section>}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8 p-6">
          <h2 className="text-xl font-bold mb-4 border-l-4 border-blue-600 pl-3">Eligibility Details</h2>
          <div className="space-y-3 text-gray-700">
            <p><strong>Minimum Qualification:</strong> {job.minimumQualification || "Not specified in the official notification."}</p>
            <p><strong>Age Limit:</strong> {job.minimumAge ?? "-"} to {job.maximumAge ?? "-"} years.</p>
            {job.experienceRequired && <p><strong>Experience:</strong> {job.experienceRequired}</p>}
            {job.ageRelaxation && <p><strong>Age Relaxation:</strong> {job.ageRelaxation}</p>}
            {job.applicationFee && <p><strong>Application Fee:</strong> {job.applicationFee}</p>}
            {job.selectionProcess && <p><strong>Selection Process:</strong> {job.selectionProcess}</p>}
          </div>
        </section>
        <section className="bg-blue-50 border border-blue-100 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <div><h2 className="font-bold text-blue-900 mb-1">Official Links</h2><p className="text-sm text-blue-700">Verify all eligibility details in the official notification before applying.</p></div>
          <div className="flex flex-col sm:flex-row gap-3">
            {job.officialNotificationUrl && <a href={job.officialNotificationUrl} target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded shadow-sm hover:bg-gray-50 text-center">Notification PDF</a>}
            {job.officialApplicationUrl && <a href={job.officialApplicationUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-sm text-center">Apply Officially</a>}
          </div>
        </section>
      </main>
    </div>
  );
}
