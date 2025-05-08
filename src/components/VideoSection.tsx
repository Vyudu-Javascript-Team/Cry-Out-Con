import { useRef, useEffect, useState } from "react";
import fallbackImage from "/assets/images/NYE_AD24.png";
import SectionTitle from "./SectionTitle";
import { getVideo } from "../lib/sanity";

interface VideoAsset {
  url: string;
  originalFilename: string;
  mimeType: string;
  size: number;
  playbackId?: string;
  status?: string;
}

interface Video {
  _id: string;
  title: string;
  videoUrl: string;
  hlsUrl: string;
  videoAsset: VideoAsset;
  isActive: boolean;
}

export const VideoSection = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoData, setVideoData] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const maxRetries = 3;

  useEffect(() => {
    let isMounted = true;
    let retryTimeout: NodeJS.Timeout;

    const fetchVideo = async () => {
      try {
        if (retryCount >= maxRetries) {
          throw new Error('Maximum retry attempts reached');
        }

        setIsLoading(true);
        setError(null);
        console.log(`Attempt ${retryCount + 1}: Starting video fetch...`);
        
        const data = await getVideo();
        
        if (!isMounted) return;

        console.log('Video data received:', data);
        if (!data) {
          throw new Error('No video data returned from Sanity');
        }
        
        if (!data.videoUrl) {
          throw new Error('No video URL available');
        }
        
        setVideoData(data);
        console.log('Video data set successfully');
        setRetryCount(0); // Reset retry count on success
      } catch (err) {
        console.error('Error loading video:', err);
        if (!isMounted) return;

        const errorMessage = err instanceof Error ? err.message : 'Failed to load video';
        setError(errorMessage);

        // Retry after a delay, increasing the delay with each retry
        if (retryCount < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, retryCount), 5000); // Exponential backoff, max 5 seconds
          console.log(`Retrying in ${delay}ms...`);
          retryTimeout = setTimeout(() => {
            if (isMounted) {
              setRetryCount(prev => prev + 1);
            }
          }, delay);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchVideo();

    return () => {
      isMounted = false;
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, [retryCount]);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const target = e.target as HTMLVideoElement;
    console.error('Video playback error:', {
      error: target.error,
      networkState: target.networkState,
      readyState: target.readyState,
      currentSrc: target.currentSrc
    });
    setError('Failed to play video. Please try again later.');
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setIsLoading(false);
    setError(null);
  };

  return (
    <div className="relative py-8 bg-gradient-to-b from-transparent to-purple-900/20">
      <SectionTitle
        title={videoData?.title || "Jackson Launch Hype Video"}
        gradient="from-pink-500 via-purple-500 to-blue-500"
      />
      <div className="relative aspect-video max-w-5xl mx-auto">
        {isLoading ? (
          <LoadingFallback title={`Loading video${retryCount > 0 ? ` (Attempt ${retryCount + 1}/${maxRetries})` : ''}`} />
        ) : error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
            <p className="text-xl mb-4">{error}</p>
            {retryCount < maxRetries && (
              <p className="text-sm opacity-75">Retrying...</p>
            )}
          </div>
        ) : videoData ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-lg shadow-xl"
            controls
            autoPlay
            playsInline
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
          >
            {/* HLS source for browsers that support it */}
            <source src={videoData.hlsUrl} type="application/x-mpegURL" />
            {/* Fallback to direct stream */}
            <source src={videoData.videoUrl} type={videoData.videoAsset.mimeType} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <img src={fallbackImage} alt="Video placeholder" className="w-full h-full object-cover" />
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
      <p className="text-white text-lg font-medium">
        {title}
      </p>
    </div>
  </div>
);
