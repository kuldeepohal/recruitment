import type { MetaFunction } from "react-router";
import { Link } from "react-router";

export const meta: MetaFunction = () => [
  { title: "Maharashtra Teacher Recruitment 2026 | Pavitra Portal | GovJob Central" },
  {
    name: "description",
    content:
      "Latest Maharashtra teacher recruitment update through Pavitra Portal: 30,209 vacancies, TAIT 2025 eligibility, preference process, official links and current dashboard status.",
  },
];

const officialPortal = "https://tait2025.mahateacherrecruitment.org.in/Public/Home.aspx";
const officialDepartment = "https://mahateacherrecruitment.org.in/";
const msce = "https://mscepune.in/";

export default function TeacherRecruitment() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 px-4 py-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-700">GovJob Central</Link>
          <nav className="flex gap-4 text-sm font-medium">
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600">All Jobs</Link>
            <Link to="/jobs?state=Maharashtra" className="text-gray-700 hover:text-blue-600">Maharashtra Jobs</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Teacher Recruitment Update</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Maharashtra Teacher Recruitment 2026</h1>
          <p className="text-gray-600 mt-3 max-w-4xl leading-7">
            Pavitra Portal recruitment linked to TAIT 2025 for teaching and Shikshan Sevak vacancies across Maharashtra. This page is based on the official Pavitra Portal and MSCE information checked on 24 August 2026.
          </p>
        </div>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            ["Total vacancies", "30,209"],
            ["Classes covered", "1–12"],
            ["TAIT cycle", "2025"],
            ["Last portal check", "24 Aug 2026"],
          ].map(([label, value]) => (
            <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-xl font-bold mt-1">{value}</p>
            </div>
          ))}
        </section>

        <div className="grid lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-6">
            <article className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Vacancy by teaching level</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b"><th className="text-left py-3">Level</th><th className="text-right py-3">Posts</th></tr></thead>
                  <tbody>
                    <tr className="border-b"><td className="py-3">Primary (Classes 1–5)</td><td className="py-3 text-right font-semibold">14,320</td></tr>
                    <tr className="border-b"><td className="py-3">Upper Primary (Classes 6–8)</td><td className="py-3 text-right font-semibold">10,012</td></tr>
                    <tr className="border-b"><td className="py-3">Secondary (Classes 9–10)</td><td className="py-3 text-right font-semibold">5,513</td></tr>
                    <tr><td className="py-3">Higher Secondary (Classes 11–12)</td><td className="py-3 text-right font-semibold">364</td></tr>
                  </tbody>
                </table>
              </div>
            </article>

            <article className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Eligibility — quick guide</h2>
              <ul className="space-y-3 text-gray-700 leading-6">
                <li><strong>Core requirement:</strong> Candidates participating in this cycle are linked to TAIT 2025 and the applicable Pavitra Portal eligibility/self-certification rules.</li>
                <li><strong>Classes 1–5:</strong> D.Ed./D.El.Ed. and applicable TET/CTET requirements.</li>
                <li><strong>Classes 6–8:</strong> Relevant graduation plus B.Ed./D.Ed. and applicable TET/CTET requirements.</li>
                <li><strong>Classes 9–10:</strong> Relevant bachelor’s qualification with B.Ed. as applicable.</li>
                <li><strong>Classes 11–12:</strong> Relevant postgraduate qualification with B.Ed./M.Ed. as applicable.</li>
              </ul>
              <p className="text-xs text-gray-500 mt-5">Eligibility varies by subject, medium, management and post. Candidates should verify the applicable official advertisement before relying on this summary.</p>
            </article>

            <article className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Important recruitment status</h2>
              <div className="space-y-3 text-gray-700 leading-6">
                <p><strong>Preference process:</strong> The official portal shows the 2026 recruitment preference dashboard and currently reports data last updated on 20 August 2026.</p>
                <p><strong>Dashboard at the official portal:</strong> 151,020 preferences generated and 146,650 preferences locked for without-interview posts; 141,865 generated and 131,505 locked for with-interview posts.</p>
                <p><strong>Merit list:</strong> Do not treat social-media or unofficial predicted dates as confirmed. Publish a merit-list date on this portal only after an official notice confirms it.</p>
              </div>
            </article>
          </section>

          <aside className="space-y-6">
            <div className="bg-blue-700 text-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold">Official links</h2>
              <div className="mt-4 space-y-3 text-sm">
                <a className="block bg-white/10 hover:bg-white/20 rounded-lg px-4 py-3" href={officialPortal} target="_blank" rel="noreferrer">Pavitra Portal 2025 →</a>
                <a className="block bg-white/10 hover:bg-white/20 rounded-lg px-4 py-3" href={officialDepartment} target="_blank" rel="noreferrer">Maharashtra Teacher Recruitment Home →</a>
                <a className="block bg-white/10 hover:bg-white/20 rounded-lg px-4 py-3" href={msce} target="_blank" rel="noreferrer">MSCE Pune →</a>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-3">Important dates</h2>
              <ul className="text-sm space-y-3 text-gray-700">
                <li><strong>TAIT 2025:</strong> 27 May–5 June 2025</li>
                <li><strong>Preference generation:</strong> Started 6 August 2026</li>
                <li><strong>Preference locking:</strong> Portal/recent reports indicate the process extended into August 2026; candidates should rely on the official dashboard for the final status.</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h2 className="font-bold mb-2">Verification note</h2>
              <p className="text-sm text-amber-900 leading-6">GovJob Central is an information portal. Always open the official advertisement before making a recruitment decision. Unofficial news, Telegram/WhatsApp messages and predicted merit-list dates are not treated as confirmed updates.</p>
            </div>
          </aside>
        </div>

        <section className="mt-8 bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-600">
          <h2 className="font-bold text-gray-900 mb-2">Sources checked</h2>
          <p>Maharashtra School Education and Sports Department — PAVITRA Teacher Recruitment 2025; Maharashtra State Council of Examination, Pune; current portal dashboard information available on the official recruitment portal.</p>
          <p className="mt-2">Last verified: 24 August 2026.</p>
        </section>
      </main>
    </div>
  );
}
