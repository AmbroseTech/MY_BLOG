from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import BlogPost
from app.schemas import BlogPostDetail, BlogPostSummary

router = APIRouter(prefix="/blog", tags=["Blog"])


@router.get("", response_model=list[BlogPostSummary])
async def get_blog_posts(
    limit: int = Query(default=10, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_db),
) -> list[BlogPost]:
    """Return published blog posts with their tags."""
    result = await db.execute(
        select(BlogPost)
        .options(selectinload(BlogPost.tags))
        .where(BlogPost.published_at.is_not(None))
        .order_by(BlogPost.published_at.desc())
        .offset(offset)
        .limit(limit)
    )

    return list(result.scalars().unique().all())


@router.get("/{slug}", response_model=BlogPostDetail)
async def get_blog_post(
    slug: str,
    db: AsyncSession = Depends(get_db),
) -> BlogPost:
    """Return a single published blog post."""
    result = await db.execute(
        select(BlogPost)
        .options(selectinload(BlogPost.tags))
        .where(
            BlogPost.slug == slug,
            BlogPost.published.is_(True),
        )
    )

    post = result.scalar_one_or_none()

    if post is None:
        raise HTTPException(
            status_code=404,
            detail="Blog post not found",
        )

    return post