import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Equipment from "./components/Equipment";
import GymMap from "./components/GymMap";
import Trainers from "./components/Trainers";
import Pricing from "./components/Pricing";
import Nutrition from "./components/Nutrition";
import FitnessTools from "./components/FitnessTools";
import WhyUs from "./components/WhyUs";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import ScrollReveal from "./components/ScrollReveal";
import AccessibilityToggle from "./components/AccessibilityToggle";
import BrandCustomizer from "./components/BrandCustomizer";
import { GymDataProvider } from "./context/GymDataContext";
import { LanguageProvider } from "./context/LanguageContext";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Persist high contrast state in LocalStorage for accessibility guidelines
  const [isHighContrast, setIsHighContrast] = useState(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      return localStorage.getItem("powerhouse-high-contrast") === "true";
    }
    return false;
  });

  const toggleHighContrast = () => {
    setIsHighContrast((prev) => {
      const nextVal = !prev;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("powerhouse-high-contrast", String(nextVal));
      }
      return nextVal;
    });
  };

  // Dynamic 3D physical perspective tilt and ambient light tracking for elements with gold-radial-border
  React.useEffect(() => {
    // Disable on touch-only mobile devices to secure maximum scroll performance
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    // Gentle synthesis of premium, high-frequency physical golden-shimmer chimes
    let audioCtx: AudioContext | null = null;
    const playGoldHoverChime = () => {
      try {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtxClass) return;
        if (!audioCtx) {
          audioCtx = new AudioCtxClass();
        }
        if (audioCtx.state === "suspended") {
          audioCtx.resume();
        }

        const now = audioCtx.currentTime;

        // Gate node - extremely low gain to maintain a premium feel
        const masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.012, now + 0.005); // immediate gentle hit
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38); // organic decay envelope

        // Anti-harshness lowpass
        const filter = audioCtx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(3200, now);

        // Sweet shimmering perfect fifths for a crystal clear premium sound
        const osc1 = audioCtx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(2600, now); // sparkling sweet high freq

        const osc2 = audioCtx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(3900, now); // perfect fifth above (1.5x ratio)

        osc1.connect(masterGain);
        osc2.connect(masterGain);
        masterGain.connect(filter);
        filter.connect(audioCtx.destination);

        osc1.start(now);
        osc2.start(now);

        osc1.stop(now + 0.4);
        osc2.stop(now + 0.4);
      } catch (error) {
        // Fail silently so no logs or interruptions occur if audio is blocked or unsupported
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".gold-radial-border") as HTMLElement;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left; // cursor-x inside the card
      const y = e.clientY - rect.top;  // cursor-y inside the card

      // Normalize position around the center: range from -1 to 1
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const dx = (x - midX) / midX;
      const dy = (y - midY) / midY;

      // Limit physical 3D rotational tilt to a gentle, premium 6.5 degrees max
      const maxTilt = 6.5;
      const rotateX = -dy * maxTilt;
      const rotateY = dx * maxTilt;

      // Update CSS variables on the component for instantaneous hardware-accelerated GPU updates
      target.style.setProperty("--rotate-x", `${rotateX}deg`);
      target.style.setProperty("--rotate-y", `${rotateY}deg`);

      // Dynamic light beam tracking follow
      const lightX = (x / rect.width) * 100;
      const lightY = (y / rect.height) * 100;
      target.style.setProperty("--bg-radial-x", `${lightX}%`);
      target.style.setProperty("--bg-radial-y", `${lightY}%`);

      // Track hover enter state to trigger a single golden chime play
      if (target.getAttribute("data-hover-chime-active") !== "true") {
        target.setAttribute("data-hover-chime-active", "true");
        playGoldHoverChime();
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".gold-radial-border") as HTMLElement;
      if (!target) return;

      // Ensure cursor has truly left the card boundaries before resetting chime triggers
      const related = e.relatedTarget as HTMLElement;
      if (!related || !target.contains(related)) {
        target.removeAttribute("data-hover-chime-active");
      }

      // Fluid snap back to neutral state resting values
      target.style.setProperty("--rotate-x", "0deg");
      target.style.setProperty("--rotate-y", "0deg");
      target.style.setProperty("--bg-radial-x", "50%");
      target.style.setProperty("--bg-radial-y", "0%");
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  // Centered click ripple effect on gold-radial-border cards
  React.useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".gold-radial-border") as HTMLElement;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.className = "gold-ripple-span";

      // Calculate maximum possible radius required to cover the outer edges
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x - size / 2}px`;
      ripple.style.top = `${y - size / 2}px`;

      target.appendChild(ripple);

      // Clean up DOM node once the CSS scale/fade animation concludes
      ripple.addEventListener("animationend", () => {
        ripple.remove();
      });
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <GymDataProvider>
      <LanguageProvider>
        <div 
          id="gym-root-container" 
        className={`relative bg-[#0A0A0A] min-h-screen text-white select-none transition-colors duration-300 ${
          isHighContrast ? "high-contrast" : ""
        }`}
      >
      {/* Decorative full-viewport granular noise and gold design dot patterns */}
      <div className="grain-overlay" />
      <div className="luxury-dot-grid" />

      {/* Full-screen Gold-accented Initialization Loader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="gold-premium-loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Floating Header Navbar */}
      <Navbar isLoading={isLoading} />

      {/* Main Single Page Sections Scaffold with premium eased scroll-reveal entrance animations */}
      <main id="main-content-scaffold" className="flex flex-col relative">
        <ScrollReveal variant="fade-up" duration={1.0} threshold={0.05}>
          <Hero />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.15} duration={0.9} threshold={0.1}>
          <About />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1} duration={0.9} threshold={0.1}>
          <Equipment />
        </ScrollReveal>

        <ScrollReveal variant="scale-in" delay={0.1} duration={0.95} threshold={0.1}>
          <GymMap />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1} duration={0.9} threshold={0.1}>
          <Trainers />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1} duration={0.9} threshold={0.1}>
          <Pricing />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1} duration={0.9} threshold={0.1}>
          <Nutrition />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1} duration={0.95} threshold={0.1}>
          <FitnessTools />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1} duration={0.9} threshold={0.1}>
          <WhyUs />
        </ScrollReveal>

        <ScrollReveal variant="scale-in" delay={0.1} duration={0.95} threshold={0.1}>
          <Gallery />
        </ScrollReveal>

        <ScrollReveal variant="scale-in" delay={0.1} duration={0.95} threshold={0.1}>
          <Testimonials />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1} duration={0.95} threshold={0.1}>
          <FAQ />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1} duration={0.9} threshold={0.1}>
          <Contact />
        </ScrollReveal>
      </main>

      {/* Footer Branding Navigation block */}
      <Footer />

      {/* Dynamic Floating Accessibility Switcher for High Contrast legibility support */}
      <AccessibilityToggle isHighContrast={isHighContrast} onToggle={toggleHighContrast} />

      {/* Manual logo and accent theme color customizer portal */}
      <BrandCustomizer />

      {/* Persistent floating WhatsApp quick action chat button */}
      <WhatsAppFloat />

      {/* Administrative dynamic DB live config suite */}
      <AdminPanel />
      </div>
      </LanguageProvider>
    </GymDataProvider>
  );
}

