import { WWDConfig, WWDEvent, WWDNews } from "./types";

export const mockConfig: WWDConfig = {
    logoText: "Philosophischer Salon",
    logoImageUrl: "/logo.png",
    heroTitle: "Philosophischer Salon",
    heroSubtitle: "Ein Raum für freien Diskurs, tiefgreifende Gedanken und den Austausch über die drängenden Fragen unserer Zeit.",
    contactEmail: "kontakt@philosophischer-salon.at"
};

export const mockEvents: WWDEvent[] = [
    {
        id: "e1",
        title: "Über das Wesen der Technik",
        date: "24. November 2026",
        time: "19:00 Uhr",
        excerpt: "Ein philosophischer Abend über die Rolle der Technologie in unserem Leben.",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=200&auto=format&fit=crop",
        url: "/veranstaltungen/wesen-der-technik"
    },
    {
        id: "e2",
        title: "Ethik der künstlichen Intelligenz",
        date: "05. Dezember 2026",
        time: "18:30 Uhr",
        excerpt: "Debatte zur Verantwortung und Moral von Algorithmen.",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=200&auto=format&fit=crop",
        url: "/veranstaltungen/ethik-der-ki"
    }
];

export const mockNews: WWDNews[] = [
    {
        id: "n1",
        title: "Der Salon öffnet seine Pforten",
        date: "15. Oktober 2026",
        excerpt: "Wir freuen uns, die feierliche Gründung des Philosophischen Salons bekanntzugeben. Ein Ort für jene, die den echten Diskurs suchen.",
        imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop",
        url: "/neuigkeiten/gruendung"
    },
    {
        id: "n2",
        title: "Aufruf zur Mitgliedschaft",
        date: "02. November 2026",
        excerpt: "Unterstützen Sie uns dabei, eine Plattform für tiefgreifende philosophische und gesellschaftliche Themen zu schaffen.",
        imageUrl: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=600&auto=format&fit=crop",
        url: "/verein"
    },
    {
        id: "n3",
        title: "Erste Veranstaltungsreihe in Planung",
        date: "10. Dezember 2026",
        excerpt: "Das Kuratorium arbeitet intensiv am Programm für das kommende Jahr. Freuen Sie sich auf spannende Vorträge und Debatten.",
        imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop",
        url: "/neuigkeiten/planung"
    }
];

// Add mock page data for the static content pages
const mockPages: Record<string, { title: string; content: string; imageUrl?: string }> = {
    "ueber-uns": {
        title: "Über den Philosophischen Salon",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        content: `
            <p>Die fortschreitende Technologisierung durchdringt alle Lebensbereiche. Doch was bedeutet "Technik" eigentlich in ihrem tiefsten Wesen? In Anlehnung an klassische und zeitgenössische Denker widmen wir uns an diesem Abend der Frage, ob Technik lediglich ein neutrales Werkzeug ist oder ob sie unsere Art, in der Welt zu sein, fundamental verändert.</p>
            <p>Der Philosophische Salon ist kein Ort der stillen Belehrung, sondern der geteilten Erkenntnis. Wir glauben daran, dass die drängenden Fragen unserer Zeit – sei es die Rolle der Technologie, die Natur des Bewusstseins oder die Konstruktion unserer gesellschaftlichen Wirklichkeit – nicht im luftleeren Raum akademischer Publikationen beantwortet werden können. Sie verlangen nach dem lebendigen, respektvollen und intellektuell rigiden Austausch von Angesicht zu Angesicht.</p>
            <blockquote>"Die Sprache ist das Haus des Seins. In ihrer Behausung wohnt der Mensch." – Eine Erinnerung daran, dass unser Sprechen unsere Welt formt.</blockquote>
            <p>Unsere Veranstaltungen bringen Menschen unterschiedlichster Disziplinen zusammen. Ob Künstler, Technologen, Akademiker oder neugierige Bürger: Was uns eint, ist der Hunger nach dem Unbequemen, nach dem tieferen Verständnis dessen, was unsere Realität zusammenhält.</p>
        `
    },
    "verein": {
        title: "Statuten des Vereins",
        content: `
            <h3>§ 1: Name, Sitz und Tätigkeitsbereich</h3>
            <p>Der Verein führt den Namen "Philosophischer Salon". Er hat seinen Sitz in Wien und erstreckt seine Tätigkeit auf das gesamte Bundesgebiet Österreichs sowie den deutschsprachigen Raum.</p>
            <h3>§ 2: Zweck</h3>
            <p>Der Verein, dessen Tätigkeit nicht auf Gewinn gerichtet ist, bezweckt die Förderung philosophischer Diskurskultur, der klassischen Geisteswissenschaften sowie der transdisziplinären Auseinandersetzung mit Gegenwartsfragen. Dies geschieht vorrangig durch die Abhaltung moderierter Salons, Vorträge und Lesungen.</p>
            <h3>§ 3: Mittel zur Erreichung des Vereinszwecks</h3>
            <p>Der Vereinszweck soll durch die in den folgenden Absätzen angeführten ideellen und materiellen Mittel erreicht werden. Als ideelle Mittel dienen Vorlesungen, Seminare, Versammlungen (Salons), Diskussionsabende und die Herausgabe von Publikationen.</p>
            <p>Die erforderlichen materiellen Mittel sollen aufgebracht werden durch Beitrittsgebühren, Mitgliedsbeiträge, Erträgnisse aus Veranstaltungen, Spenden, Sammlungen, Vermächtnisse und sonstige Zuwendungen.</p>
        `
    }
}

// Helper functions that simulate reading from the JSONs WWD creates in the public folder
export async function getSiteConfig(): Promise<WWDConfig> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockConfig;
}

export async function getUpcomingEvents(): Promise<WWDEvent[]> { // Changed SalonEvent to WWDEvent to match import
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockEvents;
}

export async function getLatestNews(): Promise<WWDNews[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockNews;
}

export async function getPageData(slug: string): Promise<{ title: string; content: string; imageUrl?: string }> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockPages[slug] || { title: "Seite nicht gefunden", content: "<p>Inhalt nicht gefunden.</p>" };
}
