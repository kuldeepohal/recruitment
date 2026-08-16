import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData, Link } from "react-router";
import { createDb } from "~/db/index.server";
import { getLatestRecruitments } from "~/models/recruitment.server";

// 1. SERVER-SIDE LOADER: Runs securely on Cloudflare Edge
export const loader = async ({ context }: LoaderFunctionArgs) => {
  const db = (context as any).cloudflare?.env?.DB;

  if (!db) {
    return { latestJobs: [] };
  }

  const latestJobs = await getLatestRecruitments(createDb(db as D1Database));
  return { latestJobs };
};

// 2. CLIENT UI: Renders the Homepage
export default function Index() {
  const { latestJobs } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header Area */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 md:px-8">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">GovJob Central</h1>
          <nav className="space-x-4 text-sm font-medium">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Latest Jobs</Link>
            <Link to="/" className="text-gray-700 hover:text-blue-600">Maharashtra</Link>
            <Link to="/" className="text-blue-600 border border-blue-600 px-3 py-1.5 rounded hover:bg-blue-50">
              Premium
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 md:px-8">
        <h2 className="text-xl font-bold mb-6 border-b pb-2">Latest Recruitments</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latestJobs.map((job) => (
            <article 
              key={job.id} 
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Card Header (Rule 61) */}
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">
                  NEW
                </span>
                <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">
                  {job.state}
                </span>
              </div>
              
              <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mt-3">
                {job.organisation}
              </h3>
              <h4 className="text-lg font-semibold text-gray-900 leading-snug mt-1 mb-4">
                {job.title}
              </h4>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-y-3 text-sm mb-5">
                <div>
                  <span className="block text-gray-500 text-xs">Vacancies</span>
                  <span className="font-medium">{job.numberOfPosts || "Not Specified"}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-xs">Qualification</span>
                  <span className="font-medium truncate block pr-2" title={job.minimumQualification || ""}>
                    {job.minimumQualification || "See Notification"}
                  </span>
                </div>
                <div>
                  <span className="block text-gray-500 text-xs">Age Limit</span>
                  <span className="font-medium">
                    {job.minimumAge}-{job.maximumAge} Yrs
                  </span>
                </div>
                <div>
                  <span className="block text-gray-500 text-xs">Last Date</span>
                  <span className="font-medium text-red-600">
                    {job.applicationLastDate ? new Date(job.applicationLastDate).toLocaleDateString('en-IN') : "TBA"}
                  </span>
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button className="text-gray-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1">
                  ♡ Save
                </button>
                <Link 
                  to={`/recruitment/${job.slug}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
