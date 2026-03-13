import Link from "next/link";

export default function ImpressumPage() {
    return (
        <article className="min-h-screen bg-creme relative pt-32 pb-32">
            <div className="max-w-4xl mx-auto px-6 relative">
                <div className="absolute inset-x-4 inset-y-0 border border-gold-primary/20 pointer-events-none hidden md:block"></div>

                <div className="text-center mb-20 pt-10">
                    <p className="text-gray-500 font-sans text-xs tracking-[0.2em] uppercase mb-4">
                        Rechtliches
                    </p>
                    <h1 className="font-serif text-5xl md:text-6xl text-gray-900 leading-tight mb-8">
                        Impressum
                    </h1>
                    <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-gray-400/50 to-transparent mx-auto"></div>
                </div>

                <div className="max-w-2xl mx-auto prose prose-gray font-sans font-light leading-relaxed text-gray-800 prose-p:mb-6 prose-headings:font-serif prose-headings:text-gray-900 prose-headings:mt-12 prose-headings:mb-6 prose-headings:font-normal">
                    <h3>Angaben gemäß § 25 MedienG</h3>
                    <p>
                        Philosophischer Salon<br />
                        [Adresse einfügen]<br />
                        Wien, Österreich
                    </p>

                    <h3>Vereinsregister</h3>
                    <p>ZVR-Zahl: [ZVR-Zahl einfügen]</p>

                    <h3>Kontakt</h3>
                    <p>
                        <Link href="/kontakt" className="text-hofburg-red hover:underline">Zum Kontaktformular</Link>
                    </p>

                    <h3>Verantwortlich für den Inhalt</h3>
                    <p>
                        [Name des Obmanns / der Obfrau einfügen]<br />
                        Philosophischer Salon
                    </p>

                    <h3>Haftungshinweis</h3>
                    <p>
                        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.
                        Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
                    </p>
                </div>
            </div>
        </article>
    );
}
