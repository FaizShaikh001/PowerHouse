import React from "react";
import { motion } from "motion/react";
import { Dumbbell, Trophy, Apple, Clock, ShieldAlert, Star } from "lucide-react";
import { ScrollStaggerContainer, ScrollStaggerItem } from "./ScrollReveal";
import { useGymData } from "../context/GymDataContext";
import { getViewportMargin } from "../utils/scroll";
import { useTranslation } from "../context/LanguageContext";

export default function About() {
  const { timings } = useGymData();
  const { t, language } = useTranslation();

  const getTranslatedHighlight = (title: string, desc: string) => {
    if (language === "mr") {
      switch (title) {
        case "Premium Machines":
          return {
            title: "प्रीमियम मशीन्स",
            desc: "सर्वोच्च शरीराला आकार देण्यासाठी जगप्रसिद्ध Hoist Fitness आणि Viva साधनांनी सुसज्ज."
          };
        case "Expert Coaches":
          return {
            title: "तज्ज्ञ प्रशिक्षक",
            desc: "वैयक्तिक लक्ष, सुरक्षितता आणि योग्य स्वरूपाची खात्री करण्यासाठी आमची तज्ज्ञ टीम सदैव तयार."
          };
        case "Nutrition Guides":
          return {
            title: "पोषण आहार मार्गदर्शन",
            desc: "तुमच्या गरजेनुसार तयार केलेली सानुकूल पोषक आहार रचना आणि पुरवणी योजना."
          };
        case "Premium Hours":
          return {
            title: "वेळा आणि सुविधा",
            desc: `सोम - शनि: ${timings.weekdays} (रविवार सुट्टी: ${timings.sunday}). महिलांसाठी खास वेळ: ${timings.womenExclusive}.`
          };
      }
    }
    return { title, desc };
  };

  const HIGHLIGHTS = [
    {
      title: "Premium Machines",
      desc: "Engineered with Hoist Fitness and Viva bio-mechanical standard equipment for maximum muscle alignment.",
      icon: Dumbbell,
      accentColor: "border-gold/30 hover:border-gold hover:shadow-gold/10",
    },
    {
      title: "Expert Coaches",
      desc: "Dedicating personalized attention, safety parameters, training protocols, and continuous motivation.",
      icon: Trophy,
      accentColor: "border-electric-red/30 hover:border-electric-red hover:shadow-electric-red/10",
    },
    {
      title: "Nutrition Guides",
      desc: "Complete nutritional frameworks covering macro distribution, supplement protocols, and meal timing.",
      icon: Apple,
      accentColor: "border-gold/30 hover:border-gold hover:shadow-gold/10",
    },
    {
      title: "Premium Hours",
      desc: `Mon - Sat: ${timings.weekdays} (Sunday Gym is ${timings.sunday}). Exclusive Women's hours list: ${timings.womenExclusive}.`,
      icon: Clock,
      accentColor: "border-electric-red/30 hover:border-electric-red hover:shadow-electric-red/10",
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute right-0 top-1/3 w-[30rem] h-[30rem] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[25rem] h-[25rem] rounded-full bg-electric-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Bold narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: getViewportMargin() }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-gold uppercase block">
                {language === "mr" ? "[ प्रतिष्ठित परफॉर्मन्स लॅब ]" : "[ ESTABLISHED PERFORMANCE LAB ]"}
              </span>
              <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-tight leading-none uppercase flex items-start gap-4" id="about-headline">
                <Dumbbell className="w-8 h-8 sm:w-12 sm:h-12 text-gold shrink-0 mt-1" />
                {language === "en" ? (
                  <div>
                    THE ULTIMATE <br />
                    <span className="text-gold">TRANSFORMATION LAB</span>
                  </div>
                ) : (
                  <div>
                    परम शारीरिक <br />
                    <span className="text-gold">रूपांतरण लॅब</span>
                  </div>
                )}
              </h2>
            </div>

            {language === "mr" ? (
              <p className="font-sans text-gray-300 leading-relaxed text-base sm:text-lg">
                पॉवर हाऊस केवळ एक जिम नाही — हे भुसावळच्या मध्यभागी असलेलं एक समर्पित फिटनेस केंद्र आहे. जगभरातल्या सर्वोत्तम खेळाडूंनी निवडलेल्या <span className="text-gold font-semibold">Hoist Fitness</span> आणि <span className="text-gold font-semibold">Viva Fitness</span> प्रीमियम मशीन्ससह, आम्ही तुम्हाला योग्य यश मिळवून देतो.
              </p>
            ) : (
              <p className="font-sans text-gray-300 leading-relaxed text-base sm:text-lg">
                Power House isn't just a gym — it's a dedicated environment built in the heart of Bhusawal. Armed with 
                <span className="text-gold font-semibold"> Hoist Fitness</span> and 
                <span className="text-gold font-semibold"> Viva Fitness</span> machines trusted by professionals worldwide, 
                we furnish the exact tools champions leverage to succeed.
              </p>
            )}

            {language === "mr" ? (
              <blockquote className="border-l-2 border-electric-red pl-4 py-1 italic text-gray-400 text-sm leading-relaxed">
                "आम्ही निरुपयोगी गर्दी काढून अचूक बायो-तज्ज्ञ लक्ष्यित तंत्रज्ञान आणले आहे. पॉवर हाऊस म्हणजे जिथे तुमचे ध्येय थेट परिणाम बनून समोर येते."
              </blockquote>
            ) : (
              <blockquote className="border-l-2 border-electric-red pl-4 py-1 italic text-gray-400 text-sm leading-relaxed">
                "We took away standard gym clutter and replaced it with bio-accurate target loading. Power House represents the peak environment where intent meets raw results."
              </blockquote>
            )}

            {/* Quick Gym Specs / Badges */}
            {language === "mr" ? (
              <div className="flex flex-wrap gap-2.5 pt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-900 border border-white/5 text-xs text-gray-300">
                  ⭐ <strong className="text-white">४.८ रेटिंग</strong> (भुसावळ क्षेत्र)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-900 border border-white/5 text-xs text-gray-300">
                  💪 Hoist प्रमाणित मांडणी
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#13110C] border border-gold/15 text-xs text-gold font-bold">
                  ❄️ पूर्णपणे वातानुकूलित (AC)
                </span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2.5 pt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-900 border border-white/5 text-xs text-gray-300">
                  ⭐ <strong className="text-white">4.8 Rating</strong> (Bhusawal Area)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-900 border border-white/5 text-xs text-gray-300">
                  💪 Hoist Certified Layout
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#13110C] border border-gold/15 text-xs text-gold font-bold">
                  ❄️ Fully Air Conditioned
                </span>
              </div>
            )}
          </motion.div>

          {/* Right Column: Grid of highlight cards with staggered entries */}
          <div className="lg:col-span-7">
            <ScrollStaggerContainer 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6" 
              id="about-highlights-grid"
              staggerChildren={0.15}
            >
              {HIGHLIGHTS.map((card) => {
                const IconComponent = card.icon;
                const transCard = getTranslatedHighlight(card.title, card.desc);
                return (
                  <ScrollStaggerItem key={card.title} variant="fade-up">
                    <motion.div
                      className="p-6 rounded-2xl bg-card-bg/70 backdrop-blur-md transition-all duration-300 shadow-xl h-full gold-radial-border"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-white/5 flex items-center justify-center mb-4 text-gold">
                        <IconComponent className="w-6 h-6 text-gold" />
                      </div>
                      <h3 className="font-bebas text-2xl text-white tracking-wider mb-2 uppercase">
                        {transCard.title}
                      </h3>
                      <p className="font-sans text-xs text-gray-400 leading-relaxed">
                        {transCard.desc}
                      </p>
                    </motion.div>
                  </ScrollStaggerItem>
                );
              })}
            </ScrollStaggerContainer>
          </div>

        </div>
      </div>
    </section>
  );
}
