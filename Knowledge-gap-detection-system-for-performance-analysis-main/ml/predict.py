from pathlib import Path
import joblib

MODEL_PATH = Path(__file__).parent / "model" / "random_forest.pkl"


def predict(student_id: int) -> float:
    return predict_students([student_id])[student_id]


def predict_students(student_ids: list[int]) -> dict[int, float]:
    """Predict accuracy for a cohort of students in one model call."""
    if not student_ids:
        return {}
    model = joblib.load(MODEL_PATH)
    predictions = model.predict([[student_id] for student_id in student_ids])
    return {
        student_id: float(prediction)
        for student_id, prediction in zip(student_ids, predictions)
    }
