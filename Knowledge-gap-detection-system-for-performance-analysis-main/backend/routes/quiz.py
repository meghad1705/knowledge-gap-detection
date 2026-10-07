from fastapi import APIRouter
from ..models import QuizResult, QuizSubmission

router = APIRouter()

@router.get("/recent", response_model=list[QuizResult])
def get_recent_quizzes() -> list[QuizResult]:
    return [
        QuizResult(topic="Algebra foundations", score=8, total=10),
        QuizResult(topic="Mechanics checkpoint", score=7, total=10),
    ]

@router.post("/submit", response_model=QuizResult)
def submit_quiz(submission: QuizSubmission) -> QuizResult:
    answer_key = [1, 0, 2, 1, 0, 2, 1, 0]
    score = sum(answer == expected for answer, expected in zip(submission.answers, answer_key))
    return QuizResult(topic=submission.topic, score=score, total=len(answer_key))
