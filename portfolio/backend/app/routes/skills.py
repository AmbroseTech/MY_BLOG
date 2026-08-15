from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import Skill
from app.schemas import SkillResponse

router = APIRouter(prefix="/skills", tags=["Skills"])


@router.get("", response_model=list[SkillResponse])
async def get_skills(
    db: AsyncSession = Depends(get_db),
) -> list[Skill]:
    """Return the developer's skills ordered for presentation."""
    result = await db.execute(
        select(Skill).order_by(Skill.display_order.asc())
    )

    return list(result.scalars().all())