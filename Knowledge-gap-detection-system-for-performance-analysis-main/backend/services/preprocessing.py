from pathlib import Path
import csv
from .data_collection import DATA_FILE_LOCK, REQUIRED_COLUMNS, validate_record


def load_student_rows(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as source:
        return list(csv.DictReader(source))


def clean_student_rows(rows: list[dict[str, str]]) -> list[dict[str, object]]:
    cleaned: list[dict[str, object]] = []
    for row in rows:
        try:
            record = validate_record(row)
        except (TypeError, ValueError):
            continue
        cleaned.append({
            "student_id": record["student_id"],
            "subject": record["subject"],
            "topic": record["topic"],
            "accuracy": round(int(record["correct"]) / int(record["total"]) * 100, 1),
        })
    return cleaned


def preprocess_file(source_path: Path, destination_path: Path) -> int:
    with DATA_FILE_LOCK:
        cleaned = clean_student_rows(load_student_rows(source_path))
        destination_path.parent.mkdir(parents=True, exist_ok=True)
        with destination_path.open("w", newline="", encoding="utf-8") as destination:
            fieldnames = ("student_id", "subject", "topic", "accuracy")
            writer = csv.DictWriter(destination, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(cleaned)
        return len(cleaned)
