from fastapi import FastAPI
from app.database.database import Base, engine
from app.models.menu import MenuItem
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Food Ordering AI API",
    description="Backend API for the AI-powered Food Ordering System",
    version="1.0.0",
)

@app.get("/")
def root():
    return {
        "message": "Welcome to the Food Ordering AI API 🚀"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "message": "Server is running successfully."
    }