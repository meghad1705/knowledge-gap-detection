from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.content import get_content, list_content

router = APIRouter()

class ContentResponse(BaseModel):
    id: str
    subject: str
    title: str
    content_type: str
    duration_minutes: int
    level: str
    description: str
    topic: str

@router.get("", response_model=list[ContentResponse])
def get_learning_content(subject: str | None = None) -> list[ContentResponse]:
    return [ContentResponse(**item.__dict__) for item in list_content(subject)]

@router.get("/{content_id}", response_model=ContentResponse)
def get_learning_item(content_id: str) -> ContentResponse:
    item = get_content(content_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Learning content not found")
    return ContentResponse(**item.__dict__)
