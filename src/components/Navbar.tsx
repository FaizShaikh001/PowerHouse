import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dumbbell, Menu, X, Flame, Instagram } from "lucide-react";
import { NavLink } from "../types";
import Logo from "./Logo";
import { smoothScrollTo } from "../utils/scroll";

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Equipment", href: "#equipment" },
  { label: "Trainers", href: "#trainers" },
  { label: "Nutrition", href: "#nutrition" },
  { label: "Tools", href: "#fitness-tools" },
  { label: "Gallery", href: "#gallery" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ isLoading = false }: { isLoading?: boolean }) {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAtTop = scrollY < 120 || isMobileMenuOpen;
  const isHiddenState = scrollY >= 120 && scrollY < 480 && !isMobileMenuOpen;
  const isStickyVisible = scrollY >= 480 || isMobileMenuOpen;

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    smoothScrollTo(id);
  };

  // Build the premium dynamic sliding class name
  let navbarClass = "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ";
  if (isMobileMenuOpen) {
    navbarClass += "bg-[#0A0A0A] border-b border-gold/10 py-3.5 shadow-lg shadow-black/55 translate-y-0 opacity-100";
  } else if (isAtTop) {
    navbarClass += "bg-transparent py-6 translate-y-0 opacity-100";
  } else if (isHiddenState) {
    navbarClass += "bg-[#0A0A0A]/90 py-3.5 -translate-y-full opacity-0 pointer-events-none";
  } else if (isStickyVisible) {
    navbarClass += "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-gold/10 py-3.5 shadow-lg shadow-black/55 translate-y-0 opacity-100";
  }

  return (
    <>
      <motion.nav
        id="app-navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={navbarClass}
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
              <Logo isLoading={isLoading} className="w-10 h-10 group-hover:scale-105 transition-all duration-300 filter drop-shadow-[0_0_8px_rgba(201,168,76,0.25)]" />
              <motion.div 
                className="flex flex-col"
                initial="hidden"
                animate={isLoading ? "hidden" : "visible"}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.12,
                      delayChildren: 0.65,
                    }
                  }
                }}
              >
                <motion.span 
                  className="font-bebas text-2xl sm:text-3xl tracking-wider text-white leading-none logo-span-1 block"
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { type: "spring", stiffness: 120, damping: 14 } 
                    }
                  }}
                >
                  POWER <span className="text-gold">HOUSE</span>
                </motion.span>
                <motion.span 
                  className="text-[9px] font-sans tracking-[0.25em] text-gray-400 font-bold uppercase leading-none mt-1 logo-span-2 block"
                  variants={{
                    hidden: { opacity: 0, y: 6 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { type: "spring", stiffness: 120, damping: 14 } 
                    }
                  }}
                >
                  Gym & Nutrition
                </motion.span>
              </motion.div>
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
                  className="relative text-sm uppercase tracking-widest font-sans font-medium text-gray-300 hover:text-gold transition-colors duration-200 py-2 nav-glow-link"
                >
                  {link.label}
                  {/* Active highlight lines could go here, or simple transition */}
                </a>
              ))}
            </div>

            {/* Desktop CTA and Instagram */}
            <div className="hidden md:flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.instagram.com/powerhousegymbhusawal?igsh=NnF1Y2Nob2c4YW4z"
                target="_blank"
                rel="noreferrer"
                id="navbar-instagram-link"
                className="p-2 rounded-full border border-gold/20 bg-gold/5 text-gold hover:bg-gold hover:border-gold hover:text-[#0A0A0A] transition-all duration-300"
                aria-label="Power House Gym Instagram"
                title="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
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

            {/* Mobile Hamburger Menu Toggle and Actions */}
            <div className="flex md:hidden items-center gap-3">
              <a
                href="https://www.instagram.com/powerhousegymbhusawal?igsh=NnF1Y2Nob2c4YW4z"
                target="_blank"
                rel="noreferrer"
                id="mobile-navbar-instagram-link"
                className="p-2 rounded-full border border-gold/20 bg-gold/5 text-gold hover:bg-gold hover:text-[#0A0A0A] transition-all"
                aria-label="Power House Gym Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
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
              
              <div className="flex items-center gap-2 mb-2">
                <a
                  href="https://www.instagram.com/powerhousegymbhusawal?igsh=NnF1Y2Nob2c4YW4z"
                  target="_blank"
                  rel="noreferrer"
                  id="mobile-drawer-instagram-link"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs uppercase tracking-wider font-semibold hover:bg-gold hover:text-black transition-all"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Follow us on Instagram</span>
                </a>
              </div>

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
