import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Sparkles, Phone, MessageSquare, AlertCircle, Heart } from 'lucide-react';
import { WHATSAPP_PHONE, WEDDING_EVENTS, BRIDE_NAME, GROOM_NAME } from '../data';
import { RSVPResponse } from '../types';

export default function RSVPForm() {
  const [formData, setFormData] = useState<RSVPResponse>({
    name: '',
    email: '',
    phone: '',
    attending: 'yes',
    guests: 1,
    events: ['muhurtham'],
    message: '',
    dietary: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg(null);
  };

  const handleCheckboxChange = (eventId: string) => {
    setFormData((prev) => {
      const isSelected = prev.events.includes(eventId);
      const newEvents = isSelected
        ? prev.events.filter((id) => id !== eventId)
        : [...prev.events, eventId];
      return { ...prev, events: newEvents };
    });
  };

  // Build beautiful custom WhatsApp message string and redirect
  const sendWhatsAppRSVP = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg("Please fill in your Name to format the RSVP message.");
      return;
    }

    const attendanceText = formData.attending === 'yes' 
      ? `✅ YES, I will happily attend with ${formData.guests} guest(s)!`
      : `❌ Deeply regretful, I won't be able to make it.`;

    const eventsText = formData.attending === 'yes'
      ? `I look forward to attending:\n${formData.events.map(id => `• ${id.toUpperCase()}`).join('\n')}`
      : `Wishing you both a blessed journey of love!`;

    const customMessageText = formData.message ? `\n\nPersonal Wishing: "${formData.message}"` : '';

    const finalTexBlock = 
`Namaskar! ✨
This is ${formData.name} responding to the Wedding Invitation of Meenakshi & Karthik.

${attendanceText}
${eventsText}${customMessageText}

With warm regards.`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(finalTexBlock)}`;
    
    // Redirect cleanly
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg("Full Name is required.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg("Contact Phone number is required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    // Dynamic submit latency for immersive luxury look
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Persist to local storage to mimic database sync
      try {
        const stored = localStorage.getItem('wedding_rsvps');
        const list = stored ? JSON.parse(stored) : [];
        list.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('wedding_rsvps', JSON.stringify(list));
      } catch (err) {
        console.error("Local storage sync error:", err);
      }
    }, 1800);
  };

  return (
    <section id="rsvp-section" className="py-24 px-6 md:px-12 bg-luxury-charcoal relative z-20 font-sans border-t border-luxury-gold/10">
      
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-luxury-gold/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Header Info */}
      <div className="text-center max-w-2xl mb-16 mx-auto flex flex-col items-center">
        <span className="text-xxs tracking-[0.3em] text-luxury-gold font-semibold uppercase mb-3 flex items-center gap-1.5">
          <Send className="w-3.5 h-3.5 text-luxury-gold" /> RESPONSE REQUESTED
        </span>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-luxury-gold-light tracking-wide font-bold">
          R.S.V.P & Blessings
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent my-6" />
        <p className="font-serif-display text-base md:text-lg text-luxury-ivory/80 italic">
          Kindly RSVP by August 1, 2026, to help us accommodate you with traditional hospitality.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start px-4">
        
        {/* Left column: Traditional Cards / Instructions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-luxury-gold/15 glow-gold">
            <h3 className="font-serif text-xl sm:text-2xl text-luxury-gold-light tracking-wide font-bold mb-4 flex items-center gap-2">
              <Heart className="text-luxury-gold w-5 h-5 fill-luxury-gold/20 mr-1.5 animate-pulse" />
              Easy RSVP
            </h3>
            <p className="text-xs sm:text-sm text-luxury-ivory/70 leading-relaxed mb-6 font-light">
              Respond immediately via WhatsApp using our quick-message builder. This compiles your selections and formats a formal template response.
            </p>
            
            <button
              onClick={sendWhatsAppRSVP}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-serif text-xxs sm:text-xs tracking-widest uppercase font-semibold text-[#121212] bg-gradient-to-tr from-emerald-500 via-green-400 to-emerald-300 hover:brightness-110 shadow-lg glow-gold transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer border border-emerald-500/20"
              title="RSVP with WhatsApp"
            >
              <MessageSquare className="w-4 h-4 fill-current mr-1" />
              <span>RSVP via WhatsApp (Primary)</span>
            </button>

            <div className="flex items-center gap-2 my-6 text-luxury-ivory/30 text-center">
              <span className="w-full h-[1px] bg-luxury-gold/10" />
              <span className="text-[10px] tracking-widest font-sans uppercase shrink-0">OR FILL IN BELOW</span>
              <span className="w-full h-[1px] bg-luxury-gold/10" />
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-xxs text-luxury-ivory/60">
                <CheckCircle className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span>Accommodation reservations are managed directly based on your RSVP details.</span>
              </div>
              <div className="flex items-start gap-3 text-xxs text-luxury-ivory/60">
                <CheckCircle className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span>Outstation guests' luxury travel hosts can use this configuration to arrange airport logistics.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive form */}
        <div id="rsvp-alternative-form-box" className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-luxury-gold/15 glow-gold select-text relative">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="rsvp-form-edit"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {errorMsg && (
                    <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-xs rounded-xl flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xxs tracking-widest text-luxury-gold uppercase font-medium">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Sundar Raman"
                        className="w-full bg-[#181818]/80 text-luxury-ivory text-xs px-4 py-3 border border-luxury-gold/15 hover:border-luxury-gold/30 focus:border-luxury-gold rounded-xl transition-all focus:outline-none focus:ring-1 focus:ring-luxury-gold/35"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xxs tracking-widest text-luxury-gold uppercase font-medium">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g., +91 98765 43210"
                        className="w-full bg-[#181818]/80 text-luxury-ivory text-xs px-4 py-3 border border-luxury-gold/15 hover:border-luxury-gold/30 focus:border-luxury-gold rounded-xl transition-all focus:outline-none focus:ring-1 focus:ring-luxury-gold/35"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xxs tracking-widest text-luxury-gold uppercase font-medium">Email Address (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g., sundar@example.com"
                      className="w-full bg-[#181818]/80 text-luxury-ivory text-xs px-4 py-3 border border-luxury-gold/15 hover:border-luxury-gold/30 focus:border-luxury-gold rounded-xl transition-all focus:outline-none"
                    />
                  </div>

                  {/* Attending Radio */}
                  <div className="space-y-3">
                    <label className="text-xxs tracking-widest text-luxury-gold uppercase block font-medium">Will you attend?</label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className={`p-4 rounded-xl border flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ${
                        formData.attending === 'yes'
                          ? 'bg-luxury-gold/15 border-luxury-gold/60 text-luxury-gold-light font-medium'
                          : 'bg-[#181818]/40 border-luxury-gold/10 text-luxury-ivory/50 hover:bg-[#181818]/80'
                      }`}>
                        <input
                          type="radio"
                          name="attending"
                          value="yes"
                          checked={formData.attending === 'yes'}
                          onChange={() => setFormData(prev => ({ ...prev, attending: 'yes' }))}
                          className="sr-only"
                        />
                        <span className="text-[11px] tracking-wide uppercase">Joyfully Attend</span>
                      </label>

                      <label className={`p-4 rounded-xl border flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ${
                        formData.attending === 'no'
                          ? 'bg-rose-950/20 border-rose-500/40 text-rose-300'
                          : 'bg-[#181818]/40 border-luxury-gold/10 text-luxury-ivory/50 hover:bg-[#181818]/80'
                      }`}>
                        <input
                          type="radio"
                          name="attending"
                          value="no"
                          checked={formData.attending === 'no'}
                          onChange={() => setFormData(prev => ({ ...prev, attending: 'no' }))}
                          className="sr-only"
                        />
                        <span className="text-[11px] tracking-wide uppercase text-center">Regretfully Decline</span>
                      </label>
                    </div>
                  </div>

                  {/* Conditionally rendered form elements */}
                  {formData.attending === 'yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.4 }}
                      className="space-y-5 overflow-hidden"
                    >
                      {/* Guest Counter */}
                      <div className="space-y-2">
                        <label className="text-xxs tracking-widest text-luxury-gold uppercase font-medium">Number of Guests (including you)</label>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          className="w-full bg-[#181818]/80 text-luxury-ivory text-xs px-4 py-3 border border-luxury-gold/15 focus:border-luxury-gold rounded-xl cursor-pointer"
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests & family</option>
                        </select>
                      </div>

                      {/* Event Attendance Checkbox list */}
                      <div className="space-y-2.5">
                        <label className="text-xxs tracking-widest text-luxury-gold uppercase block font-medium">Which ceremonies will you join?</label>
                        <div id="events-checklist" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {WEDDING_EVENTS.map((event) => {
                            const isChecked = formData.events.includes(event.id);
                            return (
                              <label
                                key={event.id}
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer select-none transition-all ${
                                  isChecked
                                    ? 'bg-luxury-gold/10 border-luxury-gold/45 text-luxury-gold-light'
                                    : 'bg-[#181818]/60 border-luxury-gold/10 text-luxury-ivory/60 hover:bg-[#181818]'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleCheckboxChange(event.id)}
                                  className="w-4 h-4 rounded text-luxury-gold accent-luxury-gold/90 border-luxury-gold/30 bg-luxury-charcoal"
                                />
                                <div className="text-left font-sans">
                                  <div className="text-[11px] font-semibold tracking-wide uppercase leading-tight">{event.title}</div>
                                  <div className="text-[9px] text-luxury-ivory/40 block mt-0.5">{event.date}</div>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Wishes message */}
                  <div className="space-y-2">
                    <label className="text-xxs tracking-widest text-luxury-gold uppercase font-medium">Warm Blessings / Wishes</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="May your life together be filled with golden moments..."
                      className="w-full bg-[#181818]/80 text-luxury-ivory text-xs px-4 py-3 border border-luxury-gold/15 focus:border-luxury-gold rounded-xl transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="btn-rsvp-submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-serif text-xxs sm:text-xs tracking-widest uppercase font-semibold text-[#121212] bg-gradient-to-tr from-luxury-gold-dark via-luxury-gold to-luxury-gold-light shadow-lg glow-gold transition-all duration-300 hover:scale-[1.01] active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-[#121212] border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Response & Blessings</span>
                      </>
                    )}
                  </button>

                </motion.form>
              ) : (
                <motion.div
                  key="rsvp-form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center justify-center space-y-6"
                >
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 rounded-full border border-luxury-gold flex items-center justify-center bg-luxury-gold/10"
                  >
                    <CheckCircle className="w-10 h-10 text-luxury-gold" />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl sm:text-3xl text-luxury-gold-light tracking-wide font-bold">
                      RESPONSE RECEIVED!
                    </h3>
                    <p className="font-serif-display text-base italic text-[#c8c8c8] max-w-sm mx-auto leading-relaxed">
                      Thank you so much, {formData.name}. Your blessings have warmed our hearts.
                    </p>
                  </div>

                  <div className="bg-[#181818]/60 p-5 rounded-2xl border border-luxury-gold/15 max-w-md w-full text-left space-y-3 font-sans text-xxs tracking-wider uppercase text-luxury-gold">
                    <div className="text-luxury-ivory/40">Response Details:</div>
                    <div className="flex justify-between border-b border-luxury-gold/10 pb-2.5">
                      <span>Attendance:</span>
                      <span className="font-semibold text-luxury-gold-light">{formData.attending === 'yes' ? "ATTENDING" : "DECLINED"}</span>
                    </div>
                    {formData.attending === 'yes' && (
                      <>
                        <div className="flex justify-between border-b border-luxury-gold/10 pb-2.5">
                          <span>Confirmed Guests:</span>
                          <span className="font-semibold text-luxury-gold-light">{formData.guests} Guest(s)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ceremonies:</span>
                          <span className="font-semibold text-luxury-gold-light">{formData.events.length} Selected</span>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2 rounded-full border border-luxury-gold/30 bg-transparent text-luxury-gold text-xxs uppercase tracking-wider hover:border-luxury-gold hover:text-luxury-gold-light transition-all cursor-pointer"
                  >
                    Edit RSVP
                  </button>

                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <Sparkles className="w-5 h-5 text-luxury-gold animate-bounce" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>

    </section>
  );
}
