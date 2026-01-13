import sys
import os

# Add the src directory to the system path
sys.path.append(os.path.join(os.path.dirname(__file__), "src"))

from app.main import app

# This file exists solely to satisfy Vercel's build scanner
# which looks for 'app.py' or 'main.py' in the root.
