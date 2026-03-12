import { NextRequest } from "next/server";
import { getEventBySlug } from "@/lib/wp";
import { eventToICS } from "@/lib/ical";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const event = await getEventBySlug(slug);

    if (!event) {
        return new Response("Event not found", { status: 404 });
    }

    const baseUrl = new URL(req.url).origin;
    const ics = eventToICS(event, baseUrl);

    return new Response(ics, {
        headers: {
            "Content-Type": "text/calendar; charset=utf-8",
            "Content-Disposition": `attachment; filename="${slug}.ics"`,
        },
    });
}
