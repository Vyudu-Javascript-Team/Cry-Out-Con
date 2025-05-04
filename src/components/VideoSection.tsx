import { useRef, Suspense } from "react";
import fallbackImage from "/assets/images/NYE_AD24.png";
import SectionTitle from "./SectionTitle";

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} className="relative py-8">
      <SectionTitle
        title={"CryOut Con 2026 Hype Video"}
        gradient="from-pink-500 via-purple-500 to-blue-500"
      />

      <div className="relative aspect-video max-w-5xl mx-auto">
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
          <video
            className="w-full h-full object-cover"
            controls
            autoPlay
            preload="auto"
            muted
            playsInline
          >
            <source src="/assets/videos/2026-hype.mp4" type="video/mp4" />
          </video>
        </Suspense>
      </div>
    </div>
  );
};

export default VideoSection;
