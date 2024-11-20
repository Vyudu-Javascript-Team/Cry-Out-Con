import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SpotlightEffect from './SpotlightEffect';
import { Instagram, Globe } from 'lucide-react';
import SectionTitle from './SectionTitle';
import bishop from "../assets/images/bishop.png";
import latrice from "../assets/images/latrice.png";
import thomas from "../assets/images/thomas.png";
import keion from "../assets/images/PASTOR-KEION.png";

const GradientText = ({ children, className = "" }) => (
  <motion.span
    className={`bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-white bg-[length:200%_auto] ${className}`}
    animate={{
      backgroundPosition: ["0%", "200%"],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    {children}
  </motion.span>
);

const AnimatedLetter = ({ letter, index }) => (
  <motion.span
    className="inline-block"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.5,
      delay: index * 0.05,
      type: "spring",
      stiffness: 100,
    }}
  >
    {letter}
  </motion.span>
);

export const Keynotes = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const speakers = [
    {
      name: "Pastor Keion Henderson",
      title: "Founder and CEO, The Lighthouse Church",
      image: keion,
      instagram: "https://www.instagram.com/pastorkeion/",
      website: "https://keionhenderson.com/about-us/"
    },
    {
      name: "Dr. Eric Thomas",
      image: thomas,
      instagram: "https://www.instagram.com/etthehiphoppreacher?igsh=MTVwbW43am85dHFs",
      website: "https://ericthomas.com/"
    },
    {
      name: "Evangelist Latrice Ryan", 
      image: latrice,
      instagram: "https://www.instagram.com/latriceryan?igsh=bXV5Njd3eXRueGZ6",
      website: "https://latrice-ryan-ministries-82cd.mykajabi.com/KSI22"
    },
    {
      name: "Bishop Kevin Wallace",   
      image: bishop,
      instagram: "https://www.instagram.com/bishopkevinwallace?igsh=MTFrc3R3ODI2ZHg5MA==",
      website: "https://www.kevinwallace.tv/"
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <SpotlightEffect sectionRef={sectionRef} color="blue" delay={0.2} />
      
      <div className="container mx-auto px-4 relative">
        <SectionTitle 
          title="Keynotes Speakers"
          subtitle="Meet our distinguished speakers"
          gradient="from-blue-400 via-purple-400 to-pink-400"
        />

        {/* Keynote speakers grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <motion.div
                className="relative overflow-hidden rounded-xl aspect-[3/4] max-w-[300px] mx-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                
                {/* Social Icons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.a
                    href={speaker.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-purple-500/50 transition-colors duration-300 group/icon"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Instagram className="w-5 h-5 text-white group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                  </motion.a>
                  <motion.a
                    href={speaker.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-purple-500/50 transition-colors duration-300 group/icon"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Globe className="w-5 h-5 text-white group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                  </motion.a>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold mb-2">{speaker.name}</h3>
                  <p className="text-gray-300">{speaker.title}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Keynotes;