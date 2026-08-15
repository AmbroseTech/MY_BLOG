-- ============================================================
-- Ambrose Abaasa Portfolio / Technical Blog
-- PostgreSQL database initialization
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------
-- Developer profile
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS developer_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    title VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    location VARCHAR(150),
    email VARCHAR(255),
    github_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    website_url VARCHAR(500),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- Skills
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    proficiency INTEGER NOT NULL CHECK (proficiency BETWEEN 0 AND 100),
    years_experience NUMERIC(4, 1),
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_skills_category
    ON skills(category);

CREATE INDEX IF NOT EXISTS idx_skills_display_order
    ON skills(display_order);

-- ------------------------------------------------------------
-- Blog posts
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image_url VARCHAR(500),
    published BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published
    ON blog_posts(published);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at
    ON blog_posts(published_at DESC);

-- ------------------------------------------------------------
-- Tags
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE
);

-- ------------------------------------------------------------
-- Blog post / tag many-to-many relationship
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS blog_post_tags (
    post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX IF NOT EXISTS idx_blog_post_tags_tag_id
    ON blog_post_tags(tag_id);

-- ------------------------------------------------------------
-- Seed developer profile
-- ------------------------------------------------------------

INSERT INTO developer_profile (
    name,
    title,
    bio,
    location,
    email,
    github_url,
    linkedin_url
)
VALUES (
    'Ambrose Abaasa',
    'Senior Full-Stack Software Engineer & Cloud Architect',
    'Software engineer specializing in scalable backend systems, cloud architecture, high-concurrency services, modern frontend applications, and relational database engineering.',
    'Kampala, Uganda',
    'hello@example.com',
    'https://github.com/',
    'https://www.linkedin.com/'
)
ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- Seed skills
-- ------------------------------------------------------------

INSERT INTO skills (
    name,
    category,
    proficiency,
    years_experience,
    description,
    display_order
)
VALUES
(
    'Python',
    'Backend',
    96,
    8.0,
    'Primary language for production APIs, asynchronous services, automation, and distributed backend systems.',
    1
),
(
    'FastAPI',
    'Backend',
    94,
    5.0,
    'High-performance REST API development with asynchronous request handling and strong type validation.',
    2
),
(
    'Django',
    'Backend',
    91,
    7.0,
    'Full-featured Python framework for business applications, administration interfaces, and complex domain systems.',
    3
),
(
    'AsyncIO',
    'Backend',
    92,
    5.0,
    'Asynchronous concurrency for high-throughput network services and I/O-heavy workloads.',
    4
),
(
    'PostgreSQL',
    'Database',
    95,
    8.0,
    'Relational database design, indexing, query optimization, transactions, and schema engineering.',
    5
),
(
    'Redis',
    'Database',
    89,
    5.0,
    'Caching, distributed coordination, queues, rate limiting, and low-latency data access.',
    6
),
(
    'React',
    'Frontend',
    93,
    6.0,
    'Component-driven interfaces using modern React patterns, hooks, state management, and reusable UI systems.',
    7
),
(
    'TypeScript',
    'Frontend',
    92,
    6.0,
    'Type-safe frontend and backend development for maintainable large-scale applications.',
    8
),
(
    'Tailwind CSS',
    'Frontend',
    88,
    4.0,
    'Utility-first responsive interface development and reusable design systems.',
    9
),
(
    'Docker',
    'DevOps',
    91,
    7.0,
    'Containerized application development, local environments, deployments, and reproducible infrastructure.',
    10
),
(
    'Git',
    'DevOps',
    96,
    9.0,
    'Source control, branching strategies, code review workflows, and collaborative development.',
    11
),
(
    'CI/CD',
    'DevOps',
    90,
    6.0,
    'Automated testing, build pipelines, deployment automation, and release engineering.',
    12
)
ON CONFLICT (name) DO NOTHING;

-- ------------------------------------------------------------
-- Seed tags
-- ------------------------------------------------------------

INSERT INTO tags (name, slug)
VALUES
    ('Python', 'python'),
    ('FastAPI', 'fastapi'),
    ('PostgreSQL', 'postgresql'),
    ('Redis', 'redis'),
    ('Architecture', 'architecture'),
    ('Performance', 'performance'),
    ('React', 'react'),
    ('DevOps', 'devops')
ON CONFLICT (name) DO NOTHING;

-- ------------------------------------------------------------
-- Seed blog posts
-- ------------------------------------------------------------

INSERT INTO blog_posts (
    title,
    slug,
    excerpt,
    content,
    published,
    published_at
)
VALUES
(
    'Designing High-Concurrency APIs with FastAPI',
    'designing-high-concurrency-apis-with-fastapi',
    'A practical look at asynchronous Python API design, connection pooling, and concurrency boundaries.',
    '# Designing High-Concurrency APIs with FastAPI

High-concurrency services require more than simply declaring an endpoint as asynchronous.

The application needs clear concurrency boundaries, efficient database connection pooling, controlled resource usage, and predictable failure behavior.

## Async request handling

FastAPI provides an excellent foundation for I/O-heavy APIs through Python''s asynchronous runtime.

```python
@app.get("/orders")
async def list_orders():
    return await repository.list_orders()