'use client';

import { useState, useEffect } from 'react';

export default function BrandExperience() {
  const [mounted, setMounted] = useState(false);
  const [activeIntlSlide, setActiveIntlSlide] = useState(0);
  const [activeLocalSlide, setActiveLocalSlide] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const internationalClients = [
    { name: 'FAM', flag: '🇩🇪' },
    { name: 'Power', flag: '🇩🇪' },
    { name: 'Green', flag: '🇩🇪' },
  ];

  const localClients = [
    { name: 'Dariq', flag: '🇦🇪' },
    { name: 'Union', flag: '🇦🇪' },
    { name: 'Emaar', flag: '🇦🇪' },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
            WE BUILD BRANDS, CREATE EXPERIENCES, &<br />
            FORGE LASTING CONNECTIONS
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div className="flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-light mb-12 tracking-wide">
              International Clients
            </h2>
            
            <div className="relative w-full max-w-md">
              <div className="flex justify-center items-center gap-8 mb-8 h-32">
                {internationalClients.map((client, idx) => (
                  <div
                    key={idx}
                    className={`transition-all duration-500 ${
                      idx === activeIntlSlide
                        ? 'opacity-100 scale-100'
                        : 'opacity-30 scale-75'
                    }`}
                  >
                    <div className="relative">
                      <div className="absolute -top-6 right-0 text-2xl">
                        {client.flag}
                      </div>
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white bg-opacity-10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-purple-400">
                          {client.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-2">
                {internationalClients.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIntlSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === activeIntlSlide
                        ? 'bg-white w-6'
                        : 'bg-white bg-opacity-30'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-light mb-12 tracking-wide">
              Local Clients
            </h2>
            
            <div className="relative w-full max-w-md">
              <div className="flex justify-center items-center gap-8 mb-8 h-32">
                {localClients.map((client, idx) => (
                  <div
                    key={idx}
                    className={`transition-all duration-500 ${
                      idx === activeLocalSlide
                        ? 'opacity-100 scale-100'
                        : 'opacity-30 scale-75'
                    }`}
                  >
                    <div className="relative">
                      <div className="absolute -top-6 right-0 text-2xl">
                        {client.flag}
                      </div>
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white bg-opacity-10 flex items-center justify-center">
                        <span className="text-lg font-bold text-blue-400">
                          {client.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-2">
                {localClients.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveLocalSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === activeLocalSlide
                        ? 'bg-white w-6'
                        : 'bg-white bg-opacity-30'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}