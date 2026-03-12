import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteConfig } from "@/lib/wp";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Philosophischer Salon",
  description: "Programm und Veranstaltungen des Philosophischen Salons",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSiteConfig();

  return (
    <html lang="de">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-creme text-gray-900 flex flex-col min-h-screen`}
      >
        <Header logoText={config.logoText} logoImageUrl={config.logoImageUrl} />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
