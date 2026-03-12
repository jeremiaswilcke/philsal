import Link from "next/link";
import { getUpcomingEvents } from "@/lib/mockData";

export default async function VeranstaltungenArchive() {
    const events = await getUpcomingEvents();

    return (
        <main className="min-h-screen bg-creme pb-32">
            <div className="pt-24 pb-16 px-6 max-w-4xl mx-auto text-center border-b border-gray-200/50">
                <h1 className="font-serif text-5xl md:text-6xl text-gray-900 mb-6 tracking-wide">
                    Veranstaltungen
                </h1>
                <p className="font-sans text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                    Eine Übersicht unseres aktuellen und zukünftigen Programms. Diskutieren Sie mit uns über Philosophie, Kunst und Zeitgeschehen im Salon.
                </p>
            </div>

            <div className="max-w-4xl mx-auto px-6 pt-16 mt-8">
                {events.length > 0 ? (
                    <div className="space-y-12">
                        {events.map((event) => (
                            <Link key={event.id} href={event.url || "#"} className="flex flex-col md:flex-row gap-8 group">

                                <div className="md:w-1/3 shrink-0">
                                    <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden relative border border-gold-primary/20">
                                        {event.imageUrl ? (
                                            <img
                                                src={event.imageUrl}
                                                alt={event.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-creme">
                                                <span className="text-gold-primary/40 font-serif italic text-4xl">P</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gold-primary/0 group-hover:bg-gold-primary/10 transition-colors duration-300" />
                                    </div>
                                </div>

                                <div className="md:w-2/3 flex flex-col justify-center">
                                    <p className="text-gold-dark font-sans text-xs tracking-widest uppercase mb-3">
                                        {event.date} {event.time && ` | ${event.time}`}
                                    </p>
                                    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 group-hover:text-gold-dark transition-colors leading-snug">
                                        {event.title}
                                    </h2>
                                    <p className="font-sans text-gray-600 line-clamp-3 font-light leading-relaxed mb-6">
                                        {event.excerpt}
                                    </p>
                                    <span className="inline-flex items-center text-sm font-sans text-gray-800 uppercase tracking-widest group-hover:text-gold-dark transition-colors">
                                        Mehr erfahren
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14" />
                                            <path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>

                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="font-serif italic text-2xl text-gray-500">
                            Derzeit sind keine Veranstaltungen geplant.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
