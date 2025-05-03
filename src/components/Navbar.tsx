import { useEffect } from "react";
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
import { getHeaderNavigation } from "../lib/sanity";

// Flag to control whether to use Sanity data or 2026 data
// Set to true to always use 2026 data, false to attempt to fetch from Sanity first
const use2026OfflineData = true;

interface HeaderNavigationData {
  logo: {
    asset: {
      url: string;
    };
    alt: string;
  };
  navigationLinks: {
    title: string;
    path: string;
    toSection: boolean;
    order: number;
  }[];
  navigationButtons: {
    title: string;
    url: string;
    order: number;
  }[];
}

// Default 2026 navigation data
const default2026Navigation: HeaderNavigationData = {
  logo: {
    asset: {
      url: logo,
    },
    alt: "CryOut Con 2026 Logo",
  },
  navigationLinks: [
    { title: "HOME", path: "", toSection: false, order: 1 },
    // { title: "KEYNOTES", path: "keynotes", toSection: true, order: 2 },
    { title: "REGISTRATION", path: "registration", toSection: true, order: 3 },
    // { title: "AGENDA", path: "agenda", toSection: true, order: 4 },
    // { title: "TRAVEL", path: "travel", toSection: false, order: 5 },
    { title: "FAQ", path: "faq", toSection: false, order: 6 },
  ],
  navigationButtons: [
    {
      title: "Register Now",
      url: "https://brushfire.com/tlhc/cryout26/604672/register",
      order: 1,
    },
  ],
};

export const Navbar = () => {
  const [headerNavigation, setHeaderNavigation] =
    useState<HeaderNavigationData | null>(null);

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

  useEffect(() => {
    const fetchHeaderNavigation = async () => {
      try {
        // If use2026OfflineData is true, skip Sanity fetch and use default data
        if (use2026OfflineData) {
          setHeaderNavigation(default2026Navigation);
          return;
        }

        // Otherwise try to fetch from Sanity
        const data = await getHeaderNavigation();

        if (data) {
          // Add "2026" to the first navigation button if it exists and is for registration
          if (data.navigationButtons && data.navigationButtons.length > 0) {
            const firstButton = data.navigationButtons[0];
            if (firstButton.title.includes("REGISTER")) {
              firstButton.title = "COMING SOON";
              firstButton.url = "#";
            }
          }
          setHeaderNavigation(data);
        } else {
          console.error("No header navigation available");
          // Use default 2026 navigation data if no data from Sanity
          setHeaderNavigation(default2026Navigation);
        }
      } catch (error) {
        console.error("Error fetching header navigation", error);
        // Use default 2026 navigation data on error
        setHeaderNavigation(default2026Navigation);
      }
    };

    fetchHeaderNavigation();
  }, []);

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

  // Use default navigation if headerNavigation is null
  const displayNavigation = headerNavigation || default2026Navigation;

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

  function renderNavigationLinks(
    navigation: HeaderNavigationData,
    isMobile: boolean = false
  ) {
    const { navigationLinks } = navigation;
    return (
      <>
        {/* Dynamic navigation links */}
        {navigationLinks.map((link) => {
          let classes =
            "hover:cursor-pointer hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-colors";

          if (isMobile) {
            classes += " text-lg";
          } else {
            classes += " text-primary whitespace-nowrap";
          }

          const title = link.title.trim().toUpperCase();
          const path = link.path.trim().toLowerCase();

          // Skip sponsors link if it exists in CMS to avoid duplication
          if (path === "sponsors") return null;

          let content = null;

          if (!link.toSection && isMobile) {
            content = (
              <NavLink to={`/${path}`} key={path}>
                {title}
              </NavLink>
            );
          } else if (!link.toSection && !isMobile) {
            content = (
              <NavLink to={`/${path}`} key={path}>
                <span className="whitespace-nowrap">{title}</span>
              </NavLink>
            );
          } else {
            content = (
              <a
                key={path}
                href={`/#${path}`}
                onClick={() => handleNavigation("/", `#${path}`)}
                className={classes}
              >
                {title}
              </a>
            );
          }

          return content;
        })}

        {/* Static Sponsors link at the end */}
        {/* <NavLink to="/sponsors" key="sponsors">
          <span className="whitespace-nowrap">SPONSORS</span>
        </NavLink> */}
      </>
    );
  }

  function renderNavigationButtons(
    navigation: HeaderNavigationData,
    isMobile: boolean = false
  ) {
    const { navigationButtons } = navigation;

    return (
      <>
        {navigationButtons.map((button) => {
          const title = button.title.trim().toUpperCase();
          const isComingSoon = title.includes("asdasd");

          return isMobile ? (
            <motion.a
              key={button.url}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: isComingSoon ? 1 : 1.05 }}
              whileTap={{ scale: isComingSoon ? 1 : 0.95 }}
              onClick={(e) => {
                if (isComingSoon) e.preventDefault();
                setIsMobileMenuOpen(false);
              }}
              className={`px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded font-semibold ${
                isComingSoon ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {title}
            </motion.a>
          ) : (
            <motion.a
              key={button.url}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: isComingSoon ? 1 : 1.05 }}
              whileTap={{ scale: isComingSoon ? 1 : 0.95 }}
              onClick={(e) => {
                if (isComingSoon) e.preventDefault();
              }}
              className={`md:px-4 md:py-2 px-3 py-1.5 text-sm md:text-base xl:text-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded font-semibold hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-white/25 ${
                isComingSoon ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {title}
            </motion.a>
          );
        })}
      </>
    );
  }

  const MobileMenu = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 bg-primary p-4 border-t border-white/10"
    >
      <div className="flex flex-col items-center space-y-6 py-4">
        {displayNavigation && renderNavigationLinks(displayNavigation, true)}
        {/* <NavLink to="#">Sponsors</NavLink> */}
        {displayNavigation && renderNavigationButtons(displayNavigation, true)}
      </div>
    </motion.div>
  );

  if (!displayNavigation) {
    return null;
  }

  return (
    displayNavigation && (
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
              src={displayNavigation.logo.asset.url}
              alt={displayNavigation.logo.alt}
              loading="lazy"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain"
            />
          </motion.a>

          <div className="hidden xl:flex items-center justify-center flex-grow px-4">
            <div className="flex items-center justify-center space-x-3 xl:space-x-6 2xl:space-x-8 text-sm xl:text-base 2xl:text-lg">
              {renderNavigationLinks(displayNavigation)}
            </div>
          </div>

          <div className="hidden xl:flex justify-end flex-shrink-0 ml-4">
            {renderNavigationButtons(displayNavigation)}
          </div>

          <button
            className="xl:hidden"
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

          <AnimatePresence>
            {isMobileMenuOpen && <MobileMenu />}
          </AnimatePresence>
        </nav>
      </motion.header>
    )
  );
};
