import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import LazyImage from "./LazyImage";
import { getSliderImages } from "../lib/sanity";

interface NewsSlide {
  imageUrl: string;
  alt: string;
  order: number;
}

interface NewsData {
  title: string;
  slides: NewsSlide[];
}

export const News = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [images, setImages] = useState<NewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getSliderImages();
        if (data && data.slides && data.slides.length > 0) {
          setImages(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 1,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    if (!images?.slides.length) return;
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;

      if (nextIndex >= images.slides.length) {
        return 0;
      }
      if (nextIndex < 0) {
        return images.slides.length - 1;
      }
      return nextIndex;
    });
  };

  useEffect(() => {
    if (!images?.slides.length) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  if (isLoading) {
    return (
      <section className="relative h-[500px] w-screen overflow-hidden bg-gray-900">
        <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
        </div>
      </section>
    );
  }

  if (!images || !images.slides.length) {
    return (
      <section className="relative h-[500px] w-screen overflow-hidden bg-gray-900">
        <div className="flex items-center justify-center h-full">
          <p className="text-white">No news items available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[500px] w-screen overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${images.slides[currentIndex === 0 ? images.slides.length - 1 : currentIndex - 1].imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px) brightness(0.5)",
        }}
      />

      {/* Next Image (Blurred) */}
      <div
        className="absolute w-full h-full"
        style={{
          backgroundImage: `url(${images.slides[currentIndex === images.slides.length - 1 ? 0 : currentIndex + 1].imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px) brightness(0.5)",
        }}
      />

      <div className="relative h-full w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full flex justify-center"
          >
            <div
              className="w-full h-full relative"
            >
              <LazyImage
              src={images.slides[currentIndex].imageUrl}
              alt={`News ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/30"
              }`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
