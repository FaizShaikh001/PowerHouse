import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Pause, 
  Dumbbell, 
  Heart, 
  Maximize2, 
  Sparkles, 
  Info, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Layers, 
  User, 
  ChevronRight,
  RefreshCw
} from "lucide-react";
import { getViewportMargin, smoothScrollTo } from "../utils/scroll";

interface GymZone {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  focus: string;
  peakHours: string;
  colorName: string; // gold, red, blue, green, gray
  borderClass: string;
  bgFillClass: string;
  activeBgClass: string;
  textAccentClass: string;
  badgeClass: string;
  icon: React.ReactNode;
  equipmentList: string[];
  capacityLabel: string;
  capacityPercentage: number;
}

export default function GymMap() {
  const [activeZoneId, setActiveZoneId] = useState<string>("strength");
  const [isPlayingTour, setIsPlayingTour] = useState<boolean>(false);
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);
  
  const tourIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const zones: GymZone[] = [
    {
      id: "strength",
      title: "Strength Elite Arena",
      subtitle: "HOIST biomechanical line & heavy selectorized machines",
      description: "Engineered for maximum mechanical isolation, automatic center-of-mass centering, and explosive physical loading.",
      focus: "Hypertrophy, Target Fibers & Forced Resistance Coordination",
      peakHours: "6:00 AM - 9:00 AM & 5:00 PM - 8:30 PM",
      colorName: "gold",
      borderClass: "border-gold/30 hover:border-gold/90",
      bgFillClass: "fill-gold/5 stroke-gold/20",
      activeBgClass: "fill-gold/15 stroke-gold/80 shadow-[0_0_20px_rgba(201,168,76,0.15)]",
      textAccentClass: "text-gold",
      badgeClass: "bg-gold/10 border-gold/30 text-gold",
      icon: <Dumbbell className="w-5 h-5 text-gold" />,
      equipmentList: [
        "Hoist Rock-It Chest Press & Pullover",
        "Dual-Cable Cable Cross Over Column",
        "Plate-Loaded Force Leg Press (45° Angle)",
        "Premium Lat Pull-down & Rowing Stations"
      ],
      capacityLabel: "High Dynamic Load State",
      capacityPercentage: 78
    },
    {
      id: "free-weights",
      title: "Olympic Lifting & Free Weight Lab",
      subtitle: "Calibrated competition plates, elite barbells & heavy dumbbells",
      description: "The raw power generator. Structured with sound-dampening vulcanized rubber composite floors and independent power cages.",
      focus: "Compound Biomechanics, Powerlifting & Absolute Mechanical Force",
      peakHours: "7:00 AM - 9:30 AM & 6:00 PM - 9:00 PM",
      colorName: "red",
      borderClass: "border-electric-red/30 hover:border-electric-red/90",
      bgFillClass: "fill-electric-red/5 stroke-electric-red/20",
      activeBgClass: "fill-electric-red/15 stroke-electric-red/80 shadow-[0_0_20px_rgba(230,57,70,0.15)]",
      textAccentClass: "text-electric-red",
      badgeClass: "bg-electric-red/10 border-electric-red/30 text-electric-red",
      icon: <Activity className="w-5 h-5 text-electric-red" />,
      equipmentList: [
        "Calibrated Heavy Dumbbells up to 50KG",
        "Olympic Flat, Incline & Decline Benches",
        "Heavy-Duty Power Cages with Dual Walk-Ins",
        "Reinforced Deadlift Platforms"
      ],
      capacityLabel: "High Energy Strain",
      capacityPercentage: 85
    },
    {
      id: "cardio",
      title: "Cardio Optimization Hub",
      subtitle: "High-spec Viva treadmills, self-powered air-bikes & rowers",
      description: "Oxygen-saturated system tracking your stamina. Every machine exposes real-time telemetry markers and custom metabolic feedback.",
      focus: "Metabolic Threshold, Active Cardio Endurance & VO2 Max Sprints",
      peakHours: "6:00 AM - 8:30 AM & 5:30 PM - 8:00 PM",
      colorName: "blue",
      borderClass: "border-cyan-500/30 hover:border-cyan-500/90",
      bgFillClass: "fill-cyan-500/5 stroke-cyan-500/20",
      activeBgClass: "fill-cyan-500/15 stroke-cyan-500/80 shadow-[0_0_20px_rgba(6,182,212,0.15)]",
      textAccentClass: "text-cyan-400",
      badgeClass: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
      icon: <Heart className="w-5 h-5 text-cyan-400" />,
      equipmentList: [
        "Viva Premium Cushion-Deck Treadmills",
        "Assault Air-Bikes (Self-Powered Wind Resistance)",
        "Water-Resistance Concept Rowing Devices",
        "High-Intensity Elliptical Cross-Trainers"
      ],
      capacityLabel: "Steady Oxidative Burn",
      capacityPercentage: 62
    },
    {
      id: "stretching",
      title: "Biomechanical conditioning & Stretch Zone",
      subtitle: "High-density cushioning mats, kinetic kettlebells & bands",
      description: "Dedicated to joint mobilization, myofascial relief, posture recovery, and high-elastic compound agility drills.",
      focus: "Functional Range of Motion, Spine Decompression & Kinetic Agility",
      peakHours: "8:00 AM - 10:00 AM & 4:00 PM - 6:30 PM",
      colorName: "green",
      borderClass: "border-emerald-500/30 hover:border-emerald-500/90",
      bgFillClass: "fill-emerald-500/5 stroke-emerald-500/20",
      activeBgClass: "fill-emerald-500/15 stroke-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.15)]",
      textAccentClass: "text-emerald-400",
      badgeClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      equipmentList: [
        "Extra-Thick Density High-Traction Mats",
        "Competition Steel Sport Kettlebells",
        "Multi-Tension Elastic Resistance Bands",
        "Precision Foam Rollers & Kinetic Trigger Balls"
      ],
      capacityLabel: "Peaceful Recovery Flow",
      capacityPercentage: 35
    },
    {
      id: "reception",
      title: "Elite Reception & Body Diagnostics",
      subtitle: "Segmental body analyzer, expert guidance & shake bar",
      description: "The entryway to your physical commitment. Set priorities, measure your biological indices, and order custom post-workout recovery formulas.",
      focus: "Diagnostic Assessments, Performance Nutrition & Member Onboarding",
      peakHours: "Continuous (8:00 AM - 9:30 PM)",
      colorName: "gray",
      borderClass: "border-gray-400/30 hover:border-gray-400/90",
      bgFillClass: "fill-gray-400/5 stroke-gray-400/20",
      activeBgClass: "fill-gray-400/15 stroke-gray-400/80 shadow-[0_0_20px_rgba(156,163,175,0.15)]",
      textAccentClass: "text-gray-300",
      badgeClass: "bg-gray-400/10 border-gray-400/30 text-gray-300",
      icon: <User className="w-5 h-5 text-gray-300" />,
      equipmentList: [
        "Premium Multi-Frequency Bio-Impedance Analyzer",
        "Post-Workout Peptide & Hydration Bar",
        "Locker Vaults & Dynamic Consulting Private Desk",
        "Elite Trainer Spotlighting Dashboard"
      ],
      capacityLabel: "Welcoming Guidance",
      capacityPercentage: 20
    }
  ];

  const currentZone = zones.find(z => z.id === activeZoneId) || zones[0];

  // Auto-tour control logic
  useEffect(() => {
    if (isPlayingTour) {
      tourIntervalRef.current = setInterval(() => {
        setActiveZoneId((prevId) => {
          const currentIndex = zones.findIndex(z => z.id === prevId);
          const nextIndex = (currentIndex + 1) % zones.length;
          return zones[nextIndex].id;
        });
      }, 4000); // Cycle every 4 seconds
    } else {
      if (tourIntervalRef.current) {
        clearInterval(tourIntervalRef.current);
        tourIntervalRef.current = null;
      }
    }

    return () => {
      if (tourIntervalRef.current) {
        clearInterval(tourIntervalRef.current);
      }
    };
  }, [isPlayingTour]);

  // Handle clicking on a zone
  const handleZoneSelect = (zoneId: string) => {
    setIsPlayingTour(false); // Stop auto-tour if user manually selects a section
    setActiveZoneId(zoneId);
  };

  return (
    <section id="gym-floor-plan" className="relative py-24 bg-[#0A0A0A] border-t border-white/5 overflow-hidden">
      {/* Decorative Blueprint Grid Background in custom section */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 bg-[linear-gradient(rgba(201,168,76,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.1)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
      <div className="absolute -left-20 top-1/4 w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute -right-20 bottom-1/4 w-96 h-96 rounded-full bg-electric-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: getViewportMargin() }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-gold uppercase block">
            [ ARCHITECTURAL LAYOUT ]
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-white tracking-widest uppercase">
            GYM <span className="text-gold">FLOOR PLAN</span>
          </h2>
          <div className="h-1 w-24 bg-electric-red mx-auto" />
          <p className="max-w-2xl mx-auto font-sans text-xs sm:text-sm text-gray-400 tracking-wider">
            Explore our state-of-the-art facility layout. Interact with the digital 2D blueprint map to scan high-capacity fitness zones, pristine equipment placements, and specialized training quarters.
          </p>
        </motion.div>

        {/* Dashboard Frame Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Interactive Blueprint Canvas Column (7/12 width) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Direct selector buttons bar */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#121212] border border-white/5">
              {zones.map((z) => {
                const isActive = activeZoneId === z.id;
                let activeColorClass = "border-gold text-gold bg-gold/10";
                if (z.id === "free-weights") activeColorClass = "border-electric-red text-electric-red bg-electric-red/10";
                if (z.id === "cardio") activeColorClass = "border-cyan-400 text-cyan-400 bg-cyan-400/10";
                if (z.id === "stretching") activeColorClass = "border-emerald-400 text-emerald-400 bg-emerald-400/10";
                if (z.id === "reception") activeColorClass = "border-gray-300 text-gray-300 bg-gray-400/10";
                
                return (
                  <button
                    key={z.id}
                    id={`btn-select-zone-${z.id}`}
                    onClick={() => handleZoneSelect(z.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                      isActive 
                        ? `border ${activeColorClass}` 
                        : "border border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {z.icon}
                    <span>{z.id.replace("-", " ")}</span>
                  </button>
                );
              })}
            </div>

            {/* SVG MAP WRAPPER with absolute visual elements */}
            <div className="relative p-4 sm:p-6 rounded-3xl bg-[#121212] border-2 border-white/5 overflow-hidden group/canvas shadow-2xl">
              
              {/* Compass Indicator decoration */}
              <div className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 font-mono text-[9px] tracking-widest pointer-events-none select-none">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>INVENTORY RADAR LIVE</span>
              </div>

              {/* Gym Floor Blueprint SVG */}
              <div className="w-full h-auto aspect-[8/5] relative">
                <svg
                  viewBox="0 0 800 500"
                  className="w-full h-full select-none"
                  style={{ filter: "drop-shadow(2px 4px 10px rgba(0,0,0,0.5))" }}
                >
                  <defs>
                    <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    </pattern>
                    <linearGradient id="strengthGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="weightsGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E63946" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#E63946" stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="cardioGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="stretchGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="receptionGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  {/* Grid overlay */}
                  <rect width="800" height="500" rx="16" fill="url(#grid-pattern)" />

                  {/* Floor Boundaries Frame */}
                  <rect x="15" y="15" width="770" height="470" rx="12" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                  <rect x="25" y="25" width="750" height="450" rx="8" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" strokeDasharray="3,3" />

                  {/* ================= ZONE 1: STRENGTH ELITE (Top Left Room) ================= */}
                  <g 
                    id="map-zone-strength"
                    onMouseEnter={() => setHoveredZoneId("strength")}
                    onMouseLeave={() => setHoveredZoneId(null)}
                    onClick={() => handleZoneSelect("strength")}
                    className="cursor-pointer group"
                  >
                    {/* Zone bounding background path */}
                    <rect 
                      x="40" 
                      y="40" 
                      width="350" 
                      height="200" 
                      rx="14" 
                      fill={activeZoneId === "strength" ? "url(#strengthGlow)" : (hoveredZoneId === "strength" ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.01)")}
                      stroke={activeZoneId === "strength" ? "#C9A84C" : (hoveredZoneId === "strength" ? "rgba(201,168,76,0.6)" : "rgba(255,255,255,0.15)")}
                      strokeWidth={activeZoneId === "strength" ? "2.5" : "1.5"}
                      style={{ transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
                    />
                    
                    {/* Interior Details: Machines and racks schemas */}
                    <g opacity={activeZoneId === "strength" || hoveredZoneId === "strength" ? "1" : "0.5"} style={{ transition: "opacity 0.3s" }}>
                      {/* Hoist dynamic chest press machine representation */}
                      <rect x="60" y="60" width="30" height="30" rx="4" fill="#1C1C1C" stroke="#C9A84C" strokeWidth="1.5" />
                      <line x1="60" y1="75" x2="90" y2="75" stroke="#C9A84C" strokeWidth="1" />
                      <circle cx="75" cy="75" r="4" fill="#C9A84C animate-pulse" />
                      <text x="60" y="105" fill="#C9A84C" fontSize="8" fontFamily="monospace">HOIST M1</text>
                      
                      {/* Double Pulley cable crossover lines */}
                      <circle cx="160" cy="70" r="8" fill="#1C1C1C" stroke="#C9A84C" strokeWidth="1.5" />
                      <circle cx="280" cy="70" r="8" fill="#1C1C1C" stroke="#C9A84C" strokeWidth="1.5" />
                      <line x1="168" y1="70" x2="272" y2="70" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3,3" />
                      <text x="200" y="63" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace" textAnchor="middle">CABLE RACK SYSTEM</text>

                      {/* Power Leg press machine visual */}
                      <rect x="130" y="130" width="45" height="25" rx="3" fill="#1C1C1C" stroke="#C9A84C" strokeWidth="1.5" />
                      <line x1="130" y1="130" x2="175" y2="155" stroke="#C9A84C" strokeWidth="2" />
                      <line x1="130" y1="155" x2="175" y2="130" stroke="#C9A84C" strokeWidth="1" />
                      <text x="130" y="170" fill="gray" fontSize="8" fontFamily="sans-serif">LEG PRESS</text>

                      {/* Plate Loaded row station */}
                      <rect x="235" y="130" width="35" height="30" rx="3" fill="#1C1C1C" stroke="#C9A84C" strokeWidth="1.5" />
                      <circle cx="252" cy="145" r="5" fill="#1C1C1C" stroke="#C9A84C" strokeWidth="1" />
                      <text x="233" y="175" fill="gray" fontSize="8" fontFamily="sans-serif">LAT ROW</text>
                    </g>

                    {/* Zone Text Tag */}
                    <text 
                      x="215" 
                      y="215" 
                      fontFamily="var(--font-bebas)" 
                      fontSize="14" 
                      letterSpacing="2" 
                      fill={activeZoneId === "strength" ? "#C9A84C" : "#E2E8F0"}
                      textAnchor="middle"
                      style={{ transition: "all 0.3s" }}
                    >
                      STRENGTH ELITE ZONE
                    </text>
                  </g>

                  {/* ================= ZONE 2: FREE WEIGHTS (Bottom Left Room) ================= */}
                  <g 
                    id="map-zone-free-weights"
                    onMouseEnter={() => setHoveredZoneId("free-weights")}
                    onMouseLeave={() => setHoveredZoneId(null)}
                    onClick={() => handleZoneSelect("free-weights")}
                    className="cursor-pointer group"
                  >
                    {/* Zone bounding background path */}
                    <rect 
                      x="40" 
                      y="255" 
                      width="350" 
                      height="205" 
                      rx="14" 
                      fill={activeZoneId === "free-weights" ? "url(#weightsGlow)" : (hoveredZoneId === "free-weights" ? "rgba(230,57,70,0.12)" : "rgba(255,255,255,0.01)")}
                      stroke={activeZoneId === "free-weights" ? "#E63946" : (hoveredZoneId === "free-weights" ? "rgba(230,57,70,0.6)" : "rgba(255,255,255,0.15)")}
                      strokeWidth={activeZoneId === "free-weights" ? "2.5" : "1.5"}
                      style={{ transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
                    />
                    
                    {/* Interior Details: Dumbbell racks and benches */}
                    <g opacity={activeZoneId === "free-weights" || hoveredZoneId === "free-weights" ? "1" : "0.5"} style={{ transition: "opacity 0.3s" }}>
                      {/* Heavy Barbells Rack along the wall */}
                      <rect x="55" y="420" width="320" height="15" rx="3" fill="#151515" stroke="#E63946" strokeWidth="1" />
                      <path d="M 65,427 L 75,427 M 100,427 L 110,427 M 135,427 L 145,427 M 170,427 L 180,427 M 205,427 L 215,427 M 240,427 L 250,427 M 275,427 L 285,427 M 310,427 L 320,427" stroke="#E63946" strokeWidth="2.5" strokeLinecap="round" />
                      <text x="55" y="412" fill="#E63946" fontSize="7" fontFamily="monospace">HEAVY DUMBBELLS RACK (10KG - 50KG)</text>

                      {/* Squat Power Cage 1 */}
                      <rect x="65" y="275" width="40" height="40" rx="4" fill="#1C1C1C" stroke="#E63946" strokeWidth="1.5" />
                      <rect x="73" y="271" width="24" height="4" fill="#E63946" />
                      {/* Barbell line */}
                      <line x1="55" y1="295" x2="115" y2="295" stroke="#FFF" strokeWidth="2" />
                      <circle cx="58" cy="295" r="4" fill="#E63946" />
                      <circle cx="112" cy="295" r="4" fill="#E63946" />
                      <text x="65" y="331" fill="gray" fontSize="8" fontFamily="sans-serif">POWER CAGE A</text>

                      {/* Squat Power Cage 2 */}
                      <rect x="155" y="275" width="40" height="40" rx="4" fill="#1C1C1C" stroke="#E63946" strokeWidth="1.5" />
                      <rect x="163" y="271" width="24" height="4" fill="#E63946" />
                      {/* Barbell line */}
                      <line x1="145" y1="295" x2="205" y2="295" stroke="#FFF" strokeWidth="2" />
                      <circle cx="148" cy="295" r="4" fill="#E63946" />
                      <circle cx="202" cy="295" r="4" fill="#E63946" />
                      <text x="155" y="331" fill="gray" fontSize="8" fontFamily="sans-serif">POWER CAGE B</text>

                      {/* Adjustable Weight Benches */}
                      <rect x="250" y="285" width="12" height="35" rx="2" fill="#1C1C1C" stroke="#E63946" strokeWidth="1.2" />
                      <rect x="290" y="285" width="12" height="35" rx="2" fill="#1C1C1C" stroke="#E63946" strokeWidth="1.2" />
                      <rect x="330" y="285" width="12" height="35" rx="2" fill="#1C1C1C" stroke="#E63946" strokeWidth="1.2" />
                    </g>

                    {/* Zone Text Tag */}
                    <text 
                      x="215" 
                      y="390" 
                      fontFamily="var(--font-bebas)" 
                      fontSize="14" 
                      letterSpacing="2" 
                      fill={activeZoneId === "free-weights" ? "#E63946" : "#E2E8F0"}
                      textAnchor="middle"
                      style={{ transition: "all 0.3s" }}
                    >
                      FREE WEIGHTS & OLYMPIC PLATFORMS
                    </text>
                  </g>

                  {/* ================= ZONE 3: CARDIO (Top Right Room) ================= */}
                  <g 
                    id="map-zone-cardio"
                    onMouseEnter={() => setHoveredZoneId("cardio")}
                    onMouseLeave={() => setHoveredZoneId(null)}
                    onClick={() => handleZoneSelect("cardio")}
                    className="cursor-pointer group"
                  >
                    {/* Zone bounding background path */}
                    <rect 
                      x="405" 
                      y="40" 
                      width="355" 
                      height="200" 
                      rx="14" 
                      fill={activeZoneId === "cardio" ? "url(#cardioGlow)" : (hoveredZoneId === "cardio" ? "rgba(6,182,212,0.12)" : "rgba(255,255,255,0.01)")}
                      stroke={activeZoneId === "cardio" ? "#06B6D4" : (hoveredZoneId === "cardio" ? "rgba(6,182,212,0.6)" : "rgba(255,255,255,0.15)")}
                      strokeWidth={activeZoneId === "cardio" ? "2.5" : "1.5"}
                      style={{ transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
                    />
                    
                    {/* Interior Details: Treadmills and air bikes */}
                    <g opacity={activeZoneId === "cardio" || hoveredZoneId === "cardio" ? "1" : "0.5"} style={{ transition: "opacity 0.3s" }}>
                      {/* Row of Treadmills */}
                      <g transform="translate(425, 60)">
                        {/* Treadmill 1 */}
                        <rect x="0" y="0" width="22" height="45" rx="3" fill="#1C1C1C" stroke="#06B6D4" strokeWidth="1.2" />
                        <rect x="3" y="3" width="16" height="30" fill="#06B6D4" opacity="0.1" />
                        <line x1="0" y1="12" x2="22" y2="12" stroke="#06B6D4" strokeWidth="1" />
                        <circle cx="11" cy="6" r="1.5" fill="#06B6D4" />
                        
                        {/* Treadmill 2 */}
                        <rect x="36" y="0" width="22" height="45" rx="3" fill="#1C1C1C" stroke="#06B6D4" strokeWidth="1.2" />
                        <rect x="39" y="3" width="16" height="30" fill="#06B6D4" opacity="0.1" />
                        <line x1="36" y1="12" x2="58" y2="12" stroke="#06B6D4" strokeWidth="1" />
                        <circle cx="47" cy="6" r="1.5" fill="#06B6D4" />

                        {/* Treadmill 3 */}
                        <rect x="72" y="0" width="22" height="45" rx="3" fill="#1C1C1C" stroke="#06B6D4" strokeWidth="1.2" />
                        <rect x="75" y="3" width="16" height="30" fill="#06B6D4" opacity="0.1" />
                        <line x1="72" y1="12" x2="94" y2="12" stroke="#06B6D4" strokeWidth="1" />
                        <circle cx="83" cy="6" r="1.5" fill="#06B6D4" />

                        {/* Treadmill 4 */}
                        <rect x="108" y="0" width="22" height="45" rx="3" fill="#1C1C1C" stroke="#06B6D4" strokeWidth="1.2" />
                        <rect x="111" y="3" width="16" height="30" fill="#06B6D4" opacity="0.1" />
                        <line x1="108" y1="12" x2="130" y2="12" stroke="#06B6D4" strokeWidth="1" />
                        <circle cx="119" cy="6" r="1.5" fill="#06B6D4" />
                        
                        <text x="70" y="60" fill="gray" fontSize="7" fontFamily="monospace" textAnchor="middle">VIVA TREADMILL ENGINE DECK</text>
                      </g>

                      {/* Assault Air Bikes */}
                      <g transform="translate(600, 60)">
                        {/* Air Bike 1 */}
                        <circle cx="15" cy="20" r="12" fill="#1C1C1C" stroke="#06B6D4" strokeWidth="1.2" />
                        <path d="M 15,8 L 15,32 M 3,20 L 27,20" stroke="#06B6D4" strokeWidth="1" />
                        <rect x="11" y="5" width="8" height="5" rx="1" fill="#06B6D4" />

                        {/* Air Bike 2 */}
                        <circle cx="55" cy="20" r="12" fill="#1C1C1C" stroke="#06B6D4" strokeWidth="1.2" />
                        <path d="M 55,8 L 55,32 M 43,20 L 67,20" stroke="#06B6D4" strokeWidth="1" />
                        <rect x="51" y="5" width="8" height="5" rx="1" fill="#06B6D4" />

                        <text x="35" y="44" fill="gray" fontSize="7" fontFamily="monospace" textAnchor="middle">AIR BIKES</text>
                      </g>

                      {/* Water Rowers */}
                      <g transform="translate(480, 145)">
                        <rect x="0" y="0" width="55" height="12" rx="2" fill="#1C1C1C" stroke="#06B6D4" strokeWidth="1" />
                        <circle cx="47" cy="6" r="4" fill="#06B6D4" />
                        <rect x="120" y="0" width="55" height="12" rx="2" fill="#1C1C1C" stroke="#06B6D4" strokeWidth="1" />
                        <circle cx="167" cy="6" r="4" fill="#06B6D4" />
                        <text x="85" y="-5" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="middle">CONCEPT WATER ROWERS</text>
                      </g>
                    </g>

                    {/* Zone Text Tag */}
                    <text 
                      x="582" 
                      y="215" 
                      fontFamily="var(--font-bebas)" 
                      fontSize="14" 
                      letterSpacing="2" 
                      fill={activeZoneId === "cardio" ? "#06B6D4" : "#E2E8F0"}
                      textAnchor="middle"
                      style={{ transition: "all 0.3s" }}
                    >
                      CARDIO OPTIMIZATION HUB
                    </text>
                  </g>

                  {/* ================= ZONE 4: STRETCHING & FUNCTIONAL (Bottom Right Center) ================= */}
                  <g 
                    id="map-zone-stretching"
                    onMouseEnter={() => setHoveredZoneId("stretching")}
                    onMouseLeave={() => setHoveredZoneId(null)}
                    onClick={() => handleZoneSelect("stretching")}
                    className="cursor-pointer group"
                  >
                    {/* Zone bounding background path */}
                    <rect 
                      x="405" 
                      y="255" 
                      width="225" 
                      height="205" 
                      rx="14" 
                      fill={activeZoneId === "stretching" ? "url(#stretchGlow)" : (hoveredZoneId === "stretching" ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.01)")}
                      stroke={activeZoneId === "stretching" ? "#10B981" : (hoveredZoneId === "stretching" ? "rgba(16,185,129,0.6)" : "rgba(255,255,255,0.15)")}
                      strokeWidth={activeZoneId === "stretching" ? "2.5" : "1.5"}
                      style={{ transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
                    />
                    
                    {/* Interior Details: Yoga mats, Kettlebells rack */}
                    <g opacity={activeZoneId === "stretching" || hoveredZoneId === "stretching" ? "1" : "0.5"} style={{ transition: "opacity 0.3s" }}>
                      {/* Heavy Stretch Mats */}
                      <g transform="translate(425, 275) rotate(15)">
                        <rect x="0" y="0" width="20" height="42" rx="2" fill="#1C1C1C" stroke="#10B981" strokeWidth="1.2" />
                        <line x1="0" y1="8" x2="20" y2="8" stroke="#10B981" strokeWidth="0.8" />
                        <rect x="40" y="0" width="20" height="42" rx="2" fill="#1C1C1C" stroke="#10B981" strokeWidth="1.2" />
                        <line x1="40" y1="8" x2="60" y2="8" stroke="#10B981" strokeWidth="0.8" />
                        <rect x="80" y="0" width="20" height="42" rx="2" fill="#1C1C1C" stroke="#10B981" strokeWidth="1.2" />
                        <line x1="80" y1="8" x2="100" y2="8" stroke="#10B981" strokeWidth="0.8" />
                      </g>

                      {/* Cast kettlebell collection */}
                      <circle cx="560" cy="285" r="5" fill="#1C1C1C" stroke="#10B981" strokeWidth="1.5" />
                      <path d="M 557,280 C 557,277 563,277 563,280" stroke="#10B981" strokeWidth="1" fill="none" />
                      
                      <circle cx="580" cy="285" r="7" fill="#1C1C1C" stroke="#10B981" strokeWidth="1.5" />
                      <path d="M 576,279 C 576,275 584,275 584,279" stroke="#10B981" strokeWidth="1.2" fill="none" />

                      <circle cx="602" cy="285" r="9" fill="#1C1C1C" stroke="#10B981" strokeWidth="1.5" />
                      <path d="M 598,278 C 598,272 606,272 606,278" stroke="#10B981" strokeWidth="1.5" fill="none" />
                      
                      <text x="580" y="306" fill="gray" fontSize="7" fontFamily="monospace" textAnchor="middle">KETTLEBELLS</text>

                      {/* Foam Rollers */}
                      <rect x="555" y="335" width="45" height="12" rx="2" fill="#1C1C1C" stroke="#10B981" strokeWidth="1" />
                      <line x1="565" y1="335" x2="565" y2="347" stroke="#10B981" strokeWidth="0.5" />
                      <line x1="575" y1="335" x2="575" y2="347" stroke="#10B981" strokeWidth="0.5" />
                      <line x1="585" y1="335" x2="585" y2="347" stroke="#10B981" strokeWidth="0.5" />
                      <line x1="595" y1="335" x2="595" y2="347" stroke="#10B981" strokeWidth="0.5" />
                    </g>

                    {/* Zone Text Tag */}
                    <text 
                      x="517" 
                      y="435" 
                      fontFamily="var(--font-bebas)" 
                      fontSize="14" 
                      letterSpacing="2" 
                      fill={activeZoneId === "stretching" ? "#10B981" : "#E2E8F0"}
                      textAnchor="middle"
                      style={{ transition: "all 0.3s" }}
                    >
                      AGILITY & STRETCH LAB
                    </text>
                  </g>

                  {/* ================= ZONE 5: RECEPTION & ENTRANCE (Far Bottom Right) ================= */}
                  <g 
                    id="map-zone-reception"
                    onMouseEnter={() => setHoveredZoneId("reception")}
                    onMouseLeave={() => setHoveredZoneId(null)}
                    onClick={() => handleZoneSelect("reception")}
                    className="cursor-pointer group"
                  >
                    {/* Zone bounding background path */}
                    <rect 
                      x="640" 
                      y="255" 
                      width="120" 
                      height="205" 
                      rx="14" 
                      fill={activeZoneId === "reception" ? "url(#receptionGlow)" : (hoveredZoneId === "reception" ? "rgba(156,163,175,0.12)" : "rgba(255,255,255,0.01)")}
                      stroke={activeZoneId === "reception" ? "#10B981" : (hoveredZoneId === "reception" ? "rgba(156,163,175,0.6)" : "rgba(255,255,255,0.15)")}
                      strokeWidth={activeZoneId === "reception" ? "2.5" : "1.5"}
                      style={{ transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
                    />
                    
                    {/* Interior Details: Reception counter and Diagnostic Analyzer */}
                    <g opacity={activeZoneId === "reception" || hoveredZoneId === "reception" ? "1" : "0.5"} style={{ transition: "opacity 0.3s" }}>
                      {/* L-Shaped Front Desk desk representation */}
                      <path d="M 660,285 L 720,285 L 720,325" fill="none" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" />
                      <text x="690" y="278" fill="gray" fontSize="7" fontFamily="monospace" textAnchor="middle">FRONT DESK</text>

                      {/* Bio-Diagnostics analyzer circle station */}
                      <circle cx="680" cy="365" r="10" fill="#1C1C1C" stroke="#9CA3AF" strokeWidth="1.5" />
                      <line x1="680" y1="355" x2="680" y2="375" stroke="#9CA3AF" strokeWidth="1" />
                      <line x1="670" y1="365" x2="690" y2="365" stroke="#9CA3AF" strokeWidth="1" />
                      <circle cx="680" cy="365" r="4" fill="#9CA3AF" />
                      <text x="680" y="390" fill="gray" fontSize="6.5" fontFamily="sans-serif" textAnchor="middle">BODY INBODY</text>

                      {/* Gym main doorway opening angle graphic */}
                      <path d="M 760,270 L 760,305" stroke="#E63946" strokeWidth="3" />
                      <path d="M 760,270 A 35,35 0 0,0 725,305" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3,3" fill="none" />
                      <text x="742" y="263" fill="#E63946" fontSize="6" fontFamily="monospace" textAnchor="middle">ENTRANCE</text>
                    </g>

                    {/* Zone Text Tag */}
                    <text 
                      x="700" 
                      y="435" 
                      fontFamily="var(--font-bebas)" 
                      fontSize="14" 
                      letterSpacing="1" 
                      fill={activeZoneId === "reception" ? "#E2E8F0" : "#9CA3AF"}
                      textAnchor="middle"
                      style={{ transition: "all 0.3s" }}
                    >
                      DYNAMIC LOBBY
                    </text>
                  </g>
                </svg>
              </div>

              {/* Floor Plan Legend */}
              <div className="mt-4 flex flex-wrap gap-4 justify-between items-center bg-[#070707] border border-white/5 p-3 rounded-xl text-xs font-mono text-gray-400">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-gold" />
                    <span>Hoist Strength</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-electric-red" />
                    <span>Free Weights</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-cyan-500" />
                    <span>Viva Cardio</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                    <span>Stretching</span>
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 animate-pulse">
                  Hover/Click areas to scan detailed inventory
                </div>
              </div>
            </div>

            {/* Visual Tour Autoplay controls row */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#121212] to-[#1a1a1a] border border-white/5">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isPlayingTour ? 'bg-gold/10' : 'bg-white/5'}`}>
                  <Maximize2 className={`w-4 h-4 ${isPlayingTour ? 'text-gold' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold tracking-wide text-white">Automated Layout Walkthrough</h4>
                  <p className="text-[10px] sm:text-xs text-gray-400 tracking-wider">Cycles through sections automatically to preview equipment setups.</p>
                </div>
              </div>
              <button
                id="btn-toggle-tour"
                onClick={() => setIsPlayingTour(!isPlayingTour)}
                className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 ${
                  isPlayingTour 
                    ? "bg-electric-red/10 border border-electric-red/40 text-electric-red animate-pulse" 
                    : "bg-gold hover:bg-gold-light text-black font-semibold shadow-lg hover:shadow-gold/25"
                }`}
              >
                {isPlayingTour ? (
                  <>
                    <Pause className="w-3 h-3 fill-current" />
                    <span>STOP WALKTHROUGH</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span>START WALKTHROUGH</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Information & Live Statistics Panel (5/12 width) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeZoneId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121212] to-[#1c1c1c] border-2 border-white/5 relative overflow-hidden group"
              >
                {/* Visual Accent Corner Glow */}
                <div className={`absolute -right-16 -top-16 w-36 h-36 rounded-full opacity-10 blur-3xl pointer-events-none ${
                  currentZone.id === 'strength' ? 'bg-gold' :
                  currentZone.id === 'free-weights' ? 'bg-electric-red' :
                  currentZone.id === 'cardio' ? 'bg-cyan-500' :
                  currentZone.id === 'stretching' ? 'bg-emerald-500' : 'bg-gray-400'
                }`} />

                <div className="space-y-6">
                  {/* Zone Header Tag */}
                  <div className="flex justify-between items-start gap-4">
                    <span className={`px-2.5 py-1 rounded border text-[10px] font-mono uppercase tracking-widest ${currentZone.badgeClass}`}>
                      [ ZONE ACTIVE ]
                    </span>
                    <span className="text-[10px] font-mono text-gray-500 tracking-wider uppercase flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      SYSTEM PREVIEW
                    </span>
                  </div>

                  {/* Zone Titles */}
                  <div className="space-y-2">
                    <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-widest uppercase">
                      {currentZone.title}
                    </h3>
                    <p className={`font-mono text-xs ${currentZone.textAccentClass} tracking-wide leading-relaxed`}>
                      {currentZone.subtitle}
                    </p>
                  </div>

                  {/* Main Description */}
                  <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed tracking-wide">
                    {currentZone.description}
                  </p>

                  <div className="h-[1px] bg-white/5 my-4" />

                  {/* Primary Focus Target Section */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase block">[ METABOLIC / TRAINING OBJECTIVE ]</span>
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        currentZone.id === 'strength' ? 'bg-gold' :
                        currentZone.id === 'free-weights' ? 'bg-electric-red' :
                        currentZone.id === 'cardio' ? 'bg-cyan-500' :
                        currentZone.id === 'stretching' ? 'bg-emerald-500' : 'bg-gray-300'
                      }`} />
                      <span className="text-xs sm:text-sm text-gray-300 font-semibold tracking-wider">{currentZone.focus}</span>
                    </div>
                  </div>

                  {/* Featured Machinery List */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase block">[ CURRENT HOIST & VIVA INVENTORY ]</span>
                    <ul className="space-y-2.5">
                      {currentZone.equipmentList.map((eq, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-300 tracking-wide font-sans">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${currentZone.textAccentClass}`} />
                          <span>{eq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Foot/Bottom Stats Panels */}
                <div className="mt-8 space-y-4">
                  {/* Energy/Capacity simulated indicator meter */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-gray-400">
                      <span>{currentZone.capacityLabel}</span>
                      <span className={currentZone.textAccentClass}>{currentZone.capacityPercentage}% LOAD</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${currentZone.capacityPercentage}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full ${
                          currentZone.id === 'strength' ? 'bg-gold' :
                          currentZone.id === 'free-weights' ? 'bg-[#E63946]' :
                          currentZone.id === 'cardio' ? 'bg-[#06B6D4]' :
                          currentZone.id === 'stretching' ? 'bg-[#10B981]' : 'bg-[#9CA3AF]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Peak Attendance Timing Box */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase block">[ PEAK OCCUPANCY TIMING ]</span>
                      <span className="text-xs text-gray-300 tracking-wide">{currentZone.peakHours}</span>
                    </div>
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${currentZone.textAccentClass} font-semibold shrink-0`}>
                      ACTIVE SCAN
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
