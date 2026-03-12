import Link from "next/link";
import { getEvents } from "@/lib/wp";

export default async function VeranstaltungenArchive() {
    const events = await getEvents();

    return (
        <main className="min-h-screen bg-creme pb-32">
            <div className="pt-24 pb-16 px-6 max-w-5xl mx-auto text-center">
                <p className="text-hofburg-red font-sans text-sm tracking-widest uppercase mb-4 font-semibold">Programm</p>
                <h1 className="font-serif text-5xl md:text-6xl text-gray-900 mb-6 tracking-wide">
                    Veranstaltungen
                </h1>
                <p className="font-sans text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                    Diskutieren Sie mit uns über Philosophie, Kunst und Zeitgeschehen.
                </p>
                <div className="w-24 h-[1px] bg-gold-primary/50 mx-auto mt-8"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-8">
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {events.map((event, i) => (
                            <Link
                                key={event.id}
                                href={event.url}
                                className={`group relative overflow-hidden rounded-sm ${
                                    i === 0 ? "md:col-span-2" : ""
                                }`}
                            >
                                {/* Image */}
                                <div className={`w-full overflow-hidden bg-gray-dark relative ${
                                    i === 0 ? "aspect-[21/9]" : "aspect-[3/2]"
                                }`}>
                                    {event.imageUrl ? (
                                        <img
                                            src={event.imageUrl}
                                            alt={event.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-gold-primary/20 font-serif italic text-8xl">P</span>
                                        </div>
                                    )}
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-dark via-gray-dark/40 to-transparent" />

                                    {/* Content on image */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="h-[1px] w-6 bg-gold-primary" />
                                            <span className="text-gold-primary font-sans text-xs tracking-[0.2em] uppercase">
                                                {event.date} {event.time && `| ${event.time}`}
                                            </span>
                                        </div>
                                        <h2 className={`font-serif text-creme leading-tight mb-3 ${
                                            i === 0 ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"
                                        }`}>
                                            {event.title}
                                        </h2>
                                        {event.excerpt && (
                                            <p className={`font-sans text-gray-300 font-light line-clamp-2 max-w-2xl ${
                                                i === 0 ? "text-base md:text-lg" : "text-sm"
                                            }`}>
                                                {event.excerpt}
                                            </p>
                                        )}
                                        {event.location && (
                                            <p className="text-gold-light/70 font-sans text-xs uppercase tracking-widest mt-4">
                                                {event.location}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="font-serif italic text-2xl text-gray-500">
                            Derzeit sind keine Veranstaltungen geplant.
                        </p>
                        <p className="font-sans text-gray-400 mt-4">
                            <Link href="/kontakt" className="text-hofburg-red hover:underline">Kontaktieren Sie uns</Link> für Informationen zum kommenden Programm.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
