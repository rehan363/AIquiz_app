from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import re
import logging
from google.adk.runners import InMemoryRunner
from google.genai import types

from ..core.database import get_db
from ..agent.core import get_educator_agent
from ..schemas.quiz import (
    QuizGenerateRequest, 
    QuizGenerateResponse, 
    QuestionResponse, 
    AnswerSubmission, 
    AnswerValidationResponse,
    QuizFinalizeRequest,
    QuizResultResponse
)
from ..models.session import QuizSession, UserAnswer
from ..models.quiz import Question, Choice
from ..models.result import QuizResult

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/quiz", tags=["Quiz"])

@router.post("/generate", response_model=QuizGenerateResponse)
async def generate_quiz(request: QuizGenerateRequest, db: Session = Depends(get_db)):
    # 1. Trigger the ADK Agent
    # The agent will use its tools to find context and save the quiz to the DB
    prompt = f"Please generate a professional quiz about {request.topic}."
    
    try:
        # Get the educator agent (lazy-loaded on first use)
        educator_agent = get_educator_agent()
        
        # Create a runner for this execution
        # We use app_name="agents" to match the default agent directory structure in ADK
        runner = InMemoryRunner(agent=educator_agent, app_name="agents")
        
        logger.info(f"Starting quiz generation for topic: {request.topic}")
        
        # Execute the agent using run_debug which handles session creation automatically
        # and runs asynchronously, avoiding threading issues.
        events = await runner.run_debug(
            user_messages=prompt,
            quiet=True # We are handling our own logging
        )
        
        # Log all events from the runner to see what the ADK is doing
        logger.debug(f"--- runner events for topic '{request.topic}' ---")
        for event in events:
            logger.debug(str(event))
        logger.debug("----------------------------")
        
        # 2. Extract the Session ID from the agent's response
        session_id = None
        for event in events:
            if event.content and event.content.parts:
                for part in event.content.parts:
                    if hasattr(part, 'function_response') and part.function_response:
                        if part.function_response.name == 'initialize_quiz_session':
                            session_id = part.function_response.response.get('result')
                            break
            if session_id:
                break
        
        if not session_id or session_id == -1:
            raise HTTPException(status_code=500, detail="AI Agent failed to initialize the quiz session.")

        return QuizGenerateResponse(
            session_id=session_id,
            total_questions=5,
            message="Your quiz has been generated successfully! You can now start the test."
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/next", response_model=QuestionResponse)
async def get_next_question(session_id: int, db: Session = Depends(get_db)):
    session = db.query(QuizSession).filter(QuizSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    answered_ids = db.query(UserAnswer.question_id).filter(
        UserAnswer.session_id == session_id
    ).all()
    answered_ids = [r[0] for r in answered_ids]

    next_q = db.query(Question).filter(
        Question.topic == session.topic,
        ~Question.id.in_(answered_ids) if answered_ids else True
    ).order_by(Question.id.asc()).first()

    if not next_q:
        raise HTTPException(status_code=400, detail="No more questions available.")

    return QuestionResponse(
        id=next_q.id,
        question_text=next_q.question_text,
        choices=next_q.choices,
        current_number=len(answered_ids) + 1,
        total_questions=5
    )

@router.post("/submit", response_model=AnswerValidationResponse)
async def submit_answer(submission: AnswerSubmission, db: Session = Depends(get_db)):
    # 1. Get the session and the selected choice
    session = db.query(QuizSession).filter(QuizSession.id == submission.session_id).first()
    choice = db.query(Choice).filter(Choice.id == submission.choice_id).first()
    question = db.query(Question).filter(Question.id == submission.question_id).first()

    if not session or not choice or not question:
        raise HTTPException(status_code=404, detail="Session, Question, or Choice not found")

    # 2. Record the user answer
    db_answer = UserAnswer(
        session_id=submission.session_id,
        question_id=submission.question_id,
        choice_id=submission.choice_id,
        is_correct=choice.is_correct
    )
    db.add(db_answer)
    
    if choice.is_correct:
        session.total_score += 1
    
    db.commit()

    # 3. Handle Explanation if wrong
    explanation = None
    correct_choice_id = None
    if not choice.is_correct:
        correct_choice = db.query(Choice).filter(
            Choice.question_id == question.id, 
            Choice.is_correct == True
        ).first()
        correct_choice_id = correct_choice.id if correct_choice else None
        
        # For now, provide a simple static explanation to avoid the threading issue
        explanation = f"The correct answer is '{correct_choice.choice_text if correct_choice else 'unknown'}'. This is the most accurate option based on the question requirements."

    # 4. Check if there are more questions
    answered_count = db.query(UserAnswer).filter(UserAnswer.session_id == submission.session_id).count()

    return AnswerValidationResponse(
        is_correct=choice.is_correct,
        correct_choice_id=correct_choice_id,
        explanation=explanation,
        next_question_available=(answered_count < 5)
    )

@router.post("/finalize", response_model=QuizResultResponse)
async def finalize_quiz(request: QuizFinalizeRequest, db: Session = Depends(get_db)):
    session = db.query(QuizSession).filter(QuizSession.id == request.session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Save to the permanent results table
    db_result = QuizResult(
        user_name=request.user_name,
        user_email=request.user_email,
        topic=session.topic,
        score=session.total_score,
        total_questions=5
    )
    db.add(db_result)
    
    session.status = "completed"
    db.commit()
    db.refresh(db_result)

    return QuizResultResponse(
        user_name=db_result.user_name,
        topic=db_result.topic,
        score=db_result.score,
        total_questions=5,
        percentage=(db_result.score / 5) * 100,
        completed_at=db_result.completed_at
    )


