'use client';
import React, { useState, useEffect, useRef } from 'react';

// Particle Text Component
const ParticleText = ({
  text = "DIgtel",
  fontFamily = "900 180px Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  particleGap = 5,
  particleSize = [1.4, 2.2],
  spring = 0.08,
  friction = 0.85,
  hoverForce = 120,
  hoverRadius = 140,
  shatterPower = 16,
  shatterDuration = 1600,
  bg = "transparent",
  particleColor = "rgba(255,255,255,0.95)",
  linkLine = true,
  linkDistance = 24,
}) => {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, down: false });
  const shatteredRef = useRef(false);
  const reassembleTimeoutRef = useRef(null);

  const rand = (min, max) => Math.random() * (max - min) + min;

  const buildParticles = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const vw = canvas.clientWidth;
    const vh = canvas.clientHeight;
    canvas.width = vw;
    canvas.height = vh;

    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d");

    const targetWidth = Math.min(vw * 0.8, 1200);
    const baseFontSize = Math.max(80, Math.min(220, targetWidth / 4.5));
    off.width = Math.ceil(targetWidth);
    off.height = Math.ceil(baseFontSize * 1.6);
    offCtx.clearRect(0, 0, off.width, off.height);

    offCtx.fillStyle = "#fff";
    offCtx.font = fontFamily.replace(/\d+px/, `${baseFontSize}px`);
    offCtx.textBaseline = "middle";
    offCtx.textAlign = "center";

    const tx = off.width / 2;
    const ty = off.height / 2 + baseFontSize * 0.08;
    offCtx.fillText(text, tx, ty);

    const img = offCtx.getImageData(0, 0, off.width, off.height);
    const data = img.data;

    const points = [];
    for (let y = 0; y < off.height; y += particleGap) {
      for (let x = 0; x < off.width; x += particleGap) {
        const idx = (y * off.width + x) * 4;
        const alpha = data[idx + 3];
        if (alpha > 128) {
          points.push({ x, y });
        }
      }
    }

    const offsetX = (vw - off.width) / 2;
    const offsetY = (vh - off.height) / 2;

    const particles = points.map((p) => {
      return {
        x: rand(0, vw),
        y: rand(0, vh),
        vx: 0,
        vy: 0,
        tx: p.x + offsetX,
        ty: p.y + offsetY,
        r: rand(particleSize[0], particleSize[1]),
      };
    });

    particlesRef.current = particles;
  };

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let raf;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const { width: W, height: H } = canvas;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const parts = particlesRef.current;
      const mouse = mouseRef.current;

      if (linkLine) {
        ctx.lineWidth = 0.4;
        ctx.strokeStyle = "rgba(255,255,255,0.18)";
      }

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];

        if (!shatteredRef.current) {
          const ax = (p.tx - p.x) * spring;
          const ay = (p.ty - p.y) * spring;
          p.vx = (p.vx + ax) * friction;
          p.vy = (p.vy + ay) * friction;

          if (mouse.x != null) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const d2 = dx * dx + dy * dy;
            const r2 = hoverRadius * hoverRadius;
            if (d2 < r2) {
              const d = Math.sqrt(d2) || 1;
              const f = (1 - d / hoverRadius) * (hoverForce / 1000);
              p.vx += (dx / d) * f * 2.2;
              p.vy += (dy / d) * f * 2.2;
            }
          }
        } else {
          p.vx *= 0.985;
          p.vy = p.vy * 0.985 + 0.06;
        }

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        if (linkLine && i % 8 === 0) {
          for (let j = i + 1; j < parts.length; j += 8) {
            const q = parts[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < linkDistance * linkDistance) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        }
      }
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mounted, bg, particleColor, linkLine, linkDistance, spring, friction, hoverForce, hoverRadius]);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;

    const handleResize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      buildParticles();
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      shatteredRef.current = true;
      for (const p of particlesRef.current) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.hypot(dx, dy) || 1;
        const nx = dx / d;
        const ny = dy / d;
        const power = shatterPower * (1 + Math.random());
        p.vx = nx * power + (Math.random() - 0.5) * 2;
        p.vy = ny * power + (Math.random() - 0.5) * 2;
      }

      if (reassembleTimeoutRef.current) clearTimeout(reassembleTimeoutRef.current);
      reassembleTimeoutRef.current = setTimeout(() => {
        shatteredRef.current = false;
      }, shatterDuration);
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
      if (reassembleTimeoutRef.current) clearTimeout(reassembleTimeoutRef.current);
    };
  }, [text, fontFamily, particleGap, shatterPower, shatterDuration]);

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
};

const SplitSection = ({ 
  title, 
  buttonText, 
  buttonLink = "#",
  imageUrl, 
  imageAlt = "Section image",
  customContent = null,
  reverse = false,
  backgroundColor = "#000000"
}) => {
  return (
    <div 
      className="h-screen flex"
      style={{ backgroundColor }}
    >
      {/* Left Side - Text */}
      <div className={`w-1/2 flex flex-col justify-center ${reverse ? 'items-start pl-20 order-2' : 'items-end pr-20 order-1'}`}>
        <div className={`max-w-xl ${reverse ? 'text-left' : 'text-right'}`}>
          <h1 className="text-3xl text-gray-300 font-light mb-10 leading-relaxed tracking-wide">
            {title}
          </h1>
          <button 
            onClick={() => window.location.href = buttonLink}
            className="px-6 py-2.5 bg-gray-800 text-gray-400 uppercase text-xs tracking-widest hover:bg-gray-700 transition-all"
          >
            {buttonText}
          </button>
        </div>
      </div>

      {/* Right Side - Image or Custom Content */}
      <div className={`w-1/2 flex items-center justify-center ${reverse ? 'order-1' : 'order-2'}`}>
        {customContent ? (
          <div className="w-full h-full">
            {customContent}
          </div>
        ) : (
          <div className="w-[500px] h-[500px]">
            <img 
              src={imageUrl} 
              alt={imageAlt}
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <SplitSection
        title="YOUR PARTNER IN DIGITAL GROWTH. INTEGRATED MARKETING SERVICES, MEASURABLE RESULTS, AND LASTING IMPACT."
        buttonText="BECOME PARTNER"
        buttonLink="#partner"
        imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=1200&fit=crop"
        imageAlt="Digital growth visualization"
        backgroundColor="#0a0a0a"
      />

      <SplitSection
        title="INNOVATIVE SOLUTIONS THAT TRANSFORM YOUR BUSINESS. CUTTING-EDGE TECHNOLOGY, PROVEN STRATEGIES."
        buttonText="GET STARTED"
        buttonLink="#start"
        imageUrl="https://res.cloudinary.com/dxq0nrirt/image/upload/v1759820592/Layer-2-1_y4nv9l.webp"
        imageAlt="Innovation concept"
        reverse={true}
        backgroundColor="#0a0a0a"
      />

      <SplitSection
        title="INTERACTIVE EXCELLENCE. EXPERIENCE THE FUTURE OF DIGITAL DESIGN WITH CUTTING-EDGE PARTICLE EFFECTS."
        buttonText="EXPLORE MORE"
        buttonLink="#explore"
        customContent={
          <ParticleText 
            text="DIGTEL" 
            particleGap={4}
            bg="#0a0a0a"
            particleColor="rgba(156, 163, 175, 0.95)"
            linkLine={true}
            linkDistance={20}
          />
        }
        backgroundColor="#0a0a0a"
      />
    </div>
  );
}