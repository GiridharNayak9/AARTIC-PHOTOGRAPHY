import React, { useState } from 'react';
import { X, Calendar, Check, Sparkles, MapPin, Send, Mail, User, ShieldAlert } from 'lucide-react';
import { BookingFormData } from '../types';
import { playShutterSound, playDialClick } from '../utils/audioEffects';

interface CommissionBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommissionBookingModal: React.FC<CommissionBookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    serviceCategory: 'haute-couture',
    shootLocation: 'Paris, France',
    estimatedDate: '2026-11-15',
    projectVision: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playShutterSound();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    playDialClick();
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="commission-booking-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-2xl bg-[#0d0d10] border border-amber-900/50 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
        
        {/* Subtle Gold Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          id="close-booking-modal"
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900/80 border border-amber-500/30 text-amber-300 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-12 space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-lg shadow-amber-500/20">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
              Inquiry Received by Atelier Aartic
            </h3>

            <p className="font-cormorant text-lg text-amber-100/80 italic max-w-md mx-auto leading-relaxed">
              Our principal photographer and studio director will review your brief within 24 hours. A private dossier and creative treatment proposal will be dispatched to <span className="text-amber-300 font-mono not-italic">{formData.email}</span>.
            </p>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-cinzel font-bold text-xs tracking-widest uppercase hover:brightness-110 cursor-pointer shadow-lg"
            >
              Return to Gallery
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-[10px] font-cinzel uppercase tracking-[0.2em] text-amber-300 mb-3">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Private Commissions 2026 / 2027</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white mb-2">
                Initiate Creative Commission
              </h3>
              <p className="font-cormorant text-base sm:text-lg text-amber-100/70 italic">
                Direct artistic commissions for luxury maisons, global editorial publications, and private acquisitions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-cinzel uppercase tracking-wider text-amber-300/90 mb-1.5">
                    Your Name / Maison
                  </label>
                  <div className="relative">
                    <input
                      id="input-full-name"
                      type="text"
                      required
                      placeholder="e.g., Jean-Luc Laurent"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-amber-900/50 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 text-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-cinzel uppercase tracking-wider text-amber-300/90 mb-1.5">
                    Direct Email
                  </label>
                  <input
                    id="input-email"
                    type="email"
                    required
                    placeholder="director@maison.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-amber-900/50 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 text-sm font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-cinzel uppercase tracking-wider text-amber-300/90 mb-1.5">
                    Commission Category
                  </label>
                  <select
                    id="select-category"
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/80 border border-amber-900/50 text-white focus:outline-none focus:border-amber-400 text-sm font-sans"
                  >
                    <option value="haute-couture">Haute Couture & Runway</option>
                    <option value="editorial">Global Magazine Editorial</option>
                    <option value="architectural">Architectural & Spatial Monograph</option>
                    <option value="fine-art">Fine Art Private Acquisition</option>
                    <option value="jewelry">Haute Joaillerie & Horlogerie</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-cinzel uppercase tracking-wider text-amber-300/90 mb-1.5">
                    Shoot Location / City
                  </label>
                  <input
                    id="input-location"
                    type="text"
                    required
                    placeholder="Paris, Milan, Tokyo, Lake Como"
                    value={formData.shootLocation}
                    onChange={(e) => setFormData({ ...formData, shootLocation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-amber-900/50 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 text-sm font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-cinzel uppercase tracking-wider text-amber-300/90 mb-1.5">
                  Creative Scope & Aesthetic Vision
                </label>
                <textarea
                  id="textarea-vision"
                  rows={3}
                  placeholder="Outline the lighting mood, campaign deliverables, and target timeline..."
                  value={formData.projectVision}
                  onChange={(e) => setFormData({ ...formData, projectVision: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-amber-900/50 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 text-sm font-sans"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500">
                  ESTIMATED STUDIO RESPONSE: &lt; 24H
                </span>

                <button
                  id="submit-inquiry-btn"
                  type="submit"
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-cinzel font-bold text-xs tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT INQUIRY</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
