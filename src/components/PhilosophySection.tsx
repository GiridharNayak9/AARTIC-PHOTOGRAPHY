import React from 'react';
import { STUDIO_AWARDS, NOTABLE_CLIENTS } from '../data/portfolioData';
import { Award, Compass, Camera, Sparkles, Feather } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <div className="bg-[#070709] border-t border-amber-950/40 py-28 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      
      {/* Decorative Golden Ambient Backdrops */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-28 relative z-10">
        
        {/* Philosophy Manifesto */}
        <div id="philosophy-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/30">
              <Feather className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-cinzel uppercase tracking-[0.25em] text-amber-300">
                Atelier Manifesto
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight leading-tight">
              Crafting Immortality from Fleeting Photons
            </h2>

            <p className="font-cormorant text-xl text-amber-100/80 italic leading-relaxed">
              “Photography is not the passive recording of reality. It is the architectural manipulation of obsidian shadows until pure gold reveals its silhouette.”
            </p>

            <p className="text-sm font-sans text-zinc-400 leading-relaxed">
              Founded under the principle that every singular frame deserves the same compositional rigor as classical oil painting, Aartic Photography pairs 150-megapixel medium-format sensors with bespoke optical recipes and hand-crafted darkroom finishes.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-6 border-t border-amber-950/60 font-mono text-xs">
              <div>
                <span className="text-amber-400 font-cinzel text-2xl font-bold block mb-1">150 MP</span>
                <span className="text-zinc-500 uppercase tracking-wider">Medium Format Precision</span>
              </div>
              <div>
                <span className="text-amber-400 font-cinzel text-2xl font-bold block mb-1">24 Karat</span>
                <span className="text-zinc-500 uppercase tracking-wider">Gold Leaf Archival Prints</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-black/60 border border-amber-900/30 hover:border-amber-500/40 transition-colors space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white">Large Format Optical Discipline</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Utilizing leaf-shutter lenses synchronized at up to 1/2500 second, freezing fabric dynamics and haute couture movements with zero rolling-shutter distortion.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-black/60 border border-amber-900/30 hover:border-amber-500/40 transition-colors space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white">Gold Tonal Science</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Custom colorimetric profiling engineered specifically to translate skin undertones and precious metals into warm, luminous, timeless chiaroscuro.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-black/60 border border-amber-900/30 hover:border-amber-500/40 transition-colors space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white">Global Expedition Readiness</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Autonomous location power units and portable studio strobe arrays ready for destination shoots from the desert dunes of Qatar to Nordic glaciers.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-black/60 border border-amber-900/30 hover:border-amber-500/40 transition-colors space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white">Museum-Grade Preservation</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Pigment prints on 310gsm Hahnemühle cotton rag, individually numbered, gold-embossed with the studio seal, and archival rated for 200+ years.
              </p>
            </div>
          </div>

        </div>

        {/* Notable Clients Ticker */}
        <div className="pt-12 border-t border-amber-950/60 text-center">
          <span className="text-[11px] font-cinzel tracking-[0.3em] uppercase text-amber-400/70 block mb-8">
            Commissions & Editorial Covers
          </span>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75">
            {NOTABLE_CLIENTS.map((client) => (
              <span
                key={client}
                className="font-cinzel text-sm sm:text-lg tracking-[0.25em] text-zinc-400 hover:text-amber-200 transition-colors cursor-default"
              >
                {client}
              </span>
            ))}
          </div>
        </div>

        {/* Studio Awards & Laurels */}
        <div id="awards-section" className="pt-12 border-t border-amber-950/60">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-cinzel tracking-[0.25em] uppercase text-amber-400 block mb-2">
              Distinctions & Laurels
            </span>
            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
              Recognized Across Global Salons
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STUDIO_AWARDS.map((award, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-black/60 border border-amber-900/30 text-left space-y-2 hover:border-amber-500/40 transition-colors"
              >
                <span className="text-amber-400 font-mono text-xs font-semibold block">
                  {award.year}
                </span>
                <h4 className="font-cinzel text-base font-bold text-white leading-snug">
                  {award.title}
                </h4>
                <p className="text-xs font-sans text-zinc-400">{award.institution}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
