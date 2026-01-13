from typing import List, Dict
import logging
from ..core.database import SessionLocal
from ..models.quiz import Question, Choice
from ..models.session import QuizSession

logger = logging.getLogger(__name__)

# Note: In Google ADK, tools are typically passed to the agent as a list of functions.
# We will define them here so they can be imported.

def initialize_quiz_session(topic: str, questions_data: list[dict]) -> int:
    """
    Initializes a new quiz session and saves the generated questions and choices to the database.
    
    Args:
        topic (str): The subject of the quiz.
        questions_data (List[Dict]): A list of questions, where each question has 
                                     'question_text' and a list of 'choices'.
                                     Each choice has 'choice_text' and 'is_correct'.
                                     
    Returns:
        int: The unique ID of the newly created QuizSession.
    """
    db = SessionLocal()
    logger.info(f"initialize_quiz_session called for topic: {topic}")
    try:
        # 1. Create the Session record
        db_session = QuizSession(topic=topic)
        db.add(db_session)
        db.commit()
        db.refresh(db_session)
        logger.info(f"Created session with ID: {db_session.id}")
        
        # 2. Iterate through and save questions
        for q_data in questions_data:
            # logger.debug(f"Saving question: {q_data.get('question_text')}") 
            db_question = Question(
                question_text=q_data["question_text"],
                topic=topic
            )
            db.add(db_question)
            db.commit()
            db.refresh(db_question)
            
            # 3. Save choices for this question
            for c_data in q_data["choices"]:
                db_choice = Choice(
                    choice_text=c_data["choice_text"],
                    is_correct=c_data["is_correct"],
                    question_id=db_question.id
                )
                db.add(db_choice)
        
        db.commit()
        logger.info(f"Successfully saved quiz session {db_session.id}")
        return db_session.id
    
    except Exception as e:
        db.rollback()
        logger.error(f"Error in initialize_quiz_session: {e}")
        return -1
    finally:
        db.close()

def get_educational_context(topic: str) -> str:
    """
    Provides additional educational guidelines or context for a specific topic 
    to help the AI generate more accurate and challenging questions.
    """
    # This could be expanded to query a knowledge base or search tool.
    # For now, we return a standard pedagogical instruction.
    return f"Focus on core concepts, common misconceptions, and practical applications of {topic}."
