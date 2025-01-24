import { Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SpotlightEffect from "./SpotlightEffect";
import { Instagram, Globe } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { useNavigate } from "react-router-dom";
import LazyImage from "./LazyImage";
import { getKeynoteSpeakers } from "../lib/sanity";

type Speaker = {
  _id: string;
  name: string;
  title?: string;
  company?: string;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  socialLinks?: {
    instagram?: string;
    website?: string;
  };
};

export const Keynotes = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const [keynotes, setKeynotes] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchKeynotes = async () => {
      try {
        
        const data = await getKeynoteSpeakers();

        if (data && data.speakers) {
          setKeynotes(data.speakers);
        }
      } catch (error) {
        console.error("Error fetching keynote speakers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKeynotes();
  }, []);

  if (isLoading) {
    return (
      <section className="relative py-8 overflow-hidden">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
      </section>
    );
  }

  if (keynotes.length === 0) {
    return null; 
  }

  

  return (
    <section ref={sectionRef} className="relative py-8 overflow-hidden">
      <SpotlightEffect sectionRef={sectionRef} color="blue" delay={0.2} />

      <div className="container mx-auto md:max-w-8xl px-4 relative">
        <SectionTitle
          title="KEYNOTE SPEAKERS"
          subtitle="Meet our distinguished speakers"
          gradient="from-blue-400 via-purple-400 to-pink-400"
        />

        {/* Keynote speakers grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
          {keynotes.map((speaker) => (
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
                  src={speaker.image?.asset.url || ""}
                  alt={speaker.image?.alt || speaker.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </Suspense>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />

              {/* Social Icons */}
              <div className="absolute top-3 right-4 flex gap-2 opacity-100">
              {speaker.socialLinks?.instagram && (
                <motion.a
                href={speaker.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 backdrop-blur-sm rounded-full bg-purple-500/50 transition-colors duration-300 group/icon"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-5 h-5 text-white group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                </motion.a>
              )}
                {speaker.socialLinks?.website && (
                <motion.a
                href={speaker.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 backdrop-blur-sm rounded-full bg-purple-500/50 transition-colors duration-300 group/icon"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe className="w-5 h-5 text-white group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                </motion.a>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold mb-2">{speaker.name}</h3>
                <p className="text-gray-300 leading-none">
                  {speaker.title}
                  {speaker.company && `, ${speaker.company}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <motion.a
            onClick={() => navigate("/speakers")}
            className="inline-flex items-center gap-2 md:text-xl px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded text-white font-semibold hover:cursor-pointer hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
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
