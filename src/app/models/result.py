from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from ..core.database import Base

class QuizResult(Base):
    __tablename__ = "quiz_results"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String, index=True)
    user_email = Column(String, index=True)
    topic = Column(String, index=True)
    score = Column(Integer)
    total_questions = Column(Integer, default=5)
    completed_at = Column(DateTime, default=datetime.utcnow)
