import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PhotoCategory, PhotoItem } from '../types';
import { PORTFOLIO_PHOTOS } from '../data/portfolioData';
import { Sparkles, Maximize2, Camera, Eye, MapPin, Award, Layers } from 'lucide-react';
import { playDialClick } from '../utils/audioEffects';

interface ParallaxGalleryProps {
  onSelectPhoto: (photo: PhotoItem) => void;
}

export const ParallaxGallery: React.FC<ParallaxGalleryProps> = ({ onSelectPhoto }) => {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>('all');
  const [viewMode, setViewMode] = useState<'parallax' | 'grid'>('parallax');
  const galleryRef = useRef<HTMLDivElement>(null);

  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start'],
  });

  // Different column travel rates for smooth physical parallax
  const yColumn1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const yColumn2 = useTransform(scrollYProgress, [0, 1], [40, -220]);
  const yColumn3 = useTransform(scrollYProgress, [0, 1], [-20, -110]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const categories: { id: PhotoCategory; label: string }[] = [
    { id: 'all', label: 'All Series' },
    { id: 'fashion', label: 'Haute Couture' },
    { id: 'editorial', label: 'Editorial' },
    { id: 'architecture', label: 'Architectural Noir' },
    { id: 'fine-art', label: 'Fine Art' },
    { id: 'monochrome', label: 'Monochrome' },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? PORTFOLIO_PHOTOS
    : PORTFOLIO_PHOTOS.filter((p) => p.category === activeCategory);

  // Split into 3 columns for desktop parallax view
  const col1Photos = filteredPhotos.filter((_, i) => i % 3 === 0);
  const col2Photos = filteredPhotos.filter((_, i) => i % 3 === 1);
  const col3Photos = filteredPhotos.filter((_, i) => i % 3 === 2);

  return (
    <section id="portfolio-gallery-section" ref={galleryRef} className="relative py-28 px-4 sm:px-6 lg:px-12 bg-[#050505] overflow-hidden">
      {/* Background Ambient Floating Watermark Typography */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none select-none text-[12vw] font-cinzel font-black text-amber-500/[0.025] tracking-widest whitespace-nowrap z-0"
      >
        AARTIC GALLERY
      </motion.div>

      {/* Decorative Gold Light Beams */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/30 border border-amber-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-amber-300">
              Masterwork Portfolio
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-white tracking-tight mb-4">
            L’Art de la Lumière & de l’Ombre
          </h2>

          <p className="font-cormorant text-xl sm:text-2xl text-amber-100/70 italic max-w-2xl mx-auto leading-relaxed">
            “Each frame is carved from obsidian darkroom depths and illuminated with 24-karat golden ratios.”
          </p>
        </div>

        {/* Filter Navigation Bar & Layout Mode Switcher */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-amber-950/60 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-tab-${cat.id}`}
                onClick={() => {
                  playDialClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-3.5 py-2 text-xs sm:text-sm font-cinzel rounded-lg tracking-wider transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-amber-400/15 text-amber-300 border border-amber-400/50 shadow-sm shadow-amber-500/10 font-bold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-zinc-900/80 p-1 rounded-lg border border-amber-900/30 text-xs font-cinzel">
            <button
              id="view-mode-parallax"
              onClick={() => {
                playDialClick();
                setViewMode('parallax');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                viewMode === 'parallax'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Parallax Depth</span>
            </button>
            <button
              id="view-mode-grid"
              onClick={() => {
                playDialClick();
                setViewMode('grid');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                viewMode === 'grid'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Curated Grid</span>
            </button>
          </div>
        </div>

        {/* Gallery Content */}
        {viewMode === 'parallax' ? (
          /* Smooth Multi-Column Parallax Stream */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {/* Column 1 */}
            <motion.div style={{ y: yColumn1 }} className="flex flex-col gap-8">
              {col1Photos.map((photo) => (
                <ParallaxPhotoCard key={photo.id} photo={photo} onSelect={() => onSelectPhoto(photo)} />
              ))}
            </motion.div>

            {/* Column 2 (Offset Parallax) */}
            <motion.div style={{ y: yColumn2 }} className="flex flex-col gap-8 md:pt-12">
              {col2Photos.map((photo) => (
                <ParallaxPhotoCard key={photo.id} photo={photo} onSelect={() => onSelectPhoto(photo)} />
              ))}
            </motion.div>

            {/* Column 3 */}
            <motion.div style={{ y: yColumn3 }} className="flex flex-col gap-8 md:pt-6">
              {col3Photos.map((photo) => (
                <ParallaxPhotoCard key={photo.id} photo={photo} onSelect={() => onSelectPhoto(photo)} />
              ))}
            </motion.div>
          </div>
        ) : (
          /* Standard Curated Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPhotos.map((photo) => (
              <ParallaxPhotoCard key={photo.id} photo={photo} onSelect={() => onSelectPhoto(photo)} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

/* 3D Interactive Card with Perspective Tilt and Gold Specular Glint */
interface ParallaxPhotoCardProps {
  photo: PhotoItem;
  onSelect: () => void;
}

const ParallaxPhotoCard: React.FC<ParallaxPhotoCardProps> = ({ photo, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max 10 degrees tilt
    const rotX = -((y - centerY) / centerY) * 9;
    const rotY = ((x - centerX) / centerX) * 9;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      id={`portfolio-card-${photo.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className="group relative cursor-pointer"
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className="relative overflow-hidden rounded-xl bg-[#0d0d0f] border border-amber-900/30 hover:border-amber-500/50 shadow-xl transition-colors duration-300"
      >
        {/* Dynamic Specular Gold Glare Sheen following cursor */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(249, 228, 152, 0.35) 0%, rgba(212, 175, 55, 0.1) 40%, transparent 70%)`,
            }}
          />
        )}

        {/* Image Frame */}
        <div className="relative overflow-hidden aspect-[3/4] w-full bg-black">
          <img
            src={photo.image}
            alt={photo.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter contrast-105 brightness-95 group-hover:brightness-105"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 group-hover:opacity-60 transition-opacity duration-300" />

          {/* Top Gold Corner Accents */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-amber-400/60 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-amber-400/60 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Pill */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-2.5 py-1 text-[10px] font-cinzel font-semibold tracking-widest uppercase rounded bg-black/75 backdrop-blur-md text-amber-300 border border-amber-500/30">
              {photo.category}
            </span>
          </div>

          {/* Magnify Quick Action Icon */}
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-2 rounded-full bg-black/80 backdrop-blur-md border border-amber-400/40 text-amber-300 shadow-md">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Bottom Card Content */}
          <div className="absolute bottom-0 inset-x-0 p-5 z-10 flex flex-col gap-2">
            <span className="text-[11px] font-mono tracking-widest text-amber-400/80 uppercase">
              {photo.series}
            </span>

            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white group-hover:text-amber-200 transition-colors">
              {photo.title}
            </h3>

            {/* Technical Camera Badge Bar */}
            <div className="flex items-center gap-3 text-[11px] text-zinc-300 pt-1 border-t border-amber-900/40 font-mono">
              <div className="flex items-center gap-1">
                <Camera className="w-3 h-3 text-amber-400" />
                <span>{photo.camera.split(' ')[0]}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3 text-amber-400" />
                <span>{photo.aperture}</span>
              </div>
              <div className="flex items-center gap-1 text-zinc-400">
                <span>{photo.shutter}</span>
              </div>
            </div>

            {photo.location && (
              <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-sans">
                <MapPin className="w-3 h-3 text-amber-500" />
                <span>{photo.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
