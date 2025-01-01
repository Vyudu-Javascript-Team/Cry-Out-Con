import React from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, style, className = '' }): JSX.Element => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      style={style}
      className={`transition-opacity duration-300 ${className}`}
    />
  );
};

export default LazyImage;