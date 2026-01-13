# MVP Testing Guide - Step by Step

## Phase 1: API Testing (Using cURL or Postman)

### Step 1: Generate a Quiz

```bash
curl -X POST http://localhost:8000/quiz/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "Python Programming"}'
```

**Expected Response:**
```json
{
  "session_id": 1,
  "message": "Your quiz has been generated successfully! You can now start the test.",
  "total_questions": 5
}
```

**What to Verify:**
- ✅ Status code is 200
- ✅ session_id is a positive integer
- ✅ message contains "successfully"
- ✅ total_questions is 5

**Troubleshooting:**
- If you get 500 error: Check if OpenRouter API key is valid
- If you get timeout: Agent is generating questions (normal, takes 10-30 seconds)
- If you get empty response: Check backend logs

---

### Step 2: Get First Question

```bash
curl -X GET "http://localhost:8000/quiz/next?session_id=1"
```

**Expected Response:**
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

**What to Verify:**
- ✅ Status code is 200
- ✅ question_text is not empty
- ✅ choices array has exactly 4 items
- ✅ current_number is 1
- ✅ total_questions is 5

---

### Step 3: Submit Correct Answer

```bash
curl -X POST http://localhost:8000/quiz/submit \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": 1,
    "question_id": 1,
    "choice_id": 1
  }'
```

**Expected Response:**
```json
{
  "is_correct": true,
  "correct_choice_id": null,
  "explanation": null,
  "next_question_available": true
}
```

**What to Verify:**
- ✅ Status code is 200
- ✅ is_correct is true
- ✅ next_question_available is true (since we have 5 questions)

---

### Step 4: Submit Incorrect Answer

```bash
curl -X POST http://localhost:8000/quiz/submit \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": 1,
    "question_id": 2,
    "choice_id": 3
  }'
```

**Expected Response:**
```json
{
  "is_correct": false,
  "correct_choice_id": 5,
  "explanation": "The correct answer is... [AI explanation]",
  "next_question_available": true
}
```

**What to Verify:**
- ✅ Status code is 200
- ✅ is_correct is false
- ✅ correct_choice_id is provided
- ✅ explanation is not empty (AI-generated)
- ✅ next_question_available is true

---

### Step 5: Complete All Questions

Repeat Step 2 and Step 3/4 for questions 3, 4, and 5.

**Track Your Score:**
- Question 1: Correct ✅
- Question 2: Incorrect ❌
- Question 3: [Your choice]
- Question 4: [Your choice]
- Question 5: [Your choice]

---

### Step 6: Finalize Quiz

```bash
curl -X POST http://localhost:8000/quiz/finalize \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": 1,
    "user_name": "John Doe",
    "user_email": "john@example.com"
  }'
```

**Expected Response:**
```json
{
  "user_name": "John Doe",
  "topic": "Python Programming",
  "score": 3,
  "total_questions": 5,
  "percentage": 60.0,
  "completed_at": "2026-01-10T12:34:56.789Z"
}
```

**What to Verify:**
- ✅ Status code is 200
- ✅ score matches your correct answers
- ✅ percentage is calculated correctly (score/total * 100)
- ✅ completed_at is a valid timestamp

---

## Phase 2: Frontend Testing (Browser)

### Step 1: Open the Application

1. Open browser and go to `http://localhost:3000`
2. You should see the "Master Any Topic" landing page
3. Verify the cosmic glassmorphism design loads

**What to Verify:**
- ✅ Page loads without errors
- ✅ Input field is visible
- ✅ "Go" button is visible
- ✅ No console errors (F12 → Console)

---

### Step 2: Generate Quiz from Frontend

1. Type a topic: "Quantum Physics"
2. Click "Go" button
3. Wait for quiz to generate (10-30 seconds)

**What to Verify:**
- ✅ Loading spinner appears
- ✅ First question appears after generation
- ✅ Question counter shows "Question 1 of 5"
- ✅ Progress bar is at 20%

---

### Step 3: Answer Questions

1. Read the question carefully
2. Select an answer by clicking on it
3. Click "Submit Answer"
4. Observe feedback (green for correct, red for incorrect)
5. If incorrect, read the AI explanation
6. Click "Next Challenge"

**Repeat for all 5 questions**

**What to Verify:**
- ✅ Selected answer is highlighted
- ✅ Submit button is enabled only when answer is selected
- ✅ Feedback appears immediately
- ✅ Explanation is shown for incorrect answers
- ✅ Progress bar updates correctly
- ✅ Question counter increments

---

### Step 4: Complete Quiz

After answering all 5 questions:

1. Click "Finish Quiz"
2. You should see the finalization form
3. Enter your name: "Test User"
4. Enter your email: "test@example.com"
5. Click "Show My Results"

**What to Verify:**
- ✅ Form appears after last question
- ✅ Name and email fields are visible
- ✅ Form validation works (try invalid email)
- ✅ Submit button is enabled

---

### Step 5: View Results

You should see:
- Your score (e.g., "3 / 5")
- Your percentage (e.g., "60%")
- Topic name
- Completion date
- "Try Another Topic" button

**What to Verify:**
- ✅ Score is displayed correctly
- ✅ Percentage matches score
- ✅ Topic is correct
- ✅ Date is today
- ✅ Results page has nice animations

---

## Phase 3: Database Verification

### Check Questions Were Created

```bash
# Using psql or any SQL client
SELECT COUNT(*) FROM questions WHERE topic = 'Python Programming';
-- Expected: 5
```

### Check Choices Were Created

```bash
SELECT COUNT(*) FROM choices;
-- Expected: 20 (5 questions × 4 choices)
```

### Check User Answers Were Recorded

```bash
SELECT COUNT(*) FROM user_answers WHERE session_id = 1;
-- Expected: 5
```

### Check Quiz Result Was Saved

```bash
SELECT * FROM quiz_results WHERE user_email = 'john@example.com';
-- Expected: 1 row with correct score
```

---

## Phase 4: Error Handling Tests

### Test 1: Invalid Session ID

```bash
curl -X GET "http://localhost:8000/quiz/next?session_id=99999"
```

**Expected:** 404 error with message "Session not found"

### Test 2: Invalid Email Format

```bash
curl -X POST http://localhost:8000/quiz/finalize \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": 1,
    "user_name": "John",
    "user_email": "invalid-email"
  }'
```

**Expected:** 422 validation error

### Test 3: Missing Required Fields

```bash
curl -X POST http://localhost:8000/quiz/generate \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected:** 422 validation error

---

## Phase 5: Performance Checks

### Measure Response Times

Use browser DevTools (F12 → Network tab) or curl with timing:

```bash
curl -w "\nTime: %{time_total}s\n" http://localhost:8000/quiz/next?session_id=1
```

**Expected Times:**
- `/quiz/next`: < 500ms
- `/quiz/submit`: < 1000ms
- `/quiz/generate`: < 30 seconds

---

## Success Criteria for MVP

✅ All 6 requirements pass
✅ All API endpoints return correct responses
✅ Frontend user flow works end-to-end
✅ Database stores all data correctly
✅ Error handling works gracefully
✅ Performance is acceptable

---

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| 500 error on /quiz/generate | Check OpenRouter API key in .env |
| Timeout on /quiz/generate | Agent is generating (normal, wait 30s) |
| 404 on /quiz/next | Session ID doesn't exist, generate new quiz |
| Empty explanation | AI explanation generation failed, check logs |
| Frontend won't connect to backend | Check CORS, ensure backend is running on 8000 |
| Database errors | Ensure PostgreSQL is running and DATABASE_URL is correct |

