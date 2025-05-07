import { useRef, useEffect, useState } from "react";
import fallbackImage from "/assets/images/NYE_AD24.png";
import SectionTitle from "./SectionTitle";
import { getVideo } from "../lib/sanity";

interface VideoAsset {
  url: string;
  originalFilename: string;
  mimeType: string;
  size: number;
}

interface Video {
  _id: string;
  title: string;
  videoUrl: string;
  videoAsset: VideoAsset;
  isActive: boolean;
}

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoData, setVideoData] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
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
        
        // Test if the video URL is accessible
        const response = await fetch(data.videoUrl, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error('Video URL is not accessible');
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

  if (!videoData && !error) {
    console.log('No video data yet, showing loading state');
    return (
      <div className="relative py-8 bg-gradient-to-b from-transparent to-purple-900/20">
        <SectionTitle
          title="Jackson Launch Hype Video"
          gradient="from-pink-500 via-purple-500 to-blue-500"
        />
        <div className="relative aspect-video max-w-5xl mx-auto px-4">
          <LoadingFallback title={`Loading video${retryCount > 0 ? ` (Attempt ${retryCount + 1}/${maxRetries})` : ''}...`} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-8 bg-gradient-to-b from-transparent to-purple-900/20">
      <SectionTitle
        title="Jackson Launch Hype Video"
        gradient="from-pink-500 via-purple-500 to-blue-500"
      />
      
      <div className="relative aspect-video max-w-5xl mx-auto px-4">
        <div className="relative rounded-lg overflow-hidden shadow-2xl bg-black/20">
          {error ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="text-center px-4">
                <p className="text-white text-lg font-medium px-4 py-2 bg-red-500/80 rounded mb-4">{error}</p>
                {retryCount < maxRetries && (
                  <p className="text-white/70 text-sm">Retrying automatically...</p>
                )}
              </div>
            </div>
          ) : isLoading ? (
            <LoadingFallback title={`Loading video${retryCount > 0 ? ` (Attempt ${retryCount + 1}/${maxRetries})` : ''}...`} />
          ) : videoData ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              preload="auto"
              playsInline
              poster={fallbackImage}
              onError={handleVideoError}
              onLoadedData={handleVideoLoad}
              onLoadStart={() => console.log('Video load started')}
              onProgress={() => console.log('Video loading progress')}
            >
              <source 
                src={videoData.videoUrl} 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const LoadingFallback = ({ title }: { title: string }) => (
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg">
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-white text-lg font-medium">
        Loading {title}...
      </p>
    </div>
  </div>
);

export default VideoSection;
