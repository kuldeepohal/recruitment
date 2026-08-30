import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "./+types/root";
import "./app.css";

export const meta: Route.MetaFunction = () => [
  { title: "MyJob Recruitment | Latest Government & Local Jobs" },
  { name: "description", content: "MyJob Recruitment helps job seekers discover government and local recruitment notifications, understand eligibility, prepare for exams and build qualifications for future opportunities." },
  { name: "keywords", content: "MyJob Recruitment, government jobs, recruitment, MPSC, UPSC, Maharashtra jobs, fresher jobs, eligibility, exam preparation, career guidance" },
];

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5250183700649220" crossOrigin="anonymous"></script>
        
        {/* Google Translate Integration */}
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'en,mr,hi', autoDisplay: false}, 'google_translate_element');
          }
        ` }}></script>
        <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
        <style dangerouslySetInnerHTML={{ __html: `
          .goog-te-banner-frame { display: none !important; }
          body { top: 0px !important; }
          .skiptranslate { display: none !important; }
          #google_translate_element { display: none !important; }
        ` }} />
      </head>
      <body>
        <div id="google_translate_element"></div>
        
        {/* Custom Language Switcher Links */}
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 bg-white p-3 rounded-lg shadow-xl border border-gray-200">
          <p className="text-xs font-semibold text-gray-500 text-center mb-1">Select Language</p>
          <div className="flex gap-2">
            <button onClick={() => { document.cookie = "googtrans=/en/en; path=/"; window.location.reload(); }} className="px-3 py-1 text-sm bg-gray-100 hover:bg-blue-100 text-gray-800 rounded transition-colors border border-gray-300">English</button>
            <button onClick={() => { document.cookie = "googtrans=/en/mr; path=/"; window.location.reload(); }} className="px-3 py-1 text-sm bg-gray-100 hover:bg-blue-100 text-gray-800 rounded transition-colors border border-gray-300">मराठी</button>
            <button onClick={() => { document.cookie = "googtrans=/en/hi; path=/"; window.location.reload(); }} className="px-3 py-1 text-sm bg-gray-100 hover:bg-blue-100 text-gray-800 rounded transition-colors border border-gray-300">हिंदी</button>
          </div>
        </div>

        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() { return <Outlet />; }

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"; let details = "An unexpected error occurred."; let stack: string | undefined;
  if (isRouteErrorResponse(error)) { message = error.status === 404 ? "404" : "Error"; details = error.status === 404 ? "The requested page could not be found." : error.statusText || details; }
  else if (import.meta.env.DEV && error instanceof Error) { details = error.message; stack = error.stack; }
  return <main className="pt-16 p-4 container mx-auto"><h1>{message}</h1><p>{details}</p>{stack && <pre className="w-full p-4 overflow-x-auto"><code>{stack}</code></pre>}</main>;
}
