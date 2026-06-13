import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, Sparkles } from "lucide-react";

interface AccessibilityToggleProps {
  isHighContrast: boolean;
  onToggle: () => void;
}

export default function AccessibilityToggle({ isHighContrast, onToggle }: AccessibilityToggleProps) {
  return (
    <div className="fixed bottom-6 left-6 z-[9990] select-none">
      <motion.button
        id="accessibility-high-contrast-toggle"
        onClick={onToggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className={`flex items-center gap-2.5 px-4 py-3.5 rounded-full border-2 transition-all duration-300 shadow-xl cursor-pointer ${
          isHighContrast
            ? "bg-white border-white text-black font-black shadow-[0_4px_20px_rgba(255,255,255,0.4)]"
            : "bg-stone-950/95 border-gold/40 text-gold hover:border-gold hover:text-white hover:bg-[#121212] shadow-[0_4px_15px_rgba(201,168,76,0.15)]"
        }`}
        title={isHighContrast ? "Disable High Contrast Accessibility" : "Enable High Contrast Accessibility"}
        aria-label={isHighContrast ? "Disable High Contrast mode" : "Enable High Contrast mode"}
      >
        <div className="relative flex items-center justify-center shrink-0">
          {isHighContrast ? (
            <Eye className="w-4 h-4 text-black animate-pulse" />
          ) : (
            <EyeOff className="w-4 h-4 text-gold group-hover:text-white transition-colors" />
          )}
        </div>
        <div className="flex flex-col items-start leading-none text-left">
          <span className="font-sans text-[9px] uppercase tracking-widest font-black block">
            {isHighContrast ? "STARK LEGIBILITY ON" : "HIGH-CONTRAST MODE"}
          </span>
          <span className={`font-mono text-[7px] tracking-wider uppercase block mt-0.5 ${isHighContrast ? "text-stone-700" : "text-gray-500"}`}>
            {isHighContrast ? "Click to reset" : "Better Accessibility"}
          </span>
        </div>
        {isHighContrast && (
          <motion.div
            layoutId="glow-spark"
            className="absolute -top-1 -right-1 bg-yellow-400 text-black p-0.5 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Sparkles className="w-2.5 h-2.5" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}
