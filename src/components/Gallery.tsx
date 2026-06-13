import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useGymData } from "../context/GymDataContext";
import { ClientTransformation } from "../utils/gymDataStore";
import { Sparkles, Trash2, Edit3, Plus, Image, Upload, CheckCircle, ShieldAlert, Award } from "lucide-react";

export default function Gallery() {
  const { transformations, isAdmin, addTransformation, deleteTransformation } = useGymData();
  const [activeTag, setActiveTag] = useState<string>("All");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  // States for adding transformation
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [achievement, setAchievement] = useState("");
  const [description, setDescription] = useState("");
  const [trainer, setTrainer] = useState("Sachin Patil");
  const [tag, setTag] = useState("Athletic Fat Loss");
  const [beforeImage, setBeforeImage] = useState("");
  const [afterImage, setAfterImage] = useState("");

  // Refs for file triggers
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  const tags = ["All", "Athletic Fat Loss", "Biomechanics Therapy", "Hypertrophy Program"];

  const filteredItems = activeTag === "All" 
    ? transformations 
    : transformations.filter(item => item.tag === activeTag);

  // File uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: "before" | "after") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          if (target === "before") setBeforeImage(reader.result);
          else setAfterImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !achievement || !description) return;

    // Default premium fallback images if empty
    const finalBefore = beforeImage || "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&q=80";
    const finalAfter = afterImage || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80";

    addTransformation({
      name,
      achievement,
      description,
      beforeImage: finalBefore,
      afterImage: finalAfter,
      tag,
      trainer
    });

    // Reset Form
    setName("");
    setAchievement("");
    setDescription("");
    setBeforeImage("");
    setAfterImage("");
    setIsAdding(false);
  };

  return (
    <section id="gallery" className="relative py-24 bg-[#0A0A0A] overflow-hidden border-b border-white/5">
      {/* Decorative glows */}
      <div className="absolute right-0 top-1/4 w-[30rem] h-[30rem] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[25rem] h-[25rem] rounded-full bg-electric-red/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-gold uppercase block">
            [ ATHLETIC TRANSFORMATIONS ]
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-white tracking-widest uppercase">
            CHRONICLES OF <span className="text-gold">STEEL</span>
          </h2>
          <div className="h-1 w-24 bg-electric-red mx-auto" />
          <p className="max-w-xl mx-auto font-sans text-xs sm:text-sm text-gray-400 tracking-wider">
            Witness the biometric progression and dramatic physical shifts executed under the guidance of biomechanics master Sachin Patil.
          </p>
        </div>

        {/* Filter Tags & Core Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 border-b border-white/5 pb-6">
          {/* Tag Bar */}
          <div className="flex flex-wrap gap-2.5">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`py-2 px-4 rounded-full font-sans text-[10px] sm:text-xs uppercase tracking-widest transition-all cursor-pointer ${
                  activeTag === t
                    ? "bg-gold text-black font-extrabold shadow-lg shadow-gold/20"
                    : "bg-[#111] border border-white/5 text-gray-400 hover:text-white hover:border-gold/30"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Admin Control Bar */}
          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-2 bg-gradient-to-r from-gold to-yellow-600 text-black font-sans font-black text-xs uppercase tracking-widest px-5 py-3 rounded-full shadow-lg shadow-gold/20 hover:shadow-gold/40 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-black-800" />
              <span>Add Transformation</span>
            </motion.button>
          )}
        </div>

        {/* Form panel for adding transformation - visible to authenticated admins */}
        <AnimatePresence>
          {isAdmin && isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <form onSubmit={handleSubmit} className="bg-[#111] border-2 border-gold/40 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2 text-gold font-bebas text-2xl uppercase tracking-wider">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span>Log New Client Transformation Result</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column Fields */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Client Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Anand Kulkarni"
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold font-sans"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Transformation Metric / Achievement</label>
                      <input
                        type="text"
                        required
                        value={achievement}
                        onChange={(e) => setAchievement(e.target.value)}
                        placeholder="e.g. 102kg ➜ 80kg (Fat Loss + Biomechanics Alignment)"
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-gold focus:outline-none focus:border-gold font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Category Tag</label>
                        <select
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold cursor-pointer"
                        >
                          <option value="Athletic Fat Loss">Athletic Fat Loss</option>
                          <option value="Biomechanics Therapy">Biomechanics Therapy</option>
                          <option value="Hypertrophy Program">Hypertrophy Program</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Dedicated Coach</label>
                        <select
                          value={trainer}
                          onChange={(e) => setTrainer(e.target.value)}
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold cursor-pointer"
                        >
                          <option value="Sachin Patil">Sachin Patil</option>
                          <option value="Sameer Patil">Sameer Patil</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Success Description</label>
                      <textarea
                        rows={3}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the biomechanical techniques, equipment details, or diet strategies that helped the student succeed!"
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-gold font-sans leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Right Column Files */}
                  <div className="space-y-5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider block mb-2">Upload Side-by-Side Images</span>
                      <div className="grid grid-cols-2 gap-4">
                        {/* Before Upload */}
                        <div 
                          onClick={() => beforeInputRef.current?.click()}
                          className="border border-dashed border-white/15 hover:border-gold/50 rounded-2xl p-4 text-center cursor-pointer bg-[#0A0A0A]/60 flex flex-col items-center justify-center min-h-[140px] transition-all relative overflow-hidden group"
                        >
                          <input
                            type="file"
                            ref={beforeInputRef}
                            onChange={(e) => handleImageUpload(e, "before")}
                            accept="image/*"
                            className="hidden"
                          />
                          {beforeImage ? (
                            <>
                              <img src={beforeImage} alt="Before preview" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all" />
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Upload className="w-5 h-5 text-gold" />
                              </div>
                            </>
                          ) : (
                            <>
                              <Image className="w-5 h-5 text-gray-500 mb-1.5" />
                              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold">1. BEFORE PHOTO</span>
                              <span className="text-[8px] text-gray-500 block mt-1">Drag file or Click</span>
                            </>
                          )}
                        </div>

                        {/* After Upload */}
                        <div 
                          onClick={() => afterInputRef.current?.click()}
                          className="border border-dashed border-white/15 hover:border-gold/50 rounded-2xl p-4 text-center cursor-pointer bg-[#0A0A0A]/60 flex flex-col items-center justify-center min-h-[140px] transition-all relative overflow-hidden group"
                        >
                          <input
                            type="file"
                            ref={afterInputRef}
                            onChange={(e) => handleImageUpload(e, "after")}
                            accept="image/*"
                            className="hidden"
                          />
                          {afterImage ? (
                            <>
                              <img src={afterImage} alt="After preview" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all" />
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Upload className="w-5 h-5 text-gold" />
                              </div>
                            </>
                          ) : (
                            <>
                              <Image className="w-5 h-5 text-gray-500 mb-1.5" />
                              <span className="text-[10px] font-mono text-gold uppercase tracking-widest block font-bold">2. AFTER PHOTO</span>
                              <span className="text-[8px] text-gray-500 block mt-1">Drag file or Click</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end pt-4">
                      <button
                        type="button"
                        onClick={() => setIsAdding(false)}
                        className="px-5 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white font-sans text-xs uppercase tracking-widest font-black cursor-pointer transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-7 py-3 rounded-xl bg-gold hover:bg-gold-light text-[#0A0A0A] font-sans text-xs uppercase tracking-widest font-black shadow-lg shadow-gold/20 cursor-pointer transition-all"
                      >
                        Publish Chronicles
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Chronicles Grid */}
        <div id="gallery-chronicles-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-[#111] rounded-3xl border border-white/5 overflow-hidden flex flex-col h-full shadow-2xl shadow-black/60 hover:border-gold/30 transition-all duration-300"
              >
                {/* Image Comparison Module */}
                <div className="relative h-72 sm:h-80 overflow-hidden bg-black flex">
                  {/* Before container */}
                  <div className="relative w-1/2 h-full border-r border-gold/10 overflow-hidden">
                    <img
                      src={item.beforeImage}
                      alt={`${item.name} Before`}
                      className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] group-hover:scale-102 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md">
                      <span className="text-[8px] font-mono tracking-widest text-gray-400 font-extrabold uppercase">BEFORE</span>
                    </div>
                  </div>

                  {/* After container */}
                  <div className="relative w-1/2 h-full overflow-hidden">
                    <img
                      src={item.afterImage}
                      alt={`${item.name} After`}
                      className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85] saturate-110 group-hover:scale-102 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-gold/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-gold/20">
                      <span className="text-[8px] font-mono tracking-widest text-[#0A0A0A] font-extrabold uppercase">AFTER</span>
                    </div>
                  </div>

                  {/* Dynamic split overlay handle line */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gold pointer-events-none opacity-80 group-hover:scale-y-110 transition-transform">
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold flex items-center justify-center border border-[#0A0A0A] shadow-md shadow-black">
                      <Award className="w-2.5 h-2.5 text-black" />
                    </div>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono px-2 py-1 rounded bg-gold/15 text-gold uppercase tracking-widest font-black leading-none border border-gold/10">
                        {item.tag}
                      </span>
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                        COACH: {item.trainer}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bebas text-2xl text-white tracking-wide uppercase">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-gold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span className="font-sans text-xs font-bold uppercase tracking-wider">{item.achievement}</span>
                      </div>
                    </div>

                    <p className="font-sans text-xs text-gray-400 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions Column */}
                  {isAdmin && (
                    <div className="flex items-center justify-end pt-3 border-t border-white/5 gap-2">
                      {deleteConfirmId === item.id ? (
                        <div className="flex items-center gap-1.5 bg-[#1a0f12] border border-red-500/20 rounded-xl px-2.5 py-1 text-xs">
                          <span className="text-[9px] font-mono text-rose-400 uppercase tracking-widest font-black animate-pulse">
                            Delete?
                          </span>
                          <button
                            onClick={() => {
                              deleteTransformation(item.id);
                              setDeleteConfirmId(null);
                            }}
                            className="bg-red-600 hover:bg-red-500 text-white font-mono text-[9px] uppercase px-2 py-0.5 rounded cursor-pointer font-bold transition-all"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="bg-stone-800 hover:bg-stone-750 text-gray-300 font-mono text-[9px] uppercase px-2 py-0.5 rounded cursor-pointer transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer"
                          title="Remove transformation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Client</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
