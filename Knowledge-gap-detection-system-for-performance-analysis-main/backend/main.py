from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from .routes.students import router as students_router
from .routes.quiz import router as quiz_router
from .routes.performance import router as performance_router
from .routes.data import router as data_router
from .routes.content import router as content_router
from .routes.assessment import router as assessment_router

app = FastAPI(title="Atlas Student Performance API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
app.include_router(students_router, prefix="/api/students", tags=["students"])
app.include_router(quiz_router, prefix="/api/quizzes", tags=["quizzes"])
app.include_router(performance_router, prefix="/api/performance", tags=["performance"])
app.include_router(data_router, prefix="/api/data", tags=["data"])
app.include_router(content_router, prefix="/api/content", tags=["content"])
app.include_router(assessment_router, prefix="/api/assessments", tags=["assessments"])


@app.get("/", include_in_schema=False)
def login_page() -> FileResponse:
    return FileResponse("frontend/login.html")


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "atlas"}


app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
