import Link from "next/link";

export default function DatenschutzPage() {
    return (
        <article className="min-h-screen bg-creme relative pt-32 pb-32">
            <div className="max-w-4xl mx-auto px-6 relative">
                <div className="absolute inset-x-4 inset-y-0 border border-gold-primary/20 pointer-events-none hidden md:block"></div>

                <div className="text-center mb-20 pt-10">
                    <p className="text-gray-500 font-sans text-xs tracking-[0.2em] uppercase mb-4">
                        Rechtliches
                    </p>
                    <h1 className="font-serif text-5xl md:text-6xl text-gray-900 leading-tight mb-8">
                        Datenschutzerklärung
                    </h1>
                    <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-gray-400/50 to-transparent mx-auto"></div>
                </div>

                <div className="max-w-2xl mx-auto prose prose-gray font-sans font-light leading-relaxed text-gray-800 prose-p:mb-6 prose-headings:font-serif prose-headings:text-gray-900 prose-headings:mt-12 prose-headings:mb-6 prose-headings:font-normal">
                    <h3>1. Verantwortlicher</h3>
                    <p>
                        Philosophischer Salon<br />
                        [Adresse einfügen]<br />
                        Wien, Österreich<br />
                        <Link href="/kontakt" className="text-hofburg-red hover:underline">Kontaktformular</Link>
                    </p>

                    <h3>2. Erhebung und Verarbeitung personenbezogener Daten</h3>
                    <p>
                        Wir erheben personenbezogene Daten nur dann, wenn Sie uns diese im Rahmen
                        eines Mitgliedsantrags oder einer Kontaktanfrage freiwillig übermitteln.
                    </p>

                    <h3>3. Mitgliedsantrag</h3>
                    <p>
                        Im Rahmen des Mitgliedsantrags erheben wir folgende Daten:
                    </p>
                    <ul>
                        <li>Name</li>
                        <li>Telefonnummer</li>
                        <li>Adresse (Straße, Hausnummer, PLZ, Ort, Land)</li>
                        <li>E-Mail-Adresse</li>
                        <li>Bereitschaft zur Teilnahme an der Telegram-Gruppe (optional)</li>
                    </ul>
                    <p>
                        Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie die
                        Vertragsanbahnung (Art. 6 Abs. 1 lit. b DSGVO). Die Daten werden ausschließlich zur
                        Bearbeitung Ihres Mitgliedsantrags und zur Vereinsverwaltung verwendet.
                    </p>

                    <h3>4. Speicherdauer</h3>
                    <p>
                        Ihre Daten werden so lange gespeichert, wie es für die Zwecke der Vereinsverwaltung
                        erforderlich ist bzw. gesetzliche Aufbewahrungsfristen bestehen.
                    </p>

                    <h3>5. Ihre Rechte</h3>
                    <p>
                        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung
                        sowie das Recht auf Datenübertragbarkeit. Ferner steht Ihnen ein Beschwerderecht bei der
                        zuständigen Aufsichtsbehörde (Datenschutzbehörde, Wien) zu.
                    </p>

                    <h3>6. Hosting</h3>
                    <p>
                        Diese Website wird bei [Hosting-Anbieter einfügen] gehostet. Beim Besuch der Website
                        werden automatisch Server-Logfiles erfasst (IP-Adresse, Browsertyp, Zeitpunkt des Zugriffs).
                        Dies dient der Sicherstellung eines fehlerfreien Betriebs (Art. 6 Abs. 1 lit. f DSGVO).
                    </p>

                    <h3>7. Kontakt</h3>
                    <p>
                        Bei Fragen zum Datenschutz wenden Sie sich bitte über unser{" "}
                        <Link href="/kontakt" className="text-hofburg-red hover:underline">Kontaktformular</Link> an uns.
                    </p>
                </div>
            </div>
        </article>
    );
}
