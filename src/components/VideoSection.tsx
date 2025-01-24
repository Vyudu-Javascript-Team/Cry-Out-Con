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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const data = await getVideo();
        if(data){
          setVideoData(data);
        }
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load video content");
        console.error("Error loading video:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadVideo();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full pt-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full pt-16 text-center text-red-500">
        <SectionTitle
          title="Error Loading Content"
          gradient="from-pink-500 via-purple-500 to-blue-500"
        />
        {error}
      </div>
    );
  }

  if (!videoData) {
    return (
      <div className="w-full pt-16 text-center">
        <SectionTitle
          title="No Video Available"
          gradient="from-pink-500 via-purple-500 to-blue-500"
        />
      </div>
    );
  }


  return (
    <div ref={sectionRef} className="w-full pt-16 relative">
      <SectionTitle
        title={videoData?.title}
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
          {videoData && (
            <VideoPlayer url={videoData.videoUrl} type="direct" />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default VideoSection;
