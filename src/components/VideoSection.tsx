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
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('Failed to load video');
        if (retryCount < maxRetries) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 2000 * (retryCount + 1)); // Exponential backoff
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
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
    return (
      <div className="relative py-8">
        <SectionTitle
          title="Video"
          gradient="from-pink-500 via-purple-500 to-blue-500"
        />
        <div className="relative aspect-video max-w-5xl mx-auto">
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-8">
      <SectionTitle
        title={videoData?.title || 'Video'}
        gradient="from-pink-500 via-purple-500 to-blue-500"
      />
      <div className="relative aspect-video max-w-5xl mx-auto">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center">
              <p className="text-white text-lg font-medium mb-4">{error}</p>
              {retryCount < maxRetries && (
                <p className="text-white/70 text-sm">Retrying automatically...</p>
              )}
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-lg shadow-xl"
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
              src={videoData?.videoUrl} 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};


export default VideoSection;
