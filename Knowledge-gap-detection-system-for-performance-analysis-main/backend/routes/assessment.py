from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.assessment import get_assessment, grade_assessment

router = APIRouter()

class AssessmentQuestionResponse(BaseModel):
    id: str
    prompt: str
    options: tuple[str, ...]

class AssessmentResponse(BaseModel):
    topic: str
    questions: list[AssessmentQuestionResponse]

class AssessmentSubmission(BaseModel):
    answers: list[int]

@router.get("/{topic}", response_model=AssessmentResponse)
def get_topic_assessment(topic: str) -> AssessmentResponse:
    questions = get_assessment(topic)
    if not questions:
        raise HTTPException(status_code=404, detail="Assessment topic not found")
    return AssessmentResponse(topic=topic, questions=[AssessmentQuestionResponse(id=q.id, prompt=q.prompt, options=q.options) for q in questions])

@router.post("/{topic}/submit")
def submit_topic_assessment(topic: str, submission: AssessmentSubmission) -> dict[str, object]:
    try:
        return grade_assessment(topic, submission.answers)
    except ValueError as error:
        raise HTTPException(status_code=422, detail=str(error)) from error
