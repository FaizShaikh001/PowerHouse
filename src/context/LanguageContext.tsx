import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "mr";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // NavLinks
    "nav.home": "Home",
    "nav.about": "About",
    "nav.equipment": "Equipment",
    "nav.trainers": "Trainers",
    "nav.nutrition": "Nutrition",
    "nav.tools": "Tools",
    "nav.gallery": "Gallery",
    "nav.whyUs": "Why Us",
    "nav.contact": "Contact",
    "nav.events": "Events",

    // Hero Section
    "hero.sculpt": "SCULPT YOUR SUPREME PHYSIQUE",
    "hero.forge": "FORGE YOUR",
    "hero.legacy": "LEGACY",
    "hero.sub": "Precision Strength & Biomechanics Training run by Master Coach Sachin Patil.",
    "hero.badge": "Bhusawal's Premier Elite Training Academy",
    "hero.explore": "Explore Equipment",
    "hero.join": "Join Now",
    "hero.stats.area": "4000+ SQ. FT.",
    "hero.stats.machines": "45+ PREMIUM MACHINES",
    "hero.stats.coaches": "CERTIFIED COACHING",

    // Section Headers
    "section.about.title": "ABOUT US",
    "section.about.subtitle": "Bhusawal's First Fully Equipped Premium Strength Academy",
    "section.equipment.title": "EXCLUSIVE EQUIPMENT",
    "section.equipment.subtitle": "State-Of-The-Art Biomechanically Correct Equipment",
    "section.trainers.title": "MEET OUR MASTER COACHES",
    "section.trainers.subtitle": "Elite Guidance For Maximum Physical Progression",
    "section.pricing.title": "FLEXIBLE MEMBERSHIP PLANS",
    "section.pricing.subtitle": "Select Your Ideal Path To High Performance",
    "section.nutrition.title": "PREMIUM NUTRITION PLANNER",
    "section.nutrition.subtitle": "Fuel Your Muscle Building And Fat Loss With Elite Science",
    "section.tools.title": "INTELLIGENT FITNESS TOOLS",
    "section.tools.subtitle": "Precisely Calculate Your Critical Biometric Metrics",
    "section.whyUs.title": "WHY CHOOSE POWER HOUSE?",
    "section.whyUs.subtitle": "Unequivocal Execution In Strength, Health, And Community",
    "section.gallery.title": "RECORDS OF TRANSFORMATION",
    "section.gallery.subtitle": "Real Human Results Sculpted Through Proper Biomechanical Design",
    "section.testimonials.title": "ATHLETE REVIEWS",
    "section.testimonials.subtitle": "Listen To The Voices Of Our Most Dedicated Benchmarks",
    "section.faq.title": "FREQUENTLY ASKED QUESTIONS",
    "section.faq.subtitle": "Everything You Need To Know About Power House Gym Program",
    "section.contact.title": "GET IN TOUCH",
    "section.contact.subtitle": "Initiate Your Transformation Today",
    "section.events.title": "UPCOMING SPORTS & GYM EVENTS",
    "section.events.subtitle": "Take action and push boundaries. Attend elite biomechanics workshops & training masterclasses.",

    // About Section
    "about.p1": "Power House Gym is Bhusawal's premier destination for individuals dedicated to strength, physical optimization, and longevity. Spanning over 4000 square feet, we combine state-of-the-art equipment with world-class personalized biomechanics coaching.",
    "about.p2": "Under the direct supervision of Master Coach Sachin Patil, every member's biomechanical path is analyzed, corrected, and configured to bypass injuries and secure maximum hypertrophy, muscle recruitment, and physical safety.",
    "about.bullet1": "Scientifically Configured Angles",
    "about.bullet1.sub": "Every single machine in our facility is selected for peak direct muscle stimulation, minimizing joint strain and maximizing hypertrophy.",
    "about.bullet2": "Dedicated Women's Exclusive Sessions",
    "about.bullet2.sub": "Empowering women with comfortable, private training schedules guided by expert sports science coaching.",
    "about.bullet3": "Bespoke Biomechanical Assessment",
    "about.bullet3.sub": "Comprehensive personal movement scans for all new members to isolate muscle weaknesses and program safety barriers.",

    // Contact/Form Section
    "contact.form.title": "Request Sachin's Priority Coaching Slot",
    "contact.form.desc": "Fill out the form below to immediately construct your professional 1-day complimentary entry pass. Subsequent single sessions can be continued at just ₹100/- per session!",
    "contact.form.name": "Your Full Name",
    "contact.form.phone": "Primary Phone",
    "contact.form.goal": "Select Your Primary Focus Goal",
    "contact.form.goal.placeholder": "-- Select focus target --",
    "contact.form.message": "Optional Message / Training Experience",
    "contact.form.message.placeholder": "Type your goals, previous injuries, or what you wish to accomplish...",
    "contact.form.submit": "Generate 1-Day Pass",
    "contact.form.generating": "Generating VIP pass...",

    // General Words
    "general.hours": "Timings",
    "general.phone": "Phone",
    "general.address": "Address",
    "general.callNow": "Call Now",
    "general.followInstagram": "Follow us on Instagram",
    "general.joinPowerHouse": "Join Power House",
    "general.weekday": "Weekdays",
    "general.sunday": "Sunday",
    "general.or": "or",
    "general.coaching": "Coaching",

    // Address & Contact Sync
    "contact.location.title": "LOCATION",
    "contact.location.address": "Sr. No. 78/1B, Plot No. 10, Yawal Road, behind Navjeevan Furniture Mall, Saichandra Nagar, Shanti Nagar, Bhusawal, Maharashtra 425201",
    "contact.telephone.title": "TELEPHONE",
    "contact.telephone.sub": "Available via WhatsApp",
    "contact.rating.title": "PUBLIC RATING",
    "contact.rating.sub": "Top Gym behind Navjeevan Mall",
    "contact.hours.title": "TIMINGS",
    "contact.hours.weekdays": "Mon - Sat",
    "contact.hours.sunday": "Sunday",
    "contact.hours.women": "Women's Exclusive",
    "contact.hours.ac": "Fully Air Conditioned Space",
    "footer.info.title": "INFORMATION",
    "footer.info.name": "Power House Bhusawal:",
    "footer.info.inquiries": "Inquiries Phone:",
    "footer.info.schedules": "Closing Schedules:",
    "footer.info.schedules.desc": "Monday to Saturday {weekdays}. Sunday: {sunday}",

    // Nutrition
    "nutrition.protein": "High Protein Muscle Fuel",
    "nutrition.micronutrients": "Critical Micronutrient Profiling",
    "nutrition.hydration": "Hydration & Recovery Scheduling"
  },
  mr: {
    // NavLinks
    "nav.home": "मुख्यपृष्ठ",
    "nav.about": "आमच्याबद्दल",
    "nav.equipment": "साहित्य",
    "nav.trainers": "प्रशिक्षक",
    "nav.nutrition": "पोषण",
    "nav.tools": "साधने",
    "nav.gallery": "गॅलरी",
    "nav.whyUs": "आम्हीच का",
    "nav.contact": "संपर्क",
    "nav.events": "कार्यक्रम",

    // Hero Section
    "hero.sculpt": "तुमचे शरीर अद्भूत आणि मजबूत बनवा",
    "hero.forge": "तुमची स्वतःची",
    "hero.legacy": "ओळख निर्माण करा",
    "hero.sub": "मास्टर कोच सचिन पाटील यांच्या मार्गदर्शनाखाली अचूक ताकद आणि बायोमेकॅनिक्स प्रशिक्षण.",
    "hero.badge": "भुसावळची पहिली आणि एकमेव एलिट जिम अकॅडमी",
    "hero.explore": "साहित्य पहा",
    "hero.join": "आता सामील व्हा",
    "hero.stats.area": "४०००+ चौ. फूट जागा",
    "hero.stats.machines": "४५+ आंतरराष्ट्रीय मशीन्स",
    "hero.stats.coaches": "प्रमाणित तज्ज्ञ मार्गदर्शन",

    // Section Headers
    "section.about.title": "आमच्याबद्दल",
    "section.about.subtitle": "भुसावळमधील पहिले पूर्ण सुसज्ज आणि अत्याधुनिक स्ट्रेंथ अकॅडमी",
    "section.equipment.title": "विशेष अत्याधुनिक साहित्य",
    "section.equipment.subtitle": "शरीरशास्त्राला अनुकूल (Biomechanically Correct) दर्जेदार आंतरराष्ट्रीय व्यायाम साहित्य",
    "section.trainers.title": "मुख्य प्रशिक्षकांना भेटा",
    "section.trainers.subtitle": "शरीराच्या अचूक प्रगतीसाठी आणि सुरक्षेसाठी अग्रगण्य तज्ज्ञ मार्गदर्शन",
    "section.pricing.title": "लवचिक सदस्यत्व योजना",
    "section.pricing.subtitle": "तुमच्या उज्ज्वल फिटनेस प्रवासासाठी योग्य पॅकेज निवडा",
    "section.nutrition.title": "पॉवर हाउस पोषण मार्गदर्शक",
    "section.nutrition.subtitle": "स्नायूंची वाढ आणि चरबी कमी करण्यासाठी अचूक वैज्ञानिक पोषण तत्त्वे",
    "section.tools.title": "बुद्धिमान फिटनेस साधने",
    "section.tools.subtitle": "तुमचे महत्त्वाचे बायोमेट्रिक गुणधर्म तंतोतंत मोजा",
    "section.whyUs.title": "तुम्ही पॉवर हाउस जिम का निवडावी?",
    "section.whyUs.subtitle": "ताकद, आरोग्य आणि उत्तम शिस्तीचे एक दर्जेदार केंद्र",
    "section.gallery.title": "परिवर्तनाची गॅलरी (निकाल)",
    "section.gallery.subtitle": "योग्य बायोमेकॅनिक्सच्या साहाय्याने मिळवलेले आमचे प्रत्यक्ष उत्कृष्ट निकाल",
    "section.testimonials.title": "ॲथलीट्सचे अनुभव",
    "section.testimonials.subtitle": "आमच्या सर्वात निष्ठावान आणि कष्टाळू सदस्यांचे स्वतःचे अनुभव ऐका",
    "section.faq.title": "सतत विचारले जाणारे प्रश्न (FAQ)",
    "section.faq.subtitle": "पॉवर हाउस जिम प्रवासाबद्दल तुम्हाला पडणाऱ्या सर्व प्रश्नांची सविस्तर उत्तरे",
    "section.contact.title": "संपर्क साधा",
    "section.contact.subtitle": "आजच तुमचा प्रवास सुरू करा",
    "section.events.title": "आगामी स्पोर्ट्स आणि जिम कार्यक्रम",
    "section.events.subtitle": "कष्ट करा आणि स्वतःच्या सीमा ओलांडा. बायोमेकॅनिक्स वर्कशॉप आणि ट्रेनिंग मास्टरक्लासमध्ये सहभागी व्हा.",

    // About Section
    "about.p1": "पॉवर हाउस जिम हे भुसावळमधील उत्तम आरोग्य, ताकद आणि परिपूर्ण शरीर मिळवण्यासाठी समर्पित असलेले सर्वात लोकप्रिय व नावाजलेले केंद्र आहे. ४००० चौरस फुटांच्या भव्य जागेत, आम्ही जागतिक दर्जाच्या मशीन आणि तज्ज्ञ वैयक्तिक बायोमेकॅनिक्स प्रशिक्षणाचा मिलाफ प्रदान करतो.",
    "about.p2": "मास्टर कोच सचिन पाटील यांच्या थेट देखरेखीखाली, प्रत्येक सदस्याच्या व्यायामाची पद्धत तपासली जाते, सुधारली जाते आणि कोणत्याही प्रकारची दुखापत टाळून स्नायूंची सुरक्षित वाढ करण्यासाठी प्रोग्राम आखला जातो.",
    "about.bullet1": "वैज्ञानिकदृष्ट्या डिझाइन केलेले अँगल",
    "about.bullet1.sub": "आमच्या प्रत्येक मशीनचे अँगल सांध्यांवरील ताण कमी करण्यासाठी आणि थेट स्नायूंच्या विकासाला चालना देण्यासाठी वैज्ञानिक दृष्टीने निवडले आहेत.",
    "about.bullet2": "महिलांसाठी राखीव स्वतंत्र बॅचेस",
    "about.bullet2.sub": "खेळ विज्ञान क्षेत्रातील तज्ज्ञ महिला प्रशिक्षकांच्या देखरेखीखाली महिलांसाठी आरामदायी आणि स्वतंत्र वेळापत्रक उपलब्ध.",
    "about.bullet3": "वैयक्तिक बायोमेकॅनिकल तपासणी",
    "about.bullet3.sub": "नवीन सदस्यांचे शारीरिक संतुलन तपासून स्नायूंचा अशक्तपणा शोधणे आणि त्यानुसार योग्य व्यायामाचे नियोजन करणे.",

    // Contact/Form Section
    "contact.form.title": "सचिन सरांचा प्रायोरिटी स्लॉट बुक करा",
    "contact.form.desc": "खालील फॉर्म भरा आणि त्वरित तुमचा मोफत १ दिवसाचा व्हीआयपी पास मिळवा. त्यानंतर प्रत्येक सेशन फक्त ₹१००/- मध्ये पुढे सुरू ठेवता येईल!",
    "contact.form.name": "तुमचे पूर्ण नाव",
    "contact.form.phone": "तुमचा मोबाईल नंबर",
    "contact.form.goal": "व्यायामाचे मुख्य उद्दिष्ट निवडा",
    "contact.form.goal.placeholder": "-- तुमचे ध्येय निवडा --",
    "contact.form.message": "पर्यायी संदेश / पूर्वीचा व्यायाम अनुभव",
    "contact.form.message.placeholder": "तुमचे ध्येय, जुनी दुखापत किंवा इतर कोणतीही माहिती येथे लिहा...",
    "contact.form.submit": "१-दिवसाचा मोफत पास बनवा",
    "contact.form.generating": "व्हीआयपी पास तयार होत आहे...",

    // General Words
    "general.hours": "जिमची वेळ",
    "general.phone": "मोबाईल नंबर",
    "general.address": "पत्ता",
    "general.callNow": "त्वरित कॉल करा",
    "general.followInstagram": "आम्हाला इंस्टाग्रामवर फॉलो करा",
    "general.joinPowerHouse": "पॉवर हाउसमध्ये सामील व्हा",
    "general.weekday": "सोम ते शनी",
    "general.sunday": "रविवार",
    "general.or": "किंवा",
    "general.coaching": "प्रशिक्षण",

    // Address & Contact Sync
    "contact.location.title": "पत्ता",
    "contact.location.address": "सर्व्हे नंबर ७८/१ब, प्लॉट नंबर १०, यावल रोड, नवजीवन फर्निचर मॉलच्या मागे, साईचंद्र नगर, शांती नगर, भुसावळ, महाराष्ट्र ४२५२०१",
    "contact.telephone.title": "फोन नंबर",
    "contact.telephone.sub": "व्हॉट्सॲपवर उपलब्ध",
    "contact.rating.title": "सार्वजनिक रेटिंग",
    "contact.rating.sub": "नवजीवन मॉलच्या मागे अग्रगण्य जिम",
    "contact.hours.title": "जिमची वेळ",
    "contact.hours.weekdays": "सोम - शनी",
    "contact.hours.sunday": "रविवार",
    "contact.hours.women": "महिलांसाठी राखीव वेळ",
    "contact.hours.ac": "पूर्णपणे वातानुकूलित (Fully AC) जागा",
    "footer.info.title": "माहिती",
    "footer.info.name": "पॉवर हाउस भुसावळ:",
    "footer.info.inquiries": "चौकशीसाठी फोन:",
    "footer.info.schedules": "साप्ताहिक वेळापत्रक:",
    "footer.info.schedules.desc": "सोमवार ते शनिवार {weekdays}. रविवार: {sunday}",

    // Nutrition
    "nutrition.protein": "जास्त प्रोटीन आणि स्नायूंचे इंधन",
    "nutrition.micronutrients": "महत्त्वाची जीवनसत्त्वे व खनिजे",
    "nutrition.hydration": "पाण्याचे प्रमाण आणि शरीराचा आराम"
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("powerhouse_language");
      if (saved === "en" || saved === "mr") {
        return saved;
      }
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("powerhouse_language", lang);
    }
  };

  const t = (key: string): string => {
    const translationSet = TRANSLATIONS[language];
    if (translationSet && translationSet[key]) {
      return translationSet[key];
    }
    // Fallback to English translation
    const englishSet = TRANSLATIONS["en"];
    if (englishSet && englishSet[key]) {
      return englishSet[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
