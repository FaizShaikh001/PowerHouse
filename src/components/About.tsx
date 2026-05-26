import React from "react";
import { motion } from "motion/react";
import { Dumbbell, Trophy, Apple, Clock, ShieldAlert, Star } from "lucide-react";

interface HighlightCard {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const HIGHLIGHTS: HighlightCard[] = [
  {
    title: "Premium Machines",
    desc: "Engineered with Hoist Fitness and Viva bio-mechanical standard equipment for maximum muscle alignment.",
    icon: Dumbbell,
    accentColor: "border-gold/30 hover:border-gold hover:shadow-gold/10",
  },
  {
    title: "Expert Coaches",
    desc: "Dedicating personalized attention, safety parameters, training protocols, and continuous motivation.",
    icon: Trophy,
    accentColor: "border-electric-red/30 hover:border-electric-red hover:shadow-electric-red/10",
  },
  {
    title: "Nutrition Guides",
    desc: "Complete nutritional frameworks covering macro distribution, supplement protocols, and meal timing.",
    icon: Apple,
    accentColor: "border-gold/30 hover:border-gold hover:shadow-gold/10",
  },
  {
    title: "Premium Hours",
    desc: "Monday to Saturday 5:00 AM to 10:00 PM. Women's exclusive special training hours are daily from 3:00 PM to 5:00 PM.",
    icon: Clock,
    accentColor: "border-electric-red/30 hover:border-electric-red hover:shadow-electric-red/10",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute right-0 top-1/3 w-[30rem] h-[30rem] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[25rem] h-[25rem] rounded-full bg-electric-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Bold narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-gold uppercase block">
                [ ESTABLISHED PERFORMANCE LAB ]
              </span>
              <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-tight leading-none uppercase">
                THE ULTIMATIC <br />
                <span className="text-gold">TRANSFORMATION LAB</span>
              </h2>
            </div>

            <p className="font-sans text-gray-300 leading-relaxed text-base sm:text-lg">
              Power House isn't just a gym — it's a dedicated environment built in the heart of Kandari. Armed with 
              <span className="text-gold font-semibold"> Hoist Fitness</span> and 
              <span className="text-gold font-semibold"> Viva Fitness</span> machines trusted by professionals worldwide, 
              we furnish the exact tools champions leverage to succeed.
            </p>

            <blockquote className="border-l-2 border-electric-red pl-4 py-1 italic text-gray-400 text-sm leading-relaxed">
              "We took away standard gym clutter and replaced it with bio-accurate target loading. Power House represents the peak environment where intent meets raw results."
            </blockquote>

            {/* Quick Gym Specs / Badges */}
            <div className="flex flex-wrap gap-2.5 pt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-900 border border-white/5 text-xs text-gray-300">
                ⭐ <strong className="text-white">4.8 Rating</strong> (Kandari Area)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-900 border border-white/5 text-xs text-gray-300">
                💪 Hoist Certified Layout
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-900 border border-white/5 text-[11px] text-pink-400 font-medium">
                👩 Women's Special: 3 PM - 5 PM
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#13110C] border border-gold/15 text-xs text-gold font-bold">
                ❄️ Fully Air Conditioned
              </span>
            </div>
          </div>

          {/* Right Column: Grid of highlight cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="about-highlights-grid">
              {HIGHLIGHTS.map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`p-6 rounded-2xl bg-card-bg/70 backdrop-blur-md border ${card.accentColor} transition-all duration-300 shadow-xl`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-white/5 flex items-center justify-center mb-4 text-gold">
                      <IconComponent className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-bebas text-2xl text-white tracking-wider mb-2 uppercase">
                      {card.title}
                    </h3>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
