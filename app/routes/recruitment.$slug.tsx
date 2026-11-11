import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData, Link } from "react-router";
import { createDb } from "~/db/index.server";
import { getRecruitmentBySlug } from "~/models/recruitment.server";

// 1. DYNAMIC SEO METADATA (Rule 31)
export const meta: MetaFunction<typeof loader> = (args) => {
  const data = (args as any).data;
  if (!data?.job) {
    return [{ title: "भरती सापडली नाही | GovJob Central" }];
  }
  return [
    { title: `${data.job.title} | ${data.job.organisation}` },
    { name: "description", content: `${data.job.title} बद्दल अधिकृत अपडेट. ${data.job.numberOfPosts} पदे उपलब्ध आहेत. पात्रता तपासा आणि ऑनलाईन अर्ज करा.` },
  ];
};

// 2. SERVER LOADER
export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  if (!params.slug) throw new Response("Not Found", { status: 404 });
  
  const db = (context as any).cloudflare?.env?.DB;
  if (!db) {
    throw new Response("Recruitment Not Found", { status: 404 });
  }
  const database = createDb(db as D1Database);
  const job = await getRecruitmentBySlug(database, params.slug);
  
  if (!job) {
    throw new Response("Recruitment Not Found", { status: 404 });
  }
  
  // React Router v7 automatically handles raw objects (no need for json() helper)
  return { job };
};

// 3. PAGE UI (Rule 10 & Rule 11)
export default function RecruitmentDetail() {
  const { job } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 md:px-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-700">GovJob Central</Link>
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-blue-600">
            &larr; भरती यादीकडे परत
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Title Section */}
        <div className="mb-6">
          <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase">
            {job.organisation}
          </span>
          <h1 className="text-3xl font-bold mt-2 mb-3 text-gray-900 leading-tight">
            {job.title}
          </h1>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
              {job.state}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              {job.status?.toUpperCase() || "PUBLISHED"}
            </span>
          </div>
        </div>

        {/* Compact Summary Card (Rule 10) */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Total Vacancies</p>
            <p className="font-bold text-lg">{job.numberOfPosts || "N/A"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Qualification</p>
            <p className="font-bold text-lg">{job.minimumQualification || "See Detail"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Age Limit</p>
            <p className="font-bold text-lg">{job.minimumAge} - {job.maximumAge} Yrs</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Last Date</p>
            <p className="font-bold text-lg text-red-600">
              {job.applicationLastDate ? new Date(job.applicationLastDate).toLocaleDateString('en-IN') : "TBA"}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold mb-4 border-l-4 border-blue-600 pl-3">पात्रता तपशील</h2>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p><strong>किमान पात्रता:</strong> {job.minimumQualification || "अधिकृत सूचनेत नमूद नाही."}</p>
              <p><strong>वयोमर्यादा:</strong> उमेदवारांचे वय {job.minimumAge} ते {job.maximumAge} वर्षांदरम्यान असावे.</p>
            </div>
          </div>
        </div>

        {/* Source of Truth / Apply Section (Rule 11 & Rule 44) */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-blue-900 mb-1">महत्त्वाच्या लिंक्स</h3>
            <p className="text-sm text-blue-700">
              अर्ज करण्यापूर्वी पात्रता अधिकृत सूचनेतून नक्की तपासा.
            </p>
          </div>
          <div className="flex flex-col gap-3 min-w-[200px]">
            <button className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded shadow-sm hover:bg-gray-50 text-center w-full">
              अधिकृत PDF जाहिरात
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-sm transition-colors text-center w-full">
              अधिकृत वेबसाइटवर अर्ज करा
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
