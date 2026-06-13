import { useEffect, useState } from "react";
import { motion, useAnimation, useScroll, useTransform } from "motion/react";
import { ChevronDown, Trophy, ShieldCheck, Flame, Star } from "lucide-react";
import { Stat } from "../types";
import { smoothScrollTo } from "../utils/scroll";
import Magnetic from "./Magnetic";

const HERO_STATS: Stat[] = [
  { label: "Active Members", value: "500", suffix: "+", badge: "Bhusawal" },
  { label: "Professional Experience", value: "10", suffix: "+ Years", badge: "Expertise" },
  { label: "Member Rating", value: "4.8", suffix: " ★", badge: "Top Tier" },
  { label: "Elite Certifications", value: "Hoist", suffix: "& Viva", badge: "Premium Brands" },
];

function CountUp({ endVal, duration = 2, suffix = "" }: { endVal: string; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const numericVal = parseFloat(endVal);

  useEffect(() => {
    if (isNaN(numericVal)) return;

    let startTime: number | null = null;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      if (numericVal % 1 === 0) {
        setCount(Math.floor(progress * numericVal));
      } else {
        setCount(parseFloat((progress * numericVal).toFixed(1)));
      }

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [endVal, numericVal, duration]);

  if (isNaN(numericVal)) {
    return <span>{endVal} {suffix}</span>;
  }
  return <span>{count}{suffix}</span>;
}

export default function Hero() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], [0, 240]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0.25]);
  const arrowOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const arrowPointerEvents = useTransform(scrollY, (latest) => latest > 70 ? "none" : "auto");

  const scrollToContact = () => {
    smoothScrollTo("#contact");
  };

  const scrollToAbout = () => {
    smoothScrollTo("#about");
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#0A0A0A]"
    >
      {/* Visual background gradient mesh layout (no unrequested mock telemetry) */}
      <motion.div
        style={{ y: backgroundY, opacity: opacityFade }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        {/* Subtle, glowing background lights */}
        <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[35rem] h-[35rem] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 translate-x-1/2 w-[35rem] h-[35rem] rounded-full bg-electric-red/5 blur-[120px]" />
        
        {/* Elegant geometric abstract overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="meshGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C9A84C" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <g stroke="#C9A84C" strokeWidth="1" fill="none" strokeDasharray="5,5">
            <line x1="0" y1="20%" x2="100%" y2="20%" />
            <line x1="0" y1="40%" x2="100%" y2="40%" />
            <line x1="0" y1="60%" x2="100%" y2="60%" />
            <line x1="0" y1="80%" x2="100%" y2="80%" />
            <line x1="20%" y1="0" x2="20%" y2="100%" />
            <line x1="50%" y1="0" x2="50%" y2="100%" />
            <line x1="80%" y1="0" x2="80%" y2="100%" />
          </g>
          {/* Subtle central ring representing precision and symmetry */}
          <circle cx="50%" cy="50%" r="20%" stroke="#E63946" strokeWidth="1.5" />
          <circle cx="50%" cy="50%" r="35%" stroke="#C9A84C" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center text-center mt-8 md:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Subtle gold tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-2">
            <Flame className="w-4 h-4 text-gold animate-pulse" />
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-gold font-bold">
              Where Strength Meets Aesthetics
            </span>
          </div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-bebas text-5xl sm:text-7xl md:text-9xl tracking-tight text-white leading-[0.9] flex flex-col items-center"
          >
            FORGE YOUR
            <span className="relative text-gold uppercase mt-1">
              PHYSIQUE
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                className="absolute left-0 bottom-1 sm:bottom-2 h-1.5 sm:h-2 bg-gradient-to-r from-gold via-electric-red to-gold rounded-full"
              />
            </span>
          </motion.h1>

          {/* Subheading */}
          <p className="max-w-xl mx-auto font-sans text-base sm:text-lg text-gray-400 tracking-wider">
            Premium Hoist & Viva Equipment. Expert Coaching. Personalized Nutrition Layout. Engineered for elite execution.
          </p>

          {/* CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Magnetic scaleOnHover={1.06} range={85} strength={0.35}>
              <motion.button
                id="hero-free-trial"
                whileHover={{ boxShadow: "0 0 25px rgba(201,168,76,0.25)" }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-sans text-xs uppercase tracking-widest font-bold bg-gold text-[#0A0A0A] cursor-pointer"
              >
                Start Free Trial
              </motion.button>
            </Magnetic>
            <Magnetic scaleOnHover={1.06} range={85} strength={0.35}>
              <motion.button
                id="hero-take-tour"
                whileTap={{ scale: 0.95 }}
                onClick={scrollToAbout}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-sans text-xs uppercase tracking-widest font-bold border border-gold/45 text-gold bg-transparent hover:bg-white/5 transition-colors cursor-pointer"
              >
                Take a Tour
              </motion.button>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Grid of stats */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-card-bg/60 backdrop-blur-md border border-white/5 shadow-2xl"
          id="hero-stats-panel"
        >
          {HERO_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center p-3 sm:p-5 border-r last:border-r-0 border-white/5"
            >
              <span className="text-[10px] font-mono tracking-widest uppercase text-gold/65 mb-1.5">
                // {stat.badge}
              </span>
              <span className="font-bebas text-3xl sm:text-4xl text-white tracking-wider flex items-center justify-center">
                {stat.value === "Hoist" ? (
                  <span className="text-white">HOIST <span className="text-gold">& VIVA</span></span>
                ) : (
                  <CountUp endVal={stat.value} suffix={stat.suffix} />
                )}
              </span>
              <span className="text-[11px] font-sans text-gray-400 font-medium tracking-wide mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Animated scroll down indicator that fades out when scrolling */}
      <motion.div
        style={{ opacity: arrowOpacity, pointerEvents: arrowPointerEvents }}
        className="relative z-10 flex flex-col items-center justify-center mt-8"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase flex flex-col items-center gap-1 cursor-pointer"
          onClick={scrollToAbout}
        >
          SCROLL TO EXPLORE
          <ChevronDown className="w-4 h-4 text-gold" />
        </motion.span>
      </motion.div>
    </section>
  );
}
