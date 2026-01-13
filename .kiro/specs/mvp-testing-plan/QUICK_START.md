# 🚀 Quick Start - MVP Testing (5 Minutes)

## Prerequisites ✅

- [ ] Backend running: `http://localhost:8000`
- [ ] Frontend running: `http://localhost:3000`
- [ ] PostgreSQL running
- [ ] `.env` file configured

## Option 1: Automated Testing (Fastest)

### Run the cURL Script
```bash
bash .kiro/specs/mvp-testing-plan/curl-commands.sh
```

**What it does:**
1. Generates a quiz
2. Gets all 5 questions
3. Submits answers
4. Finalizes quiz
5. Shows results

**Expected output:**
```
✅ MVP Testing Complete!
Final Score: 3 / 5
Percentage: 60%
```

**Time:** 2-3 minutes

---

## Option 2: Manual API Testing (Recommended)

### Step 1: Generate Quiz
```bash
curl -X POST http://localhost:8000/quiz/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "Python Programming"}'
```

**Save the `session_id` from response**

### Step 2: Get Question
```bash
curl -X GET "http://localhost:8000/quiz/next?session_id=1"
```

**Save the `question_id` and `choice_id`**

### Step 3: Submit Answer
```bash
curl -X POST http://localhost:8000/quiz/submit \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": 1,
    "question_id": 1,
    "choice_id": 1
  }'
```

### Step 4: Repeat Steps 2-3 for Questions 2-5

### Step 5: Finalize
```bash
curl -X POST http://localhost:8000/quiz/finalize \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": 1,
    "user_name": "Test User",
    "user_email": "test@example.com"
  }'
```

**Time:** 5-10 minutes

---

## Option 3: Frontend Testing (Best UX)

### Step 1: Open Browser
```
http://localhost:3000
```

### Step 2: Enter Topic
- Type: "Python Programming"
- Click: "Go"

### Step 3: Answer Questions
- Read question
- Select answer
- Click: "Submit Answer"
- Repeat for all 5 questions

### Step 4: View Results
- Enter name and email
- Click: "Show My Results"
- See your score

**Time:** 5-10 minutes

---

## Option 4: Postman Testing (Easiest UI)

### Step 1: Import Collection
1. Open Postman
2. Click: "Import"
3. Select: `.kiro/specs/mvp-testing-plan/postman-collection.json`

### Step 2: Run Requests
1. Click: "1. Generate Quiz"
2. Click: "Send"
3. Copy `session_id` from response
4. Paste into next request
5. Continue through all requests

**Time:** 5-10 minutes

---

## Verification Checklist

After testing, verify:

### API Works
- [ ] POST /quiz/generate returns session_id
- [ ] GET /quiz/next returns question
- [ ] POST /quiz/submit returns is_correct
- [ ] POST /quiz/finalize returns score

### Frontend Works
- [ ] Page loads at localhost:3000
- [ ] Can enter topic
- [ ] Quiz generates
- [ ] Questions display
- [ ] Can submit answers
- [ ] Results show

### Database Works
```bash
# Check questions
psql -U postgres -d QuizApplication -c "SELECT COUNT(*) FROM questions;"
# Expected: 5

# Check choices
psql -U postgres -d QuizApplication -c "SELECT COUNT(*) FROM choices;"
# Expected: 20

# Check results
psql -U postgres -d QuizApplication -c "SELECT * FROM quiz_results LIMIT 1;"
# Expected: 1 row with your score
```

### Agent Works
- [ ] Generated 5 questions
- [ ] Each question has 4 choices
- [ ] Exactly 1 correct answer per question
- [ ] Questions are relevant to topic
- [ ] AI explanations provided

---

## Success = All Green ✅

```
✅ API endpoints working
✅ Frontend user flow complete
✅ Database storing data
✅ Agent generating quizzes
✅ Error handling working
✅ Performance acceptable
```

---

## Troubleshooting

### Backend won't start
```bash
# Check port 8000
lsof -i :8000

# Kill and restart
python -m uvicorn src.app.main:app --reload
```

### Frontend won't connect
```bash
# Check backend is running
curl http://localhost:8000/

# Check frontend is running
curl http://localhost:3000/
```

### Agent times out
- Normal - takes 10-30 seconds
- Check OpenRouter API key
- Check internet connection

### Database errors
```bash
# Check PostgreSQL
psql -U postgres -c "SELECT 1;"

# Check connection
psql -U postgres -d QuizApplication -c "SELECT 1;"
```

---

## Next Steps

### If Everything Works ✅
1. Document findings
2. Mark checklist items
3. Proceed to full testing
4. Deploy MVP

### If Something Breaks ❌
1. Check logs: `agent_debug.log`
2. Check browser console: F12
3. Check database: `psql`
4. Refer to `testing-guide.md`

---

## Full Documentation

For detailed testing:
- **API Testing**: See `testing-guide.md` Phase 1
- **Frontend Testing**: See `testing-guide.md` Phase 2
- **Database Testing**: See `testing-guide.md` Phase 3
- **Error Testing**: See `testing-guide.md` Phase 4
- **Performance Testing**: See `testing-guide.md` Phase 5

---

## Time Estimates

| Method | Time | Effort |
|--------|------|--------|
| Automated Script | 2-3 min | Minimal |
| Manual cURL | 5-10 min | Low |
| Frontend Browser | 5-10 min | Low |
| Postman | 5-10 min | Low |
| Full Testing | 60-70 min | Medium |

---

## You're Ready! 🎉

Pick your testing method and go!

**Recommended:** Start with automated script, then test frontend manually.

```bash
# Run this now:
bash .kiro/specs/mvp-testing-plan/curl-commands.sh
```

Then open browser and test at `http://localhost:3000`

**Good luck! 🚀**
