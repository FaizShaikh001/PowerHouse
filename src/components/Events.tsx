import React, { useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, MapPin, Sparkles, ExternalLink, Share2, Check } from "lucide-react";
import { useGymData } from "../context/GymDataContext";
import { useTranslation } from "../context/LanguageContext";

export default function Events() {
  const { eventPosts } = useGymData();
  const { t } = useTranslation();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (eventId: string) => {
    // Construct link like current origin + path + hash of event element
    const shareUrl = `${window.location.origin}${window.location.pathname}#event-card-${eventId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(eventId);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    });
  };

  const activeEvents = (eventPosts || []).filter(e => e.isActive);

  return (
    <section id="events" className="relative py-24 bg-[#080808] overflow-hidden">
      {/* Dynamic Ambient Background Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-[#ff4a4a]/2 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-gold uppercase">
              PowerHouse Actions
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white mb-4 uppercase"
          >
            {t("section.events.title")}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-sans text-sm md:text-base"
          >
            {t("section.events.subtitle")}
          </motion.p>
        </div>

        {/* Events Grid */}
        {activeEvents.length === 0 ? (
          <div className="text-center py-16 bg-[#0E0E0E] border border-white/5 rounded-2xl p-8 max-w-lg mx-auto">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-white font-sans font-medium text-lg mb-2">No Scheduled Gatherings</h3>
            <p className="text-gray-500 font-sans text-sm">We are planning biomechanics challenges and fitness masterclasses. Check back shortly!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="gym-events-flow-grid">
            {activeEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-[#0C0C0C] border border-white/5 hover:border-gold/30 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] shadow-xl flex flex-col md:flex-row h-full"
                id={`event-card-${event.id}`}
              >
                {/* Poster Element with Zoom Reflex */}
                <div className="relative md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden bg-zinc-950">
                  <img
                    src={event.image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80"}
                    alt={event.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/10 to-transparent pointer-events-none" />
                  
                  {/* Status pill overlay */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-md border border-white/10">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    <span className="text-[9px] font-mono font-bold tracking-wider text-green-400 capitalize">Open</span>
                  </div>
                </div>

                {/* Info and action panel */}
                <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <h3 className="text-xl font-sans font-bold text-white tracking-tight group-hover:text-gold transition-colors duration-300">
                        {event.title}
                      </h3>
                      <button
                        onClick={() => handleCopyLink(event.id)}
                        className={`p-1.5 rounded-lg border transition-all duration-300 cursor-pointer text-xs flex items-center justify-center gap-1 shrink-0 ${
                          copiedId === event.id
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-white/5 text-stone-400 border-white/5 hover:text-gold hover:border-gold/30 hover:bg-white/10"
                        }`}
                        title="Copy Share Link to Clipboard"
                      >
                        {copiedId === event.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-[9px] font-mono tracking-wider font-extrabold text-emerald-400">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3 h-3" />
                            <span className="text-[9px] font-mono tracking-wider font-medium">SHARE</span>
                          </>
                        )}
                      </button>
                    </div>
                    
                    {/* Time details */}
                    <div className="flex flex-wrap gap-y-2 gap-x-4 mt-3 text-xs font-mono text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        <span>{event.date}</span>
                      </div>
                      {event.time && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gold" />
                          <span>{event.time}</span>
                        </div>
                      )}
                    </div>

                    <p className="mt-4 text-[#A1A1AA] text-xs sm:text-sm line-clamp-3 font-sans leading-relaxed">
                      {event.description}
                    </p>

                    {event.location && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-4 font-sans">
                        <MapPin className="w-3.5 h-3.5 text-[#ff4a4a]" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Submission and registration calls */}
                  <div className="mt-8 pt-4 border-t border-white/5">
                    {event.registrationFormUrl ? (
                      <a
                        href={event.registrationFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`btn-gform-${event.id}`}
                        className="w-full py-3 px-4 bg-gold hover:bg-gold-light text-[#0A0A0A] font-sans font-bold text-xs uppercase tracking-widest rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-gold/20 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Register via Google Form</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <div className="w-full py-2.5 px-4 bg-zinc-900 border border-white/5 text-gray-400 font-sans font-medium text-xs rounded-lg text-center select-none font-mono tracking-wider uppercase">
                        Registration link pending
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

    </section>
  );
}

