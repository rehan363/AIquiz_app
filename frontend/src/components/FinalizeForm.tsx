'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { quizApi } from '@/lib/api';
import { Loader2, Mail, User, Trophy } from 'lucide-react';

interface FinalizeFormProps {
    sessionId: number;
    onResult: (data: any) => void;
}

export default function FinalizeForm({ sessionId, onResult }: FinalizeFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await quizApi.finalize({
                session_id: sessionId,
                user_name: name,
                user_email: email,
            });
            onResult(res.data);
        } catch (error) {
            console.error('Finalization failed', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full glass-panel p-8 rounded-2xl text-center"
        >
            <div className="w-16 h-16 bg-cosmic-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-cosmic-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-white/60 mb-8">Enter your details to see your final score and record your achievement.</p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/40 ml-1 mb-2 block">
                        Full Name
                    </label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                        <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-cosmic-primary/50 focus:outline-none transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/40 ml-1 mb-2 block">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-cosmic-primary/50 focus:outline-none transition-all"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-cosmic-primary hover:bg-cosmic-primary/90 text-white font-bold rounded-xl
                   shadow-lg shadow-cosmic-primary/20 transition-all flex items-center justify-center gap-2 mt-4"
                >
                    {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
                    Show My Results
                </button>
            </form>
        </motion.div>
    );
}
