"use server";

import { prisma } from "@/lib/db";

export type ContactFormState = {
  success: boolean;
  error?: string;
};

export async function submitContactAction(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const kategorie = formData.get("kategorie") as string | null;
  const eventId = formData.get("eventId") as string | null;
  const nachricht = formData.get("nachricht") as string | null;

  if (!name || !email || !kategorie || !nachricht) {
    return { success: false, error: "Bitte füllen Sie alle Pflichtfelder aus." };
  }

  if (kategorie === "vortrag" && !eventId) {
    return { success: false, error: "Bitte wählen Sie einen Vortrag aus." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." };
  }

  try {
    await prisma.contactInquiry.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        kategorie: kategorie.trim(),
        eventId: kategorie === "vortrag" ? eventId?.trim() || null : null,
        nachricht: nachricht.trim(),
      },
    });
    return { success: true };
  } catch (e) {
    console.error("Contact form error:", e);
    return { success: false, error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." };
  }
}
