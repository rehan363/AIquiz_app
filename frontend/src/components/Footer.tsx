'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BrainCircuit, Heart, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { href: '/', label: 'Home' },
        { href: '/how-it-works', label: 'How It Works' },
        { href: '/faq', label: 'FAQ' },
        { href: '/about', label: 'About' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { href: '/faq#ai-generation', label: 'AI & Quiz Generation' },
        { href: '/faq#quiz-experience', label: 'Quiz Experience' },
        { href: '/faq#technical', label: 'Technical Support' },
        { href: '/faq#learning-tips', label: 'Learning Tips' },
      ],
    },
  ];

  const socialLinks = [
    {
      href: 'https://github.com/rehanahmed',
      icon: Github,
      label: 'GitHub',
    },
    {
      href: 'https://linkedin.com/in/rehanahmed',
      icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      href: 'mailto:rehan@quizzly.ai',
      icon: Mail,
      label: 'Email',
    },
  ];

  return (
    <footer className="relative mt-24 border-t border-white/10">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-cosmic-surface/50 to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 mb-6"
            >
              <BrainCircuit className="w-8 h-8 text-cosmic-primary" />
              <div>
                <h3 className="text-xl font-black text-gradient">Quizzly.ai</h3>
                <p className="text-sm text-text-muted">AI-Powered Learning Platform</p>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary mb-6 max-w-md leading-relaxed"
            >
              Transform any topic into interactive quizzes with AI. Learn smarter, not harder 
              with personalized quiz generation powered by cutting-edge artificial intelligence.
            </motion.p>

            {/* Creator Attribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-2 text-sm"
            >
              <span className="text-text-muted">Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-text-muted">by</span>
              <Link 
                href="/about" 
                className="text-cosmic-primary hover:text-cosmic-primary-light font-semibold transition-colors"
              >
                Rehan Ahmed
              </Link>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xs text-text-muted mt-1"
            >
              Agentic AI Developer
            </motion.p>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (index + 3) }}
            >
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-cosmic-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          {/* Copyright */}
          <div className="text-sm text-text-muted">
            © {currentYear} Quizzly.ai. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg glass-panel hover:bg-white/10 transition-all duration-300 group"
              >
                <social.icon className="w-5 h-5 text-text-secondary group-hover:text-cosmic-primary transition-colors" />
              </motion.a>
            ))}
          </div>

          {/* Tech Badge */}
          <div className="text-xs text-text-muted flex items-center space-x-2">
            <span>Powered by</span>
            <span className="px-2 py-1 bg-cosmic-primary/20 text-cosmic-primary rounded border border-cosmic-primary/30">
              Google ADK
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;