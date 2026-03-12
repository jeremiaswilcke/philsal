import Link from "next/link";

interface BentoItem {
    id: string;
    title: string;
    description: string;
    url: string;
    span?: 1 | 2; // For varying widths
}

export function BentoGrid() {
    const items: BentoItem[] = [
        {
            id: "ueber-uns",
            title: "Über den Philosophischen Salon",
            description: "Ein Ort für jene, die den echten Diskurs suchen und drängende Fragen unserer Zeit ergründen.",
            url: "/ueber-uns"
        },
        {
            id: "nachberichte",
            title: "Veranstaltungsnachschauen",
            description: "Lesen Sie ausführliche Berichte und Zusammenfassungen unserer vergangenen Salons und Vorträge.",
            url: "/nachberichte"
        },
        {
            id: "verein",
            title: "Der Verein",
            description: "Wer wir sind, wie wir arbeiten und wie Sie unsere unabhängigen Diskurse unterstützen können.",
            url: "/verein"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {items.map((item) => (
                <Link
                    key={item.id}
                    href={item.url}
                    className={`bento-card p-8 flex flex-col justify-between group h-64 ${item.span === 2 ? "lg:col-span-2" : "col-span-1"
                        }`}
                >
                    <div>
                        <h3 className="font-serif text-2xl text-gray-800 mb-2 group-hover:text-gold-dark transition-colors">
                            {item.title}
                        </h3>
                        <p className="font-sans font-light text-gray-500">
                            {item.description}
                        </p>
                    </div>
                    <div className="flex items-center text-sm font-medium text-gold-dark mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        Entdecken
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </div>
                </Link>
            ))}
        </div>
    );
}
