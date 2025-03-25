import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { FluidCanvas } from "../components/FluidCanvas";
import { Mail } from "lucide-react";
import LazyImage from "../components/LazyImage";
import { getSponsorPage } from "../lib/sanity";

interface SponsorPageData {
  title: string;
  description: string;
  email: {
    buttonTitle: string;
    to: string;
    cc?: string;
    subject: string;
  };
  image: {
    asset: {
      url: string;
    };
    alt: string;
  };
  bottom?: string;
  isVisible: Boolean;
}

export default function Sponsors() {
  const [sponsor, setSponsor] = useState<SponsorPageData | null>(null);

  useEffect(() => {
    const fetchSponsorData = async () => {
      try {
        const data = await getSponsorPage();

        if (data) {
          setSponsor(data);
        } else {
          console.error("No sponsor data found");
        }
      } catch (error) {
        console.error("Error fetching sponsor data", error);
      }
    };

    fetchSponsorData();
  }, []);

  const handleEmailClick = () => {
    const email = {
      to: sponsor?.email.to,      
      cc: sponsor?.email.cc,
      subject: sponsor?.email.subject,
    };
    const mailtoUrl = `mailto:${email.to}?cc=${email.cc}&subject=${encodeURIComponent(email.subject)}`;
    window.open(mailtoUrl, "_blank");
  };

  return (
    sponsor && (
      <div className="relative min-h-screen bg-primary text-white overflow-x-hidden">
        <div className="relative pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {sponsor.title}
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-300">
              {sponsor.description}
            </p>
            <button
              onClick={handleEmailClick}
              className="inline-flex items-center gap-2 bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Mail className="w-5 h-5" />
              {sponsor.email.buttonTitle}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-6xl mx-auto"
          >
            <div className="group aspect-[16/9] max-h-[70vh] relative overflow-hidden rounded-xl">
              {/* Plasma background effects */}
              <div
                className="absolute -inset-10 bg-gradient-radial from-fuchsia-400 via-fuchsia-600/80 to-transparent animate-plasma opacity-40"
                style={{ transform: "scale(2)" }}
              />
              <div
                className="absolute -inset-10 bg-gradient-conic from-purple-500 via-fuchsia-500 to-purple-500 animate-plasma-slow opacity-30"
                style={{ transform: "scale(1.8) rotate(45deg)" }}
              />

              {/* Main image container */}
              <motion.div
                className="relative w-full h-full rounded-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <LazyImage
                  src={sponsor.image.asset.url}
                  alt={sponsor.image.alt}
                  className="w-full h-full object-cover"
                />
                {/* Subtle overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-primary/50" />
              </motion.div>
            </div>
          </motion.div>

          {sponsor.bottom && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center text-xl mt-12"
            >
              {sponsor.bottom}
            </motion.p>
          )}
        </div>
      </div>
    )
  );
}
