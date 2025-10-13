'use client'; // Add this at the top if using App Router

import { useEffect, useRef } from 'react';

export default function VideoBackgroundPage() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/dxq0nrirt/video/upload/v1759836936/Chess-vid_dqazia.mp4"
          type="video/mp4"
        />
      </video>
      
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>
      
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-6xl font-bold text-white text-center px-4">
          Welcome to Digtel - Where Innovation Meets Excellence
        </h1>
      </div>
    </div>
  );
}