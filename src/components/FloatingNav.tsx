import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'dive-in', label: 'Start Your Journey' },
  { id: 'video', label: 'Video' },
  { id: 'registration', label: 'Registration' },
  { id: 'exhibitor-info', label: 'Empowerment Resources' },
  { id: 'hotels', label: 'Hotels' },
  { id: 'insights', label: 'Featured Content' },
  { id: 'news', label: 'News' },
  { id: 'partners', label: 'Partners' }
];

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0, 0.5, 1]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.floating-nav')) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex items-center gap-4 floating-nav">
      {/* Progress bar */}
      <motion.div className="hidden lg:flex flex-col gap-2 items-center">
        <div className="h-48 w-1 bg-white/10 rounded-full relative overflow-hidden">
          <motion.div
            className="absolute top-0 w-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"
            style={{
              height: `${scrollProgress}%`,
              transition: 'height 0.1s'
            }}
          />
        </div>
      </motion.div>

      {/* Navigation menu */}
      <motion.div
        className="relative"
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        {/* Menu Toggle Button */}
        <motion.button
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'bg-white text-primary hover:bg-opacity-90' 
              : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
          } border border-white/20`}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute right-16 top-0 bg-white rounded-2xl p-2 w-48 shadow-xl border border-white/20"
            >
              <div className="space-y-1">
                {sections.map(({ id, label }) => (
                  <motion.button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeSection === id
                        ? 'bg-primary text-white font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FloatingNav;