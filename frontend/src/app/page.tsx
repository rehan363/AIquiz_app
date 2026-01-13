'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizApi } from '@/lib/api';
import QuizRoom from '@/components/QuizRoom';
import FinalizeForm from '@/components/FinalizeForm';
import ResultView from '@/components/ResultView';
import { 
  Sparkles, 
  BrainCircuit, 
  Search, 
  ArrowRight, 
  Loader2
} from 'lucide-react';

type QuizState = 'START' | 'QUIZ' | 'FINALIZE' | 'RESULT';

export default function Home() {
  const [state, setState] = useState<QuizState>('START');
  const [topic, setTopic] = useState('');
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const startQuiz = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const res = await quizApi.generate(topic);
      setSessionId(res.data.session_id);
      setState('QUIZ');
    } catch (error) {
      console.error('Failed to start quiz', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = () => {
    setState('FINALIZE');
  };

  const handleFinalResult = (data: any) => {
    setResult(data);
    setState('RESULT');
  };

  const resetAll = () => {
    setState('START');
    setTopic('');
    setSessionId(null);
    setResult(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 pt-20 sm:p-6 sm:pt-24 relative z-10">
      <AnimatePresence mode="wait">
        {state === 'START' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center max-w-4xl w-full"
          >
            {/* Decorative Header - Always hidden on mobile, always shown on desktop */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 hidden sm:flex items-center gap-3 text-white/40">
              <BrainCircuit className="w-6 h-6" />
              <span className="text-sm font-bold tracking-[0.3em] uppercase">Enterprise Agentic Platform</span>
            </div>

            <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-cosmic-accent text-sm font-bold">
              <Sparkles className="w-4 h-4" />
              Powered by Google Gemini ADK
            </div>

            <h1 className="font-black mb-6 tracking-tight text-4xl sm:text-6xl lg:text-7xl">
              Master Any <span className="text-cosmic-primary">Topic</span>.
            </h1>
            <p className="text-white/60 leading-relaxed text-base sm:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto">
              Transform any topic into interactive quizzes in seconds. 
              AI-powered learning that adapts to you, making education more effective and engaging.
            </p>

            <div className="relative group mx-auto w-full max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-cosmic-primary to-cosmic-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative">
                {/* Mobile Layout - Always hidden on desktop */}
                <div className="sm:hidden space-y-4">
                  <input
                    type="text"
                    placeholder="E.g. Quantum Physics, Web APIs, History of Rome"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-cosmic-bg/80 backdrop-blur-3xl border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-cosmic-primary/50 transition-all text-lg"
                  />
                  <button
                    onClick={startQuiz}
                    disabled={!topic || loading}
                    className="w-full py-4 px-6 bg-cosmic-primary rounded-xl text-white font-bold 
                             hover:bg-cosmic-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                    {loading ? 'Generating Quiz...' : 'Start Quiz'}
                  </button>
                </div>

                {/* Desktop Layout - Always hidden on mobile */}
                <div className="hidden sm:flex items-center">
                  <Search className="absolute left-6 w-5 h-5 text-white/30 z-10" />
                  <input
                    type="text"
                    placeholder="E.g. Quantum Physics, Web APIs, History of Rome"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && startQuiz()}
                    className="w-full bg-cosmic-bg/80 backdrop-blur-3xl border border-white/10 rounded-2xl py-6 pl-16 pr-32 focus:outline-none focus:border-cosmic-primary/50 transition-all text-lg"
                  />
                  <button
                    onClick={startQuiz}
                    disabled={!topic || loading}
                    className="absolute right-3 py-3 px-6 bg-cosmic-primary rounded-xl text-white font-bold 
                             hover:bg-cosmic-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                    Go
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-text-muted mb-4">Popular topics to try:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Machine Learning', 'Ancient Rome', 'Quantum Physics', 'Web Development', 'Psychology'].map((example) => (
                  <button
                    key={example}
                    onClick={() => setTopic(example)}
                    className="px-3 py-1 text-xs bg-cosmic-surface/50 hover:bg-cosmic-surface text-text-secondary hover:text-white rounded-full transition-all duration-200"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {state === 'QUIZ' && sessionId && (
          <QuizRoom key="quiz" sessionId={sessionId} onComplete={handleQuizComplete} />
        )}

        {state === 'FINALIZE' && sessionId && (
          <FinalizeForm key="finalize" sessionId={sessionId} onResult={handleFinalResult} />
        )}

        {state === 'RESULT' && result && (
          <ResultView key="result" result={result} onReset={resetAll} />
        )}
      </AnimatePresence>
    </main>
  );
}
