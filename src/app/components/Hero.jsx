'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover brightness-[0.4] contrast-[1.2]"
        >
          <source
            src="https://res.cloudinary.com/dugtxybef/video/upload/v1759137398/Untitled-video-Made-with-Clipchamp-1-1_kl0i5e.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Heavy Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

        {/* Horizontal Spotlight Beam - Single Focused Wave */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main Horizontal Light Beam */}
          <div 
            className="absolute top-1/2 left-0 right-0 h-[200px] -translate-y-1/2"
            style={{
              background: 'radial-gradient(ellipse 600px 150px at var(--beam-x) 50%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.1) 60%, transparent 100%)',
              animation: 'beamMove 12s ease-in-out infinite',
              filter: 'blur(30px)',
            }}
          />
          
          {/* Bright Core Beam */}
          <div 
            className="absolute top-1/2 left-0 right-0 h-[120px] -translate-y-1/2"
            style={{
              background: 'radial-gradient(ellipse 400px 100px at var(--beam-x) 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 25%, rgba(255,255,255,0.2) 50%, transparent 100%)',
              animation: 'beamMove 12s ease-in-out infinite',
              filter: 'blur(15px)',
            }}
          />

          {/* Soft Outer Glow */}
          <div 
            className="absolute top-1/2 left-0 right-0 h-[300px] -translate-y-1/2"
            style={{
              background: 'radial-gradient(ellipse 800px 200px at var(--beam-x) 50%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 35%, rgba(255,255,255,0.05) 60%, transparent 100%)',
              animation: 'beamMove 12s ease-in-out infinite',
              filter: 'blur(50px)',
            }}
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center min-h-screen">
          {/* Main Hero Text - Exact Match to Image */}
          <h1 className="text-[clamp(2.5rem,11vw,9rem)] font-[100] tracking-[0.15em] leading-[0.95] text-white/80 uppercase select-none">
            <span className="block opacity-0 animate-[fadeInUp_1.2s_ease-out_0.3s_forwards]" style={{ fontWeight: 100 }}>
              YOUR REAL
            </span>
            <span className="block opacity-0 animate-[fadeInUp_1.2s_ease-out_0.5s_forwards] mt-2 md:mt-4" style={{ fontWeight: 100 }}>
              PARTNER IN
            </span>
            <span className="block opacity-0 animate-[fadeInUp_1.2s_ease-out_0.7s_forwards] mt-2 md:mt-4" style={{ fontWeight: 100 }}>
              SUCCESS
            </span>
          </h1>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-[scrollBounce_2.5s_ease-in-out_infinite]">
        <div className="w-[22px] h-[38px] border-[1.5px] border-white/20 rounded-full flex items-start justify-center pt-2">
          <div className="w-[3px] h-[8px] bg-white/30 rounded-full animate-[scrollDot_2s_ease-in-out_infinite]"></div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @property --beam-x {
          syntax: '<percentage>';
          inherits: false;
          initial-value: 0%;
        }

        @keyframes beamMove {
          0% {
            --beam-x: 0%;
          }
          50% {
            --beam-x: 100%;
          }
          100% {
            --beam-x: 0%;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes scrollBounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateX(-50%) translateY(10px);
            opacity: 1;
          }
        }

        @keyframes scrollDot {
          0% {
            transform: translateY(0);
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(18px);
            opacity: 0;
          }
        }

        /* Font smoothing for thin text */
        h1 {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: clamp(2rem, 13vw, 4.5rem);
            letter-spacing: 0.1em;
            line-height: 1.1;
          }
        }
      `}</style>
    </section>
  );
}