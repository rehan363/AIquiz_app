'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const faqData = [
    // AI & Quiz Generation
    {
      id: 'ai-1',
      category: 'ai-generation',
      question: 'How does the AI create quizzes?',
      answer: 'Quizzly.ai uses Google\'s Agent Development Kit (ADK) combined with advanced language models to analyze your topic and generate relevant, educational questions. The AI understands context, difficulty levels, and educational best practices to create personalized quizzes that match your learning needs.'
    },
    {
      id: 'ai-2',
      category: 'ai-generation',
      question: 'What topics can I create quizzes on?',
      answer: 'You can create quizzes on virtually any topic! From academic subjects like mathematics, science, and history to practical skills like cooking, programming, or business concepts. Our AI is trained on a vast knowledge base and can generate meaningful questions for almost any subject you can think of.'
    },
    {
      id: 'ai-3',
      category: 'ai-generation',
      question: 'How accurate are the AI-generated questions?',
      answer: 'Our AI generates highly accurate questions by leveraging state-of-the-art language models and educational frameworks. Each question is designed to test understanding rather than memorization, with carefully crafted multiple-choice options that include common misconceptions to enhance learning.'
    },
    {
      id: 'ai-4',
      category: 'ai-generation',
      question: 'Can I customize the difficulty level?',
      answer: 'Currently, our AI automatically adapts the difficulty based on your topic and context. We\'re working on manual difficulty controls that will allow you to specify beginner, intermediate, or advanced levels for your quizzes.'
    },
    {
      id: 'ai-5',
      category: 'ai-generation',
      question: 'How does the AI understand my topic?',
      answer: 'Our AI uses natural language processing to analyze your topic input, understanding context, scope, and educational objectives. It can interpret everything from simple keywords like "photosynthesis" to complex descriptions like "advanced machine learning algorithms for computer vision."'
    },

    // Quiz Experience
    {
      id: 'quiz-1',
      category: 'quiz-experience',
      question: 'How many questions are in each quiz?',
      answer: 'Each Quizzly.ai quiz contains 5 carefully crafted multiple-choice questions. This number is optimized for effective learning while maintaining engagement - enough to test understanding without causing fatigue.'
    },
    {
      id: 'quiz-2',
      category: 'quiz-experience',
      question: 'Can I retake quizzes on the same topic?',
      answer: 'Yes! You can generate new quizzes on the same topic as many times as you want. Each time, our AI will create fresh questions with different angles and perspectives, helping reinforce your learning through varied practice.'
    },
    {
      id: 'quiz-3',
      category: 'quiz-experience',
      question: 'How is my score calculated?',
      answer: 'Your score is calculated as the number of correct answers out of 5 total questions, displayed both as a raw score (e.g., 4/5) and as a percentage (e.g., 80%). Each question carries equal weight in the final score.'
    },
    {
      id: 'quiz-4',
      category: 'quiz-experience',
      question: 'What happens if I get an answer wrong?',
      answer: 'When you select an incorrect answer, Quizzly.ai immediately shows you the correct answer along with a detailed explanation. This instant feedback helps you understand the concept and learn from mistakes, turning errors into learning opportunities.'
    },
    {
      id: 'quiz-5',
      category: 'quiz-experience',
      question: 'Can I see explanations for correct answers too?',
      answer: 'Currently, explanations are provided primarily for incorrect answers to help with learning. We\'re working on adding optional explanations for all answers to provide deeper insights into every question, regardless of whether you answered correctly.'
    },

    // Technical Support
    {
      id: 'tech-1',
      category: 'technical',
      question: 'Do I need to create an account?',
      answer: 'No account creation is required to use Quizzly.ai! You can start generating and taking quizzes immediately. However, without an account, your quiz history and progress won\'t be saved between sessions.'
    },
    {
      id: 'tech-2',
      category: 'technical',
      question: 'Is my quiz data saved?',
      answer: 'Quiz sessions are temporarily stored during your current session to track progress and provide results. For permanent storage and progress tracking across sessions, we\'re developing user accounts with optional data persistence.'
    },
    {
      id: 'tech-3',
      category: 'technical',
      question: 'What browsers are supported?',
      answer: 'Quizzly.ai works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your preferred browser for the best experience. The platform is also fully responsive and works great on mobile devices.'
    },
    {
      id: 'tech-4',
      category: 'technical',
      question: 'How do I report technical issues?',
      answer: 'If you encounter any technical issues, please contact our support team at support@quizzly.ai. Include details about your browser, device, and the specific problem you\'re experiencing. We typically respond within 24 hours.'
    },
    {
      id: 'tech-5',
      category: 'technical',
      question: 'Is the platform mobile-friendly?',
      answer: 'Absolutely! Quizzly.ai is built with a mobile-first approach and works seamlessly on smartphones and tablets. The interface adapts to your screen size, ensuring a great learning experience whether you\'re on desktop or mobile.'
    },

    // Learning Tips
    {
      id: 'tips-1',
      category: 'learning-tips',
      question: 'How can I get better quiz results?',
      answer: 'To improve your quiz performance: 1) Be specific with your topics, 2) Take quizzes regularly for spaced repetition, 3) Read explanations carefully when you get answers wrong, 4) Try rephrasing your topic to get different question perspectives, and 5) Use quizzes as a supplement to, not replacement for, comprehensive study.'
    },
    {
      id: 'tips-2',
      category: 'learning-tips',
      question: 'What are the best practices for learning with Quizzly.ai?',
      answer: 'For optimal learning: Start with broader topics then narrow down to specifics, take multiple quizzes on the same subject over time, focus on understanding explanations rather than just memorizing answers, use incorrect answers as study guides, and combine quizzes with other learning methods like reading and practice.'
    },
    {
      id: 'tips-3',
      category: 'learning-tips',
      question: 'Can I share my quiz results?',
      answer: 'Currently, quiz results are displayed only to you during your session. We\'re developing sharing features that will allow you to share your achievements and even challenge friends with the same quizzes while maintaining privacy controls.'
    },
    {
      id: 'tips-4',
      category: 'learning-tips',
      question: 'How often should I take quizzes on the same topic?',
      answer: 'For effective learning, try the spaced repetition approach: take an initial quiz, then repeat after 1 day, 3 days, 1 week, and 2 weeks. This pattern helps move information from short-term to long-term memory. Generate new quizzes each time for varied practice.'
    },
    {
      id: 'tips-5',
      category: 'learning-tips',
      question: 'Can I suggest new features?',
      answer: 'We love hearing from our users! Send feature suggestions to feedback@quizzly.ai. Popular requests include difficulty levels, longer quizzes, progress tracking, and collaborative features. Your input helps shape Quizzly.ai\'s development roadmap.'
    }
  ];

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
            Everything you need to know about Quizzly.ai and how our AI-powered quiz generation works.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="glass-card rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-lg font-semibold pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems.includes(faq.id) ? (
                      <Minus className="w-5 h-5 text-cosmic-primary" />
                    ) : (
                      <Plus className="w-5 h-5 text-text-muted" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 border-t border-white/10">
                        <p className="text-text-secondary leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}