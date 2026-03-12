"use server";

import { prisma } from "@/lib/db";

export type RegistrationState = {
    success: boolean;
    error?: string;
};

export async function registerForEvent(
    _prev: RegistrationState,
    formData: FormData
): Promise<RegistrationState> {
    const eventSlug = formData.get("eventSlug") as string | null;
    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const telefon = (formData.get("telefon") as string) || null;
    const personen = parseInt((formData.get("personen") as string) || "1", 10);
    const anmerkung = (formData.get("anmerkung") as string) || null;

    if (!eventSlug || !name || !email) {
        return { success: false, error: "Bitte füllen Sie alle Pflichtfelder aus." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." };
    }

    if (personen < 1 || personen > 10) {
        return { success: false, error: "Personenanzahl muss zwischen 1 und 10 liegen." };
    }

    try {
        await prisma.eventRegistration.create({
            data: {
                eventSlug: eventSlug.trim(),
                name: name.trim(),
                email: email.trim(),
                telefon: telefon?.trim() || null,
                personen,
                anmerkung: anmerkung?.trim() || null,
            },
        });
        return { success: true };
    } catch (e) {
        console.error("Registration error:", e);
        return { success: false, error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." };
    }
}
