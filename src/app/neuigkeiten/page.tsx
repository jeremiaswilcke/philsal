import Link from "next/link";
import { getNews } from "@/lib/wp";

export default async function NeuigkeitenArchive() {
    const news = await getNews();

    // First item featured, rest in grid
    const featured = news[0];
    const rest = news.slice(1);

    return (
        <main className="min-h-screen bg-creme pb-32">
            <div className="pt-24 pb-16 px-6 max-w-5xl mx-auto text-center">
                <p className="text-hofburg-red font-sans text-sm tracking-widest uppercase mb-4 font-semibold">Journal</p>
                <h1 className="font-serif text-5xl md:text-6xl text-gray-900 mb-6 tracking-wide">
                    Neuigkeiten
                </h1>
                <p className="font-sans text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                    Aktuelle Beiträge, Einblicke in unsere Arbeit und philosophische Essays.
                </p>
                <div className="w-24 h-[1px] bg-gold-primary/50 mx-auto mt-8"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-8">
                {/* Featured article — full width */}
                {featured && (
                    <Link href={featured.url} className="group block mb-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-sm border border-gold-primary/20">
                            <div className="aspect-[4/3] md:aspect-auto bg-gray-100 overflow-hidden relative">
                                {featured.imageUrl ? (
                                    <img
                                        src={featured.imageUrl}
                                        alt={featured.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <span className="text-gold-primary/30 font-serif italic text-6xl">P</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col justify-center p-8 md:p-12 bg-white/40">
                                <p className="text-xs font-sans text-gold-dark mb-4 tracking-widest uppercase">{featured.date}</p>
                                <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4 group-hover:text-gold-dark transition-colors leading-tight">
                                    {featured.title}
                                </h2>
                                <p className="font-sans text-gray-600 font-light leading-relaxed mb-6 line-clamp-3">
                                    {featured.excerpt}
                                </p>
                                <span className="inline-flex items-center text-sm font-sans text-gray-800 uppercase tracking-widest group-hover:text-gold-dark transition-colors">
                                    Weiterlesen
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Remaining articles — masonry-style staggered grid */}
                {rest.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                        {rest.map((item, i) => (
                            <Link
                                key={item.id}
                                href={item.url}
                                className={`group flex flex-col ${i % 3 === 1 ? "md:mt-8" : ""}`}
                            >
                                <div className="w-full aspect-[4/3] bg-gray-100 mb-5 overflow-hidden rounded-sm relative">
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                            <span className="text-gray-400 font-serif italic text-2xl">P</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gold-primary/0 group-hover:bg-gold-primary/10 transition-colors duration-300" />
                                </div>
                                <p className="text-xs font-sans text-gray-500 mb-2 tracking-widest uppercase">{item.date}</p>
                                <h3 className="font-serif text-xl text-gray-900 mb-3 group-hover:text-gold-dark transition-colors leading-snug">
                                    {item.title}
                                </h3>
                                <p className="font-sans text-sm text-gray-600 line-clamp-3 font-light leading-relaxed">
                                    {item.excerpt}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
