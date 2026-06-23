// Dynamic data sync helper for Shanti Nagar Shanti Gym / Power House Gym admin panel
export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  billingPeriod: string;
  subtitle: string;
  popular: boolean;
  features: string[];
  featuresLabel: string;
  badge?: string;
  ctaText: string;
}

export interface GymTimings {
  weekdays: string; // e.g. "5:00 AM - 10:00 PM"
  sunday: string;   // e.g. "CLOSED"
  womenExclusive: string; // e.g. "10:00 AM - 12:00 PM & 3:00 PM - 5:00 PM"
}

export interface ClientTransformation {
  id: string;
  name: string;
  achievement: string;
  description: string;
  beforeImage: string; // URL or base64
  afterImage: string;  // URL or base64
  tag: string;         // e.g. "Fat Loss", "Biomechanics Alignment"
  trainer: string;     // e.g. "Sachin Patil"
}

export interface GymMember {
  id: string;
  name: string;
  phone: string;
  plan: string;
  status: "Active" | "Expired" | "Pending";
  joinedDate: string;
}

export interface EventPost {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  image: string; // poster URL or Base64 string
  registrationFormUrl?: string; // Optional Google Form url
  gmailReceiver?: string; // Receiver email
  isActive: boolean;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  name: string;
  phone: string;
  email?: string;
  timestamp: string;
}

const DEFAULT_EVENTS: EventPost[] = [
  {
    id: "event_1",
    title: "Master Deadlift & Biomechanics Workshop",
    description: "Learn how to optimize spinal alignment, maximize torque, and engage neural drive with Master Coach Sachin Patil. Featuring direct stance assessment and mechanical breakdown.",
    date: "2026-07-15",
    time: "10:30 AM - 01:30 PM",
    location: "PowerHouse Main Floor, Kandari",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    registrationFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfD7u-L5_L9iTfG4R-eW5gqJg7nOn5bC8PZ1vPhL16315N4Qg/viewform",
    gmailReceiver: "shaikhfaizsadiq@gmail.com",
    isActive: true
  },
  {
    id: "event_2",
    title: "PowerHouse Monsoon Hypertrophy Seminar",
    description: "Discover molecular hypertrophy pathways, structured macro splits, and mechanical tension strategies for high-frequency training under real biomechanical conditions.",
    date: "2026-08-02",
    time: "04:30 PM - 07:00 PM",
    location: "VIP Lounge, PowerHouse Gym",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80",
    registrationFormUrl: "",
    gmailReceiver: "shaikhfaizsadiq@gmail.com",
    isActive: true
  }
];

// Durable premium defaults
const DEFAULT_MEMBERS: GymMember[] = [
  { id: "mem_1", name: "Anil Kulkarni", phone: "+91 98230 11456", plan: "Quarterly Prestige", status: "Active", joinedDate: "2026-03-12" },
  { id: "mem_2", name: "Sunita Deshmukh", phone: "+91 88055 77312", plan: "Monthly Core", status: "Active", joinedDate: "2026-05-20" },
  { id: "mem_3", name: "Vikram Rane", phone: "+91 91234 56789", plan: "Annual Legacy", status: "Active", joinedDate: "2026-01-05" },
  { id: "mem_4", name: "Pankaj Patil", phone: "+91 77570 99423", plan: "Quarterly Prestige", status: "Active", joinedDate: "2026-04-18" },
  { id: "mem_5", name: "Meera Joshi", phone: "+91 94220 88319", plan: "Monthly Core", status: "Active", joinedDate: "2026-06-01" },
  { id: "mem_6", name: "Rohan Sawant", phone: "+91 98900 12345", plan: "Annual Legacy", status: "Active", joinedDate: "2025-11-15" }
];

const DEFAULT_PRICING_PLANS: PricingPlan[] = [
  {
    id: "monthly_core",
    name: "Monthly Core",
    price: "₹1,500",
    billingPeriod: "/ month",
    subtitle: "High-intensity flexibility & alignment access",
    popular: false,
    ctaText: "Acquire Core Access",
    featuresLabel: "CORE INCLUSIONS:",
    features: [
      "Access to standard Hoist Resistance circuits",
      "Full Viva Cardio Suite selection",
      "Fully Air-Conditioned luxury premises",
      "Flexible club entry (5:00 AM - 10:00 PM)",
      "Dedicated locker & dry zone amenities"
    ]
  },
  {
    id: "quarterly_prestige",
    name: "Quarterly Prestige",
    price: "₹3,800",
    billingPeriod: "/ quarter",
    subtitle: "Absolute biomechanics calibration course",
    popular: true,
    badge: "BEST VALUE",
    ctaText: "Begin Elite Regimen",
    featuresLabel: "PRESTIGE ADMISSIONS:",
    features: [
      "All Monthly Core features included",
      "1 Bio-mechanics Alignment check with Sachin Patil",
      "Personalized macro structure roadmap",
      "Priority equipment booking slots",
      "Exclusive strength technique workshop access"
    ]
  },
  {
    id: "annual_legacy",
    name: "Annual Legacy",
    price: "₹12,000",
    billingPeriod: "/ year",
    subtitle: "The definitive athletic transformation path",
    popular: false,
    ctaText: "Secure Lifetime Legacy",
    featuresLabel: "LEGACY PRIVILEGES:",
    features: [
      "Unlimited 365-day luxury club admission",
      "Ongoing progressive diagnostics with Sachin Patil",
      "Comprehensive year-round nutrition strategy edits",
      "Dedicated premium locker with keyholder rights",
      "Complimentary guest passes (3 tickets per quarter)"
    ]
  }
];

