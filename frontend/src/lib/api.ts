import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
    baseURL: API_URL,
});

export interface QuizGenerateResponse {
    session_id: number;
    message: string;
    total_questions: number;
}

export interface Choice {
    id: number;
    choice_text: string;
}

export interface QuestionResponse {
    id: number;
    question_text: string;
    choices: Choice[];
    current_number: number;
    total_questions: number;
}

export interface AnswerValidationResponse {
    is_correct: boolean;
    correct_choice_id?: number;
    explanation?: string;
    next_question_available: boolean;
}

export interface QuizFinalizeRequest {
    session_id: number;
    user_name: string;
    user_email: string;
}

export interface QuizResultResponse {
    user_name: string;
    topic: string;
    score: number;
    total_questions: number;
    percentage: number;
    completed_at: string;
}


export const quizApi = {
    generate: (topic: string) =>
        api.post<QuizGenerateResponse>('/quiz/generate', { topic }),

    getNextQuestion: (sessionId: number) =>
        api.get<QuestionResponse>(`/quiz/next?session_id=${sessionId}`),

    submitAnswer: (sessionId: number, questionId: number, choiceId: number) =>
        api.post<AnswerValidationResponse>('/quiz/submit', {
            session_id: sessionId,
            question_id: questionId,
            choice_id: choiceId
        }),

    finalize: (data: QuizFinalizeRequest) =>
        api.post<QuizResultResponse>('/quiz/finalize', data),
};
