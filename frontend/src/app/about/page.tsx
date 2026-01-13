'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Heart, 
  BrainCircuit, 
  ArrowRight,
  Target,
  Zap,
  Shield,
  Globe,
  Code,
  Database,
  Cpu,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  BookOpen,
  Users,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Learning for everyone, everywhere. We believe education should be accessible to all learners regardless of background or location.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Pushing boundaries of educational technology. We constantly explore new ways to make learning more effective and engaging.'
    },
    {
      icon: Target,
      title: 'Quality',
      description: 'Accurate, relevant, engaging content. Every quiz is crafted with educational best practices and attention to detail.'
    },
    {
      icon: Shield,
      title: 'Privacy',
      description: 'Your learning journey stays private. We prioritize data security and user privacy in everything we build.'
    }
  ];

  const techStack = [
    {
      category: 'Frontend',
      technologies: [
        { name: 'Next.js 14', description: 'React framework with App Router' },
        { name: 'TypeScript', description: 'Type-safe JavaScript development' },
        { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
        { name: 'Framer Motion', description: 'Smooth animations and transitions' }
      ]
    },
    {
      category: 'Backend',
      technologies: [
        { name: 'FastAPI', description: 'High-performance Python web framework' },
        { name: 'SQLAlchemy', description: 'Python SQL toolkit and ORM' },
        { name: 'PostgreSQL', description: 'Advanced open-source database' },
        { name: 'Alembic', description: 'Database migration tool' }
      ]
    },
    {
      category: 'AI & Infrastructure',
      technologies: [
        { name: 'Google ADK', description: 'Agent Development Kit for AI orchestration' },
        { name: 'OpenRouter LLM', description: 'Advanced language model integration' },
        { name: 'Modern Cloud', description: 'Scalable, secure deployment infrastructure' },
        { name: 'Real-time Processing', description: 'Instant quiz generation and validation' }
      ]
    }
  ];

  const roadmapItems = [
    {
      icon: Users,
      title: 'User Accounts & Progress Tracking',
      description: 'Save your quiz history and track learning progress over time',
      status: 'planned'
    },
    {
      icon: Globe,
      title: 'Multi-language Support',
      description: 'Generate quizzes in multiple languages for global accessibility',
      status: 'planned'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Detailed insights into learning patterns and knowledge gaps',
      status: 'planned'
    },
    {
      icon: BookOpen,
      title: 'Collaborative Learning',
      description: 'Share quizzes and compete with friends and classmates',
      status: 'planned'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            About <span className="text-gradient">Quizzly.ai</span>
          </h1>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Democratizing personalized education through AI-powered learning experiences. 
            Built with passion for learners everywhere.
          </p>
        </motion.div>

        {/* Creator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Meet the <span className="text-gradient">Creator</span>
            </h2>
          </div>

          <div className="glass-card p-12 rounded-2xl max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Profile Image Placeholder */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-r from-cosmic-primary to-cosmic-secondary rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-3xl font-bold mb-2">Rehan Ahmed</h3>
                <p className="text-cosmic-primary font-semibold text-lg mb-6">Agentic AI Developer</p>
                
                <p className="text-text-secondary leading-relaxed mb-8 text-lg">
                  Passionate about democratizing education through AI-powered learning experiences. 
                  Quizzly.ai represents the future of personalized learning - where artificial intelligence 
                  adapts to each learner's needs, making education more effective and engaging.
                </p>

                {/* Social Links */}
                <div className="flex justify-center lg:justify-start space-x-4 mb-8">
                  <a
                    href="https://github.com/rehanahmed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass-panel rounded-lg hover:bg-white/10 transition-all duration-300 group"
                  >
                    <Github className="w-6 h-6 text-text-secondary group-hover:text-cosmic-primary transition-colors" />
                  </a>
                  <a
                    href="https://linkedin.com/in/rehanahmed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass-panel rounded-lg hover:bg-white/10 transition-all duration-300 group"
                  >
                    <Linkedin className="w-6 h-6 text-text-secondary group-hover:text-cosmic-primary transition-colors" />
                  </a>
                  <a
                    href="mailto:rehan@quizzly.ai"
                    className="p-3 glass-panel rounded-lg hover:bg-white/10 transition-all duration-300 group"
                  >
                    <Mail className="w-6 h-6 text-text-secondary group-hover:text-cosmic-primary transition-colors" />
                  </a>
                </div>

                <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm">
                  <span className="text-text-muted">Made with</span>
                  <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className="text-text-muted">for learners everywhere</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission & Story */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="glass-card p-8 rounded-2xl">
              <Target className="w-12 h-12 text-cosmic-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-text-secondary leading-relaxed">
                To transform how people learn by creating intelligent, adaptive quiz experiences 
                that help master any topic. Every learner deserves personalized education that 
                adapts to their pace and style, making knowledge accessible and engaging for everyone.
              </p>
            </div>

            {/* Story */}
            <div className="glass-card p-8 rounded-2xl">
              <BookOpen className="w-12 h-12 text-cosmic-secondary mb-6" />
              <h3 className="text-2xl font-bold mb-4">The Story</h3>
              <p className="text-text-secondary leading-relaxed">
                Founded in 2024 with a vision to revolutionize learning through AI. 
                Combining cutting-edge artificial intelligence with proven pedagogical methods, 
                Quizzly.ai was born from the belief that personalized education should be 
                accessible to everyone, anywhere, at any time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              The principles that guide everything we build and every decision we make
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cosmic-primary to-cosmic-secondary rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-text-secondary leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Built with <span className="text-gradient">Modern Tech</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Powered by cutting-edge technologies for performance, scalability, and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {techStack.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + categoryIndex * 0.1 }}
                className="glass-card p-6 rounded-2xl"
              >
                <h3 className="text-xl font-bold mb-6 text-center">{category.category}</h3>
                <div className="space-y-4">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={tech.name} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-semibold text-cosmic-primary mb-1">{tech.name}</h4>
                      <p className="text-sm text-text-secondary">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Future <span className="text-gradient">Vision</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Exciting features and improvements coming to Quizzly.ai
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-cosmic-accent to-cosmic-primary rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold">{item.title}</h3>
                      <span className="px-2 py-1 bg-cosmic-accent/20 text-cosmic-accent text-xs rounded-full">
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="text-center"
        >
          <div className="glass-card p-12 rounded-2xl max-w-3xl mx-auto">
            <Sparkles className="w-16 h-16 text-cosmic-accent mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Join the AI-powered learning revolution. Start creating personalized quizzes 
              and discover a smarter way to master any topic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cosmic-primary to-cosmic-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cosmic-primary/25 transition-all duration-300 hover:scale-105"
              >
                Start Learning Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 glass-panel text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Learn How It Works
                <BrainCircuit className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}