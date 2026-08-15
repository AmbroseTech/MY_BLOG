from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import DeveloperProfile
from app.schemas import DeveloperProfileResponse

router = APIRouter(prefix="/profile", tags=["Profile"])


@router.get("", response_model=DeveloperProfileResponse)
async def get_profile(
    db: AsyncSession = Depends(get_db),
) -> DeveloperProfile:
    """Return the public developer profile."""
    result = await db.execute(
        select(DeveloperProfile).limit(1)
    )

    profile = result.scalar_one_or_none()

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="Developer profile not configured",
        )

    return profile