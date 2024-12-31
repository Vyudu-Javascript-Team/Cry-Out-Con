import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

const Featured = () => {
  const [showMore, setShowMore] = useState(false);

  const featuredContent = [
    {
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      title: "Future of AI in Technology",
      description: "Explore how artificial intelligence is reshaping the technology landscape and transforming industries through innovative solutions and breakthrough developments.",
      date: "March 15, 2024",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      title: "Innovation in Gaming",
      description: "Discover the latest breakthroughs in gaming technology, from advanced graphics processing to immersive virtual reality experiences.",
      date: "March 14, 2024",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      title: "Smart Home Revolution",
      description: "The future of connected living and IoT technologies that are making homes smarter, more efficient, and more responsive to our needs.",
      date: "March 13, 2024",
      gradient: "from-pink-500 to-red-500"
    }
  ];

  const additionalContent = [
    {
      image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a",
      title: "Quantum Computing Breakthroughs",
      description: "The latest developments in quantum computing and its implications for cryptography, drug discovery, and complex system modeling.",
      date: "March 12, 2024",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      image: "https://images.unsplash.com/photo-1526666923127-b2970f64b422",
      title: "Cybersecurity Trends",
      description: "Protecting the future: emerging cybersecurity challenges and solutions in an increasingly connected world.",
      date: "March 11, 2024",
      gradient: "from-green-500 to-teal-500"
    },
    {
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      title: "Space Tech Innovation",
      description: "How space technology is advancing human exploration and bringing new possibilities for communication and observation.",
      date: "March 10, 2024",
      gradient: "from-purple-500 to-indigo-500"
    }
  ];

  const displayedContent = showMore 
    ? [...featuredContent, ...additionalContent]
    : featuredContent;

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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary" />
      
      {/* Animated background elements */}
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

      <div className="container mx-auto px-4 relative">
        <SectionTitle 
          title="Featured Content"
          subtitle="Stay updated with the latest tech trends and innovations shaping our future"
          gradient="from-purple-400 via-pink-400 to-blue-400"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayedContent.map((item, index) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <motion.div 
                className="absolute -inset-1 rounded-2xl bg-gradient-to-r opacity-50 blur-xl transition-all duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(to right, ${item.gradient})`
                }}
              />
              
              <motion.div 
                className="relative bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="h-48 overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-sm text-purple-400">{item.date}</span>
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
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button 
            onClick={() => setShowMore(!showMore)}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showMore ? 'Show Less' : 'View All Content'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Featured;