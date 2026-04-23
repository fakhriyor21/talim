/** Pitch deck «MODULLAR» / «YECHIM» bo‘yicha asosiy yo‘nalishlar */

export type EduModuleId = "fizika" | "kimyo" | "robot" | "agro" | "energiya" | "ai";

export type EduModule = {
  id: EduModuleId;
  title: string;
  accent: string;
  softBg: string;
  border: string;
  icon: string;
  topics: string[];
  footerLabel: string;
};

export const eduModules: EduModule[] = [
  {
    id: "fizika",
    title: "Fizika",
    accent: "#e53935",
    softBg: "rgba(229, 57, 53, 0.08)",
    border: "#e53935",
    icon: "⚛",
    topics: ["Mexanika", "Elektrodinamika", "Optika", "Termodinamika"],
    footerLabel: "25+ tajriba",
  },
  {
    id: "kimyo",
    title: "Kimyo",
    accent: "#fb8c00",
    softBg: "rgba(251, 140, 0, 0.09)",
    border: "#fb8c00",
    icon: "🧪",
    topics: ["Organik kimyo", "Anorganik", "Analitik", "Fizik kimyo"],
    footerLabel: "30+ tajriba",
  },
  {
    id: "robot",
    title: "Robototexnika",
    accent: "#1565c0",
    softBg: "rgba(21, 101, 192, 0.08)",
    border: "#1565c0",
    icon: "🤖",
    topics: ["Dasturlash", "Simulyatsiya", "Sensorika", "Avtomatlashtirish"],
    footerLabel: "10+ dastur",
  },
  {
    id: "agro",
    title: "Agrotexnologiya",
    accent: "#2e9d5c",
    softBg: "rgba(46, 157, 92, 0.08)",
    border: "#2e9d5c",
    icon: "🌱",
    topics: ["O‘simlik yetishtirish", "Suv tejash", "O‘g‘itlash", "Hosildorlik"],
    footerLabel: "15+ simulyatsiya",
  },
  {
    id: "energiya",
    title: "Energiya",
    accent: "#6b4f9c",
    softBg: "rgba(107, 79, 156, 0.08)",
    border: "#7e57c2",
    icon: "☀",
    topics: ["Quyosh energiyasi", "Shamol energetikasi", "Gidroenergetika", "Batareya texnologiyasi"],
    footerLabel: "20+ loyiha",
  },
  {
    id: "ai",
    title: "AI yordamchi",
    accent: "#0288d1",
    softBg: "rgba(2, 136, 209, 0.08)",
    border: "#0288d1",
    icon: "🧠",
    topics: ["Sun'iy intellekt asosidagi yordamchi o‘qituvchi", "Savol-javob", "Metodik tavsiyalar"],
    footerLabel: "24/7 qo‘llab-quvvatlash",
  },
];
