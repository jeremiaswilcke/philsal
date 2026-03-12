import Link from "next/link";
import { getLatestNews } from "@/lib/mockData";

export default async function NeuigkeitenArchive() {
    const news = await getLatestNews();

    return (
        <main className="min-h-screen bg-creme pb-32">
            <div className="pt-24 pb-16 px-6 max-w-5xl mx-auto text-center border-b border-gray-200/50">
                <h1 className="font-serif text-5xl md:text-6xl text-gray-900 mb-6 tracking-wide">
                    Neuigkeiten & Blog
                </h1>
                <p className="font-sans text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                    Aktuelle Beiträge, Einblicke in unsere Arbeit und philosophische Essays unserer Mitglieder.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-16 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {news.map((item) => (
                        <Link key={item.id} href={item.url} className="group flex flex-col items-start">
                            {/* Image Wrapper */}
                            <div className="w-full aspect-[4/3] bg-gray-100 mb-6 overflow-hidden rounded-sm relative">
                                {item.imageUrl ? (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <span className="text-gray-400 font-serif italic text-2xl">P</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gold-primary/0 group-hover:bg-gold-primary/10 transition-colors duration-300" />
                            </div>

                            {/* Content */}
                            <p className="text-xs font-sans text-gray-500 mb-3 tracking-widest uppercase">
                                {item.date}
                            </p>
                            <h2 className="font-serif text-2xl text-gray-900 mb-4 group-hover:text-gold-dark transition-colors leading-snug">
                                {item.title}
                            </h2>
                            <p className="font-sans text-sm text-gray-600 line-clamp-3 font-light leading-relaxed mb-4">
                                {item.excerpt}
                            </p>
                            <span className="mt-auto text-sm font-sans text-gold-dark hover:text-gold-primary transition-colors flex items-center pt-2">
                                Weiterlesen
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
