import { useState } from "react";

interface AnimatedLogoProps {
  videoSrc: string;
  fallbackImageSrc: string;
  alt: string;
  className?: string;
}

export function AnimatedLogo({ 
  videoSrc, 
  fallbackImageSrc, 
  alt, 
  className 
}: AnimatedLogoProps) {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  // If video fails to load or there's an error, show fallback image
  if (videoError) {
    return (
      <img
        src={fallbackImageSrc}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <div className="relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        onError={handleVideoError}
        onLoadedData={handleVideoLoaded}
        className={`${className} ${!videoLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{ objectFit: 'contain' }}
      >
        <source src={videoSrc} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <img
          src={fallbackImageSrc}
          alt={alt}
          className={className}
        />
      </video>
      
      {/* Loading state - show static image while video loads */}
      {!videoLoaded && (
        <img
          src={fallbackImageSrc}
          alt={alt}
          className={`absolute inset-0 ${className}`}
        />
      )}
    </div>
  );
}
