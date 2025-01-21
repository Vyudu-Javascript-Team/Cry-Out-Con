import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import logo from "/assets/logos/CRY_OUT_CON_LOGO-21.png";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoading } from "./contexts/LoadingContext";

export const Navbar = () => {
  const { scrollY } = useScroll();
  const { setLoading } = useLoading();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const headerHeight = useTransform(scrollY, [0, 100], ["4rem", "4rem"]);

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(8px)"]
  );

  const handleNavigation = (path: string, hash: string) => {
    setLoading(true);
    setIsMobileMenuOpen(false);

    // If we're already on the home page
    if (location.pathname === "/") {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setLoading(false);
      return;
    }

    // If we're on a different page
    navigate(path);
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setLoading(false);
    }, 1000);
  };

  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

  const NavLink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => {
    const gradient = "from-blue-400 via-purple-500 to-pink-500";
    const isActive = location.pathname === to;

    return (
      <div className="relative">
        <motion.a
          onClick={() => {
            navigate(to);
            setIsMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`md:text-primary text-white hover:cursor-pointer hover:text-transparent bg-clip-text bg-gradient-to-r ${gradient} transition-colors whitespace-nowrap`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>

        {isActive && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.2,
              type: "spring",
              stiffness: 50,
            }}
            className="relative h-1 mx-auto mt-2"
          >
            <motion.div
              className="absolute inset-0 blur-lg"
              style={{
                background: `linear-gradient(to right, #60a5fa, #db2777)`,
              }}
            />
            <motion.div
              className={`h-full bg-gradient-to-r ${gradient} rounded-full relative z-10`}
            />
          </motion.div>
        )}
      </div>
    );
  };

  const MobileMenu = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 bg-primary p-4 border-t border-white/10"
    >
      <div className="flex flex-col items-center space-y-6 py-4">
        <a
          href="/#conference"
          onClick={() => handleNavigation("/", "#conference")}
          className="text-lg hover:cursor-pointer hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-colors"
        >
          EXPERIENCES
        </a>
        <NavLink to="/speakers">SPEAKERS & MUSICAL GUESTS</NavLink>
        <a
          onClick={() => handleNavigation("/", "#agenda")}
          className="text-lg hover:cursor-pointer hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-colors"
        >
          SCHEDULE
        </a>
        <NavLink to="/hotel-details">ACCOMMODATIONS</NavLink>
        {/* <NavLink to="#">Sponsors</NavLink> */}

        <motion.a
          href="https://brushfire.com/tlhc/cryout25/578593"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsMobileMenuOpen(false);
          }}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded font-semibold"
        >
          REGISTER NOW
        </motion.a>
      </div>
    </motion.div>
  );

  return (
    <motion.header
      style={{
        height: headerHeight,
        backdropFilter: backdropBlur,
        borderBottom: `1px solid rgba(255, 255, 255, ${borderOpacity.get()})`,
      }}
      className="fixed top-0 left-0 right-0 bg-white z-[9999] will-change-transform font-sans"
    >
      <nav className="flex items-center w-full max-w-[2000px] mx-auto justify-between px-4 sm:px-6 md:px-8 lg:px-12 h-full">
        <motion.a
          href="/"
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0 hover:cursor-pointer"
        >
          <motion.img
            src={logo}
            alt="Cry Out Conference Logo"
            loading="lazy"
            className="h-12 sm:h-16 md:h-20 w-auto object-contain"
          />
        </motion.a>

        <div className="hidden lg:flex items-center justify-center flex-grow px-4">
          <div className="flex items-center justify-center space-x-3 xl:space-x-6 2xl:space-x-8 text-sm xl:text-base 2xl:text-lg">
            <a
              onClick={() => handleNavigation("/", "#conference")}
              className="hover:cursor-pointer hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-colors whitespace-nowrap"
            >
              EXPERIENCES
            </a>
            <NavLink to="/speakers">
              <span className="whitespace-nowrap">SPEAKERS & MUSICAL GUESTS</span>
            </NavLink>
            <a
              onClick={() => handleNavigation("/", "#agenda")}
              className="hover:cursor-pointer hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-colors whitespace-nowrap"
            >
              SCHEDULE
            </a>
            <NavLink to="/hotel-details">
              <span className="whitespace-nowrap">ACCOMMODATIONS</span>
            </NavLink>
          </div>
        </div>

        <div className="hidden lg:flex justify-end flex-shrink-0 ml-4">
          <motion.a
            href="https://brushfire.com/tlhc/cryout25/578593"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:px-4 md:py-2 md:text-xl px-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded font-semibold hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-white/25"
          >
            REGISTER NOW
          </motion.a>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            ></path>
          </svg>
        </button>

        <AnimatePresence>{isMobileMenuOpen && <MobileMenu />}</AnimatePresence>
      </nav>
    </motion.header>
  );
};
