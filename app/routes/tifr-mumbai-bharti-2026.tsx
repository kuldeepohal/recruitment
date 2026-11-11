import type { MetaFunction } from "react-router";
import { Link } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "TIFR Mumbai Bharti 2026 | GovJob Central" },
    { name: "description", content: "टाटा मूलभूत संशोधन संस्था, मुंबई भरती 2026 ची माहिती, पात्रता, वेतन आणि महत्त्वाच्या लिंक्स." },
  ];
};

export default function TifrMumbaiBharti2026() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 px-4 py-4 md:px-8">
        <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
          <Link to="/" className="text-xl font-bold text-blue-700">GovJob Central</Link>
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-blue-600">
            &larr; मुख्यपृष्ठावर परत
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:px-8">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 mb-6">
          <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-semibold">
            TIFR Mumbai Bharti 2026
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">
            टाटा मूलभूत संशोधन संस्था, मुंबई अंतर्गत 05 रिक्त पदांसाठी भरती
          </h1>
          <p className="mt-4 text-gray-700 leading-7">
            टाटा मूलभूत संशोधन संस्था (TIFR), मुंबई येथे प्रकल्प प्रयोगशाळा सहाय्यक (B), प्रकल्प वैज्ञानिक अधिकारी (B), प्रकल्प लिपिक (A) आणि प्रकल्प कार्य सहाय्यक या पदांसाठी एकूण 05 जागांसाठी भरती जाहीर झाली आहे. अर्ज करण्याची अंतिम तारीख 15 सप्टेंबर 2026 आहे.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">भरती तपशील</h2>
            <ul className="space-y-3 text-gray-700">
              <li><strong>संस्था:</strong> टाटा मूलभूत संशोधन संस्था, मुंबई</li>
              <li><strong>एकूण पदे:</strong> 05</li>
              <li><strong>अर्ज पद्धत:</strong> ऑनलाईन</li>
              <li><strong>वयोमर्यादा:</strong> 35 वर्षे</li>
              <li><strong>नोकरी ठिकाण:</strong> मुंबई</li>
              <li><strong>अंतिम तारीख:</strong> 15 सप्टेंबर 2026</li>
            </ul>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">पदनिहाय माहिती</h2>
            <ul className="space-y-3 text-gray-700">
              <li><strong>प्रकल्प प्रयोगशाळा सहाय्यक (B):</strong> 01</li>
              <li><strong>प्रकल्प वैज्ञानिक अधिकारी (B):</strong> 01</li>
              <li><strong>प्रकल्प लिपिक (A):</strong> 02</li>
              <li><strong>प्रकल्प कार्य सहाय्यक:</strong> 01</li>
            </ul>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">पात्रता आणि वेतन</h2>
            <div className="space-y-4 text-gray-700 leading-7">
              <p><strong>प्रकल्प प्रयोगशाळा सहाय्यक (B):</strong> Air Conditioning मध्ये NTC/NAC आणि किमान 60% गुण.</p>
              <p><strong>प्रकल्प वैज्ञानिक अधिकारी (B):</strong> M.Sc./M.S. किंवा B.E./B.Tech. संबंधित शाखेत 60% गुणांसह.</p>
              <p><strong>प्रकल्प लिपिक (A):</strong> पदवी, टायपिंगचे ज्ञान, संगणक ज्ञान आणि किमान 1 वर्ष अनुभव.</p>
              <p><strong>प्रकल्प कार्य सहाय्यक:</strong> SSC किंवा समकक्ष, तसेच किमान 1 वर्ष अनुभव.</p>
              <p><strong>वेतन:</strong> 32,300/- ते 84,200/- रुपये (पदांनुसार).</p>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">महत्त्वाच्या लिंक्स</h2>
            <div className="space-y-3">
              <a
                href="https://lnk.ua/jPUHiPXsX"
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-gray-200 px-4 py-3 font-medium text-blue-700 hover:bg-blue-50"
              >
                PDF जाहिरात
              </a>
              <a
                href="https://lnk.ua/sVHsoVH65"
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-gray-200 px-4 py-3 font-medium text-blue-700 hover:bg-blue-50"
              >
                ऑनलाईन अर्ज करा
              </a>
              <a
                href="https://www.tifr.res.in/"
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-gray-200 px-4 py-3 font-medium text-blue-700 hover:bg-blue-50"
              >
                अधिकृत वेबसाइट
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
