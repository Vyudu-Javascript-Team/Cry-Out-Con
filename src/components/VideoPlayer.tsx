import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Maximize2, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  type: 'youtube' | 'vimeo' | 'direct';
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, type }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | HTMLIFrameElement>(null);

  const getEmbedUrl = (url: string, type: string) => {
    switch (type) {
      case 'youtube':
        const youtubeId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
        return `https://www.youtube.com/embed/${youtubeId}?autoplay=0&mute=1&enablejsapi=1`;
      case 'vimeo':
        const vimeoId = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/)?.[1];
        return `https://player.vimeo.com/video/${vimeoId}?autoplay=0&muted=1`;
      default:
        return url;
    }
  };

  // Add intersection observer to handle scroll-based autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;

          if (entry.isIntersecting) {
            // Video is in view - play
            if (type === "direct") {
              const video = videoRef.current as HTMLVideoElement;
              video.play().catch(error => {
                console.log("Autoplay failed:", error);
              });
            } else {
              const iframe = videoRef.current as HTMLIFrameElement;
              if (type === 'youtube') {
                iframe.contentWindow?.postMessage(
                  JSON.stringify({
                    event: 'command',
                    func: 'playVideo'
                  }),
                  '*'
                );
              } else if (type === 'vimeo') {
                iframe.contentWindow?.postMessage(
                  JSON.stringify({
                    method: 'play'
                  }),
                  '*'
                );
              }
            }
            setIsPlaying(true);
          } else {
            // Video is out of view - pause
            if (type === "direct") {
              const video = videoRef.current as HTMLVideoElement;
              video.pause();
            } else {
              const iframe = videoRef.current as HTMLIFrameElement;
              if (type === 'youtube') {
                iframe.contentWindow?.postMessage(
                  JSON.stringify({
                    event: 'command',
                    func: 'pauseVideo'
                  }),
                  '*'
                );
              } else if (type === 'vimeo') {
                iframe.contentWindow?.postMessage(
                  JSON.stringify({
                    method: 'pause'
                  }),
                  '*'
                );
              }
            }
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: 0.5, // 50% of video must be visible
        rootMargin: '-50px 0px' // Adds margin to top and bottom
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, [type]);
  

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (type === "direct"){
      const video = videoRef.current as HTMLVideoElement;
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }

      setIsPlaying(!isPlaying);
    } else {
      const iframe = videoRef.current as HTMLIFrameElement;
      if (type === 'youtube') {
        iframe.contentWindow?.postMessage(
          JSON.stringify({
            event: 'command',
            func: isPlaying ? 'pauseVideo' : 'playVideo'
          }),
          '*'
        );
      } else if (type === 'vimeo') {
        iframe.contentWindow?.postMessage(
          JSON.stringify({
            method: isPlaying ? 'pause' : 'play'
          }),
          '*'
        );
      }

      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return; 

    if (type === "direct"){
      const video = videoRef.current as HTMLVideoElement;
      video.muted = !video.muted;
      setIsMuted(!isMuted);
    } else {
      const iframe = videoRef.current as HTMLIFrameElement;
      if (type === 'youtube') {
        iframe.contentWindow?.postMessage(
          JSON.stringify({
            event: 'command',
            func: isMuted ? 'unMute' : 'mute'
          }),
          '*'
        );
      } else if (type === 'vimeo') {
        iframe.contentWindow?.postMessage(
          JSON.stringify({
            method: isMuted ? 'setVolume' : 'setVolume',
            value: isMuted ? '1' : '0'
          }),
          '*'
        );
      } 
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative aspect-video rounded-xl overflow-hidden bg-black/90 group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {type === "direct" ? (
        <video
        ref={videoRef as React.RefObject<HTMLVideoElement>}
        src={url}
        className="w-full h-full"
        muted={isMuted}
        playsInline
      />
      ) : (
        <iframe
        ref={videoRef as React.RefObject<HTMLIFrameElement>}
        src={getEmbedUrl(url, type)}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      )}
      

      {/* Controls overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </motion.button>

            <motion.button
              onClick={toggleMute}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </div>

          <motion.button
            onClick={toggleFullscreen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Maximize2 className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoPlayer;