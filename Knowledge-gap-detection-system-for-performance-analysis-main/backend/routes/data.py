from pathlib import Path
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.data_collection import collect_records
from ..services.preprocessing import preprocess_file

router = APIRouter()
RAW_DATA_PATH = Path(__file__).parents[2] / "data" / "raw" / "student_data.csv"

class PerformanceRecord(BaseModel):
    student_id: int
    subject: str
    topic: str
    correct: int
    total: int

class CollectionResponse(BaseModel):
    collected: int
    destination: str

class PreprocessingResponse(BaseModel):
    processed: int
    destination: str

@router.post("/collect", response_model=CollectionResponse, status_code=201)
def collect_performance(records: list[PerformanceRecord]) -> CollectionResponse:
    try:
        count = collect_records(RAW_DATA_PATH, [record.model_dump() for record in records])
    except (TypeError, ValueError) as error:
        raise HTTPException(status_code=422, detail=str(error)) from error
    return CollectionResponse(collected=count, destination="data/raw/student_data.csv")

@router.post("/preprocess", response_model=PreprocessingResponse)
def preprocess_performance() -> PreprocessingResponse:
    destination = Path(__file__).parents[2] / "data" / "processed" / "cleaned_student_data.csv"
    processed = preprocess_file(RAW_DATA_PATH, destination)
    return PreprocessingResponse(processed=processed, destination="data/processed/cleaned_student_data.csv")
