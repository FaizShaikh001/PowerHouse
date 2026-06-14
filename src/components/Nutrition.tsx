import React from "react";
import { motion } from "motion/react";
import { Apple, Scale, GlassWater, Sparkles, Flame, CheckCircle2 } from "lucide-react";
import { getViewportMargin } from "../utils/scroll";

interface NutritionCol {
  topic: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  bullets: string[];
  quote: string;
  accent: string;
}

const NUTRITION_COLS: NutritionCol[] = [
  {
    topic: "Diet Mechanics",
    title: "Personalized Diet Plans",
    icon: Apple,
    bullets: [
      "Individual metabolic rate (BMR) calculations",
      "Macro nutrient target allocation based on hypertrophy vs recovery",
      "Delicious high-protein food alternative matrix lists",
      "Bhusawal local market ingredient adaptability options"
    ],
    quote: "A precise, balanced calorie deficit or surplus is the supreme catalyst of physical form.",
    accent: "group-hover:border-gold/30 hover:shadow-gold/10"
  },
  {
    topic: "Supplements",
    title: "Supplement Guidance",
    icon: Sparkles,
    bullets: [
      "Evidence-based science supplement planning guidelines",
      "Whey and plant isolate absorption optimization timing",
      "Strength optimization utilizing micro-dosed Creatine Monohydrate",
      "Essential micro-nutrient and trace element alignment list"
    ],
    quote: "Clean, certified ergogenic aids engineered to bridge nutritional gaps safely.",
    accent: "group-hover:border-electric-red/30 hover:shadow-electric-red/10"
  },
  {
    topic: "Diagnostics",
    title: "Progress Tracking",
    icon: Scale,
    bullets: [
      "Periodic skin-fold body composition diagnostics",
      "Weekly performance ceiling strength evaluations",
      "Hydration quotient optimization and recovery logs",
      "Direct weekly diet modifications overseen by your coach"
    ],
    quote: "If you do not document, you are only guessing. We measure variables to guarantee precision.",
    accent: "group-hover:border-gold/30 hover:shadow-gold/10"
  }
];

export default function Nutrition() {
  return (
    <section id="nutrition" className="relative py-24 bg-[#0A0A0A] overflow-hidden">
      
      {/* Subtle Animated Background Gradient */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/4 -left-1/4 w-[45rem] h-[45rem] rounded-full bg-gradient-to-tr from-gold/1 to-gold/4 blur-[130px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 30, 0],
            y: [0, 40, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-1/4 -right-1/4 w-[45rem] h-[45rem] rounded-full bg-gradient-to-tr from-electric-red/1 to-electric-red/4 blur-[130px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: getViewportMargin() }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-20"
        >
          <span className="text-xs font-mono tracking-widest text-gold uppercase block">
            [ METABOLIC OPTIMIZATION SYSTEM ]
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-white tracking-widest uppercase">
            FUEL THE <span className="text-gold">MACHINE</span>
          </h2>
          <div className="h-1 w-24 bg-electric-red mx-auto" />
          <p className="max-w-xl mx-auto font-sans text-xs sm:text-sm text-gray-400 tracking-wider">
            Muscles are built in the gym, but forged in the kitchen. Our specialized coaches supply nutrition design structures synchronized with your hoisting metrics.
          </p>
        </motion.div>

        {/* Nutritional Steps / Horizontal Ribbon (Unsolicited systems removed, keeping it simple as requested) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="nutrition-columns-grid">
          {NUTRITION_COLS.map((col, idx) => {
            const IconComp = col.icon;
            return (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: getViewportMargin() }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col justify-between p-8 rounded-3xl bg-gradient-to-b from-[#111] to-[#0A0A0A] border border-white/5 transition-all duration-300 group hover:border-gold/25"
              >
                <div className="space-y-6">
                  {/* Topic badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-gold uppercase">
                      // {col.topic}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-stone-900 border border-white/5 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-300">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Quote */}
                  <div className="space-y-2">
                    <h3 className="font-bebas text-3xl text-white tracking-wider">
                      {col.title}
                    </h3>
                    <p className="font-sans text-xs text-gray-400 italic">
                      "{col.quote}"
                    </p>
                  </div>

                  {/* Bullets List */}
                  <ul className="space-y-3 pt-3">
                    {col.bullets.map((bullet, bidx) => (
                      <li key={bidx} className="flex items-start gap-2 text-xs sm:text-xs.1 text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Spec Footer */}
                <div className="pt-6 mt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-gray-500">
                  <span>METABOLIC LAB // POWER</span>
                  <span className="text-gold font-bold">100% PERSONALIZED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
