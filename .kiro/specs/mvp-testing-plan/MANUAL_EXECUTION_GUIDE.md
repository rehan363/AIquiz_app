# 🎯 Manual Test Execution Guide

## Why Manual Testing?

The automated API testing is experiencing timeout issues due to the AI agent taking 10-30 seconds to generate quizzes. **Manual testing using Swagger UI is the best approach** because:

1. ✅ You can see real-time responses
2. ✅ You can monitor the AI generation process
3. ✅ You can verify responses visually
4. ✅ No timeout issues
5. ✅ Easy to track progress

---

## 🚀 How to Execute Tests Manually

### Step 1: Open Swagger UI
```
http://localhost:8000/docs
```

You should see the FastAPI Swagger UI with all endpoints listed.

---

## Phase 1: API Testing (14 Tests)

### Test 1.1: Generate Quiz ✅

**In Swagger UI:**

1. **Find the endpoint:** Look for "POST /quiz/generate"
2. **Click to expand:** Click on it to see the details
3. **Click "Try it out":** Button on the right side
4. **Enter request body:**
   ```json
   {
     "topic": "Python Programming"
   }
   ```
5. **Click "Execute":** Blue button at the bottom
6. **Wait 10-30 seconds:** AI is generating the quiz
7. **Check response:**
   - Status code should be **200**
   - Response should have:
     - `session_id` (e.g., 1)
     - `message` (contains "successfully")
     - `total_questions` (5)

**✅ Mark as PASS if:**
- Status is 200
- session_id is a number
- total_questions is 5

