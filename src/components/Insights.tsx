import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import SectionTitle from './SectionTitle';
import VideoPlayer from './VideoPlayer';

export const Insights = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const testimonials = [
    {
      title: 'A Journey of Faith',
      description: 'Sarah\'s transformative experience at last year\'s conference',
      thumbnail: 'https://images.unsplash.com/photo-1601142634808-38923eb7c560?auto=format&fit=crop&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      duration: '3:45'
    },
    {
      title: 'Ministry Impact',
      description: 'How the conference sparked a nationwide movement',
      thumbnail: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      duration: '4:20'
    },
    {
      title: 'Community Revival',
      description: 'The ripple effect of spiritual awakening',
      thumbnail: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=example3',
      duration: '5:15'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
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
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <SectionTitle 
            title={
              <span className="inline-flex flex-col sm:flex-row items-center justify-center gap-x-4 whitespace-nowrap">
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                  Featured
                </span>
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600">
                  Content
                </span>
              </span>
            }
            subtitle={
              <span className="inline-block max-w-2xl mx-auto px-4 sm:px-6 text-base sm:text-lg md:text-xl leading-relaxed">
                Experience powerful testimonies and transformative stories from our community
              </span>
            }
            gradient="from-blue-400 via-purple-400 to-pink-400"
          />
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <motion.div 
                className="relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={testimonial.thumbnail}
                    alt={testimonial.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                  
                  {/* Play button overlay */}
                  <motion.button
                    onClick={() => setSelectedVideo(index)}
                    className="absolute inset-0 flex items-center justify-center group/play"
                    whileHover="hover"
                  >
                    <motion.div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover/play:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </motion.div>
                  </motion.button>

                  {/* Duration badge */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-sm text-white/90">
                    {testimonial.duration}
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 leading-tight">
                    {testimonial.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {testimonial.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
            >
              <motion.button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 sm:top-8 right-4 sm:right-8 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-4xl mx-auto"
              >
                <VideoPlayer
                  url={testimonials[selectedVideo].videoUrl}
                  type="youtube"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
    </section>
  );
};