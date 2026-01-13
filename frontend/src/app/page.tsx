'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    BrainCircuit,
    Sparkles,
    Type,
    Lightbulb,
    CheckCircle,
    Cpu,
    Target,
    Zap,
    Shield,
    Globe
} from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function LandingPage() {
    const processSteps = [
        {
            number: "01",
            icon: Type,
            title: "Enter Your Topic",
            description: "Type any subject you want to learn",
            details: [
                "From 'Machine Learning' to 'Ancient History'",
                "Natural language understanding",
                "Smart topic analysis",
                "Context-aware processing"
            ],
            color: "from-cosmic-primary to-cosmic-primary-light"
        },
        {
            number: "02",
            icon: BrainCircuit,
            title: "AI Creates Your Quiz",
            description: "Google ADK analyzes your topic",
            details: [
                "Generates 5 custom MCQ questions",
                "Tailored difficulty levels",
                "Educational best practices",
                "Instant content generation"
            ],
            color: "from-cosmic-secondary to-cosmic-secondary-light"
        },
        {
            number: "03",
            icon: CheckCircle,
            title: "Learn Interactively",
            description: "Take your personalized quiz",
            details: [
                "Real-time feedback and explanations",
                "Progress tracking",
                "Immediate score calculation",
                "Adaptive learning insights"
            ],
            color: "from-cosmic-accent to-cosmic-accent-light"
        }
    ];

    const techStack = [
        {
            icon: BrainCircuit,
            name: "Google ADK",
            description: "Agent Development Kit for AI orchestration"
        },
        {
            icon: Zap,
            name: "OpenRouter LLM",
            description: "Advanced language model integration"
        },
        {
            icon: Cpu,
            name: "Real-time Processing",
            description: "Instant quiz generation and validation"
        },
        {
            icon: Shield,
            name: "Secure Architecture",
            description: "Privacy-focused data handling"
        }
    ];

    const features = [
        {
            icon: Target,
            title: "Personalized Learning",
            description: "AI adapts to your knowledge level and learning style"
        },
        {
            icon: Zap,
            title: "Instant Generation",
            description: "Get custom quizzes in seconds, not hours"
        },
        {
            icon: Globe,
            title: "Any Topic",
            description: "From quantum physics to cooking - we cover it all"
        },
        {
            icon: BrainCircuit,
            title: "Smart Explanations",
            description: "Learn from mistakes with detailed explanations"
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
                    <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-cosmic-accent text-sm font-bold">
                        <Sparkles className="w-4 h-4" />
                        AI-Powered Quiz Generation
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                        Learn <span className="text-gradient">Smarter</span>,<br />
                        Not Harder
                    </h1>

                    <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
                        Transform any topic into interactive quizzes in seconds.
                        AI-powered learning that adapts to you, making education more effective and engaging.
                    </p>

                    <Link
                        href="/quiz"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cosmic-primary to-cosmic-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cosmic-primary/25 transition-all duration-300 hover:scale-105"
                    >
                        Try Quizzly.ai Now
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>

                {/* Process Steps */}
                <motion.div
                    id="how-it-works"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-24"
                >
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            How It <span className="text-gradient">Works</span>
                        </h2>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                            Three simple steps to transform any topic into an engaging learning experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.2 }}
                                className="relative"
                            >
                                {/* Connection Line */}
                                {index < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-20 left-full w-12 h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0" />
                                )}

                                <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300 relative z-10">
                                    {/* Step Number */}
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 mx-auto`}>
                                        <span className="text-2xl font-black text-white">{step.number}</span>
                                    </div>

                                    {/* Icon */}
                                    <div className="flex justify-center mb-4">
                                        <step.icon className="w-12 h-12 text-cosmic-primary" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold mb-3 text-center">{step.title}</h3>
                                    <p className="text-text-secondary text-center mb-6 leading-relaxed">
                                        {step.description}
                                    </p>

                                    {/* Details */}
                                    <ul className="space-y-2">
                                        {step.details.map((detail, detailIndex) => (
                                            <li key={detailIndex} className="flex items-center text-sm text-text-secondary">
                                                <CheckCircle className="w-4 h-4 text-cosmic-primary mr-2 flex-shrink-0" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Technology Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mb-24"
                >
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            Powered by <span className="text-gradient">Advanced AI</span>
                        </h2>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                            Built with cutting-edge technology to deliver the best learning experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {techStack.map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 + index * 0.1 }}
                                className="glass-card p-6 rounded-xl text-center hover:scale-105 transition-all duration-300"
                            >
                                <tech.icon className="w-10 h-10 text-cosmic-primary mx-auto mb-4" />
                                <h3 className="font-bold mb-2">{tech.name}</h3>
                                <p className="text-sm text-text-secondary">{tech.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Why Quizzly Works */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="mb-24"
                >
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            Why <span className="text-gradient">Quizzly.ai</span> Works
                        </h2>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                            Combining AI intelligence with proven educational methodologies
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.4 + index * 0.1 }}
                                className="flex items-start space-x-4 glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-gradient-to-r from-cosmic-primary to-cosmic-secondary rounded-xl flex items-center justify-center">
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 }}
                    className="text-center"
                >
                    <div className="glass-card p-12 rounded-2xl max-w-3xl mx-auto">
                        <Lightbulb className="w-16 h-16 text-cosmic-accent mx-auto mb-6 animate-pulse" />
                        <h2 className="text-3xl md:text-4xl font-black mb-4">
                            Ready to Learn Smarter?
                        </h2>
                        <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                            Join thousands of learners who are already using AI to master new topics faster and more effectively.
                        </p>
                        <Link
                            href="/quiz"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cosmic-primary to-cosmic-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cosmic-primary/25 transition-all duration-300 hover:scale-105"
                        >
                            Start Your First Quiz
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
