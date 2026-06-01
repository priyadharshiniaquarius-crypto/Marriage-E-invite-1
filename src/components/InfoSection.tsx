import React from 'react';
import { Shirt, Hash, Car, Hotel, AlertCircle, Info } from 'lucide-react';
import { INFO_CARDS } from '../data';

// Map icon strings to actual Lucide component handlers safely
const getIconComponent = (name: string) => {
  switch (name) {
    case 'Shirt': return Shirt;
    case 'Hash': return Hash;
    case 'Car': return Car;
    case 'Hotel': return Hotel;
    default: return Info;
  }
};

export default function InfoSection() {
  return (
    <section id="wedding-logistics-info" className="py-24 px-6 md:px-12 bg-gradient-to-b from-luxury-charcoal via-[#151515] to-[#121212] relative z-20 font-sans border-t border-luxury-gold/10">
      
      {/* Decorative radial circles */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-luxury-gold/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Title block */}
      <div className="text-center max-w-2xl mb-16 mx-auto flex flex-col items-center">
        <span className="text-xxs tracking-[0.3em] text-luxury-gold font-semibold uppercase mb-3 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-luxury-gold" /> LOGISTICS & COMPASS
        </span>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-luxury-gold-light tracking-wide font-bold">
          Venue Info & Guidelines
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent my-6" />
        <p className="font-serif-display text-base md:text-lg text-luxury-ivory/80 italic">
          Everything you need to navigate our traditional wedding celebrations comfortably.
        </p>
      </div>

      {/* Bento Grid layout */}
      <div id="info-bento-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {INFO_CARDS.map((card) => {
          const Icon = getIconComponent(card.iconName);
          return (
            <div
              key={card.id}
              id={`info-card-${card.id}`}
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1c1c1c]/90 to-luxury-charcoal/95 border border-luxury-gold/15 hover:border-luxury-gold/45 shadow-xl transition-all duration-500 hover:scale-105 glow-gold select-text"
            >
              {/* Colored light flare */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-luxury-gold/10 to-transparent blur-2xl rounded-tr-3xl group-hover:from-luxury-gold/25 duration-500" />
              
              <div className="space-y-4">
                {/* Floating Rounded Icon */}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-luxury-charcoal border border-luxury-gold/30 text-luxury-gold group-hover:scale-110 group-hover:rotate-3 duration-500 glow-gold">
                  <Icon className="w-5.5 h-5.5 text-luxury-gold group-hover:scale-110 duration-300" />
                </div>

                <div className="space-y-2 text-left">
                  <h3 className="font-serif text-lg tracking-wider text-luxury-gold-light font-semibold group-hover:text-luxury-gold duration-300">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-xs text-luxury-ivory/80 leading-relaxed font-light">
                    {card.detail}
                  </p>
                </div>
              </div>

              {/* Sub-details matching the footer section of the card */}
              {card.subDetail && (
                <div className="mt-5 pt-4 border-t border-[#222222] text-[10px] md:text-xxs text-luxury-ivory/40 leading-relaxed italic text-left">
                  {card.subDetail}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Aesthetic Callout */}
      <div className="mt-16 max-w-2xl mx-auto bg-luxury-charcoal/40 p-5 rounded-2xl border border-luxury-gold/10 flex items-center justify-center gap-3 text-center px-6">
        <AlertCircle className="w-4 h-4 text-luxury-gold/70 shrink-0" />
        <span className="text-xxs tracking-widest text-[#9c9c9c] uppercase leading-relaxed">
          For any immediate hospitality adjustments, kindly check our Help Desk counters at the hotel lobbies.
        </span>
      </div>

    </section>
  );
}
