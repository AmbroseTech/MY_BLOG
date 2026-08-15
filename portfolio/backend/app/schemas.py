from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, HttpUrl
from pydantic import BaseModel, EmailStr
from datetime import datetime


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class ContactOut(ContactCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class SkillResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    category: str
    proficiency: int = Field(ge=0, le=100)
    years_experience: Decimal | None
    description: str | None
    display_order: int


class TagResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    slug: str


class BlogPostSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    title: str
    slug: str
    excerpt: str
    cover_image_url: HttpUrl | None = None
    published_at: datetime | None
    tags: list[TagResponse] = []


class BlogPostDetail(BlogPostSummary):
    content: str
    created_at: datetime
    updated_at: datetime


class DeveloperProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    title: str
    bio: str
    location: str | None
    email: str | None
    github_url: HttpUrl | None
    linkedin_url: HttpUrl | None