from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.quiz_routes import router as quiz_router
from .core.logging_config import setup_logging

# Initialize logging before creating the app
setup_logging()

app = FastAPI(title="Quizzly.ai - AI-Powered Quiz Platform")

# Add CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Register the quiz routes
app.include_router(quiz_router)

@app.get("/")
async def root():
    return {"message": "Welcome to Quizzly.ai - Your AI-Powered Quiz Platform"}
