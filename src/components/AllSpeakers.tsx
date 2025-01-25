import { Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SpotlightEffect from "./SpotlightEffect";
import { Instagram, Globe } from "lucide-react";
import SectionTitle from "./SectionTitle";
import LazyImage from "./LazyImage";
import { getSpeakersGroupedByCategory } from "../lib/sanity";

export interface Speaker {
  _id: string;
  name: string;
  title?: string;
  company?: string;
  orderInCategory: number;
  isVisible: boolean;
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
}

type Category = {
  _id: string;
  title: string;
  displayOrder: number;
  isVisible: boolean;
  speakers: Speaker[];
};

const SpeakerCard = ({
  speaker,
  index,
}: {
  speaker: Speaker;
  index: number;
}) => (
  <motion.div
    key={speaker._id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
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
      <h3 className="text-lg font-bold mb-2">{speaker.name}</h3>
      <p className="text-gray-300 leading-none">
        {speaker.title}
      </p>
    </div>
  </motion.div>
);

const AllSpeakers = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const data = await getSpeakersGroupedByCategory();
        if (data) {
          setCategories(data.categories);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching speakers:", error);
      }
    };

    fetchSpeakers();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <SpotlightEffect sectionRef={sectionRef} color="blue" delay={0.1} />

      <div className="container relative max-w-6xl mx-auto px-4">
        {isLoading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          </div>
        ) : categories && categories.length > 0 ? (
          categories.map((category) => (
            <div key={category._id} className="mb-20 last:mb-0">
              <SectionTitle
                title={category.title}
                gradient="from-blue-400 via-purple-400 to-pink-400"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto">
                {category.speakers &&
                  category.speakers.map((speaker, index) => (
                    <SpeakerCard
                      key={speaker._id}
                      speaker={speaker}
                      index={index}
                    />
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <h2>No speakers found</h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllSpeakers;
