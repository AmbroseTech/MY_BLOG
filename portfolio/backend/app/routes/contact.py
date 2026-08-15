from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app import models, schemas

router = APIRouter()


@router.post("/contact", response_model=schemas.ContactOut, tags=["Contact"])
async def create_contact_message(
    payload: schemas.ContactCreate,
    db: AsyncSession = Depends(get_db),
):
    new_message = models.ContactMessage(**payload.model_dump())
    db.add(new_message)
    await db.commit()
    await db.refresh(new_message)
    return new_message