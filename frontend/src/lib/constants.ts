// App Constants
export const APP_NAME = 'Quizzly.ai';
export const APP_DESCRIPTION = 'AI-Powered Quiz Platform - Learn Smarter, Not Harder';
export const CREATOR_NAME = 'Rehan Ahmed';
export const CREATOR_TITLE = 'Agentic AI Developer';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Animation Constants
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.6,
  slower: 1.0
};

export const ANIMATION_EASE = {
  default: [0.25, 0.25, 0, 1],
  spring: [0.34, 1.56, 0.64, 1],
  bounce: [0.68, -0.55, 0.265, 1.55]
};

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

// Color Palette
export const COLORS = {
  cosmic: {
    bg: '#0F0F23',
    surface: '#1A1A2E',
    surfaceLight: '#252545',
    primary: '#4F46E5',
    primaryLight: '#6366F1',
    primaryDark: '#3730A3',
    secondary: '#7C3AED',
    secondaryLight: '#8B5CF6',
    secondaryDark: '#5B21B6',
    accent: '#F59E0B',
    accentLight: '#FBBF24',
    accentDark: '#D97706'
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    muted: 'rgba(255, 255, 255, 0.4)'
  }
};

// Quiz Configuration
export const QUIZ_CONFIG = {
  questionsPerQuiz: 5,
  maxTopicLength: 200,
  minTopicLength: 3,
  timeoutDuration: 30000, // 30 seconds
  retryAttempts: 3
};

// Navigation Links
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' }
];

// Social Links
export const SOCIAL_LINKS = {
  github: 'https://github.com/rehanahmed',
  linkedin: 'https://linkedin.com/in/rehanahmed',
  email: 'mailto:rehan@quizzly.ai',
  support: 'mailto:support@quizzly.ai',
  feedback: 'mailto:feedback@quizzly.ai'
};

// FAQ Categories
export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'ai-generation', label: 'AI & Quiz Generation' },
  { id: 'quiz-experience', label: 'Quiz Experience' },
  { id: 'technical', label: 'Technical Support' },
  { id: 'learning-tips', label: 'Learning Tips' }
];

// Technology Stack
export const TECH_STACK = {
  frontend: [
    { name: 'Next.js 14', description: 'React framework with App Router' },
    { name: 'TypeScript', description: 'Type-safe JavaScript development' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
    { name: 'Framer Motion', description: 'Smooth animations and transitions' }
  ],
  backend: [
    { name: 'FastAPI', description: 'High-performance Python web framework' },
    { name: 'SQLAlchemy', description: 'Python SQL toolkit and ORM' },
    { name: 'PostgreSQL', description: 'Advanced open-source database' },
    { name: 'Alembic', description: 'Database migration tool' }
  ],
  ai: [
    { name: 'Google ADK', description: 'Agent Development Kit for AI orchestration' },
    { name: 'OpenRouter LLM', description: 'Advanced language model integration' },
    { name: 'Real-time Processing', description: 'Instant quiz generation and validation' },
    { name: 'Secure Architecture', description: 'Privacy-focused data handling' }
  ]
};

// Feature Highlights
export const FEATURES = [
  {
    title: 'Personalized Learning',
    description: 'AI adapts to your knowledge level and learning style',
    icon: 'Target'
  },
  {
    title: 'Instant Generation',
    description: 'Get custom quizzes in seconds, not hours',
    icon: 'Zap'
  },
  {
    title: 'Any Topic',
    description: 'From quantum physics to cooking - we cover it all',
    icon: 'Globe'
  },
  {
    title: 'Smart Explanations',
    description: 'Learn from mistakes with detailed explanations',
    icon: 'BrainCircuit'
  }
];

// Process Steps
export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Enter Your Topic',
    description: 'Type any subject you want to learn',
    details: [
      'From "Machine Learning" to "Ancient History"',
      'Natural language understanding',
      'Smart topic analysis',
      'Context-aware processing'
    ],
    color: 'from-cosmic-primary to-cosmic-primary-light'
  },
  {
    number: '02',
    title: 'AI Creates Your Quiz',
    description: 'Google ADK analyzes your topic',
    details: [
      'Generates 5 custom MCQ questions',
      'Tailored difficulty levels',
      'Educational best practices',
      'Instant content generation'
    ],
    color: 'from-cosmic-secondary to-cosmic-secondary-light'
  },
  {
    number: '03',
    title: 'Learn Interactively',
    description: 'Take your personalized quiz',
    details: [
      'Real-time feedback and explanations',
      'Progress tracking',
      'Immediate score calculation',
      'Adaptive learning insights'
    ],
    color: 'from-cosmic-accent to-cosmic-accent-light'
  }
];

// Meta Tags
export const META_TAGS = {
  title: 'Quizzly.ai - AI-Powered Quiz Platform',
  description: 'Transform any topic into interactive quizzes with AI. Learn smarter, not harder with personalized quiz generation.',
  keywords: 'AI quiz, learning platform, education, quiz generator, artificial intelligence, personalized learning',
  author: 'Rehan Ahmed',
  creator: 'Rehan Ahmed',
  robots: 'index, follow',
  language: 'en-US',
  revisitAfter: '7 days'
};

// Error Messages
export const ERROR_MESSAGES = {
  networkError: 'Network error. Please check your connection and try again.',
  serverError: 'Server error. Please try again later.',
  validationError: 'Please check your input and try again.',
  topicTooShort: `Topic must be at least ${QUIZ_CONFIG.minTopicLength} characters long.`,
  topicTooLong: `Topic must be less than ${QUIZ_CONFIG.maxTopicLength} characters long.`,
  quizGenerationFailed: 'Failed to generate quiz. Please try again.',
  sessionNotFound: 'Quiz session not found. Please start a new quiz.',
  questionNotFound: 'Question not found. Please refresh and try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  quizGenerated: 'Quiz generated successfully!',
  answerSubmitted: 'Answer submitted successfully!',
  quizCompleted: 'Quiz completed! Great job!',
  resultsSaved: 'Results saved successfully!'
};

// Loading Messages
export const LOADING_MESSAGES = {
  generatingQuiz: 'Generating your personalized quiz...',
  submittingAnswer: 'Submitting your answer...',
  loadingQuestion: 'Loading next question...',
  savingResults: 'Saving your results...'
};