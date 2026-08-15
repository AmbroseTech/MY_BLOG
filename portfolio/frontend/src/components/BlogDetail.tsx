import type { BlogPost } from "../types";

interface BlogDetailProps {
    post: BlogPost;
    onBack: () => void;
}

export function BlogDetail({
    post,
    onBack,
}: BlogDetailProps) {
    const renderMarkdown = (content: string) => {
        return content
            .split("\n")
            .map((line, index) => {
                if (line.startsWith("# ")) {
                    return (
                        <h2 key={index}>
                            {line.substring(2)}
                        </h2>
                    );
                }

                if (line.startsWith("## ")) {
                    return (
                        <h3 key={index}>
                            {line.substring(3)}
                        </h3>
                    );
                }

                if (line.startsWith("```")) {
                    return null;
                }

                if (line.startsWith("- ")) {
                    return (
                        <li key={index}>
                            {line.substring(2)}
                        </li>
                    );
                }

                if (!line.trim()) {
                    return <br key={index} />;
                }

                return <p key={index}>{line}</p>;
            });
    };

    return (
        <article className="article-detail">
            <button className="back-button" onClick={onBack}>
                ← Back to articles
            </button>

            <header>
                <div className="tag-list">
                    {post.tags.map((tag) => (
                        <span className="tag" key={tag.id}>
                            #{tag.name}
                        </span>
                    ))}
                </div>

                <h1>{post.title}</h1>

                <p className="article-excerpt">
                    {post.excerpt}
                </p>

                {post.published_at && (
                    <time>
                        Published{" "}
                        {new Date(
                            post.published_at,
                        ).toLocaleDateString()}
                    </time>
                )}
            </header>

            <div className="article-content">
                {renderMarkdown(post.content)}
            </div>
        </article>
    );
}