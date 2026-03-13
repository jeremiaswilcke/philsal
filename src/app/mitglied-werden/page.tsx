import { MemberForm } from "./MemberForm";

export default function MitgliedWerdenPage() {
    return (
        <article className="min-h-screen bg-creme relative pt-32 pb-32">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-hofburg-red font-sans text-sm tracking-widest uppercase mb-4 font-semibold">
                        Mitgliedschaft
                    </p>
                    <h1 className="font-serif text-5xl md:text-6xl text-gray-900 leading-tight mb-8">
                        Mitglied werden
                    </h1>
                    <div className="w-24 h-[1px] bg-gold-primary/50 mx-auto mb-8"></div>
                    <p className="font-sans font-light text-gray-600 text-lg max-w-xl mx-auto">
                        Werden Sie Teil des Philosophischen Salons und unterstützen Sie einen Raum
                        für freien Diskurs und tiefgreifende Auseinandersetzung.
                    </p>
                </div>

                <div className="max-w-lg mx-auto">
                    <MemberForm />
                </div>
            </div>
        </article>
    );
}
