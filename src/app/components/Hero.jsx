'use client';

import { useEffect, useRef, useState } from 'react';

export default function VideoBackgroundPage() {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      // Add event listeners
      video.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
        setVideoLoaded(true);
      });
      
      video.addEventListener('error', (e) => {
        console.error('Video error:', e);
        setVideoError('Failed to load video');
      });

      // Try to play
      video.play().catch(error => {
        console.error("Video autoplay failed:", error);
        setVideoError(error.message);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source
          src="https://res.cloudinary.com/dxq0nrirt/video/upload/v1759836936/Chess-vid_dqazia.mp4"
          type="video/mp4"
        />
      </video>
      
      <div 
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"
        style={{ zIndex: 1 }}
      ></div>
      
      <div 
        className="relative flex items-center justify-center h-full"
        style={{ zIndex: 2 }}
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white px-4">
            Welcome to Digtel - Where Innovation Meets Excellence
          </h1>
          
          {/* Debug info */}
          {videoError && (
            <p className="text-red-500 mt-4">Error: {videoError}</p>
          )}
          {videoLoaded && (
            <p className="text-green-500 mt-4">Video loaded ✓</p>
          )}
        </div>
      </div>
    </div>
  );
}