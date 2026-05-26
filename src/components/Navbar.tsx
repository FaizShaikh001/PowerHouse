import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dumbbell, Menu, X, Flame } from "lucide-react";
import { NavLink } from "../types";

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Equipment", href: "#equipment" },
  { label: "Trainers", href: "#trainers" },
  { label: "Nutrition", href: "#nutrition" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.nav
        id="app-navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-gold/10 py-4 shadow-lg shadow-black/40"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="flex items-center gap-2 group"
              id="nav-logo"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gold/10 border border-gold/30 group-hover:border-gold group-hover:bg-gold/20 transition-all duration-300">
                <Flame className="w-5 h-5 text-gold group-hover:text-electric-red transition-colors duration-300" />
                <motion.div
                  className="absolute inset-0 rounded-full border border-electric-red/0"
                  animate={{ scale: [1, 1.15, 1], opacity: [0, 0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bebas text-2xl sm:text-3xl tracking-wider text-white group-hover:text-gold transition-colors duration-150 leading-none">
                  POWER <span className="text-gold">HOUSE</span>
                </span>
                <span className="text-[9px] font-sans tracking-[0.25em] text-gray-400 font-bold uppercase leading-none">
                  Gym & Nutrition
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8" id="desktop-nav-links">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="relative text-sm uppercase tracking-widest font-sans font-medium text-gray-300 hover:text-gold transition-colors duration-200 py-2"
                >
                  {link.label}
                  {/* Active highlight lines could go here, or simple transition */}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <motion.button
                id="navbar-join-cta"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("#contact")}
                className="relative overflow-hidden px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-widest font-bold bg-gold text-[#0A0A0A] shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-shadow duration-300 cursor-pointer"
              >
                Join Now
                <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.button>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <div className="flex md:hidden items-center gap-4">
              <button
                id="mobile-nav-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:text-gold transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] z-40 bg-[#0A0A0A]/98 backdrop-blur-lg border-t border-gold/10 md:hidden flex flex-col justify-between py-12 px-6"
          >
            <div className="flex flex-col gap-6 items-center">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-xl uppercase tracking-widest font-bebas text-gray-200 hover:text-gold transition-colors block py-2 text-center"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-4 items-center">
              <div className="h-[1px] w-1/2 bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-4" />
              <button
                id="mobile-drawer-cta"
                onClick={() => {
                  scrollToSection("#contact");
                }}
                className="w-full max-w-xs px-8 py-4 rounded-full font-sans text-sm uppercase tracking-widest font-bold bg-gold text-[#0A0A0A] text-center shadow-lg shadow-gold/20 hover:shadow-gold/40 cursor-pointer"
              >
                Join Power House
              </button>
              <span className="text-xs font-mono text-gray-500 tracking-wider">
                📞 CALL NOW: 077570 77393
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
