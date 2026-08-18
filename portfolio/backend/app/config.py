from functools import lru_cache

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings, loaded from environment variables / .env file."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # --- App metadata ---
    app_name: str = "Ambrose Abaasa Portfolio API"
    environment: str = "development"

    # --- Database ---
    database_url: str = Field(
        default="postgresql+asyncpg://portfolio:Ambrose01*@localhost:5432/portfolio",
        description="Async SQLAlchemy PostgreSQL connection URL",
    )

    # --- CORS ---
    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:3000",
        "http://ambrose-abaasa-blog.vercel.app/",
    ]

    @field_validator("cors_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: str | list[str]) -> list[str]:
        """Allow CORS_ORIGINS to be provided as a JSON list or a comma-separated string."""
        if isinstance(value, list):
            return value

        return [
            origin.strip()
            for origin in value.split(",")
            if origin.strip()
        ]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()