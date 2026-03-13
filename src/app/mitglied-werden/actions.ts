"use server";

import { prisma } from "@/lib/db";

export type FormState = {
  success: boolean;
  error?: string;
};

export async function submitMembershipAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string | null;
  const telefon = formData.get("telefon") as string | null;
  const strasse = formData.get("strasse") as string | null;
  const hausnummer = formData.get("hausnummer") as string | null;
  const plz = formData.get("plz") as string | null;
  const ort = formData.get("ort") as string | null;
  const land = (formData.get("land") as string | null) || "Österreich";
  const email = formData.get("email") as string | null;
  const datenschutz = formData.get("datenschutz") === "on";
  const telegramWilling = formData.get("telegramWilling") === "on";

  if (!name || !telefon || !strasse || !hausnummer || !plz || !ort || !email) {
    return { success: false, error: "Bitte füllen Sie alle Pflichtfelder aus." };
  }

  if (!datenschutz) {
    return { success: false, error: "Bitte akzeptieren Sie die Datenschutzerklärung." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." };
  }

  try {
    await prisma.membershipApplication.create({
      data: {
        name: name.trim(),
        telefon: telefon.trim(),
        strasse: strasse.trim(),
        hausnummer: hausnummer.trim(),
        plz: plz.trim(),
        ort: ort.trim(),
        land: land.trim(),
        email: email.trim(),
        datenschutz,
        telegramWilling,
      },
    });
    return { success: true };
  } catch (e) {
    console.error("Membership application error:", e);
    return { success: false, error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." };
  }
}
