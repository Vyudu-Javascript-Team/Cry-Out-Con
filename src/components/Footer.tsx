import React from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Facebook, Instagram } from "lucide-react";
import SunrayEffect from "./SunrayEffect";
import { useNavigate } from "react-router-dom";
import logo from "../assets/cryoutcon.jpg";

const gradient = "from-blue-400 via-purple-500 to-pink-500";

const Footer: React.FC = () => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  return (
    <footer className="bg-primary py-8 relative">
      <SunrayEffect />

      <div className="max-w-8xl mx-auto px-8 text-xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-8">
          <motion.div
            onClick={() => navigate("/")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative md:ml-8 hover:cursor-pointer"
          >
            <motion.img
              src={logo}
              alt="Cry Out Conference Logo"
              className="h-full md:w-auto md:max-h-[40px] w-40 object-contain "
              style={{
                scale: useTransform(scrollY, [0, 100], [1.3, 1]),
              }}
            />
          </motion.div>
          <div className="flex space-x-4">
            <a href="https://form.jotform.com/243611671514048" target="_blank" className={`hover:text-transparent bg-clip-text bg-gradient-to-r ${gradient} transition-colors`}>
              Contact Us
            </a>
          </div>
          <div className="">
            <a
              href="https://lhhouston.church/"
              target="_blank"
              className={`hover:text-transparent bg-clip-text bg-gradient-to-r ${gradient} transition-colors`}
            >
              Lighthouse Church
            </a>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/cryoutexperience"
              target="_blank"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/cryoutexperience/"
              target="_blank"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
          
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">
              &copy; {new Date().getFullYear()} Cry Out Con. All rights
              reserved.
            </p>
            <div className="flex space-x-7 gap-5 mt-4 md:mt-0">
              <a
                href="https://cryoutexperience.com/refund-policy/"
                target="_blank"
                className={`text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r ${gradient} transition-colors`}
              >
                Refund Policy
              </a>
              <a
                href="https://cryoutexperience.com/faq/"
                target="_blank"
                className={`text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r ${gradient} transition-colors`}
              >
                FAQ's
              </a>
              <a
                href="https://cryoutexperience.com/privacy-policy/"
                target="_blank"
                className={`text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r ${gradient} transition-colors`}
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
