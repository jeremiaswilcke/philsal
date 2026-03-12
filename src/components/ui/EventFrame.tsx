"use client";

import Link from "next/link";

// Fallback to simple SVG for Calendar icon
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
        <path d="M8 18h.01" />
        <path d="M12 18h.01" />
        <path d="M16 18h.01" />
    </svg>
);

// Define type for an Event (based on what we expect from WWD/WP)
export interface SalonEvent {
    id: string;
    title: string;
    date: string;
    time?: string;
    excerpt?: string;
    imageUrl?: string;
    url: string;
}

interface EventFrameProps {
    events?: SalonEvent[];
}

export function EventFrame({ events = [] }: EventFrameProps) {
    // For the start, we simulate the state where no events are planned as requested by the user's screenshot
    const hasEvents = events.length > 0;

    return (
        <div className="w-full golden-border bg-white/50 backdrop-blur-sm p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center text-center shadow-sm">

            {/* Small golden diamond/star ornament at the top */}
            <div className="mb-6 flex justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#C5A869" />
                </svg>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl text-gray-dark tracking-wide uppercase mb-3">
                Philosophischer Salon
            </h2>

            <p className="font-serif italic text-xl md:text-2xl text-gray-500 mb-10">
                Programm:
            </p>

            {hasEvents ? (
                <div className="w-full max-w-2xl text-left space-y-8 mb-12">
                    {events.map((event) => (
                        <Link href={event.url} key={event.id} className="flex gap-6 border-b border-gray-200/60 pb-6 group">
                            {/* Thumbnail */}
                            {event.imageUrl ? (
                                <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold-primary overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ) : (
                                <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold-primary/30 bg-creme flex items-center justify-center shadow-sm">
                                    <span className="text-gold-primary font-serif italic text-xl">P</span>
                                </div>
                            )}

                            {/* Content */}
                            <div className="flex-grow pt-1">
                                <h3 className="font-serif text-xl md:text-2xl text-gray-800 leading-tight group-hover:text-gold-dark transition-colors">
                                    {event.title}
                                </h3>
                                <p className="text-gray-500 font-sans text-xs md:text-sm mt-2 tracking-widest uppercase">
                                    {event.date} {event.time && `| ${event.time}`}
                                </p>
                                {event.excerpt && (
                                    <p className="text-gray-600 mt-3 text-sm md:text-base leading-relaxed font-light">
                                        {event.excerpt}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="font-serif italic text-lg text-gray-500 mb-12">
                    Derzeit sind keine Veranstaltungen geplant.
                </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/veranstaltungen" className="px-6 py-2 border border-gold-primary text-gray-800 font-sans font-medium text-sm hover:bg-gold-light/10 transition-colors">
                    Alle Veranstaltungen
                </Link>
                <a href="/api/calendar" className="px-6 py-2 border border-gold-primary text-gray-800 font-sans font-medium text-sm hover:bg-gold-light/10 transition-colors flex items-center">
                    <CalendarIcon />
                    Kalender abonnieren
                </a>
            </div>
        </div>
    );
}
