import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scale, HeartPulse, ShieldAlert, Sparkles, ChevronRight, Calculator, Info, Flame, Zap } from "lucide-react";

type UnitSystem = "metric" | "imperial";
type ToolTab = "bmi" | "bmr";

export default function FitnessTools() {
  const [activeTab, setActiveTab] = useState<ToolTab>("bmi");

  // State for BMI
  const [bmiUnit, setBmiUnit] = useState<UnitSystem>("metric");
  const [weight, setWeight] = useState<number>(70); // kg or lbs
  const [heightCm, setHeightCm] = useState<number>(175); // cm
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(8);
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>("");
  const [bmiColor, setBmiColor] = useState<string>("");
  const [bmiBorderColor, setBmiBorderColor] = useState<string>("");
  const [bmiGlowColor, setBmiGlowColor] = useState<string>("");

  // State for BMR & TDEE
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number>(25);
  const [bmrWeight, setBmrWeight] = useState<number>(70); // kg
  const [bmrHeight, setBmrHeight] = useState<number>(175); // cm
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [bmrResult, setBmrResult] = useState<number | null>(null);
  const [tdeeResult, setTdeeResult] = useState<number | null>(null);

  // Calculate BMI instantly
  useEffect(() => {
    let finalHeightM = 0;
    let finalWeightKg = 0;

    if (bmiUnit === "metric") {
      finalHeightM = heightCm / 100;
      finalWeightKg = weight;
    } else {
      // Imperial
      const totalInches = heightFt * 12 + heightIn;
      finalHeightM = (totalInches * 2.54) / 100;
      finalWeightKg = weight * 0.45359237;
    }

    if (finalHeightM > 0 && finalWeightKg > 0) {
      const calculatedBmi = finalWeightKg / (finalHeightM * finalHeightM);
      setBmiResult(parseFloat(calculatedBmi.toFixed(1)));

      if (calculatedBmi < 18.5) {
        setBmiCategory("Underweight");
        setBmiColor("text-sky-400");
        setBmiBorderColor("border-sky-500/30");
        setBmiGlowColor("shadow-sky-500/10");
      } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
        setBmiCategory("Optimal Weight");
        setBmiColor("text-emerald-400");
        setBmiBorderColor("border-emerald-500/30");
        setBmiGlowColor("shadow-emerald-500/10");
      } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
        setBmiCategory("Overweight");
        setBmiColor("text-amber-400");
        setBmiBorderColor("border-amber-500/30");
        setBmiGlowColor("shadow-amber-500/10");
      } else {
        setBmiCategory("Obese Range (Class 1-3)");
        setBmiColor("text-electric-red");
        setBmiBorderColor("border-electric-red/30");
        setBmiGlowColor("shadow-electric-red/10");
      }
    }
  }, [weight, heightCm, heightFt, heightIn, bmiUnit]);

  // Adjust placeholder defaults when unit toggles to keep range reasonable
  useEffect(() => {
    if (bmiUnit === "metric") {
      // converted from lbs to metric approx
      setWeight(70);
    } else {
      // kg to lbs
      setWeight(154);
    }
  }, [bmiUnit]);

  // Calculate BMR & TDEE
  useEffect(() => {
    if (bmrWeight > 0 && bmrHeight > 0 && age > 0) {
      // Mifflin-St Jeor Equation
      let calculatedBmr = 0;
      if (gender === "male") {
        calculatedBmr = 10 * bmrWeight + 6.25 * bmrHeight - 5 * age + 5;
      } else {
        calculatedBmr = 10 * bmrWeight + 6.25 * bmrHeight - 5 * age - 161;
      }

      setBmrResult(Math.round(calculatedBmr));

      // Activity Multiplier
      let multiplier = 1.2; // sedentary
      if (activityLevel === "light") multiplier = 1.375;
      else if (activityLevel === "moderate") multiplier = 1.55;
      else if (activityLevel === "heavy") multiplier = 1.725;
      else if (activityLevel === "athlete") multiplier = 1.9;

      setTdeeResult(Math.round(calculatedBmr * multiplier));
    }
  }, [gender, age, bmrWeight, bmrHeight, activityLevel]);

  // Pre-fill WhatsApp message based on calculations
  const handleConsultWithCoach = (type: "bmi" | "bmr") => {
    let messageText = "";
    if (type === "bmi" && bmiResult) {
      messageText = `Hi Coach! I just calculated my BMI on the Power House Gym tools and my result is ${bmiResult} (${bmiCategory}). I want to book a personalized guidance slot to discuss custom body recomposition.`;
    } else if (type === "bmr" && tdeeResult) {
      messageText = `Hi Coach Sachin Patil! My calculated Daily TDEE is ${tdeeResult} kcal/day (BMR: ${bmrResult} kcal/day, age: ${age}). I want to explore high-protein home diet blueprints and target macro ratios.`;
    } else {
      messageText = "Hi Power House! I am interested in booking a personal coaching screening slot.";
    }

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/919422770770?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="fitness-tools" className="relative py-24 bg-[#0A0A0A] overflow-hidden border-t border-white/5">
      {/* Decorative premium radial gradients */}
      <div className="absolute left-1/4 top-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#E5A93C]/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/4 w-[32rem] h-[32rem] rounded-full bg-electric-red/5 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-14">
          <span className="text-xs font-mono tracking-widest text-gold uppercase block">
            [ DIAGNOSTICS DECK ]
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-white tracking-widest uppercase">
            FITNESS <span className="text-gold">TOOLS</span>
          </h2>
          <div className="h-1 w-24 bg-electric-red mx-auto animate-pulse" />
          <p className="max-w-xl mx-auto font-sans text-xs sm:text-sm text-gray-400 tracking-wider">
            Examine your baseline body measurements instantly. Our modern diagnostic engines help you outline a clear, scientifically precise blueprint for muscle growth or elite athletic recomposition.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="p-1.5 rounded-full bg-stone-900/80 border border-white/5 flex gap-1">
            <button
              onClick={() => setActiveTab("bmi")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "bmi"
                  ? "bg-gold text-[#0A0A0A] font-black shadow-md shadow-gold/15"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>BMI Calculator</span>
            </button>
            <button
              onClick={() => setActiveTab("bmr")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "bmr"
                  ? "bg-gold text-[#0A0A0A] font-black shadow-md shadow-gold/15"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <HeartPulse className="w-4 h-4" />
              <span>Calorie Meter</span>
            </button>
          </div>
        </div>

        {/* Inner Card Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <AnimatePresence mode="wait">
            {activeTab === "bmi" ? (
              <motion.div
                key="tab-bmi"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="lg:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
              >
                {/* Inputs Pane (Left/6 cols) */}
                <div className="md:col-span-6 p-6 sm:p-8 rounded-2xl bg-stone-950/90 border border-white/5 flex flex-col justify-between">
                  <div>
                    {/* Header Controls */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-gold" />
                        <h3 className="font-bebas text-2xl tracking-wider text-white uppercase">Body Mass Index</h3>
                      </div>
                      
                      {/* Unit Toggle */}
                      <div className="flex rounded-md p-0.5 bg-stone-900 border border-white/10 text-[10px] uppercase font-mono font-bold tracking-wider">
                        <button
                          onClick={() => setBmiUnit("metric")}
                          className={`px-3 py-1 rounded transition-all ${
                            bmiUnit === "metric" ? "bg-gold text-[#0A0A0A]" : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Metric (KG/CM)
                        </button>
                        <button
                          onClick={() => setBmiUnit("imperial")}
                          className={`px-3 py-1 rounded transition-all ${
                            bmiUnit === "imperial" ? "bg-gold text-[#0A0A0A]" : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Imperial (LBS/FT)
                        </button>
                      </div>
                    </div>

                    {/* Weight Control Row */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-xs font-mono text-gray-400">
                        <span>BODY WEIGHT</span>
                        <span className="text-gold font-bold">{weight} {bmiUnit === "metric" ? "KG" : "LBS"}</span>
                      </div>
                      
                      <input
                        type="range"
                        min={bmiUnit === "metric" ? 30 : 66}
                        max={bmiUnit === "metric" ? 180 : 400}
                        step={1}
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="w-full accent-gold bg-stone-900 h-2 rounded-lg cursor-pointer transition-all duration-150"
                      />
                      
                      <div className="flex justify-between items-center gap-4">
                        <span className="text-[10px] font-mono text-gray-500">
                          {bmiUnit === "metric" ? "Min 30 KG" : "Min 66 LBS"}
                        </span>
                        <div className="relative max-w-28">
                          <input
                            type="number"
                            value={weight}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              if (val >= 0) setWeight(val);
                            }}
                            className="bg-stone-900 border border-white/10 rounded-lg px-3 py-1.5 text-center font-mono text-xs text-white focus:outline-none focus:border-gold/50 w-full"
                          />
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">
                          {bmiUnit === "metric" ? "Max 180 KG" : "Max 400 LBS"}
                        </span>
                      </div>
                    </div>

                    {/* Height Control Row */}
                    {bmiUnit === "metric" ? (
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-xs font-mono text-gray-400">
                          <span>BODY HEIGHT</span>
                          <span className="text-gold font-bold">{heightCm} CM</span>
                        </div>
                        
                        <input
                          type="range"
                          min={100}
                          max={225}
                          step={1}
                          value={heightCm}
                          onChange={(e) => setHeightCm(Number(e.target.value))}
                          className="w-full accent-gold bg-stone-900 h-2 rounded-lg cursor-pointer"
                        />
                        
                        <div className="flex justify-between items-center gap-4">
                          <span className="text-[10px] font-mono text-gray-500">100 CM</span>
                          <div className="relative max-w-28">
                            <input
                              type="number"
                              value={heightCm}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                if (val >= 0) setHeightCm(val);
                              }}
                              className="bg-stone-900 border border-white/10 rounded-lg px-3 py-1.5 text-center font-mono text-xs text-white focus:outline-none focus:border-gold/50 w-full"
                            />
                          </div>
                          <span className="text-[10px] font-mono text-gray-500">225 CM</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 mb-4">
                        <span className="text-xs font-mono text-gray-400 uppercase block">BODY HEIGHT</span>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-mono text-gray-500">FEET</label>
                            <select
                              value={heightFt}
                              onChange={(e) => setHeightFt(Number(e.target.value))}
                              className="w-full bg-stone-900 border border-white/10 rounded-lg px-3 py-2 text-center text-xs text-white focus:border-gold/50 focus:outline-none"
                            >
                              {[4, 5, 6, 7].map((f) => (
                                <option key={f} value={f}>{f} FT</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-mono text-gray-500">INCHES</label>
                            <select
                              value={heightIn}
                              onChange={(e) => setHeightIn(Number(e.target.value))}
                              className="w-full bg-stone-900 border border-white/10 rounded-lg px-3 py-2 text-center text-xs text-white focus:border-gold/50 focus:outline-none"
                            >
                              {Array.from({ length: 12 }, (_, i) => i).map((inch) => (
                                <option key={inch} value={inch}>{inch} IN</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Scientific Disclaimer */}
                  <div className="mt-6 flex items-start gap-2.5 p-3 rounded-lg bg-stone-900/40 border border-white/5">
                    <Info className="w-4 h-4 text-gold/60 shrink-0 mt-0.5" />
                    <p className="font-sans text-[10px] text-gray-500 leading-normal">
                      BMI is a high-level biological diagnostic indicator based solely on stature. It does not measure hyper-dense skeletal muscle tissue separately from adipose tissue. Elite lifters with supreme physical conditioning may classify as Overweight while maintaining single-digit body fat levels.
                    </p>
                  </div>
                </div>

                {/* Outputs & Diagnostic Interpretation (Right/6 cols) */}
                <div className={`md:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#0E0E0E] border transition-all duration-500 shadow-xl flex flex-col justify-between ${bmiBorderColor} ${bmiGlowColor}`}>
                  
                  {/* Category Status & Gauge Screen */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">[ DIAGNOSTIC REPORT ]</span>
                        <h4 className="font-bebas text-3xl text-white tracking-wider">YOUR METRIC MATRIX</h4>
                      </div>
                      <span className="px-3 py-1 rounded bg-stone-900 border border-white/5 font-mono text-[9px] text-gray-400">
                        SECURE LOGS
                      </span>
                    </div>

                    {/* Numeric Gauge Counter */}
                    <div className="relative py-1 flex justify-center items-center">
                      <div className="w-32 h-32 rounded-full border border-white/10 flex flex-col items-center justify-center relative shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]">
                        {/* Interactive golden outer glow trail */}
                        <div className="absolute inset-0 rounded-full border-2 border-t-gold border-r-transparent border-b-transparent border-l-gold/20 animate-spin-slow pointer-events-none" />
                        <span className="font-bebas text-5xl text-white tracking-normal font-bold">
                          {bmiResult || "--"}
                        </span>
                        <span className="font-mono text-[10px] text-gray-400 tracking-wider">
                          BMI INDEX
                        </span>
                      </div>
                    </div>

                    {/* Dynamic Bar Scale Range Visualizer */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-gray-400">
                        <span>UNDER</span>
                        <span>OPTIMAL (18.5 - 24.9)</span>
                        <span>OVER</span>
                      </div>
                      
                      {/* Bar segments and pointer */}
                      <div className="relative h-2.5 rounded-full bg-stone-900 border border-white/5 flex overflow-hidden">
                        <div className="w-[30%] h-full bg-sky-500/40" title="Underweight <18.5" />
                        <div className="w-[35%] h-full bg-emerald-500/40" title="Healthy 18.5-24.9" />
                        <div className="w-[15%] h-full bg-amber-500/40" title="Overweight 25-29.9" />
                        <div className="w-[20%] h-full bg-electric-red/40" title="Obese >=30" />

                        {/* Interactive Needle Indicator */}
                        {bmiResult && (
                          <motion.div
                            animate={{ 
                              left: `${Math.min(Math.max(((bmiResult - 12) / (38 - 12)) * 100, 2), 98)}%` 
                            }}
                            transition={{ type: "spring", stiffness: 80, damping: 15 }}
                            className="absolute -top-1 bottom-1 w-1.5 h-[130%] bg-gold rounded-full border border-black shadow-[0_0_8px_rgba(201,168,76,1)] z-20 pointer-events-none"
                          />
                        )}
                      </div>
                    </div>

                    {/* Result Card text block */}
                    <div className="p-4 rounded-xl bg-stone-900/60 border border-white/5 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-gold shrink-0 animate-ping" />
                        <span className="font-mono text-[10px] tracking-wider text-gray-400">CLASSIFICATION : </span>
                        <span className={`font-sans font-black text-xs uppercase tracking-wide ${bmiColor}`}>
                          {bmiCategory}
                        </span>
                      </div>
                      
                      <p className="font-sans text-xs text-gray-400 leading-relaxed">
                        {bmiCategory === "Underweight" && "Calorie surplus recommended. Focus extensively on premium Hoist mechanics, micro-loading squats, and heavy presses with Sachin to structural hypertrophy thresholds."}
                        {bmiCategory === "Optimal Weight" && "Excellent proportions. Target specific volumetric hypertrophy, core biomechanical preservation, and lean conditioning intervals on Viva systems to build dense athletic strength."}
                        {bmiCategory === "Overweight" && "Calorie deficit recommended. Integrate high-intensity conditioning circuits, target specific structural muscle hypertrophy to elevate BMR, and execute custom local diet plans."}
                        {bmiCategory === "Obese Range (Class 1-3)" && "High impact metabolic conditioning required. Engage our tailored safe-biomechanics framework, leverage zero-impact dual pulleys to spare joints, and optimize macro diets."}
                      </p>
                    </div>
                  </div>

                  {/* Action Link button */}
                  <div className="mt-6">
                    <button
                      onClick={() => handleConsultWithCoach("bmi")}
                      className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-gold hover:bg-gold-light text-black font-sans text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-[0_4px_15px_rgba(201,168,76,0.15)] hover:shadow-gold/25 cursor-pointer"
                    >
                      <span>Lock Coaching Consultation</span>
                      <ChevronRight className="w-4 h-4 stroke-[3px]" />
                    </button>
                  </div>

                </div>
              </motion.div>
            ) : (
              <motion.div
                key="tab-bmr"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="lg:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
              >
                {/* BMR Inputs (Left/6 cols) */}
                <div className="md:col-span-6 p-6 sm:p-8 rounded-2xl bg-stone-950/90 border border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <HeartPulse className="w-5 h-5 text-gold" />
                      <h3 className="font-bebas text-2xl tracking-wider text-white uppercase font-bold">TDEE / Calorie Matrix</h3>
                    </div>

                    {/* Row 1: Gender & Age */}
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 uppercase block mb-2">Biological Sex</label>
                        <div className="grid grid-cols-2 gap-2 p-1 bg-stone-900 border border-white/10 rounded-lg">
                          <button
                            onClick={() => setGender("male")}
                            className={`py-2 rounded-md text-[10px] font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              gender === "male" ? "bg-gold text-black" : "text-gray-400 hover:text-white"
                            }`}
                          >
                            Male
                          </button>
                          <button
                            onClick={() => setGender("female")}
                            className={`py-2 rounded-md text-[10px] font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              gender === "female" ? "bg-gold text-black" : "text-gray-400 hover:text-white"
                            }`}
                          >
                            Female
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1.5">Age (Years)</label>
                        <div className="relative">
                          <input
                            type="number"
                            min={12}
                            max={90}
                            value={age}
                            onChange={(e) => setAge(Math.max(1, Number(e.target.value)))}
                            className="w-full bg-stone-900 border border-white/10 rounded-lg py-2 text-center text-xs text-white focus:border-gold/50 focus:outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Weight Control slider */}
                    <div className="space-y-2 mb-5">
                      <div className="flex justify-between text-[11px] font-mono text-gray-400">
                        <span>WEIGHT (KG)</span>
                        <span className="text-gold font-bold">{bmrWeight} KG</span>
                      </div>
                      <input
                        type="range"
                        min={35}
                        max={160}
                        step={1}
                        value={bmrWeight}
                        onChange={(e) => setBmrWeight(Number(e.target.value))}
                        className="w-full accent-gold bg-stone-900 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Height Control slider */}
                    <div className="space-y-2 mb-5">
                      <div className="flex justify-between text-[11px] font-mono text-gray-400">
                        <span>HEIGHT (CM)</span>
                        <span className="text-gold font-bold">{bmrHeight} CM</span>
                      </div>
                      <input
                        type="range"
                        min={120}
                        max={220}
                        step={1}
                        value={bmrHeight}
                        onChange={(e) => setBmrHeight(Number(e.target.value))}
                        className="w-full accent-gold bg-stone-900 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Activity level drop down */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-gray-400 uppercase block">Daily Activity Quotient</label>
                      <select
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                        className="w-full bg-stone-900 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:border-gold/50 focus:outline-none"
                      >
                        <option value="sedentary">Sedentary (Office job, minimal workout)</option>
                        <option value="light">Lightly Active (Workouts 1-2 days/wk)</option>
                        <option value="moderate">Moderately Active (Hypertrophy intense 3-5 days/wk)</option>
                        <option value="heavy">Heavily Regular (Heavy lifting 6-7 days/wk)</option>
                        <option value="athlete">Athlete/Elite Tier (Double splits, extreme load)</option>
                      </select>
                    </div>

                  </div>

                  <div className="mt-6 flex items-start gap-2 p-2 rounded bg-stone-900/30 border border-white/5">
                    <Zap className="w-3.5 h-3.5 text-gold/60 shrink-0 mt-0.5" />
                    <p className="font-sans text-[10px] text-gray-500">
                      Calculated using the premium Mifflin-St Jeor equation. Ideal for drafting dietary profiles and protein multiplier limits.
                    </p>
                  </div>
                </div>

                {/* TDEE Interpretation (Right/6 cols) */}
                <div className="md:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#0E0E0E] border border-white/5 shadow-xl flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">[ ENERGY MATRIX ]</span>
                      <h4 className="font-bebas text-3xl text-white tracking-wider">TDEE CALORIC REPORT</h4>
                    </div>

                    {/* Big energy gauge metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-stone-900/60 border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
                        <span className="text-[9px] font-mono text-gray-500 uppercase block tracking-wider">Basal Metabolic Rate (BMR)</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="font-mono text-xl sm:text-2xl font-black text-white">{bmrResult || "--"}</span>
                          <span className="text-[10px] font-mono text-gray-400">kcal/d</span>
                        </div>
                        <p className="text-[9px] text-gray-500 font-sans mt-1">Completely passive survival consumption.</p>
                      </div>

                      <div className="p-4 rounded-xl bg-stone-900/60 border border-gold/15 relative overflow-hidden group shadow-lg shadow-gold/5">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gold-light" />
                        <span className="text-[9px] font-mono text-gray-500 uppercase block tracking-wider">Total Daily Energy (TDEE)</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="font-mono text-xl sm:text-2xl font-black text-orange-400">{tdeeResult || "--"}</span>
                          <span className="text-[10px] font-mono text-gray-400">kcal/d</span>
                        </div>
                        <p className="text-[9px] text-gray-500 font-sans mt-1">Total consumption matching lifestyle.</p>
                      </div>
                    </div>

                    {/* Actionable Diet Goals split */}
                    <div className="space-y-3">
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">TARGET HORIZONS FOR MEMBERS:</span>
                      
                      <div className="space-y-2">
                        {/* Muscle Gain */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-[#14120E] border border-gold/10">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                            <span className="font-sans text-xs text-white uppercase font-bold">Prestige Muscle Gain Surplus (+350)</span>
                          </div>
                          <span className="font-mono text-xs font-bold text-gold">
                            {tdeeResult ? `${tdeeResult + 350} kcal` : "--"}
                          </span>
                        </div>

                        {/* Maintenance */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-stone-900/40 border border-white/5">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                            <span className="font-sans text-xs text-gray-300 uppercase">Athletic Engine Maintenance</span>
                          </div>
                          <span className="font-mono text-xs font-bold text-white">
                            {tdeeResult ? `${tdeeResult} kcal` : "--"}
                          </span>
                        </div>

                        {/* Deficit */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-[#130E0E] border border-electric-red/10">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-electric-red" />
                            <span className="font-sans text-xs text-white uppercase font-bold">Refined Precision Fat Loss Deficit (-400)</span>
                          </div>
                          <span className="font-mono text-xs font-bold text-electric-red">
                            {tdeeResult ? `${tdeeResult - 400} kcal` : "--"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Share on WhatsApp */}
                  <div className="mt-6">
                    <button
                      onClick={() => handleConsultWithCoach("bmr")}
                      className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-gold hover:bg-gold-light text-black font-sans text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-[0_4px_15px_rgba(201,168,76,0.15)] hover:shadow-gold/25 cursor-pointer"
                    >
                      <span>Forward Diet Request over WHATSAPP</span>
                      <ChevronRight className="w-4 h-4 stroke-[3px]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
