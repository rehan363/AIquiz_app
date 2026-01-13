import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from unittest.mock import patch, MagicMock
import sys
import os

# Set up path to import app correctly
sys.path.insert(0, os.path.abspath(os.path.join(os.getcwd(), "src")))

from app.main import app
from app.core.database import Base, get_db
from app.models.session import QuizSession, UserAnswer
from app.models.quiz import Question, Choice
from app.models.result import QuizResult

# --- Database Setup for Testing ---
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_endpoints.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

# --- Tests ---

@patch("app.api.quiz_routes.InMemoryRunner")
def test_generate_quiz(mock_runner_class):
    """Test POST /quiz/generate"""
    mock_runner = mock_runner_class.return_value
    mock_runner.run.return_value = [] # Generate just calls it for side effects
    # 1. Mock the agent initializing a session in the DB
    # In real flow, the agent calls a tool. Here we manually add data to mock that tool's effect.
    db = TestingSessionLocal()
    session = QuizSession(topic="FastAPI", status="active")
    db.add(session)
    db.commit()
    db.refresh(session)
    db.close()

    response = client.post("/quiz/generate", json={"topic": "FastAPI"})
    
    assert response.status_code == 200
    data = response.json()
    assert data["session_id"] is not None
    assert "generated successfully" in data["message"]

def test_get_next_question():
    """Test GET /quiz/next"""
    # 1. Setup Data
    db = TestingSessionLocal()
    session = QuizSession(topic="Python", status="active")
    db.add(session)
    db.commit()
    session_id = session.id
    
    q = Question(question_text="What is Python?", topic="Python")
    db.add(q)
    db.commit()
    db.refresh(q)
    
    c1 = Choice(choice_text="Language", is_correct=True, question_id=q.id)
    c2 = Choice(choice_text="Snake", is_correct=False, question_id=q.id)
    db.add_all([c1, c2])
    db.commit()
    db.close()

    # 2. Call endpoint
    response = client.get(f"/quiz/next?session_id={session_id}")
    
    assert response.status_code == 200
    data = response.json()
    assert data["question_text"] == "What is Python?"
    assert len(data["choices"]) == 2
    assert data["current_number"] == 1

@patch("app.api.quiz_routes.InMemoryRunner")
def test_submit_answer(mock_runner_class):
    """Test POST /quiz/submit"""
    mock_runner = mock_runner_class.return_value
    
    # Mock events for explanation
    mock_event = MagicMock()
    mock_event.content.parts = [MagicMock(text="Explanation of Python")]
    mock_runner.run.return_value = [mock_event]

    # 1. Setup Data
    db = TestingSessionLocal()
    session = QuizSession(topic="Python", status="active")
    db.add(session)
    db.commit()
    session_id = session.id
    
    q = Question(question_text="What is Python?", topic="Python")
    db.add(q)
    db.commit()
    q_id = q.id
    
    c_correct = Choice(choice_text="Language", is_correct=True, question_id=q_id)
    c_wrong = Choice(choice_text="Snake", is_correct=False, question_id=q_id)
    db.add_all([c_correct, c_wrong])
    db.commit()
    c_correct_id = c_correct.id
    c_wrong_id = c_wrong.id
    db.close()

    # 2. Test Correct Answer
    response = client.post("/quiz/submit", json={
        "session_id": session_id,
        "question_id": q_id,
        "choice_id": c_correct_id
    })
    assert response.status_code == 200
    assert response.json()["is_correct"] is True

    # 3. Test Wrong Answer (with AI explanation trigger)
    response = client.post("/quiz/submit", json={
        "session_id": session_id,
        "question_id": q_id,
        "choice_id": c_wrong_id
    })
    assert response.status_code == 200
    assert response.json()["is_correct"] is False
    assert response.json()["explanation"] == "Explanation of Python"

def test_finalize_quiz():
    """Test POST /quiz/finalize"""
    # 1. Setup Data
    db = TestingSessionLocal()
    session = QuizSession(topic="Testing", status="active", total_score=4)
    db.add(session)
    db.commit()
    session_id = session.id
    db.close()

    # 2. Call Finalize
    response = client.post("/quiz/finalize", json={
        "session_id": session_id,
        "user_name": "Test User",
        "user_email": "test@example.com"
    })
    
    assert response.status_code == 200
    data = response.json()
    assert data["user_name"] == "Test User"
    assert data["score"] == 4
    assert data["percentage"] == 80.0
