'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { QuizResultResponse } from '@/lib/api';
import { Calendar, Brain, Award, ArrowRight } from 'lucide-react';

interface ResultViewProps {
    result: QuizResultResponse;
    onReset: () => void;
}

export default function ResultView({ result, onReset }: ResultViewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl w-full"
        >
            <div className="glass-panel p-10 rounded-3xl relative overflow-hidden text-center mb-6">
                {/* Glow behind score */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cosmic-primary/20 blur-[100px] -z-10" />

                <h2 className="text-4xl font-extrabold mb-8">Test Summary</h2>

                <div className="flex justify-center items-end gap-2 mb-10">
                    <span className="text-8xl font-black text-white">{result.score}</span>
                    <span className="text-3xl font-bold text-white/30 mb-4">/ {result.total_questions}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="glass-card p-4 rounded-2xl flex flex-col items-center">
                        <Brain className="w-5 h-5 text-cosmic-primary mb-2" />
                        <span className="text-xs text-white/40 uppercase font-bold">Topic</span>
                        <span className="font-semibold">{result.topic}</span>
                    </div>
                    <div className="glass-card p-4 rounded-2xl flex flex-col items-center">
                        <Award className="w-5 h-5 text-cosmic-accent mb-2" />
                        <span className="text-xs text-white/40 uppercase font-bold">Performance</span>
                        <span className="font-semibold text-cosmic-accent">{result.percentage}%</span>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-white/40">
                    <Calendar className="w-4 h-4" />
                    <span>Completed on {new Date(result.completed_at).toLocaleDateString()}</span>
                </div>
            </div>

            <button
                onClick={onReset}
                className="w-full py-4 glass-card border-white/10 hover:border-white/20 text-white font-bold rounded-xl
                 transition-all flex items-center justify-center gap-2"
            >
                Try Another Topic
                <ArrowRight className="w-5 h-5" />
            </button>
        </motion.div>
    );
}
