import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  style, 
  priority = false,
  sizes = '100vw',
  quality = 75
}: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [connection, setConnection] = useState<string>('4g');
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '50px 0px'
  });

  useEffect(() => {
    // Check network conditions
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      setConnection(conn.effectiveType);

      const updateConnectionStatus = () => {
        setConnection(conn.effectiveType);
      };

      conn.addEventListener('change', updateConnectionStatus);
      return () => conn.removeEventListener('change', updateConnectionStatus);
    }
  }, []);

  const getImagePath = (imagePath: string, suffix: string) => {
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const lastSlashIndex = cleanPath.lastIndexOf('/');
    const directory = lastSlashIndex !== -1 ? cleanPath.substring(0, lastSlashIndex) : '';
    const fileName = lastSlashIndex !== -1 ? cleanPath.substring(lastSlashIndex + 1) : cleanPath;
    const ext = fileName.substring(fileName.lastIndexOf('.'));
    const baseNameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
    const nameWithoutHash = baseNameWithoutExt.split('-')[0];
    
    return directory 
      ? `/${directory}/${nameWithoutHash}${suffix}${ext}`
      : `/${nameWithoutHash}${suffix}${ext}`;
  };

  // Determine image quality based on network conditions
  const networkQuality = {
    'slow-2g': 40,
    '2g': 50,
    '3g': 65,
    '4g': quality
  }[connection] || quality;

  // Get paths for optimized and blur versions with network-aware quality
  const optimizedSrc = src.startsWith('http') 
    ? `${src}?q=${networkQuality}&auto=format,compress${priority ? '&priority=true' : ''}` 
    : getImagePath(src, '-optimized');
  
  const blurSrc = src.startsWith('http')
    ? `${src}?q=10&blur=20&auto=format` 
    : getImagePath(src, '-blur');

  return (
    <div ref={!priority ? ref : undefined} className={className} style={style}>
      {(inView || priority) && (
        <>
          <img
            src={blurSrc}
            alt={alt}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scale(1.1)',
              opacity: loaded ? 0 : 1,
              transition: 'opacity 0.3s ease-in-out'
            }}
          />
          <img
            src={optimizedSrc}
            alt={alt}
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
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
        </>
      )}
    </div>
  );
};

export default LazyImage;