**📝 Save:** Write down your session_id (you'll need it for all next tests)

---

### Test 1.2: Get Question 1 ✅

**In Swagger UI:**

1. **Find the endpoint:** "GET /quiz/next"
2. **Click to expand**
3. **Click "Try it out"**
4. **Enter parameter:**
   - `session_id` = [your session_id from Test 1.1]
5. **Click "Execute"**
6. **Check response:**
   - Status code should be **200**
   - Response should have:
     - `id` (question ID)
     - `question_text` (the question)
     - `choices` (array with 4 items)
     - `current_number` (1)
     - `total_questions` (5)

**✅ Mark as PASS if:**
- Status is 200
- choices has exactly 4 items
- current_number is 1

**📝 Save:** Write down question_id and choice_id (first choice)

---

### Test 1.3: Submit Correct Answer ✅

**In Swagger UI:**

1. **Find the endpoint:** "POST /quiz/submit"
2. **Click to expand**
3. **Click "Try it out"**
4. **Enter request body:**
   ```json
   {
     "session_id": 1,
     "question_id": 1,
     "choice_id": 1
   }
   ```
   (Use your actual IDs from previous tests)
5. **Click "Execute"**
6. **Check response:**
   - Status code should be **200**
   - Response should have:
     - `is_correct` (true or false)
     - `next_question_available` (true)

**✅ Mark as PASS if:**
- Status is 200
- next_question_available is true

---

### Test 1.4: Get Question 2 ✅

**Repeat Test 1.2 pattern:**
1. GET /quiz/next
2. Enter session_id
3. Verify current_number is 2
4. Save new question_id

---

### Test 1.5: Submit Incorrect Answer ✅

**In Swagger UI:**

1. **Find the endpoint:** "POST /quiz/submit"
2. **Click "Try it out"**
3. **Enter request body with wrong choice:**
   ```json
   {
     "session_id": 1,
     "question_id": 2,
     "choice_id": 2
   }
   ```
4. **Click "Execute"**
5. **Check response:**
   - Status code should be **200**
   - `is_correct` should be **false**
   - `explanation` should have AI explanation
   - `correct_choice_id` should be provided

**✅ Mark as PASS if:**
- Status is 200
- is_correct is false
- explanation is not empty

---

### Test 1.6-1.11: Complete Questions 3-5

**Repeat the pattern:**
1. Get next question (GET /quiz/next)
2. Submit answer (POST /quiz/submit)
3. Track correct/incorrect

**Keep score:**
- Q1: ✓ or ✗
- Q2: ✓ or ✗
- Q3: ✓ or ✗
- Q4: ✓ or ✗
- Q5: ✓ or ✗

---

### Test 1.12: Finalize Quiz ✅

**In Swagger UI:**

1. **Find the endpoint:** "POST /quiz/finalize"
2. **Click "Try it out"**
3. **Enter request body:**
   ```json
   {
     "session_id": 1,
     "user_name": "Test User",
     "user_email": "test@example.com"
   }
   ```
4. **Click "Execute"**
5. **Check response:**
   - Status code should be **200**
   - Response should have:
     - `user_name` ("Test User")
     - `topic` ("Python Programming")
     - `score` (your correct answers count)
     - `total_questions` (5)
     - `percentage` (score/5 * 100)

**✅ Mark as PASS if:**
- Status is 200
- score matches your correct answers
- percentage is calculated correctly

---

### Test 1.13: Error - Invalid Session ✅

**In Swagger UI:**

1. **Find the endpoint:** "GET /quiz/next"
2. **Click "Try it out"**
3. **Enter parameter:**
   - `session_id` = 99999 (non-existent)
4. **Click "Execute"**
5. **Check response:**
   - Status code should be **404**
   - Response should have error message

**✅ Mark as PASS if:**
- Status is 404
- Error message is clear

---

### Test 1.14: Error - Invalid Email ✅

**In Swagger UI:**

1. **Find the endpoint:** "POST /quiz/finalize"
2. **Click "Try it out"**
3. **Enter request body with invalid email:**
   ```json
   {
     "session_id": 1,
     "user_name": "Test",
     "user_email": "invalid-email"
   }
   ```
4. **Click "Execute"**
5. **Check response:**
   - Status code should be **422** (validation error)
   - Response should have validation error details

**✅ Mark as PASS if:**
- Status is 422
- Error message mentions email validation

---

## Phase 2: Frontend Testing (9 Tests)

### Test 2.1: Open Frontend ✅

1. **Open browser:** http://localhost:3000
2. **Wait for page to load**
3. **Check:**
   - Page loads without errors
   - Title "Master Any Topic" is visible
   - Input field is visible
   - "Go" button is visible
   - No console errors (F12 → Console)

**✅ Mark as PASS if:**
- Page loads
- No console errors
- All UI elements visible

---

### Test 2.2: Generate Quiz ✅

1. **Type in input field:** "Quantum Physics"
2. **Click "Go" button**
3. **Wait 10-30 seconds for generation**
4. **Check:**
   - Loading spinner appears
   - First question appears
   - "Question 1 of 5" is shown
   - Progress bar is at 20%
   - 4 answer choices are displayed

**✅ Mark as PASS if:**
- Quiz generates
- First question appears
- Progress bar shows 20%

---

### Test 2.3: Answer Question 1 ✅

1. **Read the question**
2. **Click on one answer choice**
3. **Click "Submit Answer" button**
4. **Check:**
   - Feedback appears (green for correct, red for incorrect)
   - If incorrect, explanation is shown
   - "Next Challenge" button appears

**✅ Mark as PASS if:**
- Feedback appears
- Button to continue appears

---

### Test 2.4-2.7: Answer Questions 2-5 ✅

**Repeat Test 2.3 pattern:**
1. Click "Next Challenge"
2. Read question
3. Select answer
4. Click "Submit Answer"
5. Verify feedback
6. Check progress bar updates

---

### Test 2.8: Complete Quiz ✅

1. **After Question 5, click "Finish Quiz"**
2. **Check:**
   - Finalization form appears
   - Name field is visible
   - Email field is visible
   - "Show My Results" button is visible

**✅ Mark as PASS if:**
- Form appears
- All fields visible

---

### Test 2.9: Submit Results ✅

1. **Enter name:** "Test User"
2. **Enter email:** "test@example.com"
3. **Click "Show My Results"**
4. **Check:**
   - Results page appears
   - Score is displayed (e.g., "3 / 5")
   - Percentage is displayed (e.g., "60%")
   - Topic is displayed
   - Date is displayed
   - "Try Another Topic" button is visible

**✅ Mark as PASS if:**
- Results page appears
- Score and percentage displayed
- Score matches your correct answers

---

## Phase 3: Database Verification (4 Tests)

### Test 3.1: Verify Questions ✅

**Command:**
```bash
psql -U postgres -d QuizApplication -c "SELECT COUNT(*) FROM questions WHERE topic='Python Programming';"
```

**Expected:** 5

**✅ Mark as PASS if:** Count is 5

---

### Test 3.2: Verify Choices ✅

**Command:**
```bash
psql -U postgres -d QuizApplication -c "SELECT COUNT(*) FROM choices;"
```

**Expected:** 20 (5 questions × 4 choices)

**✅ Mark as PASS if:** Count is 20

---

### Test 3.3: Verify Answers ✅

**Command:**
```bash
psql -U postgres -d QuizApplication -c "SELECT COUNT(*) FROM user_answers WHERE session_id=1;"
```

**Expected:** 5

**✅ Mark as PASS if:** Count is 5

---

### Test 3.4: Verify Results ✅

**Command:**
```bash
psql -U postgres -d QuizApplication -c "SELECT * FROM quiz_results WHERE user_email='test@example.com';"
```

**Expected:** 1 row with your score

**✅ Mark as PASS if:** 1 row returned with correct score

---

## ✅ Success Checklist

### Phase 1: API Testing (14 tests)
- [ ] 1.1 Generate Quiz
- [ ] 1.2 Get Question 1
- [ ] 1.3 Submit Correct Answer
- [ ] 1.4 Get Question 2
- [ ] 1.5 Submit Incorrect Answer
- [ ] 1.6 Get Question 3
- [ ] 1.7 Submit Answer Q3
- [ ] 1.8 Get Question 4
- [ ] 1.9 Submit Answer Q4
- [ ] 1.10 Get Question 5
- [ ] 1.11 Submit Answer Q5
- [ ] 1.12 Finalize Quiz
- [ ] 1.13 Error - Invalid Session
- [ ] 1.14 Error - Invalid Email

### Phase 2: Frontend Testing (9 tests)
- [ ] 2.1 Open Frontend
- [ ] 2.2 Generate Quiz
- [ ] 2.3 Answer Q1
- [ ] 2.4 Answer Q2
- [ ] 2.5 Answer Q3
- [ ] 2.6 Answer Q4
- [ ] 2.7 Answer Q5
- [ ] 2.8 Complete Quiz
- [ ] 2.9 Submit Results

### Phase 3: Database (4 tests)
- [ ] 3.1 Verify Questions
- [ ] 3.2 Verify Choices
- [ ] 3.3 Verify Answers
- [ ] 3.4 Verify Results

---

## 🎉 MVP Status

**When all 27 tests PASS:** ✅ MVP is READY

---

**Good luck! 🚀**