const DEFAULT_TIMINGS: GymTimings = {
  weekdays: "5:00 AM - 10:00 PM",
  sunday: "CLOSED",
  womenExclusive: "10:00 AM - 12:00 PM & 3:00 PM - 5:00 PM"
};

// Seed gallery transformations with premium, realistic representation
const DEFAULT_TRANSFORMATIONS: ClientTransformation[] = [
  {
    id: "trans_1",
    name: "Rahul Verma",
    achievement: "95 kg ➜ 74 kg",
    description: "Reconstructed systemic posture using Shanti Nagar's biomechanically aligned Hoist equipment. Built solid muscle while dropping 21kg over 5 months of dedicated nutrition tracking.",
    beforeImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&q=80",
    afterImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
    tag: "Athletic Fat Loss",
    trainer: "Sachin Patil"
  },
  {
    id: "trans_2",
    name: "Priya Sharma",
    achievement: "Advanced Core Kinetic Stability",
    description: "Successfully cured chronic lower back pain by retraining muscular activation patterns. Sachin adjusted her squat posture with ergonomic chest pads, increasing maximum torque lift by 40%.",
    beforeImage: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=400&q=80",
    afterImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80",
    tag: "Biomechanics Therapy",
    trainer: "Sachin Patil"
  },
  {
    id: "trans_3",
    name: "Amit Patil",
    achievement: "Lean Muscle Reconstruction",
    description: "Gained 8.5kg of dense cosmetic muscle tissue utilizing high-volume drop sets on our pure mechanical leverage rows, supported by Coach Sameer's structured macro schedule.",
    beforeImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80",
    afterImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=80",
    tag: "Hypertrophy Program",
    trainer: "Sameer Patil"
  }
];

export const loadGymData = () => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return {
      pricingPlans: DEFAULT_PRICING_PLANS,
      timings: DEFAULT_TIMINGS,
      transformations: DEFAULT_TRANSFORMATIONS,
      members: DEFAULT_MEMBERS,
      eventPosts: DEFAULT_EVENTS,
      eventRegistrations: [] as EventRegistration[]
    };
  }

  const pricingVal = localStorage.getItem("powerhouse_pricing_plans");
  const timingsVal = localStorage.getItem("powerhouse_timings");
  const transformationsVal = localStorage.getItem("powerhouse_transformations");
  const membersVal = localStorage.getItem("powerhouse_members");
  const eventsVal = localStorage.getItem("powerhouse_event_posts");
  const regsVal = localStorage.getItem("powerhouse_event_registrations");

  return {
    pricingPlans: pricingVal ? JSON.parse(pricingVal) : DEFAULT_PRICING_PLANS,
    timings: timingsVal ? JSON.parse(timingsVal) : DEFAULT_TIMINGS,
    transformations: transformationsVal ? JSON.parse(transformationsVal) : DEFAULT_TRANSFORMATIONS,
    members: membersVal ? JSON.parse(membersVal) : DEFAULT_MEMBERS,
    eventPosts: eventsVal ? JSON.parse(eventsVal) : DEFAULT_EVENTS,
    eventRegistrations: regsVal ? JSON.parse(regsVal) : ([] as EventRegistration[])
  };
};

export const saveGymData = (data: {
  pricingPlans: PricingPlan[];
  timings: GymTimings;
  transformations: ClientTransformation[];
  members: GymMember[];
  eventPosts: EventPost[];
  eventRegistrations: EventRegistration[];
}) => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") return;

  localStorage.setItem("powerhouse_pricing_plans", JSON.stringify(data.pricingPlans));
  localStorage.setItem("powerhouse_timings", JSON.stringify(data.timings));
  localStorage.setItem("powerhouse_transformations", JSON.stringify(data.transformations));
  localStorage.setItem("powerhouse_members", JSON.stringify(data.members));
  localStorage.setItem("powerhouse_event_posts", JSON.stringify(data.eventPosts));
  localStorage.setItem("powerhouse_event_registrations", JSON.stringify(data.eventRegistrations));
};
