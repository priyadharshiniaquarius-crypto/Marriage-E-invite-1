import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Grid, ZoomIn, Heart, SlidersHorizontal } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ceremonies' | 'groom' | 'bride' | 'portraits'>('all');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  // Filter items matching state
  const filteredItems = GALLERY_ITEMS.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  // Handle keyboard events (ESC, Left, Right) to browseLightbox easily
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === 'Escape') setActiveItemIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, filteredItems]);

  const handleNext = () => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) => 
      prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) => 
      prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
    );
  };

  const categories: { label: string; value: typeof selectedCategory }[] = [
    { label: "ALL", value: "all" },
    { label: "CELEMONIES", value: "ceremonies" },
    { label: "THE BRIDE", value: "bride" },
    { label: "THE GROOM", value: "groom" },
    { label: "PORTRAITS", value: "portraits" }
  ];

  return (
    <section id="gallery-grid" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#181818] via-luxury-charcoal to-[#181818] relative z-20 font-sans border-t border-luxury-gold/10">
      
      {/* Decorative ambient rays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-luxury-gold/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Header Panel */}
      <div className="text-center max-w-2xl mb-16 mx-auto flex flex-col items-center">
        <span className="text-xxs tracking-[0.3em] text-luxury-gold font-semibold uppercase mb-3 flex items-center gap-1.5 animate-pulse">
          <Heart className="w-3.5 h-3.5 text-luxury-gold fill-luxury-gold/20" /> MEMORIES PRESERVED
        </span>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-luxury-gold-light tracking-wide font-bold">
          The Wedding Gallery
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent my-6" />
        <p className="font-serif-display text-base md:text-lg text-luxury-ivory/80 italic">
          Capturing beautiful chapters of our journey, freezing golden smiles, and preparing for the ultimate step.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div id="gallery-filter-rail" className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-4 mb-16 max-w-3xl mx-auto px-4">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              id={`filter-chip-${cat.value}`}
              onClick={() => {
                setSelectedCategory(cat.value);
                setActiveItemIndex(null); // Reset lightbox queue
              }}
              className={`px-5 py-2.5 rounded-full font-serif text-[10px] sm:text-xxs tracking-[0.2em] font-medium transition-all duration-300 pointer-events-auto border focus:outline-none ${
                isActive 
                  ? 'bg-gradient-to-tr from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-[#121212] border-luxury-gold shadow-lg scale-105'
                  : 'bg-luxury-charcoal/70 text-luxury-ivory/70 border-luxury-gold/10 hover:border-luxury-gold/45 hover:text-luxury-gold-light hover:bg-[#151515]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Elegant Infinite Scrolling / responsive Masonry grid */}
      <div 
        id="masonry-canvas"
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 max-w-6xl mx-auto px-4 md:px-0"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              onClick={() => setActiveItemIndex(index)}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden glass-panel border border-luxury-gold/10 hover:border-luxury-gold/40 shadow-xl cursor-zoom-in glow-gold-hover transition-all duration-500"
            >
              {/* Image element with overlay blur */}
              <div className="relative h-auto overflow-hidden rounded-2xl select-none">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover rounded-2xl transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual hovering card elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/90 via-[#121212]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-serif text-luxury-gold mb-1.5">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg tracking-wider text-luxury-ivory font-semibold flex items-center justify-between">
                    <span>{item.title}</span>
                    <ZoomIn className="w-5 h-5 text-luxury-gold" />
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox full overlay portal */}
      <AnimatePresence>
        {activeItemIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0c0c0cd9] backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8 select-none font-sans"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveItemIndex(null);
            }}
          >
            {/* Control buttons inside portal */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
              <span className="text-xxs tracking-widest text-[#9c9c9c] font-medium font-sans">
                {activeItemIndex + 1} / {filteredItems.length}
              </span>
              <button
                onClick={() => setActiveItemIndex(null)}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-luxury-charcoal/80 border border-luxury-gold/25 text-luxury-gold hover:text-luxury-gold-light hover:border-luxury-gold/60 pointer-events-auto transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Slider container */}
            <div className="relative w-full max-w-4xl h-full max-h-[80vh] flex items-center justify-center px-12">
              
              {/* Previous trigger arrow */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-luxury-charcoal/80 border border-luxury-gold/20 text-luxury-gold hover:text-luxury-gold-light hover:border-luxury-gold/50 pointer-events-auto transition-transform active:scale-95 duration-200"
                title="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Active Lightbox frame */}
              <motion.div 
                key={activeItemIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full flex flex-col justify-center items-center relative pointer-events-none"
              >
                <img 
                  src={filteredItems[activeItemIndex].image} 
                  alt={filteredItems[activeItemIndex].title} 
                  className="max-w-full max-h-[70vh] object-contain rounded-xl border border-luxury-gold/20 shadow-2xl pointer-events-auto"
                  referrerPolicy="no-referrer"
                />

                <div className="mt-5 text-center pointer-events-auto bg-luxury-charcoal/70 px-6 py-2.5 rounded-full border border-luxury-gold/15 backdrop-blur-md">
                  <span className="text-xxs tracking-[0.25em] text-luxury-gold uppercase block mb-1 font-serif">
                    {filteredItems[activeItemIndex].category}
                  </span>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-luxury-ivory tracking-wide">
                    {filteredItems[activeItemIndex].title}
                  </h3>
                </div>
              </motion.div>

              {/* Next trigger arrow */}
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-luxury-charcoal/80 border border-luxury-gold/20 text-luxury-gold hover:text-luxury-gold-light hover:border-luxury-gold/50 pointer-events-auto transition-transform active:scale-95 duration-200"
                title="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>

            {/* Subtle mobile Swipe Indicator */}
            <div className="absolute bottom-6 flex items-center gap-2 text-xxs tracking-widest text-[#6c6c6c] text-center uppercase">
              <SlidersHorizontal className="w-3 h-3 text-luxury-gold/50" />
              <span>Use Arrow Keys Left & Right to Navigate</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
