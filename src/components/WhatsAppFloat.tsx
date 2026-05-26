import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Calendar, X, ArrowUpRight } from "lucide-react";

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "917757077393"; // Direct Indian format for local Kandari audience context
  const textMessage = "Hi Power House! I would like to schedule an introductory session and inquire about your premier membership programs.";
  const encodedMsg = encodeURIComponent(textMessage);
  const waUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end gap-3 select-none">
      
      {/* Decorative pulse indicator ring */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="p-5 rounded-2xl bg-gradient-to-b from-stone-900 via-stone-950 to-[#121212] border-2 border-gold/45 shadow-[0_15px_40px_rgba(201,168,76,0.25)] text-left w-72 relative overflow-hidden"
          >
            {/* Minimal golden accent */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold via-yellow-600 to-gold" />
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-stone-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-[#C9A84C] uppercase block mb-1">
                  // INSTANT CONNECTIVITY
                </span>
                <h4 className="font-bebas text-xl text-white tracking-wide uppercase">
                  CHAT WITH THE OWNER
                </h4>
                <p className="font-sans text-[11px] text-gray-400 mt-1.5 leading-relaxed">
                  Connect immediately with the club administrator via WhatsApp to secure booking queries or personalized membership terms.
                </p>
              </div>

              {/* Direct Link button */}
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                id="whatsapp-agent-link-direct"
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-green-950/40 border border-green-600/40 text-green-300 hover:bg-green-600 hover:text-[#0A0A0A] font-sans text-xs uppercase tracking-wider font-bold transition-all duration-300"
              >
                <span>OPEN WHATSAPP CHAT</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="flex items-center gap-1.5 justify-center text-[9px] font-mono text-gray-500 uppercase tracking-widest pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                <span>Owner: 07757 077393</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating interactive trigger ball */}
      <motion.button
        id="whatsapp-floating-action-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#121212] via-[#211E18] to-stone-900 border-2 border-gold flex items-center justify-center text-gold shadow-[0_10px_30px_rgba(201,168,76,0.30)] cursor-pointer relative group"
      >
        {/* Animated green ring signal */}
        <span className="absolute -inset-1 rounded-full border border-green-500/20 group-hover:border-green-500/40 animate-ping opacity-75 pointer-events-none" />
        
        {/* Custom WhatsApp branding combined with modern minimalist aesthetic */}
        <div className="relative">
          <MessageSquare className="w-6 h-6 text-gold group-hover:text-white transition-colors duration-200" />
          <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-green-500 border-2 border-stone-900" />
        </div>
      </motion.button>

    </div>
  );
}
