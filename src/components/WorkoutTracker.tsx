import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, 
  Dumbbell, 
  Trophy, 
  Trash2, 
  Plus, 
  Activity, 
  ChevronRight, 
  CheckCircle, 
  Calendar, 
  Award, 
  TrendingUp, 
  Heart,
  Timer,
  Zap,
  Sparkles
} from "lucide-react";

// Structure of a workout log entry
export interface WorkoutLog {
  id: string;
  exercise: string;
  category: "strength" | "hypertrophy" | "cardio" | "mobility";
  date: string;
  weight?: number;
  sets?: number;
  reps?: number;
  duration?: number;
  rpe: number;
  notes?: string;
}

// Structures for the custom confetti simulation
interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  tx: number; // Target X drift
  ty: number; // Target Y drop
  color: string;
  shape: "circle" | "square" | "triangle" | "star" | "dumbbell";
  size: number;
  delay: number;
  rotation: number;
  duration: number;
}

const PRESET_EXERCISES = {
  strength: [
    "Barbell Back Squat",
    "Conventional Deadlift",
    "Deficit Barbell Sumo Pull",
    "Military Overhead Press",
    "Weighted Pull-ups",
    "Power Clean"
  ],
  hypertrophy: [
    "Hoist Incline Chest Press",
    "Hoist Lateral Raise Isolation",
    "Viva Dual Pulley Lat Pulldown",
    "Dumbbell Incline Bicep Curl",
    "Lying Leg Curl (Bio-Stiff)",
    "Cable Tricep Pushdown"
  ],
  cardio: [
    "Viva High-Intensity Treadmill Intervals",
    "Elliptical Aerobic Engine",
    "Assault Bike Watts Sprint",
    "Rowing Machine 2000m Pace",
    "Stair Climber Fat Combustion"
  ],
  mobility: [
    "Dynamic Hip Opener Flow",
    "Active Thoracic Extension Row",
    "Deep Goblet Squat Hold",
    "Rotator Cuff Bio-Activation",
    "Hamstring PNF Stretch Protocol"
  ]
};

