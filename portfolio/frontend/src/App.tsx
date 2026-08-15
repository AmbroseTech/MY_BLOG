import { useEffect, useState } from "react";

import {
    fetchPost,
    fetchPosts,
    fetchProfile,
    fetchSkills,
} from "./api";

import { BlogDetail } from "./components/BlogDetail";
import { BlogList } from "./components/BlogList";
import { SkillMatrix } from "./components/SkillMatrix";

import type {
    BlogPost,
    BlogPostSummary,
    DeveloperProfile,
    Skill,
} from "./types";

type Section = "home" | "skills" | "blog";

export default function App() {
    const [profile, setProfile] =
        useState<DeveloperProfile | null>(null);

    const [skills, setSkills] = useState<Skill[]>([]);
    const [posts, setPosts] = useState<BlogPostSummary[]>([]);
    const [selectedPost, setSelectedPost] =
        useState<BlogPost | null>(null);

    const [section, setSection] =
        useState<Section>("home");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadPortfolio() {
            try {
                const [
                    profileData,
                    skillsData,
                    postsData,
                ] = await Promise.all([
                    fetchProfile(),
                    fetchSkills(),
                    fetchPosts(),
                ]);

                setProfile(profileData);
                setSkills(skillsData);
                setPosts(postsData);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Unable to load portfolio.",
                );
            } finally {
                setLoading(false);
            }
        }

        void loadPortfolio();
    }, []);

    async function handlePostSelect(slug: string) {
        try {
            const post = await fetchPost(slug);
            setSelectedPost(post);
            setSection("blog");

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } catch {
            setError("Unable to load the selected article.");
        }
    }

    function navigate(nextSection: Section) {
        setSelectedPost(null);
        setSection(nextSection);

        window.setTimeout(() => {
            document
                .getElementById(nextSection)
                ?.scrollIntoView({
                    behavior: "smooth",
                });
        }, 50);
    }

    if (loading) {
        return (
            <main className="loading-screen">
                <span className="loader" />
                <p>Initializing portfolio...</p>
            </main>
        );
    }

    if (error || !profile) {
        return (
            <main className="error-screen">
                <p>{error ?? "Profile unavailable."}</p>
                <button
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </main>
        );
    }

    return (
        <div className="app-shell">
            <header className="site-header">
                <a
                    className="brand"
                    href="#home"
                    onClick={() => navigate("home")}
                >
                    <span className="brand-mark">
                        AA
                    </span>

                    <span>
                        <strong>Ambrose Abaasa</strong>
                        <small>Software Engineer</small>
                    </span>
                </a>

                <nav aria-label="Primary navigation">
                    <button
                        onClick={() => navigate("home")}
                    >
                        Home
                    </button>

                    <button
                        onClick={() => navigate("skills")}
                    >
                        Skills
                    </button>

                    <button
                        onClick={() => navigate("blog")}
                    >
                        Blog
                    </button>
                </nav>
            </header>

            <main>
                {selectedPost ? (
                    <section className="section article-section">
                        <BlogDetail
                            post={selectedPost}
                            onBack={() => {
                                setSelectedPost(null);
                                navigate("blog");
                            }}
                        />
                    </section>
                ) : (
                    <>
                        <section
                            id="home"
                            className="hero section"
                        >
                            <div className="hero-grid">
                                <div>
                                    <span className="eyebrow">
                                        Senior Engineer · Cloud
                                        Architect
                                    </span>

                                    <h1>
                                        Building systems
                                        <span>
                                            that scale.
                                        </span>
                                    </h1>

                                    <p className="hero-copy">
                                        {profile.bio}
                                    </p>

                                    <div className="hero-actions">
                                        <button
                                            className="primary-button"
                                            onClick={() =>
                                                navigate("blog")
                                            }
                                        >
                                            Explore my work
                                        </button>

                                        {profile.email && (
                                            <a
                                                className="secondary-button"
                                                href={`mailto:${profile.email}`}
                                            >
                                                Get in touch
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="terminal-card">
                                    <div className="terminal-header">
                                        <span />
                                        <span />
                                        <span />
                                    </div>

                                    <pre>
                                        <code>
{`const engineer = {
  name: "Ambrose Abaasa",
  role: "Full-Stack Engineer",
  focus: [
    "Scalable APIs",
    "Cloud Architecture",
    "Database Engineering",
    "Modern Interfaces"
  ],
  stack: {
    backend: ["Python", "FastAPI"],
    frontend: ["React", "TypeScript"],
    data: ["PostgreSQL", "Redis"],
    ops: ["Docker", "CI/CD"]
  }
};`}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </section>

                        <section
                            id="skills"
                            className="section"
                        >
                            <div className="section-heading">
                                <div>
                                    <span className="eyebrow">
                                        Technical capability
                                    </span>

                                    <h2>
                                        Engineering toolkit
                                    </h2>
                                </div>

                                <p>
                                    Technologies and practices
                                    used to design reliable,
                                    maintainable software.
                                </p>
                            </div>

                            <SkillMatrix
                                skills={skills}
                            />
                        </section>

                        <section
                            id="blog"
                            className="section"
                        >
                            <div className="section-heading">
                                <div>
                                    <span className="eyebrow">
                                        Engineering journal
                                    </span>

                                    <h2>
                                        Technical writing
                                    </h2>
                                </div>

                                <p>
                                    Notes on architecture,
                                    performance, databases,
                                    APIs, and frontend
                                    engineering.
                                </p>
                            </div>

                            <BlogList
                                posts={posts}
                                onSelect={handlePostSelect}
                            />
                        </section>
                    </>
                )}
            </main>

            <footer className="site-footer">
                <div>
                    <strong>Ambrose Abaasa</strong>
                    <p>
                        Senior Full-Stack Software Engineer
                        & Cloud Architect.
                    </p>
                </div>

                <div className="footer-links">
                    {profile.github_url && (
                        <a
                            href={profile.github_url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                        </a>
                    )}

                    {profile.linkedin_url && (
                        <a
                            href={profile.linkedin_url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            X_home
                        </a>
                    )}
                </div>
            </footer>
        </div>
    );
}