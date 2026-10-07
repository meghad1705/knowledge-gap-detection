from __future__ import annotations

import csv
from threading import RLock
from pathlib import Path
from typing import Iterable

REQUIRED_COLUMNS = ("student_id", "subject", "topic", "correct", "total")
DATA_FILE_LOCK = RLock()


def validate_record(record: dict[str, object]) -> dict[str, object]:
    missing = [column for column in REQUIRED_COLUMNS if record.get(column) in (None, "")]
    if missing:
        raise ValueError(f"Missing required fields: {', '.join(missing)}")

    student_id = int(record["student_id"])
    correct = int(record["correct"])
    total = int(record["total"])
    if student_id < 1 or total < 1 or correct < 0 or correct > total:
        raise ValueError("student_id must be positive and correct must be between 0 and total")

    return {
        "student_id": student_id,
        "subject": str(record["subject"]).strip(),
        "topic": str(record["topic"]).strip(),
        "correct": correct,
        "total": total,
    }


def collect_records(path: Path, records: Iterable[dict[str, object]]) -> int:
    with DATA_FILE_LOCK:
        path.parent.mkdir(parents=True, exist_ok=True)
        validated = [validate_record(record) for record in records]
        if not validated:
            return 0

        file_exists = path.exists() and path.stat().st_size > 0
        with path.open("a", newline="", encoding="utf-8") as destination:
            writer = csv.DictWriter(destination, fieldnames=REQUIRED_COLUMNS)
            if not file_exists:
                writer.writeheader()
            writer.writerows(validated)
        return len(validated)
