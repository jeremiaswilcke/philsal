"use client";

import { useActionState, useState } from "react";
import { submitContactAction, type ContactFormState } from "./actions";

interface EventOption {
    id: string;
    title: string;
    date: string;
    past: boolean;
}

interface ContactFormProps {
    events: EventOption[];
}

const initialState: ContactFormState = { success: false };

const inputClass =
    "w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg font-sans text-gray-900 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors";

const labelClass = "block text-sm font-sans text-gray-600 uppercase tracking-wider mb-2";

export function ContactForm({ events }: ContactFormProps) {
    const [state, formAction, isPending] = useActionState(submitContactAction, initialState);
    const [kategorie, setKategorie] = useState("");

    const upcomingEvents = events.filter((e) => !e.past);
    const pastEvents = events.filter((e) => e.past);

    if (state.success) {
        return (
            <div className="bento-card p-10 md:p-14 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                </div>
                <h3 className="font-serif text-3xl text-gray-900 mb-4">Nachricht gesendet!</h3>
                <p className="font-sans text-gray-600 font-light">
                    Vielen Dank für Ihre Anfrage. Wir antworten so bald wie möglich.
                </p>
            </div>
        );
    }

    return (
        <form action={formAction} className="bento-card p-8 md:p-12">
            <div className="space-y-6">
                {state.error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-sans">
                        {state.error}
                    </div>
                )}

                <div>
                    <label htmlFor="name" className={labelClass}>Name *</label>
                    <input type="text" id="name" name="name" required className={inputClass} />
                </div>

                <div>
                    <label htmlFor="email" className={labelClass}>E-Mail *</label>
                    <input type="email" id="email" name="email" required className={inputClass} />
                </div>

                <div>
                    <label htmlFor="kategorie" className={labelClass}>Betreff *</label>
                    <select
                        id="kategorie"
                        name="kategorie"
                        required
                        value={kategorie}
                        onChange={(e) => setKategorie(e.target.value)}
                        className={inputClass}
                    >
                        <option value="">— Bitte wählen —</option>
                        <option value="vortrag">Frage zu einem Vortrag</option>
                        <option value="allgemein">Allgemeine Anfrage</option>
                    </select>
                </div>

                {kategorie === "vortrag" && (
                    <div>
                        <label htmlFor="eventId" className={labelClass}>Vortrag auswählen *</label>
                        <select id="eventId" name="eventId" required className={inputClass}>
                            <option value="">— Bitte wählen —</option>
                            {upcomingEvents.length > 0 && (
                                <optgroup label="Kommende Veranstaltungen">
                                    {upcomingEvents.map((e) => (
                                        <option key={e.id} value={e.id}>
                                            {e.title} ({e.date})
                                        </option>
                                    ))}
                                </optgroup>
                            )}
                            {pastEvents.length > 0 && (
                                <optgroup label="Vergangene Veranstaltungen">
                                    {pastEvents.map((e) => (
                                        <option key={e.id} value={e.id}>
                                            {e.title} ({e.date})
                                        </option>
                                    ))}
                                </optgroup>
                            )}
                        </select>
                    </div>
                )}

                <div>
                    <label htmlFor="nachricht" className={labelClass}>Nachricht *</label>
                    <textarea
                        id="nachricht"
                        name="nachricht"
                        required
                        rows={6}
                        className={inputClass + " resize-y"}
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full px-8 py-4 bg-hofburg-red text-creme font-sans text-sm tracking-widest uppercase hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Wird gesendet…" : "Nachricht absenden"}
                    </button>
                </div>
            </div>
        </form>
    );
}
