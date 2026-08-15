export interface Skill {
    id: string;
    name: string;
    category: string;
    proficiency: number;
    years_experience: number | null;
    description: string | null;
    display_order: number;
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
}

export interface BlogPostSummary {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    cover_image_url: string | null;
    published_at: string | null;
    tags: Tag[];
}

export interface BlogPost extends BlogPostSummary {
    content: string;
    created_at: string;
    updated_at: string;
}

export interface DeveloperProfile {
    id: string;
    name: string;
    title: string;
    bio: string;
    location: string | null;
    email: string | null;
    github_url: string | null;
    linkedin_url: string | null;
}