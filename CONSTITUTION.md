# Project Constitution: Enterprise Agentic Quiz Platform (ADK Edition)

## 1. Vision & Executive Summary
To engineer a state-of-the-art, AI-orchestrated educational ecosystem. The platform transcends traditional forms by utilizing **Autonomous Agents** (via Google ADK) to provide a dynamic, 1-by-1 adaptive learning experience. It serves as a personal tutor that validates knowledge, explains complexities, and archives growth.

## 2. Core Architectural Foundations

### A. Cognitive Intelligence Layer (Google ADK)
*   **The Orchestrator**: Uses Gemini 1.5 with the Google Agent Development Kit for logic-driven content generation.
*   **Autonomous Tool-Use**: The Agent is empowered with verified tools to interact with the system's infrastructure (PostgreSQL, Analytics API).
*   **Validation Protocol**: Employs structural guardrails and "Educational Sanity Checks" (Pydantic + System Instructions) to ensure zero-hallucination outputs.

### B. Interactive Interaction Protocol (The "Live-Feed" Logic)
*   **Atomic Delivery**: Questions are streamed/served one-by-one to prevent cognitive overload and client-side scraping.
*   **Stateful Sessions**: Every attempt is a discrete transactional entity in the database.
*   **Server-Side Verification**: Answer checking is executed on the backend. 
    *   *Dynamic Tutoring*: Upon an incorrect response, the session pauses for "Remedial Feedback"—the AI provides the rationale behind the correct choice before proceeding.
*   **Finalization Sync**: Final metrics are computed server-side and immutable once committed to the `QuizResults` ledger.

### C. Security, Privacy & Integrity
*   **Data Minimization**: Name and Email are used strictly for result identification and performance tracking.
*   **Cheating Prevention**: Valid choice IDs are hidden from the initial payload; `is_correct` logic is air-gapped from the frontend.
*   **Rate Limiting & Safety**: Built-in protections against AI-generation spam to manage API costs and system stability.

## 3. Technology Stack & Tooling
*   **AI Engine**: Google Agent Development Kit (ADK) + Gemini 1.5 Flash (for speed) / Pro (for depth).
*   **Backend**: FastAPI with Python 3.12 (Asynchronous I/O).
*   **Infrastructure**: PostgreSQL with SQLAlchemy 2.0 (Typed ORM).
*   **Package Management**: `uv` (for lightning-fast, reproducible builds).
*   **Observability**: Integrated logging to track AI token usage and tool-call success rates.

## 4. Domain-Driven Project Topology
```text
/src/04fastapi_with_postgresql/
├── agent/      # Cognitive logic, Tool definitions, and System Prompts
├── api/        # REST Controllers (Routes) & Middleware
├── core/       # Global config (DB, Security, Env)
├── models/     # Relational Database Entities (PostgreSQL)
├── schemas/    # Pydantic Structural Contracts (Data Validation)
└── services/   # Business Logic (Scoring, Session Management)
```

## 5. Strategic Roadmap (Phased Execution)
1.  **Phase 1: Persistent Foundation**: Design the multi-table relational schema (Sessions, results, audit logs).
2.  **Phase 2: Agent Capability Development**: Build Python-based Tools for the ADK Agent to "write" to the world.
3.  **Phase 3: Cognitive Integration**: Define the `EducatorAgent` and its pedagogical instructions.
4.  **Phase 4: API Orchestration**: Implement the stateful 1-by-1 endpoints and validation logic.
5.  **Phase 5: Student Analytics**: Build the reporting engine for final grades and email-linked results.
6.  **Phase 6: Professional Frontend**: (Next.js) Implementing the "Cosmic Glass" UI with framer-motion animations.

## 6. UX Design Directive
*   **Aesthetic**: "Cosmic Glassmorphism"—gradients, subtle blurs, and premium animations.
*   **Feedback Loops**: Use micro-animations (Pulse/Shake) to represent correct/incorrect states instantly.
