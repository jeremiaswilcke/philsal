"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
    logoText?: string;
    logoImageUrl?: string;
}

export function Header({ logoText = "Philosophischer Salon", logoImageUrl }: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Startseite" },
        { href: "/veranstaltungen", label: "Veranstaltungen" },
        { href: "/nachberichte", label: "Nachberichte" },
    ];

    return (
        <header className="w-full bg-creme/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-4 group">
                    {logoImageUrl ? (
                        <Image
                            src={logoImageUrl}
                            alt={logoText}
                            width={40}
                            height={40}
                            className="w-10 h-10 object-contain"
                            priority
                        />
                    ) : (
                        <div className="w-8 h-8 rounded bg-gray-dark flex items-center justify-center text-creme font-serif font-bold text-lg group-hover:bg-gold-primary transition-colors">
                            {logoText.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <span className="font-serif text-xl tracking-wider text-gray-dark uppercase pt-1">
                        {logoText}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-gray-500 hover:text-gold-dark transition-colors text-sm uppercase tracking-widest"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Hamburger Toggle (Mobile) */}
                <button
                    className="flex md:hidden flex-col justify-center items-center w-10 h-10 gap-1.5 z-[101]"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menü"
                    aria-expanded={menuOpen}
                >
                    <span
                        className={`block w-[22px] h-[2px] bg-gray-dark transition-all duration-300 ${
                            menuOpen ? "rotate-45 translate-y-[5px]" : ""
                        }`}
                    />
                    <span
                        className={`block w-[22px] h-[2px] bg-gray-dark transition-all duration-300 ${
                            menuOpen ? "opacity-0" : ""
                        }`}
                    />
                    <span
                        className={`block w-[22px] h-[2px] bg-gray-dark transition-all duration-300 ${
                            menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
                        }`}
                    />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div className="md:hidden fixed inset-0 top-20 bg-creme/95 backdrop-blur-lg z-40">
                    <nav className="flex flex-col items-center justify-center gap-8 pt-16">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-dark hover:text-gold-dark transition-colors text-lg uppercase tracking-widest font-serif"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="w-16 h-[1px] bg-gold-primary/50 my-4"></div>
                        <Link
                            href="/mitglied-werden"
                            onClick={() => setMenuOpen(false)}
                            className="px-8 py-3 bg-hofburg-red text-creme font-sans text-sm tracking-widest uppercase hover:bg-opacity-90 transition-colors"
                        >
                            Mitglied werden
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
