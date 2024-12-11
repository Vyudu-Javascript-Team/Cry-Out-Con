import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionTitle from './SectionTitle';

export const News = () => {
  const news = [
    {
      title: 'Cry Out Con 2025 Innovation Awards',
      description: 'Celebrating groundbreaking ministries and innovative solutions that are transforming lives.',
      date: 'March 15, 2024',
      category: 'Awards'
    },
    {
      title: 'New Speakers Announced',
      description: 'Meet the latest ministry leaders and worship artists joining our growing conference community.',
      date: 'March 14, 2024',
      category: 'Speakers'
    },
    {
      title: 'Ministry Showcase Preview',
      description: 'Get a first look at the revolutionary ideas from emerging ministry leaders.',
      date: 'March 13, 2024',
      category: 'Ministry'
    },
    {
      title: 'Spiritual Growth Report',
      description: 'Comprehensive analysis of spiritual transformation and its impact on various communities.',
      date: 'March 12, 2024',
      category: 'Research'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary" />
      
      <div className="container mx-auto px-4 relative">
        <SectionTitle 
          title="Latest News"
          subtitle="Stay updated with announcements and developments from Cry Out Con 2025"
          gradient="from-purple-400 via-pink-400 to-blue-400"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {news.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ y: -5, x: 5 }}
              className="group relative"
            >
              <motion.div 
                className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100"
              />
              
              <motion.div 
                className="relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 text-sm bg-white/10 rounded-full text-white/80">
                    {item.category}
                  </span>
                  <span className="text-sm text-white/60">{item.date}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  {item.title}
                </h3>
                
                <p className="text-gray-300 mb-4">{item.description}</p>
                
                <motion.button
                  className="flex items-center gap-2 text-white/80 hover:text-white group/btn"
                  whileHover={{ x: 5 }}
                >
                  Read more 
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(139, 92, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)'} 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};