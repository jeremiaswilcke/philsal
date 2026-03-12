import { EventFrame } from "@/components/ui/EventFrame";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { NewsGrid } from "@/components/ui/NewsGrid";
import { HeroCarousel } from "@/components/ui/HeroCarousel";
import { FadeIn } from "@/components/ui/FadeIn";
import { getEvents, getNews, getSiteConfig } from "@/lib/wp";

export default async function Home() {
  const events = await getEvents();
  const news = await getNews();
  const config = await getSiteConfig();

  return (
    <main className="min-h-screen bg-creme selection:bg-gold-light selection:text-gray-dark">
      <section className="relative w-full pt-20">
        <HeroCarousel />
        <FadeIn delay={0.2} direction="up">
          <div className="text-center pt-24 pb-12 px-6 max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-dark tracking-wide mb-6">
              {config.heroTitle}
            </h1>
            <p className="font-sans text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light">
              {config.heroSubtitle}
            </p>
            <div className="w-24 h-[1px] bg-gold-primary/50 mx-auto mt-12"></div>
          </div>
        </FadeIn>
      </section>

      <FadeIn delay={0.3} direction="up">
        <section className="px-6 lg:px-8 max-w-7xl mx-auto pb-16 pt-8">
          <EventFrame events={events} />
        </section>
      </FadeIn>

      <FadeIn delay={0.2} direction="up">
        <section className="px-6 lg:px-8 max-w-7xl mx-auto pb-24">
          <NewsGrid news={news} />
        </section>
      </FadeIn>

      <FadeIn delay={0.2} direction="up">
        <section className="px-6 lg:px-8 max-w-7xl mx-auto pb-32">
          <BentoGrid />
        </section>
      </FadeIn>
    </main>
  );
}
