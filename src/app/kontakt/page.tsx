import { ContactForm } from "./ContactForm";
import { getUpcomingEvents } from "@/lib/mockData";
import { mockEvents } from "@/lib/mockData";

// Combine all events, marking past ones
// In a real WP setup this would fetch from the API
function getAllEventsForDropdown() {
    // For now, treat mockEvents as the full list.
    // Events with dates in the past get past=true.
    const now = new Date();
    return mockEvents.map((e) => {
        // Parse German date format "DD. Monat YYYY"
        const months: Record<string, number> = {
            Januar: 0, Februar: 1, März: 2, April: 3, Mai: 4, Juni: 5,
            Juli: 6, August: 7, September: 8, Oktober: 9, November: 10, Dezember: 11,
        };
        let past = false;
        const match = e.date.match(/(\d+)\.\s+(\w+)\s+(\d{4})/);
        if (match) {
            const day = parseInt(match[1]);
            const month = months[match[2]] ?? 0;
            const year = parseInt(match[3]);
            past = new Date(year, month, day) < now;
        }
        return { id: e.id, title: e.title, date: e.date, past };
    });
}

export default async function KontaktPage() {
    const events = getAllEventsForDropdown();

    return (
        <article className="min-h-screen bg-creme relative pt-32 pb-32">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-hofburg-red font-sans text-sm tracking-widest uppercase mb-4 font-semibold">
                        Kontakt
                    </p>
                    <h1 className="font-serif text-5xl md:text-6xl text-gray-900 leading-tight mb-8">
                        Schreiben Sie uns
                    </h1>
                    <div className="w-24 h-[1px] bg-gold-primary/50 mx-auto mb-8"></div>
                    <p className="font-sans font-light text-gray-600 text-lg max-w-xl mx-auto">
                        Haben Sie eine Frage zu einer Veranstaltung oder ein allgemeines Anliegen?
                        Wir freuen uns über Ihre Nachricht.
                    </p>
                </div>

                <div className="max-w-lg mx-auto">
                    <ContactForm events={events} />
                </div>
            </div>
        </article>
    );
}
