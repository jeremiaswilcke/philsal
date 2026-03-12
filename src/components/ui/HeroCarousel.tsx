"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

interface Slide {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    link?: string;
    linkText?: string;
}

const defaultSlides: Slide[] = [
    {
        id: "s1",
        title: "Der Salon öffnet seine Pforten",
        subtitle: "Ein physischer und intellektueller Raum für den echten Diskurs.",
        imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop",
        link: "/neuigkeiten/der-salon-oeffnet",
        linkText: "Mehr erfahren"
    },
    {
        id: "s2",
        title: "Vorlesung: Die Wiener Moderne",
        subtitle: "Eine Reflexion über Josef Hoffmann und das Fin de Siècle.",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        link: "/veranstaltungen",
        linkText: "Zum Programm"
    },
    {
        id: "s3",
        title: "Mitglied werden",
        subtitle: "Unterstützen Sie unabhängige Diskurse im Salon.",
        imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop",
        link: "/verein",
        linkText: "Zu den Statuten"
    }
];

export function HeroCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, [
        Autoplay({ delay: 6000, stopOnInteraction: true }),
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <div className="relative w-full overflow-hidden bg-gray-dark" ref={emblaRef}>
            <div className="flex touch-pan-y">
                {defaultSlides.map((slide, index) => (
                    <div
                        className="relative flex-[0_0_100%] min-w-0 h-[50vh] min-h-[400px] max-h-[600px]"
                        key={slide.id}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 w-full h-full">
                            <img
                                src={slide.imageUrl}
                                alt={slide.title}
                                className="w-full h-full object-cover grayscale mix-blend-multiply opacity-70 scale-105 transition-transform duration-[10000ms] ease-linear"
                                style={{
                                    transform: selectedIndex === index ? "scale(1)" : "scale(1.05)",
                                }}
                            />
                        </div>

                        {/* Content overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-dark/80 via-transparent to-transparent" />

                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 max-w-7xl mx-auto w-full">
                            <div
                                className="transition-all duration-1000 transform"
                                style={{
                                    opacity: selectedIndex === index ? 1 : 0,
                                    transform: selectedIndex === index ? "translateY(0)" : "translateY(20px)",
                                }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-[1px] w-8 bg-gold-primary" />
                                    <span className="text-gold-primary font-sans text-xs tracking-[0.2em] uppercase">
                                        Aktuelles
                                    </span>
                                </div>
                                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-creme leading-tight mb-4 max-w-3xl">
                                    {slide.title}
                                </h2>
                                <p className="font-sans text-gray-300 md:text-lg max-w-2xl mb-8 font-light">
                                    {slide.subtitle}
                                </p>
                                {slide.link && slide.linkText && (
                                    <Link
                                        href={slide.link}
                                        className="inline-block px-6 py-3 border border-gold-primary text-creme font-sans text-sm tracking-widest uppercase hover:bg-gold-primary hover:text-gray-dark transition-colors"
                                    >
                                        {slide.linkText}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress / Dot Indicators */}
            <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-3">
                {defaultSlides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => emblaApi?.scrollTo(i)}
                        className={`w-12 h-1 rounded-full overflow-hidden transition-all duration-300 ${selectedIndex === i ? "bg-gold-primary" : "bg-white/20 hover:bg-white/40"
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
