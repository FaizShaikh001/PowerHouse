import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Equipment from "./components/Equipment";
import Trainers from "./components/Trainers";
import Pricing from "./components/Pricing";
import Nutrition from "./components/Nutrition";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div id="gym-root-container" className="relative bg-[#0A0A0A] min-h-screen text-white select-none">
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
      <Navbar />

      {/* Main Single Page Sections Scaffold */}
      <main id="main-content-scaffold" className="flex flex-col relative">
        <Hero />
        <About />
        <Equipment />
        <Trainers />
        <Pricing />
        <Nutrition />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer Branding Navigation block */}
      <Footer />

      {/* Persistent floating WhatsApp quick action chat button */}
      <WhatsAppFloat />
    </div>
  );
}
