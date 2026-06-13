/**
 * Custom Eased Smooth Scrolling Utility
 * Decouples the browser's default rough scroll mechanics with a premium cubic-eased motion.
 * Also accounts for the fixed/sticky navbar height so that section titles are never cropped or cut off.
 */

// Easing function: Cubic Ease-In-Out for luxurious deceleration feel
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export function smoothScrollTo(targetSelector: string, duration: number = 850) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const targetId = targetSelector.replace("#", "");

  // Clean override to scroll strictly to the top of the viewport when targeting home
  if (targetId === "home" || targetId === "top") {
    animateScroll(0, duration);
    // Update URL hash without causing page jump
    window.history.pushState(null, "", "#home");
    return;
  }

  const element = document.getElementById(targetId);
  if (!element) return;

  // Header offset layout padding
  const desktopNavbarHeight = 84; 
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const targetPosition = Math.max(0, elementPosition - desktopNavbarHeight);

  animateScroll(targetPosition, duration);
  
  // Update browser address bar hash cleanly
  window.history.pushState(null, "", `#${targetId}`);
}

function animateScroll(targetY: number, duration: number) {
  const startY = window.pageYOffset;
  const difference = targetY - startY;
  
  // If target coordinates are practically identical to current scroll, bypass to optimize frames
  if (Math.abs(difference) < 2) return;

  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easedProgress = easeInOutCubic(progress);
    window.scrollTo(0, startY + difference * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
