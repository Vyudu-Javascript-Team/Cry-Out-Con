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
      } catch (error) {
        console.error("Error fetching footer details:", error);
      }
    };

    fetchFooter();
  }, []);

  const sortedNavLinks = footerDetails ? [...footerDetails.navigationLinks].sort(
    (a, b) => a.order - b.order
  ) : [];

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

  // Helper function to check if a URL is internal
  const isInternalLink = (url: string) => {
    return url.startsWith('/') || url === 'policy' || url === 'faq';
  };

  // Helper function to handle navigation
  const handleNavigation = (e: React.MouseEvent, url: string) => {
    if (isInternalLink(url)) {
      e.preventDefault();
      const path = url.startsWith('/') ? url : `/${url}`;
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary py-8 relative mt-20">
      <SunrayEffect />

      {footerDetails && (
      <div className="max-w-8xl mx-auto px-8 md:text-xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 mb-8">
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

          <div className="flex justify-center items-center space-x-4 mx-auto md:mx-0">
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
                  onClick={(e) => handleNavigation(e, link.url)}
                  target={isInternalLink(link.url) ? undefined : "_blank"}
                  rel={isInternalLink(link.url) ? undefined : "noopener noreferrer"}
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
            </p>
          </div>
        </div>
      </div>
      )}
    </footer>
  );
};

export default Footer;
