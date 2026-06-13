export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
  badge?: string;
}

export interface EquipmentFeature {
  brand: "HOIST" | "VIVA" | "GENERAL";
  title: string;
  badge: string;
  desc: string;
  glowColor: string;
}

export interface EquipmentItem {
  name: string;
  category: string;
  iconName: string;
  benefit: string;
  imageUrl?: string;
}

export interface Trainer {
  name: string;
  role: string;
  experience: string;
  specialty: string[];
  certifications: string[];
  instagram?: string;
}

export interface Testimonial {
  name: string;
  rating: number;
  quote: string;
  achievement: string;
}

export interface ContactFormInput {
  name: string;
  phone: string;
  message: string;
}
