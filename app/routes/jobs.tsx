import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData, Link, Form } from "react-router";
import { createDb } from "~/db/index.server";
import { getRecruitmentsList } from "~/models/recruitment.server";

export const meta: MetaFunction = () => [
  { title: "Government Jobs 2026 - Latest Recruitment Notifications | GovJob Central" },
  {
    name: "description",
    content: "Search the latest government jobs and recruitment notifications in India by keyword, state and qualification.",
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const state = url.searchParams.get("state") || undefined;
  const qualification = url.searchParams.get("qualification") || undefined;
  const search = url.searchParams.get("search") || undefined;
  const jobs = await getRecruitmentsList(createDb(), { state, qualification, search });
  return { jobs, filters: { state, qualification, search } };
};

export default function JobsListing() {
  const { jobs, filters } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-700">GovJob Central</Link>
          <Link to="/" className="text-sm text-gray-600 hover:text-blue-600">Home</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-4 py-8 md:px-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm md:sticky md:top-4">
            <h2 className="font-bold text-lg mb-4">Find Jobs</h2>
            <Form method="get" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Keyword</label>
                <input name="search" defaultValue={filters.search} placeholder="Police, Clerk, SSC..." className="w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <select name="state" defaultValue={filters.state || ""} className="w-full border rounded px-3 py-2 text-sm bg-white">
                  <option value="">All India</option>
                  <option>Maharashtra</option><option>Delhi</option><option>Uttar Pradesh</option><option>Bihar</option><option>Karnataka</option><option>Rajasthan</option><option>Madhya Pradesh</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Qualification</label>
                <select name="qualification" defaultValue={filters.qualification || ""} className="w-full border rounded px-3 py-2 text-sm bg-white">
                  <option value="">Any Qualification</option><option value="10th">10th Pass</option><option value="12th">12th Pass</option><option value="Graduate">Graduate</option><option value="ITI">ITI / Diploma</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">Search Jobs</button>
              {(filters.state || filters.qualification || filters.search) && <Link to="/jobs" className="block text-center text-sm text-red-600">Clear filters</Link>}
            </Form>
          </div>
        </aside>

        <section className="flex-grow">
          <div className="mb-5">
            <h1 className="text-2xl md:text-3xl font-bold">{filters.search ? `Government Jobs for “${filters.search}”` : "Latest Government Jobs"}</h1>
            <p className="text-gray-600 mt-2">{jobs.length} matching recruitment{jobs.length === 1 ? "" : "s"}. Check the official notification before applying.</p>
          </div>

          {jobs.length === 0 ? (
            <div className="bg-white border rounded-lg p-12 text-center text-gray-500">No recruitments found. Try a broader search.</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <article key={job.id} className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between gap-3 mb-2"><span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">OPEN UPDATE</span>{job.state && <span className="text-xs bg-gray-100 px-2 py-1 rounded">{job.state}</span>}</div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{job.organisation}</p>
                  <h2 className="text-lg font-semibold mt-1 mb-4">{job.title}</h2>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-5">
                    <div><span className="block text-gray-500 text-xs">Vacancies</span><b>{job.numberOfPosts ?? "See notice"}</b></div>
                    <div><span className="block text-gray-500 text-xs">Qualification</span><b>{job.minimumQualification || "See notice"}</b></div>
                    <div><span className="block text-gray-500 text-xs">Age</span><b>{job.minimumAge ?? "-"}-{job.maximumAge ?? "-"} yrs</b></div>
                    <div><span className="block text-gray-500 text-xs">Last Date</span><b className="text-red-600">{job.applicationLastDate ? new Date(job.applicationLastDate).toLocaleDateString("en-IN") : "TBA"}</b></div>
                  </div>
                  <Link to={`/recruitment/${job.slug}`} className="block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg">View Recruitment Details</Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
