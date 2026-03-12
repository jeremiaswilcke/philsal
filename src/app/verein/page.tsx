import Link from "next/link";
import { getPageData } from "@/lib/mockData";
import { sanitizeHtml } from "@/lib/sanitize";

export default async function VereinPage() {
    const data = await getPageData("verein");

    return (
        <article className="min-h-screen bg-creme relative pt-32 pb-32">
            {/* Document Frame styling */}
            <div className="max-w-4xl mx-auto px-6 relative">

                {/* The outer document border (very faint hairline) */}
                <div className="absolute inset-x-4 inset-y-0 border border-gold-primary/20 pointer-events-none hidden md:block"></div>

                <div className="text-center mb-20 pt-10">
                    <span className="inline-block w-8 h-8 rounded-full border border-hofburg-red mb-6 flex items-center justify-center">
                        <span className="w-4 h-4 bg-gold-primary/20 rounded-full"></span>
                    </span>
                    <p className="text-gray-500 font-sans text-xs tracking-[0.2em] uppercase mb-4">
                        Die Statuten & Der Zweck
                    </p>
                    <h1 className="font-serif text-5xl md:text-6xl text-gray-900 leading-tight mb-8">
                        {data.title}
                    </h1>

                    <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-gray-400/50 to-transparent mx-auto"></div>
                </div>

                {/* Clean Document Flow Content */}
                <div className="
                max-w-2xl mx-auto
                prose prose-gray font-sans font-light leading-relaxed text-gray-800 
                prose-p:mb-6 prose-p:text-justify
                prose-headings:font-serif prose-headings:text-gray-900 prose-headings:text-center prose-headings:mt-16 prose-headings:mb-8 prose-headings:font-normal
                prose-li:marker:text-gold-primary
            ">
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.content) }} />
                </div>

                {/* Apple UX Forms / CTA at the end of the document */}
                <div className="max-w-2xl mx-auto mt-32">
                    <div className="bento-card p-10 md:p-14 text-center">
                        <h3 className="font-serif text-3xl text-gray-900 mb-4">Teil des Diskurses werden</h3>
                        <p className="font-sans text-gray-600 mb-8 font-light">
                            Wir laden Freigeister, Denker und Literaturliebhaber ein, den Philosophischen Salon als förderndes Mitglied zu unterstützen und dadurch einen Raum der freien Rede zu manifestieren.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/mitglied-werden" className="px-8 py-3 bg-hofburg-red text-creme font-sans text-sm tracking-widest uppercase hover:bg-opacity-90 transition-colors">
                                Mitgliedsantrag
                            </Link>
                            <Link href="/spenden" className="px-8 py-3 bg-transparent border border-gray-dark text-gray-dark font-sans text-sm tracking-widest uppercase hover:bg-gray-dark hover:text-creme transition-colors">
                                Freie Spende
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </article>
    );
}
