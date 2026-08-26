import type { MetaFunction } from "react-router";
import { useLoaderData, Link } from "react-router";
import { createDb } from "~/db/index.server";
import { getLatestRecruitments } from "~/models/recruitment.server";

export const meta: MetaFunction = () => [
  { title: "Latest Government Jobs & Recruitment 2026 | GovJob Central" },
  { name: "description", content: "Find the latest government jobs and recruitment notifications in India, including vacancies, eligibility, important dates, official notifications and application links." },
];

export const loader = async () => {
  const db = await createDb();
  const latestJobs = await getLatestRecruitments(db, 24);
  return { latestJobs };
};

export default function Index() {
  const { latestJobs } = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 px-4 py-4 md:px-8"><div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-between items-center"><Link to="/" className="text-2xl font-bold text-blue-700">GovJob Central</Link><nav className="flex gap-4 text-sm font-medium"><Link to="/jobs" className="text-gray-700 hover:text-blue-600">All Jobs</Link><Link to="/jobs?state=Maharashtra" className="text-gray-700 hover:text-blue-600">Maharashtra</Link><Link to="/jobs?qualification=10th" className="text-gray-700 hover:text-blue-600">10th Pass</Link><Link to="/jobs?qualification=Graduate" className="text-gray-700 hover:text-blue-600">Graduate Jobs</Link></nav></div></header>
      <main className="max-w-6xl mx-auto px-4 py-8 md:px-8"><section className="mb-8"><p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Government Recruitment Updates</p><h1 className="text-3xl md:text-4xl font-bold mt-2 mb-3">Latest Government Jobs in India</h1><p className="text-gray-600 max-w-3xl leading-7">Explore current recruitment notifications with vacancies, eligibility, age limits, important dates and links to official sources.</p></section><div className="flex items-center justify-between mb-5"><h2 className="text-xl font-bold">Latest Recruitments</h2><Link to="/jobs" className="text-sm font-semibold text-blue-600 hover:underline">View all jobs →</Link></div>{latestJobs.length === 0 ? <div className="bg-white border border-gray-200 rounded-lg p-10 text-center text-gray-500">Recruitment updates are being prepared. Please check again soon.</div> : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">{latestJobs.map((job) => <article key={job.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"><div className="flex justify-between items-start gap-3 mb-3"><span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">LATEST</span>{job.state && <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{job.state}</span>}</div><p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{job.organisation}</p><h2 className="text-lg font-semibold text-gray-900 leading-snug mt-1 mb-4">{job.title}</h2><div className="grid grid-cols-2 gap-3 text-sm mb-5"><div><span className="block text-gray-500 text-xs">Vacancies</span><span className="font-medium">{job.numberOfPosts ?? "See notice"}</span></div><div><span className="block text-gray-500 text-xs">Qualification</span><span className="font-medium truncate block" title={job.minimumQualification || ""}>{job.minimumQualification || "See notice"}</span></div><div><span className="block text-gray-500 text-xs">Age</span><span className="font-medium">{job.minimumAge ?? "-"}-{job.maximumAge ?? "-"} yrs</span></div><div><span className="block text-gray-500 text-xs">Last Date</span><span className="font-medium text-red-600">{job.applicationLastDate ? new Date(job.applicationLastDate).toLocaleDateString("en-IN") : "TBA"}</span></div></div><Link to={`/recruitment/${job.slug}`} className="block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg">View Details</Link></article>)}</div>}</main>
    </div>
  );
}
