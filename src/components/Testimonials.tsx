import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Testimonial } from "../types";

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Abhishek Patil",
    rating: 5,
    quote: "Power House machines are completely unique. I lost 18kg of fat and built deep cosmetic definition using Coach Sameer's cardio protocols and macro schedules. Best gym in the Shanti Nagar and Bhusawal areas.",
    achievement: "Lost 18kg & Built Aesthetics"
  },
  {
    name: "Rohit Chaudhari",
    rating: 5,
    quote: "The Hoist physical equipment is on another level. Placing the load exactly where it is supposed to be has completely eliminated my shoulder strain during chest presses. My squat increased by 25kg.",
    achievement: "Added +25kg Custom Squat"
  },
  {
    name: "Pooja Patil",
    rating: 5,
    quote: "Super safe and supportive environment for women. The personal trainers don't just count reps; they teach biomechanics. The custom home-food friendly nutrition sheet has helped me tone down quickly.",
    achievement: "Premium Lean Recomposition"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Auto-rotate effect
  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="relative py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Background light orbs */}
      <div className="absolute right-1/4 bottom-1/4 w-[30rem] h-[30rem] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-gold uppercase block">
            [ VERIFIED TRANSFORMATIONS ]
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-white tracking-widest uppercase animate-pulse">
            MEMBER <span className="text-gold">REVIEWS</span>
          </h2>
          <div className="h-1 w-24 bg-electric-red mx-auto" />
        </motion.div>

        {/* Testimonials Carousel Slider Box */}
        <div className="relative min-h-[350px] sm:min-h-[280px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute w-full p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-card-bg to-[#111] border border-white/5 shadow-2x flex flex-col justify-between"
              id={`testimonial-slide-${currentIndex}`}
            >
              {/* Giant Quote Icon */}
              <div className="absolute right-8 top-8 opacity-5 text-gold">
                <Quote className="w-20 h-20" />
              </div>

              <div className="space-y-6">
                {/* Rating stars */}
                <div className="flex gap-1">
                  {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p className="font-sans text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed font-light">
                  "{TESTIMONIALS[currentIndex].quote}"
                </p>
              </div>

              {/* Author & Achievement details */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bebas text-2xl text-white tracking-wider uppercase">
                    {TESTIMONIALS[currentIndex].name}
                  </h4>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">
                    ⭐️ MEMBER OF POWER HOUSE GYM
                  </span>
                </div>
                <div className="sm:text-right">
                  <span className="inline-flex px-3 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-xs text-gold font-sans font-bold uppercase">
                    {TESTIMONIALS[currentIndex].achievement}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls indicator toolbar */}
        <div className="flex items-center justify-between mt-8 max-w-xs mx-auto">
          <button
            id="testimonial-prev"
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-white/10 hover:border-gold/50 bg-[#111] hover:bg-[#1A1A1A] flex items-center justify-center text-white transition-all duration-300 cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400 hover:text-gold" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-8 bg-gold" : "w-2 bg-gray-600 hover:bg-gold/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            id="testimonial-next"
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-white/10 hover:border-gold/50 bg-[#111] hover:bg-[#1A1A1A] flex items-center justify-center text-white transition-all duration-300 cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5 text-gray-400 hover:text-gold" />
          </button>
        </div>

      </div>
    </section>
  );
}
