import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Flame, Star, Check, Zap, HelpCircle } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  billingPeriod: string;
  subtitle: string;
  popular: boolean;
  features: string[];
  featuresLabel: string;
  badge?: string;
  ctaText: string;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Monthly Core",
    price: "₹1,500",
    billingPeriod: "/ month",
    subtitle: "High-intensity flexibility & alignment access",
    popular: false,
    ctaText: "Aquire Core Access",
    featuresLabel: "CORE INCLUSIONS:",
    features: [
      "Access to standard Hoist Resistance circuits",
      "Full Viva Cardio Suite selection",
      "Fully Air-Conditioned luxury premises",
      "Flexible club entry (5:00 AM - 10:00 PM)",
      "Dedicated locker & dry zone amenities"
    ]
  },
  {
    name: "Quarterly Prestige",
    price: "₹3,800",
    billingPeriod: "/ quarter",
    subtitle: "Absolute biomechanics calibration course",
    popular: true,
    badge: "BEST VALUE",
    ctaText: "Begin Elite Regimen",
    featuresLabel: "PRESTIGE ADMISSIONS:",
    features: [
      "All Monthly Core features included",
      "1 Bio-mechanics Alignment check with Sachin Patil",
      "Personalized macro structure roadmap",
      "Priority equipment booking slots",
      "Exclusive strength technique workshop access"
    ]
  },
  {
    name: "Annual Legacy",
    price: "₹12,000",
    billingPeriod: "/ year",
    subtitle: "The definitive athletic transformation path",
    popular: false,
    ctaText: "Secure Lifetime Legacy",
    featuresLabel: "LEGACY PRIVILEGES:",
    features: [
      "Unlimited 365-day luxury club admission",
      "Ongoing progressive diagnostics with Sachin Patil",
      "Comprehensive year-round nutrition strategy edits",
      "Dedicated premium locker with keyholder rights",
      "Complimentary guest passes (3 tickets per quarter)"
    ]
  }
];

export default function Pricing() {
  const handleSelectPlan = (planName: string) => {
    // Fill contact message with selected plan
    const msgInput = document.getElementById("contact-message") as HTMLTextAreaElement | null;
    if (msgInput) {
      msgInput.value = `Hi Power House! I am interested in seeking membership for the "${planName}" plan. Please guide me with the immediate boarding steps.`;
      msgInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Scroll to contact form smoothly
    const contactSec = document.getElementById("contact");
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="relative py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-gold/5 blur-[130px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
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
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch [perspective:1000px]" id="pricing-tier-grid">
          {PRICING_PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                rotateX: 2,
                rotateY: -2,
                borderColor: plan.popular ? "rgba(201, 168, 76, 1)" : "rgba(201, 168, 76, 0.45)",
                boxShadow: plan.popular 
                  ? "0 20px 40px rgba(201, 168, 76, 0.12)" 
                  : "0 15px 30px rgba(0,0,0,0.4)"
              }}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular 
                  ? "bg-gradient-to-b from-[#131313] via-[#1E1910] to-[#15120C] border-2 border-gold shadow-[0_4px_30px_rgba(201,168,76,0.1)]" 
                  : "bg-gradient-to-b from-[#111] to-[#1A1A1A] border border-white/5"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-yellow-600 text-[#0A0A0A] px-4 py-1.5 rounded-full text-[10px] font-mono font-black tracking-widest uppercase shadow-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {plan.badge}
                </div>
              )}

              {/* Title, Subtitle, Price */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-bebas text-3xl text-white tracking-wide uppercase">
                    {plan.name}
                  </h3>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed min-h-[32px]">
                    {plan.subtitle}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 py-4 border-y border-white/5">
                  <span className={`font-bebas text-5xl sm:text-6xl tracking-tight ${plan.popular ? "text-gold" : "text-white"}`}>
                    {plan.price}
                  </span>
                  <span className="font-mono text-xs text-gray-500 uppercase">
                    {plan.billingPeriod}
                  </span>
                </div>

                {/* Features list */}
                <div className="space-y-4 pt-2">
                  <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block">
                    {plan.featuresLabel}
                  </span>
                  <ul className="space-y-3">
                    {plan.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  id={`select-plan-${plan.name.toLowerCase().replace(" ", "-")}`}
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                    plan.popular
                      ? "bg-gold text-[#0A0A0A] hover:bg-gold-light hover:scale-[1.02] shadow-[0_4px_15px_rgba(201,168,76,0.3)]"
                      : "bg-[#0A0A0A] border border-gold/30 text-gold hover:bg-gold hover:text-[#0A0A0A]"
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>{plan.ctaText}</span>
                </button>
              </div>

            </motion.div>
          ))}
        </div>

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
