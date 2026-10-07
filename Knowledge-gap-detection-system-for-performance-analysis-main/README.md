# Atlas Student Performance System

Atlas is a focused student workspace for tracking mastery, finding knowledge gaps, and choosing the next useful practice session.

## Run the frontend

Open `frontend/index.html` directly in a browser, or serve the folder with any static file server.

## Run the API

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn backend.main:app --reload
```

For a production deployment supporting around 200 active users, run multiple API workers behind a reverse proxy:

```powershell
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --workers 4
```

The current CSV data store is suitable for a local prototype and is protected against concurrent writes within one process. For multiple workers or multiple application instances, migrate collected activity to SQLite in single-instance deployments or PostgreSQL for shared production storage before going live.

The health check is available at `http://127.0.0.1:8000/health`.

## Data and learning APIs

- `POST /api/data/collect` validates and appends performance records to the raw CSV.
- `POST /api/data/preprocess` cleans valid raw records into the processed CSV.
- `GET /api/content` returns the learning-content catalog; filter with `?subject=Physics`.
- `GET /api/assessments/{topic}` returns an assessment without exposing answer keys.
- `POST /api/assessments/{topic}/submit` grades an assessment and returns feedback.

## Dashboard pages

The dashboard uses six primary pages to organize the system modules:

- `Overview`: progress and analytics at a glance.
- `Quizzes`: learning content delivery and assessment.
- `Video library`: structured learning content.
- `AI tutor`: personalized practice and recommendations.
- `Skill map`: knowledge gaps and next connections.
- `History`: collected learning activity and processed results.

`Profile` remains available as a secondary account page.

## Project areas

- `frontend/`: responsive dashboard and linked learning views
- `backend/`: FastAPI routes and analysis services
- `data/`: raw and cleaned sample performance data
- `ml/`: model training and prediction entry points
- `notebooks/`: exploratory preprocessing work
