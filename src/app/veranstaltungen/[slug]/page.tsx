import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvents, getEventBySlug } from "@/lib/wp";
import { sanitizeHtml } from "@/lib/sanitize";
import { RegistrationForm } from "./RegistrationForm";

export async function generateStaticParams() {
    const events = await getEvents();
    return events.map((e) => ({ slug: e.slug }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const event = await getEventBySlug(slug);

    if (!event) return notFound();

    const mapsUrl = event.location
        ? `https://maps.google.com/maps?q=${encodeURIComponent(event.location)}`
        : null;

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

            {/* Single column — no sidebar */}
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
                                {mapsUrl ? (
                                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-hofburg-red hover:underline">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        {event.location}
                                    </a>
                                ) : (
                                    <span>{event.location}</span>
                                )}
                            </>
                        )}
                    </div>

                    {/* iCal + Map quick actions */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <a
                            href={`/api/calendar/${slug}`}
                            className="inline-flex items-center gap-2 text-sm font-sans text-gray-500 hover:text-gold-dark transition-colors border border-gray-300 rounded-full px-4 py-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            Zum Kalender hinzufügen
                        </a>
                        {mapsUrl && (
                            <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-sans text-gray-500 hover:text-gold-dark transition-colors border border-gray-300 rounded-full px-4 py-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                Karte
                            </a>
                        )}
                    </div>
                </div>

                {/* Content */}
                {event.content && (
                    <div
                        className="prose prose-lg prose-gray max-w-none font-sans font-light leading-relaxed text-gray-700
                            prose-p:mb-6 prose-headings:font-serif prose-headings:text-gray-900"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.content) }}
                    />
                )}

                {/* Registration */}
                <div className="mt-16 bento-card p-8 md:p-12">
                    <h3 className="font-serif text-3xl text-gray-900 mb-2 text-center">Anmeldung</h3>
                    <p className="font-sans text-gray-600 mb-8 text-center text-sm font-light">
                        Die Plätze sind begrenzt. Bitte melden Sie sich verbindlich an.
                    </p>
                    <RegistrationForm eventSlug={slug} eventTitle={event.title} />
                </div>

                {/* Admin: PDF download (visible to everyone for now — restrict via auth later) */}
                <div className="mt-8 text-center">
                    <a
                        href={`/api/registrations/${slug}/pdf`}
                        className="inline-flex items-center gap-2 text-sm font-sans text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Teilnehmerliste als PDF
                    </a>
                </div>
            </div>
        </article>
    );
}
