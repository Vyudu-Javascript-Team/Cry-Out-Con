import { useState, useRef, useEffect } from "react";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import VideoGallery from "./VideoGallery";
import Countdown from "./Countdown";
import LazyImage from "./LazyImage";
import { getHeroContent } from "../lib/sanity";

interface HeroData {
  _id: string;
  description: string;
  eventDate: {
    startDate: string;
    endDate: string;
  };
  venue: {
    name: string;
    city: string;
    state: string;
  };
  backgroundImage: string;
  backgroundImageAlt: string;
  registrationButton: {
    text: string;
    url: string;
  };
}

export const Hero = () => {
  const containerRef = useRef(null);
  const [isVideoGalleryOpen, setIsVideoGalleryOpen] = useState(false);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHeroContent = async () => {
      try {
        const data = await getHeroContent();
        if (data) {
          setHeroData(data);
        }
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load hero content");
        console.error("Error loading hero content:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadHeroContent();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
      </div>
    ); 
  }

  const handleRegistration = () => {
    if (heroData?.registrationButton.url) {
      window.open(heroData.registrationButton.url, "_blank");
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col md:block"
    >
      <div className="h-[50vh] md:h-screen w-full relative">
        <LazyImage
          src={heroData.backgroundImage}
          alt={heroData.backgroundImageAlt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <div className="w-full mx-auto max-w-md md:top-[30%] md:transform px-4 py-8 md:absolute md:left-10 md:rounded-xl md:py-10 space-y-4 p-8 bg-fuchsia-500/30 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex md:flex-row flex-col md:space-x-2 items-start md:items-center gap-3 text-white/90"
        >
          <div className="flex items-center text-sm space-x-2 px-1">
            <Calendar className="w-8 h-8" />
            {new Date(heroData.eventDate.startDate).toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
              }
            )}{" "}
            -{" "}
            {new Date(heroData.eventDate.endDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="flex items-center text-sm space-x-2 px-1">
            <MapPin className="w-8 h-8" />
            <div className="flex flex-col">
              <p>{heroData.venue.name}</p>
              <p>
                {heroData.venue.city}, {heroData.venue.state}
              </p>
            </div>
          </div>
        </motion.div>

        <div>
          <Countdown />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col space-y-4">
            <p className="text-lg leading-normal text-gray-300 max-w-2xl my-1">
              {heroData.description}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={handleRegistration}
            type="button"
            className="bg-white relative md:text-2xl z-20 text-primary px-8 py-4 text-xl font-semibold transition-all rounded shadow-lg hover:cursor-pointer hover:shadow-white/25 flex items-center gap-2 group"
          >
            {heroData.registrationButton.text}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      <VideoGallery
        isOpen={isVideoGalleryOpen}
        onClose={() => setIsVideoGalleryOpen(false)}
      />
    </section>
  );
};
