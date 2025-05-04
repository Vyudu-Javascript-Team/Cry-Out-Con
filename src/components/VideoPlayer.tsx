import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [url]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-full group"
    >
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-cover"
        controls
        autoPlay
        preload="auto"
        muted={isMuted}
        playsInline
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2">
          <motion.button
            className="text-white"
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </motion.button>
          <motion.div className="flex items-center">
            <motion.button
              className="text-white"
              onClick={toggleMute}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoPlayer;

  // Try to play video as soon as it's loaded
  useEffect(() => {
    if (type === 'direct' && videoRef.current) {
      const video = videoRef.current as HTMLVideoElement;
      video.load(); // Force reload with new URL
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video started playing successfully');
            setIsPlaying(true);
          })
          .catch(error => {
            console.error('Error attempting to play video:', error);
            setIsPlaying(false);
          });
      }
    }
  }, [url, type]);

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
              const playPromise = video.play();
              
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    setIsPlaying(true);
                  })
                  .catch(error => {
                    console.error('Error attempting to play video:', error);
                    setIsPlaying(false);
                  });
              }
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
              if (!video.paused) {
                video.pause();
                setIsPlaying(false);
              }
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

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-full object-cover"
    >
      {type === 'direct' ? (
        <motion.video
          ref={videoRef as React.RefObject<HTMLVideoElement>}
          src={url}
          className="w-full h-full object-cover"
          controls
          autoPlay
          preload="auto"
          muted={isMuted}
          playsInline
          crossOrigin="anonymous"
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
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoPlayer;