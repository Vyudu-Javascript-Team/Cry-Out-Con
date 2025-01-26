import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Facebook, Instagram } from "lucide-react";
import SunrayEffect from "./SunrayEffect";
import { useNavigate } from "react-router-dom";
import { getFooterContent } from "../lib/sanity";

const gradient = "from-blue-400 via-purple-500 to-pink-500";

interface FooterData {
  logo: {
    asset: {
      url: string;
    };
    alt: string;
  };
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
  navigationLinks: {
    title: string;
    url: string;
    order: number;
  }[];
  copyright: string;
}

const Footer: React.FC = () => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  const [footerDetails, setFooterDetails] = useState<FooterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const scaleTransform = useTransform(scrollY, [0, 100], [1.3, 1]);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const data = await getFooterContent();

        if (data) {
          setFooterDetails(data);
        } else {
          console.error("No footer details available");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching footer details:", error);
      }
    };

    fetchFooter();
  }, []);

  if (isLoading || !footerDetails) return <div>Loading...</div>;

  const sortedNavLinks = footerDetails ? [...footerDetails.navigationLinks].sort(
    (a, b) => a.order - b.order
  ) : [];

  // Helper function to render social media icons
  const getSocialIcon = (icon: string) => {
    switch (icon.toLowerCase()) {
      case "facebook":
        return <Facebook className="w-6 h-6" />;
      case "instagram":
        return <Instagram className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-primary py-8 relative">
      <SunrayEffect />

      <div className="max-w-8xl mx-auto px-8 md:text-xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-8">
          <motion.a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative md:ml-8 hover:cursor-pointer"
          >
            <motion.img
              src={footerDetails.logo.asset.url}
              alt={footerDetails.logo.alt}
              className="h-full md:w-auto md:max-h-[40px] w-40 object-contain"
              style={{ scale: scaleTransform }}
            />
          </motion.a>

          <div className="flex space-x-2">
            {footerDetails.socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 rounded-full bg-purple-500/50 p-2 transition-colors hover:bg-purple-500"
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>

          <div className="lg:flex lg:space-x-7 md:text-2xl">
            {sortedNavLinks.map((link, index) => (
              <div key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r ${gradient} transition-colors`}
                >
                  {link.title}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row text-sm md:text-xl justify-center items-center">
            <p className="text-gray-300">
              &copy; {new Date().getFullYear()} {footerDetails.copyright}
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
