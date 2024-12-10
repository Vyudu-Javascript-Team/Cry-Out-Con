import React, { useState, useRef } from 'react';
import { Calendar, MapPin, Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedText from './AnimatedText';
import AnimatedButton from './AnimatedButton';
import AnimatedBackground from './AnimatedBackground';
import GlitchText from './GlitchText';
import NeonText from './NeonText';
import VideoGallery from './VideoGallery';

export const Hero = () => {
  const containerRef = useRef(null);
  const [isVideoGalleryOpen, setIsVideoGalleryOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const scrollToRegistration = () => {
    const registrationSection = document.getElementById('registration');
    const navHeight = 80; // Height of the fixed navbar
    
    if (registrationSection) {
      const elementPosition = registrationSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background container with higher z-index than -10 to ensure it's always visible */}
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
      </div>
      
      {/* Content with higher z-index */}
      <motion.div
        style={{ opacity: contentOpacity, scale: contentScale }}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-8 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="text-6xl md:text-8xl font-bold tracking-tight">
                <NeonText text="CRY OUT" className="mx-2" />
                <span className="inline-block">CON</span>
              </div>
              <div className="text-6xl md:text-8xl font-bold tracking-tight">
                <GlitchText text="2025" />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mt-4"
              >
                Join a transformative journey of healing and spiritual growth through the power of surrender and connection with God.
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 text-white/90 text-lg"
          >
            <motion.div
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3"
            >
              <MapPin className="w-5 h-5" />
              <span>Houston, Texas</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3"
            >
              <Calendar className="w-5 h-5" />
              <span>May 1st - 3rd</span>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 pt-8"
          >
            <AnimatedButton 
              onClick={scrollToRegistration}
              className="bg-white text-primary px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-white/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Register Now
            </AnimatedButton>

            
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent z-20"
      />

      <VideoGallery 
        isOpen={isVideoGalleryOpen}
        onClose={() => setIsVideoGalleryOpen(false)}
      />
    </section>
  );
};