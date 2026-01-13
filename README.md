# Quizzly.ai 🧠✨

**AI-Powered Quiz Platform** - Generate personalized quizzes on any topic using advanced AI agents.

## 🚀 Features

- **AI Quiz Generation** - Create custom MCQ quizzes on any topic
- **Real-time Validation** - Instant feedback with explanations
- **Session Management** - Track progress and scores
- **Modern UI** - Clean, responsive Next.js frontend
- **RESTful API** - FastAPI backend with SQLAlchemy ORM

## 🏗️ Architecture

- **Backend**: FastAPI + SQLAlchemy + PostgreSQL
- **AI Agent**: Google ADK + OpenRouter LLM
- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Database**: PostgreSQL with Alembic migrations

## 🛠️ Tech Stack

- Python 3.12+
- FastAPI
- SQLAlchemy
- Google Agent Development Kit (ADK)
- OpenRouter API
- Next.js 14
- TypeScript
- Tailwind CSS

## 📦 Installation

1. Clone the repository
2. Set up Python environment with `uv`
3. Configure environment variables
4. Run database migrations
5. Start the development servers

## 🎯 How It Works

1. **User enters a topic** → Frontend sends request to API
2. **AI Agent generates quiz** → Uses OpenRouter LLM to create MCQs
3. **Questions saved to DB** → Structured storage with relationships
4. **User takes quiz** → Real-time question delivery and validation
5. **Results tracked** → Persistent scoring and session management

---

*Built with ❤️ using modern AI and web technologies*