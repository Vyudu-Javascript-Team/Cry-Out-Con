import { useState, useRef } from "react";
import { Calendar, MapPin } from "lucide-react";
import { motion} from "framer-motion";
// import AnimatedBackground from "./AnimatedBackground";
import VideoGallery from "./VideoGallery";
import Countdown from "./Countdown";
// import logo from "../assets/cryoutcon.jpg";
import background from "../assets/backgroundimages/6N7A3736.jpg";

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
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      className="relative py-8 flex items-center justify-center overflow-hidden w-full"
    >
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 max-w-5xl mx-auto"
        >
          {/* <div className="flex justify-center">
            <img
              src={logo}
              alt="Cry Out Con Logo"
              className="w-[70%] object-contain"
            />
          </div> */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center gap-5  text-white/90"
          >
            <div className="flex items-center space-x-2 backdrop-blur-sm px-4 py-3">
              <Calendar className="w-6 h-6" />
              <span className="">May 1 - 4, 2025</span>
            </div>
            <div className="flex items-center space-x-2 backdrop-blur-sm px-6 py-3">
              <MapPin className="w-6 h-6" />
              <div className="flex flex-col md:items-center">
                <p>George R. Brown Convention Centre</p>
                <p>Houston, Texas</p>
              </div>
            </div>
          </motion.div>
          <div className="">
            <Countdown />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <div className="flex flex-col items-center space-y-4">
              <p className="text-lg leading-normal backdrop-blur-sm text-gray-300 max-w-2xl mx-auto my-1">
                Join a transformative journey of healing and spiritual growth
                through the power of surrender and connection with God.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <button
              onClick={handleRegistration}
              type="button"
              className="bg-white relative z-20 text-primary px-8 py-4 rounded-xl text-xl font-semibold transition-all shadow-lg hover:cursor-pointer hover:shadow-white/25"
            >
              Register Now
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
