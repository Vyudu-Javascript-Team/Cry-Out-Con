import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { News } from './components/News';
import { Partners } from './components/Partners';
import { Insights } from './components/Insights';
import DiveIn from './components/DiveIn';
import EmpowermentResources from './components/ExhibitorInfo';
import Registration from './components/Registration';
import Hotels from './components/Hotels';
import Footer from './components/Footer';
import { FluidCanvas } from './components/FluidCanvas';
import VideoSection from './components/VideoSection';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingNav from './components/FloatingNav';
import LiveChat from './components/LiveChat';
import Keynotes from './components/Keynotes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HotelDetails from './components/HotelDetails';
import AllSpeakers from './components/AllSpeakers';

function Home() {
  const { scrollYProgress } = useScroll();
  
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [1, 0.8, 0.6]
  );

  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.2],
    [1, 0.95]
  );

  return (
    <div className="relative min-h-screen bg-primary text-white overflow-x-hidden">
      <FluidCanvas />
      
      <motion.div 
        className="fixed inset-0 bg-gradient-to-b from-transparent to-primary/40 pointer-events-none"
        style={{ opacity: backgroundOpacity }}
      />
      
      <FloatingNav />
      <LiveChat />
      
      <motion.div 
        className="relative pt-16"
        style={{ scale: contentScale }}
      >
        <div id="hero"><Hero /></div>
        <div id="dive-in"><DiveIn /></div>
        <div id="video"><VideoSection /></div>
        <div id="keynotes"><Keynotes /></div>
        <div id="registration"><Registration /></div>
        <div id="exhibitor-info"><EmpowermentResources /></div>
        <div id="hotels"><Hotels /></div>
        <div id="insights"><Insights /></div>
        <div id="news"><News /></div>
        <div id="partners"><Partners /></div>
        
      </motion.div>
    </div>
  );
}

function App(){
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-primary text-white overflow-x-hidden">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotel-details" element={<HotelDetails />} />
          <Route path="/speakers" element={<AllSpeakers />} />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;