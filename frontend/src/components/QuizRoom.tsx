'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizApi, QuestionResponse, AnswerValidationResponse } from '@/lib/api';
import { Loader2, CheckCircle2, XCircle, ChevronRight, HelpCircle } from 'lucide-react';
import { QuizLoading } from './ui/LoadingStates';

interface QuizRoomProps {
    sessionId: number;
    onComplete: (data: any) => void;
}

export default function QuizRoom({ sessionId, onComplete }: QuizRoomProps) {
    const [question, setQuestion] = useState<QuestionResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<AnswerValidationResponse | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchNextQuestion();
    }, [sessionId]);

    const fetchNextQuestion = async () => {
        setLoading(true);
        setFeedback(null);
        setSelectedId(null);
        try {
            const res = await quizApi.getNextQuestion(sessionId);
            setQuestion(res.data);
        } catch (error) {
            console.error('Failed to fetch question', error);
            // If we get an error here, it might mean the quiz is done
            onComplete(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (selectedId === null || !question) return;
        setSubmitting(true);
        try {
            const res = await quizApi.submitAnswer(sessionId, question.id, selectedId);
            setFeedback(res.data);
        } catch (error) {
            console.error('Submission failed', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <QuizLoading message="AI is fetching your next challenge..." className="h-64" />;
    }

    if (!question) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-2xl"
            >
                <div className="mb-8 flex justify-between items-center text-sm font-medium">
                    <span className="text-cosmic-primary px-3 py-1 rounded-full bg-cosmic-primary/10">
                        Question {question.current_number} of {question.total_questions}
                    </span>
                    <div className="h-1 flex-1 mx-4 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-cosmic-primary to-cosmic-secondary"
                            initial={{ width: 0 }}
                            animate={{ width: `${(question.current_number / question.total_questions) * 100}%` }}
                        />
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-8 leading-tight">
                    {question.question_text}
                </h2>

                <div className="grid gap-4 mb-8">
                    {question.choices.map((choice) => {
                        const isSelected = selectedId === choice.id;
                        const isCorrect = feedback?.correct_choice_id === choice.id || (feedback?.is_correct && isSelected);
                        const isWrong = feedback && isSelected && !feedback.is_correct;

                        return (
                            <button
                                key={choice.id}
                                disabled={!!feedback}
                                onClick={() => setSelectedId(choice.id)}
                                className={`
                  w-full text-left p-5 rounded-xl border transition-all duration-300 relative overflow-hidden
                  ${isSelected ? 'glass-card border-cosmic-primary' : 'glass-panel hover:border-white/20'}
                  ${isCorrect ? 'border-green-500/50 bg-green-500/10' : ''}
                  ${isWrong ? 'border-red-500/50 bg-red-500/10' : ''}
                  disabled:cursor-default
                `}
                            >
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className={`
                    w-6 h-6 rounded-full border flex items-center justify-center text-xs
                    ${isSelected ? 'bg-cosmic-primary border-cosmic-primary' : 'border-white/20 text-white/40'}
                    ${isCorrect ? 'bg-green-500 border-green-500' : ''}
                    ${isWrong ? 'bg-red-500 border-red-500' : ''}
                  `}>
                                        {isCorrect ? <CheckCircle2 className="w-4 h-4" /> :
                                            isWrong ? <XCircle className="w-4 h-4" /> :
                                                isSelected ? <div className="w-2 h-2 rounded-full bg-white" /> : null}
                                    </div>
                                    <span className={isSelected ? 'text-white font-medium' : 'text-white/80'}>
                                        {choice.choice_text}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="space-y-6">
                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-5 rounded-xl bg-cosmic-secondary/5 border border-cosmic-secondary/20"
                        >
                            <div className="flex gap-3">
                                <HelpCircle className="w-5 h-5 text-cosmic-secondary mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-cosmic-secondary mb-1">Tutor Rationale</h4>
                                    <p className="text-white/70 text-sm leading-relaxed italic">
                                        "{feedback.explanation || 'Excellent work! You understood this concept perfectly.'}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {!feedback ? (
                        <button
                            disabled={selectedId === null || submitting}
                            onClick={handleSubmit}
                            className="w-full py-4 bg-cosmic-primary hover:bg-cosmic-primary/90 disabled:opacity-50 
                       disabled:cursor-not-allowed text-white font-bold rounded-xl
                       shadow-lg shadow-cosmic-primary/20 transition-all flex items-center justify-center gap-2"
                        >
                            {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
                            Submit Answer
                        </button>
                    ) : (
                        <button
                            onClick={feedback.next_question_available ? fetchNextQuestion : () => onComplete(null)}
                            className="w-full py-4 bg-white text-black font-bold rounded-xl
                       hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                        >
                            {feedback.next_question_available ? 'Next Challenge' : 'Finish Quiz'}
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
