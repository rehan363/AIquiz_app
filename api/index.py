import os
import sys

# Add the src directory to the system path so imports work correctly
sys.path.append(os.path.join(os.path.dirname(__file__), '../src'))

from app.main import app

# Set root_path to /api for Vercel
# This ensures that FastAPI knows it is running behind a proxy at /api
app.root_path = "/api"
