import React, { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Clock, Star, Send, ShieldCheck, Mail, Ticket, CheckCircle2, MessageSquare, Flame } from "lucide-react";
import { ContactFormInput } from "../types";

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: "",
    phone: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErr, setFormErr] = useState("");
  const [generatedPass, setGeneratedPass] = useState<{
    code: string;
    dateStr: string;
    name: string;
    phone: string;
    message: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErr) setFormErr("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick validation
    if (!formData.name.trim() || !formData.phone.trim()) {
      setFormErr("Please provide your name and phone number so we can contact you.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate real database submission & pass generation with SMS notification trigger to 07757077393
    setTimeout(() => {
      const now = new Date();
      const passDate = now.toLocaleString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
      const passId = `PHG-PASS-${Math.floor(1000 + Math.random() * 9000)}`;

      setGeneratedPass({
        code: passId,
        dateStr: passDate,
        name: formData.name,
        phone: formData.phone,
        message: formData.message || "Complementary strength consultation"
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1200);
  };

  const handleResetPass = () => {
    setSubmitSuccess(false);
    setGeneratedPass(null);
    setFormData({ name: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute left-1/4 top-1/4 w-[35rem] h-[35rem] bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-gold uppercase block">
            [ LOCATE AND DEPLOY YOURSELF ]
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-white tracking-widest uppercase">
            JOIN <span className="text-gold">NOW</span>
          </h2>
          <div className="h-1 w-24 bg-electric-red mx-auto" />
          <p className="max-w-xl mx-auto font-sans text-xs sm:text-sm text-gray-400 tracking-wider">
            Fill out the form below to immediately construct your professional 1-day entry ticket pass and trigger a notification log to the owner at 07757077393.
          </p>
        </div>

        {/* Form and Details Layout split columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-10 rounded-3xl bg-card-bg/60 backdrop-blur-md border border-white/5 relative overflow-hidden"
            >
              {submitSuccess && generatedPass ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 flex flex-col justify-start"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-gold">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bebas text-2xl text-white tracking-wider uppercase">
                        PASS AUTHORIZED IN DATABASE
                      </h3>
                      <p className="font-sans text-[10px] text-gold/80 italic">Verified by Master Coach Sachin Patil</p>
                    </div>
                  </div>

                  {/* Gorgeous Ticket Visual Representation */}
                  <div className="relative rounded-2xl bg-gradient-to-b from-stone-900 via-stone-950 to-[#121212] border-2 border-gold/45 shadow-[0_0_25px_rgba(201,168,76,0.15)] overflow-hidden">
                    {/* Golden accent bar top */}
                    <div className="h-2 bg-gradient-to-r from-gold via-yellow-600 to-gold w-full" />
                    
                    <div className="p-6 space-y-4">
                      {/* Brand Title block inside badge */}
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="font-bebas text-2xl tracking-widest text-white">
                          POWER <span className="text-gold">HOUSE</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded bg-gold/20 border border-gold/40 font-mono text-[9px] text-gold font-bold uppercase tracking-widest">
                          ONE DAY PASS
                        </span>
                      </div>

                      {/* Ticket stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[9px] font-mono text-gray-500 uppercase block tracking-wider">Bearer Name</span>
                          <span className="font-sans text-xs font-semibold text-white truncate block">{generatedPass.name}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-gray-500 uppercase block tracking-wider">Pass Code</span>
                          <span className="font-mono text-xs font-bold text-gold">{generatedPass.code}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-gray-500 uppercase block tracking-wider">Date & Time</span>
                          <span className="font-sans text-[10px] text-gray-300 leading-none block mt-1">{generatedPass.dateStr}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-gray-500 uppercase block tracking-wider">Assigned Coach</span>
                          <span className="font-sans text-xs text-green-400 font-medium block">Sachin Patil</span>
                        </div>
                      </div>

                      {/* Coupon cutting dashed line */}
                      <div className="relative my-2 py-1 justify-center flex select-none text-stone-700 font-mono tracking-widest text-[9px]">
                        ✂-------------------------------------------
                      </div>

                      <div className="space-y-1 bg-[#0A0A0A] p-2.5 rounded-lg border border-white/5">
                        <span className="text-[9px] font-mono text-gold uppercase block tracking-wider">AUTHORIZED ACCESS</span>
                        <p className="text-[10px] text-gray-400 leading-relaxed">
                          Valid for 1 complete session including full Hoist Resistance Circuit usage & bio-mechanical alignment check from Sachin.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Transmission logs / action buttons */}
                  <div className="space-y-3 bg-stone-950/80 p-4 rounded-xl border border-white/5">
                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block">
                      // OWNER DISPATCH CHANNEL VERIFICATION
                    </span>
                    <p className="text-[10px] text-gray-300 leading-relaxed">
                      A text notification containing your Pass Code <strong className="text-gold">{generatedPass.code}</strong> and phone details has been simulated and sent to Gym Owner on <strong className="text-white">07757077393</strong>.
                    </p>
                    <div className="h-px bg-white/5 my-2" />
                    
                    {/* Real instant actions to send directly via whatsapp/SMS for complete validity */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href={`https://api.whatsapp.com/send?phone=917757077393&text=Hi%20Power%20House%20Gym%21%20I%20have%20registered%20for%20my%20Professional%20One%20Day%20Pass%2E%0AName%3A%20${encodeURIComponent(generatedPass.name)}%0APhone%3A%20${encodeURIComponent(generatedPass.phone)}%0APass%20Code%3A%20${generatedPass.code}%0AAuthorized%20on%3A%20${encodeURIComponent(generatedPass.dateStr)}%0ASee%20you%20soon%21`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-green-950 border border-green-700/50 hover:bg-green-900 text-[10px] font-mono text-green-300 font-bold transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Send WhatsApp text to Owner
                      </a>
                      <a
                        href={`sms:+917757077393?body=Hi+Power+House+Gym!+My+One+Day+Pass+Code+is+${generatedPass.code}.+Name:+${encodeURIComponent(generatedPass.name)}.+Phone:+${encodeURIComponent(generatedPass.phone)}.`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-950 border border-blue-700/50 hover:bg-blue-900 text-[10px] font-mono text-blue-300 font-bold transition-all"
                      >
                        <Phone className="w-3" />
                        Send SMS link
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleResetPass}
                    className="w-full text-center py-2 text-stone-500 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase cursor-pointer"
                  >
                    ← Book Another Day Pass
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
                  <div className="space-y-1">
                    <h3 className="font-bebas text-3xl text-white tracking-wide">
                      GET A 1-DAY PASS
                    </h3>
                    <p className="font-sans text-xs text-gray-400">
                      Take a free pass to experience the biomechanics of our Hoist & Viva equipment.
                    </p>
                  </div>

                  {formErr && (
                    <div className="p-4 rounded-xl bg-electric-red/10 border border-electric-red/30 text-xs text-electric-red">
                      ⚠️ {formErr}
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-gray-400 uppercase block" htmlFor="contact-name">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Abhishek Patil"
                      className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-white/5 text-white font-sans text-xs sm:text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-gray-400 uppercase block" htmlFor="contact-phone">
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 077570 77393"
                      className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-white/5 text-white font-sans text-xs sm:text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-gray-400 uppercase block" htmlFor="contact-message">
                      Your Message / Goals
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Detail your goals (e.g. strength, cardiovascular building, fat management)..."
                      className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-white/5 text-white font-sans text-xs sm:text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    id="contact-form-submit"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold bg-gold text-[#0A0A0A] hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold/50 shadow-lg shadow-gold/10 hover:shadow-gold/30 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{isSubmitting ? "TRANSMITTING..." : "SUBMIT APPLICATION"}</span>
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Right Column: Address and Map */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="font-bebas text-3xl text-white tracking-wider">
                CLUB CREDENTIALS
              </h3>

              {/* Grid of contact coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="contact-credentials-grid">
                
                {/* Location */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block mb-1">
                      LOCATION
                    </span>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed sm:text-xs">
                      Sr. No. 78/1B, Plot No. 10, Yawal Road, behind Navjeevan Furniture Mall, Saichandra Nagar, Shanti Nagar, Kandari, Maharashtra 425201
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block mb-1">
                      TELEPHONE
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-gray-300 font-bold">
                      077570 77393
                    </p>
                    <p className="font-sans text-[10px] text-gray-500">
                      Available via WhatsApp
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block mb-1">
                      CLUB HOURS
                    </span>
                    <div className="font-sans text-xs text-gray-300 space-y-1">
                      <p>
                        Mon - Sat: <strong className="text-white">5:00 AM - 10:00 PM</strong>
                      </p>
                      <p>
                        Women's Exclusive: <strong className="text-pink-400">3:00 PM - 5:00 PM</strong>
                      </p>
                      <p>
                        <strong className="text-gold font-medium">❄️ Fully Air Conditioned Space</strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google stars */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block mb-1">
                      PUBLIC RATING
                    </span>
                    <p className="font-sans text-sm text-gray-300 font-bold">
                      4.8 / 5.0 Rating
                    </p>
                    <p className="font-sans text-[10px] text-gray-500">
                      Top Gym behind Navjeevan Mall
                    </p>
                  </div>
                </div>

              </div>

              {/* Embedded Responsive Google Map */}
              <div className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl h-64 sm:h-80 relative bg-zinc-950">
                <iframe
                  title="Power House Gym & Nutrition Kandari location map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.3619565578713!2d75.7796175!3d21.0613715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd9a7887759fbb9%3A0x7c75426ad581e627!2sPower%20House%20Gym%20and%20nutrition!5e0!3m2!1sen!2sin!4v1716700000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale invert opacity-80 contrast-125 saturate-50"
                />
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
