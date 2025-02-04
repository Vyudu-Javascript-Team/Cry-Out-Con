import { useState, useRef, lazy, useEffect, Suspense } from "react";
const VideoPlayer = lazy(() => import("./VideoPlayer"));
import fallbackImage from "/assets/images/NYE_AD24.png";
import SectionTitle from "./SectionTitle";
import { getVideo } from "../lib/sanity";

interface VideoData {
  _id: string;
  title: string;
  videoUrl: string;
  isActive: boolean;
}

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [videoData, setVideoData] = useState<VideoData | null>(null);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const data = await getVideo();
        if(data){
          setVideoData(data);
        }
      } catch (err) {
        console.error("Error loading video:", err);
      } 
    };

    loadVideo();
  }, []);


  return (
    <div ref={sectionRef} className="w-full  relative">
      {/* <SectionTitle
        title={videoData?.title}
        gradient="from-pink-500 via-purple-500 to-blue-500"
      /> */}

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
          {videoData && (
            <VideoPlayer url={videoData.videoUrl} type="direct" />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default VideoSection;
