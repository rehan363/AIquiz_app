'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Menu, X, Sparkles } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about', label: 'About' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav shadow-lg' : 'bg-transparent'
        }`}
      id="main-navigation"
    >
      {/* Skip Links */}
      <div className="sr-only">
        <a
          href="#main-content"
          className="absolute top-0 left-0 bg-cosmic-primary text-white px-4 py-2 rounded focus:not-sr-only focus:z-50"
        >
          Skip to main content
        </a>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <BrainCircuit className="w-8 h-8 text-cosmic-primary group-hover:text-cosmic-primary-light transition-colors" />
              <Sparkles className="w-4 h-4 text-cosmic-accent absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-gradient">Quizzly.ai</span>
              <span className="text-xs text-text-muted -mt-1">AI-Powered Learning</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${pathname === item.href
                  ? 'text-cosmic-primary active'
                  : 'text-text-secondary hover:text-text-primary'
                  }`}
              >
                {item.label}
              </Link>
            ))}

            {/* CTA Button */}
            <Link
              href="/quiz"
              className="ml-4 px-6 py-2 bg-gradient-to-r from-cosmic-primary to-cosmic-secondary 
                       text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cosmic-primary/25 
                       transition-all duration-300 hover:scale-105"
            >
              Try Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 min-h-[44px] min-w-[44px] rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMenu}
            />

            {/* Mobile Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] glass-nav border-l border-white/10 z-50 md:hidden"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <BrainCircuit className="w-6 h-6 text-cosmic-primary" />
                  <span className="text-lg font-bold text-gradient">Quizzly.ai</span>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 min-h-[44px] min-w-[44px] rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex flex-col p-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`block px-4 py-4 rounded-xl text-base font-medium transition-all min-h-[48px] flex items-center ${pathname === item.href
                        ? 'bg-cosmic-primary/20 text-cosmic-primary border border-cosmic-primary/30'
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                        }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4 border-t border-white/10 mt-4"
                >
                  <Link
                    href="/quiz"
                    onClick={closeMenu}
                    className="block w-full py-4 px-6 bg-gradient-to-r from-cosmic-primary to-cosmic-secondary 
                             text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cosmic-primary/25 
                             transition-all duration-300 hover:scale-105 text-center"
                  >
                    Try Quizzly.ai Now
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;