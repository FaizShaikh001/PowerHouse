import React from "react";
import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { smoothScrollTo, getViewportMargin } from "../utils/scroll";
import { ScrollStaggerContainer, ScrollStaggerItem } from "./ScrollReveal";
import { useGymData } from "../context/GymDataContext";
import PricingCard from "./PricingCard";

export default function Pricing() {
  const { pricingPlans } = useGymData();

  const handleSelectPlan = (planName: string) => {
    // Fill contact message with selected plan
    const msgInput = document.getElementById("contact-message") as HTMLTextAreaElement | null;
    if (msgInput) {
      msgInput.value = `Hi Power House! I am interested in seeking membership for the "${planName}" plan. Please guide me with the immediate boarding steps.`;
      msgInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Scroll to contact form smoothly
    smoothScrollTo("#contact");
  };

  return (
    <section id="pricing" className="relative py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-gold/5 blur-[130px] pointer-events-none" />
      
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
            [ TRANSPARENT ELITE TARIFFS ]
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-white tracking-widest uppercase">
            MEMBERSHIP <span className="text-gold">REGIMENS</span>
          </h2>
          <div className="h-1 w-24 bg-electric-red mx-auto" />
          <p className="max-w-xl mx-auto font-sans text-xs sm:text-sm text-gray-400 tracking-wider">
            Invest in premium biology-driven training. No hidden onboarding fees or unmapped administrative surcharges.
          </p>
        </motion.div>

        {/* Pricing Cards Grid with high-fidelity staggered entry */}
        <ScrollStaggerContainer 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch [perspective:1000px]" 
          id="pricing-tier-grid"
          staggerChildren={0.15}
        >
          {pricingPlans.map((plan) => (
            <ScrollStaggerItem key={plan.id || plan.name} variant="scale-in">
              <PricingCard plan={plan} onSelectPlan={handleSelectPlan} />
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>

        {/* Guarantee Banner */}
        <div className="mt-16 text-center max-w-2xl mx-auto p-6 rounded-2xl bg-[#111111]/80 border border-white/5 flex flex-col sm:flex-row items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center text-gold shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bebas text-xl text-white tracking-wide uppercase">
              No long term complex lock-ins
            </h4>
            <p className="font-sans text-[11px] text-gray-400 tracking-wide mt-1.5 leading-relaxed">
              We stand fully behind our premier level of bio-mechanics layout, air-conditioned luxury, and coaching precision. You may freeze your quarterly/annual membership for up to 30 days due to medical or relocation disruptions.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
