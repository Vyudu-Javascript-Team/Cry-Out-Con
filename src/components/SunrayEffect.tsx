import React from 'react';
import { motion } from 'framer-motion';

const SunrayEffect = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-[26vh] pointer-events-none">
      {/* Main sun glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] aspect-square rounded-[50%]"
        style={{
          background: 'radial-gradient(circle at 50% 120%, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.1) 30%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated light rays */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150vw] h-[50vh] origin-bottom">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 left-1/2 h-full origin-bottom"
            style={{
              width: '2px',
              background: 'linear-gradient(to top, rgba(139, 92, 246, 0.3), transparent)',
              transform: `rotate(${(i * 30) - 165}deg)`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              height: ['80%', '90%', '80%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Pulsing core */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[40vw] aspect-square rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Additional glow layers */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full"
          style={{
            width: `${30 + i * 20}vw`,
            aspectRatio: '1',
            background: `radial-gradient(circle, rgba(139, 92, 246, ${0.2 - i * 0.05}) 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Particle effect */}
      <div className="absolute bottom-0 left-0 right-0 h-64">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SunrayEffect;