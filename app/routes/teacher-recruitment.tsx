import type { MetaFunction } from "react-router";
import { Link } from "react-router";

export const meta: MetaFunction = () => [
  { title: "Maharashtra Teacher Recruitment 2026 | Pavitra Portal | GovJob Central" },
  {
    name: "description",
    content:
      "Maharashtra teacher recruitment 2026 through Pavitra Portal: 30,209 vacancies, TAIT 2025, preference process, official links and verification guidance.",
  },
];

const officialPortal = "https://tait2025.mahateacherrecruitment.org.in/Public/Home.aspx";
const officialDepartment = "https://mahateacherrecruitment.org.in/";
const msce = "https://www.mscepune.in/";

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
            Pavitra Portal recruitment based on TAIT 2025 for teaching and Shikshan Sevak vacancies across Maharashtra. Information on this page was reviewed on 24 August 2026.
          </p>
        </div>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            ["Total vacancies", "30,209"],
            ["Classes covered", "1–12"],
            ["Qualifying test", "TAIT 2025"],
            ["Last verified", "24 Aug 2026"],
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
              <h2 className="text-xl font-bold mb-4">Recruitment highlights</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500 block">Department</span><strong>School Education & Sports Department, Maharashtra</strong></div>
                <div><span className="text-gray-500 block">Recruitment system</span><strong>Pavitra Portal</strong></div>
                <div><span className="text-gray-500 block">Vacancies</span><strong>30,209 teacher/Shikshan Sevak posts</strong></div>
                <div><span className="text-gray-500 block">Geographical scope</span><strong>Maharashtra</strong></div>
                <div><span className="text-gray-500 block">Selection basis</span><strong>TAIT 2025 merit + applicable rules</strong></div>
                <div><span className="text-gray-500 block">Preference window</span><strong>6–11 August 2026</strong></div>
              </div>
            </article>

            <article className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Important recruitment status</h2>
              <div className="space-y-3 text-gray-700 leading-6">
                <p><strong>Preference process:</strong> The post-wise preference facility opened on 6 August 2026 for eligible candidates in the current TAIT-2025/Pavitra recruitment cycle.</p>
                <p><strong>Preference locking:</strong> The current reported deadline was 11 August 2026. Candidates should use the official portal for any account-specific status or later official notices.</p>
                <p><strong>Merit list:</strong> Do not publish an unofficial predicted merit-list date as confirmed news. The portal should label rumours/predictions separately until an official notice confirms the date.</p>
              </div>
            </article>

            <article className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Eligibility — quick guide</h2>
              <ul className="space-y-3 text-gray-700 leading-6">
                <li><strong>Core requirement:</strong> Participation is tied to TAIT 2025 and the applicable Pavitra Portal self-certification and eligibility rules.</li>
                <li><strong>Primary/upper-primary:</strong> Required D.El.Ed./D.Ed., graduation and/or TET/CTET qualifications depend on the specific post and subject.</li>
                <li><strong>Secondary/higher secondary:</strong> Relevant subject qualification and B.Ed./other prescribed qualification depend on the post.</li>
                <li><strong>Important:</strong> Eligibility varies by subject, medium, management and post. Candidates must verify the official vacancy notice before relying on this summary.</li>
              </ul>
            </article>

            <article className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">What candidates should check</h2>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700 leading-6">
                <li>TAIT 2025 result and eligibility/self-certification status.</li>
                <li>Post-wise, subject-wise and medium-wise vacancies shown for the candidate.</li>
                <li>Preference order and whether preferences were successfully locked.</li>
                <li>Official merit/selection notices before accepting or rejecting any claim circulating on social media.</li>
              </ol>
            </article>
          </section>

          <aside className="space-y-6">
            <div className="bg-blue-700 text-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold">Official links</h2>
              <div className="mt-4 space-y-3 text-sm">
                <a className="block bg-white/10 hover:bg-white/20 rounded-lg px-4 py-3" href={officialPortal} target="_blank" rel="noreferrer">Pavitra Portal / TAIT 2025 →</a>
                <a className="block bg-white/10 hover:bg-white/20 rounded-lg px-4 py-3" href={officialDepartment} target="_blank" rel="noreferrer">Maharashtra Teacher Recruitment →</a>
                <a className="block bg-white/10 hover:bg-white/20 rounded-lg px-4 py-3" href={msce} target="_blank" rel="noreferrer">MSCE Pune →</a>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-3">Key dates</h2>
              <ul className="text-sm space-y-3 text-gray-700">
                <li><strong>TAIT 2025:</strong> 27 May–5 June 2025</li>
                <li><strong>Preference generation:</strong> 6 August 2026</li>
                <li><strong>Preference locking:</strong> 11 August 2026</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h2 className="font-bold mb-2">Verification note</h2>
              <p className="text-sm text-amber-900 leading-6">GovJob Central is an information portal. Always open the official advertisement before making a recruitment decision. Telegram/WhatsApp messages, news reports and predicted merit-list dates are not treated as confirmed official updates unless supported by an official notice.</p>
            </div>
          </aside>
        </div>

        <section className="mt-8 bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-600">
          <h2 className="font-bold text-gray-900 mb-2">Sources checked</h2>
          <p>Maharashtra State Council of Examination, Pune (TAIT 2025 and Pavitra Portal candidate notices), Maharashtra Teacher Recruitment/Pavitra Portal information, and recent reporting used only to cross-check dates and vacancy figures.</p>
          <p className="mt-2">Last verified: 24 August 2026.</p>
        </section>
      </main>
    </div>
  );
}
