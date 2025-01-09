import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const LazyImage = ({ src, alt, className, style }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  
  // Generate paths for optimized and blur versions
  const ext = src.substring(src.lastIndexOf('.'));
  const optimizedSrc = src.replace(ext, `-optimized${ext}`);
  const blurSrc = src.replace(ext, `-blur${ext}`);

  return (
    <div className={`relative ${className}`} style={style}>
      {/* Blur placeholder */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${blurSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
          transform: 'scale(1.1)',
          opacity: loaded ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      {/* Main image */}
      <img
        src={optimizedSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default LazyImage;