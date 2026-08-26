import { Link } from "react-router";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
  { title: "Government Job Eligibility for Freshers | MyJob Recruitment" },
  { name: "description", content: "A simple, comprehensive guide to help freshers decode age, education, category, nationality, and other essential conditions before applying for government jobs." },
];

export default function ArticleEligibility() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 px-4 py-8 md:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-200">
        <div className="mb-6">
          <Link to="/articles" className="text-blue-700 font-semibold hover:underline">
            ← Back to Learn & Prepare
          </Link>
        </div>
        
        <article className="prose prose-blue max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Government Job Eligibility for Freshers: A Simple Guide</h1>
          
          <p className="text-lg text-gray-700 mb-6">
            Landing a government job (Sarkari Naukri) is a dream for millions of fresh graduates and school pass-outs. The stability, perks, and respect associated with the public sector make it a highly sought-after career path. However, before you dive into preparation and buy stacks of study materials, the very first step is understanding whether you are eligible to apply.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Government recruitment bodies like the Union Public Service Commission (UPSC), Staff Selection Commission (SSC), Railway Recruitment Board (RRB), and Institute of Banking Personnel Selection (IBPS) have strict, non-negotiable eligibility criteria. Here is a simple, comprehensive guide to help freshers decode age, education, category, nationality, and other essential conditions before applying for government jobs.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Nationality and Citizenship</h2>
          <p className="mb-4">The most fundamental requirement for any government job in India is your nationality. While it might seem obvious, there are specific nuances depending on the grade and type of the job.</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Indian Citizens:</strong> A citizen of India is eligible for almost all Central and State government jobs.</li>
            <li><strong>Subjects of Nepal and Bhutan:</strong> Candidates from Nepal and Bhutan are eligible for many Central government jobs (like certain SSC and Railway posts), provided they have a certificate of eligibility issued by the Government of India.</li>
            <li><strong>Tibetan Refugees:</strong> Those who came over to India before January 1, 1962, with the intention of permanently settling in India are eligible for specific exams, subject to government certification.</li>
            <li><strong>Migrants:</strong> Persons of Indian Origin (PIO) who have migrated from Pakistan, Burma, Sri Lanka, East African countries, or Vietnam with the intention of permanently settling in India can also apply for certain posts, provided they hold the necessary government certificates.</li>
          </ul>
          <p className="text-sm bg-gray-100 p-3 rounded-md mb-8"><em>(Note: For top-tier sovereign roles like the IAS, IPS, or IFS under UPSC, the candidate must be a citizen of India.)</em></p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Educational Qualifications</h2>
          <p className="mb-4">Government jobs cater to candidates across various educational levels. The required qualification is strictly tied to the post you are applying for. Crucially, your educational degree or certificate must be from a board or university recognized by the Government of India (UGC/AICTE).</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Education Level</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Popular Exams & Posts</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">10th Pass (Matriculation)</td>
                  <td className="border border-gray-300 px-4 py-2">SSC MTS (Multi-Tasking Staff), RRB Group D, Post Office GDS, State Police Constables, Defense Tradesmen.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">12th Pass (Intermediate)</td>
                  <td className="border border-gray-300 px-4 py-2">SSC CHSL (Lower Divisional Clerk, Data Entry Operator), RRB NTPC (Undergraduate posts), NDA (National Defence Academy), State Police Head Constables.</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Graduation (Any Stream)</td>
                  <td className="border border-gray-300 px-4 py-2">UPSC Civil Services (IAS/IPS), SSC CGL (Income Tax Inspector, Examiner), IBPS PO/Clerk, SBI PO, RBI Grade B, RRB NTPC (Graduate posts).</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">Specialized Degrees</td>
                  <td className="border border-gray-300 px-4 py-2">Engineering (B.Tech/BE): SSC JE, RRB JE, GATE (for PSUs), IES.<br/>Law/CA/Medical: Specialist Officer (SO) in Banks, Medical Officers, Judge Advocate General (JAG) in Defense.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="font-semibold text-blue-800 bg-blue-50 p-4 rounded-md mb-8 border border-blue-200">Crucial Tip for Freshers: If an exam notification states that the minimum qualification is a degree, you must have your final year result declared on or before the closing date of the application. Simply appearing for the final exam is usually not enough unless explicitly stated.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Age Limits and Category Relaxations</h2>
          <p className="mb-4">Age criteria are strictly enforced. The "crucial date" for determining your age (e.g., "Age as of 1st August 2026") will always be mentioned in the official notification.</p>
          
          <h3 className="text-xl font-medium mb-2">General Age Brackets:</h3>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li><strong>10th/12th level jobs:</strong> Usually 18 to 25 or 27 years.</li>
            <li><strong>Clerical/Banking jobs:</strong> Usually 20 to 28 years.</li>
            <li><strong>Officer/Graduate level jobs:</strong> Usually 21 to 30 or 32 years.</li>
          </ul>

          <h3 className="text-xl font-medium mb-2">Standard Age Relaxations</h3>
          <p className="mb-4">To ensure equal opportunity, the government provides upper age limit relaxations for specific reserved categories. While the exact relaxation can vary slightly by exam, the central government standard is generally:</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Category</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Upper Age Limit Relaxation</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-4 py-2 font-medium">OBC (Non-Creamy Layer)</td><td className="border border-gray-300 px-4 py-2">+ 3 Years</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2 font-medium">SC / ST</td><td className="border border-gray-300 px-4 py-2">+ 5 Years</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2 font-medium">PwD (Persons with Benchmark Disabilities) - General</td><td className="border border-gray-300 px-4 py-2">+ 10 Years</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2 font-medium">PwD + OBC</td><td className="border border-gray-300 px-4 py-2">+ 13 Years</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2 font-medium">PwD + SC/ST</td><td className="border border-gray-300 px-4 py-2">+ 15 Years</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2 font-medium">Ex-Servicemen</td><td className="border border-gray-300 px-4 py-2">Usually 3 years after deduction of military service rendered from the actual age.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm bg-gray-100 p-3 rounded-md mb-8"><em>(Note: EWS (Economically Weaker Sections) candidates generally do not get age relaxation, but they do get a reservation in vacancies.)</em></p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Number of Attempts</h2>
          <p className="mb-4">Most Class B, C, and D exams (like SSC, Railways, and Banking) do not restrict the number of attempts; you can keep applying as long as you are within the age limit.</p>
          <p className="mb-4">However, high-level exams, particularly those conducted by UPSC, strictly cap how many times you can take the exam:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li><strong>UPSC Civil Services:</strong> General (6 attempts), OBC (9 attempts), SC/ST (Unlimited attempts up to the age limit).</li>
            <li><strong>RBI Grade B:</strong> General (6 attempts for Phase-1), no limit for reserved categories.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Physical and Medical Standards</h2>
          <p className="mb-4">If you are aiming for uniform services or technical roles, passing a written exam isn't enough. You must meet strict physical and medical criteria.</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li><strong>Defense & Police (NDA, CDS, SSC CPO, State Police):</strong> Strict requirements for height, chest expansion (for males), weight-to-height ratio, and vision (e.g., 6/6 or 6/9 without glasses). Knock-knees, flat feet, and color blindness are usually immediate grounds for rejection.</li>
            <li><strong>Railways (Loco Pilots, Station Masters):</strong> Extremely stringent vision standards (A1 medical category) are required for safety-critical roles.</li>
            <li><strong>Civil Services (IPS, IRS - Customs):</strong> IPS candidates must meet minimum height and chest girth requirements.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-900 border-b pb-2">Final Checklist Before You Apply</h2>
          <ul className="list-disc pl-6 mb-8 space-y-3">
            <li><strong>Read the Official Notification:</strong> Never rely entirely on third-party websites. Always download the official PDF from the commission's website (e.g., upsc.gov.in, ssc.gov.in).</li>
            <li><strong>Check the 'Crucial Dates':</strong> Ensure your age and educational qualifications align with the specific cut-off date mentioned in the notification.</li>
            <li><strong>Prepare Your Certificates:</strong> If you are claiming a reservation (OBC-NCL, EWS, SC/ST, PwD), ensure your certificate is in the prescribed government format and valid for the current financial year.</li>
          </ul>

          <p className="text-lg font-medium text-green-900 bg-green-50 p-5 rounded-lg border border-green-200">
            Understanding these parameters early on will save you from heartbreak later. Choose the exams that align with your profile, and you can focus 100% of your energy on preparation!
          </p>
        </article>
      </div>
    </main>
  );
}
