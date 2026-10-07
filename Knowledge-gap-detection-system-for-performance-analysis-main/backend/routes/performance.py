from fastapi import APIRouter
from ..models import PerformanceSummary
from ..services.cohort import cohort_summary

router = APIRouter()

@router.get("/summary", response_model=PerformanceSummary)
def get_performance_summary() -> PerformanceSummary:
    return PerformanceSummary(**cohort_summary())
