import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dumbbell, ShieldCheck, Trophy, ArrowUpRight, Star, Instagram, Camera, Scissors, Check, X, ZoomIn } from "lucide-react";
import { Trainer } from "../types";
import { smoothScrollTo, getViewportMargin } from "../utils/scroll";
import { SACHIN_BICEPS_IMAGE } from "./SachinImage";
import { useGymData } from "../context/GymDataContext";
import { useTranslation } from "../context/LanguageContext";

const TRAINERS: Trainer[] = [
  {
    name: "Sachin Patil",
    role: "Professional Coach & Bio-mechanics Specialist",
    experience: "15+ Yrs Experience",
    specialty: [
      "Heavy Powerlifting & Olympic Pull Mechanics",
      "Precision Macro & Hypertrophy Engineering",
      "Joint-Preservation & Hoist Bio-loading Alignment",
      "Comprehensive Metabolic Recomposition"
    ],
    certifications: ["CSCS Expert Master Coach", "K11 Master Trainer Graduate", "Sports Nutrition Professional"],
    instagram: "https://www.instagram.com/patil.sachin770?igsh=MWR3NXpqNHdlNjBoZQ=="
  }
];

export default function Trainers() {
  const [isSectionLoading, setIsSectionLoading] = useState(true);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  const [isPortraitLoaded, setIsPortraitLoaded] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isAdmin, addLog } = useGymData();
  const { t, language } = useTranslation();

  const getTranslatedTrainer = (tname: string, role: string, experience: string, specialty: string[], certifications: string[]) => {
    if (language === "mr") {
      return {
        role: "प्रोफेशनल कोच आणि बायो-मेकॅनिक्स तज्ज्ञ",
        experience: "१५+ वर्ष अनुभव",
        specialty: [
          "हेवी पॉवरलिफ्टिंग आणि ऑलिम्पिक पुल तंत्र",
          "अचूक मॅक्रो आणि हायपरट्रॉफी डिझाइन",
          "सांधेदुखी प्रतिबंध व Hoist अलाइनमेंट",
          "सर्वसमावेशक फॅट लॉस व शरीर रचना रूपांतरण"
        ],
        certifications: ["CSCS सर्टिफाइड मास्टर कोच", "K11 मास्टर ट्रेनर ग्रॅज्युएट", "स्पोर्ट्स न्यूट्रिशन प्रोफेशनल"],
        buttonText: "सचिन पाटील स्लॉट आरक्षित करा",
        followCoach: "कोचला फॉलो करा"
      };
    }
    return {
      role,
      experience,
      specialty,
      certifications,
      buttonText: "Request Sachin's Priority Coaching Slot",
      followCoach: "Follow Coach"
    };
  };

  // Dynamic coach photo state (loads from localStorage or defaults)
  const [coachPhoto, setCoachPhoto] = useState(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      return localStorage.getItem("powerhouse_coach_photo") || SACHIN_BICEPS_IMAGE;
    }
    return SACHIN_BICEPS_IMAGE;
  });

  // Cropping states
  const [isCroppingOpen, setIsCroppingOpen] = useState(false);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [cropZoom, setCropZoom] = useState(1);
  const [cropPan, setCropPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setRawImage(event.target.result as string);
          setCropZoom(1);
          setCropPan({ x: 0, y: 0 });
          setIsCroppingOpen(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Pointer event handlers for panning the image in the crop viewport
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - cropPan.x, y: e.clientY - cropPan.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const nextX = e.clientX - dragStart.x;
    const nextY = e.clientY - dragStart.y;
    setCropPan({ x: nextX, y: nextY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleApproveCrop = () => {
    if (!rawImage) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 400; // High-res crop layout
      canvas.height = 400;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#111111";
      ctx.fillRect(0, 0, 400, 400);

      ctx.translate(200, 200);

      const scaleFactor = 400 / 240;

      ctx.translate(cropPan.x * scaleFactor, cropPan.y * scaleFactor);
      ctx.scale(cropZoom * scaleFactor, cropZoom * scaleFactor);

      const viewWidth = 240;
      const viewHeight = 240;
      const imgAspect = img.width / img.height;

      let drawWidth = viewWidth;
      let drawHeight = viewHeight;

      if (imgAspect > 1) {
        drawWidth = viewHeight * imgAspect;
        drawHeight = viewHeight;
      } else {
        drawWidth = viewWidth;
        drawHeight = viewWidth / imgAspect;
      }

      ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);

      try {
        const croppedDataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setCoachPhoto(croppedDataUrl);
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("powerhouse_coach_photo", croppedDataUrl);
        }
        addLog(
          "Trainer Photo Reconfigured",
          `Master Coach Sachin Patil's spotlight image was updated and cropped via the live administrative dashboard.`
        );
        setIsAvatarLoaded(false);
        setIsPortraitLoaded(false);
        setIsCroppingOpen(false);
      } catch (err) {
        console.error("Failed to crop image on canvas: ", err);
      }
    };
    img.src = rawImage;
  };

  const handleResetPhoto = () => {
    setCoachPhoto(SACHIN_BICEPS_IMAGE);
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("powerhouse_coach_photo");
    }
    addLog(
      "Trainer Photo Reverted",
      `Restored Sachin Patil's high-contrast original bicep double front pose photograph.`
    );
    setIsAvatarLoaded(false);
    setIsPortraitLoaded(false);
  };

  // Simulate remote loading of elite trainer rosters to show premium skeleton cards
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSectionLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleBookSession = (trainerName: string) => {
    smoothScrollTo("#contact");
    const msgInput = document.getElementById("contact-message") as HTMLTextAreaElement | null;
    if (msgInput) {
      msgInput.value = `Hi Power House! I would like to book an introductory training session with Master Coach ${trainerName}. Please let me know your availability.`;
      msgInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  return (
    <section id="trainers" className="relative py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Background decoration blur lights */}
      <div className="absolute right-0 top-1/4 w-[35rem] h-[35rem] rounded-full bg-electric-red/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[35rem] h-[35rem] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

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
            {language === "mr" ? "[ मास्टर शारीरिक मार्गदर्शन ]" : "[ MASTER PHYSICAL INSTRUCTION ]"}
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-white tracking-widest uppercase">
            {language === "mr" ? (
              <>तुमचा प्रशिक्षक. <span className="text-gold">तुमचा फायदा.</span></>
            ) : (
              <>YOUR COACH. <span className="text-gold">YOUR EDGE.</span></>
            )}
          </h2>
          <div className="h-1 w-24 bg-electric-red mx-auto" />
          <p className="max-w-xl mx-auto font-sans text-xs sm:text-sm text-gray-400 tracking-wider">
            {language === "mr" ? (
              "आम्ही निरुपयोगी गर्दी किंवा व्यत्यय टाळतो. थेट सचिन पाटील सरांसोबत काम करा, जे भुसावळचे सर्वात अनुभवी बायो-मेकॅनिक्स कोच आहेत, जेणेकरून तुमची व्यायाम पद्धत अचूक व परिपूर्ण होईल."
            ) : (
              "We support zero distraction channels. Partner directly with Sachin Patil, Bhusawal's most experienced bio-mechanics coach, to optimize absolute execution form."
            )}
          </p>
        </motion.div>

        {/* Trainers Roster Grid / Spotlight Container */}
        <div className="flex justify-center [perspective:1000px]" id="trainers-cards-grid">
          {isSectionLoading ? (
            // 1. PREMIUM SKELETON LOADER CARD
            <div className="w-full max-w-2xl relative flex flex-col justify-between rounded-3xl bg-gradient-to-b from-[#111] to-[#161616] border-2 border-white/5 p-8 sm:p-10 shadow-2xl animate-pulse h-[530px] overflow-hidden">
              
              {/* Header block Skeleton */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-5">
                  {/* Avatar box loader */}
                  <div className="w-24 h-24 rounded-2xl bg-stone-900 border-2 border-stone-800 relative overflow-hidden flex items-center justify-center shrink-0">
                    <div className="absolute inset-x-0 h-full bg-gradient-to-r from-transparent via-stone-800 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                    <Dumbbell className="w-6 h-6 text-stone-700" />
                  </div>
                  
                  {/* Name and Title labels */}
                  <div className="space-y-3">
                    <div className="h-7 w-48 bg-stone-900 rounded-md" />
                    <div className="h-4 w-60 bg-stone-900/60 rounded-md" />
                  </div>
                </div>

                {/* Experience Badge Skeleton */}
                <div className="h-8 w-32 bg-stone-900 rounded-md" />
              </div>

              {/* Specialties & Credentials Lists Skeletons */}
              <div className="space-y-6 flex-grow">
                {/* Specialties */}
                <div className="space-y-3.5">
                  <div className="h-3 w-44 bg-stone-900/40 rounded-sm" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-stone-800" />
                        <div className="h-3.5 w-full bg-stone-900/80 rounded-sm" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Board Credentials */}
                <div className="space-y-3">
                  <div className="h-3 w-32 bg-stone-900/40 rounded-sm" />
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-6 w-28 bg-stone-900 rounded-md" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTAs Skeleton */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-3">
                <div className="h-14 flex-grow bg-stone-900 rounded-xl" />
                <div className="h-14 w-40 bg-stone-900 rounded-xl" />
              </div>
              
              {/* Subtle shining light stream inside skeleton */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>
          ) : (
            // 2. ACTUAL CONTENT LOADER
            TRAINERS.map((trainer) => {
              const trans = getTranslatedTrainer(trainer.name, trainer.role, trainer.experience, trainer.specialty, trainer.certifications);
              return (
                <motion.div
                  key={trainer.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.025, 
                    rotateX: 1, 
                    rotateY: -1, 
                    borderColor: "rgba(201, 168, 76, 0.5)",
                    boxShadow: "0 25px 50px -12px rgba(201,168,76,0.25)"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 25 
                  }}
                  className="w-full max-w-2xl relative flex flex-col justify-between group overflow-hidden rounded-3xl bg-gradient-to-b from-[#111] to-[#1A1A1A] border-2 border-white/5 p-8 sm:p-10 pt-16 transition-colors duration-500 shadow-2xl hover:border-gold/30 animate-glow-pulse"
                >
                  {/* Admin Strategic Override Header */}
                  {isAdmin && (
                    <div className="absolute top-0 inset-x-0 bg-gold/10 border-b border-gold/15 py-2.5 px-6 flex items-center justify-between z-30" id="trainer-admin-banner">
                      <span className="text-[8px] font-mono text-gold tracking-widest uppercase font-black flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                        <span>ADMIN STRATEGIC OVERRIDE ENABLED</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={triggerFileSelect}
                          className="text-[8px] font-mono text-white bg-zinc-950 border border-white/10 px-2 py-1 rounded hover:bg-gold hover:text-black transition-all uppercase tracking-widest font-extrabold cursor-pointer"
                          id="btn-admin-change-photo"
                        >
                          Upload & Crop
                        </button>
                        {coachPhoto !== SACHIN_BICEPS_IMAGE && (
                          <button
                            type="button"
                            onClick={handleResetPhoto}
                            className="text-[8px] font-mono text-rose-400 bg-zinc-950/40 border border-rose-500/15 px-2 py-1 rounded hover:bg-rose-500 hover:text-white transition-all uppercase tracking-widest font-extrabold cursor-pointer"
                            id="btn-admin-reset-photo"
                          >
                            Reset Original
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Visual Header block containing loaded-state profile avatar */}
                  <div className="relative mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 z-10">
                    <div className="flex items-center gap-5">
                      
                      {/* Primary Avatar container with active uploader action when admin session is online */}
                      <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-[#111] border-2 border-gold/20 group-hover:border-gold/60 transition-all duration-500 overflow-hidden shadow-inner shrink-0 shadow-[0_0_20px_rgba(201,168,76,0.1)]">
                        
                        {/* Avatar Shimmer Skeleton Loader */}
                        {!isAvatarLoaded && (
                          <div className="absolute inset-0 bg-stone-900 flex items-center justify-center">
                            <div className="absolute inset-x-0 h-full bg-gradient-to-r from-transparent via-stone-800 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                            <Dumbbell className="w-5 h-5 text-stone-700 animate-pulse" />
                          </div>
                        )}

                        <img 
                          src={coachPhoto}
                          alt="Sachin Patil Flexing profile"
                          referrerPolicy="no-referrer"
                          onLoad={() => setIsAvatarLoaded(true)}
                          className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 select-none filter brightness-105 contrast-105 ${
                            isAvatarLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                          }`}
                        />
                        
                        {/* Dynamic hover overlay if isAdmin is active */}
                        {isAdmin && (
                          <div 
                            onClick={triggerFileSelect}
                            className="absolute inset-0 bg-black/80 hover:bg-black/60 flex flex-col items-center justify-center cursor-pointer transition-all z-20 group/edit"
                            title="Click to Choose Custom Image & Crop"
                          >
                            <Camera className="w-5 h-5 text-gold group-hover/edit:scale-110 transition-transform" />
                            <span className="text-[7px] font-mono tracking-widest text-[#FFF] uppercase mt-1 text-center px-1 font-black leading-tight">
                              CHANGE IMAGE
                            </span>
                          </div>
                        )}

                        {/* Abstract badge details */}
                        <div className="absolute right-0 bottom-0 w-8 h-8 bg-[#0A0A0A]/85 flex items-center justify-center rounded-tl-xl border-l border-t border-gold/20 backdrop-blur-sm z-10">
                          <Star className="w-3 h-3 text-gold" />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide group-hover:text-gold transition-all duration-300 ease-in-out uppercase">
                            {trainer.name}
                          </h3>
                          {trainer.instagram && (
                            <a
                              id={`trainer-header-instagram`}
                              href={trainer.instagram}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 rounded bg-stone-900 border border-white/10 text-gray-400 hover:text-pink-400 hover:border-pink-500/30 transition-all z-20"
                              title="Follow Sachin on Instagram"
                            >
                              <Instagram className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        <span className="font-sans text-xs text-gold/80 italic font-medium block">
                          {trans.role}
                        </span>
                      </div>
                    </div>

                    {/* Experience Badge */}
                    <div className="text-left sm:text-right flex flex-row sm:flex-col gap-1.5 items-center sm:items-end z-10">
                      <span className="px-3 py-1.5 rounded-md bg-electric-red/10 border border-electric-red/25 text-[10px] font-mono tracking-widest text-electric-red font-bold uppercase">
                        {trans.experience}
                      </span>
                      <span className="text-xs font-mono text-gray-500 hidden sm:inline">
                        ⭐⭐⭐⭐⭐ Coach
                      </span>
                    </div>
                  </div>

                  {/* Hovering flexing graphic silhouette inside background with separate load state */}
                  <div className="absolute right-[-10px] md:right-[20px] bottom-14 md:bottom-20 w-44 md:w-56 h-64 md:h-80 opacity-20 md:opacity-25 group-hover:opacity-60 group-hover:translate-y-[-10px] transition-all duration-700 pointer-events-none mix-blend-screen overflow-hidden z-0">
                    <motion.div
                      className="w-full h-full relative"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {/* Background portrait loading skeleton tracker */}
                      {!isPortraitLoaded && (
                        <div className="absolute bottom-0 right-0 w-32 h-44 bg-stone-900/30 rounded-full filter blur-xl animate-pulse" />
                      )}

                      <img
                        src={coachPhoto}
                        alt="Sachin Patil Posing Profile"
                        referrerPolicy="no-referrer"
                        onLoad={() => setIsPortraitLoaded(true)}
                        className={`w-full h-full object-contain filter brightness-110 contrast-110 drop-shadow-[0_0_25px_rgba(201,168,76,0.25)] transition-all duration-700 ${
                          isPortraitLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-95" />
                    </motion.div>
                  </div>

                  {/* Trainer info */}
                  <div className="space-y-6 flex-grow z-10 relative">
                    
                    {/* Specialties List */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase block">
                        // {language === "mr" ? "विशेषज्ञ कोचिंग क्षेत्र" : "master specialist coaching vectors"}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {trans.specialty.map((spec, sidx) => (
                          <div key={sidx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
                            <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications Bullet Ribbon */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase block">
                        // {language === "mr" ? "प्रमाणपत्रे आणि पात्रता" : "elite board credentials"}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {trans.certifications.map((cert, cidx) => (
                          <span
                            key={cidx}
                            className="px-3 py-1 rounded bg-[#0A0A0A] border border-white/5 text-[10px] font-mono text-gray-400 tracking-wider"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-3 relative z-10">
                    <button
                      id={`book-${trainer.name.toLowerCase().replace(" ", "-")}`}
                      onClick={() => handleBookSession(trainer.name)}
                      className="flex-grow flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold bg-[#0A0A0A] border-2 border-gold/20 text-gold hover:bg-gold hover:text-[#0A0A0A] transition-all duration-300 cursor-pointer"
                    >
                      <span>{trans.buttonText}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    {trainer.instagram && (
                      <a
                        id={`trainer-cta-instagram`}
                        href={trainer.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 text-pink-400 hover:from-pink-500/20 hover:to-orange-500/20 hover:border-pink-500/40 transition-all duration-300 shrink-0"
                        title="Follow Sachin on Instagram"
                      >
                        <Instagram className="w-5 h-5" />
                        <span>{language === "mr" ? "फॉलो करा" : "Follow Coach"}</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="admin-trainer-file-input"
      />

      {/* Interactive Photo Cropper Modal */}
      <AnimatePresence>
        {isCroppingOpen && (
          <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" id="image-cropper-modal-overlay">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-[#141416] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6"
              id="image-cropper-modal-container"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-gold/10 text-gold rounded-lg border border-gold/15">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bebas text-lg text-white tracking-widest uppercase mb-0.5">
                      Crop Profile Image
                    </h4>
                    <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block font-bold leading-none">
                      Optimize Coaching Spotlight Image
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCroppingOpen(false)}
                  className="p-1.5 rounded-lg bg-zinc-900 border border-white/5 text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Crop Area Viewport (240x240 square frame) */}
              <div className="flex flex-col items-center justify-center py-4 bg-black/25 rounded-xl border border-white/5 relative overflow-hidden">
                <div 
                  className="w-[240px] h-[240px] rounded-2xl border-4 border-gold bg-zinc-950 relative overflow-hidden cursor-move touch-none shadow-2xl"
                  id="crop-viewport"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                >
                  {rawImage && (
                    <img
                      src={rawImage}
                      alt="Crop Source"
                      draggable={false}
                      className="absolute max-w-none select-none transition-transform duration-75 origin-center"
                      style={{
                        transform: `translate(${cropPan.x}px, ${cropPan.y}px) scale(${cropZoom})`,
                        top: "50%",
                        left: "50%",
                        transformOrigin: "center",
                        marginTop: rawImage ? "-120px" : "0px", 
                        marginLeft: rawImage ? "-120px" : "0px",
                        width: "240px",
                        height: "240px",
                        objectFit: "contain"
                      }}
                    />
                  )}
                  {/* Subtle alignment reticle lines */}
                  <div className="absolute inset-0 border border-white/10 pointer-events-none flex items-center justify-center">
                    <div className="w-full h-[1px] bg-white/10 absolute animate-pulse" />
                    <div className="h-full w-[1px] bg-white/10 absolute animate-pulse" />
                    <div className="w-16 h-16 border border-dashed border-gold/20 rounded-full absolute" />
                  </div>
                </div>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-3">
                  ↕ Drag image inside container to re-position
                </span>
              </div>

              {/* Slider for Zoom */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-400 font-mono">
                  <span className="uppercase tracking-widest text-[9px] font-bold">Image scale multiplier</span>
                  <span className="text-gold font-bold">{Math.round(cropZoom * 100)}%</span>
                </div>
                <div className="flex items-center gap-3 bg-black/30 p-2.5 rounded-xl border border-white/5">
                  <ZoomIn className="w-4 h-4 text-gray-500 shrink-0" />
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.05"
                    value={cropZoom}
                    onChange={(e) => setCropZoom(parseFloat(e.target.value))}
                    className="w-full accent-gold bg-zinc-850 rounded-lg appearance-none h-1.5 cursor-pointer"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCroppingOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-stone-400 hover:text-white font-sans text-[10px] tracking-widest uppercase font-black cursor-pointer transition-all"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={handleApproveCrop}
                  className="flex-1 py-3 rounded-xl bg-gold hover:bg-[#FFE375] text-black font-sans text-[10px] tracking-widest uppercase font-black cursor-pointer transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Commit Crop</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
