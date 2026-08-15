import * as React from "react";
import type { BlogPostSummary } from "../types";

interface BlogListProps {
    posts: BlogPostSummary[];
    onSelect: (slug: string) => void;
}

export function BlogList({
    posts,
    onSelect,
}: BlogListProps) {
    if (posts.length === 0) {
        return (
            <div className="empty-state">
                <p>No published articles yet.</p>
            </div>
        );
    }

    return (
        <div className="blog-grid">
            {posts.map((post) => (
                <article className="blog-card" key={post.id}>
                    <div className="blog-card-top">
                        <span className="article-index">
                            //
                        </span>

                        <time>
                            {post.published_at
                                ? new Date(
                                      post.published_at,
                                  ).toLocaleDateString(
                                      undefined,
                                      {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                      },
                                  )
                                : "Draft"}
                        </time>
                    </div>

                    <h3>{post.title}</h3>

                    <p>{post.excerpt}</p>

                    <div className="tag-list">
                        {post.tags.map((tag) => (
                            <span className="tag" key={tag.id}>
                                #{tag.name}
                            </span>
                        ))}
                    </div>

                    <button
                        className="text-button"
                        onClick={() => onSelect(post.slug)}
                    >
                        Read article →
                    </button>
                    <ul className="commit-log">
  {posts.map((p) => (
    <li key={p.id} className="commit-entry">
      <span className="commit-hash">{p.slug.slice(0, 7)}</span>
      <a href={`/blog/${p.slug}`} className="commit-msg">{p.title}</a>
      <time className="commit-date">{post.published_at ?new Date(post.published_at).toLocaleDateString() : "Unpublished"}</time>
    </li>
  ))}
</ul> 
                </article>
            ))}
        </div>
    );
}