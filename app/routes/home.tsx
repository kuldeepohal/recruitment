import type { MetaFunction } from "react-router";
import { useLoaderData, Link } from "react-router";
import { createDb } from "~/db/index.server";
import { getLatestRecruitments } from "~/models/recruitment.server";
import { getRecruitmentApplicationStatus } from "~/lib/recruitment-status";

export const meta: MetaFunction = () => [
  { title: "Latest Government Jobs & Recruitment 2026 | MyJob Recruitment" },
  { name: "description", content: "Find current, upcoming and closed government recruitment notifications plus practical career and exam guidance for freshers." },
];

export const loader = async () => { const db = await createDb(); const latestJobs = await getLatestRecruitments(db, 24); return { latestJobs }; };

export default function Index() {
  const { latestJobs } = useLoaderData<typeof loader>();
  return <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
    <header className="bg-white border-b border-gray-200 px-4 py-4 md:px-8"><div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-between items-center"><Link to="/" className="text-2xl font-bold text-blue-700">MyJob Recruitment</Link><nav className="flex gap-4 text-sm font-medium"><Link to="/jobs">All Jobs</Link><Link to="/jobs?state=Maharashtra">Maharashtra</Link><Link to="/jobs?qualification=10th">10th Pass</Link><Link to="/jobs?qualification=Graduate">Graduate Jobs</Link><Link to="/articles">Career Guides</Link></nav></div></header>
    <main className="max-w-6xl mx-auto px-4 py-8 md:px-8"><section className="mb-8"><p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">MyJob Recruitment</p><h1 className="text-3xl md:text-4xl font-bold mt-2 mb-3">Government Jobs, Recruitment & Career Guidance</h1><p className="text-gray-600 max-w-3xl leading-7">Explore current, upcoming and closed recruitment notifications with eligibility, dates and official links—and learn how to prepare for exams and build qualifications for future opportunities.</p></section>
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"><Link to="/jobs?status=open" className="bg-white border rounded-xl p-5"><b>Open Jobs</b><p className="text-sm text-gray-600 mt-1">Applications currently accepting forms.</p></Link><Link to="/jobs?status=upcoming" className="bg-white border rounded-xl p-5"><b>Upcoming Jobs</b><p className="text-sm text-gray-600 mt-1">Recruitments whose application dates have not started.</p></Link><Link to="/jobs?status=closed" className="bg-white border rounded-xl p-5"><b>Closed Jobs</b><p className="text-sm text-gray-600 mt-1">Past notifications kept for reference and preparation.</p></Link></section>
      <div className="flex items-center justify-between mb-5"><h2 className="text-xl font-bold">Latest Recruitments</h2><Link to="/jobs" className="text-sm font-semibold text-blue-600">View all jobs →</Link></div>
      {latestJobs.length === 0 ? <div className="bg-white border rounded-lg p-10 text-center text-gray-500">Recruitment updates are being prepared.</div> : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">{latestJobs.map((job) => { const status = getRecruitmentApplicationStatus(job.applicationStartDate, job.applicationLastDate); return <article key={job.id} className="bg-white border rounded-xl p-5 shadow-sm"><div className="flex justify-between items-start gap-3 mb-3"><span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100">{status.toUpperCase()}</span>{job.state && <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{job.state}</span>}</div><p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{job.organisation}</p><h2 className="text-lg font-semibold leading-snug mt-1 mb-4">{job.title}</h2><div className="grid grid-cols-2 gap-3 text-sm mb-5"><div><span className="block text-gray-500 text-xs">Vacancies</span><span className="font-medium">{job.numberOfPosts ?? "See notice"}</span></div><div><span className="block text-gray-500 text-xs">Age</span><span className="font-medium">{job.minimumAge ?? "-"}-{job.maximumAge ?? "-"} yrs</span></div><div className="col-span-2"><span className="block text-gray-500 text-xs">Application period</span><span className="font-medium">{job.applicationStartDate ? new Date(job.applicationStartDate).toLocaleDateString("en-IN") : "TBA"} – {job.applicationLastDate ? new Date(job.applicationLastDate).toLocaleDateString("en-IN") : "TBA"}</span></div></div><Link to={`/recruitment/${job.slug}`} className="block text-center bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg">View Details</Link></article>; })}</div>}
    </main>
  </div>;
}
