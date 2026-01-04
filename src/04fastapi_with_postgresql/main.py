from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Annotated
import models
from database import Sessionlocal, engine
from sqlalchemy.orm import Session

app = FastAPI()
models.base.metadata.create_all(bind=engine)

class ChoiceBase(BaseModel):
    choice_question: str
    is_correct: bool

class QuestionBase(BaseModel):
    question_text: str
    choices: List[ChoiceBase]

def get_db():
    db = Sessionlocal()
    try:
        yield db
    finally:
        db.close()
        
#dependency injection
db_session = Annotated[Session, Depends(get_db)]