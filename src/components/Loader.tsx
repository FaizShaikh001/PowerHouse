import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Dumbbell, Zap } from "lucide-react";

export default function Loader({ onComplete }: { onComplete: () => void; key?: React.Key }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Calibrating Bio-mechanics...");

  useEffect(() => {
    // Elegant progressing counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 300);
          return 100;
        }
        
        // Progress speed variations for premium organic feel
        const step = Math.floor(Math.random() * 8) + 4;
        const next = prev + step;
        return next > 100 ? 100 : next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 30) {
      setStatus("Initializing Hoist Resistance Engine...");
    } else if (progress < 60) {
      setStatus("Calibrating Sachin Patil's Coaching Protocols...");
    } else if (progress < 85) {
      setStatus("Activating Fully Air Conditioned Circuits...");
    } else {
      setStatus("Unlocking Peak Potential...");
    }
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 bg-[#070707] z-[9999] flex flex-col items-center justify-center p-4 relative overflow-hidden select-none"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#C9A84C_0.5px,transparent_0.5px)] [background-size:20px_20px] opacity-[0.03]" />

      <div className="space-y-8 flex flex-col items-center justify-center relative z-10 w-full max-w-sm">
        
        {/* Beautiful Centered Gold Ring Spinner */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Pulsing glow outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-gold/20"
          />

          {/* Active medium colored accent ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-2 border-t-gold border-r-transparent border-b-transparent border-l-gold/10"
          />

          {/* Core innermost ring */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-6 rounded-full bg-[#121212] border border-gold/10 flex items-center justify-center text-gold shadow-[0_0_30px_rgba(201,168,76,0.15)]"
          >
            <Dumbbell className="w-8 h-8 text-gold" />
          </motion.div>
        </div>

        {/* Branding block */}
        <div className="text-center space-y-1">
          <h2 className="font-bebas text-4xl text-white tracking-[0.2em]">
            POWER <span className="text-gold">HOUSE</span>
          </h2>
          <span className="text-[10px] font-mono tracking-[0.3em] text-gray-500 uppercase block">
            Bhusawal Performance Lab
          </span>
        </div>

        {/* Digital progress metrics & bars */}
        <div className="w-full space-y-3 px-4">
          <div className="flex justify-between items-end font-mono text-[10px]">
            <span className="text-gray-400 capitalize tracking-wide">{status}</span>
            <span className="text-gold font-bold text-xs">{progress}%</span>
          </div>

          {/* Dynamic golden progress bar track */}
          <div className="h-[2px] bg-white/5 rounded-full overflow-hidden w-full relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-gold/50 via-gold to-yellow-400 rounded-full shadow-[0_0_10px_rgba(201,168,76,0.8)]"
            />
          </div>
        </div>

        {/* Bottom security assurance footprint lines */}
        <div className="text-[9px] font-mono text-stone-600 uppercase tracking-widest text-center flex items-center gap-1.5 opacity-60">
          <ShieldCheck className="w-3.5 h-3.5 text-gold/65" />
          <span>Biomechanical Interface Online</span>
        </div>

      </div>
    </motion.div>
  );
}
