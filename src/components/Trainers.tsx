import React from "react";
import { motion } from "motion/react";
import { Dumbbell, ShieldCheck, Trophy, ArrowUpRight, Star } from "lucide-react";
import { Trainer } from "../types";

const TRAINERS: Trainer[] = [
  {
    name: "Sachin Patil",
    role: "Professional Coach & Bio-mechanics Specialist",
    experience: "15+ Yrs Experience",
    specialty: [
      "Heavy Powerlifting & Olympic Pull Mechanics",
      "Precision Macro & Hypertrophy Engineering",
      "Joint-Preservation & Hoist Bio-loading Alignment",
      "Comprehensive Metabolic Recomposition"
    ],
    certifications: ["CSCS Expert Master Coach", "K11 Master Trainer Graduate", "Sports Nutrition Professional"]
  }
];

export default function Trainers() {
  const handleBookSession = (trainerName: string) => {
    const contactSec = document.getElementById("contact");
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: "smooth" });
      // We will inject the trainer name into the contact form message input field if configured
      const msgInput = document.getElementById("contact-message") as HTMLTextAreaElement | null;
      if (msgInput) {
        msgInput.value = `Hi Power House! I would like to book an introductory training session with Master Coach ${trainerName}. Please let me know your availability.`;
        msgInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  };

  return (
    <section id="trainers" className="relative py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Background decoration blur lights */}
      <div className="absolute right-0 top-1/4 w-[35rem] h-[35rem] rounded-full bg-electric-red/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[35rem] h-[35rem] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-gold uppercase block">
            [ MASTER PHYSICAL INSTRUCTION ]
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-white tracking-widest uppercase">
            YOUR COACH. <span className="text-gold">YOUR EDGE.</span>
          </h2>
          <div className="h-1 w-24 bg-electric-red mx-auto" />
          <p className="max-w-xl mx-auto font-sans text-xs sm:text-sm text-gray-400 tracking-wider">
            We support zero distraction channels. Partner directly with Sachin Patil, Kandari's most experienced bio-mechanics coach, to optimize absolute execution form.
          </p>
        </div>

        {/* Spotlight Layout for Single Master Coach */}
        <div className="flex justify-center [perspective:1000px]" id="trainers-cards-grid">
          {TRAINERS.map((trainer, idx) => {
            const initials = "SP";
            
            return (
              <motion.div
                key={trainer.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ 
                  scale: 1.02, 
                  rotateX: 3, 
                  rotateY: -3, 
                  borderColor: "rgba(201, 168, 76, 0.45)",
                  shadow: "0 10px 40px rgba(201,168,76,0.15)" 
                }}
                className="w-full max-w-2xl relative flex flex-col justify-between group overflow-hidden rounded-3xl bg-gradient-to-b from-[#111] to-[#1A1A1A] border-2 border-white/5 p-8 sm:p-10 transition-all duration-350 shadow-2xl hover:border-gold/30"
              >
                {/* Visual Avatar Placeholder designed with premium modern styles instead of basic images */}
                <div className="relative mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#050505] via-[#151515] to-[#252525] border-2 border-gold/20 group-hover:border-gold transition-colors duration-500 overflow-hidden shadow-inner shrink-0">
                      <span className="font-bebas text-4xl text-white tracking-widest group-hover:text-gold transition-colors duration-300">
                        {initials}
                      </span>
                      {/* Abstract design bars in bottom right */}
                      <div className="absolute right-0 bottom-0 w-8 h-8 bg-gold/5 flex items-center justify-center rounded-tl-xl border-l border-t border-gold/10">
                        <Star className="w-3 h-3 text-gold" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide group-hover:text-gold transition-colors duration-200 uppercase">
                        {trainer.name}
                      </h3>
                      <span className="font-sans text-xs text-gold/80 italic font-medium block">
                        {trainer.role}
                      </span>
                    </div>
                  </div>

                  {/* Experience Badge */}
                  <div className="text-left sm:text-right flex flex-row sm:flex-col gap-1.5 items-center sm:items-end">
                    <span className="px-3 py-1.5 rounded-md bg-electric-red/10 border border-electric-red/25 text-[10px] font-mono tracking-widest text-electric-red font-bold uppercase">
                      {trainer.experience}
                    </span>
                    <span className="text-xs font-mono text-gray-500 hidden sm:inline">
                      ⭐⭐⭐⭐⭐ Coach
                    </span>
                  </div>
                </div>

                {/* Trainer info */}
                <div className="space-y-6 flex-grow">
                  
                  {/* Specialties List */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block">
                      // master specialist coaching vectors
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {trainer.specialty.map((spec, sidx) => (
                        <div key={sidx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
                          <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications Bullet Ribbon */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block">
                      // elite board credentials
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {trainer.certifications.map((cert, cidx) => (
                        <span
                          key={cidx}
                          className="px-3 py-1 rounded bg-[#0A0A0A] border border-white/5 text-[10px] font-mono text-gray-400 tracking-wider"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <button
                    id={`book-${trainer.name.toLowerCase().replace(" ", "-")}`}
                    onClick={() => handleBookSession(trainer.name)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold bg-[#0A0A0A] border-2 border-gold/20 text-gold hover:bg-gold hover:text-[#0A0A0A] transition-all duration-300 cursor-pointer"
                  >
                    <span>Request Sachin's Priority Coaching Slot</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
