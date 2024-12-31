import React, { useRef, useState } from 'react';
import { Heart, Church, BookOpen, Users, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import SpotlightEffect from './SpotlightEffect';
import SectionTitle from './SectionTitle';

const EmpowermentResources = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const resources = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Onsite Counseling",
      description: "Professional faith-based counselors providing spiritual and emotional guidance throughout the conference",
      features: [
        "One-on-one sessions",
        "Couple counseling",
        "Family support",
        "Crisis intervention"
      ],
      color: "from-pink-400 to-purple-600"
    },
    {
      icon: <Church className="w-8 h-8" />,
      title: "Prayer Support",
      description: "Dedicated prayer teams available 24/7 for spiritual support and intercession",
      features: [
        "Prayer rooms",
        "Group prayer sessions",
        "Prophetic ministry",
        "Healing services"
      ],
      color: "from-purple-400 to-blue-600"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Faith-Based Programs",
      description: "Comprehensive spiritual development programs and workshops",
      features: [
        "Bible study groups",
        "Leadership training",
        "Youth ministry",
        "Worship workshops"
      ],
      color: "from-blue-400 to-indigo-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Groups",
      description: "Connect with others in your spiritual journey through focused group sessions",
      features: [
        "Women's ministry",
        "Men's fellowship",
        "Young adults",
        "Marriage enrichment"
      ],
      color: "from-indigo-400 to-purple-600"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Support Network",
      description: "Ongoing support and resources for continued spiritual growth",
      features: [
        "Online community",
        "Resource library",
        "Mentorship program",
        "Follow-up care"
      ],
      color: "from-purple-400 to-pink-600"
    }
  ];

  const visibleResources = resources.slice(currentIndex, currentIndex + 3);
  const maxIndex = resources.length - 3;

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 3, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 3, 0));
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="py-8 relative overflow-hidden"
      style={{ opacity }}
    >
      <SpotlightEffect sectionRef={sectionRef} color="purple" delay={0.3} />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.5])
        }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <SectionTitle 
            title={
              <span className="inline-flex flex-col sm:flex-row items-center justify-center gap-x-4 leading-none">
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                  Empowerment
                </span>
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600">
                  Resources
                </span>
              </span>
            }
            subtitle="Transform your life through our comprehensive spiritual support services"
            gradient="from-purple-400 via-pink-400 to-blue-400"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-16">
          {/* Navigation Buttons */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
            {currentIndex > 0 && (
              <motion.button
                onClick={prevSlide}
                className="w-12 h-12 -ml-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center pointer-events-auto transform transition-all duration-200 hover:bg-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </motion.button>
            )}
            {currentIndex < maxIndex && (
              <motion.button
                onClick={nextSlide}
                className="w-12 h-12 -mr-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center pointer-events-auto transform transition-all duration-200 hover:bg-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </motion.button>
            )}
          </div>

          {/* Resources Grid */}
          <motion.div 
            ref={containerRef}
            className="relative overflow-hidden"
            style={{ scale }}
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                {visibleResources.map((resource, index) => (
                  <motion.div
                    key={`${resource.title}-${currentIndex + index}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <motion.div
                      className="relative bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <motion.div
                        className={`inline-block p-4 rounded-xl bg-gradient-to-br ${resource.color} mb-6`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {resource.icon}
                      </motion.div>
                      
                      <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                        {resource.title}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-gray-300 mb-6">
                        {resource.description}
                      </p>
                      
                      <ul className="space-y-3">
                        {resource.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + featureIndex * 0.1 }}
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${resource.color}`} />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(resources.length / 3) }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  Math.floor(currentIndex / 3) === i 
                    ? 'bg-white' 
                    : 'bg-white/20'
                }`}
                whileHover={{ scale: 1.2 }}
                animate={{ scale: Math.floor(currentIndex / 3) === i ? 1.2 : 1 }}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#registration"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Access Resources
          </motion.a>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(139, 92, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)'} 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default EmpowermentResources;