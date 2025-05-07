import { useRef, Suspense } from "react";
import { useEffect, useState } from "react";
import fallbackImage from "/assets/images/NYE_AD24.png";
import SectionTitle from "./SectionTitle";
import { client } from "../lib/sanity";

interface VideoSource {
  url: string;
  width: number;
  height: number;
  quality: number;
}

interface Video {
  title: string;
  videoFile: {
    url: string;
    sources: VideoSource[];
  };
}

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [videoData, setVideoData] = useState<Video | null>(null);
  const [selectedSource, setSelectedSource] = useState<VideoSource | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const query = `*[_type == "video" && isActive == true][0] {
        title,
        "videoFile": videoFile.asset->{
          url,
          "sources": sources[]{
            url,
            width,
            height,
            quality
          }
        }
      }`;
      
      const data = await client.fetch(query);
      setVideoData(data);
      
      // Select the best quality based on network conditions
      if (data?.videoFile?.sources) {
        const connection = (navigator as any).connection || 
                         (navigator as any).mozConnection || 
                         (navigator as any).webkitConnection;
        
        let source;
        if (connection) {
          // If we have network information, choose quality based on connection type
          const speed = connection.downlink; // Mbps
          if (speed >= 10) {
            source = data.videoFile.sources.find((s: VideoSource) => s.width === 1920);
          } else if (speed >= 5) {
            source = data.videoFile.sources.find((s: VideoSource) => s.width === 1280);
          } else {
            source = data.videoFile.sources.find((s: VideoSource) => s.width === 854);
          }
        }
        
        // Fallback to highest quality if we can't determine network speed
        if (!source) {
          source = data.videoFile.sources[0];
        }
        
        setSelectedSource(source);
      }
    };
    
    fetchVideo();
  }, []);

  if (!videoData || !selectedSource) {
    return null;
  }

  return (
    <div ref={sectionRef} className="relative py-8">
      <SectionTitle
        title={videoData.title}
        gradient="from-pink-500 via-purple-500 to-blue-500"
      />
      <div className="relative aspect-video max-w-5xl mx-auto">
        <Suspense
          fallback={
            <div className="relative">
              <img
                src={fallbackImage}
                alt={videoData.title}
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
            <source src={selectedSource.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Suspense>
      </div>
    </div>
  );
};

export default VideoSection;
