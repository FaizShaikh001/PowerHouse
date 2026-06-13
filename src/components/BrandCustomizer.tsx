import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Upload, Link, Code, Settings, X, Plus, RotateCcw, Image, Save, Eye } from "lucide-react";

export default function BrandCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoType, setLogoType] = useState<"default" | "image" | "svg">("default");
  const [logoValue, setLogoValue] = useState("");
  const [customAccent, setCustomAccent] = useState("#C9A84C");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom configurations on startup
  useEffect(() => {
    try {
      const storedLogo = localStorage.getItem("powerhouse-custom-logo");
      if (storedLogo) {
        const parsed = JSON.parse(storedLogo);
        setLogoType(parsed.type || "default");
        setLogoValue(parsed.value || "");
      }
      
      const storedAccent = localStorage.getItem("powerhouse-brand-accent");
      if (storedAccent) {
        setCustomAccent(storedAccent);
        document.documentElement.style.setProperty("--color-gold", storedAccent);
        // also light and hover variations loosely computed for beautiful coherence
        document.documentElement.style.setProperty("--color-gold-light", adjustColor(storedAccent, 30));
        document.documentElement.style.setProperty("--color-gold-hover", adjustColor(storedAccent, -30));
      }
    } catch (e) {
      console.error("Error loading brand customizations:", e);
    }
  }, []);

  // Simple color brightness adjuster for state synergy
  const adjustColor = (hex: string, percent: number) => {
    let R = parseInt(hex.substring(1, 3), 16);
    let G = parseInt(hex.substring(3, 5), 16);
    let B = parseInt(hex.substring(5, 7), 16);

    R = parseInt((R * (100 + percent)) / 100 + "");
    G = parseInt((G * (100 + percent)) / 100 + "");
    B = parseInt((B * (100 + percent)) / 100 + "");

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    R = R > 0 ? R : 0;
    G = G > 0 ? G : 0;
    B = B > 0 ? B : 0;

    const rHex = R.toString(16).padStart(2, "0");
    const gHex = G.toString(16).padStart(2, "0");
    const bHex = B.toString(16).padStart(2, "0");

    return `#${rHex}${gHex}${bHex}`;
  };

  const saveLogo = (type: "default" | "image" | "svg", value: string) => {
    try {
      if (type === "default") {
        localStorage.removeItem("powerhouse-custom-logo");
      } else {
        localStorage.setItem("powerhouse-custom-logo", JSON.stringify({ type, value }));
      }
      window.dispatchEvent(new Event("powerhouse-logo-updated"));
    } catch (e) {
      console.error(e);
    }
  };

  const handleApplyLogo = () => {
    saveLogo(logoType, logoValue);
    // show brief visual feedback or close
    setIsOpen(false);
  };

  const handleResetAll = () => {
    localStorage.removeItem("powerhouse-custom-logo");
    localStorage.removeItem("powerhouse-brand-accent");
    
    setLogoType("default");
    setLogoValue("");
    setCustomAccent("#C9A84C");
    
    document.documentElement.style.setProperty("--color-gold", "#C9A84C");
    document.documentElement.style.setProperty("--color-gold-light", "#E0C87E");
    document.documentElement.style.setProperty("--color-gold-hover", "#A08332");
    
    window.dispatchEvent(new Event("powerhouse-logo-updated"));
    setIsOpen(false);
  };

  const handleAccentChange = (color: string) => {
    setCustomAccent(color);
    document.documentElement.style.setProperty("--color-gold", color);
    document.documentElement.style.setProperty("--color-gold-light", adjustColor(color, 30));
    document.documentElement.style.setProperty("--color-gold-hover", adjustColor(color, -30));
    localStorage.setItem("powerhouse-brand-accent", color);
  };

  // Drag and drop handlers keys
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if it is an image
    if (!file.type.startsWith("image/") && !file.name.endsWith(".svg")) {
      alert("Please select a valid image file (PNG, JPG, SVG).");
      return;
    }

    const reader = new FileReader();
    if (file.name.endsWith(".svg")) {
      // SVGs can be loaded as text strings for SVG tags directly, or base64 data URLs
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text.trim().startsWith("<svg")) {
          setLogoType("svg");
          setLogoValue(text);
        } else {
          // fallback to data URL
          setLogoType("image");
          setLogoValue(text);
        }
      };
      reader.readAsText(file);
    } else {
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setLogoType("image");
        setLogoValue(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Brand Customizer Dialog Modal Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Dark glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-md"
            />

            {/* Modal Dialog Content block */}
            <motion.div
              layoutId="brand-customization-modal"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-zinc-900 border border-gold/30 rounded-2xl w-full max-w-lg p-6 relative shadow-[0_20px_50px_rgba(201,168,76,0.15)] overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-gold via-yellow-600 to-gold" />
              
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-[9px] font-mono tracking-[0.2em] text-gold uppercase block mb-1">
                    // CONTROL CENTER
                  </span>
                  <h3 className="font-bebas text-2xl text-white tracking-wide uppercase">
                    MANUAL LOGO & BRAND SETTINGS
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main settings tabs stack */}
              <div className="space-y-6">
                
                {/* 1. SELECT LOGO METHOD */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono tracking-widest text-[#C9A84C] uppercase block">
                    1. CHOOSE LOGO TYPE
                  </span>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => { setLogoType("default"); setLogoValue(""); }}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border font-sans uppercase text-[10px] tracking-wider transition-all cursor-pointer ${
                        logoType === "default"
                          ? "bg-gold border-gold text-[#0A0A0A] font-bold"
                          : "bg-stone-900/40 border-stone-800 text-stone-400 hover:text-white hover:border-stone-700"
                      }`}
                    >
                      <Sparkles className="w-4 h-4 mb-1.5" />
                      Default HPH
                    </button>

                    <button
                      onClick={() => setLogoType("image")}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border font-sans uppercase text-[10px] tracking-wider transition-all cursor-pointer ${
                        logoType === "image"
                          ? "bg-gold border-gold text-[#0A0A0A] font-bold"
                          : "bg-stone-900/40 border-stone-800 text-stone-400 hover:text-white hover:border-stone-700"
                      }`}
                    >
                      <Image className="w-4 h-4 mb-1.5" />
                      Image URL/File
                    </button>

                    <button
                      onClick={() => setLogoType("svg")}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border font-sans uppercase text-[10px] tracking-wider transition-all cursor-pointer ${
                        logoType === "svg"
                          ? "bg-gold border-gold text-[#0A0A0A] font-bold"
                          : "bg-stone-900/40 border-stone-800 text-stone-400 hover:text-white hover:border-stone-700"
                      }`}
                    >
                      <Code className="w-4 h-4 mb-1.5" />
                      Raw SVG XML
                    </button>
                  </div>
                </div>

                {/* 2. LOGO INPUT FIELDS */}
                <div className="space-y-3 p-4 bg-stone-900/50 rounded-xl border border-stone-800">
                  
                  {logoType === "default" && (
                    <div className="text-center py-6 space-y-1.5">
                      <p className="text-xs text-stone-400 leading-relaxed">
                        Defaulting to the geometrically engineered <strong>HPH Hexagon Monogram</strong> representing Power House's premium identity.
                      </p>
                    </div>
                  )}

                  {logoType === "image" && (
                    <div className="space-y-4">
                      {/* Image Drag & Drop Area */}
                      <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                          dragActive
                            ? "border-gold bg-gold/5"
                            : "border-stone-800 hover:border-gold/53 bg-stone-950/40"
                        }`}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <Upload className="w-6 h-6 text-gold mx-auto mb-2 opacity-80" />
                        <span className="text-[11px] font-sans text-gray-300 block font-medium">
                          DRAG & DROP LOGO HERE
                        </span>
                        <span className="text-[9px] font-mono text-stone-500 uppercase block mt-1">
                          PNG, JPG, SVG File / Click to select
                        </span>
                      </div>

                      {/* Manual Image URL field alternative */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-[#C9A84C] uppercase flex items-center gap-1">
                          <Link className="w-3 h-3" /> Or Enter Custom Image Link
                        </label>
                        <input
                          type="url"
                          placeholder="https://example.com/logo.png"
                          value={logoValue.startsWith("data:") ? "" : logoValue}
                          onChange={(e) => setLogoValue(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-gold/60 font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {logoType === "svg" && (
                    <div className="space-y-2">
                      <label className="text-[9px] font-mono text-[#C9A84C] uppercase flex items-center gap-1">
                        <Code className="w-3 h-3" /> Paste Vector SVG Source XML
                      </label>
                      <textarea
                        rows={4}
                        placeholder="<svg viewBox='0 0 100 100'>...</svg>"
                        value={logoValue}
                        onChange={(e) => setLogoValue(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-xs text-stone-300 font-mono focus:outline-none focus:border-gold/60 leading-normal"
                      />
                    </div>
                  )}

                  {/* Live Mini Preview */}
                  {logoValue && (
                    <div className="pt-2 border-t border-stone-800/40 flex items-center justify-between">
                      <span className="text-[9px] font-mono text-stone-500 uppercase flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Real-time Preview:
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-[#070707] border border-stone-800 flex items-center justify-center p-1.5 overflow-hidden">
                        {logoType === "image" && (
                          <img src={logoValue} alt="Preview" className="w-full h-full object-contain rounded-sm" referrerPolicy="no-referrer" />
                        )}
                        {logoType === "svg" && (
                          <div dangerouslySetInnerHTML={{ __html: logoValue }} className="w-full h-full flex items-center justify-center resize-none overflow-hidden" />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. BRAND THEME ACCENT SPINNER */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#C9A84C] uppercase block">
                    2. ACCENT GOLD THEME COLOR
                  </span>
                  
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={customAccent}
                      onChange={(e) => handleAccentChange(e.target.value)}
                      className="w-12 h-10 rounded-lg bg-stone-900 border border-stone-800 cursor-pointer overflow-hidden p-0.5"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-gray-300 font-mono">{customAccent.toUpperCase()}</span>
                        <div
                          className="w-2.5 h-2.5 rounded-full animate-ping"
                          style={{ backgroundColor: customAccent }}
                        />
                      </div>
                      <p className="text-[9px] font-mono text-stone-500 uppercase mt-1">
                        Drag picker to dynamically alter buttons, borders, and loaders instantly
                      </p>
                    </div>
                    
                    {/* Prestyled colors suggestions */}
                    <div className="flex gap-1.5">
                      {["#C9A84C", "#E31B23", "#00A86B", "#0096FF"].map((presetCol) => (
                        <button
                          key={presetCol}
                          onClick={() => handleAccentChange(presetCol)}
                          className="w-5 h-5 rounded-full border border-stone-800 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                          style={{ backgroundColor: presetCol }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-stone-800 flex items-center justify-between gap-3">
                <button
                  onClick={handleResetAll}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-stone-800 text-stone-400 hover:text-white hover:bg-stone-800 font-sans text-[10px] tracking-wider uppercase transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Defaults
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2.5 rounded-full border border-transparent text-stone-400 hover:text-white font-sans text-[10px] tracking-wider uppercase transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApplyLogo}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gold hover:bg-gold-light text-[#0A0A0A] font-bold font-sans text-[10px] tracking-wider uppercase shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Changes
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
