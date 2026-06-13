import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, Dumbbell, Calendar, Ticket } from "lucide-react";
import { smoothScrollTo } from "../utils/scroll";
import { useGymData } from "../context/GymDataContext";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "timings" | "memberships" | "trials";
  icon: React.ReactNode;
}

export default function FAQ() {
  const { timings } = useGymData();
  const [openId, setOpenId] = useState<string | null>("timing-1");
  const [activeCategory, setActiveCategory] = useState<"all" | "timings" | "memberships" | "trials">("all");

  const faqs: FAQItem[] = [
    {
      id: "timing-1",
      question: "What are the standard operating hours for Power House Gym Bhusawal?",
      answer: `We are open Monday to Saturday from ${timings.weekdays} continuously. We remain ${timings.sunday.toLowerCase().includes("closed") ? "closed" :`operating in state: ${timings.sunday}`} on Sundays to allow for intensive deep sanitization and scheduled mechanical calibration of our heavy systems.`,
      category: "timings",
      icon: <Calendar className="w-4 h-4 text-gold" />,
    },
    {
      id: "timing-2",
      question: "Are there dedicated times exclusively for women's training?",
      answer: `Yes. To ensure maximum comfort and focused personal training, we offer exclusive Women's Special sessions: ${timings.womenExclusive}. Outside of these slots, the gym is mixed-gender with equal priority coaching support.`,
      category: "timings",
      icon: <Calendar className="w-4 h-4 text-gold" />,
    },
    {
      id: "membership-1",
      question: "What does the premium membership regimen include?",
      answer: "Our tiers range from basic access to customized home-food friendly nutrition coaching and dedicated elite personal mentoring by K11 graduate Sachin Patil. Every membership gives you full, unrestricted access to our raw and heavy free weights, 50KG dumbbells, and the fully air-conditioned aesthetic premises.",
      category: "memberships",
      icon: <Dumbbell className="w-4 h-4 text-gold" />,
    },
    {
      id: "membership-2",
      question: "Can I pause, freeze, or transfer my membership to another person?",
      answer: "Yes, our Quarterly Prestige and Annual Legacy plans come with structural membership suspension/pausing privileges. Legacy members can also transfer their outstanding validity to an immediate family member once per term. Please contact the front desk or coordinate through WhatsApp.",
      category: "memberships",
      icon: <Dumbbell className="w-4 h-4 text-gold" />,
    },
    {
      id: "trial-1",
      question: "How do I request a complimentary guest trial session?",
      answer: "Any resident of Bhusawal can book a free 1-day pass. Simply scroll down to our contact form, fill out your goal profiles, or click 'Request Sachin's Priority Coaching Slot'. We will confirm your session time instantly over WhatsApp.",
      category: "trials",
      icon: <Ticket className="w-4 h-4 text-gold" />,
    },
    {
      id: "trial-2",
      question: "Do I need to book machines or master trainer sessions in advance?",
      answer: "General machines including our Viva Fitness Smith Machine and Dual Pulley Cable Stations operate on a general courtesy basis. Dedicated coaching assessments with Sachin Patil must be reserved 24 hours in advance via WhatsApp.",
      category: "trials",
      icon: <Ticket className="w-4 h-4 text-gold" />,
    }
  ];

  const filteredFaqs = faqs.filter(
    (faq) => activeCategory === "all" || faq.category === activeCategory
  );

  return (
    <section id="faq" className="relative py-24 bg-[#0A0A0A] overflow-hidden border-t border-white/5">
      {/* Premium backdrop radial lighting */}
      <div className="absolute right-1/4 top-1/3 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-gold uppercase block">
            [ CLEAR ANSWERS ]
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-white tracking-widest uppercase">
            COMMON <span className="text-gold">QUERIES</span>
          </h2>
          <div className="h-1 w-24 bg-electric-red mx-auto" />
          <p className="max-w-lg mx-auto font-sans text-xs sm:text-sm text-gray-400 tracking-wider">
            Everything you need to know about our elite coaching framework, scheduled slots, and custom local fitness policies.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" id="faq-categories">
          {[
            { id: "all", label: "All Questions" },
            { id: "timings", label: "Operating Hours" },
            { id: "memberships", label: "Membership Plans" },
            { id: "trials", label: "Trial Policies" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as any);
                const matched = faqs.find(f => cat.id === "all" || f.category === cat.id);
                if (matched) setOpenId(matched.id);
              }}
              className={`px-5 py-2.5 rounded-full font-sans text-[11px] uppercase tracking-wider font-bold transition-all duration-300 border cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-gold text-[#0A0A0A] border-gold shadow-lg shadow-gold/20"
                  : "bg-stone-900/60 text-gray-400 border-white/5 hover:border-gold/30 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4" id="faq-accordion-stack">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`group rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#121212] border-gold/30 shadow-lg shadow-gold/5"
                    : "bg-[#0E0E0E]/80 border-white/5 hover:border-white/10"
                }`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer transition-all"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 pr-4">
                    <span className="flex-shrink-0 p-2 rounded-lg bg-stone-900 border border-white/5 group-hover:border-gold/20 transition-all">
                      {faq.icon}
                    </span>
                    <span className="font-sans font-medium text-sm sm:text-base text-gray-200 group-hover:text-white transition-colors duration-200">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`flex-shrink-0 p-1.5 rounded-full bg-stone-900/80 border border-white/5 text-gray-400 group-hover:text-gold transition-all duration-300 ${
                      isOpen ? "rotate-180 text-gold border-gold/30" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 pb-6 pt-1 pl-15 sm:pl-17 border-t border-white/5">
                        <p className="font-sans text-xs sm:text-sm leading-relaxed text-gray-400 animate-fade-in">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick Help Desk Card */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-stone-950 to-stone-900 border border-white/5 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4 justify-center sm:justify-start mb-4 sm:mb-0">
            <div className="p-3 bg-gold/10 border border-gold/20 rounded-xl text-gold">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-bebas text-xl text-white tracking-wider">HAVE MORE SPECIFIC INQUIRIES?</h4>
              <p className="font-sans text-xs text-gray-400">Reach out directly to Sachin Patil's executive desk anytime.</p>
            </div>
          </div>
          <button
            onClick={() => {
              const msgInput = document.getElementById("contact-message") as HTMLTextAreaElement | null;
              if (msgInput) {
                msgInput.value = "Hi Power House! I have a general question about the gym's programs/facilities. Please assist me.";
                msgInput.dispatchEvent(new Event('input', { bubbles: true }));
              }
              smoothScrollTo("#contact");
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gold hover:bg-gold-light text-black font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
          >
            Ask Questions Now
          </button>
        </div>

      </div>
    </section>
  );
}
