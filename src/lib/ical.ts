import { WWDEvent } from "./types";

const MONTHS: Record<string, string> = {
    Januar: "01", Februar: "02", März: "03", April: "04",
    Mai: "05", Juni: "06", Juli: "07", August: "08",
    September: "09", Oktober: "10", November: "11", Dezember: "12",
};

/** Parse "24. November 2026" + "19:00 Uhr" → Date */
function parseGermanDate(dateStr: string, timeStr?: string): Date {
    const m = dateStr.match(/(\d+)\.\s+(\w+)\s+(\d{4})/);
    if (!m) return new Date();
    const day = m[1].padStart(2, "0");
    const month = MONTHS[m[2]] ?? "01";
    const year = m[3];

    let hours = "18";
    let minutes = "00";
    if (timeStr) {
        const tm = timeStr.match(/(\d{1,2}):(\d{2})/);
        if (tm) { hours = tm[1].padStart(2, "0"); minutes = tm[2]; }
    }

    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
}

function formatICalDate(d: Date): string {
    return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeIcal(s: string): string {
    return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function eventToICS(event: WWDEvent, baseUrl: string): string {
    const start = parseGermanDate(event.date, event.time);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // +2h

    const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Philosophischer Salon//DE",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:${event.slug}@philosophischer-salon.at`,
        `DTSTART:${formatICalDate(start)}`,
        `DTEND:${formatICalDate(end)}`,
        `SUMMARY:${escapeIcal(event.title)}`,
        event.excerpt ? `DESCRIPTION:${escapeIcal(event.excerpt)}` : "",
        `URL:${baseUrl}/veranstaltungen/${event.slug}`,
        "END:VEVENT",
        "END:VCALENDAR",
    ];

    return lines.filter(Boolean).join("\r\n");
}

export function eventsToICSFeed(events: WWDEvent[], baseUrl: string): string {
    const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Philosophischer Salon//DE",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "X-WR-CALNAME:Philosophischer Salon",
    ];

    for (const event of events) {
        const start = parseGermanDate(event.date, event.time);
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

        lines.push(
            "BEGIN:VEVENT",
            `UID:${event.slug}@philosophischer-salon.at`,
            `DTSTART:${formatICalDate(start)}`,
            `DTEND:${formatICalDate(end)}`,
            `SUMMARY:${escapeIcal(event.title)}`,
        );
        if (event.excerpt) lines.push(`DESCRIPTION:${escapeIcal(event.excerpt)}`);
        lines.push(`URL:${baseUrl}/veranstaltungen/${event.slug}`);
        lines.push("END:VEVENT");
    }

    lines.push("END:VCALENDAR");
    return lines.join("\r\n");
}
