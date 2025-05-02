import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { News } from "./components/News";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import { FluidCanvas } from "./components/FluidCanvas";
import VideoSection from "./components/VideoSection";
import { motion, useScroll, useTransform } from "framer-motion";
import Keynotes from "./components/Keynotes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AllSpeakers from "./components/AllSpeakers";
import Newsletter from "./components/Newsletter";
import Agenda from "./components/Agenda";
import Conference from "./components/Conference";
import DiveIn from "./components/DiveIn";
import Hotels from "./components/hotels";
import { useEffect, useState } from "react";
import Countdown from "./components/Countdown";
import { ArrowRight } from "lucide-react";
import Sponsors from "./pages/Sponsors";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";

function Home() {
  const { scrollYProgress } = useScroll();

  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [1, 0.8, 0.6]
  );

  const handleRegistration = () => {
    window.open(
      "#", // Updated to placeholder since 2026 registration isn't available yet
      "_blank"
    );
  };

  return (
    <div className="relative min-h-screen bg-primary text-white overflow-x-hidden">
      <FluidCanvas />

      <motion.div
        className="fixed inset-0 bg-gradient-to-b from-transparent to-primary/40 pointer-events-none"
        style={{ opacity: backgroundOpacity }}
      />

      <motion.div className="relative pt-16">
        <div id="hero">
          <Hero />
        </div>
        <div id="video">
          <VideoSection />
        </div>
        <div className="w-full min-h-[20vh] md:flex gap-9 items-center justify-center py-16 px-8 text-3xl bg-fuchsia-500/30 md:text-5xl lg:text-6xl font-bold">
          <Countdown />
          <button
            onClick={() => handleRegistration()}
            type="button"
            className="bg-white relative md:mt-0 mt-6 md:text-2xl z-20 text-primary px-4 py-4 text-xl font-semibold transition-all rounded shadow-lg hover:cursor-pointer hover:shadow-white/25 flex items-center gap-2 group opacity-75 cursor-not-allowed"
          >
            Registration Coming Soon
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <div id="dive">
          <DiveIn />
        </div>
        <div id="conference">
          <Conference />
        </div>
        {/* <div id="keynotes">
          <Keynotes />
        </div> */}
        <div id="registration">
          <Registration />
        </div>
        {/* <div id="agenda">
          <Agenda />
        </div>
        <div id="news">
          <News />
        </div> */}
        <div id="newsletter">
          <Newsletter />
        </div>
      </motion.div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-primary text-white overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/travel" element={<Hotels />} />
          <Route path="/speakers" element={<AllSpeakers />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
