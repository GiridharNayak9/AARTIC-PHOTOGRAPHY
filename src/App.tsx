/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeaderBranding } from './components/HeaderBranding';
import { ThreeCameraScene } from './components/ThreeCameraScene';
import { ParallaxGallery } from './components/ParallaxGallery';
import { InteractiveApertureSimulator } from './components/InteractiveApertureSimulator';
import { PhilosophySection } from './components/PhilosophySection';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { CommissionBookingModal } from './components/CommissionBookingModal';
import { AarticLogo } from './components/AarticLogo';
import { PhotoItem } from './types';
import { PORTFOLIO_PHOTOS } from './data/portfolioData';
import { Sparkles, ChevronDown, Camera, Award, ShieldCheck, Compass, Eye } from 'lucide-react';
import { playDialClick } from './utils/audioEffects';

export default function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showShutterNotification = () => {
    setNotification('FRAME EXPOSED · 150MP RAW CAPTURED TO OBSIDIAN STORAGE');
    setTimeout(() => {
      setNotification(null);
    }, 2800);
  };

  const handleNavigateSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060607] text-[#f4f4f4] flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Header with Uploaded Company Logo Branding */}
      <HeaderBranding
        onOpenBooking={() => setIsBookingOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Quick Frame Captured Notification Pill */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-amber-400 text-black font-cinzel font-bold text-xs tracking-wider shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <Camera className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* HERO SECTION WITH INTERACTIVE 3D CAMERA */}
      <section id="hero-section" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden">
        
        {/* Ambient Gold Halo Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-600/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
          
          {/* Top Elegant Subtitle Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-cinzel font-semibold tracking-[0.25em] text-amber-300 uppercase">
              Haute Époque Photography Studio
            </span>
          </div>

          {/* Hero Main Headline */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-cinzel font-black tracking-tight text-white leading-[1.05]">
              Light Sculpted in <span className="gold-text-gradient">Pure Gold</span>
            </h1>
            <p className="font-cormorant text-xl sm:text-2xl md:text-3xl text-amber-100/80 italic max-w-2xl mx-auto leading-relaxed">
              Where medium-format precision meets classical chiaroscuro. Exploring the threshold between obsidian darkness and golden luminescence.
            </p>
          </div>

          {/* 3D Interactive Camera Studio Viewport */}
          <div className="w-full max-w-5xl mt-6">
            <div id="3d-camera-studio-section">
              <ThreeCameraScene onShutterTrigger={showShutterNotification} />
            </div>
          </div>

          {/* Studio Specs Ribbon */}
          <div className="w-full max-w-4xl pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-amber-950/40 text-center font-mono text-xs">
            <div className="p-3 rounded-lg bg-black/40 border border-amber-900/20">
              <span className="text-amber-300 font-cinzel font-bold text-base sm:text-lg block">150 MP</span>
              <span className="text-zinc-500 text-[10px] uppercase tracking-wider">True Sensor Fidelity</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-amber-900/20">
              <span className="text-amber-300 font-cinzel font-bold text-base sm:text-lg block">f/1.2 PRIME</span>
              <span className="text-zinc-500 text-[10px] uppercase tracking-wider">Hand-Ground Optics</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-amber-900/20">
              <span className="text-amber-300 font-cinzel font-bold text-base sm:text-lg block">16-BIT RAW</span>
              <span className="text-zinc-500 text-[10px] uppercase tracking-wider">Chiaroscuro Depth</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-amber-900/20">
              <span className="text-amber-300 font-cinzel font-bold text-base sm:text-lg block">PARIS · NYC</span>
              <span className="text-zinc-500 text-[10px] uppercase tracking-wider">Global Salons</span>
            </div>
          </div>

          {/* Scroll Down Prompt */}
          <button
            onClick={() => handleNavigateSection('portfolio-gallery-section')}
            className="pt-6 inline-flex flex-col items-center gap-2 text-zinc-500 hover:text-amber-300 transition-colors group cursor-pointer"
          >
            <span className="text-[10px] font-cinzel uppercase tracking-[0.25em]">Explore Gallery</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>

        </div>
      </section>

      {/* PORTFOLIO GALLERY WITH SMOOTH PARALLAX SCROLLING EFFECTS */}
      <ParallaxGallery onSelectPhoto={(photo) => setSelectedPhoto(photo)} />

      {/* INTERACTIVE OPTICAL APERTURE & BOKEH SIMULATOR */}
      <InteractiveApertureSimulator />

      {/* STUDIO PHILOSOPHY, CLIENT SHOWCASE & AWARDS */}
      <PhilosophySection />

      {/* FOOTER */}
      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      {/* LIGHTBOX MODAL WITH FULL EXIF INSPECTOR */}
      <LightboxModal
        photo={selectedPhoto}
        photos={PORTFOLIO_PHOTOS}
        onClose={() => setSelectedPhoto(null)}
        onNavigate={(photo) => setSelectedPhoto(photo)}
      />

      {/* PRIVATE COMMISSION INQUIRY MODAL */}
      <CommissionBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

    </div>
  );
}
