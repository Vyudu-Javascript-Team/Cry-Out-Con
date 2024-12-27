import { useState, useRef } from "react";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
// import AnimatedBackground from "./AnimatedBackground";
import VideoGallery from "./VideoGallery";
import Countdown from "./Countdown";
// import logo from "../assets/cryoutcon.jpg";
import background from "../assets/backgroundimages/6N7A3736.jpg";
import LazyImage from "./LazyImage";

export const Hero = () => {
  const containerRef = useRef(null);
  const [isVideoGalleryOpen, setIsVideoGalleryOpen] = useState(false);

  const handleRegistration = () => {
    window.open(
      "https://brushfire.com/tlhc/cryout25/578593/register",
      "_blank"
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col md:block"
    >
      <div className="h-[50vh] md:h-screen w-full relative">
        <LazyImage
          src={background}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <div className="w-full text-xl mx-auto max-w-3xl lg:top-[15%] md:top-[50%] px-4 py-8 md:absolute  md:left-0 md:h-full md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 max-w-xl p-8 rounded-lg bg-fuchsia-500/30 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-row items-center md:gap-3 text-white/90"
          >
            <div className="flex items-center space-x-2 px-2 py-3">
              <Calendar className="w-6 h-6" />
              <span>May 1 - 4, 2025</span>
            </div>
            <div className="flex items-center space-x-2 px-6 py-3">
              <MapPin className="w-6 h-6" />
              <div className="flex flex-col">
                <p>George R. Brown Convention Center</p>
                <p>Houston, Texas</p>
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
                Join a transformative journey of healing and spiritual growth
                through the power of surrender and connection with God.
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
              className="bg-white relative z-20 text-primary px-8 py-4 text-xl font-semibold transition-all shadow-lg hover:cursor-pointer hover:shadow-white/25 flex items-center gap-2 group"
            >
              Register Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      <VideoGallery
        isOpen={isVideoGalleryOpen}
        onClose={() => setIsVideoGalleryOpen(false)}
      />
    </section>
  );
};
