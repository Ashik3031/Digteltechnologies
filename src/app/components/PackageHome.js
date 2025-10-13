'use client';
import React, { useEffect, useRef, useState } from 'react';

const PlatinumPackage = () => {
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.3) % 360);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const services = [
    { label: 'Paid Ads', angle: 0 },
    { label: 'Visual\nIdentity', angle: 51.4 },
    { label: 'Website', angle: 102.8 },
    { label: 'Data\nAnalysis', angle: 154.2 },
    { label: 'Social Media\nManagement', angle: 205.6 },
    { label: 'Photography', angle: 257 },
    { label: 'Montage', angle: 308.4 }
  ];

  const radius = 280;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="relative w-full max-w-4xl aspect-square flex items-center justify-center">
          {/* Center Text */}
          <div className="absolute z-20 text-center">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light tracking-wide">
              Platinum
            </h1>
            <h2 className="text-white text-5xl md:text-5xl lg:text-5xl font-light tracking-wide mt-2">
              Management
            </h2>
            <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mt-2">
              Package
            </h3>
          </div>

          {/* Rotating Services */}
          {services.map((service, index) => {
            const currentAngle = (rotation + service.angle) * (Math.PI / 180);
            const x = Math.cos(currentAngle) * radius;
            const y = Math.sin(currentAngle) * radius;

            return (
              <div
                key={index}
                className="absolute transition-all duration-100"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-75px',
                  marginTop: '-75px'
                }}
              >
                <div className="w-36 h-36 rounded-full border border-gray-500 border-opacity-60 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center hover:border-white hover:border-opacity-80 hover:scale-110 transition-all duration-300 cursor-pointer">
                  <span className="text-white text-sm font-light text-center px-4 whitespace-pre-line leading-relaxed">
                    {service.label}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Connecting Lines (Optional Enhancement) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {services.map((service, index) => {
              const angle = (service.angle) * (Math.PI / 180);
              const x = Math.cos(angle) * radius + 50;
              const y = Math.sin(angle) * radius + 50;
              
              return (
                <line
                  key={index}
                  x1="50%"
                  y1="50%"
                  x2={`${x}%`}
                  y2={`${y}%`}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PlatinumPackage;