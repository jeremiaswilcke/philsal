import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/wp";
import { sanitizeHtml } from "@/lib/sanitize";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const event = await getEventBySlug(slug);

    if (!event) return notFound();

    return (
        <article className="min-h-screen bg-creme pb-24">
            {/* Hero Image */}
            <div className="w-full h-[40vh] md:h-[50vh] bg-gray-dark relative overflow-hidden">
                {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover opacity-80" />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gold-dark/20 font-serif text-9xl italic">P</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-creme/90" />
            </div>

            <div className="max-w-3xl mx-auto px-6 -mt-24 relative z-10">
                <Link href="/veranstaltungen" className="inline-flex items-center text-sm font-sans text-gray-500 hover:text-gold-dark transition-colors mb-8 tracking-widest uppercase">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Alle Veranstaltungen
                </Link>

                <div className="mb-10 text-center">
                    <p className="text-gold-dark font-sans text-sm tracking-widest uppercase mb-4">Veranstaltung</p>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight mb-6">
                        {event.title}
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-gray-500 font-sans text-base">
                        <span>{event.date} {event.time && ` | ${event.time}`}</span>
                        {event.location && (
                            <>
                                <span className="hidden sm:inline">·</span>
                                <span>{event.location}</span>
                            </>
                        )}
                    </div>
                </div>

                {event.content && (
                    <div
                        className="prose prose-lg prose-gray max-w-none font-sans font-light leading-relaxed text-gray-700
                            prose-p:mb-6 prose-headings:font-serif prose-headings:text-gray-900"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.content) }}
                    />
                )}

                {/* CTA */}
                <div className="mt-16 border-t border-b border-gold-primary/30 py-10 flex flex-col items-center">
                    <h3 className="font-serif text-3xl text-gray-800 mb-4">Möchten Sie teilnehmen?</h3>
                    <p className="font-sans text-gray-600 mb-8 text-center max-w-md">
                        Die Plätze im Salon sind begrenzt. Wir bitten um rechtzeitige Anmeldung.
                    </p>
                    <Link
                        href="/kontakt"
                        className="bg-gray-dark text-creme px-8 py-3 rounded-sm font-sans hover:bg-gold-primary transition-colors text-sm uppercase tracking-widest"
                    >
                        Zur Anmeldung
                    </Link>
                </div>
            </div>
        </article>
    );
}
