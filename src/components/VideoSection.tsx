import { useRef, Suspense } from "react";
import fallbackImage from "/assets/images/NYE_AD24.png";
import SectionTitle from "./SectionTitle";

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoUrl = "/assets/videos/Jackson Launch Hype.mp4";

  return (
    <div ref={sectionRef} className="relative py-8">
      <SectionTitle
        title={"Jackson Launch Hype Video"}
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
            className="w-full h-full object-cover rounded-lg shadow-xl"
            controls
            autoPlay
            preload="auto"
            muted
            playsInline
            poster={fallbackImage}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Suspense>
      </div>
    </div>
  );
};

export default VideoSection;
