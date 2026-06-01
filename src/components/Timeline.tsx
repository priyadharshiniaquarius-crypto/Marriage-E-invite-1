import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Compass, Grid } from 'lucide-react';
import { WEDDING_EVENTS } from '../data';

export default function Timeline() {
  return (
    <section id="event-timeline" className="py-24 px-6 md:px-12 bg-luxury-charcoal relative z-20 font-sans overflow-hidden border-t border-luxury-gold/10">
      
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-luxury-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-luxury-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Header Container */}
      <div className="text-center max-w-2xl mb-24 mx-auto flex flex-col items-center">
        <span className="text-xxs tracking-[0.3em] text-luxury-gold font-semibold uppercase mb-3 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-luxury-gold fill-luxury-gold/10 animate-spin-slow" /> THE SACRED PATH
        </span>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-luxury-gold-light tracking-wide font-bold">
          Events & Celebrations
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent my-6" />
        <p className="font-serif-display text-base md:text-lg text-luxury-ivory/80 italic">
          Please join us at the auspicious times to bless us as we embark on this sacred journey of marriage.
        </p>
      </div>

      {/* Vertical Timeline Wrapper */}
      <div className="relative max-w-5xl mx-auto py-8">
        
        {/* Golden Central Spine Line with fading extremes */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-luxury-gold/40 to-transparent -translate-x-[1px] hidden sm:block" />

        {/* Dynamic Mapping over standard event arrays */}
        <div id="timeline-v-stack" className="space-y-16 md:space-y-24 relative">
          {WEDDING_EVENTS.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={event.id} 
                id={`timeline-node-${event.id}`}
                className="flex flex-col md:flex-row relative items-start"
              >
                {/* Custom Responsive Timeline Node Marker */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 hidden sm:flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 rounded-full bg-luxury-charcoal border-2 border-luxury-gold flex items-center justify-center glow-gold"
                  >
                    <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-luxury-gold-dark to-luxury-gold-light animate-pulse" />
                  </motion.div>
                </div>

                {/* Sub-Layout mapping based on column parity (even vs odd) */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:order-last md:pl-16'}`}>
                  
                  {/* Outer Framed Card utilizing custom scroll animations */}
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.98 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      boxShadow: "0 4px 30px rgba(197, 168, 92, 0.1)"
                    }}
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0 10px 40px rgba(197, 168, 92, 0.25)"
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="glass-panel group max-w-xl mx-auto rounded-3xl overflow-hidden border border-luxury-gold/20 duration-500 hover:border-luxury-gold/50 cursor-pointer text-left focus:outline-none"
                  >
                    {/* Event Banner Image with soft parallax overflow */}
                    <div className="h-56 relative overflow-hidden select-none">
                      <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal via-transparent to-transparent opacity-95 z-10" />
                      
                      {/* Ceremony Thumbnail Image */}
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {/* Header overlay badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <span className="px-3.5 py-1 text-[10px] sm:text-xxs tracking-widest font-sans font-medium rounded-full bg-[#121212]/92 text-luxury-gold-light border border-luxury-gold/20 backdrop-blur-md">
                          {event.date}
                        </span>
                      </div>
                    </div>

                    {/* Meta Fields Content Body */}
                    <div className="p-6 md:p-8 space-y-4">
                      
                      {/* Event Heading Title */}
                      <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-wide text-luxury-gold-light group-hover:text-luxury-gold duration-300">
                        {event.title}
                      </h3>

                      <div className="flex flex-col gap-2.5 text-xs text-luxury-ivory/80">
                        {/* Time */}
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-luxury-gold" />
                          <span className="font-semibold tracking-wide uppercase text-xxs font-sans">{event.time}</span>
                        </div>

                        {/* Venue */}
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-luxury-gold mt-0.5 shrink-0" />
                          <span className="leading-relaxed font-light">{event.venue}</span>
                        </div>
                      </div>

                      {/* Descriptive narrative */}
                      <p className="text-xs text-luxury-ivory/60 leading-relaxed font-light">
                        {event.description}
                      </p>

                      {/* Separator */}
                      <div className="w-full h-[1px] bg-gradient-to-r from-[#181818] via-luxury-gold/20 to-[#181818]" />

                      {/* Map Interaction trigger action */}
                      <div className="pt-2">
                        <a 
                          href={event.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          id={`maps-redirect-btn-${event.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 text-xxs tracking-wider uppercase font-medium text-[#121212] bg-gradient-to-tr from-luxury-gold-dark via-luxury-gold to-luxury-gold-light rounded-full shadow-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-xl active:scale-95 hover:brightness-105 border border-luxury-gold/20"
                        >
                          <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                          <span>Open Google Maps</span>
                        </a>
                      </div>

                    </div>
                  </motion.div>

                </div>

                {/* Right side alignment spacing filler column */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
