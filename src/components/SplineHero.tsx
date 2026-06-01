import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Heart, ArrowDown, Shield } from 'lucide-react';
import { BRIDE_NAME, GROOM_NAME } from '../data';

export default function SplineHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle subtle interactive 3D mouse parallax response
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Premium Spline Scene with floating gold ring & glowing mandala particles
  const splineSceneUrl = "https://my.spline.design/interactiveglowingorb-5e4a5db21d0ea69818ab4fa1fed90d5a/";

  return (
    <div id="hero-fullscreen-container" className="relative min-h-screen w-full flex flex-col justify-between items-center bg-luxury-charcoal overflow-hidden select-none border-8 border-luxury-border">
      
      {/* Decorative Corner Elements (Traditional Kolam/Mandala patterns) */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-25 border-l-2 border-t-2 border-luxury-gold m-4 md:m-8 rounded-tl-full pointer-events-none z-10"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-25 border-r-2 border-b-2 border-luxury-gold m-4 md:m-8 rounded-br-full pointer-events-none z-10"></div>

      {/* 3D Spline Backdrop with soft gold particle blur layers */}
      <div 
        id="hero-3d-canvas-wrapper" 
        className="absolute inset-0 z-0 select-none pointer-events-auto flex items-center justify-center transition-transform duration-1000 ease-out"
        style={{
          transform: `scale(1.05) translate(${mousePosition.x * 12}px, ${mousePosition.y * 12}px)`,
        }}
      >
        <iframe 
          id="spline-3d-iframe"
          src={splineSceneUrl}
          className="w-full h-full border-none pointer-events-auto opacity-70"
          title="Spline 3D Lotus & Ring Representation"
          onLoad={() => setIsLoaded(true)}
          allow="autoplay; fullscreen"
        />

        {/* Ambient Dark radial overlay and floating Mandala structure */}
        <div id="spline-depth-blend" className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal via-luxury-charcoal/20 to-luxury-charcoal pointer-events-none" />
        
        {/* Floating Mandala (SVG Pattern) Overlay from Sophisticated Dark design */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 z-0">
          <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.12)_0%,transparent_70%)] blur-2xl"></div>
          <div className="absolute w-[240px] h-[240px] sm:w-[400px] sm:h-[400px] border-[0.5px] border-luxury-gold/25 rounded-full flex items-center justify-center animate-[spin_120s_linear_infinite]">
            <div className="w-[190px] h-[190px] sm:w-[320px] sm:h-[320px] border-[0.5px] border-luxury-gold/20 rounded-full rotate-45 flex items-center justify-center">
              <div className="w-[140px] h-[140px] sm:w-[240px] sm:h-[240px] border-[0.5px] border-luxury-gold/15 rounded-full -rotate-45"></div>
            </div>
          </div>
        </div>

        <div id="spline-radial-vignette" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_20%,rgba(10,10,10,0.95)_90%)] pointer-events-none" />
      </div>

      {/* Luxury CSS particle system simulation representing floating temple/marigold petals on failure or as overlay */}
      <div id="floating-petals-simulation" className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(12)].map((_, i) => {
          const delay = i * 2.1;
          const left = `${10 + (i * 8)}%`;
          const duration = 12 + (i % 3) * 4;
          return (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-luxury-gold to-orange-400 opacity-20 pointer-events-none"
              style={{
                left,
                top: '-5%',
                animation: `floatingParticles ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* App Header Bar inside Hero */}
      <header id="hero-header-bar" className="w-full px-6 py-6 md:px-12 flex justify-between items-center relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-full border border-luxury-gold/40 flex items-center justify-center">
            <span className="font-serif text-xs text-luxury-gold font-bold">MK</span>
          </div>
          <span className="font-serif text-xs md:text-sm text-luxury-gold tracking-[0.25em] font-medium hidden sm:inline">THE ETERNAL UNION</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="px-4 py-1.5 rounded-full border border-luxury-gold/20 bg-luxury-charcoal/40 backdrop-blur-md text-[9px] md:text-xxs text-luxury-gold-light font-medium tracking-[0.2em] flex items-center gap-2 uppercase glow-gold"
        >
          <Calendar className="w-3 h-3 text-luxury-gold" />
          <span>August 16, 2026 • Chennai</span>
        </motion.div>
      </header>

      {/* Main Hero Invitation Card Typography Overlay */}
      <main id="hero-main-typography" className="relative z-20 text-center px-4 md:px-6 py-12 flex flex-col items-center justify-center flex-grow max-w-4xl">
        
        {/* Subtle top sacred symbol representation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6 flex flex-col items-center gap-1.5"
        >
          <Sparkles className="w-5 h-5 text-luxury-gold animate-pulse" />
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent" />
        </motion.div>

        {/* Cinematic Prose Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-serif-display text-sm md:text-xl lg:text-2xl text-luxury-gold-light italic tracking-widest leading-relaxed mb-6 font-light"
        >
          With the divine blessings of our ancestors, we share our joy
        </motion.p>

        {/* Majestic Names with AnimateGoldShine */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 my-4"
        >
          <span className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-luxury-gold font-extrabold tracking-wider filter drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] animate-gold-shine">
            {BRIDE_NAME}
          </span>
          <div className="flex items-center justify-center py-2 md:py-0">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-luxury-gold/80 animate-pulse fill-luxury-gold/10" />
          </div>
          <span className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-luxury-gold font-extrabold tracking-wider filter drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] animate-gold-shine">
            {GROOM_NAME}
          </span>
        </motion.div>

        {/* Elegant subtext with golden scroll trigger */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="font-serif text-xs md:text-base tracking-[0.25em] uppercase text-luxury-ivory/80 mt-6 max-w-lg leading-relaxed font-light"
        >
          Two souls, one sacred path.
          <span className="block text-[10px] md:text-xs text-luxury-gold mt-2 font-serif-display italic tracking-[0.15em] lowercase">
            you are cordially invited to witness our eternal union
          </span>
        </motion.p>

        {/* Traditional Vedic Verse card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.5, delay: 1.4 }}
          className="mt-8 px-6 py-2 rounded-xl border border-luxury-gold/10 bg-luxury-charcoal/35 backdrop-blur-sm max-w-md"
        >
          <p className="font-serif-display text-xxs md:text-xs italic tracking-widest text-[#d8c289]">
            "Om Mangalyam Thanthunanena Mama Jeevana Hethuna: <br />
            Kanthe Badhnami Shubbage Sanjeeva Saradha Sathadhari"
          </p>
        </motion.div>
      </main>

      {/* Scroll Down Cue */}
      <footer id="hero-footer" className="pb-8 w-full flex flex-col items-center justify-center relative z-20">
        <motion.a
          href="#bride-groom"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 1.6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="text-[10px] tracking-[0.3em] font-sans text-luxury-gold group-hover:text-luxury-gold-light uppercase transition-colors duration-300">
            Begin the Story
          </span>
          <ArrowDown className="w-4 h-4 text-luxury-gold group-hover:scale-125 transition-transform duration-300" />
        </motion.a>
      </footer>
    </div>
  );
}
