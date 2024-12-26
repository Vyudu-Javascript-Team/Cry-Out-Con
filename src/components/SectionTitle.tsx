import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionTitleProps {
  title: React.ReactNode;
  subtitle?: string;
  gradient?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  gradient = "from-white via-white/80 to-white/60",
  className = "",
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 3D transform values
  const titleY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const titleRotateX = useTransform(scrollYProgress, [0, 0.5], [45, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // Perspective container style for 3D effect
  const perspective = {
    perspective: "1000px",
    transformStyle: "preserve-3d" as const,
  };

  const renderTitle = () => {
    if (typeof title === "string") {
      // Split title into characters for individual animation when it's a string
      const titleChars = title.split("");
      return (
        <h2 className="text-3xl md:text-7xl font-bold mb-6 flex justify-center flex-wrap">
          {titleChars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1}}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: i * 0.02,
              }}
              className={`inline-block bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h2>
      );
    }

    return (
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
        }}
        className="text-5xl md:text-7xl font-bold mb-6"
      >
        {title}
      </motion.h2>
    );
  };

  return (
    <motion.div
      ref={containerRef}
      style={perspective}
      className={`text-center mb-16 relative ${className}`}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
        style={{
          opacity: titleOpacity,
          scale: titleScale,
          filter: "blur(40px)",
          background: `radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)`,
        }}
      />

      {/* Title with 3D transform */}
      <motion.div
        style={{
          y: titleY,
          rotateX: titleRotateX,
          scale: titleScale,
          opacity: titleOpacity,
        }}
        className="relative"
      >
        {renderTitle()}

        {/* Subtitle with fade up effect */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Animated underline with glow */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "80px", opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.5,
            type: "spring",
            stiffness: 50,
          }}
          className="relative h-1 mx-auto mt-6"
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 blur-lg"
            style={{
              background: `linear-gradient(to right, ${gradient.split(" ")[1]}, ${gradient.split(" ")[gradient.split(" ").length - 1]})`,
            }}
          />
          {/* Main line */}
          <motion.div
            className={`h-full bg-gradient-to-r ${gradient} rounded-full relative z-10`}
          />
        </motion.div>
      </motion.div>

      {/* Decorative particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
};

export default SectionTitle;
