import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Star } from 'lucide-react';
import { BRIDE_NAME, GROOM_NAME, BRIDAL_BIO, GROOM_BIO } from '../data';

export default function BrideGroom() {
  return (
    <section id="bride-groom" className="py-24 px-6 md:px-12 bg-gradient-to-b from-luxury-charcoal via-[#181818] to-luxury-charcoal flex flex-col items-center justify-center relative z-20 overflow-hidden font-sans border-t border-luxury-gold/10">
      
      {/* Visual background ambient spotlights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Elegant Header with Floral Filigree Aesthetic */}
      <div className="text-center max-w-2xl mb-20 flex flex-col items-center">
        <span className="text-xxs tracking-[0.3em] text-luxury-gold font-semibold uppercase mb-3 flex items-center gap-1.5">
          <Star className="w-3 h-3 text-luxury-gold fill-luxury-gold/20" /> MEET THE SOULS
        </span>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-luxury-gold-light tracking-wide font-bold">
          The Bride & Groom
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent my-6" />
        <p className="font-serif-display text-base md:text-lg lg:text-xl text-luxury-ivory/80 italic leading-relaxed">
          “Every love story is beautiful, but ours is our absolute favorite. Here is a little glimpse into who we are before we write our forever.”
        </p>
      </div>

      {/* Majestic Bios Split Grid */}
      <div id="bios-split-grid" className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl w-full">
        
        {/* The Bride Column */}
        <motion.div 
          id="bride-column"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="flex flex-col items-center md:items-end text-center md:text-right relative"
        >
          {/* Framed Bride Portrait */}
          <div className="relative mb-8 group rounded-2xl overflow-hidden shadow-2xl overflow-hidden aspect-[3/4] w-full max-w-[340px] border border-luxury-gold/20 glow-gold duration-500 hover:border-luxury-gold">
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal via-transparent to-transparent opacity-80 z-10" />
            
            {/* Soft Zoom Parallax Image */}
            <img 
              src="/src/assets/images/bride_portrait_1780298271012.png" 
              alt={BRIDE_NAME} 
              className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            {/* Absolute Badge */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
              <span className="px-3 py-1 text-[10px] tracking-widest font-serif bg-luxury-charcoal/90 text-luxury-gold border border-luxury-gold/25 rounded-md uppercase">
                The Bride
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end max-w-md">
            <h3 className="font-serif text-3xl text-luxury-gold-light tracking-wider font-semibold mb-2">
              {BRIDE_NAME}
            </h3>
            <span className="text-xxs tracking-[0.2em] uppercase text-luxury-gold mb-4 italic font-serif-display">
              ஆதிரா • Graceful & Traditional
            </span>
            <p className="text-sm text-luxury-ivory/70 leading-relaxed font-light mb-6">
              {BRIDAL_BIO}
            </p>
          </div>
        </motion.div>

        {/* The Groom Column */}
        <motion.div 
          id="groom-column"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="flex flex-col items-center md:items-start text-center md:text-left relative"
        >
          {/* Framed Groom Portrait */}
          <div className="relative mb-8 group rounded-2xl overflow-hidden shadow-2xl overflow-hidden aspect-[3/4] w-full max-w-[340px] border border-luxury-gold/20 glow-gold duration-500 hover:border-luxury-gold">
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal via-transparent to-transparent opacity-80 z-10" />
            
            {/* Soft Zoom Parallax Image */}
            <img 
              src="/src/assets/images/groom_portrait_1780298287193.png" 
              alt={GROOM_NAME} 
              className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            {/* Absolute Badge */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
              <span className="px-3 py-1 text-[10px] tracking-widest font-serif bg-luxury-charcoal/90 text-luxury-gold border border-luxury-gold/25 rounded-md uppercase">
                The Groom
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start max-w-md">
            <h3 className="font-serif text-3xl text-luxury-gold-light tracking-wider font-semibold mb-2">
              {GROOM_NAME}
            </h3>
            <span className="text-xxs tracking-[0.2em] uppercase text-luxury-gold mb-4 italic font-serif-display">
              கார்த்திக் • Vibrant & Modern
            </span>
            <p className="text-sm text-luxury-ivory/70 leading-relaxed font-light mb-6">
              {GROOM_BIO}
            </p>
          </div>
        </motion.div>

      </div>

      {/* Golden Union Heart ornament */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-20 h-20 bg-luxury-charcoal border border-luxury-gold/25 rounded-full shadow-2xl z-20">
        <Heart className="text-luxury-gold w-8 h-8 fill-luxury-gold/10 hover:scale-110 hover:rotate-6 transition-all duration-300 animate-pulse" />
      </div>

    </section>
  );
}
