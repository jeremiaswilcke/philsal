import { NextRequest } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { prisma } from "@/lib/db";
import { getEventBySlug } from "@/lib/wp";

export const dynamic = "force-dynamic";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const event = await getEventBySlug(slug);

    if (!event) {
        return new Response("Event not found", { status: 404 });
    }

    const registrations = await prisma.eventRegistration.findMany({
        where: { eventSlug: slug },
        orderBy: { name: "asc" },
    });

    // Build PDF
    const pdf = await PDFDocument.create();
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

    const pageWidth = 595.28; // A4
    const pageHeight = 841.89;
    const margin = 50;
    const lineHeight = 22;
    const checkboxSize = 12;

    let page = pdf.addPage([pageWidth, pageHeight]);
    let y = pageHeight - margin;

    // Title
    page.drawText("Teilnehmerliste", {
        x: margin,
        y,
        size: 20,
        font: fontBold,
        color: rgb(0.11, 0.11, 0.11),
    });
    y -= 30;

    // Event name
    page.drawText(event.title, {
        x: margin,
        y,
        size: 14,
        font: fontBold,
        color: rgb(0.45, 0.09, 0.09), // hofburg-red
    });
    y -= 20;

    // Date
    const meta = [event.date, event.time].filter(Boolean).join(" | ");
    page.drawText(meta, {
        x: margin,
        y,
        size: 10,
        font,
        color: rgb(0.4, 0.4, 0.4),
    });
    y -= 10;

    // Separator
    y -= 10;
    page.drawLine({
        start: { x: margin, y },
        end: { x: pageWidth - margin, y },
        thickness: 0.5,
        color: rgb(0.77, 0.66, 0.41), // gold
    });
    y -= 20;

    // Table header
    const colCheck = margin;
    const colName = margin + checkboxSize + 15;
    const colEmail = 260;
    const colPersonen = 430;

    page.drawText("Name", { x: colName, y, size: 9, font: fontBold, color: rgb(0.3, 0.3, 0.3) });
    page.drawText("E-Mail", { x: colEmail, y, size: 9, font: fontBold, color: rgb(0.3, 0.3, 0.3) });
    page.drawText("Pers.", { x: colPersonen, y, size: 9, font: fontBold, color: rgb(0.3, 0.3, 0.3) });
    y -= 5;
    page.drawLine({
        start: { x: margin, y },
        end: { x: pageWidth - margin, y },
        thickness: 0.3,
        color: rgb(0.7, 0.7, 0.7),
    });
    y -= lineHeight;

    // Rows
    let totalPersonen = 0;

    for (const reg of registrations) {
        if (y < margin + 40) {
            // New page
            page = pdf.addPage([pageWidth, pageHeight]);
            y = pageHeight - margin;
        }

        // Checkbox (empty square)
        page.drawRectangle({
            x: colCheck,
            y: y - 2,
            width: checkboxSize,
            height: checkboxSize,
            borderWidth: 1,
            borderColor: rgb(0.4, 0.4, 0.4),
            color: rgb(1, 1, 1),
        });

        // Name
        const nameText = reg.name.length > 30 ? reg.name.slice(0, 28) + "…" : reg.name;
        page.drawText(nameText, { x: colName, y, size: 10, font, color: rgb(0.1, 0.1, 0.1) });

        // Email
        const emailText = reg.email.length > 28 ? reg.email.slice(0, 26) + "…" : reg.email;
        page.drawText(emailText, { x: colEmail, y, size: 9, font, color: rgb(0.3, 0.3, 0.3) });

        // Personen
        page.drawText(String(reg.personen), { x: colPersonen, y, size: 10, font, color: rgb(0.1, 0.1, 0.1) });

        totalPersonen += reg.personen;
        y -= lineHeight;
    }

    // Summary
    y -= 10;
    page.drawLine({
        start: { x: margin, y },
        end: { x: pageWidth - margin, y },
        thickness: 0.5,
        color: rgb(0.77, 0.66, 0.41),
    });
    y -= 20;
    page.drawText(`Gesamt: ${registrations.length} Anmeldungen, ${totalPersonen} Personen`, {
        x: margin,
        y,
        size: 11,
        font: fontBold,
        color: rgb(0.11, 0.11, 0.11),
    });

    if (registrations.length === 0) {
        y -= 30;
        page.drawText("Noch keine Anmeldungen vorhanden.", {
            x: margin,
            y,
            size: 11,
            font,
            color: rgb(0.5, 0.5, 0.5),
        });
    }

    const pdfBytes = await pdf.save();

    return new Response(Buffer.from(pdfBytes), {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="teilnehmerliste-${slug}.pdf"`,
        },
    });
}
