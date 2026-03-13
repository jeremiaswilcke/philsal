import { WWDConfig, WWDEvent, WWDNews, WWDReport, WWDPage } from "./types";
import {
    mockConfig,
    mockEvents,
    mockNews,
    mockReports,
    mockPages,
} from "./mockData";

const WP_URL = process.env.WORDPRESS_URL; // e.g. https://wp.philosophischer-salon.at

// ── Helpers ────────────────────────────────────────────────

async function wpFetch<T>(path: string): Promise<T | null> {
    if (!WP_URL) return null;
    try {
        const res = await fetch(`${WP_URL}${path}`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return null;
        return (await res.json()) as T;
    } catch {
        return null;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapWPEvent(wp: any): WWDEvent {
    const slug = wp.slug as string;
    return {
        id: String(wp.id),
        slug,
        title: wp.title?.rendered ?? wp.title,
        date: wp.meta?.event_date ?? wp.date?.slice(0, 10) ?? "",
        time: wp.meta?.event_time,
        excerpt: wp.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() ?? "",
        content: wp.content?.rendered ?? "",
        imageUrl: wp._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
        url: `/veranstaltungen/${slug}`,
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapWPPost(wp: any, prefix: string): WWDNews | WWDReport {
    const slug = wp.slug as string;
    return {
        id: String(wp.id),
        slug,
        title: wp.title?.rendered ?? wp.title,
        date: wp.date?.slice(0, 10) ?? "",
        author: wp._embedded?.author?.[0]?.name,
        excerpt: wp.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() ?? "",
        content: wp.content?.rendered ?? "",
        imageUrl: wp._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
        url: `/${prefix}/${slug}`,
    };
}

// ── Public API ─────────────────────────────────────────────

export async function getSiteConfig(): Promise<WWDConfig> {
    const wp = await wpFetch<WWDConfig>("/wp-json/phil-salon/v1/config");
    return wp ?? mockConfig;
}

export async function getEvents(): Promise<WWDEvent[]> {
    const wp = await wpFetch<unknown[]>(
        "/wp-json/wp/v2/veranstaltung?_embed&per_page=100&orderby=date&order=desc"
    );
    if (wp && wp.length > 0) return wp.map(mapWPEvent);
    return mockEvents;
}

export async function getEventBySlug(slug: string): Promise<WWDEvent | null> {
    const wp = await wpFetch<unknown[]>(
        `/wp-json/wp/v2/veranstaltung?slug=${encodeURIComponent(slug)}&_embed`
    );
    if (wp && wp.length > 0) return mapWPEvent(wp[0]);
    // Fallback: find in mock
    return mockEvents.find((e) => e.slug === slug) ?? null;
}

export async function getNews(): Promise<WWDNews[]> {
    const wp = await wpFetch<unknown[]>(
        "/wp-json/wp/v2/neuigkeit?_embed&per_page=100&orderby=date&order=desc"
    );
    if (wp && wp.length > 0) return wp.map((p) => mapWPPost(p, "neuigkeiten") as WWDNews);
    return mockNews;
}

export async function getNewsBySlug(slug: string): Promise<WWDNews | null> {
    const wp = await wpFetch<unknown[]>(
        `/wp-json/wp/v2/neuigkeit?slug=${encodeURIComponent(slug)}&_embed`
    );
    if (wp && wp.length > 0) return mapWPPost(wp[0], "neuigkeiten") as WWDNews;
    return mockNews.find((n) => n.slug === slug) ?? null;
}

export async function getReports(): Promise<WWDReport[]> {
    // Reports are past events with content — when WP is live, use a meta query
    // For now, fall back to mock reports
    const wp = await wpFetch<unknown[]>(
        "/wp-json/wp/v2/veranstaltung?_embed&per_page=100&orderby=date&order=desc&meta_key=is_report&meta_value=1"
    );
    if (wp && wp.length > 0) return wp.map((p) => mapWPPost(p, "nachberichte") as WWDReport);
    return mockReports;
}

export async function getReportBySlug(slug: string): Promise<WWDReport | null> {
    // Try as report meta first, then fallback
    const wp = await wpFetch<unknown[]>(
        `/wp-json/wp/v2/veranstaltung?slug=${encodeURIComponent(slug)}&_embed`
    );
    if (wp && wp.length > 0) return mapWPPost(wp[0], "nachberichte") as WWDReport;
    return mockReports.find((r) => r.slug === slug) ?? null;
}

export async function getPageData(slug: string): Promise<WWDPage> {
    const wp = await wpFetch<unknown[]>(
        `/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_embed`
    );
    if (wp && wp.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = wp[0] as any;
        return {
            title: p.title?.rendered ?? "",
            content: p.content?.rendered ?? "",
            imageUrl: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
        };
    }
    return mockPages[slug] ?? { title: "Seite nicht gefunden", content: "<p>Inhalt nicht gefunden.</p>" };
}
