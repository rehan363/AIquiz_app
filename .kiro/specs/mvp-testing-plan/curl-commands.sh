#!/bin/bash

# Agentic Quiz Platform - MVP Testing with cURL
# Copy and paste these commands to test the API

echo "🚀 Agentic Quiz Platform - MVP Testing"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ============================================
# STEP 1: Generate Quiz
# ============================================
echo -e "${BLUE}STEP 1: Generate Quiz${NC}"
echo "Command: POST /quiz/generate"
echo ""

GENERATE_RESPONSE=$(curl -s -X POST http://localhost:8000/quiz/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "Python Programming"}')

echo "Response:"
echo "$GENERATE_RESPONSE" | jq '.'
echo ""

# Extract session_id
SESSION_ID=$(echo "$GENERATE_RESPONSE" | jq -r '.session_id')
echo -e "${GREEN}✓ Session ID: $SESSION_ID${NC}"
echo ""

# ============================================
# STEP 2: Get First Question
# ============================================
echo -e "${BLUE}STEP 2: Get First Question${NC}"
echo "Command: GET /quiz/next?session_id=$SESSION_ID"
echo ""

QUESTION_1=$(curl -s -X GET "http://localhost:8000/quiz/next?session_id=$SESSION_ID")

echo "Response:"
echo "$QUESTION_1" | jq '.'
echo ""

# Extract question details
QUESTION_ID_1=$(echo "$QUESTION_1" | jq -r '.id')
CHOICE_ID_1=$(echo "$QUESTION_1" | jq -r '.choices[0].id')
CHOICE_ID_WRONG=$(echo "$QUESTION_1" | jq -r '.choices[1].id')

echo -e "${GREEN}✓ Question ID: $QUESTION_ID_1${NC}"
echo -e "${GREEN}✓ First Choice ID: $CHOICE_ID_1${NC}"
echo ""

# ============================================
# STEP 3: Submit Correct Answer
# ============================================
echo -e "${BLUE}STEP 3: Submit Correct Answer${NC}"
echo "Command: POST /quiz/submit"
echo ""

SUBMIT_CORRECT=$(curl -s -X POST http://localhost:8000/quiz/submit \
  -H "Content-Type: application/json" \
  -d "{
    \"session_id\": $SESSION_ID,
    \"question_id\": $QUESTION_ID_1,
    \"choice_id\": $CHOICE_ID_1
  }")

echo "Response:"
echo "$SUBMIT_CORRECT" | jq '.'
echo ""

IS_CORRECT=$(echo "$SUBMIT_CORRECT" | jq -r '.is_correct')
echo -e "${GREEN}✓ Is Correct: $IS_CORRECT${NC}"
echo ""

# ============================================
# STEP 4: Get Second Question
# ============================================
echo -e "${BLUE}STEP 4: Get Second Question${NC}"
echo "Command: GET /quiz/next?session_id=$SESSION_ID"
echo ""

QUESTION_2=$(curl -s -X GET "http://localhost:8000/quiz/next?session_id=$SESSION_ID")

echo "Response:"
echo "$QUESTION_2" | jq '.'
echo ""

QUESTION_ID_2=$(echo "$QUESTION_2" | jq -r '.id')
CHOICE_ID_2=$(echo "$QUESTION_2" | jq -r '.choices[0].id')
CHOICE_ID_2_WRONG=$(echo "$QUESTION_2" | jq -r '.choices[1].id')

echo -e "${GREEN}✓ Question ID: $QUESTION_ID_2${NC}"
echo ""

# ============================================
# STEP 5: Submit Incorrect Answer (to test explanation)
# ============================================
echo -e "${BLUE}STEP 5: Submit Incorrect Answer (to test AI explanation)${NC}"
echo "Command: POST /quiz/submit"
echo ""

SUBMIT_WRONG=$(curl -s -X POST http://localhost:8000/quiz/submit \
  -H "Content-Type: application/json" \
  -d "{
    \"session_id\": $SESSION_ID,
    \"question_id\": $QUESTION_ID_2,
    \"choice_id\": $CHOICE_ID_2_WRONG
  }")

echo "Response:"
echo "$SUBMIT_WRONG" | jq '.'
echo ""

IS_CORRECT_2=$(echo "$SUBMIT_WRONG" | jq -r '.is_correct')
EXPLANATION=$(echo "$SUBMIT_WRONG" | jq -r '.explanation')

echo -e "${GREEN}✓ Is Correct: $IS_CORRECT_2${NC}"
echo -e "${GREEN}✓ Explanation: $EXPLANATION${NC}"
echo ""

# ============================================
# STEP 6-10: Complete Remaining Questions
# ============================================
echo -e "${BLUE}STEP 6-10: Complete Remaining Questions${NC}"
echo "Completing questions 3, 4, and 5..."
echo ""

for i in {3..5}; do
  echo "Question $i:"
  
  # Get question
  QUESTION=$(curl -s -X GET "http://localhost:8000/quiz/next?session_id=$SESSION_ID")
  Q_ID=$(echo "$QUESTION" | jq -r '.id')
  C_ID=$(echo "$QUESTION" | jq -r '.choices[0].id')
  
  # Submit answer
  SUBMIT=$(curl -s -X POST http://localhost:8000/quiz/submit \
    -H "Content-Type: application/json" \
    -d "{
      \"session_id\": $SESSION_ID,
      \"question_id\": $Q_ID,
      \"choice_id\": $C_ID
    }")
  
  IS_CORRECT=$(echo "$SUBMIT" | jq -r '.is_correct')
  echo "  ✓ Submitted (Correct: $IS_CORRECT)"
  echo ""
done

# ============================================
# STEP 11: Finalize Quiz
# ============================================
echo -e "${BLUE}STEP 11: Finalize Quiz${NC}"
echo "Command: POST /quiz/finalize"
echo ""

FINALIZE=$(curl -s -X POST http://localhost:8000/quiz/finalize \
  -H "Content-Type: application/json" \
  -d "{
    \"session_id\": $SESSION_ID,
    \"user_name\": \"Test User\",
    \"user_email\": \"test@example.com\"
  }")

echo "Response:"
echo "$FINALIZE" | jq '.'
echo ""

SCORE=$(echo "$FINALIZE" | jq -r '.score')
PERCENTAGE=$(echo "$FINALIZE" | jq -r '.percentage')

echo -e "${GREEN}✓ Final Score: $SCORE / 5${NC}"
echo -e "${GREEN}✓ Percentage: $PERCENTAGE%${NC}"
echo ""

# ============================================
# SUMMARY
# ============================================
echo -e "${YELLOW}========================================"
echo "✅ MVP Testing Complete!"
echo "========================================${NC}"
echo ""
echo "Summary:"
echo "  • Generated quiz on: Python Programming"
echo "  • Session ID: $SESSION_ID"
echo "  • Questions answered: 5"
echo "  • Final Score: $SCORE / 5"
echo "  • Percentage: $PERCENTAGE%"
echo ""
echo "Next Steps:"
echo "  1. Check database: SELECT * FROM quiz_results WHERE user_email = 'test@example.com';"
echo "  2. Test frontend: http://localhost:3000"
echo "  3. Check API docs: http://localhost:8000/docs"
echo ""

# ============================================
# ERROR TESTING
# ============================================
echo -e "${BLUE}BONUS: Error Handling Tests${NC}"
echo ""

echo "Test 1: Invalid Session ID"
curl -s -X GET "http://localhost:8000/quiz/next?session_id=99999" | jq '.'
echo ""

echo "Test 2: Invalid Email Format"
curl -s -X POST http://localhost:8000/quiz/finalize \
  -H "Content-Type: application/json" \
  -d "{
    \"session_id\": $SESSION_ID,
    \"user_name\": \"Test\",
    \"user_email\": \"invalid-email\"
  }" | jq '.'
echo ""

echo -e "${GREEN}✅ All tests completed!${NC}"
