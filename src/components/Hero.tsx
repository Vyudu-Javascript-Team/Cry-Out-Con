import { useState, useRef, useEffect } from "react";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Countdown from "./Countdown";
import LazyImage from "./LazyImage";
import { getHeroContent } from "../lib/sanity";

// Flag to control whether to use Sanity data or 2026 data
// Set to true to always use 2026 data, false to attempt to fetch from Sanity first
const use2026OfflineData = true;

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
  isVisible: boolean;
}

// Default 2026 event data to use while loading or if Sanity data isn't available
const default2026Data: HeroData = {
  _id: 'default-2026',
  description: "Join us for CryOut Con 2026 as we explore our theme of Collaboration – \"Help Is On the Way\". Connect with fellow believers, engage with inspiring speakers, and experience powerful worship in this life-changing gathering.",
  eventDate: {
    startDate: '2026-04-23T00:00:00Z',
    endDate: '2026-04-25T00:00:00Z'
  },
  venue: {
    name: 'Mississippi Coliseum',
    city: 'Jackson',
    state: 'Mississippi'
  },
  backgroundImage: '', // Will use existing image if no new one is provided
  backgroundImageAlt: 'CryOut Con 2026 - Help Is On the Way',
  registrationButton: {
    text: 'Registration Coming Soon',
    url: '#'
  },
  isVisible: true
};

export const Hero = () => {
  const containerRef = useRef(null);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHeroContent = async () => {
      try {
        // If use2026OfflineData is true, skip Sanity fetch and use default data
        if (use2026OfflineData) {
          setHeroData(default2026Data);
          setIsLoading(false);
          return;
        }

        // Otherwise try to fetch from Sanity
        const data = await getHeroContent();
        if (data) {
          setHeroData(data);
        } else {
          // Use default 2026 data if no data from Sanity
          setHeroData(default2026Data);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading hero content:", err);
        // Use default 2026 data on error
        setHeroData(default2026Data);
        setIsLoading(false);
      }
    };

    loadHeroContent();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
      </div>
    );
  }

  // If no hero data, use the default 2026 data
  const displayData = heroData || default2026Data;

  const handleRegistration = () => {
    if (displayData?.registrationButton.url && displayData.registrationButton.url !== '#') {
      window.open(displayData.registrationButton.url, "_blank");
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col md:block"
    >
      {displayData && (
        <div className="">
          <div className="h-[50vh] md:h-screen w-full relative">
          {displayData.backgroundImage && (
            <LazyImage
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
              src={displayData.backgroundImage}
              alt={displayData.backgroundImageAlt}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          )}
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
                {new Date(displayData.eventDate.startDate).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                  }
                )}{" "}
                -{" "}
                {new Date(displayData.eventDate.endDate).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </div>
              <div className="flex items-center text-sm space-x-2 px-1">
                <MapPin className="w-8 h-8" />
                <div className="flex flex-col">
                  <p>{displayData.venue.name}</p>
                  <p>
                    {displayData.venue.city}, {displayData.venue.state}
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
                  {displayData.description}
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
                {displayData.registrationButton.text}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </div>
      )}

    </section>
  );
};
