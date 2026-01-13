# Master Project Plan: Professional Agentic Quiz Platform

This document outlines the granular engineering steps required to build the Agentic Quiz Platform using FastAPI, PostgreSQL, and the Google Agent Development Kit (ADK).

---

## Milestone 1: Environment & Professional Scaffolding
*Goal: Establish a robust, domain-driven directory structure.*

- [ ] **1.1 Directory Setup**: Transform the flat structure into a professional modular layout.
  - `src/app/core`: Configuration, DB engine, and security.
  - `src/app/models`: SQLAlchemy database entities.
  - `src/app/schemas`: Pydantic data validation contracts.
  - `src/app/services`: Business logic (scoring, AI orchestration).
  - `src/app/api`: FastAPI routes and dependencies.
  - `src/app/agent`: Google ADK definitions and tools.
- [ ] **1.2 Dependency Management**: Finalize `uv` sync for all libraries (`google-adk`, `fastapi`, `sqlalchemy`, `psycopg2-binary`).
- [ ] **1.3 Environment Configuration**: Secure `.env` handling for `GOOGLE_API_KEY` and `DATABASE_URL`.

---

## Milestone 2: Persistent Data Layer (Models & Schema)
*Goal: Define the "Truth" of the system with relational tables.*

- [ ] **2.1 Entity Design**: Implement the 5 core tables in SQLAlchemy.
  - `Questions` / `Choices`: The content library.
  - `QuizSessions`: Lifecycle tracking for active attempts.
  - `UserAnswers`: Granular tracking of every click (for the 1-by-1 logic).
  - `QuizResults`: The permanent, immutable ledger of completions.
- [ ] **2.2 Migration Strategy**: Setup **Alembic** to manage database versions professionally.
- [ ] **2.3 DB Utilities**: Create the `get_db` session manager with error handling.

---

## Milestone 3: Agentic Intelligence Layer (Google ADK)
*Goal: Build the "Brain" and its "Hands" (Tools).*

- [ ] **3.1 Tool Development**: Write Python functions decorated for ADK:
  - `save_quiz_to_db`: Allows the agent to persist generated questions.
  - `validate_topic`: A tool to ensure the topic is educational and safe.
- [ ] **3.2 Agent Configuration**: Define the `EducatorAgent`.
  - **System Instruction**: Set pedagogical rules (correct distractors, clear wording).
  - **Logic**: Configure the agent to use Gemini 1.5 with the structured tools.
- [ ] **3.3 Guardrail Implementation**: Add logic to verify AI-generated JSON before it touches the database.

---

## Milestone 4: Interactive API Orchestration
*Goal: Implement the "1-by-1" stateful logic.*

- [ ] **4.1 Initialization Route**: `POST /quiz/generate`
  - Triggers the ADK agent -> Saves Questions -> Returns `session_id`.
- [ ] **4.2 Stateful Delivery**: `GET /quiz/next`
  - Logic: Finds the first unanswered question in the `UserAnswers` audit for that session.
- [ ] **4.3 Atomic Validation**: `POST /quiz/submit`
  - Checks answer on server -> Saves to `UserAnswers` -> Returns result + AI explanation (if wrong).
- [ ] **4.4 Completion Logic**: `POST /quiz/finalize`
  - Collects User Name/Email -> Calculates total score -> Writes to `QuizResults`.

---

## Milestone 5: Professional Frontend (Next.js)
*Goal: A "Cosmic Glass" UI that wows the user.*

- [ ] **5.1 Layout & Theme**: Implement Tailwind CSS configurations for Glassmorphism.
- [ ] **5.2 Chat-like Interface**: Build the chatbot interaction for topic selection.
- [ ] **5.3 The Interactive Stage**:
  - One-by-one question cards.
  - Animation transitions (Slide/Fade).
  - Visual feedback system (Glow Red for wrong, Glow Green for right).
- [ ] **5.4 Result Dashboard**: A premium summary screen for the student.

---

## Milestone 6: Quality Assurance & Optimization
*Goal: Ensure the system is production-ready.*

- [ ] **6.1 Unit Testing**: Write tests for the scoring logic and API responses.
- [ ] **6.2 Prompt Engineering**: Fine-tune the AI instructions to prevent repetitive questions.
- [ ] **6.3 Performance**: Optimize DB queries using SQLAlchemy `joinedload` for eager fetching.

---

## Strategic Implementation Order
1. **DB Models** (The Foundation)
2. **ADK Tools** (The Hands)
3. **ADK Agent** (The Brain)
4. **FastAPI Routes** (The Interface)
5. **Frontend UI** (The Presentation)
