import { useEffect, useState } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData, Link, Form } from "react-router";
import { createDb } from "~/db/index.server";
import { getRecruitmentsList } from "~/models/recruitment.server";

export const meta: MetaFunction = () => [
  { title: "सरकारी भरती शोधा | GovJob Central" },
  { name: "description", content: "राज्य, शैक्षणिक पात्रता आणि पदानुसार सरकारी भरती जाहिराती शोधा. रिक्त पदे आणि अर्जाच्या अंतिम तारखा तपासा." },
];

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const state = url.searchParams.get("state") || undefined;
  const qualification = url.searchParams.get("qualification") || undefined;
  const search = url.searchParams.get("search") || undefined;
  const env = (context as any).cloudflare?.env || (globalThis as any).env;
  if (!env?.DB) return { jobs: [], filters: { state, qualification, search } };
  const db = createDb(env.DB as D1Database);
  const jobs = await getRecruitmentsList(db, { state, qualification, search });
  return { jobs, filters: { state, qualification, search } };
};

const SAVED_KEY = "govjob-central:saved-jobs";

export default function JobsListing() {
  const { jobs, filters } = useLoaderData<typeof loader>();
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
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link to="/" className="text-xl font-extrabold text-blue-800">GovJob Central</Link>
          <nav aria-label="मुख्य नेव्हिगेशन" className="flex gap-4 text-sm font-semibold">
            <Link to="/" className="text-slate-700 hover:text-blue-700">मुखपृष्ठ</Link>
            <Link to="/jobs" className="text-blue-700">भरती शोधा</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 py-8 md:flex-row md:px-8">
        <aside className="w-full flex-shrink-0 md:w-72">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:sticky md:top-4">
            <h1 className="text-lg font-extrabold">भरती फिल्टर करा</h1>
            <Form method="get" className="mt-4 space-y-4">
              <div>
                <label htmlFor="search" className="mb-1 block text-sm font-semibold">पद किंवा संस्था शोधा</label>
                <input id="search" type="search" name="search" defaultValue={filters.search} placeholder="उदा. पोलीस, शिक्षक, लिपिक" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label htmlFor="state" className="mb-1 block text-sm font-semibold">राज्य</label>
                <select id="state" name="state" defaultValue={filters.state || ""} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-600">
                  <option value="">संपूर्ण भारत</option>
                  <option value="Maharashtra">महाराष्ट्र</option>
                  <option value="Delhi">दिल्ली</option>
                  <option value="Uttar Pradesh">उत्तर प्रदेश</option>
                </select>
              </div>
              <div>
                <label htmlFor="qualification" className="mb-1 block text-sm font-semibold">शैक्षणिक पात्रता</label>
                <select id="qualification" name="qualification" defaultValue={filters.qualification || ""} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-600">
                  <option value="">कोणतीही पात्रता</option>
                  <option value="10th">१० वी पास</option>
                  <option value="12th">१२ वी पास</option>
                  <option value="Graduate">पदवीधर</option>
                  <option value="ITI">ITI / डिप्लोमा</option>
                </select>
              </div>
              <button type="submit" className="w-full rounded-lg bg-blue-700 px-4 py-3 text-sm font-bold text-white hover:bg-blue-800">फिल्टर लागू करा</button>
              {(filters.state || filters.qualification || filters.search) && <Link to="/jobs" className="block text-center text-sm font-semibold text-rose-700 hover:underline">फिल्टर साफ करा</Link>}
            </Form>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-blue-700">सरकारी नोकरी अपडेट्स</p>
              <h2 className="mt-1 text-2xl font-extrabold">{filters.search ? `“${filters.search}” साठी भरती` : "सर्व उपलब्ध भरती"}</h2>
            </div>
            <span className="text-sm text-slate-600">{jobs.length} जाहिराती</span>
          </div>

          {jobs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h3 className="font-bold">तुमच्या शोधानुसार भरती सापडली नाही.</h3>
              <p className="mt-2 text-sm text-slate-600">शोधशब्द किंवा फिल्टर बदलून पुन्हा प्रयत्न करा.</p>
              <Link to="/jobs" className="mt-4 inline-block font-semibold text-blue-700 hover:underline">सर्व फिल्टर साफ करा</Link>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {jobs.map((job) => {
                const isSaved = savedIds.includes(String(job.id));
                return (
                  <article key={job.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">प्रकाशित</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{job.state || "भारत"}</span>
                    </div>
                    <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-500">{job.organisation}</p>
                    <h3 className="mt-1 text-lg font-bold leading-snug">{job.title}</h3>
                    <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                      <div><dt className="text-slate-500">रिक्त पदे</dt><dd className="mt-1 font-semibold">{job.numberOfPosts || "जाहिरात पहा"}</dd></div>
                      <div><dt className="text-slate-500">पात्रता</dt><dd className="mt-1 font-semibold">{job.minimumQualification || "जाहिरात पहा"}</dd></div>
                      <div><dt className="text-slate-500">वयोमर्यादा</dt><dd className="mt-1 font-semibold">{job.minimumAge != null || job.maximumAge != null ? `${job.minimumAge ?? "—"}–${job.maximumAge ?? "—"} वर्षे` : "जाहिरात पहा"}</dd></div>
                      <div><dt className="text-slate-500">अंतिम तारीख</dt><dd className="mt-1 font-semibold text-rose-700">{job.applicationLastDate ? new Date(job.applicationLastDate).toLocaleDateString("mr-IN") : "जाहीर व्हायची आहे"}</dd></div>
                    </dl>
                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                      <button type="button" onClick={() => toggleSaved(String(job.id))} aria-pressed={isSaved} className="rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">{isSaved ? "♥ जतन केले" : "♡ जतन करा"}</button>
                      <Link to={`/recruitment/${job.slug}`} className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800">तपशील पहा</Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
          <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">अर्ज करण्यापूर्वी अधिकृत जाहिरात, पात्रता, वयोमर्यादा आणि अंतिम तारीख तपासणे आवश्यक आहे.</p>
        </section>
      </main>
    </div>
  );
}
