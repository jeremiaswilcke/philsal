import { NextRequest } from "next/server";
import { getEvents } from "@/lib/wp";
import { eventsToICSFeed } from "@/lib/ical";

export async function GET(req: NextRequest) {
    const events = await getEvents();
    const baseUrl = new URL(req.url).origin;
    const ics = eventsToICSFeed(events, baseUrl);

    return new Response(ics, {
        headers: {
            "Content-Type": "text/calendar; charset=utf-8",
            "Content-Disposition": 'attachment; filename="philosophischer-salon.ics"',
        },
    });
}
