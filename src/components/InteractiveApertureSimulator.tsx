import React, { useState } from 'react';
import { Eye, Sparkles, Sliders, Info, Aperture } from 'lucide-react';
import { playDialClick } from '../utils/audioEffects';

export const InteractiveApertureSimulator: React.FC = () => {
  const [fStop, setFStop] = useState<number>(1.4);

  const stops = [
    { value: 1.2, label: 'f/1.2', dof: '1.2 cm', bokeh: 'Dreamy Creamy Swirl', genre: 'Haute Couture Portrait' },
    { value: 1.8, label: 'f/1.8', dof: '2.5 cm', bokeh: 'Soft Feathered Falloff', genre: 'Fine Jewelry & Editorial' },
    { value: 2.8, label: 'f/2.8', dof: '5.8 cm', bokeh: 'Cinematic Separation', genre: 'Fashion Runway & Commercial' },
    { value: 5.6, label: 'f/5.6', dof: '18.4 cm', bokeh: 'Gentle Tonal Background', genre: 'Environmental Portrait' },
    { value: 8.0, label: 'f/8.0', dof: '45.0 cm', bokeh: 'Subtle Background Blur', genre: 'Studio Monograph' },
    { value: 16.0, label: 'f/16', dof: 'Infinite', bokeh: 'Diffraction Starburst', genre: 'Architectural Monoliths' },
  ];

  const currentConfig = stops.reduce((prev, curr) => {
    return Math.abs(curr.value - fStop) < Math.abs(prev.value - fStop) ? curr : prev;
  });

  // Calculate aperture diameter for visual SVG iris
  // At f/1.2, iris radius is ~70px. At f/16, iris radius is ~14px.
  const irisRadius = Math.max(12, Math.round(76 / Math.sqrt(fStop)));
  const blurAmount = Math.max(0, (16 - fStop) * 0.9);

  return (
    <section id="optical-aperture-section" className="py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#050505] via-[#09090b] to-[#050505] border-t border-b border-amber-950/40 relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 mb-3">
            <Aperture className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span className="text-[10px] font-cinzel uppercase tracking-[0.25em] text-amber-300">
              Interactive Optical Laboratory
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white mb-3">
            The Physics of Golden Bokeh
          </h2>
          <p className="font-cormorant text-lg sm:text-xl text-amber-100/70 italic">
            Witness how our custom hand-ground gold-coated optics render light from razor-thin focal planes to deep monumental sharpness.
          </p>
        </div>

        {/* 2-Column Interactive Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Optical Iris Mechanism (SVG simulation) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 rounded-2xl bg-black/60 border border-amber-900/30 backdrop-blur-xl relative shadow-2xl">
            
            {/* Top Lens Engraving Bar */}
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-amber-400/80 mb-6 pb-3 border-b border-amber-900/40">
              <span>AARTIC LUX-PRIME · 50MM</span>
              <span className="text-white font-semibold">T-STOP 1:1.2</span>
              <span>GERMANY / JAPON</span>
            </div>

            {/* Circular Brass & Obsidian Lens Barrel with 8 Iris Blades */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-8 border-[#221a0c] bg-gradient-to-br from-[#121212] via-[#050505] to-[#1a1408] p-4 flex items-center justify-center shadow-inner shadow-black">
              
              {/* Gold outer knurled ring with tick marks */}
              <div className="absolute inset-2 rounded-full border border-amber-500/30 flex items-center justify-center pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    style={{ transform: `rotate(${i * 15}deg) translateY(-140px)` }}
                    className="absolute w-[1.5px] h-2.5 bg-amber-500/40"
                  />
                ))}
              </div>

              {/* Live Optical Iris SVG */}
              <svg className="w-48 h-48 sm:w-60 sm:h-60" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="bladeGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF2B8" />
                    <stop offset="50%" stopColor="#C29329" />
                    <stop offset="100%" stopColor="#7E5513" />
                  </linearGradient>
                </defs>

                {/* Aperture Housing Circle */}
                <circle cx="100" cy="100" r="90" fill="#070707" stroke="#3d2c0e" strokeWidth="3" />

                {/* 8 Mechanical Iris Blades that scale with fStop */}
                <g transform="translate(100, 100)">
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const bladeShift = (irisRadius / 76) * 45;
                    return (
                      <g
                        key={i}
                        transform={`rotate(${(i * 360) / 8}) translate(${bladeShift}, 0)`}
                        className="transition-transform duration-300 ease-out"
                      >
                        <path
                          d="M -20 -80 C 10 -40, 50 -10, 80 0 C 40 30, -10 60, -40 20 Z"
                          fill="url(#bladeGoldGrad)"
                          stroke="#151109"
                          strokeWidth="1.5"
                          opacity="0.95"
                        />
                      </g>
                    );
                  })}

                  {/* Central Aperture Hole (Photons Pass Through) */}
                  <circle
                    cx="0"
                    cy="0"
                    r={irisRadius}
                    fill="#020202"
                    stroke="#e5c158"
                    strokeWidth="1.5"
                    className="transition-all duration-300 ease-out"
                  />
                </g>
              </svg>

              {/* Specular Front Glass Glint */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-transparent via-amber-400/[0.04] to-amber-200/[0.12] pointer-events-none" />
            </div>

            {/* Slider Control */}
            <div className="w-full mt-8 space-y-3">
              <div className="flex items-center justify-between text-xs font-cinzel">
                <span className="text-zinc-400">Wide Open (f/1.2)</span>
                <span className="text-amber-300 font-bold text-base">f/{fStop.toFixed(1)}</span>
                <span className="text-zinc-400">Stopped Down (f/16)</span>
              </div>

              <input
                id="fstop-range-slider"
                type="range"
                min="1.2"
                max="16"
                step="0.1"
                value={fStop}
                onChange={(e) => {
                  setFStop(parseFloat(e.target.value));
                  if (Math.random() > 0.6) playDialClick();
                }}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              {/* Quick Preset Buttons */}
              <div className="flex items-center justify-between pt-2">
                {stops.map((s) => (
                  <button
                    key={s.value}
                    id={`quick-fstop-${s.value}`}
                    onClick={() => {
                      playDialClick();
                      setFStop(s.value);
                    }}
                    className={`px-2 py-1 text-[11px] font-mono rounded transition-all ${
                      Math.abs(fStop - s.value) < 0.2
                        ? 'bg-amber-400 text-black font-bold'
                        : 'text-zinc-400 hover:text-amber-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Live Optical Bokeh Render Preview */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            <div className="relative overflow-hidden rounded-2xl border border-amber-900/40 bg-black aspect-[4/3] group shadow-2xl">
              
              {/* Background Layer with Live Depth-of-Field Optical Blur */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"
                alt="Live Optical Simulation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
                style={{
                  filter: `blur(${blurAmount * 0.7}px) contrast(108%)`,
                  transform: 'scale(1.04)',
                }}
              />

              {/* Sharp Center Subject Focal Plane Mask */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-300 flex items-center justify-center"
                style={{
                  maskImage: `radial-gradient(circle at 50% 40%, black 25%, transparent 65%)`,
                  WebkitMaskImage: `radial-gradient(circle at 50% 40%, black 25%, transparent 65%)`,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"
                  alt="Focal Subject"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-110"
                />
              </div>

              {/* Viewfinder Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-amber-400/20 opacity-40" />
              
              {/* Center AF Point Bracket */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 border border-amber-400/80 rounded-sm pointer-events-none flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
              </div>

              {/* Live HUD Optical Readout */}
              <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-amber-500/30 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>APERTURE: f/{fStop.toFixed(1)}</span>
                </div>
                <div className="text-zinc-300">
                  <span>DOF: {currentConfig.dof}</span>
                </div>
              </div>

            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-amber-900/30">
                <span className="text-[10px] font-cinzel text-amber-400/80 uppercase tracking-widest block mb-1">
                  Optical Falloff Character
                </span>
                <p className="text-sm sm:text-base font-cinzel font-semibold text-white">
                  {currentConfig.bokeh}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-amber-900/30">
                <span className="text-[10px] font-cinzel text-amber-400/80 uppercase tracking-widest block mb-1">
                  Editorial Specialty
                </span>
                <p className="text-sm sm:text-base font-cinzel font-semibold text-white">
                  {currentConfig.genre}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
