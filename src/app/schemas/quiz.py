from pydantic import BaseModel, EmailStr, ConfigDict
from typing import List, Optional
from datetime import datetime

# --- Choices & Questions ---

class ChoiceBase(BaseModel):
    id: int
    choice_text: str

    model_config = ConfigDict(from_attributes=True)

class QuestionResponse(BaseModel):
    id: int
    question_text: str
    choices: List[ChoiceBase]
    current_number: int
    total_questions: int

    model_config = ConfigDict(from_attributes=True)

# --- Quiz Generation ---

class QuizGenerateRequest(BaseModel):
    topic: str

class QuizGenerateResponse(BaseModel):
    session_id: int
    message: str
    total_questions: int = 5

# --- Answer Submission ---

class AnswerSubmission(BaseModel):
    session_id: int
    question_id: int
    choice_id: int

class AnswerValidationResponse(BaseModel):
    is_correct: bool
    correct_choice_id: Optional[int] = None
    explanation: Optional[str] = None
    next_question_available: bool

# --- Finalization & Results ---

class QuizFinalizeRequest(BaseModel):
    session_id: int
    user_name: str
    user_email: EmailStr

class QuizResultResponse(BaseModel):
    user_name: str
    topic: str
    score: int
    total_questions: int
    percentage: float
    completed_at: datetime

    model_config = ConfigDict(from_attributes=True)

