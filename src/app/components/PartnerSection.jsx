'use client';

import { useEffect, useRef } from 'react';

export default function PartnerSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let connections = [];

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = Math.random() * canvas.offsetHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.offsetWidth) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.offsetHeight) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 150, 255, 0.6)';
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100, 150, 255, ${0.2 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden py-20 lg:py-0">
      {/* Content Container */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8 lg:space-y-10 max-w-2xl order-1">
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-[100] tracking-[0.08em] leading-[1.3] text-white/85 uppercase">
              <span className="block opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
                YOUR PARTNER IN DIGITAL
              </span>
              <span className="block opacity-0 animate-[fadeInUp_1s_ease-out_0.3s_forwards]">
                GROWTH, INTEGRATED MA
              </span>
              <span className="block opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
                RKETING SERVICES, MEASU
              </span>
              <span className="block opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
                RABLE RESULTS, AND LASTI
              </span>
              <span className="block opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
                NG IMPACT.
              </span>
            </h2>

            <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">
              <button className="px-8 py-3.5 bg-transparent border border-white/20 text-white/70 text-sm tracking-[0.1em] uppercase font-[200] hover:bg-white/5 hover:border-white/30 transition-all duration-300 rounded-sm">
                BECOME PARTNER
              </button>
            </div>
          </div>

          {/* Right Content - Animated Tech Visualization */}
          <div className="relative flex justify-center lg:justify-end items-center order-2">
            <div className="relative w-full h-[500px] lg:h-[600px] max-w-[600px]">
              {/* Canvas for particle network */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-0 animate-[fadeIn_1.5s_ease-out_0.5s_forwards]"
              />

              {/* Glowing orb in center */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 animate-[fadeIn_2s_ease-out_0.8s_forwards]">
                <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
                  {/* Core glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/40 to-purple-600/40 blur-2xl animate-[pulse_3s_ease-in-out_infinite]"></div>
                  
                  {/* Middle ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-[spin_20s_linear_infinite]"></div>
                  
                  {/* Outer ring */}
                  <div className="absolute inset-[-20px] rounded-full border border-blue-300/20 animate-[spin_30s_linear_infinite_reverse]"></div>
                  
                  {/* Center core */}
                  <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-[0_0_30px_rgba(100,150,255,0.5)]"></div>
                </div>
              </div>

              {/* Floating tech elements */}
              <div className="absolute top-[10%] right-[10%] opacity-0 animate-[fadeInFloat_2s_ease-out_1s_forwards]">
                <div className="w-16 h-16 border border-blue-400/30 rounded-lg backdrop-blur-sm bg-blue-500/5 flex items-center justify-center animate-[float_4s_ease-in-out_infinite]">
                  <div className="w-8 h-8 border-2 border-blue-400/50 rounded-sm"></div>
                </div>
              </div>

              <div className="absolute bottom-[15%] left-[5%] opacity-0 animate-[fadeInFloat_2s_ease-out_1.2s_forwards]">
                <div className="w-12 h-12 border border-purple-400/30 rounded-full backdrop-blur-sm bg-purple-500/5 animate-[float_5s_ease-in-out_infinite_0.5s]"></div>
              </div>

              <div className="absolute top-[25%] left-[15%] opacity-0 animate-[fadeInFloat_2s_ease-out_1.4s_forwards]">
                <div className="w-10 h-10 border border-blue-300/30 backdrop-blur-sm bg-blue-400/5 animate-[float_4.5s_ease-in-out_infinite_1s]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-purple-950/10 pointer-events-none"></div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInFloat {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        h2 {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        @media (max-width: 1024px) {
          h2 {
            font-size: clamp(1.5rem, 5vw, 2.25rem);
            letter-spacing: 0.06em;
          }
        }
      `}</style>
    </section>
  );
}