import React, { useState, useEffect } from 'react';
import { AarticLogo } from './AarticLogo';
import { Volume2, VolumeX, Menu, X, Calendar, Sparkles, Compass } from 'lucide-react';
import { toggleAudioMute, getAudioMutedState, playDialClick } from '../utils/audioEffects';

interface HeaderBrandingProps {
  onOpenBooking: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const HeaderBranding: React.FC<HeaderBrandingProps> = ({
  onOpenBooking,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(getAudioMutedState());

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleAudioMute();
    setIsMuted(newState);
  };

  const navItems = [
    { label: 'Portfolio', id: 'portfolio-gallery-section' },
    { label: '3D Camera Studio', id: '3d-camera-studio-section' },
    { label: 'Optical Lab', id: 'optical-aperture-section' },
    { label: 'Philosophy', id: 'philosophy-section' },
    { label: 'Exhibitions & Awards', id: 'awards-section' },
  ];

  const handleNavClick = (id: string) => {
    playDialClick();
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#070708]/90 backdrop-blur-xl border-b border-amber-900/30 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left / Center: The Official Company Logo for Header Branding */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3.5 group cursor-pointer"
          title="Aartic Photography - Haute Époque"
        >
          {/* Logo Symbol */}
          <div className="relative">
            <AarticLogo size={isScrolled ? 'sm' : 'md'} showSubtitle={false} interactive />
            {/* Ambient golden glow behind logo */}
            <div className="absolute inset-0 bg-amber-400/10 blur-md rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex flex-col">
            <span className="font-cinzel font-black tracking-[0.25em] text-base sm:text-lg text-white group-hover:text-amber-200 transition-colors">
              AARTIC
            </span>
            <span className="text-[9px] font-cinzel tracking-[0.35em] text-amber-400 font-semibold uppercase">
              PHOTOGRAPHY
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-cinzel tracking-[0.18em] uppercase text-zinc-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className="hover:text-amber-300 transition-colors cursor-pointer py-1 relative group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-amber-200 to-amber-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Right Actions: Sound Toggle + Booking CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Subtle Audio Toggle */}
          <button
            id="header-sound-toggle"
            onClick={handleSoundToggle}
            className="p-2.5 rounded-full bg-black/50 border border-amber-900/40 text-amber-300 hover:text-amber-100 hover:border-amber-500/50 transition-all cursor-pointer"
            title={isMuted ? 'Unmute Mechanical Sound' : 'Mute Mechanical Sound'}
            aria-label="Toggle camera sound effects"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Book Commission CTA */}
          <button
            id="header-book-commission-btn"
            onClick={() => {
              playDialClick();
              onOpenBooking();
            }}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-cinzel font-bold text-xs tracking-wider shadow-md shadow-amber-500/10 hover:shadow-amber-500/30 hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>COMMISSION</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            id="mobile-sound-toggle"
            onClick={handleSoundToggle}
            className="p-2 rounded-full bg-zinc-900/80 border border-amber-900/40 text-amber-300"
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-amber-300 focus:outline-none"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0c] border-b border-amber-900/40 px-6 py-6 mt-3 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-3 font-cinzel text-xs tracking-widest uppercase">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left py-2.5 text-zinc-300 hover:text-amber-300 border-b border-zinc-800/60"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-cinzel font-bold text-xs tracking-widest uppercase text-center"
            >
              Book Private Commission
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