const CATEGORIES = [
  { id: "strength" as const, name: "Strength & Power", icon: Zap, color: "text-electric-red", bg: "bg-electric-red/10", border: "border-electric-red/20", label: "Pure Mechanics" },
  { id: "hypertrophy" as const, name: "Hoist Hypertrophy", icon: Dumbbell, color: "text-gold", bg: "bg-gold/10", border: "border-gold/20", label: "Muscular Isolation" },
  { id: "cardio" as const, name: "Viva Cardio Engine", icon: Timer, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20", label: "Metabolic Threshold" },
  { id: "mobility" as const, name: "Active Mobility", icon: Heart, color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-500/20", label: "Somatic Recovery" }
];

const ENCOURAGEMENTS = {
  strength: [
    "Absolute mechanical load achieved. Sachin Patil approved.",
    "Neurological recruitment maximized. Spine posture remains dominant.",
    "Heavy pulling thresholds broken. The iron bows to execution form."
  ],
  hypertrophy: [
    "Hoist muscular alignment exhausted. Peak hypertrophy activated.",
    "Bio-accurate target loading complete. Target cells fully flooded.",
    "Outstanding time-under-tension cadence. Muscle fibers successfully reprogrammed."
  ],
  cardio: [
    "Viva metabolic combustion logged. Heart rate thresholds expanded.",
    "Oxidative endurance optimized. Daily VO2 max indices spiked.",
    "Caloric expenditure and high aerobic quotient registered."
  ],
  mobility: [
    "Joint integrity secured. Rotator cuffs and fascia re-aligned.",
    "Active decompression complete. Longevity indices preserved.",
    "Synovial fluid distributed perfectly over loaded structural sockets."
  ]
};

export default function WorkoutTracker() {
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [exercise, setExercise] = useState("");
  const [category, setCategory] = useState<"strength" | "hypertrophy" | "cardio" | "mobility">("hypertrophy");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [weight, setWeight] = useState<string>("");
  const [sets, setSets] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [rpe, setRpe] = useState<number>(7);
  const [notes, setNotes] = useState("");
  
  // Confetti triggering states
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState<ConfettiParticle[]>([]);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [justLoggedExercise, setJustLoggedExercise] = useState<WorkoutLog | null>(null);
  const [selectedEncouragement, setSelectedEncouragement] = useState("");

  // Statistics
  const [streak, setStreak] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [preferredCategory, setPreferredCategory] = useState("Hypertrophy");

  // Load logs on mount
  useEffect(() => {
    const stored = localStorage.getItem("powerhouse_workout_logs");
    if (stored) {
      const parsedLogs = JSON.parse(stored);
      setLogs(parsedLogs);
    } else {
      // Prefill some beautiful mock logs to make the starting history look premium
      const initialLogs: WorkoutLog[] = [
        {
          id: "log_init_1",
          exercise: "Hoist Incline Chest Press",
          category: "hypertrophy",
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          weight: 85,
          sets: 4,
          reps: 12,
          rpe: 8,
          notes: "Focusing heavily on controlled eccentrics. Coach Sachin Patty corrected wrist rotation."
        },
        {
          id: "log_init_2",
          exercise: "Conventional Deadlift",
          category: "strength",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          weight: 140,
          sets: 5,
          reps: 5,
          rpe: 9,
          notes: "Spine locked, biomechanical lift path verified. Peak force production."
        },
        {
          id: "log_init_3",
          exercise: "Viva High-Intensity Treadmill Intervals",
          category: "cardio",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          duration: 25,
          rpe: 8,
          notes: "30-sec sprint / 60-sec active recovery ratio. Sweat factor was supreme."
        }
      ];
      setLogs(initialLogs);
      localStorage.setItem("powerhouse_workout_logs", JSON.stringify(initialLogs));
    }
  }, []);

  // Sync and calculate stats whenever logs change
  useEffect(() => {
    setTotalWorkouts(logs.length);
    calculateStreak(logs);
    calculatePreferredCategory(logs);
  }, [logs]);

  // Calculate workout streak sequentially
  const calculateStreak = (workoutLogs: WorkoutLog[]) => {
    if (workoutLogs.length === 0) {
      setStreak(0);
      return;
    }

    // Extract unique dates sorted descending
    const sortedDates = [...new Set(workoutLogs.map(l => l.date))].sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    const todayStr = new Date().toISOString().split("T")[0];
    const yesterdayStr = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    // If the latest logged date isn't today or yesterday, streak is currently 0
    if (sortedDates[0] !== todayStr && sortedDates[0] !== yesterdayStr) {
      setStreak(0);
      return;
    }

    let calculatedStreak = 1;
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const current = new Date(sortedDates[i]);
      const next = new Date(sortedDates[i + 1]);
      const diffTime = Math.abs(current.getTime() - next.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        calculatedStreak++;
      } else if (diffDays > 1) {
        break; // Streak broken
      }
    }
    setStreak(calculatedStreak);
  };

  const calculatePreferredCategory = (workoutLogs: WorkoutLog[]) => {
    if (workoutLogs.length === 0) {
      setPreferredCategory("None");
      return;
    }
    const counts = workoutLogs.reduce((acc, log) => {
      acc[log.category] = (acc[log.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    let maxCat = "hypertrophy";
    let maxVal = 0;
    Object.entries(counts).forEach(([cat, val]) => {
      if (val > maxVal) {
        maxVal = val;
        maxCat = cat;
      }
    });

    const mapping: Record<string, string> = {
      strength: "Strength",
      hypertrophy: "Hypertrophy",
      cardio: "Cardio",
      mobility: "Mobility"
    };
    setPreferredCategory(mapping[maxCat] || "Hypertrophy");
  };

  // Helper colors for different categories
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "strength": return "text-electric-red bg-electric-red/10 border-electric-red/20";
      case "hypertrophy": return "text-gold bg-gold/10 border-gold/15";
      case "cardio": return "text-orange-400 bg-orange-400/10 border-orange-400/20";
      case "mobility": return "text-sky-400 bg-sky-400/10 border-sky-400/20";
      default: return "text-zinc-400 bg-zinc-900 border-zinc-800";
    }
  };

  // Generate gorgeous procedural custom confetti elements
  const generateConfetti = () => {
    const colors = [
      "#C9A84C", // Gold
      "#E5C158", // Light Gold
      "#FF5A5F", // Electric Red
      "#FFF",    // White
      "#FB923C", // Orange
      "#38BDF8"  // Blue Sky
    ];
    const shapes: ("circle" | "square" | "triangle" | "star" | "dumbbell")[] = [
      "circle", "square", "triangle", "star", "dumbbell"
    ];

    const particles: ConfettiParticle[] = Array.from({ length: 65 }).map((_, i) => {
      const angle = (Math.random() * 60 + 60) * (Math.PI / 180); // 60 to 120 degrees projection
      const velocity = Math.random() * 250 + 150; // speed
      
      const tx = Math.cos(angle) * velocity * (Math.random() > 0.5 ? 1 : -1) + (Math.random() * 40 - 20);
      const ty = -Math.sin(angle) * velocity - 200; // project upwards, then let physical CSS/Framer drop it

      return {
        id: i,
        x: 0, // start relative from launch button
        y: 0,
        tx,
        ty,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: Math.random() * 10 + 6, // 6px to 16px
        delay: Math.random() * 0.15,
        rotation: Math.random() * 450 + 180, // rotate extensively
        duration: Math.random() * 1.5 + 1.2 // 1.2 to 2.7s
      };
    });

    setConfettiParticles(particles);
    setShowConfetti(true);
    
    // Clear confetti items from state after animations conclude to keep DOM lightweight
    setTimeout(() => {
      setShowConfetti(false);
      setConfettiParticles([]);
    }, 4500);
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exercise.trim()) return;

    const newLog: WorkoutLog = {
      id: `workout_${Date.now()}`,
      exercise: exercise.trim(),
      category,
      date,
      weight: (category === "strength" || category === "hypertrophy") && weight ? Number(weight) : undefined,
      sets: (category === "strength" || category === "hypertrophy") && sets ? Number(sets) : undefined,
      reps: (category === "strength" || category === "hypertrophy") && reps ? Number(reps) : undefined,
      duration: (category === "cardio" || category === "mobility") && duration ? Number(duration) : undefined,
      rpe,
      notes: notes.trim() || undefined
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem("powerhouse_workout_logs", JSON.stringify(updatedLogs));

    // Choose categorization motivation quote
    const options = ENCOURAGEMENTS[category];
    const quote = options[Math.floor(Math.random() * options.length)];
    setSelectedEncouragement(quote);
    setJustLoggedExercise(newLog);

    // Initialize the celebrations!
    generateConfetti();
    setShowCelebrationModal(true);

    // Reset entry fields
    setExercise("");
    setWeight("");
    setSets("");
    setReps("");
    setDuration("");
    setNotes("");
  };

  const handleDeleteLog = (id: string) => {
    const filtered = logs.filter(l => l.id !== id);
    setLogs(filtered);
    localStorage.setItem("powerhouse_workout_logs", JSON.stringify(filtered));
  };

  return (
    <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative" id="workout-tracker-wrapper">
      
      {/* 1. Confetti Projection Canvas Overlay */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[999] flex items-center justify-center">
          <div className="relative w-10 h-10">
            {confettiParticles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 150, opacity: 1, scale: 0.1, rotate: 0 }}
                animate={{
                  x: p.tx,
                  y: p.ty + 400, // force simulated downward gravitational fall
                  opacity: [1, 1, 0.8, 0],
                  scale: [0.1, 1.2, 0.8, 0.4],
                  rotate: p.rotation
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: [0.1, 0.8, 0.3, 1] // snappy launch, floating descent
                }}
                style={{
                  position: "absolute",
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.shape === "dumbbell" ? "transparent" : p.color,
                  borderRadius: p.shape === "circle" ? "50%" : p.shape === "triangle" ? "0%" : "2px"
                }}
                className="shadow-md"
              >
                {/* Special Shapes rendering support */}
                {p.shape === "triangle" && (
                  <div 
                    className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px]"
                    style={{ borderBottomColor: p.color }}
                  />
                )}
                {p.shape === "star" && (
                  <Sparkles className="w-full h-full" style={{ color: p.color }} />
                )}
                {p.shape === "dumbbell" && (
                  <Dumbbell className="w-full h-full filter drop-shadow" style={{ color: p.color }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Success Celebration Dialog Modal Popup */}
      <AnimatePresence>
        {showCelebrationModal && justLoggedExercise && (
          <div className="fixed inset-0 bg-[#000]/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 280, damping: 25 }}
              className="w-full max-w-md bg-stone-950 border border-gold/30 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-[0_0_50px_rgba(201,168,76,0.15)] select-none"
              id="celebration-success-dialog"
            >
              {/* Absorbent decorative glowing background lights */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gold/10 blur-[50px] pointer-events-none" />
              
              <div className="relative space-y-6">
                {/* Animated trophy indicator icon */}
                <motion.div 
                  initial={{ scale: 0.5, rotate: -45 }}
                  animate={{ scale: [0.5, 1.2, 1], rotate: [0, 15, 0] }}
                  transition={{ delay: 0.15, duration: 0.6, type: "spring" }}
                  className="w-20 h-20 bg-gradient-to-b from-gold/20 to-gold/5 border border-gold/30 rounded-2xl flex items-center justify-center mx-auto shadow-inner shadow-gold/10"
                >
                  <Trophy className="w-10 h-10 text-gold animate-bounce" />
                </motion.div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-gold uppercase block animate-pulse">
                    ⚡ PHYSICAL INTEGRITY SECURED ⚡
                  </span>
                  <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-widest uppercase">
                    WORKOUT LOGGED
                  </h3>
                </div>

                {/* Performance Summary Pill */}
                <div className="p-4 rounded-xl bg-stone-900 border border-white/5 text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-black text-white uppercase tracking-wider truncate max-w-[200px]">
                      {justLoggedExercise.exercise}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider font-bold ${getCategoryColor(justLoggedExercise.category)}`}>
                      {justLoggedExercise.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-1.5 border-t border-b border-white/5 text-center">
                    {(justLoggedExercise.category === "strength" || justLoggedExercise.category === "hypertrophy") ? (
                      <>
                        <div>
                          <span className="text-[8px] font-mono text-gray-500 uppercase block">LOAD</span>
                          <span className="text-xs font-mono font-bold text-gold">{justLoggedExercise.weight || "--"} KG</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-gray-500 uppercase block">SETS</span>
                          <span className="text-xs font-mono font-bold text-white">{justLoggedExercise.sets || "--"}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-gray-500 uppercase block">REPS</span>
                          <span className="text-xs font-mono font-bold text-white">{justLoggedExercise.reps || "--"}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <span className="text-[8px] font-mono text-gray-500 uppercase block">DURATION</span>
                          <span className="text-xs font-mono font-bold text-orange-400">{justLoggedExercise.duration || "--"} MIN</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[8px] font-mono text-gray-500 uppercase block">SOCIETY CLASSIFICATION</span>
                          <span className="text-xs font-sans font-bold text-gray-300">ENGAGEMENT OK</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                    <span>DATE: {justLoggedExercise.date}</span>
                    <span>•</span>
                    <span className="text-red-400 font-bold">RPE: {justLoggedExercise.rpe}/10 Effort</span>
                  </div>
                </div>

                {/* Biomechanical quote box */}
                <div className="border-l-2 border-gold pl-4 py-1.5 text-left italic font-sans text-xs text-gray-400 leading-relaxed bg-stone-900/40 pr-2 rounded-r-lg">
                  "{selectedEncouragement}"
                </div>

                {/* Streak Celebrator */}
                {streak > 1 && (
                  <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gold/10 border border-gold/15 rounded-full w-fit mx-auto text-gold text-xs font-mono">
                    <Flame className="w-4 h-4 animate-pulse shrink-0 fill-gold" />
                    <span>STREAK ACTIVE: <strong className="font-extrabold">{streak} DAYS</strong> STALLION CADENCE</span>
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={() => setShowCelebrationModal(false)}
                  className="w-full py-4 rounded-xl bg-gold text-[#0A0A0A] font-sans text-xs font-black uppercase tracking-widest hover:bg-gold-light transition-all duration-300 cursor-pointer shadow-lg shadow-gold/20"
                  id="btn-close-celebration"
                >
                  KEEP FORGING PHYSICAL EXCELLENCE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Stats Board Row (Header Layout / 12 Columns Full) */}
      <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4" id="tracker-stats-panel">
        <div className="p-4 rounded-xl bg-stone-900 border border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Logged Sessions</span>
            <span className="font-bebas text-3xl text-white tracking-widest block">{totalWorkouts}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-stone-900 border border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Daily Active Streak</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bebas text-3xl text-gold tracking-widest block">{streak} Days</span>
              {streak > 0 && <Flame className="w-5 h-5 text-gold animate-pulse fill-gold" />}
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-gold/5 border border-gold/20 text-gold">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-stone-900 border border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Preferred Channel</span>
            <span className="font-bebas text-3xl text-orange-400 tracking-widest block">{preferredCategory}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-orange-400/5 border border-orange-400/20 text-orange-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 4. Left Column: Input Form (6 cols) */}
      <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-stone-950/90 border border-white/5 flex flex-col justify-between">
        <form onSubmit={handleLogSubmit} className="space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-gold" />
            <h3 className="font-bebas text-2xl tracking-wider text-white uppercase">Log Daily Session</h3>
          </div>

          {/* Form Option Cards (Strength, Hypertrophy, Cardio, Mobility Chips) */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
              Workout Category Vector
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => {
                const CatIcon = cat.icon;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => {
                      setCategory(cat.id);
                      setExercise(""); // Clear exercise choice when type toggles to load correct default presets
                    }}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      category === cat.id
                        ? "bg-stone-900 border-gold/45 shadow-[inset_0_1px_5px_rgba(201,168,76,0.1)] text-white"
                        : "bg-[#0A0A0A] border-white/5 hover:border-white/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 justify-between w-full">
                      <CatIcon className={`w-4 h-4 ${cat.color}`} />
                      {category === cat.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      )}
                    </div>
                    <span className="font-bebas text-base tracking-wider mt-2 block">{cat.name}</span>
                    <span className="text-[9px] font-mono text-gray-500 tracking-wider block">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Exercise Search/Select Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                Target Exercise Movement
              </label>
              <span className="text-[9px] font-mono text-gray-500 uppercase">[ Presets available below ]</span>
            </div>
            <input
              type="text"
              required
              placeholder="e.g. Hoist Incline Chest Press, Back Squats..."
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              className="w-full bg-stone-900 border border-white/10 rounded-lg px-4 py-3 text-xs text-white placeholder-gray-500 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20 font-sans"
              id="input-workout-exercise"
            />
            {/* Horizontal presets chips matching active category selection */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {PRESET_EXERCISES[category].map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setExercise(preset)}
                  className={`text-[9.5px] font-sans px-2.5 py-1 rounded border transition-all cursor-pointer ${
                    exercise === preset
                      ? "bg-gold/15 border-gold text-gold"
                      : "bg-stone-900/50 border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Generic Details grid conditional on type */}
          {(category === "strength" || category === "hypertrophy") ? (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Weight (KG)</label>
                <input
                  type="number"
                  placeholder="85"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 rounded-lg p-2.5 text-center text-xs text-white focus:border-gold/50 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Sets Count</label>
                <input
                  type="number"
                  placeholder="4"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 rounded-lg p-2.5 text-center text-xs text-white focus:border-gold/50 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Reps Per Set</label>
                <input
                  type="number"
                  placeholder="12"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 rounded-lg p-2.5 text-center text-xs text-white focus:border-gold/50 focus:outline-none font-mono"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1.5">
                Activity Duration (Minutes)
              </label>
              <input
                type="number"
                placeholder="30"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-stone-900 border border-white/10 rounded-lg p-2.5 text-center text-xs text-white focus:border-gold/50 focus:outline-none font-mono"
              />
            </div>
          )}

          {/* Effort intensity RPE slider */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono text-[10px] text-gray-400">
              <span>EXERTION RATING (RPE INDEX)</span>
              <span className="text-gold font-bold">RPE {rpe} / 10 Effort</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={rpe}
              onChange={(e) => setRpe(Number(e.target.value))}
              className="w-full accent-gold bg-stone-900 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[8px] text-gray-500 uppercase">
              <span>1 - Warm Up</span>
              <span>7 - Hard Set</span>
              <span>10 - Peak Failure</span>
            </div>
          </div>

          {/* Date and Notes fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Date Logged</label>
              <input
                type="date"
                required
                value={date}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-stone-900 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-gold/50 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Biomechanical Remarks</label>
              <input
                type="text"
                placeholder="e.g. felt great, solid grip..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-stone-900 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-gold/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="w-full py-4 mt-2 rounded-xl bg-gold hover:bg-gold-light text-black font-sans text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-[0_4px_15px_rgba(201,168,76,0.15)] hover:shadow-gold/25 cursor-pointer flex items-center justify-center gap-2"
            id="btn-log-workout-entry"
          >
            <CheckCircle className="w-4 h-4 stroke-[2.5px]" />
            <span>SAVE DAILY LOG ENTRY & CELEBRATE</span>
          </button>
        </form>
      </div>

      {/* 5. Right Column: Workout History Logs list (6 cols) */}
      <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#0E0E0E] border border-white/5 shadow-xl flex flex-col justify-between">
        <div className="space-y-4 flex-grow flex flex-col">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">[ HISTORIC REGISTRY ]</span>
              <h4 className="font-bebas text-2xl text-white tracking-wider">YOUR RECOMPOSITION ENTRIES</h4>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">{logs.length} logged</span>
          </div>

          {/* Scrollable container of entries */}
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 flex-grow scrollbar-thin scrollbar-thumb-stone-800" id="workout-history-list">
            {logs.length === 0 ? (
              <div className="text-center py-12 text-zinc-650 flex flex-col items-center justify-center h-full">
                <Dumbbell className="w-10 h-10 text-stone-700 mb-2 animate-pulse" />
                <span className="text-xs font-mono tracking-widest text-zinc-500 block uppercase">No registered logs</span>
                <span className="text-[10px] text-zinc-600 font-sans mt-1">Unlock progress by completing your initial routine entry today.</span>
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-xl bg-stone-900/60 border border-white/5 hover:border-white/10 transition-colors flex items-start justify-between gap-3 relative group"
                >
                  <div className="space-y-1.5 flex-grow min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-sans text-xs font-bold text-white uppercase truncate max-w-[160px] sm:max-w-[210px]">
                        {log.exercise}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider font-bold shrink-0 ${getCategoryColor(log.category)}`}>
                        {log.category}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-zinc-950 border border-white/5 text-[9px] font-mono text-zinc-400 font-bold shrink-0">
                        {log.date}
                      </span>
                    </div>

                    {/* Specifications detail text */}
                    <div className="text-[10px] font-mono text-gray-400 flex items-center gap-3">
                      {(log.category === "strength" || log.category === "hypertrophy") ? (
                        <>
                          <span>Load: <strong className="text-gold">{log.weight || "--"} KG</strong></span>
                          <span>Sets-Reps: <strong className="text-white">{log.sets || "--"}x{log.reps || "--"}</strong></span>
                        </>
                      ) : (
                        <span>Duration: <strong className="text-orange-400">{log.duration || "--"} min</strong></span>
                      )}
                      <span>Effort: <strong className="text-red-400">RPE {log.rpe}</strong></span>
                    </div>

                    {/* Biomechanical Remarks display */}
                    {log.notes && (
                      <p className="text-[10.5px] font-sans text-stone-400 leading-relaxed italic bg-stone-950/40 p-2 rounded-md border border-white/5 mt-1 truncate">
                        "{log.notes}"
                      </p>
                    )}
                  </div>

                  {/* Delete button wrapper */}
                  <button
                    onClick={() => handleDeleteLog(log.id)}
                    className="p-2 rounded-lg bg-[#0A0A0A] border border-white/5 text-stone-600 hover:text-red-400 hover:border-red-500/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer self-center"
                    title="Remove Workout Log"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dynamic prompt to keep going */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 animate-ping" />
          <span className="text-[10px] font-mono text-gray-400 tracking-wider uppercase">
            Consistency is the absolute catalyst of progress. Continue logging routines to defend your streak!
          </span>
        </div>
      </div>

    </div>
  );
}
