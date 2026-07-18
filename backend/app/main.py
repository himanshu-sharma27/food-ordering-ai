from fastapi import FastAPI

from app.database.database import Base, engine
from app.models.menu import MenuItem
from app.routers import menu_router
from app.models.user import User
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.order import Order
from app.models.order_item import OrderItem

from app.routers import order_router
from app.routers import dashboard_router
from app.routers import search_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Food Ordering AI API",
    description="Backend API for the AI-powered Food Ordering System",
    version="1.0.0",
    
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://YOUR_FRONTEND_URL.vercel.app"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


app.include_router(menu_router.router)
app.include_router(order_router.router)
app.include_router(dashboard_router.router)
app.include_router(search_router.router)

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