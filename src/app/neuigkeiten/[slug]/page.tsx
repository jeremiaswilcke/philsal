import Link from "next/link";
import { notFound } from "next/navigation";
import { getNews, getNewsBySlug } from "@/lib/wp";
import { sanitizeHtml } from "@/lib/sanitize";

export async function generateStaticParams() {
    const news = await getNews();
    return news.map((n) => ({ slug: n.slug }));
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const news = await getNewsBySlug(slug);

    if (!news) return notFound();

    return (
        <article className="min-h-screen bg-creme pb-24">
            {/* Single column — no sidebar */}
            <div className="max-w-3xl mx-auto px-6 pt-24">
                <Link href="/neuigkeiten" className="inline-flex items-center text-sm font-sans text-gray-500 hover:text-gold-dark transition-colors mb-12 tracking-widest uppercase">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Alle Neuigkeiten
                </Link>

                <div className="mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight mb-8">
                        {news.title}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-500 font-sans text-sm uppercase tracking-widest">
                        <span>{news.date}</span>
                        {news.author && (
                            <>
                                <span>·</span>
                                <span>Von {news.author}</span>
                            </>
                        )}
                    </div>
                </div>

                {news.imageUrl && (
                    <div className="w-full aspect-video mb-12 rounded-sm overflow-hidden bg-gray-200">
                        <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {news.content && (
                    <div
                        className="prose prose-lg prose-gray max-w-none font-sans font-light leading-relaxed text-gray-800
                            prose-p:mb-8 prose-headings:font-serif prose-headings:text-gray-900 prose-headings:mt-12 prose-headings:mb-6
                            prose-blockquote:border-l-gold-primary prose-blockquote:pl-6 prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:text-2xl"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(news.content) }}
                    />
                )}

                <div className="mt-20 pt-10 border-t border-gray-200">
                    <p className="font-serif italic text-gray-500 text-center">
                        Teilen Sie diesen Beitrag oder diskutieren Sie ihn in unserem nächsten Salon.
                    </p>
                </div>
            </div>
        </article>
    );
}
