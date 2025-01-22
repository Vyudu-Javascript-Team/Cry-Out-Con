import { Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SpotlightEffect from "./SpotlightEffect";
import { Instagram, Globe } from "lucide-react";
import SectionTitle from "./SectionTitle";
import LazyImage from "./LazyImage";
import { getAllSpeakers } from "../lib/sanity";

export interface Speaker {
  _id: string;
  name: string;
  title?: string;
  company?: string;
  category: "keynote" | "thought-leader" | "workshop" | "artist";
  bio?: string;
  featured: boolean;
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
        {speaker.company && `, ${speaker.company}`}
      </p>
    </div>
  </motion.div>
);

const AllSpeakers = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const allSpeakers = await getAllSpeakers();
        setSpeakers(allSpeakers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching speakers:", error);
      }
    };

    fetchSpeakers();
  }, []);

  // Filter speakers by category
  const keynoteSpeakers = speakers.filter(
    (speaker) => speaker.category === "keynote"
  );
  const thoughtLeaders = speakers.filter(
    (speaker) => speaker.category === "thought-leader"
  );
  const workshopLeaders = speakers.filter(
    (speaker) => speaker.category === "workshop"
  );
  const artists = speakers.filter((speaker) => speaker.category === "artist");

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <SpotlightEffect sectionRef={sectionRef} color="blue" delay={0.1} />

      <div className="container relative max-w-6xl mx-auto px-4">
        {/* Keynote Speakers */}
        {keynoteSpeakers.length > 0 && (
          <>
            <SectionTitle
              title="Keynote Speakers"
              gradient="from-blue-400 via-purple-400 to-pink-400"
            />

            {isLoading ? (
              <div className="text-center">
                <h2>Loading speakers...</h2>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto">
                {keynoteSpeakers.map((speaker, index) => (
                  <SpeakerCard
                    key={speaker._id}
                    speaker={speaker}
                    index={index}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* thought leaders */}
        {thoughtLeaders.length > 0 && (
          <div className="mt-20">
            <SectionTitle
              title="Thought Leaders & Speakers"
              gradient="from-purple-400 via-pink-400 to-red-400"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
              {thoughtLeaders.map((speaker: Speaker, index: number) => (
                <SpeakerCard
                  key={speaker._id}
                  speaker={speaker}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* workshop leaders */}
        {workshopLeaders.length > 0 && (
          <div className="mt-20">
            <SectionTitle
              title="Workshop Leaders"
              gradient="from-red-400 via-orange-400 to-yellow-400"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
              {workshopLeaders.map((speaker: Speaker, index: number) => (
                <SpeakerCard
                  key={speaker._id}
                  speaker={speaker}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* artists */}
        {artists.length > 0 && (
          <div className="mt-20">
            <SectionTitle
              title="Artists"
              gradient="from-yellow-400 via-green-400 to-blue-400"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
              {artists.map((speaker: Speaker, index: number) => (
                <SpeakerCard
                  key={speaker._id}
                  speaker={speaker}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllSpeakers;
