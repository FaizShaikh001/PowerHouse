import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticProps {
  children: React.ReactElement;
  range?: number; // Distance in pixels within which magnetic pull engages
  strength?: number; // Pull intensity (fraction of cursor offset to translate)
  scaleOnHover?: number; // Target scale upon hover
}

export default function Magnetic({
  children,
  range = 75,
  strength = 0.35,
  scaleOnHover = 1.06
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Create motion values for translation and scale
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  // Configure high-end organic spring configs
  const springConfig = { damping: 14, stiffness: 140, mass: 0.15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    // Check if on a mobile/touch device or narrow viewport
    const isMobile = typeof window !== "undefined" && (
      window.innerWidth < 768 || 
      "ontouchstart" in window || 
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
    );

    if (isMobile) {
      x.set(0);
      y.set(0);
      scale.set(1);
      return;
    }
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distanceX = mouseX - centerX;
    const distanceY = mouseY - centerY;

    // Use Euclidean distance to see if cursor is in trigger circle
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < range) {
      // Pull element in the direction of cursor proportional to strength
      x.set(distanceX * strength);
      y.set(distanceY * strength);
      scale.set(scaleOnHover);
    } else {
      // Soft reset when moving away beyond range
      x.set(0);
      y.set(0);
      scale.set(1);
    }
  };

  const handleMouseLeave = () => {
    // Immediate spring snapping to original rest position
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block w-full sm:w-auto"
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          scale: springScale,
        }}
        className="w-full h-full select-none"
      >
        {children}
      </motion.div>
    </div>
  );
}
