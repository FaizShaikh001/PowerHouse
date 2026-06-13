import { Flame, Instagram, Facebook, MessageCircle, ArrowUp, Zap } from "lucide-react";
import { motion } from "motion/react";
import { NavLink } from "../types";
import Logo from "./Logo";
import { smoothScrollTo } from "../utils/scroll";
import { useGymData } from "../context/GymDataContext";

const FOOTER_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Equipment", href: "#equipment" },
  { label: "Coaching Edge", href: "#trainers" },
  { label: "Fuel & Diet Plans", href: "#nutrition" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Contact / Map", href: "#contact" }
];

export default function Footer() {
  const { timings } = useGymData();

  const scrollTo = (id: string) => {
    smoothScrollTo(id);
  };

  return (
    <footer className="relative bg-[#050505] pt-16 pb-12 border-t border-white/5 overflow-hidden">
      {/* Decorative vertical lines and background glow */}
      <div className="absolute right-10 bottom-0 w-64 h-64 bg-gold/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/5">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-5 space-y-6">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#home");
              }}
              className="flex items-center gap-2 group"
            >
              <Logo className="w-8 h-8 group-hover:scale-105 transition-all duration-300 filter drop-shadow-[0_0_8px_rgba(201,168,76,0.2)]" />
              <span className="font-bebas text-xl sm:text-2xl tracking-wider text-white">
                POWER <span className="text-gold">HOUSE</span>
              </span>
            </a>

            <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-sm">
              Power House Gym & Nutrition transforms intent into physical excellence in Bhusawal, Maharashtra. Engineered with world-class Hoist Strength and Viva Cardio assemblies.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/powerhousegymbhusawal?igsh=NnF1Y2Nob2c4YW4z"
                id="social-instagram"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-[#111] hover:bg-gold border border-white/5 hover:border-gold text-gray-400 hover:text-[#0A0A0A] flex items-center justify-center transition-all duration-300"
                aria-label="Power House Gym Instagram Profile"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                id="social-facebook"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-[#111] hover:bg-gold border border-white/5 hover:border-gold text-gray-400 hover:text-[#0A0A0A] flex items-center justify-center transition-all duration-300"
                aria-label="Power House Gym Facebook Profile"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/917757077393"
                id="social-whatsapp"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-[#111] hover:bg-gold border border-white/5 hover:border-gold text-gray-400 hover:text-[#0A0A0A] flex items-center justify-center transition-all duration-300"
                aria-label="Power House Gym WhatsApp Support"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation explore */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-bebas text-lg text-white tracking-widest uppercase">
              // EXPLORE LINKS
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="text-xs text-gray-400 hover:text-gold transition-colors duration-200 block"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Contact coordinates details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-bebas text-lg text-white tracking-widest uppercase">
              // INFORMATION
            </h4>
            <ul className="space-y-3 font-sans text-xs text-gray-400 leading-relaxed">
              <li>
                <strong className="text-white block font-medium">Power House Bhusawal:</strong>
                Sr. No. 78/1B, Plot No. 10, Yawal Road, Saichandra Nagar, Bhusawal, Maharashtra 425201
              </li>
              <li>
                <strong className="text-white block font-medium">Inquiries Phone:</strong>
                077570 77393
              </li>
              <li>
                <strong className="text-white block font-medium">Closing Schedules:</strong>
                Monday to Saturday {timings.weekdays}. {timings.sunday.toLowerCase().includes("closed") ? `Sunday Gym is ${timings.sunday}.` : `Sunday: ${timings.sunday}`}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright details and Scroll back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <p className="text-[11px] font-sans text-gray-500">
              © 2026 Power House Gym & Nutrition. All rights reserved. Registered Bhusawal Performance Lab.
            </p>
            <p className="text-[9.5px] font-mono text-gray-650 text-gray-600 block">
              Machinery registered trademarks // HOIST Fitness ROC-IT & VIVA High Precision Cardio Group.
            </p>
          </div>

          {/* Scroll back to top button */}
          <motion.button
            whileHover={{ y: -3, backgroundColor: "rgba(201,168,76,1)", color: "#0A0A0A" }}
            onClick={() => scrollTo("#home")}
            className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold transition-all duration-300 cursor-pointer"
            aria-label="Scroll back to top of the page"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
