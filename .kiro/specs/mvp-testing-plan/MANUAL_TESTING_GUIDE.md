# Manual Testing Guide - Step by Step

## 🎯 How to Test Using FastAPI Swagger UI

### Step 1: Open Swagger UI
1. Open your browser
2. Go to: `http://localhost:8000/docs`
3. You should see the FastAPI Swagger UI with all endpoints

---

## Phase 1: API Testing

### Test 1: Generate Quiz

**Endpoint:** POST /quiz/generate

**Steps:**
1. In Swagger UI, find "POST /quiz/generate"
2. Click on it to expand
3. Click "Try it out" button
4. In the request body, enter:
```json
{
  "topic": "Python Programming"
}
```
5. Click "Execute" button
6. Wait 10-30 seconds for AI to generate

**Expected Response (Status 200):**
```json
{
  "session_id": 1,
  "message": "Your quiz has been generated successfully! You can now start the test.",
  "total_questions": 5
}
```

**What to Check:**
- ✅ Status code is 200
- ✅ session_id is a number (e.g., 1)
- ✅ message contains "successfully"
- ✅ total_questions is 5

**Save:** Write down your session_id (you'll need it for next tests)

---

### Test 2: Get First Question

**Endpoint:** GET /quiz/next

**Steps:**
1. Find "GET /quiz/next" in Swagger UI
2. Click on it to expand
3. Click "Try it out" button
4. In the "session_id" parameter field, enter your session_id from Test 1
5. Click "Execute" button

**Expected Response (Status 200):**
```json
{
  "id": 1,
  "question_text": "What is Python?",
  "choices": [
    {"id": 1, "choice_text": "A programming language"},
    {"id": 2, "choice_text": "A snake"},
    {"id": 3, "choice_text": "A type of coffee"},
    {"id": 4, "choice_text": "A dance move"}
  ],
  "current_number": 1,
  "total_questions": 5
}
```

**What to Check:**
- ✅ Status code is 200
- ✅ question_text is not empty
- ✅ choices array has exactly 4 items
- ✅ current_number is 1
- ✅ total_questions is 5

**Save:** Write down question_id (1) and choice_id (1)

---

### Test 3: Submit Correct Answer

**Endpoint:** POST /quiz/submit

**Steps:**
1. Find "POST /quiz/submit" in Swagger UI
2. Click on it to expand
3. Click "Try it out" button
4. In the request body, enter:
```json
{
  "session_id": 1,
  "question_id": 1,
  "choice_id": 1
}
```
5. Click "Execute" button

**Expected Response (Status 200):**
```json
{
  "is_correct": true,
  "correct_choice_id": null,
  "explanation": null,
  "next_question_available": true
}
```

**What to Check:**
- ✅ Status code is 200
- ✅ is_correct is true (if you chose the right answer)
- ✅ next_question_available is true

---

### Test 4: Get Second Question

**Endpoint:** GET /quiz/next

**Steps:**
1. Find "GET /quiz/next" in Swagger UI
2. Click "Try it out"
3. Enter session_id: 1
4. Click "Execute"

**Expected Response:**
- current_number should be 2
- question_text should be different from Question 1

**Save:** Write down new question_id

---

### Test 5: Submit Incorrect Answer (to test explanation)

**Endpoint:** POST /quiz/submit

**Steps:**
1. Find "POST /quiz/submit"
2. Click "Try it out"
3. Enter:
```json
{
  "session_id": 1,
  "question_id": 2,
  "choice_id": 2
}
```
4. Click "Execute"

**Expected Response (Status 200):**
```json
{
  "is_correct": false,
  "correct_choice_id": 5,
  "explanation": "The correct answer is... [AI explanation]",
  "next_question_available": true
}
```

**What to Check:**
- ✅ Status code is 200
- ✅ is_correct is false
- ✅ correct_choice_id is provided
- ✅ explanation is not empty (AI-generated)

---

### Test 6-8: Complete Questions 3, 4, 5

**Repeat the pattern:**
1. Get next question (GET /quiz/next)
2. Submit answer (POST /quiz/submit)
3. Track if correct or incorrect

**Keep Score:**
- Q1: ✓ or ✗
- Q2: ✓ or ✗
- Q3: ✓ or ✗
- Q4: ✓ or ✗
- Q5: ✓ or ✗

---

### Test 9: Finalize Quiz

**Endpoint:** POST /quiz/finalize

**Steps:**
1. Find "POST /quiz/finalize"
2. Click "Try it out"
3. Enter:
```json
{
  "session_id": 1,
  "user_name": "Test User",
  "user_email": "test@example.com"
}
```
4. Click "Execute"

**Expected Response (Status 200):**
```json
{
  "user_name": "Test User",
  "topic": "Python Programming",
  "score": 3,
  "total_questions": 5,
  "percentage": 60.0,
  "completed_at": "2026-01-10T12:34:56.789Z"
}
```

**What to Check:**
- ✅ Status code is 200
- ✅ score matches your correct answers
- ✅ percentage = (score / 5) * 100
- ✅ completed_at is a valid timestamp

---

### Test 10: Error Handling - Invalid Session

**Endpoint:** GET /quiz/next

**Steps:**
1. Find "GET /quiz/next"
2. Click "Try it out"
3. Enter session_id: 99999 (non-existent)
4. Click "Execute"

**Expected Response (Status 404):**
```json
{
  "detail": "Session not found"
}
```

**What to Check:**
- ✅ Status code is 404
- ✅ Error message is clear

---

### Test 11: Error Handling - Invalid Email

**Endpoint:** POST /quiz/finalize

**Steps:**
1. Find "POST /quiz/finalize"
2. Click "Try it out"
3. Enter:
```json
{
  "session_id": 1,
  "user_name": "Test",
  "user_email": "invalid-email"
}
```
4. Click "Execute"

**Expected Response (Status 422):**
```json
{
  "detail": [
    {
      "loc": ["body", "user_email"],
      "msg": "invalid email format",
      "type": "value_error.email"
    }
  ]
}
```

**What to Check:**
- ✅ Status code is 422 (validation error)
- ✅ Error message mentions email validation

---

## Phase 2: Frontend Testing

### Test 1: Open Frontend

**Steps:**
1. Open browser
2. Go to: `http://localhost:3000`
3. Wait for page to load

**What to Check:**
- ✅ Page loads without errors
- ✅ Title "Master Any Topic" is visible
- ✅ Input field is visible
- ✅ "Go" button is visible
- ✅ No console errors (F12 → Console)

---

### Test 2: Generate Quiz

**Steps:**
1. Type in the input field: "Quantum Physics"
2. Click "Go" button
3. Wait 10-30 seconds

**What to Check:**
- ✅ Loading spinner appears
- ✅ First question appears after generation
- ✅ "Question 1 of 5" is shown
- ✅ Progress bar is at 20%
- ✅ 4 answer choices are displayed

---

### Test 3: Answer Question 1

**Steps:**
1. Read the question
2. Click on one of the answer choices
3. Click "Submit Answer" button
4. Observe the feedback

**What to Check:**
- ✅ Selected answer is highlighted
- ✅ Feedback appears (green for correct, red for incorrect)
- ✅ If incorrect, explanation is shown
- ✅ "Next Challenge" button appears

---

### Test 4: Answer Questions 2-5

**Steps:**
1. Click "Next Challenge"
2. Read the question
3. Select an answer
4. Click "Submit Answer"
5. Repeat for all remaining questions

**What to Check:**
- ✅ Progress bar updates
- ✅ Question counter increments (1→2→3→4→5)
- ✅ Each question is different
- ✅ Feedback appears for each answer

---

### Test 5: Complete Quiz

**Steps:**
1. After answering Question 5, click "Finish Quiz"
2. You should see a form with:
   - Name field
   - Email field
   - "Show My Results" button
3. Enter:
   - Name: "Test User"
   - Email: "test@example.com"
4. Click "Show My Results"

**What to Check:**
- ✅ Form appears after last question
- ✅ Form fields are visible
- ✅ Submit button is clickable

---

### Test 6: View Results

**Steps:**
1. After clicking "Show My Results", you should see results page
2. Results should show:
   - Your score (e.g., "3 / 5")
   - Your percentage (e.g., "60%")
   - Topic name
   - Completion date
   - "Try Another Topic" button

**What to Check:**
- ✅ Score is displayed correctly
- ✅ Percentage matches score (score/5 * 100)
- ✅ Topic is "Quantum Physics"
- ✅ Date is today
- ✅ Results page has nice animations

---

## Phase 3: Database Verification

### Check 1: Verify Questions

**Command:**
```bash
psql -U postgres -d QuizApplication -c "SELECT COUNT(*) FROM questions WHERE topic='Python Programming';"
```

**Expected:** 5

---

### Check 2: Verify Choices

**Command:**
```bash
psql -U postgres -d QuizApplication -c "SELECT COUNT(*) FROM choices;"
```

**Expected:** 20 (5 questions × 4 choices)

---

### Check 3: Verify Answers

**Command:**
```bash
psql -U postgres -d QuizApplication -c "SELECT COUNT(*) FROM user_answers WHERE session_id=1;"
```

**Expected:** 5

---

### Check 4: Verify Results

**Command:**
```bash
psql -U postgres -d QuizApplication -c "SELECT * FROM quiz_results WHERE user_email='test@example.com';"
```

**Expected:** 1 row with your score

---

## ✅ Success Checklist

### API Tests
- [ ] Test 1: Generate Quiz - PASS
- [ ] Test 2: Get Question 1 - PASS
- [ ] Test 3: Submit Correct Answer - PASS
- [ ] Test 4: Get Question 2 - PASS
- [ ] Test 5: Submit Incorrect Answer - PASS
- [ ] Test 6-8: Complete Q3-Q5 - PASS
- [ ] Test 9: Finalize Quiz - PASS
- [ ] Test 10: Error Handling (Invalid Session) - PASS
- [ ] Test 11: Error Handling (Invalid Email) - PASS

### Frontend Tests
- [ ] Test 1: Open Frontend - PASS
- [ ] Test 2: Generate Quiz - PASS
- [ ] Test 3: Answer Q1 - PASS
- [ ] Test 4: Answer Q2-Q5 - PASS
- [ ] Test 5: Complete Quiz - PASS
- [ ] Test 6: View Results - PASS

### Database Tests
- [ ] Check 1: Questions Created - PASS
- [ ] Check 2: Choices Created - PASS
- [ ] Check 3: Answers Recorded - PASS
- [ ] Check 4: Results Saved - PASS

---

## 🎉 MVP Status

**When all tests pass:** ✅ MVP is READY

**Next Steps:**
1. Document any issues found
2. Fix bugs if any
3. Deploy to staging
4. Get user feedback
5. Iterate and add features

---

## 📝 Notes

- Keep track of your session_id and question_ids
- Write down your score for verification
- Check browser console for any errors
- Check backend logs for any issues
- Verify database has correct data

Good luck! 🚀
