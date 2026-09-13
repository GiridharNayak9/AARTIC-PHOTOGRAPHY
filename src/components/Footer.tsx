import React from 'react';
import { AarticLogo } from './AarticLogo';
import { ArrowUp, Mail, MapPin, Phone, ShieldCheck, Instagram, Globe } from 'lucide-react';
import { playDialClick } from '../utils/audioEffects';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    playDialClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="studio-footer" className="bg-[#040405] text-white border-t border-amber-950/60 pt-20 pb-12 px-4 sm:px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Branding Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-zinc-900">
          
          <div className="flex items-center gap-4">
            <AarticLogo size="md" showSubtitle={false} interactive />
            <div className="text-left">
              <h3 className="font-cinzel text-xl font-bold tracking-[0.2em] text-white">
                AARTIC PHOTOGRAPHY
              </h3>
              <p className="text-[10px] font-cinzel tracking-[0.25em] text-amber-400 uppercase">
                Fine Art · Haute Couture · Architecture
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-cinzel font-bold text-xs tracking-widest uppercase hover:brightness-110 shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              Book 2026/2027 Commission
            </button>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-amber-900/40 text-amber-400 hover:text-white transition-colors cursor-pointer"
              title="Return to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* 4-Column Studio Addresses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left text-xs font-sans text-zinc-400">
          
          <div className="space-y-3">
            <span className="font-cinzel text-amber-300 tracking-wider text-sm font-semibold block uppercase">
              Atelier Paris
            </span>
            <p className="leading-relaxed">
              7 Place Vendôme<br />
              75001 Paris, France<br />
              <span className="text-zinc-500 font-mono">+33 1 42 68 00 12</span>
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-cinzel text-amber-300 tracking-wider text-sm font-semibold block uppercase">
              Studio New York
            </span>
            <p className="leading-relaxed">
              590 Madison Avenue, 24th Fl.<br />
              New York, NY 10022<br />
              <span className="text-zinc-500 font-mono">+1 212 555 0198</span>
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-cinzel text-amber-300 tracking-wider text-sm font-semibold block uppercase">
              Galleria Milan
            </span>
            <p className="leading-relaxed">
              Via Montenapoleone 18<br />
              20121 Milano MI, Italy<br />
              <span className="text-zinc-500 font-mono">+39 02 8739 4410</span>
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-cinzel text-amber-300 tracking-wider text-sm font-semibold block uppercase">
              Tokyo Bureau
            </span>
            <p className="leading-relaxed">
              Ginza Six Tower 11F, 6-10-1 Ginza<br />
              Chuo City, Tokyo 104-0061<br />
              <span className="text-zinc-500 font-mono">+81 3 5537 9920</span>
            </p>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-600">
          <p>© {new Date().getFullYear()} Aartic Photography. All rights reserved. Registered trademark.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-amber-400 cursor-pointer">Private Policy</span>
            <span className="hover:text-amber-400 cursor-pointer">Terms of Commission</span>
            <span className="hover:text-amber-400 cursor-pointer">Darkroom Provenance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
