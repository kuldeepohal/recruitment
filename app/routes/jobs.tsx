import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData, Link, Form, useSearchParams } from "react-router";
import { createDb } from "~/db/index.server";
import { getRecruitmentsList } from "~/models/recruitment.server";

// 1. SEO Metadata (Rule 31)
export const meta: MetaFunction = () => {
  return [
    { title: "भरती शोधा | GovJob Central" },
    { name: "description", content: "राज्य, पात्रता आणि संस्थेनुसार ताज्या सरकारी भरती शोधा आणि फिल्टर करा." },
  ];
};

// 2. Server Loader with Cloudflare Env Fallback
export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const state = url.searchParams.get("state") || undefined;
  const qualification = url.searchParams.get("qualification") || undefined;
  const search = url.searchParams.get("search") || undefined;

  // Safely extract the Cloudflare environment
  const env = (context as any).cloudflare?.env || (globalThis as any).env;
  if (!env?.DB) {
    return { jobs: [], filters: { state, qualification, search } };
  }
  const db = createDb(env.DB as D1Database);
  
  const jobs = await getRecruitmentsList(db, { state, qualification, search });
  
  return { jobs, filters: { state, qualification, search } };
};

// 3. Page UI (Rule 18 & 19)
export default function JobsListing() {
  const { jobs, filters } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-700">GovJob Central</Link>
          <nav className="space-x-4 text-sm font-medium">
            <Link to="/" className="text-gray-700 hover:text-blue-600">मुखपृष्ठ</Link>
            <Link to="/jobs" className="text-blue-600 hover:text-blue-800">भरती शोधा</Link>
          </nav>
        </div>
      </header>

      {/* Main Layout: Sidebar + Grid */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 md:px-8 flex flex-col md:flex-row gap-8">
        
        {/* FILTERS SIDEBAR */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm sticky top-4">
            <h2 className="font-bold text-lg mb-4 border-b pb-2">भरती फिल्टर करा</h2>
            
            {/* Form automatically updates URL search params on submit */}
            <Form method="get" className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">शोधा</label>
                <input 
                  type="text" 
                  name="search" 
                  defaultValue={filters.search}
                  placeholder="e.g. Police, Clerk..." 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">राज्य</label>
                <select 
                  name="state" 
                  defaultValue={filters.state || ""}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-blue-500 outline-none"
                >
                  <option value="">संपूर्ण भारत</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">पात्रता</label>
                <select 
                  name="qualification" 
                  defaultValue={filters.qualification || ""}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-blue-500 outline-none"
                >
                  <option value="">कोणतीही पात्रता</option>
                  <option value="10th">१० वी पास</option>
                  <option value="12th">१२ वी पास</option>
                  <option value="Graduate">पदवीधर</option>
                  <option value="ITI">ITI / डिप्लोमा</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded text-sm transition-colors"
              >
                फिल्टर लागू करा
              </button>

              {/* Clear Filters Button */}
              {(filters.state || filters.qualification || filters.search) && (
                <Link 
                  to="/jobs" 
                  className="block text-center text-sm text-red-600 hover:underline mt-2"
                >
                  सर्व साफ करा
                </Link>
              )}
            </Form>
          </div>
        </aside>

        {/* RESULTS GRID */}
        <div className="flex-grow">
          <div className="mb-4 flex justify-between items-end">
            <h1 className="text-2xl font-bold text-gray-900">
              {filters.search ? `"${filters.search}" साठी परिणाम` : "सर्व भरती"}
            </h1>
            <span className="text-sm text-gray-500">{jobs.length} भरती सापडल्या</span>
          </div>

          {jobs.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
              <p className="text-gray-500 text-lg">तुमच्या फिल्टरनुसार कोणतीही भरती सापडली नाही.</p>
              <Link to="/jobs" className="text-blue-600 hover:underline mt-2 inline-block">फिल्टर साफ करा</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <article key={job.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">NEW</span>
                      <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">{job.state}</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mt-3">{job.organisation}</h3>
                    <h4 className="text-lg font-semibold text-gray-900 leading-snug mt-1 mb-4">{job.title}</h4>
                    
                    <div className="grid grid-cols-2 gap-y-3 text-sm mb-5">
                      <div>
                        <span className="block text-gray-500 text-xs">Vacancies</span>
                        <span className="font-medium">{job.numberOfPosts || "N/A"}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500 text-xs">Qualification</span>
                        <span className="font-medium truncate block pr-2" title={job.minimumQualification || ""}>
                          {job.minimumQualification || "See Details"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                    <button className="text-gray-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1">♡ Save</button>
                    <Link to={`/recruitment/${job.slug}`} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors">
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
