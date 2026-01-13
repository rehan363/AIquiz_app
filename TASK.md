# Project Execution Tasks: Agentic Quiz Platform

This checklist contains atomic, executable tasks derived from the Master Plan. Mark them as [x] once completed.

---

### Phase 1: Environment & Scaffolding
- [x] **Task 1.1**: Create professional directory structure.
  - Directories: `src/app/{api,core,models,schemas,services,agent}`
- [x] **Task 1.2**: Initialize `__init__.py` files in all new directories to make them Python packages.
- [x] **Task 1.3**: Configure `.env` file with `GOOGLE_API_KEY` and `DATABASE_URL`.
- [x] **Task 1.4**: Setup `src/app/core/config.py` to load environment variables using Pydantic.

---

### Phase 2: Persistent Foundation (DB)
- [x] **Task 2.1**: Implement `src/app/core/database.py` (Engine, SessionLocal, Base).
- [x] **Task 2.2**: Write `src/app/models/quiz.py` containing `Question` and `Choice` tables.
- [x] **Task 2.3**: Write `src/app/models/session.py` containing `QuizSession` and `UserAnswer` tables.
- [x] **Task 2.4**: Write `src/app/models/result.py` containing the permanent `QuizResult` table.
- [x] **Task 2.5**: Initialize Alembic for migrations (`alembic init alembic`).

---

### Phase 3: Google ADK "Hands" (Tools)
- [x] **Task 3.1**: Create `src/app/agent/tools.py`.
- [x] **Task 3.2**: Implement `initialize_quiz_session` tool (Saves AI questions to DB).
- [x] **Task 3.3**: Implement `get_educational_context` tool (Optional: Fetches background info for AI).

---

### Phase 4: Google ADK "Brain" (Agent)
- [x] **Task 4.1**: Create `src/app/agent/core.py`.
- [x] **Task 4.2**: Define `EducatorAgent` using Google ADK `Agent` class.
- [x] **Task 4.3**: Implement the System Prompt in `src/app/agent/prompts.py`.
- [x] **Task 4.4**: Integrate the tools from Task 3.1 into the agent.

---

### Phase 5: API Orchestration (1-by-1 Logic)
- [x] **Task 5.1**: Define Pydantic schemas in `src/app/schemas/` for all requests/responses.
- [x] **Task 5.2**: Implement `POST /quiz/generate` route (Triggers ADK Agent).
- [x] **Task 5.3**: Implement `GET /quiz/next` route (Fetches next unanswered question).
- [x] **Task 5.4**: Implement `POST /quiz/submit` route (Server-side check + AI explanation).
- [x] **Task 5.5**: Implement `POST /quiz/finalize` route (Score calculation + Result storage).

---

### Phase 6: Frontend Implementation
- [x] **Task 6.1**: Initialize Next.js project in `/frontend` directory.
- [x] **Task 6.2**: Setup Tailwind CSS with "Cosmic Glass" color palette.
- [x] **Task 6.3**: Build `QuizComponent` with state for 1-by-1 flow.
- [x] **Task 6.4**: Build `ResultComponent` for final score analysis.

---

### Phase 7: Polish & Launch
- [ ] **Task 7.1**: Add error logging for AI tool calls.
- [ ] **Task 7.2**: Final walkthrough of the student experience.
- [x] **Task 7.3**: Implement comprehensive integration tests for all API endpoints in `tests/test_endpoints.py`.

