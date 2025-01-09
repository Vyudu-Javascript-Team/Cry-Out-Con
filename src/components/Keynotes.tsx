import { Suspense, useRef } from "react";
import { motion } from "framer-motion";
import SpotlightEffect from "./SpotlightEffect";
import { Instagram, Globe } from "lucide-react";
import SectionTitle from "./SectionTitle";
import john from "/assets/images/JohnHannah.jpg";
import thomas from "/assets/images/thomas.png";
import keion from "/assets/images/PASTOR-KEION.png";
import { useNavigate } from "react-router-dom";
import LazyImage from "./LazyImage";

export const Keynotes = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  const speakers = [
    {
      name: "Pastor Keion Henderson",
      title: "Founder and CEO, The Lighthouse Church",
      image: keion,
      instagram: "https://www.instagram.com/pastorkeion/",
      website: "https://keionhenderson.com/about-us/",
    },
    {
      name: "Eric Thomas",
      title: "Pastor",
      image: thomas,
      instagram:
        "https://www.instagram.com/etthehiphoppreacher?igsh=MTVwbW43am85dHFs",
      website: "https://ericthomas.com/",
    },
    {
      name: "Pastor John F. Hannah",
      title: "Sr. Pastor, New Life Covenant Church Southeast",
      image: john,
      instagram: "https://www.instagram.com/pastorhannah",
      website: "",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-8 overflow-hidden">
      <SpotlightEffect sectionRef={sectionRef} color="blue" delay={0.2} />

      <div className="container mx-auto px-4 relative">
        <SectionTitle
          title="KEYNOTE SPEAKERS"
          subtitle="Meet our distinguished speakers"
          gradient="from-blue-400 via-purple-400 to-pink-400"
        />

        {/* Keynote speakers grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
          {speakers.map((speaker) => (
            <div
              key={speaker.name}
              className="relative group overflow-hidden rounded-xl aspect-[3/4] max-w-[300px] mx-auto"
            >
              <Suspense
                fallback={
                  <div className="absolute inset-0 w-full h-full bg-gray-900 animate-pulse" />
                }
              >
                <LazyImage
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </Suspense>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />

              {/* Social Icons */}
              <div className="absolute top-3 right-4 flex gap-2 opacity-100">
                <motion.a
                  href={speaker.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 backdrop-blur-sm rounded-full bg-purple-500/50 transition-colors duration-300 group/icon"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-5 h-5 text-white group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                </motion.a>
                <motion.a
                  href={speaker.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 backdrop-blur-sm rounded-full bg-purple-500/50 transition-colors duration-300 group/icon"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe className="w-5 h-5 text-white group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                </motion.a>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold mb-2">{speaker.name}</h3>
                <p className="text-gray-300 leading-none">{speaker.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <motion.a
            onClick={() => navigate("/speakers")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded text-white font-semibold hover:cursor-pointer hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Speakers & Musical Guests
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Keynotes;
