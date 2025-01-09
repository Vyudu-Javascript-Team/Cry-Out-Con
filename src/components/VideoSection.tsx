import { useState, useRef, lazy, useEffect, Suspense } from "react";
import { useInView } from "framer-motion";
const VideoPlayer = lazy(() => import("./VideoPlayer"));
import introVideo from "/assets/videos/0622 - CRYOUT 2025 REVEAL REV_1.mp4";
import fallbackImage from '/assets/images/NYE_AD24.png';
import SectionTitle from "./SectionTitle";

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const isInView = useInView(sectionRef, { margin: "-100px", once: true });

  useEffect(() => {
    if (isInView) {
      setShouldLoadVideo(true);
    }
  }, [isInView]);

  return (
    <div
      ref={sectionRef}
      className="w-full py-16 relative"
    >
      <SectionTitle
          title="ARE YOU READY TO GO ALL IN?"
          gradient="from-pink-500 via-purple-500 to-blue-500"
        />
      
        
          <div className="relative aspect-video">
            <Suspense
               fallback={
                <div className="relative">
                  <img
                    src={fallbackImage}
                    alt="AI logo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <span className="text-white">Loading video...</span>
                  </div>
                </div>
              }
            >
              {shouldLoadVideo && (
                <VideoPlayer url={introVideo} type="direct" />
              )}
            </Suspense>
          </div>
    </div>
  );
};

export default VideoSection;
