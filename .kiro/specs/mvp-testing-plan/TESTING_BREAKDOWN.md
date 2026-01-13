# Testing Breakdown - All Tasks Listed

## 📋 Complete Task List

### Phase 1: API Testing (Using FastAPI Swagger UI)

#### Task 1.1: Generate Quiz
- **Endpoint:** POST /quiz/generate
- **Input:** `{"topic": "Python Programming"}`
- **Expected:** Status 200, session_id, message, total_questions=5
- **Time:** 10-30 seconds (AI generation)
- **Status:** ⬜

#### Task 1.2: Get Question 1
- **Endpoint:** GET /quiz/next
- **Input:** session_id from Task 1.1
- **Expected:** Status 200, question_id, 4 choices, current_number=1
- **Time:** < 500ms
- **Status:** ⬜

#### Task 1.3: Submit Correct Answer (Q1)
- **Endpoint:** POST /quiz/submit
- **Input:** session_id, question_id, choice_id=1
- **Expected:** Status 200, is_correct=true, next_question_available=true
- **Time:** < 1000ms
- **Status:** ⬜

#### Task 1.4: Get Question 2
- **Endpoint:** GET /quiz/next
- **Input:** session_id
- **Expected:** Status 200, current_number=2, different question
- **Time:** < 500ms
- **Status:** ⬜

#### Task 1.5: Submit Incorrect Answer (Q2)
- **Endpoint:** POST /quiz/submit
- **Input:** session_id, question_id, choice_id=2 (wrong)
- **Expected:** Status 200, is_correct=false, explanation provided
- **Time:** < 1000ms
- **Status:** ⬜

#### Task 1.6: Get Question 3
- **Endpoint:** GET /quiz/next
- **Input:** session_id
- **Expected:** Status 200, current_number=3
- **Time:** < 500ms
- **Status:** ⬜

#### Task 1.7: Submit Answer (Q3)
- **Endpoint:** POST /quiz/submit
- **Input:** session_id, question_id, choice_id
- **Expected:** Status 200, is_correct, next_question_available=true
- **Time:** < 1000ms
- **Status:** ⬜

#### Task 1.8: Get Question 4
- **Endpoint:** GET /quiz/next
- **Input:** session_id
- **Expected:** Status 200, current_number=4
- **Time:** < 500ms
- **Status:** ⬜

#### Task 1.9: Submit Answer (Q4)
- **Endpoint:** POST /quiz/submit
- **Input:** session_id, question_id, choice_id
- **Expected:** Status 200, is_correct, next_question_available=true
- **Time:** < 1000ms
- **Status:** ⬜

#### Task 1.10: Get Question 5
- **Endpoint:** GET /quiz/next
- **Input:** session_id
- **Expected:** Status 200, current_number=5
- **Time:** < 500ms
- **Status:** ⬜

#### Task 1.11: Submit Answer (Q5)
- **Endpoint:** POST /quiz/submit
- **Input:** session_id, question_id, choice_id
- **Expected:** Status 200, is_correct, next_question_available=false
- **Time:** < 1000ms
- **Status:** ⬜

#### Task 1.12: Finalize Quiz
- **Endpoint:** POST /quiz/finalize
- **Input:** session_id, user_name="Test User", user_email="test@example.com"
- **Expected:** Status 200, score, percentage, completed_at
- **Verify:** score matches correct answers, percentage = score/5*100
- **Time:** < 2 seconds
- **Status:** ⬜

#### Task 1.13: Error Test - Invalid Session
- **Endpoint:** GET /quiz/next
- **Input:** session_id=99999
- **Expected:** Status 404, error message
- **Time:** < 500ms
- **Status:** ⬜

#### Task 1.14: Error Test - Invalid Email
- **Endpoint:** POST /quiz/finalize
- **Input:** user_email="invalid-email"
- **Expected:** Status 422, validation error
- **Time:** < 500ms
- **Status:** ⬜

---

### Phase 2: Frontend Testing (Browser)

#### Task 2.1: Open Frontend
- **URL:** http://localhost:3000
- **Expected:** Page loads, no console errors
- **Verify:** Title, input field, Go button visible
- **Time:** < 3 seconds
- **Status:** ⬜

