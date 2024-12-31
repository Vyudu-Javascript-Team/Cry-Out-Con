import React from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = '' }): JSX.Element => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`transition-opacity duration-300 ${className}`}
    />
  );
};

export default LazyImage;