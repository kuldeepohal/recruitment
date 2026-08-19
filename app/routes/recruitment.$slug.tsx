import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData, Link } from "react-router";
import { createDb } from "~/db/index.server";
import { getRecruitmentBySlug } from "~/models/recruitment.server";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.job) return [{ title: "Recruitment Not Found | GovJob Central" }, { name: "robots", content: "noindex" }];
  const description = data.job.metaDescription || `Eligibility, vacancies, important dates and official application links for ${data.job.title} at ${data.job.organisation}.`;
  return [
    { title: data.job.metaTitle || `${data.job.title} | GovJob Central` },
    { name: "description", content: description.slice(0, 160) },
    { name: "keywords", content: data.job.keywords || `${data.job.title}, government jobs, recruitment, vacancies, ${data.job.organisation}` },
    { property: "og:title", content: data.job.metaTitle || data.job.title },
    { property: "og:description", content: description.slice(0, 160) },
    { property: "og:type", content: "article" },
    ...(data.job.canonicalUrl ? [{ tagName: "link", rel: "canonical", href: data.job.canonicalUrl }] : []),
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.slug) throw new Response("Not Found", { status: 404 });
  const job = await getRecruitmentBySlug(createDb(), params.slug);
  if (!job || job.status !== "published") throw new Response("Recruitment Not Found", { status: 404 });
  return { job };
};

export default function RecruitmentDetail() {
  const { job } = useLoaderData<typeof loader>();
  const formatDate = (value: string | null | undefined) => value ? new Date(value).toLocaleDateString("en-IN") : "TBA";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description || `Government recruitment opportunity from ${job.organisation}.`,
    datePosted: job.publishedAt || job.createdAt || undefined,
    validThrough: job.applicationLastDate || undefined,
    hiringOrganization: { "@type": "Organization", name: job.organisation },
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressRegion: job.state || "India", addressCountry: "IN" } },
    employmentType: job.employmentType || "FULL_TIME",
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="bg-white border-b px-4 py-4 md:px-8"><div className="max-w-4xl mx-auto flex justify-between items-center"><Link to="/" className="text-xl font-bold text-blue-700">GovJob Central</Link><Link to="/jobs" className="text-sm text-gray-600 hover:text-blue-600">← Browse Jobs</Link></div></header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-sm font-semibold text-blue-600 uppercase">{job.organisation}</p>
        <h1 className="text-3xl font-bold mt-2 mb-3 leading-tight">{job.title}</h1>
        <div className="flex flex-wrap gap-2 mb-6">{job.state && <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">{job.state}</span>}<span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Published Update</span></div>

        <div className="bg-white border rounded-lg p-6 shadow-sm mb-6 grid grid-cols-2 md:grid-cols-4 gap-5">
          <div><p className="text-xs text-gray-500">Vacancies</p><p className="font-bold text-lg">{job.numberOfPosts ?? "N/A"}</p></div>
          <div><p className="text-xs text-gray-500">Qualification</p><p className="font-bold">{job.minimumQualification || "See notice"}</p></div>
          <div><p className="text-xs text-gray-500">Age Limit</p><p className="font-bold">{job.minimumAge ?? "-"} - {job.maximumAge ?? "-"}</p></div>
          <div><p className="text-xs text-gray-500">Last Date</p><p className="font-bold text-red-600">{formatDate(job.applicationLastDate)}</p></div>
        </div>

        {job.description && <section className="bg-white border rounded-lg p-6 shadow-sm mb-6"><h2 className="text-xl font-bold mb-4">About This Recruitment</h2><p className="text-gray-700 whitespace-pre-line leading-7">{job.description}</p></section>}
        <section className="bg-white border rounded-lg p-6 shadow-sm mb-6"><h2 className="text-xl font-bold mb-4">Eligibility & Application Details</h2><div className="space-y-3 text-gray-700"><p><strong>Minimum Qualification:</strong> {job.minimumQualification || "See official notification"}</p><p><strong>Age:</strong> {job.minimumAge ?? "-"} to {job.maximumAge ?? "-"} years.</p>{job.experienceRequired && <p><strong>Experience:</strong> {job.experienceRequired}</p>}{job.ageRelaxation && <p><strong>Age Relaxation:</strong> {job.ageRelaxation}</p>}{job.applicationStartDate && <p><strong>Application Start:</strong> {formatDate(job.applicationStartDate)}</p>}{job.applicationFee && <p><strong>Application Fee:</strong> {job.applicationFee}</p>}{job.selectionProcess && <p><strong>Selection Process:</strong> {job.selectionProcess}</p>}</div></section>

        <section className="bg-white border rounded-lg p-5 mb-6"><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Helpful resources</p><p className="text-gray-700">Use this page to review eligibility and important dates. If you use an external product or service link that is marked as sponsored or affiliate, it may support this website at no extra cost to you.</p></section>

        <section className="bg-blue-50 border border-blue-100 rounded-lg p-6"><h2 className="font-bold text-blue-900 mb-2">Official Information</h2><p className="text-sm text-blue-800 mb-4">Always verify eligibility, fees, dates and application instructions in the official notification before applying.</p><div className="flex flex-col sm:flex-row gap-3">{job.officialNotificationUrl && <a href={job.officialNotificationUrl} target="_blank" rel="noopener noreferrer" className="bg-white border px-4 py-2 rounded font-semibold text-center">Official Notification</a>}{job.officialApplicationUrl && <a href={job.officialApplicationUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold text-center">Official Apply Link</a>}</div></section>
      </main>
    </div>
  );
}
