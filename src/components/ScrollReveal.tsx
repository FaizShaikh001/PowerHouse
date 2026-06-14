import React from "react";
import { motion, HTMLMotionProps } from "motion/react";

export type RevealKey = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-in" | "zoom-out";

interface ScrollRevealProps extends Omit<HTMLMotionProps<"div">, "type"> {
  children: React.ReactNode;
  variant?: RevealKey;
  duration?: number;
  delay?: number;
  once?: boolean;
  threshold?: number;
  margin?: string;
}

export default function ScrollReveal({
  children,
  variant = "fade-up",
  duration = 0.8,
  delay = 0,
  once = true,
  threshold = 0.1,
  margin = "-100px",
  ...props
}: ScrollRevealProps) {
  // Ultra-premium cubic bezier curve similar to high-end luxury consumer gear/creative agency sites
  const premiumEase = [0.16, 1, 0.3, 1]; // custom easeOutExpo

  // On smaller mobile and phone viewports, avoid aggressive negative offsets which might prevent elements from triggering
  const isMobileSize = typeof window !== "undefined" && window.innerWidth < 768;
  const computedMargin = isMobileSize ? "-15px" : margin;

  const variants = {
    "fade-up": {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
    },
    "fade-down": {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
    },
    "fade-left": {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
    },
    "fade-right": {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
    },
    "scale-in": {
      initial: { opacity: 0, scale: 0.94 },
      animate: { opacity: 1, scale: 1 },
    },
    "zoom-out": {
      initial: { opacity: 0, scale: 1.06 },
      animate: { opacity: 1, scale: 1 },
    },
  };

  const selectedVariants = variants[variant] || variants["fade-up"];

  return (
    <motion.div
      initial={selectedVariants.initial}
      whileInView={selectedVariants.animate}
      viewport={{ once, amount: threshold, margin: computedMargin }}
      transition={{
        duration,
        delay,
        ease: premiumEase,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * A stagger container component that triggers staggered entrance animation for children items that are custom ScrollReveal instances or standard motion views.
 */
interface ScrollStaggerProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  threshold?: number;
  once?: boolean;
}

export function ScrollStaggerContainer({
  children,
  staggerChildren = 0.12,
  delayChildren = 0,
  threshold = 0.05,
  once = true,
  ...props
}: ScrollStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: threshold }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Item element inside a ScrollStaggerContainer
 */
interface ScrollStaggerItemProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  variant?: RevealKey;
}

export function ScrollStaggerItem({
  children,
  variant = "fade-up",
  ...props
}: ScrollStaggerItemProps) {
  const premiumEase = [0.16, 1, 0.3, 1];

  const variants = {
    "fade-up": {
      hidden: { opacity: 0, y: 40 },
      show: { opacity: 1, y: 0 },
    },
    "fade-down": {
      hidden: { opacity: 0, y: -40 },
      show: { opacity: 1, y: 0 },
    },
    "fade-left": {
      hidden: { opacity: 0, x: 40 },
      show: { opacity: 1, x: 0 },
    },
    "fade-right": {
      hidden: { opacity: 0, x: -40 },
      show: { opacity: 1, x: 0 },
    },
    "scale-in": {
      hidden: { opacity: 0, scale: 0.95 },
      show: { opacity: 1, scale: 1 },
    },
    "zoom-out": {
      hidden: { opacity: 0, scale: 1.05 },
      show: { opacity: 1, scale: 1 },
    },
  };

  const selectedVariants = variants[variant] || variants["fade-up"];

  return (
    <motion.div
      variants={{
        hidden: selectedVariants.hidden,
        show: {
          ...selectedVariants.show,
          transition: {
            duration: 0.8,
            ease: premiumEase,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
