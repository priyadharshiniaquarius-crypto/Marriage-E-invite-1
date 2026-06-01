import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import SplineHero from './components/SplineHero';
import BrideGroom from './components/BrideGroom';
import CountdownTimer from './components/CountdownTimer';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import InfoSection from './components/InfoSection';
import RSVPForm from './components/RSVPForm';
import MusicPlayer from './components/MusicPlayer';
import { BRIDE_NAME, GROOM_NAME } from './data';

export default function App() {
  return (
    <div id="wedding-invitation-app-root" className="relative min-h-screen w-full bg-luxury-charcoal text-luxury-ivory overflow-x-hidden selection:bg-luxury-gold selection:text-luxury-charcoal scroll-smooth">
      
      {/* Absolute Background Ambient Noise / subtle elegant grid representing silk texture background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* 🟢 Music Player controller floats fixed at all times */}
      <MusicPlayer />

      {/* 🎬 1. Fullscreen Cinematic Hero Section containing embedded Spline 3D Scene */}
      <SplineHero />

      {/* 💑 2. Bride & Groom Bios Section inside beautiful modular parallax columns */}
      <BrideGroom />

      {/* ⏳ 3. Countdown Section (Elegant divider connecting portraits with the official events) */}
      <section id="countdown-banner-divider" className="py-16 md:py-24 bg-gradient-to-b from-[#121212] via-[#161616] to-[#121212] border-t border-b border-luxury-gold/10 relative z-20 text-center flex flex-col items-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-4"
        >
          <div className="flex justify-center items-center gap-1">
            <Sparkles className="w-4 h-4 text-luxury-gold animate-spin-slow" />
            <span className="text-[10px] tracking-[0.3em] font-sans text-luxury-gold uppercase font-medium">OM MANGALAM</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-luxury-gold-light tracking-widest font-bold">
            THE TICKET OUT TO ETERNITY
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold/30 mx-auto my-3" />
          <p className="font-serif-display text-xs sm:text-sm md:text-base italic text-[#b8b8b8] leading-relaxed max-w-xl mx-auto">
            "A union of two souls, authorized by destiny, nurtured by friendship, and blessed by our elders. Countdown with us to the sacred Muhurtham."
          </p>
        </motion.div>
        
        <div className="w-full mt-6">
          <CountdownTimer />
        </div>
      </section>

      {/* 📅 4. Vertical Timeline Section connecting Sangeet, Muhurtham, and Reception */}
      <Timeline />

      {/* 📸 5. Filterable Gallery Section with built-in Lightbox visualizer */}
      <Gallery />

      {/* 📍 6. Guidelines, Dresscodes, Accommodations, and bento logistics Info */}
      <InfoSection />

      {/* 💌 7. Primary WhatsApp RSVP & Custom RSVP Form alternatives */}
      <RSVPForm />

      {/* 🌟 8. Luxury Acknowledgment / South Indian Wedding Footer */}
      <footer id="app-luxury-footer" className="py-20 px-6 bg-gradient-to-t from-[#0d0d0d] via-luxury-charcoal to-[#121212] border-t border-luxury-gold/15 relative z-20 text-center font-sans tracking-widest text-[#8c8c8c] flex flex-col items-center space-y-6">
        
        <div className="flex flex-col items-center space-y-3 select-none">
          <div className="w-12 h-12 rounded-full border border-luxury-gold/20 flex items-center justify-center glow-gold mb-1">
            <Heart className="w-5 h-5 text-luxury-gold fill-luxury-gold/10" />
          </div>
          <div className="font-serif text-xl sm:text-2xl text-luxury-gold-light tracking-[0.25em] font-extrabold uppercase animate-gold-shine">
            {BRIDE_NAME} & {GROOM_NAME}
          </div>
          <div className="text-[10px] sm:text-xxs text-luxury-gold tracking-[0.35em] uppercase font-semibold">
            WE ARE EXCITED TO CELEBRATE WITH YOU
          </div>
        </div>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent" />

        <div className="max-w-lg text-xxs tracking-[0.2em] leading-relaxed text-[#606060] uppercase italic">
          “May the blessings of Lord Ganesha and our loving families guide us towards a harmonious lifetime.”
          <span className="block mt-3 text-[9px] text-[#4d4d4d] not-italic tracking-[0.1em] lowercase">
            designed with reverence and pure cultural gratitude • 2026 all rights reserved
          </span>
        </div>

      </footer>

    </div>
  );
}
