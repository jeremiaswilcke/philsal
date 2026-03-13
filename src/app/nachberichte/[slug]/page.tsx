import Link from "next/link";
import { notFound } from "next/navigation";
import { getReports, getReportBySlug } from "@/lib/wp";
import { sanitizeHtml } from "@/lib/sanitize";

export async function generateStaticParams() {
    const reports = await getReports();
    return reports.map((r) => ({ slug: r.slug }));
}

export default async function ReportPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const report = await getReportBySlug(slug);

    if (!report) return notFound();

    return (
        <article className="min-h-screen bg-creme pb-24">
            {/* Hero — full width, no sidebar */}
            <div className="w-full h-[40vh] md:h-[50vh] bg-gray-dark relative overflow-hidden">
                {report.imageUrl ? (
                    <img src={report.imageUrl} alt={report.title} className="w-full h-full object-cover opacity-70 grayscale" />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gold-dark/20 font-serif text-9xl italic">P</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-creme/90" />
            </div>

            {/* Single column — no sidebar */}
            <div className="max-w-3xl mx-auto px-6 -mt-24 relative z-10">
                <Link href="/nachberichte" className="inline-flex items-center text-sm font-sans text-gray-500 hover:text-gold-dark transition-colors mb-8 tracking-widest uppercase">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Alle Nachschauen
                </Link>

                <div className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-[1px] w-6 bg-hofburg-red" />
                        <span className="text-hofburg-red font-sans text-xs tracking-[0.2em] uppercase">Nachbericht</span>
                        <div className="h-[1px] w-6 bg-hofburg-red" />
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight mb-6">
                        {report.title}
                    </h1>
                    <p className="text-gray-500 font-sans text-sm uppercase tracking-widest">{report.date}</p>
                </div>

                {report.content && (
                    <div
                        className="prose prose-lg prose-gray max-w-none font-sans font-light leading-relaxed text-gray-800
                            prose-p:mb-8 prose-headings:font-serif prose-headings:text-gray-900 prose-headings:mt-12 prose-headings:mb-6
                            prose-blockquote:border-l-hofburg-red prose-blockquote:pl-6 prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:text-2xl"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(report.content) }}
                    />
                )}

                <div className="flex justify-center items-center gap-4 mt-24 opacity-60">
                    <div className="w-16 h-[1px] bg-gray-400"></div>
                    <div className="w-1.5 h-1.5 rotate-45 bg-gold-primary"></div>
                    <div className="w-1.5 h-1.5 rotate-45 bg-hofburg-red"></div>
                    <div className="w-1.5 h-1.5 rotate-45 bg-gold-primary"></div>
                    <div className="w-16 h-[1px] bg-gray-400"></div>
                </div>
            </div>
        </article>
    );
}
