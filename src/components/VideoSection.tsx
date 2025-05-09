import { useRef, useEffect, useState } from "react";
import fallbackImage from "/assets/images/NYE_AD24.png";
import SectionTitle from "./SectionTitle";
import { getVideo } from "../lib/sanity";
import VideoPlayer from "./VideoPlayer";

interface Video {
  _id: string;
  title: string;
  videoUrl: string;
  videoAsset: {
    mimeType: string;
  };
}

export const VideoSection = (): JSX.Element => {
  const [videoData, setVideoData] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        setIsLoading(true);
        const data = await getVideo();
        setVideoData(data);
        setError(null);
      } catch (err) {
        console.error("Error loading video:", err);
        setError("Failed to load video");
      } finally {
        setIsLoading(false);
      }
    };

    loadVideo();
  }, []);

  return (
    <div className="relative py-8 bg-gradient-to-b from-transparent to-purple-900/20">
      <SectionTitle
        title={videoData?.title || "Jackson Launch Hype Video"}
        gradient="from-pink-500 via-purple-500 to-blue-500"
      />
      <div className="relative aspect-video max-w-5xl mx-auto">
        {isLoading ? (
          <LoadingFallback title="Loading video..." />
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
            <p className="text-xl">{error}</p>
          </div>
        ) : videoData ? (
          <VideoPlayer url={videoData.videoUrl} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <img
              src={fallbackImage}
              alt="Video placeholder"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const LoadingFallback = ({ title }: { title: string }) => (
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg">
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-white text-lg font-medium">{title}</p>
    </div>
  </div>
);
