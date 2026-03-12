import Link from "next/link";
import { notFound } from "next/navigation";
import { sanitizeHtml } from "@/lib/sanitize";

// Placeholder data since we don't have WP integration yet
const dummyNews = {
    id: "n1",
    title: "Der Salon öffnet seine Pforten",
    date: "15. Oktober 2026",
    author: "Jeremias Wilcke",
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop",
    content: `
    <p>Wir freuen uns außerordentlich, die Gründung des Philosophischen Salons bekanntzugeben. In einer Zeit der schnellen Antworten und oberflächlichen Debatten möchten wir einen physischen und intellektuellen Raum schaffen für das, was heute so oft fehlt: Die Tiefe.</p>
    <h2>Was ist ein Salon?</h2>
    <p>Die historische Salonkultur war stets ein Ort der Zusammenkunft unterschiedlichster Geister. Hier trafen sich Literaten, Philosophen, Politiker und Bürger, um frei von Zwängen zu sprechen. Diesen Geist holen wir in die Gegenwart.</p>
    <blockquote>"Wer die Welt bewegen will, sollte erst sich selbst bewegen."</blockquote>
    <p>Wir laden Sie herzlich ein, Teil dieser neuen Bewegung zu werden. Melden Sie sich für unseren Newsletter an oder besuchen Sie eine unserer ersten Veranstaltungen, um sich selbst ein Bild zu machen.</p>
  `
};

export default async function NewsPage() {
    const news = dummyNews;

    if (!news) return notFound();

    return (
        <article className="min-h-screen bg-creme pb-24">
            {/* Narrow Reading Container (Apple News / Medium style) */}
            <div className="max-w-3xl mx-auto px-6 pt-24">

                <Link href="/" className="inline-flex items-center text-sm font-sans text-gray-500 hover:text-gold-dark transition-colors mb-12 tracking-widest uppercase">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Zurück zur Übersicht
                </Link>

                {/* Title Group */}
                <div className="mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight mb-8">
                        {news.title}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-500 font-sans text-sm uppercase tracking-widest">
                        <span>{news.date}</span>
                        <span>•</span>
                        <span>Von {news.author}</span>
                    </div>
                </div>

                {/* Optional Big Image inside the content column */}
                {news.imageUrl && (
                    <div className="w-full aspect-video mb-12 rounded-sm overflow-hidden bg-gray-200">
                        <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Typography-heavy content */}
                <div
                    className="prose prose-lg prose-gray max-w-none font-sans font-light leading-relaxed text-gray-800 
          prose-p:mb-8 prose-headings:font-serif prose-headings:text-gray-900 prose-headings:mt-12 prose-headings:mb-6
          prose-blockquote:border-l-gold-primary prose-blockquote:pl-6 prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:text-2xl"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(news.content) }}
                />

                <div className="mt-20 pt-10 border-t border-gray-200">
                    <p className="font-serif italic text-gray-500 text-center">
                        Teilen Sie diesen Beitrag oder diskutieren Sie ihn in unserem nächsten Salon.
                    </p>
                </div>

            </div>
        </article>
    );
}
