import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import VideoPlayer from './VideoPlayer';
import introVideo from "../assets/videos/0622 - CRYOUT 2025 REVEAL REV.mp4";

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Enhanced animation transforms
  const x = useTransform(scrollYProgress, [0, 0.3, 0.5], [1000, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.5, 0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0.5, 1]);
  const rotateY = useTransform(scrollYProgress, [0, 0.3, 0.5], [90, 45, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.5], [45, 30, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.5], [300, 100, 0]);
  
  // Spring animations for smoother transitions
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const xSpring = useSpring(x, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const opacitySpring = useSpring(opacity, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);
  const rotateXSpring = useSpring(rotateX, springConfig);
  const ySpring = useSpring(y, springConfig);

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen py-20 relative flex items-center justify-center overflow-hidden"
    >
      {/* Background effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-primary to-primary"
        style={{ opacity: opacitySpring }}
      />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          className="max-w-5xl mx-auto perspective-1000"
          style={{
            x: xSpring,
            scale: scaleSpring,
            opacity: opacitySpring,
            rotateY: rotateYSpring,
            rotateX: rotateXSpring,
            y: ySpring,
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            initial={false}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <VideoPlayer
              url={introVideo}
              type="direct"
            />
            
            {/* Enhanced decorative elements */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-50 blur-xl -z-10 rounded-xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.98, 1.02, 0.98],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Additional glow effects */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-2xl -z-20 rounded-xl"
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1.02, 0.98, 1.02],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5,
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoSection;