export default function SpendenPage() {
    return (
        <article className="min-h-screen bg-creme relative pt-32 pb-32">
            <div className="max-w-4xl mx-auto px-6 relative">
                <div className="text-center mb-20">
                    <p className="text-hofburg-red font-sans text-sm tracking-widest uppercase mb-4 font-semibold">
                        Unterstützung
                    </p>
                    <h1 className="font-serif text-5xl md:text-6xl text-gray-900 leading-tight mb-8">
                        Spenden
                    </h1>
                    <div className="w-24 h-[1px] bg-gold-primary/50 mx-auto"></div>
                </div>

                <div className="max-w-2xl mx-auto">
                    <p className="font-sans font-light text-gray-700 text-lg leading-relaxed mb-12 text-center">
                        Der Philosophische Salon lebt vom Engagement seiner Unterstützer.
                        Mit Ihrer Spende tragen Sie dazu bei, einen Raum für freien Diskurs
                        und tiefgreifende Auseinandersetzung zu erhalten.
                    </p>

                    <div className="bento-card p-10 md:p-14 text-center">
                        <h3 className="font-serif text-3xl text-gray-900 mb-6">Bankverbindung</h3>
                        <div className="font-sans text-gray-700 space-y-2">
                            <p><span className="text-gray-500 text-sm uppercase tracking-wider">Kontoinhaber:</span><br />Philosophischer Salon</p>
                            <p><span className="text-gray-500 text-sm uppercase tracking-wider">IBAN:</span><br />[IBAN einfügen]</p>
                            <p><span className="text-gray-500 text-sm uppercase tracking-wider">BIC:</span><br />[BIC einfügen]</p>
                            <p><span className="text-gray-500 text-sm uppercase tracking-wider">Verwendungszweck:</span><br />Spende Philosophischer Salon</p>
                        </div>
                    </div>

                    <p className="font-sans text-gray-500 text-sm text-center mt-8">
                        Der Philosophische Salon ist ein gemeinnütziger Verein.
                        Für Fragen{" "}
                        <a href="/kontakt" className="text-hofburg-red hover:underline">
                            kontaktieren Sie uns
                        </a>.
                    </p>
                </div>
            </div>
        </article>
    );
}
