import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import logo from "../assets/cryout_alt_logo_whiteback.png";

export const Navbar = () => {
  const { scrollY } = useScroll();

  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(15, 15, 42, 0)", "rgba(15, 15, 42, 0.98)"]
  );

  const headerHeight = useTransform(scrollY, [0, 100], ["5.5rem", "4rem"]);

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(16px)"]
  );

  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

  const scrollToRegistration = () => {
    const registrationSection = document.getElementById("registration");
    const navHeight = 80; // Height of the fixed navbar

    if (registrationSection) {
      const elementPosition = registrationSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      style={{
        backgroundColor: headerBackground,
        height: headerHeight,
        backdropFilter: backdropBlur,
        borderBottom: useTransform(
          borderOpacity,
          (opacity) => `1px solid rgba(255, 255, 255, ${opacity})`
        ),
      }}
      className="fixed top-0 left-0 right-0 z-[9999] will-change-transform"
    >
      <nav className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 relative group flex items-center gap-4"
          >
            <motion.img
              src={logo}
              alt="Cry Out Conference Logo"
              className="w-10 h-10 object-contain"
              style={{
                scale: useTransform(scrollY, [0, 100], [1.1, 1]),
              }}
            />
            <motion.span
              className="md:text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
              style={{
                scale: useTransform(scrollY, [0, 100], [1.1, 1]),
              }}
            >
              Cry Out Con 2025
            </motion.span>
            <motion.div
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
              style={{
                opacity: useTransform(scrollY, [0, 100], [0, 1]),
              }}
            />
          </motion.a>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToRegistration}
            className="md:px-6 md:py-2 px-2 py-1 bg-white text-primary rounded font-semibold hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-white/25"
          >
            Register Now
          </motion.button>
        </div>
      </nav>
    </motion.header>
  );
};
