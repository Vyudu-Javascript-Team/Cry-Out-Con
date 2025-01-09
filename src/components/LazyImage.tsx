import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const LazyImage = ({ src, alt, className, style }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  
  const getImagePath = (imagePath: string, suffix: string) => {
    // Remove any leading slash and handle Vite's asset URLs
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    
    // Extract the full path components
    const pathParts = cleanPath.split('/');
    const fileName = pathParts[pathParts.length - 1];
    const directory = pathParts.slice(0, -1).join('/');
    
    // Handle the file name and extension
    const ext = fileName.substring(fileName.lastIndexOf('.'));
    const baseNameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
    
    // Remove any Vite hash if present
    const nameWithoutHash = baseNameWithoutExt.split('-')[0];
    
    // Reconstruct the path maintaining the original directory structure
    return directory 
      ? `/${directory}/${nameWithoutHash}${suffix}${ext}`
      : `/${nameWithoutHash}${suffix}${ext}`;
  };

  const optimizedSrc = getImagePath(src, '-optimized');
  const blurSrc = getImagePath(src, '-blur');

  console.log({
    original: src,
    optimized: optimizedSrc,
    blur: blurSrc,
    directory: src.split('/').slice(0, -1).join('/')
  });

  return (
    <div className={`relative ${className}`} style={style}>
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
      <img
        src={optimizedSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          // Fallback to original image if optimized version fails to load
          const imgElement = e.target as HTMLImageElement;
          imgElement.src = src;
        }}
      />
    </div>
  );
};

export default LazyImage;
