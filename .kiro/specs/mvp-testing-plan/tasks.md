# MVP Testing Tasks - Executable Steps

## Phase 1: API Testing (FastAPI Swagger UI)

### Task 1.1: Access Swagger UI
- [ ] Open: `http://localhost:8000/docs`
- [ ] Verify all 4 endpoints visible
- [ ] Verify no errors

### Task 1.2: Test POST /quiz/generate
- [ ] Click "POST /quiz/generate"
- [ ] Click "Try it out"
- [ ] Enter: `{"topic": "Python Programming"}`
- [ ] Click "Execute"
- [ ] Verify status 200
- [ ] Verify response has: session_id, message, total_questions=5
- [ ] **Save session_id**

### Task 1.3: Test GET /quiz/next (Q1)
- [ ] Click "GET /quiz/next"
- [ ] Click "Try it out"
- [ ] Enter session_id from Task 1.2
- [ ] Click "Execute"
- [ ] Verify status 200
- [ ] Verify: id, question_text, choices (4 items), current_number=1
- [ ] **Save question_id and choice_id**

### Task 1.4: Test POST /quiz/submit (Correct)
- [ ] Click "POST /quiz/submit"
- [ ] Click "Try it out"
- [ ] Enter: session_id, question_id, choice_id=1
- [ ] Click "Execute"
- [ ] Verify status 200
- [ ] Verify: is_correct, next_question_available=true

### Task 1.5: Test GET /quiz/next (Q2)
- [ ] Click "GET /quiz/next"
- [ ] Enter session_id
- [ ] Verify current_number=2
- [ ] **Save new question_id**

### Task 1.6: Test POST /quiz/submit (Incorrect)
- [ ] Click "POST /quiz/submit"
- [ ] Enter: session_id, question_id, choice_id=2 (wrong)
- [ ] Click "Execute"
- [ ] Verify: is_correct=false
- [ ] Verify: explanation is not empty (AI explanation)
- [ ] Verify: correct_choice_id provided

### Task 1.7: Complete Q3, Q4, Q5
- [ ] Repeat Tasks 1.5-1.6 for questions 3, 4, 5
- [ ] Track your score (correct/incorrect for each)

### Task 1.8: Test POST /quiz/finalize
- [ ] Click "POST /quiz/finalize"
- [ ] Click "Try it out"
- [ ] Enter: session_id, user_name="Test User", user_email="test@example.com"
- [ ] Click "Execute"
- [ ] Verify status 200
- [ ] Verify: score matches your correct answers
- [ ] Verify: percentage = (score/5)*100
- [ ] Verify: completed_at is valid timestamp

### Task 1.9: Test Error - Invalid Session
- [ ] Click "GET /quiz/next"
- [ ] Enter session_id=99999
- [ ] Verify status 404
- [ ] Verify error message

### Task 1.10: Test Error - Invalid Email
- [ ] Click "POST /quiz/finalize"
- [ ] Enter invalid email: "invalid-email"
- [ ] Verify status 422 (validation error)

---

## Phase 2: Frontend Testing (Browser)

### Task 2.1: Verify Frontend Loads
- [ ] Open: `http://localhost:3000`
- [ ] Verify page loads
- [ ] Verify no console errors (F12)
- [ ] Verify UI elements visible

### Task 2.2: Generate Quiz
- [ ] Type topic: "Quantum Physics"
- [ ] Click "Go"
- [ ] Wait for generation (10-30s)
- [ ] Verify first question appears
- [ ] Verify "Question 1 of 5"
- [ ] Verify progress bar at 20%

### Task 2.3: Answer Q1
- [ ] Read question
- [ ] Select answer
- [ ] Click "Submit Answer"
- [ ] Verify feedback (green/red)
- [ ] If wrong, read explanation

### Task 2.4: Answer Q2-Q5
- [ ] For each question:
  - [ ] Click "Next Challenge"
  - [ ] Select answer
  - [ ] Click "Submit Answer"
  - [ ] Verify progress updates
  - [ ] Track correct/incorrect

### Task 2.5: Complete Quiz
- [ ] After Q5, click "Finish Quiz"
- [ ] Verify finalization form appears
- [ ] Enter name: "Test User"
- [ ] Enter email: "test@example.com"
- [ ] Click "Show My Results"

### Task 2.6: Verify Results
- [ ] Verify results page shows:
  - [ ] Score (e.g., "3 / 5")
  - [ ] Percentage (e.g., "60%")
  - [ ] Topic name
  - [ ] Completion date
- [ ] Verify score matches API response

---

## Phase 3: Database Verification

### Task 3.1: Verify Questions Created
```bash
psql -U postgres -d QuizApplication -c "SELECT COUNT(*) FROM questions WHERE topic='Python Programming';"
```
- [ ] Expected: 5

### Task 3.2: Verify Choices Created
```bash
psql -U postgres -d QuizApplication -c "SELECT COUNT(*) FROM choices;"
```
- [ ] Expected: 20 (5 questions × 4 choices)

### Task 3.3: Verify Answers Recorded
```bash
psql -U postgres -d QuizApplication -c "SELECT COUNT(*) FROM user_answers WHERE session_id=1;"
```
- [ ] Expected: 5

### Task 3.4: Verify Results Saved
```bash
psql -U postgres -d QuizApplication -c "SELECT * FROM quiz_results WHERE user_email='test@example.com';"
```
- [ ] Expected: 1 row with correct score

---

## Phase 4: Performance Testing

### Task 4.1: Measure Response Times
- [ ] Use browser DevTools (F12 → Network)
- [ ] Generate quiz: Should be < 30 seconds
- [ ] Get question: Should be < 500ms
- [ ] Submit answer: Should be < 1000ms
- [ ] Finalize: Should be < 2 seconds

---

## Success Criteria

- [ ] All API endpoints work (Tasks 1.2-1.10)
- [ ] Frontend user flow complete (Tasks 2.1-2.6)
- [ ] Database stores data correctly (Tasks 3.1-3.4)
- [ ] Performance acceptable (Task 4.1)
- [ ] Score calculation correct
- [ ] Error handling works
- [ ] No critical bugs

**MVP Status: ✅ READY** when all tasks pass
