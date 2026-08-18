import type {
    BlogPost,
    BlogPostSummary,
    DeveloperProfile,
    Skill,
} from "./types";

interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
}

declare global {
    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}

const API_URL =
    import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1";

async function request<T>(path: string): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(
            `API request failed with status ${response.status}`,
        );
    }

    return response.json() as Promise<T>;
}

export function fetchProfile(): Promise<DeveloperProfile> {
    return request<DeveloperProfile>("/profile");
}

export function fetchSkills(): Promise<Skill[]> {
    return request<Skill[]>("/skills");
}

export function fetchPosts(): Promise<BlogPostSummary[]> {
    return request<BlogPostSummary[]>("/blog");
}

export function fetchPost(slug: string): Promise<BlogPost> {
    return request<BlogPost>(
        `/blog/${encodeURIComponent(slug)}`,
    );
}