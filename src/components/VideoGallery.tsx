import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

interface Video {
  id: string;
  title: string;
  url: string;
  type: 'youtube' | 'vimeo';
  thumbnail: string;
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Cry Out Con 2026 Highlights',
    url: 'https://www.youtube.com/watch?v=example1',
    type: 'youtube',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1920'
  },
  {
    id: '2',
    title: 'Worship Night Preview',
    url: 'https://vimeo.com/example2',
    type: 'vimeo',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1920'
  },
  {
    id: '3',
    title: 'Ministry Impact Stories',
    url: 'https://www.youtube.com/watch?v=example3',
    type: 'youtube',
    thumbnail: 'https://images.unsplash.com/photo-1519744346361-7a029b427a59?auto=format&fit=crop&q=80&w=1920'
  }
];

interface VideoGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ isOpen, onClose }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const previousVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-xl"
        >
          {/* Close button - Moved outside container for better accessibility */}
          <motion.button
            className="fixed top-8 right-8 p-4 rounded-full bg-black/50 hover:bg-black/70 transition-colors border border-white/20 z-[10000]"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-8 h-8 text-white" />
          </motion.button>

          <div className="container mx-auto px-4 relative mt-20">
            {/* Main video player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="aspect-video w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl"
            >
              <VideoPlayer
                url={videos[currentVideoIndex].url}
                type={videos[currentVideoIndex].type}
              />
            </motion.div>

            {/* Video title */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white text-center mt-6 mb-8"
            >
              {videos[currentVideoIndex].title}
            </motion.h3>

            {/* Navigation buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <motion.button
                className="p-4 rounded-full bg-black/50 hover:bg-black/70 transition-colors pointer-events-auto border border-white/20"
                onClick={previousVideo}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </motion.button>
              <motion.button
                className="p-4 rounded-full bg-black/50 hover:bg-black/70 transition-colors pointer-events-auto border border-white/20"
                onClick={nextVideo}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </motion.button>
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center gap-4 mt-8">
              {videos.map((video, index) => (
                <motion.button
                  key={video.id}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`relative rounded-lg overflow-hidden ${
                    currentVideoIndex === index ? 'ring-2 ring-white' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-32 h-20 object-cover"
                  />
                  <div className={`absolute inset-0 bg-black/50 ${
                    currentVideoIndex === index ? 'opacity-0' : 'opacity-50'
                  }`} />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoGallery;