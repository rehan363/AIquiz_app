from src.app.core.database import SessionLocal
from src.app.models.session import QuizSession

db = SessionLocal()
sessions = db.query(QuizSession).all()
print("=== Quiz Sessions in Database ===")
for s in sessions:
    print(f'ID: {s.id}, Topic: "{s.topic}", Created: {s.created_at}')
print(f"Total sessions: {len(sessions)}")
db.close()