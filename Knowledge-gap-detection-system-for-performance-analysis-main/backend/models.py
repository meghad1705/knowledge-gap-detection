from pydantic import BaseModel

class Student(BaseModel):
    id: int
    name: str
    mastery: float
    streak: int


class CohortSummary(BaseModel):
    total_students: int
    average_mastery: float
    students_needing_support: int

class QuizResult(BaseModel):
    topic: str
    score: int
    total: int

class QuizSubmission(BaseModel):
    topic: str
    answers: list[int]

class PerformanceSummary(BaseModel):
    overall_mastery: float
    quiz_accuracy: float
    learning_hours: float
