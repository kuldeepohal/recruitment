import { Link } from "react-router";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
  { title: "Career & Recruitment Guidance for Freshers | MyJob Recruitment" },
  { name: "description", content: "Practical guides for freshers on government-job eligibility, qualifications, syllabus, exam preparation, applications and career opportunities." },
];

const articles = [
  { slug: "pavitra-portal-shikshak-bharti", title: "Pavitra Portal Shikshak Bharti 2026", text: "शिक्षक अभियोग्यता व बुद्धिमत्ता चाचणी-२०२५ नुसार प्राप्त जाहिरातीतील मुलाखतीशिवाय या प्रकारातील रिक्त पदांसाठी उमेदवारांच्या निवडीसाठी शिफारशीबाबत याद्या." },
  { slug: "government-job-eligibility-for-freshers", title: "Government Job Eligibility for Freshers: A Simple Guide", text: "Understand age, education, category, nationality and other eligibility conditions before applying." },
  { slug: "how-to-acquire-eligibility-qualification", title: "How to Acquire the Qualification You Need for a Government Job", text: "Learn practical routes through 10th, 12th, ITI, diploma, graduation, B.Ed, postgraduate and professional qualifications." },
  { slug: "government-exam-preparation-plan", title: "Government Exam Preparation Plan for Beginners", text: "Build a realistic study routine, choose resources, revise effectively and track your progress." },
  { slug: "how-to-read-recruitment-notification", title: "How to Read a Recruitment Notification Without Missing Anything", text: "A step-by-step checklist for vacancies, eligibility, dates, fees, documents and selection stages." },
  { slug: "government-job-syllabus-strategy", title: "How to Understand a Government Exam Syllabus and Prepare", text: "Turn a long syllabus into topics, priorities, practice sets and revision cycles." },
  { slug: "career-opportunities-after-10th-12th-graduation", title: "Career Opportunities After 10th, 12th and Graduation", text: "Explore the types of government and public-sector opportunities available at different education levels." },
];

export default function Articles() {
  return <main className="min-h-screen bg-gray-50 text-gray-900 px-4 py-8 md:px-8">
    <div className="max-w-6xl mx-auto">
      <Link to="/" className="text-blue-700 font-bold">← MyJob Recruitment</Link>
      <section className="mt-8 mb-8"><p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Learn & Prepare</p><h1 className="text-3xl md:text-4xl font-bold mt-2">Career & Recruitment Guides for Freshers</h1><p className="text-gray-600 max-w-3xl mt-3 leading-7">Practical, beginner-friendly guidance on eligibility, qualifications, exam preparation, syllabus, applications and career opportunities. Always verify final eligibility and dates in the official notification.</p></section>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">{articles.map((article) => <article key={article.slug} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h2 className="text-lg font-semibold leading-snug">{article.title}</h2><p className="text-gray-600 text-sm leading-6 mt-3">{article.text}</p><Link to={`/articles/${article.slug}`} className="inline-block mt-4 text-blue-700 font-semibold text-sm">Read guide →</Link></article>)}</div>
    </div>
  </main>;
}
