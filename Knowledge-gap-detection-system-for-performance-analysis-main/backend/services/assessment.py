from dataclasses import dataclass

@dataclass(frozen=True)
class AssessmentQuestion:
    id: str
    prompt: str
    options: tuple[str, ...]
    correct_option: int
    explanation: str

ASSESSMENTS = {
    "quadratic-equations": (
        AssessmentQuestion("q1", "What is the value of x in x² - 5x + 6 = 0?", ("x = 1 or x = 6", "x = 2 or x = 3", "x = -2 or x = -3"), 1, "Factor the equation as (x - 2)(x - 3) = 0."),
        AssessmentQuestion("q2", "What is the vertex of y = (x - 2)² + 3?", ("(-2, 3)", "(2, -3)", "(2, 3)"), 2, "The vertex form is y = (x - h)² + k, so the vertex is (h, k)."),
        AssessmentQuestion("q3", "A parabola opens upward when its leading coefficient is...", ("negative", "zero", "positive"), 2, "A positive coefficient produces an upward-opening parabola."),
    ),
    "mechanics": (
        AssessmentQuestion("q1", "Newton's second law is represented by...", ("F = ma", "E = mc²", "p = mv²"), 0, "Force equals mass multiplied by acceleration."),
        AssessmentQuestion("q2", "If mass stays constant and force doubles, acceleration...", ("halves", "doubles", "stays the same"), 1, "From F = ma, acceleration changes in direct proportion to force."),
    ),
}


def get_assessment(topic: str) -> tuple[AssessmentQuestion, ...]:
    return ASSESSMENTS.get(topic, ())


def grade_assessment(topic: str, answers: list[int]) -> dict[str, object]:
    questions = get_assessment(topic)
    if not questions:
        raise ValueError(f"Unknown assessment topic: {topic}")
    if len(answers) != len(questions):
        raise ValueError(f"Expected {len(questions)} answers, received {len(answers)}")
    score = sum(answer == question.correct_option for answer, question in zip(answers, questions))
    return {"topic": topic, "score": score, "total": len(questions), "percentage": round(score / len(questions) * 100), "feedback": [question.explanation for answer, question in zip(answers, questions) if answer != question.correct_option]}
