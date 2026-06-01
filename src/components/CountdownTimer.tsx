import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { WEDDING_DATE } from '../data';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(WEDDING_DATE) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isCompleted: false
        };
      }
      return newTimeLeft;
    };

    // Set initial calculations
    setTimeLeft(calculateTimeLeft());

    // Run interval
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds }
  ];

  if (timeLeft.isCompleted) {
    return (
      <div id="wedding-started-banner" className="flex flex-col items-center justify-center py-6 px-8 rounded-2xl glass-panel glow-gold border border-luxury-gold/30 text-center text-luxury-gold max-w-lg mx-auto">
        <Sparkles className="w-8 h-8 text-luxury-gold animate-pulse mb-3" />
        <h3 className="font-serif text-2xl tracking-widest text-luxury-gold-light">THE CELEBRATION IS UNDERWAY</h3>
        <p className="font-serif-display text-sm italic text-luxury-ivory/80 mt-1">
          Meenakshi and Karthik are uniting in sacred matrimony.
        </p>
      </div>
    );
  }

  return (
    <div id="countdown-wrapper" className="flex flex-col items-center justify-center select-none py-8 md:py-12">
      <div id="countdown-grid" className="grid grid-cols-4 gap-3 sm:gap-6 md:gap-8 max-w-4xl w-full px-4">
        {timeUnits.map((unit, idx) => (
          <div 
            key={idx} 
            id={`countdown-item-${unit.label.toLowerCase()}`}
            className="group flex flex-col items-center p-3 sm:p-5 md:p-6 bg-gradient-to-b from-[#181818]/90 to-luxury-charcoal/95 border border-luxury-gold/15 rounded-xl sm:rounded-2xl shadow-xl hover:border-luxury-gold/40 transition-all duration-500 hover:shadow-2xl hover:scale-105 glow-gold"
          >
            {/* Sliding background subtle shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl sm:rounded-2xl" />

            <span className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-luxury-gold-light font-bold tracking-tight mb-2 drop-shadow-[0_2px_10px_rgba(197,168,92,0.2)]">
              {formatNumber(unit.value)}
            </span>
            <span className="text-[9px] sm:text-xs tracking-[0.15em] text-luxury-ivory/50 font-medium group-hover:text-luxury-gold transition-colors duration-300">
              {unit.label}
            </span>

            {/* Glowing subtle bottom line indicator */}
            <div className="w-8 h-[2px] bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full mt-2.5 opacity-60" />
          </div>
        ))}
      </div>
      
      {/* Visual divider design */}
      <div id="countdown-subtitle" className="flex items-center gap-3 mt-6 text-luxury-gold/60 text-xs tracking-widest uppercase">
        <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-luxury-gold/60" />
        <span className="font-serif text-[10px] md:text-xs">Count Every Auspicious Moment</span>
        <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-luxury-gold/60" />
      </div>
    </div>
  );
}
