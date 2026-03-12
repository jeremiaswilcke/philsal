"use client";

import { useActionState } from "react";
import { registerForEvent, type RegistrationState } from "./actions";

interface Props {
    eventSlug: string;
    eventTitle: string;
}

const initialState: RegistrationState = { success: false };

const inputClass =
    "w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg font-sans text-gray-900 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors";

const labelClass = "block text-sm font-sans text-gray-600 uppercase tracking-wider mb-2";

export function RegistrationForm({ eventSlug, eventTitle }: Props) {
    const [state, formAction, isPending] = useActionState(registerForEvent, initialState);

    if (state.success) {
        return (
            <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                </div>
                <h4 className="font-serif text-xl text-gray-900 mb-2">Anmeldung bestätigt!</h4>
                <p className="font-sans text-gray-600 text-sm font-light">
                    Vielen Dank. Sie sind für <em>{eventTitle}</em> angemeldet.
                </p>
            </div>
        );
    }

    return (
        <form action={formAction} className="space-y-4">
            <input type="hidden" name="eventSlug" value={eventSlug} />

            {state.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-sans">
                    {state.error}
                </div>
            )}

            <div>
                <label htmlFor="reg-name" className={labelClass}>Name *</label>
                <input type="text" id="reg-name" name="name" required className={inputClass} />
            </div>

            <div>
                <label htmlFor="reg-email" className={labelClass}>E-Mail *</label>
                <input type="email" id="reg-email" name="email" required className={inputClass} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="reg-telefon" className={labelClass}>Telefon</label>
                    <input type="tel" id="reg-telefon" name="telefon" className={inputClass} />
                </div>
                <div>
                    <label htmlFor="reg-personen" className={labelClass}>Personen</label>
                    <input type="number" id="reg-personen" name="personen" defaultValue={1} min={1} max={10} className={inputClass} />
                </div>
            </div>

            <div>
                <label htmlFor="reg-anmerkung" className={labelClass}>Anmerkung</label>
                <textarea id="reg-anmerkung" name="anmerkung" rows={2} className={inputClass + " resize-y"} />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full px-6 py-3 bg-gray-dark text-creme font-sans text-sm tracking-widest uppercase hover:bg-gold-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isPending ? "Wird angemeldet…" : "Verbindlich anmelden"}
            </button>
        </form>
    );
}
