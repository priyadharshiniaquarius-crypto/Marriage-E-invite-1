import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Heart, Sparkles } from 'lucide-react';

// Live Synthesizer Engine for Classical Indian Tanpura Drone & Meditative Plucks
class SitarTanpuraSynth {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private pluckInterval: any = null;
  private isSynthesizing: boolean = false;
  private baseFreq: number = 130.81; // C3 (Sa)

  start(volume: number) {
    if (this.isSynthesizing) return;
    
    try {
      const AudioCtxClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;
      
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Create a multi-harmonic meditative background Indian Drone (Tanpura structure)
      const droneSpecs = [
        { type: 'triangle' as const, freqMult: 1.0, vol: 0.16 },  // fundamental C3 (Sa)
        { type: 'sine' as const, freqMult: 1.5, vol: 0.12 },      // fifth G3 (Pa)
        { type: 'sine' as const, freqMult: 2.0, vol: 0.10 },      // octave C4 (Sa)
        { type: 'triangle' as const, freqMult: 3.0, vol: 0.05 },  // vocal fifth G4 (Pa)
        { type: 'sine' as const, freqMult: 4.0, vol: 0.02 },      // shimmer octave C5 (Sa)
      ];

      droneSpecs.forEach(spec => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        
        osc.type = spec.type;
        osc.frequency.setValueAtTime(this.baseFreq * spec.freqMult, this.ctx.currentTime);
        
        // Add detuning for lush acoustic-buzzing chorus simulation (Javari vibe)
        osc.detune.setValueAtTime((Math.random() - 0.5) * 14, this.ctx.currentTime);

        // Constant gain
        oscGain.gain.setValueAtTime(spec.vol, this.ctx.currentTime);
        
        // Slow organic breathing LFO volume modulations
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.06 + Math.random() * 0.04, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(spec.vol * 0.4, this.ctx.currentTime);
        
        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);
        
        osc.connect(oscGain);
        oscGain.connect(this.masterGain);
        
        lfo.start();
        osc.start();
        
        this.oscillators.push({ osc, gain: oscGain });
      });

      // Generative soft sitar-plucking scale sweeps (subset of Raga Kalyani: Sa, Re, Ga, Pa, Dha, Sa)
      const ragaKalyaniScale = [1.0, 1.125, 1.25, 1.5, 1.6875, 2.0];
      let pluckCount = 0;

      const triggerPluck = () => {
        if (!this.ctx || !this.masterGain) return;
        
        const noteFactor = ragaKalyaniScale[pluckCount % ragaKalyaniScale.length];
        pluckCount++;
        
        const pluckOsc = this.ctx.createOscillator();
        const pluckGain = this.ctx.createGain();
        
        // Sharpen the sound to feel like a high sitar pluck using a resonating highpass/bandpass
        const bandpass = this.ctx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(1100, this.ctx.currentTime);
        bandpass.Q.setValueAtTime(3.5, this.ctx.currentTime);

        pluckOsc.type = 'sawtooth';
        pluckOsc.frequency.setValueAtTime(this.baseFreq * noteFactor * 2, this.ctx.currentTime);
        
        const now = this.ctx.currentTime;
        pluckGain.gain.setValueAtTime(0.0, now);
        pluckGain.gain.linearRampToValueAtTime(0.06, now + 0.04); // soft strike
        pluckGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2); // long decay resonance

        pluckOsc.connect(bandpass);
        bandpass.connect(pluckGain);
        pluckGain.connect(this.masterGain);
        
