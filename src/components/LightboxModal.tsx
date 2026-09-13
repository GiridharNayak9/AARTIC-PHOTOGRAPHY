import React, { useState, useEffect } from 'react';
import { PhotoItem } from '../types';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Camera, MapPin, Award, Calendar, Compass, ShieldCheck } from 'lucide-react';
import { playDialClick } from '../utils/audioEffects';

interface LightboxModalProps {
  photo: PhotoItem | null;
  photos: PhotoItem[];
  onClose: () => void;
  onNavigate: (photo: PhotoItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  photos,
  onClose,
  onNavigate,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handleNext = () => {
    playDialClick();
    const nextIdx = (currentIndex + 1) % photos.length;
    onNavigate(photos[nextIdx]);
    setIsZoomed(false);
  };

  const handlePrev = () => {
    playDialClick();
    const prevIdx = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(photos[prevIdx]);
    setIsZoomed(false);
  };

  return (
    <div
      id="lightbox-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-6 md:p-10 animate-in fade-in duration-300"
    >
      {/* Top Floating Control Bar */}
      <div className="absolute top-6 inset-x-6 z-30 flex items-center justify-between text-zinc-400">
        <div className="flex items-center gap-3 font-mono text-xs text-amber-300">
          <span className="font-cinzel text-white text-sm font-semibold">{photo.title}</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">PLATE {currentIndex + 1} OF {photos.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="lightbox-zoom-toggle"
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2.5 rounded-full bg-zinc-900/80 border border-amber-500/30 text-amber-300 hover:text-white transition-colors"
            title={isZoomed ? 'Zoom Out' : 'Zoom In'}
            aria-label="Toggle Zoom"
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          <button
            id="lightbox-close-btn"
            onClick={onClose}
            className="p-2.5 rounded-full bg-zinc-900/80 border border-amber-500/30 text-amber-300 hover:text-white transition-colors"
            title="Close Lightbox"
            aria-label="Close Lightbox"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Prev / Next Arrows */}
      <button
        id="lightbox-prev-btn"
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-black/70 border border-amber-500/40 text-amber-300 hover:text-white hover:bg-black/90 transition-all hover:scale-110 cursor-pointer"
        aria-label="Previous photograph"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        id="lightbox-next-btn"
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-black/70 border border-amber-500/40 text-amber-300 hover:text-white hover:bg-black/90 transition-all hover:scale-110 cursor-pointer"
        aria-label="Next photograph"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Central Photograph & EXIF Detail HUD */}
      <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col md:flex-row items-center gap-6 overflow-y-auto md:overflow-visible">
        
        {/* Frame with Golden Corner Accents */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded-xl border border-amber-900/40 bg-black/80 p-2 shadow-2xl">
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400" />

          <img
            src={photo.image}
            alt={photo.title}
            referrerPolicy="no-referrer"
            className={`max-h-[70vh] w-auto object-contain rounded transition-transform duration-500 ${
              isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </div>

        {/* Sidebar Metadata Card */}
        <div className="w-full md:w-80 bg-[#0c0c0e] p-6 rounded-xl border border-amber-900/40 flex flex-col gap-4 text-left shadow-xl">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
              {photo.category} ARCHIVE
            </span>
            <h3 className="text-2xl font-cinzel font-bold text-white mb-1">{photo.title}</h3>
            <p className="text-xs font-mono text-zinc-400">{photo.series}</p>
          </div>

          {photo.featuredQuote && (
            <div className="p-3.5 rounded-lg bg-black/60 border border-amber-950/60 font-cormorant italic text-sm text-amber-200/90 leading-relaxed">
              "{photo.featuredQuote}"
            </div>
          )}

          {/* EXIF Data Grid */}
          <div className="space-y-2.5 pt-2 border-t border-zinc-800 text-xs font-mono">
            <div className="flex items-center justify-between text-zinc-300">
              <span className="text-zinc-500">Camera Body:</span>
              <span className="text-amber-200 font-medium">{photo.camera}</span>
            </div>

            <div className="flex items-center justify-between text-zinc-300">
              <span className="text-zinc-500">Optics:</span>
              <span className="text-amber-200 font-medium">{photo.lens}</span>
            </div>

            <div className="flex items-center justify-between text-zinc-300">
              <span className="text-zinc-500">Aperture / Shutter:</span>
              <span className="text-amber-300">{photo.aperture} · {photo.shutter}</span>
            </div>

            <div className="flex items-center justify-between text-zinc-300">
              <span className="text-zinc-500">Sensitivity:</span>
              <span className="text-zinc-300">ISO {photo.iso}</span>
            </div>

            <div className="flex items-center justify-between text-zinc-300">
              <span className="text-zinc-500">Location:</span>
              <span className="text-zinc-300">{photo.location}</span>
            </div>

            {photo.client && (
              <div className="flex items-center justify-between text-zinc-300">
                <span className="text-zinc-500">Commission:</span>
                <span className="text-amber-400 font-semibold">{photo.client}</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <span>© AARTIC STUDIO {photo.year}</span>
            <span className="text-amber-500/80">AUTHENTICATED PRINT</span>
          </div>

        </div>

      </div>
    </div>
  );
};
