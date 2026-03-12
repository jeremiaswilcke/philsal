import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full bg-gray-dark text-gray-400 py-16">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                    <Link href="/mitglied-werden" className="px-8 py-3 bg-transparent border border-gray-500 text-creme hover:bg-white/10 hover:border-white transition-all text-sm tracking-wide font-medium">
                        Mitglied werden
                    </Link>
                    <Link href="/spenden" className="px-8 py-3 bg-transparent border border-gray-500 text-creme hover:bg-white/10 hover:border-white transition-all text-sm tracking-wide font-medium">
                        Spenden
                    </Link>
                </div>

                <div className="w-full border-t border-gray-800 mb-8 max-w-2xl"></div>

                {/* Fast Links */}
                <div className="flex gap-8 mb-6 text-sm font-light">
                    <Link href="/impressum" className="hover:text-white transition-colors">
                        Impressum
                    </Link>
                    <Link href="/datenschutz" className="hover:text-white transition-colors">
                        Datenschutz
                    </Link>
                </div>

                {/* Copyright */}
                <p className="text-xs font-light text-gray-600">
                    © {new Date().getFullYear()} Philosophischer Salon
                </p>

            </div>
        </footer>
    );
}