        pluckOsc.start(now);
        pluckOsc.stop(now + 3.5);
      };

      triggerPluck();
      this.pluckInterval = setInterval(triggerPluck, 4000);
      this.isSynthesizing = true;
    } catch (err) {
      console.warn("Digital Synth start failed:", err);
    }
  }

  setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.1);
    }
  }

  stop() {
    if (!this.isSynthesizing) return;
    
    clearInterval(this.pluckInterval);
    this.pluckInterval = null;
    
    this.oscillators.forEach(o => {
      try { o.osc.stop(); } catch (e) {}
    });
    this.oscillators = [];
    
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {}
      this.ctx = null;
    }
    this.isSynthesizing = false;
  }
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.4);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);
  const [isSynthActive, setIsSynthActive] = useState<boolean>(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SitarTanpuraSynth | null>(null);

  // Fallback chain list of high-quality Indian traditional audio URLs to prevent 'no supported sources'
  const audioUrls = [
    // 1. Direct Web Archive loop
    "https://archive.org/download/sitar-raga-alap/Sitar_Raga_Alap.mp3",
    // 2. Wikipedia Commons Direct OGG
    "https://upload.wikimedia.org/wikipedia/commons/2/24/Sitar_Raga_Alap.ogg",
    // 3. Reliable instrument test URL from Esphome
    "https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3"
  ];

  const currentUrlIndexRef = useRef<number>(0);

  // Set up synth reference on load
  useEffect(() => {
    synthRef.current = new SitarTanpuraSynth();
    return () => {
      if (synthRef.current) {
        synthRef.current.stop();
      }
    };
  }, []);

  // Soft starter helper
  const playSwarSynthesizer = () => {
    if (synthRef.current) {
      const activeVol = isMuted ? 0 : volume;
      synthRef.current.start(activeVol);
      setIsSynthActive(true);
      setIsPlaying(true);
      setShowTooltip(false);
    }
  };

  const playNetworkAudio = (sourceListIndex: number) => {
    if (sourceListIndex >= audioUrls.length) {
      console.log("All audio URLs rejected. Shifting seamlessly to Live traditional Sitar/Tanpura synthesiser.");
      playSwarSynthesizer();
      return;
    }

    // Clean up previous audio node completely
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    try {
      const audio = new Audio(audioUrls[sourceListIndex]);
      audio.loop = true;
      audio.volume = isMuted ? 0 : volume;
      audioRef.current = audio;

      // Handle decoding/loading errors instantly by stepping to next source or triggering synth
      audio.addEventListener('error', () => {
        console.warn(`URL failed to load: ${audioUrls[sourceListIndex]}. Shifting to next source.`);
        currentUrlIndexRef.current = sourceListIndex + 1;
        playNetworkAudio(currentUrlIndexRef.current);
      });

      audio.play()
        .then(() => {
          setIsPlaying(true);
          setIsSynthActive(false);
          setShowTooltip(false);
        })
        .catch((err) => {
          // If browser blocked autoplay, let UI state follow gracefully
          console.log("Network autoplay request deferred or blocked by browser policies.");
          setIsPlaying(false);
        });
    } catch (e) {
      console.warn("Audio creation failed, falling back", e);
      currentUrlIndexRef.current = sourceListIndex + 1;
      playNetworkAudio(currentUrlIndexRef.current);
    }
  };

  useEffect(() => {
    // Attempt autoplay of primary sound upon mounting
    playNetworkAudio(0);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (synthRef.current) {
        synthRef.current.stop();
      }
    };
  }, []);

  // Sync state modifications with either the active HTMLAudioElement or the Live Synthesizer Node
  useEffect(() => {
    const activeVol = isMuted ? 0 : volume;
    if (audioRef.current) {
      audioRef.current.volume = activeVol;
    }
    if (isSynthActive && synthRef.current) {
      synthRef.current.setVolume(activeVol);
    }
  }, [volume, isMuted, isSynthActive]);

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (synthRef.current) {
        synthRef.current.stop();
        setIsSynthActive(false);
      }
      setIsPlaying(false);
    } else {
      if (isSynthActive) {
        playSwarSynthesizer();
      } else {
        // Keep playing the current index, fallback to synth if index is exhausted
        playNetworkAudio(currentUrlIndexRef.current);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div id="music-player-container" className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans select-none">
      {/* Dynamic invitation tooltip invite users to play music */}
      {showTooltip && (
        <div id="audio-invite-tooltip" className="mb-2.5 px-4 py-2 bg-luxury-charcoal/95 border border-luxury-gold/30 rounded-xl text-xs text-luxury-gold-light tracking-wide shadow-lg flex items-center gap-2 animate-[bounce_2s_infinite]">
          <Heart className="w-3.5 h-3.5 text-luxury-gold animate-pulse fill-luxury-gold/20" />
          <span>Tap to experience traditional Shahnai & Sitar</span>
        </div>
      )}

      {/* Main audio player glassmorphism control drawer */}
      <div 
        id="audio-controls-panel" 
        className="flex items-center gap-3 p-2 bg-luxury-charcoal/90 backdrop-blur-md border border-luxury-gold/30 rounded-full shadow-2xl hover:border-luxury-gold/60 transition-all duration-500 hover:scale-105 glow-gold"
      >
        <button
          id="btn-play-pause-toggle"
          onClick={togglePlay}
          className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-[#121212] font-semibold tracking-wide transition-all duration-300 hover:rotate-6 active:scale-95 focus:outline-none cursor-pointer"
          title={isPlaying ? "Pause Ambient" : "Play Indian Wedding Soundscape"}
        >
          {/* Wave animation behind music icon when active */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-luxury-gold animate-ping opacity-25"></span>
          )}
          {isPlaying ? (
            <Pause className="w-5 h-5 text-luxury-charcoal" fill="currentColor" />
          ) : (
            <Play className="w-5 h-5 translate-x-0.5 text-luxury-charcoal" fill="currentColor" />
          )}
        </button>

        {/* Volume controls expander */}
        <div id="volume-fader-container" className="flex items-center gap-2 pr-3 pl-1 max-w-[140px] transition-all duration-500 ease-in-out">
          <button
            id="btn-inline-mute-toggle"
            onClick={toggleMute}
            className="text-luxury-gold-light hover:text-luxury-gold hover:scale-110 duration-200 cursor-pointer"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4.5 h-4.5" />
            ) : (
              <Volume2 className="w-4.5 h-4.5" />
            )}
          </button>
          
          <input
            id="input-audio-volume-regulator"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-luxury-gold-dark/30 rounded-lg appearance-none cursor-pointer accent-luxury-gold focus:outline-none"
          />
        </div>

        {/* Streaming/Synth Status Indicator badge */}
        <div 
          id="music-vinyl-status" 
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-luxury-charcoal border border-luxury-gold/25 transition-all ${
            isPlaying ? 'text-luxury-gold animate-pulse' : 'text-luxury-gold/40'
          }`}
          title={isSynthActive ? "Synthesized Traditional Indian Tanpura Drone Active" : "Traditional Sitar Audio Streaming"}
        >
          {isSynthActive ? (
            <>
              <Sparkles className="w-3 h-3 text-luxury-gold-light animate-spin" />
              <span className="text-[10px] uppercase font-semibold font-sans tracking-widest text-luxury-gold-light">Tanpura Synth</span>
            </>
          ) : (
            <>
              <Music className={`w-3 h-3 ${isPlaying ? 'spin' : ''}`} />
              <span className="text-[10px] uppercase font-semibold font-sans tracking-widest">Sitar Sangeet</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
