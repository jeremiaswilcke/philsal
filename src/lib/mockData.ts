import { WWDConfig, WWDEvent, WWDNews, WWDReport, WWDPage } from "./types";

export const mockConfig: WWDConfig = {
    logoText: "Philosophischer Salon",
    logoImageUrl: "/logo.png",
    heroTitle: "Philosophischer Salon",
    heroSubtitle: "Ein Raum für freien Diskurs, tiefgreifende Gedanken und den Austausch über die drängenden Fragen unserer Zeit.",
    contactEmail: "kontakt@philosophischer-salon.at",
};

export const mockEvents: WWDEvent[] = [
    {
        id: "e1",
        slug: "wesen-der-technik",
        title: "Über das Wesen der Technik",
        date: "24. November 2026",
        time: "19:00 Uhr",
        location: "Salon, Wien",
        excerpt: "Ein philosophischer Abend über die Rolle der Technologie in unserem Leben.",
        content: `<p>Die fortschreitende Technologisierung durchdringt alle Lebensbereiche. Doch was bedeutet "Technik" eigentlich in ihrem tiefsten Wesen? In Anlehnung an klassische und zeitgenössische Denker widmen wir uns an diesem Abend der Frage, ob Technik lediglich ein neutrales Werkzeug ist oder ob sie unsere Art, in der Welt zu sein, fundamental verändert.</p><p>Wir laden Sie ein zu einem Diskurs über Entbergen, Gestell und die Verantwortung des Menschen im Maschinenzeitalter.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
        url: "/veranstaltungen/wesen-der-technik",
    },
    {
        id: "e2",
        slug: "ethik-der-ki",
        title: "Ethik der künstlichen Intelligenz",
        date: "05. Dezember 2026",
        time: "18:30 Uhr",
        location: "Salon, Wien",
        excerpt: "Debatte zur Verantwortung und Moral von Algorithmen.",
        content: `<p>Künstliche Intelligenz verändert unsere Gesellschaft grundlegend. Doch wer trägt die Verantwortung, wenn Algorithmen Entscheidungen treffen? Können Maschinen moralisch handeln?</p><p>Im Salon diskutieren wir die ethischen Implikationen von KI — von autonomen Waffensystemen bis hin zu algorithmischer Diskriminierung.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
        url: "/veranstaltungen/ethik-der-ki",
    },
];

