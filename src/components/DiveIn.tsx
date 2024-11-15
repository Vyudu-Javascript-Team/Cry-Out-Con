import React, { useRef } from 'react';
import { Flame, Heart, Users, Sparkles, ArrowUpCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from './SectionTitle';

const DiveIn = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const pillars = [
    {
      icon: <Flame className="w-8 h-8" />,
      title: "Anticipate",
      description: "Expecting a divine move of God",
      delay: 0.2
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Atmosphere",
      description: "Creating space for spiritual growth",
      delay: 0.3
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Accept",
      description: "Embracing all through love",
      delay: 0.4
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Authentic",
      description: "Being genuine in faith",
      delay: 0.5
    },
    {
      icon: <ArrowUpCircle className="w-8 h-8" />,
      title: "Action",
      description: "Moving towards greater heights",
      delay: 0.6
    }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
      style={{ opacity }}
    >
      {/* 3D Perspective Background */}
      <div className="absolute inset-0 perspective-[2000px]">
        <motion.div 
          className="absolute inset-0 origin-bottom"
          initial={{ rotateX: 45 }}
          animate={{ rotateX: 35 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          {/* Grid Lines */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
                style={{ top: `${(i + 1) * 5}%` }}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            ))}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
                style={{ left: `${(i + 1) * 5}%` }}
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            title="Start Your Journey"
            subtitle="Experience transformation through The Lighthouse Church's five foundational pillars"
            gradient="from-blue-400 to-purple-600"
          />

          <div className="relative mt-20">
            {/* Connecting Lines */}
            <div className="absolute inset-0 hidden md:block">
              <svg className="w-full h-full" style={{ transform: 'translateY(-50%)' }}>
                <motion.path
                  d="M 100 50 C 300 50, 700 50, 900 50"
                  stroke="url(#glowGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                />
                <defs>
                  <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
                    <stop offset="50%" stopColor="rgba(139, 92, 246, 0.3)" />
                    <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Pillars Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-5 gap-8"
              style={{ scale }}
            >
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: pillar.delay }}
                  className="relative group"
                >
                  {/* Card */}
                  <motion.div 
                    className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 h-full"
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 20px 40px rgba(139, 92, 246, 0.1)",
                      borderColor: "rgba(255, 255, 255, 0.2)"
                    }}
                  >
                    {/* Glowing Orb */}
                    <motion.div
                      className="absolute -top-4 -right-4 w-24 h-24 rounded-full"
                      style={{
                        background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
                        filter: "blur(20px)"
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    {/* Icon Container */}
                    <motion.div
                      className="relative w-16 h-16 mb-6 mx-auto"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />
                      <div className="relative bg-white/10 rounded-full p-4 border border-white/20 backdrop-blur-sm">
                        {pillar.icon}
                      </div>
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-400 text-center text-sm">
                      {pillar.description}
                    </p>

                    {/* Step Number */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-20"
          >
            <motion.a
              href="#registration"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-lg rounded-xl text-white border border-white/20 hover:border-white/40 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Your Journey
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default DiveIn;