#### Task 2.2: Generate Quiz
- **Action:** Enter "Quantum Physics", click "Go"
- **Expected:** Loading spinner, first question appears
- **Verify:** "Question 1 of 5", progress bar at 20%
- **Time:** 10-30 seconds
- **Status:** ⬜

#### Task 2.3: Answer Question 1
- **Action:** Select answer, click "Submit Answer"
- **Expected:** Feedback appears (green/red)
- **Verify:** If wrong, explanation shown
- **Time:** < 2 seconds
- **Status:** ⬜

#### Task 2.4: Answer Question 2
- **Action:** Click "Next Challenge", select answer, submit
- **Expected:** Progress bar updates, counter shows "Question 2 of 5"
- **Verify:** New question displayed
- **Time:** < 2 seconds
- **Status:** ⬜

#### Task 2.5: Answer Question 3
- **Action:** Click "Next Challenge", select answer, submit
- **Expected:** Progress bar at 60%, counter shows "Question 3 of 5"
- **Time:** < 2 seconds
- **Status:** ⬜

#### Task 2.6: Answer Question 4
- **Action:** Click "Next Challenge", select answer, submit
- **Expected:** Progress bar at 80%, counter shows "Question 4 of 5"
- **Time:** < 2 seconds
- **Status:** ⬜

#### Task 2.7: Answer Question 5
- **Action:** Click "Next Challenge", select answer, submit
- **Expected:** Progress bar at 100%, counter shows "Question 5 of 5"
- **Time:** < 2 seconds
- **Status:** ⬜

#### Task 2.8: Complete Quiz
- **Action:** Click "Finish Quiz"
- **Expected:** Finalization form appears
- **Verify:** Name field, email field, "Show My Results" button
- **Time:** < 1 second
- **Status:** ⬜

#### Task 2.9: Submit Results
- **Action:** Enter name="Test User", email="test@example.com", click "Show My Results"
- **Expected:** Results page appears
- **Verify:** Score, percentage, topic, date displayed
- **Time:** < 2 seconds
- **Status:** ⬜

---

### Phase 3: Database Verification

#### Task 3.1: Verify Questions Created
- **Command:** `SELECT COUNT(*) FROM questions WHERE topic='Python Programming';`
- **Expected:** 5
- **Status:** ⬜

#### Task 3.2: Verify Choices Created
- **Command:** `SELECT COUNT(*) FROM choices;`
- **Expected:** 20 (5 questions × 4 choices)
- **Status:** ⬜

#### Task 3.3: Verify Answers Recorded
- **Command:** `SELECT COUNT(*) FROM user_answers WHERE session_id=1;`
- **Expected:** 5
- **Status:** ⬜

#### Task 3.4: Verify Results Saved
- **Command:** `SELECT * FROM quiz_results WHERE user_email='test@example.com';`
- **Expected:** 1 row with correct score
- **Status:** ⬜

---

## 📊 Summary

| Phase | Tasks | Time | Status |
|-------|-------|------|--------|
| API Testing | 14 tasks | 20-30 min | ⬜ |
| Frontend Testing | 9 tasks | 15-20 min | ⬜ |
| Database Verification | 4 tasks | 5-10 min | ⬜ |
| **TOTAL** | **27 tasks** | **40-60 min** | ⬜ |

---

## ✅ Success Criteria

**MVP is READY when:**
- [ ] All 14 API tasks PASS
- [ ] All 9 Frontend tasks PASS
- [ ] All 4 Database tasks PASS
- [ ] Score calculation verified
- [ ] No critical bugs

---

## 🎯 How to Track Progress

1. Open this file
2. As you complete each task, change status from ⬜ to ✅
3. Note any issues found
4. When all tasks are ✅, MVP is ready

---

## 📝 Notes Section

### Issues Found:
(Document any problems here)

### Observations:
(Document any interesting findings)

### Performance Notes:
(Document actual response times)

---

## 🚀 Ready to Start?

1. Open: `http://localhost:8000/docs` (Swagger UI)
2. Open: `.kiro/specs/mvp-testing-plan/MANUAL_TESTING_GUIDE.md`
3. Start with Task 1.1: Generate Quiz
4. Follow all steps
5. Mark each task as ✅ when complete

**Let's go! 🎉**
