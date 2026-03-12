"use client";

import Link from "next/link";
import { WWDNews } from "@/lib/types";

interface NewsGridProps {
    news: WWDNews[];
}

export function NewsGrid({ news }: NewsGridProps) {
    if (!news || news.length === 0) return null;

    // Ensure we only show maximum 3
    const latestNews = news.slice(0, 3);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-3xl text-gray-800">Neuigkeiten</h2>
                <Link href="/neuigkeiten" className="text-sm font-sans text-gold-dark hover:text-gold-primary transition-colors flex items-center">
                    Alle Beiträge ansehen
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestNews.map((item) => (
                    <Link key={item.id} href={item.url} className="group flex flex-col items-start mt-4 md:mt-0">
                        {/* Image Wrapper */}
                        <div className="w-full aspect-[4/3] bg-gray-100 mb-5 overflow-hidden rounded-sm relative">
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
                        <p className="text-xs font-sans text-gray-500 mb-2 tracking-widest uppercase">
                            {item.date}
                        </p>
                        <h3 className="font-serif text-xl text-gray-900 mb-3 group-hover:text-gold-dark transition-colors leading-snug">
                            {item.title}
                        </h3>
                        <p className="font-sans text-sm text-gray-600 line-clamp-3 font-light leading-relaxed">
                            {item.excerpt}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
