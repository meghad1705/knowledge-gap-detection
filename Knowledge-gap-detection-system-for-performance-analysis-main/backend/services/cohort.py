from dataclasses import dataclass
import csv
from pathlib import Path


DATA_PATH = Path(__file__).parents[2] / "data" / "students.csv"
SUBJECTS = ("Mathematics", "Physics", "Computer Science", "English")


@dataclass(frozen=True)
class CohortStudent:
    id: int
    name: str
    mastery: float
    streak: int


def get_cohort_students() -> list[CohortStudent]:
    with DATA_PATH.open(newline="", encoding="utf-8") as source:
        return [
            CohortStudent(
                id=int(row["id"]),
                name=row["name"],
                mastery=float(row["mastery"]),
                streak=int(row["streak"]),
            )
            for row in csv.DictReader(source)
        ]


def cohort_summary() -> dict[str, float]:
    students = get_cohort_students()
    mastery = sum(student.mastery for student in students) / len(students)
    return {
        "overall_mastery": round(mastery, 1),
        "quiz_accuracy": round(max(0, mastery - 2.5), 1),
        "learning_hours": round(len(students) * 0.08, 1),
    }