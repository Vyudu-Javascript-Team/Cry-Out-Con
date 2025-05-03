import { useState, useRef, lazy, useEffect, Suspense } from "react";
const VideoPlayer = lazy(() => import("./VideoPlayer"));
import fallbackImage from "/assets/images/NYE_AD24.png";
import SectionTitle from "./SectionTitle";
import { getVideo } from "../lib/sanity";

// ! Flag to control whether to use Sanity data or 2026 data
// ! Set to true to always use 2026 data, false to attempt to fetch from Sanity first
const use2026OfflineData = true;

interface VideoData {
  _id: string;
  title: string;
  videoUrl: string;
  isActive: boolean;
}

// Default placeholder data for 2026 video
const placeholder2026Video = {
  _id: "placeholder-2026-video",
  title: "CryOut Con 2026 Hype Video",
  videoUrl: "",
  isActive: true,
};

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        setLoading(true);

        // If use2026OfflineData is true, skip Sanity fetch and use default data
        if (use2026OfflineData) {
          setVideoData(placeholder2026Video);
          setLoading(false);
          return;
        }

        // Otherwise try to fetch from Sanity
        const data = await getVideo();
        if (data && data.isActive) {
          setVideoData(data);
        } else {
          // Use placeholder data if no video from Sanity or video is not active
          setVideoData(placeholder2026Video);
        }
      } catch (err) {
        console.error("Error loading video:", err);
        // Use placeholder data on error
        setVideoData(placeholder2026Video);
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, []);

  // Display placeholder for 2026 video
  const showPlaceholder =
    !videoData?.videoUrl || videoData._id === placeholder2026Video._id;

  return (
    <div ref={sectionRef} className="relative py-8">
      <SectionTitle
        title={videoData?.title || "CryOut Con 2026 Hype Video"}
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
          <VideoPlayer url={"/assets/videos/2026-hype.mp4"} type="direct" />
        </Suspense>
      </div>
    </div>
  );
};

export default VideoSection;
