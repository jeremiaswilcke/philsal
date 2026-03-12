"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitMembershipAction, type FormState } from "./actions";

const initialState: FormState = { success: false };

export function MemberForm() {
    const [state, formAction, isPending] = useActionState(submitMembershipAction, initialState);

    if (state.success) {
        return (
            <div className="bento-card p-10 md:p-14 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                </div>
                <h3 className="font-serif text-3xl text-gray-900 mb-4">Vielen Dank!</h3>
                <p className="font-sans text-gray-600 font-light">
                    Ihr Mitgliedsantrag wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.
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
                    <label htmlFor="name" className="block text-sm font-sans text-gray-600 uppercase tracking-wider mb-2">
                        Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg font-sans text-gray-900 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors"
                    />
                </div>

                <div>
                    <label htmlFor="telefon" className="block text-sm font-sans text-gray-600 uppercase tracking-wider mb-2">
                        Telefon *
                    </label>
                    <input
                        type="tel"
                        id="telefon"
                        name="telefon"
                        required
                        className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg font-sans text-gray-900 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors"
                    />
                </div>

                <div>
                    <label htmlFor="adresse" className="block text-sm font-sans text-gray-600 uppercase tracking-wider mb-2">
                        Adresse *
                    </label>
                    <input
                        type="text"
                        id="adresse"
                        name="adresse"
                        required
                        className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg font-sans text-gray-900 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-sans text-gray-600 uppercase tracking-wider mb-2">
                        E-Mail *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg font-sans text-gray-900 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors"
                    />
                </div>

                <div className="pt-4 space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="datenschutz"
                            required
                            className="mt-1 w-4 h-4 accent-hofburg-red"
                        />
                        <span className="text-sm font-sans text-gray-600 font-light">
                            Ich habe die{" "}
                            <Link href="/datenschutz" className="text-hofburg-red hover:underline" target="_blank">
                                Datenschutzerklärung
                            </Link>{" "}
                            gelesen und akzeptiere diese. *
                        </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="telegramWilling"
                            className="mt-1 w-4 h-4 accent-hofburg-red"
                        />
                        <span className="text-sm font-sans text-gray-600 font-light">
                            Ich bin bereit, der Telegram-Gruppe des Philosophischen Salons beizutreten.
                        </span>
                    </label>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full px-8 py-4 bg-hofburg-red text-creme font-sans text-sm tracking-widest uppercase hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Wird gesendet…" : "Mitgliedsantrag absenden"}
                    </button>
                </div>
            </div>
        </form>
    );
}