export const mockNews: WWDNews[] = [
    {
        id: "n1",
        slug: "gruendung",
        title: "Der Salon öffnet seine Pforten",
        date: "15. Oktober 2026",
        author: "Jeremias Wilcke",
        excerpt: "Wir freuen uns, die feierliche Gründung des Philosophischen Salons bekanntzugeben. Ein Ort für jene, die den echten Diskurs suchen.",
        content: `<p>Wir freuen uns außerordentlich, die Gründung des Philosophischen Salons bekanntzugeben. In einer Zeit der schnellen Antworten und oberflächlichen Debatten möchten wir einen physischen und intellektuellen Raum schaffen für das, was heute so oft fehlt: Die Tiefe.</p><h2>Was ist ein Salon?</h2><p>Die historische Salonkultur war stets ein Ort der Zusammenkunft unterschiedlichster Geister. Hier trafen sich Literaten, Philosophen, Politiker und Bürger, um frei von Zwängen zu sprechen. Diesen Geist holen wir in die Gegenwart.</p><blockquote>"Wer die Welt bewegen will, sollte erst sich selbst bewegen."</blockquote><p>Wir laden Sie herzlich ein, Teil dieser neuen Bewegung zu werden.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop",
        url: "/neuigkeiten/gruendung",
    },
    {
        id: "n2",
        slug: "mitgliedschaft",
        title: "Aufruf zur Mitgliedschaft",
        date: "02. November 2026",
        author: "Jeremias Wilcke",
        excerpt: "Unterstützen Sie uns dabei, eine Plattform für tiefgreifende philosophische und gesellschaftliche Themen zu schaffen.",
        content: `<p>Der Philosophische Salon lebt von seinen Mitgliedern. Werden Sie Teil eines Netzwerks von Denkern, Künstlern und Neugierigen, die sich der Pflege des freien Diskurses verschrieben haben.</p><p>Als Mitglied erhalten Sie bevorzugten Zugang zu allen Veranstaltungen und werden Teil unserer wachsenden Gemeinschaft.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=600&auto=format&fit=crop",
        url: "/neuigkeiten/mitgliedschaft",
    },
    {
        id: "n3",
        slug: "planung",
        title: "Erste Veranstaltungsreihe in Planung",
        date: "10. Dezember 2026",
        author: "Jeremias Wilcke",
        excerpt: "Das Kuratorium arbeitet intensiv am Programm für das kommende Jahr. Freuen Sie sich auf spannende Vorträge und Debatten.",
        content: `<p>Das Kuratorium arbeitet intensiv am Programm für das kommende Jahr. Unsere erste Veranstaltungsreihe wird sich dem Thema "Mensch und Maschine" widmen.</p><p>Freuen Sie sich auf spannende Vorträge, moderierte Diskussionen und Lesungen mit namhaften Gästen aus Philosophie, Wissenschaft und Kunst.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop",
        url: "/neuigkeiten/planung",
    },
];

export const mockReports: WWDReport[] = [
    {
        id: "r1",
        slug: "rueckblick-eroeffnung",
        title: "Rückblick: Feierliche Eröffnung",
        date: "20. Oktober 2026",
        excerpt: "Ein Abend voller Inspiration — unser erster Salon brachte über 60 Gäste zusammen für einen unvergesslichen Diskurs über die Zukunft des Denkens.",
        content: `<p>Am 18. Oktober 2026 fand die feierliche Eröffnung des Philosophischen Salons statt. Über 60 Gäste folgten der Einladung in die historischen Räumlichkeiten.</p><h2>Der Abend</h2><p>Nach einer Begrüßung durch den Obmann folgte ein Impulsvortrag zum Thema "Warum wir wieder denken lernen müssen". Die anschließende Diskussion zeigte eindrucksvoll, welche Kraft der direkte Austausch entfalten kann.</p><blockquote>"Es war, als hätte jemand ein Fenster in einem stickigen Raum geöffnet."</blockquote><p>Wir danken allen Teilnehmern und freuen uns auf viele weitere Abende.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop",
        url: "/nachberichte/rueckblick-eroeffnung",
    },
    {
        id: "r2",
        slug: "salon-wiener-moderne",
        title: "Die Wiener Moderne — Ein Salon-Abend",
        date: "15. November 2026",
        excerpt: "Josef Hoffmann, Adolf Loos und die Frage nach dem Ornament: Unser zweiter Salon widmete sich der Ästhetik als philosophischer Kategorie.",
        content: `<p>Der zweite Salon-Abend stand ganz im Zeichen der Wiener Moderne. Professor Dr. Maria Steinbach führte die Gäste durch die ästhetischen Debatten des frühen 20. Jahrhunderts.</p><p>Die Kernfrage des Abends: Ist das Ornament ein Verbrechen — oder ist die Reduktion auf das Funktionale selbst eine Form der Verarmung?</p><p>Die lebhafte Diskussion zeigte, dass diese Fragen nichts von ihrer Aktualität verloren haben.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
        url: "/nachberichte/salon-wiener-moderne",
    },
];

export const mockPages: Record<string, WWDPage> = {
    "ueber-uns": {
        title: "Über den Philosophischen Salon",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        content: `
            <p>Die fortschreitende Technologisierung durchdringt alle Lebensbereiche. Doch was bedeutet "Technik" eigentlich in ihrem tiefsten Wesen? In Anlehnung an klassische und zeitgenössische Denker widmen wir uns an diesem Abend der Frage, ob Technik lediglich ein neutrales Werkzeug ist oder ob sie unsere Art, in der Welt zu sein, fundamental verändert.</p>
            <p>Der Philosophische Salon ist kein Ort der stillen Belehrung, sondern der geteilten Erkenntnis. Wir glauben daran, dass die drängenden Fragen unserer Zeit – sei es die Rolle der Technologie, die Natur des Bewusstseins oder die Konstruktion unserer gesellschaftlichen Wirklichkeit – nicht im luftleeren Raum akademischer Publikationen beantwortet werden können. Sie verlangen nach dem lebendigen, respektvollen und intellektuell rigiden Austausch von Angesicht zu Angesicht.</p>
            <blockquote>"Die Sprache ist das Haus des Seins. In ihrer Behausung wohnt der Mensch." – Eine Erinnerung daran, dass unser Sprechen unsere Welt formt.</blockquote>
            <p>Unsere Veranstaltungen bringen Menschen unterschiedlichster Disziplinen zusammen. Ob Künstler, Technologen, Akademiker oder neugierige Bürger: Was uns eint, ist der Hunger nach dem Unbequemen, nach dem tieferen Verständnis dessen, was unsere Realität zusammenhält.</p>
        `,
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
        `,
    },
};
