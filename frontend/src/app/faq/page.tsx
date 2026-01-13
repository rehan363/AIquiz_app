'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  Search, 
  ArrowRight, 
  ChevronDown,
  Bot,
  BarChart3,
  Settings,
  Lightbulb,
  Plus,
  Minus
} from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'ai-generation', label: 'AI & Quiz Generation', icon: Bot },
    { id: 'quiz-experience', label: 'Quiz Experience', icon: BarChart3 },
    { id: 'technical', label: 'Technical Support', icon: Settings },
    { id: 'learning-tips', label: 'Learning Tips', icon: Lightbulb },
  ];

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

  const filteredFAQs = useMemo(() => {
    let filtered = faqData;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [activeCategory, searchTerm]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? <mark key={index} className="bg-cosmic-accent/30 text-cosmic-accent-light">{part}</mark>
        : part
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

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-cosmic-surface/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-cosmic-primary/50 transition-all"
            />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-cosmic-primary text-white'
                    : 'glass-panel text-text-secondary hover:text-white hover:bg-white/10'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">{category.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mb-16"
        >
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-text-muted mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No questions found</h3>
              <p className="text-text-secondary">
                Try adjusting your search terms or selecting a different category.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="glass-card rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-lg font-semibold pr-4">
                      {highlightText(faq.question, searchTerm)}
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
                            {highlightText(faq.answer, searchTerm)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="glass-card p-12 rounded-2xl max-w-2xl mx-auto">
            <HelpCircle className="w-16 h-16 text-cosmic-primary mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-text-secondary mb-8 leading-relaxed">
              Can't find what you're looking for? Our support team is here to help you get the most out of Quizzly.ai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:support@quizzly.ai"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cosmic-primary to-cosmic-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cosmic-primary/25 transition-all duration-300"
              >
                Contact Support
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 glass-panel text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Try Quizzly.ai
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}