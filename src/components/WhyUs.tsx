import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, Trophy, Flame, ShieldAlert, Sparkles, Star } from "lucide-react";
import { ScrollStaggerContainer, ScrollStaggerItem } from "./ScrollReveal";

interface FeatureBlock {
  num: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const WHY_BLOCKS: FeatureBlock[] = [
  {
    num: "01",
    title: "Hoist & Viva Premium Machinery",
    desc: "We host an array of official Hoist ROC-IT strength complexes and Viva cardio lines that automatically align skeletal geometry during heavy exercises, reducing joint stress and amplifying loading constraints.",
    icon: Flame,
    badge: "Bio-mechanical Tech"
  },
  {
    num: "02",
    title: "Experienced Personal Trainers",
    desc: "Our coaches carry elite athletic credentials. They provide continuous mechanical supervision, form corrections, progress logging, and scientifically backed workout sheets tailored to your somatic level.",
    icon: Trophy,
    badge: "Elite Coaches"
  },
  {
    num: "03",
    title: "Nutrition & Diet Guidance",
    desc: "Nutrition is 70% of physical conversion. We provide precise calorie calculations, metabolic analysis, macro breakdowns, and supplement sheets that fit and adapt to your exact home-cooking variables.",
    icon: Sparkles,
    badge: "Complete Macro Setup"
  },
  {
    num: "04",
    title: "Supportive Community (4.8★ Rated)",
    desc: "Locally recognized behind the Navjeevan Furniture Mall, we support an intimidatingly premium yet highly welcoming community of athletes, lifters, and fitness enthusiasts pushing each other daily.",
    icon: Star,
    badge: "Top Rated Bhusawal Hub"
  }
];

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-24 bg-[#0A0A0A] overflow-hidden border-t border-b border-white/5">
      {/* Background soft lighting */}
      <div className="absolute top-1/4 left-0 w-[30rem] h-[30rem] bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-gold uppercase block">
            [ COMPREHENSIVE REASONS ]
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-white tracking-widest uppercase">
            WHY <span className="text-gold">CHOOSE US</span>
          </h2>
          <div className="h-1 w-24 bg-electric-red mx-auto" />
          <p className="max-w-xl mx-auto font-sans text-xs sm:text-sm text-gray-400 tracking-wider">
            We operate the most comprehensive premium health and physical development lab in Bhusawal, Shanti Nagar, and the surrounding regions.
          </p>
        </motion.div>

        {/* Feature Blocks Stack with elegant cascade entrance layouts */}
        <ScrollStaggerContainer className="space-y-6" id="why-us-stack" staggerChildren={0.16}>
          {WHY_BLOCKS.map((block, idx) => {
            const IconComponent = block.icon;
            
            return (
              <ScrollStaggerItem key={block.num} variant={idx % 2 === 0 ? "fade-right" : "fade-left"}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="group relative flex flex-col md:flex-row items-start gap-6 p-8 rounded-2xl bg-[#111111]/80 backdrop-blur-md border border-white/5 hover:border-gold/30 transition-all duration-300 shadow-xl"
                >
                  {/* Floating highlight bar on top-left */}
                  <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/30 transition-all duration-500" />

                  {/* Stencil Index Number */}
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-bebas text-5xl sm:text-6xl tracking-wider text-stroke-gold text-transparent leading-none select-none group-hover:text-gold transition-colors duration-300">
                      {block.num}
                    </span>
                    {/* Decorative line separator on mobile */}
                    <div className="md:hidden h-[2px] w-12 bg-gold/20" />
                  </div>

                  {/* Info block layout */}
                  <div className="flex-grow space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bebas text-2xl sm:text-3xl tracking-wide text-white group-hover:text-gold transition-colors duration-200">
                        {block.title}
                      </h3>
                      {block.badge && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/25 text-[8px] font-mono tracking-widest text-gold uppercase font-bold">
                          {block.badge}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
                      {block.desc}
                    </p>
                  </div>

                  {/* Visual Icon Box */}
                  <div className="hidden md:flex shrink-0 w-12 h-12 rounded-xl bg-stone-900 border border-white/5 items-center justify-center text-gray-500 group-hover:text-gold group-hover:border-gold/40 transition-colors duration-300 shadow-md">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </motion.div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStaggerContainer>

      </div>
    </section>
  );
}
