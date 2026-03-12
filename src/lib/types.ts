// Types representing content data — sourced from WP REST API or fallback mock data

export interface WWDConfig {
    logoText: string;
    logoImageUrl?: string;
    heroTitle: string;
    heroSubtitle: string;
    contactEmail: string;
    socialLinks?: {
        instagram?: string;
        facebook?: string;
    };
}

export interface WWDEvent {
    id: string;
    slug: string;
    title: string;
    date: string;
    time?: string;
    location?: string;
    excerpt?: string;
    content?: string;
    imageUrl?: string;
    url: string;
}

export interface WWDNews {
    id: string;
    slug: string;
    title: string;
    date: string;
    author?: string;
    excerpt: string;
    content?: string;
    imageUrl?: string;
    url: string;
}

export interface WWDReport {
    id: string;
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content?: string;
    imageUrl?: string;
    url: string;
}

export interface WWDPage {
    title: string;
    content: string;
    imageUrl?: string;
}
