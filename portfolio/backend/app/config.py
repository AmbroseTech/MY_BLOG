from functools import lru_cache

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    app_name: str = "Ambrose Abaasa Portfolio API"
    environment: str = "development"

    database_url: str = Field(
        default="postgresql+asyncpg://portfolio:portfolio@localhost:5432/portfolio",
        description="Async SQLAlchemy PostgreSQL connection URL",
    )

    cors_origins: list[str] = [
        "http://localhost:5173",
    ]

    @field_validator("cors_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: str | list[str]) -> list[str]:
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