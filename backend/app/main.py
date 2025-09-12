from fastapi import FastAPI, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from app.routes.employee_routes import router as employee_router
from app.routes.user_routes import router as user_router
from app.routes.auth_routes import router as auth_router

app = FastAPI(
    title="Employee Management API",
    description="Backend for managing employees with MongoDB",
    version="1.0.0"
)

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(employee_router)
app.include_router(user_router)

# Root endpoint for health check
@app.get("/")
async def root():
    """
    Health check endpoint.
    Returns a simple message to confirm the API is running.
    """
    return {"message": "Employee Management API is running!"}