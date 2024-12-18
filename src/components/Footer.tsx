import React from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Facebook, Instagram} from "lucide-react";
import SunrayEffect from "./SunrayEffect";
import { useNavigate } from "react-router-dom";
import logo from "../assets/cryout-logo.png";

const Footer: React.FC = () => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  return (
    <footer className="bg-primary pb-8 relative">
      <SunrayEffect />

      <div className="container max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
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
                className="md:h-full md:w-auto md:max-h-[40px] w-20 object-contain "
                style={{
                  scale: useTransform(scrollY, [0, 100], [1.3, 1]),
                }}
              />
            </motion.div>
            {/* <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Press
                </a>
              </li>
            </ul> */}
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Ministries</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="https://lhhouston.church/"
                  target="_blank"
                  className="hover:text-white transition-colors"
                >
                  Lighthouse Church
                </a>
              </li>
              <li>
                <a
                  href="#partners"
                  className="hover:text-white transition-colors"
                >
                  Sponsorship
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Venue Map
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Attendees</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="https://brushfire.com/tlhc/cryout25/578593"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Registration
                </a>
              </li>
              <li>
                <a
                  href="#hotels"
                  className="hover:text-white transition-colors"
                >
                  Hotels
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Schedule
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/cryoutexperience"
                target="_blank"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              {/* <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a> */}
              <a
                href="https://www.instagram.com/cryoutexperience/"
                target="_blank"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              {/* <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a> */}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} Cry Out Con. All rights
              reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="https://cryoutexperience.com/refund-policy/"
                target="_blank"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                Refund Policy
              </a>
              <a
                href="https://cryoutexperience.com/faq/"
                target="_blank"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                FAQ's
              </a>
              <a
                href="https://cryoutexperience.com/privacy-policy/"
                target="_blank"
                className="text-gray-300 hover:text-white text-sm transition-colors"
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
