import { useEffect, useState } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData, Link } from "react-router";
import { createDb } from "~/db/index.server";
import { getLatestRecruitments } from "~/models/recruitment.server";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const db = (context as any).cloudflare?.env?.DB;
  if (!db) return { latestJobs: [] };
  const latestJobs = await getLatestRecruitments(createDb(db as D1Database));
  return { latestJobs };
};

export const meta: MetaFunction = () => [
  { title: "GovJob Central | नवीन सरकारी भरती आणि नोकरी अपडेट्स" },
  { name: "description", content: "महाराष्ट्रासह भारतातील सरकारी भरती जाहिराती, पात्रता, रिक्त पदे आणि अर्जाच्या अंतिम तारखा शोधा." },
];

const SAVED_KEY = "govjob-central:saved-jobs";

export default function Index() {
  const { latestJobs } = useLoaderData<typeof loader>();
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
      if (Array.isArray(stored)) setSavedIds(stored.filter((id): id is string => typeof id === "string"));
    } catch {
      localStorage.removeItem(SAVED_KEY);
    }
  }, []);

  function toggleSaved(id: string) {
    setSavedIds((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <Link to="/" className="text-xl font-extrabold tracking-tight text-blue-800">GovJob Central</Link>
          <nav aria-label="मुख्य नेव्हिगेशन" className="flex flex-wrap items-center gap-4 text-sm font-semibold">
            <Link to="/" className="text-blue-700">मुखपृष्ठ</Link>
            <Link to="/jobs" className="text-slate-700 hover:text-blue-700">सर्व भरती</Link>
            <Link to="/tifr-mumbai-bharti-2026" className="text-slate-700 hover:text-blue-700">TIFR मुंबई</Link>
            <a href="#latest" className="rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800">नवीन जाहिराती</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <section className="rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-800 px-6 py-12 text-white shadow-xl md:px-10 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-cyan-200">सरकारी नोकरी अपडेट्स</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">तुमच्या पुढील संधीची माहिती एका ठिकाणी.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100">महाराष्ट्रासह भारतातील भरती जाहिराती, पात्रता, रिक्त पदे आणि अर्जाच्या अंतिम तारखा सोप्या पद्धतीने शोधा.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/jobs" className="rounded-xl bg-white px-5 py-3 font-bold text-blue-900 hover:bg-blue-50">भरती शोधा</Link>
            <Link to="/tifr-mumbai-bharti-2026" className="rounded-xl border border-white/40 px-5 py-3 font-bold text-white hover:bg-white/10">TIFR भरती तपशील</Link>
          </div>
        </section>

        <section id="latest" className="py-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-blue-700">अपडेटेड भरती</p>
              <h2 className="mt-1 text-2xl font-extrabold">नवीन भरती जाहिराती</h2>
              <p className="mt-1 text-sm text-slate-600">अर्ज करण्यापूर्वी अधिकृत जाहिरात आणि पात्रता तपासा.</p>
            </div>
            <Link to="/jobs" className="font-semibold text-blue-700 hover:underline">सर्व भरती पहा →</Link>
          </div>

          {latestJobs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h3 className="font-bold">सध्या जाहिराती उपलब्ध नाहीत</h3>
              <p className="mt-2 text-sm text-slate-600">नवीन भरती प्रकाशित झाल्यावर येथे दिसतील. कृपया नंतर पुन्हा तपासा.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {latestJobs.map((job) => {
                const isSaved = savedIds.includes(String(job.id));
                return (
                  <article key={job.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">प्रकाशित भरती</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{job.state || "भारत"}</span>
                    </div>
                    <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-500">{job.organisation}</p>
                    <h3 className="mt-1 text-xl font-bold leading-snug">{job.title}</h3>
                    <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                      <div><dt className="text-slate-500">रिक्त पदे</dt><dd className="mt-1 font-semibold">{job.numberOfPosts || "जाहिरात पहा"}</dd></div>
                      <div><dt className="text-slate-500">शैक्षणिक पात्रता</dt><dd className="mt-1 font-semibold">{job.minimumQualification || "जाहिरात पहा"}</dd></div>
                      <div><dt className="text-slate-500">वयोमर्यादा</dt><dd className="mt-1 font-semibold">{job.minimumAge != null || job.maximumAge != null ? `${job.minimumAge ?? "—"}–${job.maximumAge ?? "—"} वर्षे` : "जाहिरात पहा"}</dd></div>
                      <div><dt className="text-slate-500">अंतिम तारीख</dt><dd className="mt-1 font-semibold text-rose-700">{job.applicationLastDate ? new Date(job.applicationLastDate).toLocaleDateString("mr-IN") : "जाहीर व्हायची आहे"}</dd></div>
                    </dl>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <button type="button" onClick={() => toggleSaved(String(job.id))} aria-pressed={isSaved} className="rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
                        {isSaved ? "♥ जतन केले" : "♡ जतन करा"}
                      </button>
                      <Link to={`/recruitment/${job.slug}`} className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800">तपशील पहा</Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
        <p className="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">सूचना: भरतीची माहिती मार्गदर्शनासाठी आहे. अर्ज करण्यापूर्वी संबंधित विभागाची अधिकृत जाहिरात, अटी व अंतिम तारीख पडताळून घ्या.</p>
      </main>
      <footer className="mt-10 border-t border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500">© {new Date().getFullYear()} GovJob Central · भरती माहिती आणि मार्गदर्शन</footer>
    </div>
  );
}
