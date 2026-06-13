import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Star, Check, Zap } from "lucide-react";
import { PricingPlan } from "../utils/gymDataStore";

interface PricingCardProps {
  plan: PricingPlan;
  onSelectPlan: (planName: string) => void;
}

export default function PricingCard({ plan, onSelectPlan }: PricingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Initialize Motion Values for the rotation tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for elastic responsive feedback
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    damping: 25,
    stiffness: 150,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    damping: 25,
    stiffness: 150,
  });

  // Scale and hover glow shadow spring effects
  const liftY = useSpring(0, { damping: 20, stiffness: 200 });
  const scale = useSpring(1, { damping: 15, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalize coordinates from -0.5 to 0.5
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseEnter = () => {
    liftY.set(-6);
    scale.set(1.025);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    liftY.set(0);
    scale.set(1);
  };

  return (
    <div className="h-full [perspective:1200px]" id={`pricing-card-wrapper-${plan.id}`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          y: liftY,
          scale,
        }}
        className={`relative rounded-3xl p-8 flex flex-col justify-between h-full bg-gradient-to-b transformation-gpu select-none transition-all duration-300 ${
          plan.popular
            ? "from-[#131313] via-[#1E1910] to-[#15120C] border-2 border-gold shadow-[0_4px_30px_rgba(201,168,76,0.1)] hover:shadow-[0_20px_50px_rgba(201,168,76,0.22)] hover:border-gold-light"
            : "from-[#111] to-[#1A1A1A] border border-white/5 hover:border-gold/30 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
        }`}
      >
        {/* Shine gloss layer overlay */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0">
          <div className="absolute -inset-y-12 -inset-x-8 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
        </div>

        <div className="relative z-10 space-y-6 flex-1 flex flex-col justify-between">
          {/* Popular Badge */}
          {plan.popular && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-yellow-600 text-[#0A0A0A] px-4 py-1.5 rounded-full text-[10px] font-mono font-black tracking-widest uppercase shadow-md flex items-center gap-1 z-20">
              <Star className="w-3 h-3 fill-current animate-pulse" />
              {plan.badge || "BEST VALUE"}
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
              <span className={`font-bebas text-5xl sm:text-6xl tracking-tight transition-colors duration-300 ${plan.popular ? "text-gold" : "text-white"}`}>
                {plan.price}
              </span>
              <span className="font-mono text-xs text-gray-500 uppercase">
                {plan.billingPeriod}
              </span>
            </div>

            {/* Features list */}
            <div className="space-y-4 pt-2">
              <span className="text-[10px] font-mono tracking-widest text-gold/80 uppercase block font-bold">
                {plan.featuresLabel}
              </span>
              <ul className="space-y-3">
                {plan.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span className="leading-tight">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-8">
            <button
              id={`select-plan-${plan.name.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => onSelectPlan(plan.name)}
              className={`w-full py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-black transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                plan.popular
                  ? "bg-gold text-[#0A0A0A] hover:bg-gold-light hover:scale-[1.02] shadow-[0_4px_15px_rgba(201,168,76,0.3)]"
                  : "bg-[#0A0A0A] border border-gold/30 text-gold hover:bg-gold hover:text-[#0A0A0A]"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{plan.ctaText}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
