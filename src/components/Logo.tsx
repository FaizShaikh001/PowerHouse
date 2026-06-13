import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  isLoading?: boolean;
}

export default function Logo({ className = "w-10 h-10", isLoading = false }: LogoProps) {
  const [logoConfig, setLogoConfig] = useState<{ type: string; value: string } | null>(null);

  const loadLogoConfig = () => {
    try {
      const stored = localStorage.getItem("powerhouse-custom-logo");
      if (stored) {
        setLogoConfig(JSON.parse(stored));
      } else {
        setLogoConfig(null);
      }
    } catch (e) {
      console.error("Error reading custom logo in Logo component:", e);
      setLogoConfig(null);
    }
  };

  useEffect(() => {
    loadLogoConfig();
    
    // Wire up custom event listener to update instantly on changes
    window.addEventListener("powerhouse-logo-updated", loadLogoConfig);
    return () => {
      window.removeEventListener("powerhouse-logo-updated", loadLogoConfig);
    };
  }, []);

  // Premium entrance animation variants combining fade-in, slight glide-down, and scale-up transitions
  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.82, 
      y: -6,
      filter: "blur(4px) drop-shadow(0 0 0px rgba(201,168,76,0))" 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      filter: "blur(0px) drop-shadow(0 0 20px rgba(201,168,76,0.3))",
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 15,
        mass: 0.9,
        delay: 0.52, // Delivers a synchronized reveal exactly as the loader screen of the app finishes fading out
      }
    }
  };

  const animateState = isLoading ? "hidden" : "visible";

  // 1. Render custom image logos (base64 data url or external link)
  if (logoConfig && logoConfig.type === "image" && logoConfig.value) {
    return (
      <motion.img
        src={logoConfig.value}
        alt="Power House Gym"
        className={`${className} object-contain rounded-sm`}
        variants={logoVariants}
        initial="hidden"
        animate={animateState}
        whileHover={{ scale: 1.08, rotate: 360 }}
        transition={{
          rotate: { duration: 1.5, ease: [0.25, 1, 0.5, 1] },
          scale: { type: "spring", stiffness: 300, damping: 20 }
        }}
        referrerPolicy="no-referrer"
      />
    );
  }

  // 2. Render custom vector SVG source strings directly
  if (logoConfig && logoConfig.type === "svg" && logoConfig.value) {
    return (
      <motion.div
        className={`${className} flex items-center justify-center select-none`}
        variants={logoVariants}
        initial="hidden"
        animate={animateState}
        whileHover={{ scale: 1.08, rotate: 360 }}
        transition={{
          rotate: { duration: 1.5, ease: [0.25, 1, 0.5, 1] },
          scale: { type: "spring", stiffness: 300, damping: 20 }
        }}
        dangerouslySetInnerHTML={{ __html: logoConfig.value }}
      />
    );
  }

  // 3. Fallback: Default beautifully balanced vector geometric HPH monogram
  return (
    <motion.svg
      viewBox="0 0 500 500"
      className={`${className} cursor-pointer`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={logoVariants}
      initial="hidden"
      animate={animateState}
      whileHover={{ scale: 1.08, rotate: 360 }}
      transition={{
        rotate: { duration: 1.5, ease: [0.25, 1, 0.5, 1] },
        scale: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      {/* Outer Hexagon (Black background forming the thick border) */}
      <polygon
        points="250,15 453.5,132.5 453.5,367.5 250,485 46.5,367.5 46.5,132.5"
        fill="#000000"
      />

      {/* Inner Hexagon (Vibrant athletic gold base) */}
      <polygon
        points="250,45 427.5,147.5 427.5,352.5 250,455 72.5,352.5 72.5,147.5"
        fill="#FFD500"
      />

      {/* Monogram Letters (H P H Geometrically Styled) */}
      {/* 1. Left Leg of H */}
      <polygon
        points="118,146 160,122 160,378 118,354"
        fill="#000000"
      />

      {/* 2. Middle Stem (Arrowhead / Column of P) */}
      <polygon
        points="229,82 250,70 271,82 271,442 229,418"
        fill="#000000"
      />

      {/* 3. Right Leg of H */}
      <polygon
        points="340,122 382,146 382,354 340,378"
        fill="#000000"
      />

      {/* 4. Horizontal Crossover Bar */}
      <polygon
        points="160,236 340,236 340,264 160,264"
        fill="#000000"
      />

      {/* 5. P Loop Object (black outer shape) */}
      <polygon
        points="271,82 320,110 320,216 271,216"
        fill="#000000"
      />

      {/* 6. Gold Cutout inside P Loop to reveal the background */}
      <polygon
        points="271,98 304,117 304,200 271,200"
        fill="#FFD500"
      />
    </motion.svg>
  );
}

