from pathlib import Path
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

ROOT = Path(__file__).parents[1]
DATA_PATH = ROOT / "data" / "processed" / "cleaned_student_data.csv"
MODEL_PATH = ROOT / "ml" / "model" / "random_forest.pkl"


def train() -> None:
    data = pd.read_csv(DATA_PATH)
    model = RandomForestRegressor(n_estimators=50, random_state=42)
    model.fit(data[["student_id"]], data["accuracy"])
    MODEL_PATH.parent.mkdir(exist_ok=True)
    joblib.dump(model, MODEL_PATH)


if __name__ == "__main__":
    train()
