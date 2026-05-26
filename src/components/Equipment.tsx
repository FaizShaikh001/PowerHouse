import { motion } from "motion/react";
import { Dumbbell, ShieldAlert, Award, Footprints, Zap, Apple, Compass, Flame, Heart } from "lucide-react";
import { EquipmentFeature, EquipmentItem } from "../types";

const FEATURED_BRANDS: EquipmentFeature[] = [
  {
    brand: "HOIST",
    title: "HOIST FITNESS SYSTEMS",
    badge: "The Strength Apex",
    desc: "The gold standard in physical resistance engineering. Featuring specialized body-pivoting mechanics that automatically optimize the center of mass, shielding joints while maximizing muscular fiber recruitment.",
    glowColor: "border-gold hover:shadow-[0_0_30px_rgba(201,168,76,0.25)]",
  },
  {
    brand: "VIVA",
    title: "VIVA CARDIO & MULTI-GYMS",
    badge: "Precision Conditioning",
    desc: "Cutting-edge cardiovascular machines and multi-station cable consoles engineered for continuous structural strain, customized digital telemetry, and high-impact functional performance.",
    glowColor: "border-electric-red hover:shadow-[0_0_30px_rgba(230,57,70,0.25)]",
  },
];

const ITEMS: EquipmentItem[] = [
  {
    name: "Professional Barbells & Squat Section",
    category: "Elite Lifting Arsenal",
    iconName: "Dumbbell",
    benefit: "Calibrated competition barbells, heavy-duty safety racks, power cages and olympic weight platforms."
  },
  {
    name: "Professional Treadmills",
    category: "Viva Cardio Group",
    iconName: "Footprints",
    benefit: "Advanced cushion decks to relieve shock during intense conditioning intervals."
  },
  {
    name: "Dual-Pulley Cable Stations",
    category: "Hoist Strength Group",
    iconName: "Zap",
    benefit: "Continuous resistance profile throughout the complete range of motion."
  },
  {
    name: "Heavy Free Weights",
    category: "Elite Lifting Arsenal",
    iconName: "Dumbbell",
    benefit: "Chrome barbells, calibrated bumpers, and custom rubberized dumbbells up to 50KG."
  },
  {
    name: "Smith Guidance Machine",
    category: "Guided Safety Squat",
    iconName: "Compass",
    benefit: "Integrated safety hooks and vertical paths for targeted leg building and presses."
  },
  {
    name: "Functional Training Zone",
    category: "Athletic Conditioning",
    iconName: "Flame",
    benefit: "Engineered battle ropes, kettlebells, and speed ladders for total body conditioning."
  },
  {
    name: "Supreme Cardio Zone",
    category: "Endurance Building",
    iconName: "Heart",
    benefit: "Self-powered air bikes, elite rowing devices, and heavy-duty elliptical runners."
  }
];

function IconMap({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "Footprints":
      return <Footprints className={className} />;
    case "Zap":
      return <Zap className={className} />;
    case "Dumbbell":
      return <Dumbbell className={className} />;
    case "Compass":
      return <Compass className={className} />;
    case "Flame":
      return <Flame className={className} />;
    case "Heart":
      return <Heart className={className} />;
    default:
      return <Dumbbell className={className} />;
  }
}

export default function Equipment() {
  return (
    <section id="equipment" className="relative py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Background radial soft halos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-gold uppercase block">
            [ ELITE MECHANICAL INVENTORY ]
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-white tracking-widest uppercase">
            WORLD-CLASS <span className="text-gold">EQUIPMENT</span>
          </h2>
          <div className="h-1 w-24 bg-electric-red mx-auto" />
          <p className="max-w-xl mx-auto font-sans text-xs sm:text-sm text-gray-400 tracking-wider">
            We operate no duplicate compromises. Every piece of equipment in Power House represents elite mechanical ergonomics designed for high muscular isolation.
          </p>
        </div>

        {/* Featured Brands Dual Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {FEATURED_BRANDS.map((item, idx) => (
            <motion.div
              key={item.brand}
              initial={{ opacity: 0, x: idx === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`p-8 rounded-3xl bg-gradient-to-br from-[#151515] to-card-bg/80 border-2 border-white/5 ${item.glowColor} transition-all duration-500 relative overflow-hidden group`}
            >
              {/* Absctract badge background decoration */}
              <div className="absolute -right-12 -top-12 text-[#1c1c1c] font-bebas text-[12rem] select-none font-bold z-0 leading-none pointer-events-none group-hover:text-gold/5 transition-colors duration-500">
                {item.brand}
              </div>

              <div className="relative z-10 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gold/10 border border-gold/25 text-[10px] font-mono uppercase tracking-widest text-gold">
                  {item.badge}
                </span>

                <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wider">
                  {item.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed max-w-lg">
                  {item.desc}
                </p>

                <div className="pt-4 flex items-center gap-3">
                  <div className="h-1 w-8 bg-gold" />
                  <span className="text-xs font-mono tracking-widest text-white uppercase sm:text-xs">
                    PREMIUM BRAND ALLIANCE
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sub-equipment grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 [perspective:1000px]" id="equipment-items-grid">
          {ITEMS.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.03, 
                rotateX: 4, 
                rotateY: -4, 
                borderColor: "rgba(201, 168, 76, 0.45)",
                shadow: "0 10px 30px rgba(201, 168, 76, 0.08)"
              }}
              className="p-6 rounded-2xl bg-[#111111] border border-white/5 transition-all duration-350 shadow-lg group flex flex-col justify-between h-52 hover:shadow-[0_0_20px_rgba(201,168,76,0.06)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                    // {item.category}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-card-bg border border-white/5 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-[#0A0A0A] transition-all duration-300">
                    <IconMap name={item.iconName} className="w-5 h-5" />
                  </div>
                </div>

                <h4 className="font-bebas text-2xl text-white tracking-wider uppercase group-hover:text-gold transition-colors duration-200">
                  {item.name}
                </h4>
              </div>

              <p className="font-sans text-xs text-gray-400 mt-2 leading-relaxed">
                {item.benefit}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
