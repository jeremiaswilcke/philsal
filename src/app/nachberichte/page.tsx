import Link from "next/link";
import { getReports } from "@/lib/wp";

export default async function NachberichteArchive() {
    const reports = await getReports();

    return (
        <main className="min-h-screen bg-creme pb-32">
            <div className="pt-24 pb-16 px-6 max-w-5xl mx-auto text-center">
                <p className="text-hofburg-red font-sans text-sm tracking-widest uppercase mb-4 font-semibold">Rückblicke</p>
                <h1 className="font-serif text-5xl md:text-6xl text-gray-900 mb-6 tracking-wide">
                    Nachschauen
                </h1>
                <p className="font-sans text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                    Rückblicke, Zusammenfassungen und Dokumentationen unserer vergangenen Salons.
                </p>
                <div className="w-24 h-[1px] bg-gold-primary/50 mx-auto mt-8"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-8">
                {reports.length > 0 ? (
                    <div className="space-y-12">
                        {reports.map((item, i) => (
                            <Link
                                key={item.id}
                                href={item.url}
                                className={`group block overflow-hidden rounded-sm border border-gold-primary/20 hover:border-gold-primary/40 transition-colors ${
                                    i % 2 === 0 ? "" : ""
                                }`}
                            >
                                <div className={`grid grid-cols-1 md:grid-cols-2 ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
                                    {/* Image — alternating left/right */}
                                    <div className={`aspect-[4/3] md:aspect-auto overflow-hidden bg-gray-100 relative ${
                                        i % 2 === 1 ? "md:order-2" : ""
                                    }`}>
                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 min-h-[300px]">
                                                <span className="text-gold-primary/30 font-serif italic text-6xl">P</span>
                                            </div>
                                        )}
                                        {/* Date badge */}
                                        <div className="absolute top-4 left-4 bg-creme/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                                            <span className="text-xs font-sans text-gray-600 uppercase tracking-widest">{item.date}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className={`flex flex-col justify-center p-8 md:p-12 bg-white/30 ${
                                        i % 2 === 1 ? "md:order-1" : ""
                                    }`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="h-[1px] w-6 bg-hofburg-red" />
                                            <span className="text-hofburg-red font-sans text-xs tracking-[0.2em] uppercase">Nachbericht</span>
                                        </div>
                                        <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 group-hover:text-gold-dark transition-colors leading-tight">
                                            {item.title}
                                        </h2>
                                        <p className="font-sans text-gray-600 font-light leading-relaxed mb-6 line-clamp-3">
                                            {item.excerpt}
                                        </p>
                                        <span className="inline-flex items-center text-sm font-sans text-gray-800 uppercase tracking-widest group-hover:text-gold-dark transition-colors">
                                            Bericht lesen
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="font-serif italic text-2xl text-gray-500">
                            Noch keine Nachberichte vorhanden.
                        </p>
                        <p className="font-sans text-gray-400 mt-4">
                            Nach unseren ersten Veranstaltungen finden Sie hier ausführliche Rückblicke.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
