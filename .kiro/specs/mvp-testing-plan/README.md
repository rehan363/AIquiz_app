# MVP Testing Plan - Agentic Quiz Platform

## 📋 Overview

This testing plan provides a **pragmatic, step-by-step approach** to validate the MVP without getting bogged down in specs. We test systematically but move fast.

## 🎯 Testing Strategy

**Approach:** Test → Iterate → Ship → Add Features

We're NOT creating exhaustive specs. Instead, we're:
1. ✅ Testing each API endpoint systematically
2. ✅ Testing the complete user flow from frontend
3. ✅ Verifying data integrity
4. ✅ Checking error handling
5. ✅ Validating performance

## 📁 Files in This Plan

### 1. `requirements.md`
High-level requirements for MVP validation. Defines what "done" looks like.

### 2. `testing-guide.md`
**START HERE** - Step-by-step instructions for:
- API testing with cURL
- Frontend testing in browser
- Database verification
- Error handling tests
- Performance checks

### 3. `testing-checklist.md`
Quick checklist to track progress. Use this to mark off completed tests.

### 4. `postman-collection.json`
Ready-to-use Postman collection with all API endpoints pre-configured.

## 🚀 Quick Start (Choose One)

### Option A: Manual Testing (Recommended for MVP)
1. Open `testing-guide.md`
2. Follow Phase 1 (API Testing) with cURL
3. Follow Phase 2 (Frontend Testing) in browser
4. Mark off items in `testing-checklist.md`

### Option B: Postman Testing
1. Import `postman-collection.json` into Postman
2. Run requests in order
3. Verify responses match expected format

### Option C: Automated Testing
```bash
pytest tests/test_endpoints.py -v
```

## ⏱️ Time Estimates

| Phase | Time | What |
|-------|------|------|
| Quick Start | 15 min | Basic API + Frontend flow |
| Full E2E | 30 min | Complete user journey |
| Database | 10 min | Verify data storage |
| Error Handling | 10 min | Test edge cases |
| Performance | 5 min | Check response times |
| **Total** | **70 min** | Full MVP validation |

## ✅ MVP Success Criteria

Your MVP is ready when:

- [ ] All 5 API endpoints work correctly
- [ ] Frontend user can complete full quiz flow
- [ ] Database stores all data correctly
- [ ] Agent generates valid 5-question quizzes
- [ ] Error handling works gracefully
- [ ] Response times are acceptable
- [ ] No critical bugs

## 🔍 What We're Testing

### API Layer
```
POST /quiz/generate     → Generate quiz
GET  /quiz/next         → Get next question
POST /quiz/submit       → Submit answer
POST /quiz/finalize     → Get results
```

### Agent Integration
```
✓ Generates exactly 5 questions
✓ Each question has 4 choices
✓ Exactly 1 correct answer per question
✓ Questions stored in database
✓ AI explanations generated for wrong answers
```

### Frontend Flow
```
1. User enters topic
2. Quiz generates
3. Questions shown 1-by-1
4. User answers all 5
5. Results displayed
```

### Data Integrity
```
✓ Questions table: 5 records
✓ Choices table: 20 records (5×4)
✓ UserAnswers table: 5 records
✓ QuizResults table: 1 record
✓ Score calculated correctly
```

## 🛠️ Tools You'll Need

### For API Testing
- **cURL** (built-in on Mac/Linux, Windows 10+)
- **Postman** (optional, easier UI)
- **Browser DevTools** (F12)

### For Frontend Testing
- **Any modern browser** (Chrome, Firefox, Safari, Edge)

### For Database Testing
- **psql** or any SQL client
- **DBeaver** (optional, visual tool)

## 📊 Testing Workflow

```
1. Start Backend (uvicorn)
   ↓
2. Start Frontend (npm run dev)
   ↓
3. Test API Endpoints (Phase 1)
   ↓
4. Test Frontend Flow (Phase 2)
   ↓
5. Verify Database (Phase 3)
   ↓
6. Test Error Cases (Phase 4)
   ↓
7. Check Performance (Phase 5)
   ↓
8. Sign Off MVP ✅
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 8000 is in use
lsof -i :8000  # Mac/Linux
netstat -ano | findstr :8000  # Windows

# Kill process and restart
python -m uvicorn src.app.main:app --reload
```

### Frontend won't connect to backend
```bash
# Check CORS is enabled
# Check backend is running on 8000
# Check frontend is running on 3000
# Check no firewall blocking
```

### Agent times out
```bash
# Normal - agent takes 10-30 seconds to generate
# Check OpenRouter API key is valid
# Check internet connection
```

### Database errors
```bash
# Ensure PostgreSQL is running
# Check DATABASE_URL in .env
# Run migrations: alembic upgrade head
```

## 📝 Testing Notes

Use this space to document findings:

```
Test Date: ___________
Tester: ___________

Issues Found:
- 
- 
- 

Notes:
- 
- 
- 

Sign Off: ___________
```

## 🎓 After MVP

Once MVP is validated, next steps:

1. **Add Features**
   - User authentication
   - Quiz history
   - Leaderboard
   - Analytics

2. **Optimize**
   - Add caching
   - Optimize queries
   - Add rate limiting
   - Improve error messages

3. **Scale**
   - Load testing
   - Database optimization
   - CDN for frontend
   - API versioning

4. **Monitor**
   - Error tracking (Sentry)
   - Performance monitoring
   - User analytics
   - Logging

## 📞 Support

If you get stuck:

1. Check `testing-guide.md` troubleshooting section
2. Check backend logs: `agent_debug.log`
3. Check browser console: F12 → Console
4. Check database: `SELECT * FROM quiz_sessions;`

## ✨ You've Got This!

This MVP is solid. Test it systematically, fix any issues, and ship it. You can add fancy features later.

**Remember:** Done is better than perfect. Get it working, then optimize.

Good luck! 🚀
