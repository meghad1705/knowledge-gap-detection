from fastapi import APIRouter, HTTPException
from ..models import Student
from ..services.cohort import get_cohort_students

router = APIRouter()

@router.get("/me", response_model=Student)
def get_current_student() -> Student:
    return Student.model_validate(get_cohort_students()[0].__dict__)


@router.get("", response_model=list[Student])
def get_students() -> list[Student]:
    return [Student.model_validate(student.__dict__) for student in get_cohort_students()]


@router.get("/all", response_model=list[Student])
def get_all_students() -> list[Student]:
    return get_students()


@router.get("/{student_id}", response_model=Student)
def get_student(student_id: int) -> Student:
    student = next((item for item in get_cohort_students() if item.id == student_id), None)
    if student is None:
        raise HTTPException(status_code=404, detail="Student ID not found")
    return Student.model_validate(student.__dict__)
