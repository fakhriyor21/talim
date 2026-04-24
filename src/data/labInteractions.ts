import type { EduModuleId } from "./eduModules";

/**
 * Har bir katalog mashg‘uloti uchun onlayn amaliy laboratoriya “dvigatel” identifikatori.
 * stem-practice.html shu qiymatni URL `interaction` parametri orqali oladi.
 */
export type LabInteractionId =
  | "circuit_resistors"
  | "pendulum_mechanics"
  | "spring_oscillator"
  | "gas_pv_sim"
  | "heat_mix_sim"
  | "optics_lens_rays"
  | "electric_coil_lab"
  | "chem_molecule_lab"
  | "chem_ph_lab"
  | "robot_arm_lab"
  | "agro_crop_lab"
  | "agro_irrigation_lab"
  | "agro_greenhouse_lab"
  | "agro_drone_ndvi_lab"
  | "power_renewable_lab"
  | "ai_training_lab"
  | "kinematics_track_lab";

const MODULE_DEFAULT: Record<EduModuleId, LabInteractionId> = {
  fizika: "pendulum_mechanics",
  kimyo: "chem_molecule_lab",
  robot: "robot_arm_lab",
  agro: "agro_greenhouse_lab",
  energiya: "power_renewable_lab",
  ai: "ai_training_lab",
};

/** Birinchi mos kelgan qoida to‘xtaydi (yuqoridan pastga). */
const RULES: { re: RegExp; kind: LabInteractionId }[] = [
  // Elektr zanjir / rezistor
  {
    re: /rezistor|ketma-ket|parallel|seriya|\bohm\b|elektr\s*zanj|tok\s*zanj|seriya\s*ulash|parallel\s*ulash|qarshilik\s*va\s*reostat|oddiy\s*zanjir|voltmetr|ampermetr|doimiy\s*tok/i,
    kind: "circuit_resistors",
  },
  // Gaz qonunlari
  {
    re: /boyl|mariott|sharl|ideal\s*gaz|gazlar\s*modeli|molekulyar-kinetik|ideal\s*gaz\s*tenglama/i,
    kind: "gas_pv_sim",
  },
  // Tebranish — prujina
  {
    re: /prujina|ressora|rezonans|tebranish\s*tenglama|tebranish\s*tajriba|harmonic/i,
    kind: "spring_oscillator",
  },
  // Mayatnik / mexanika tebranish
  { re: /mayatnik|matematik\s*mayatnik|tebranish\s*kirish/i, kind: "pendulum_mechanics" },
  // Issiqlik
  {
    re: /issiqlik\s*sig‘?imi|issiqlik\s*almash|erish|qaynash|bug|termodinamika|issiqlik\s*dvigatel|molekulyar-kinetik/i,
    kind: "heat_mix_sim",
  },
  // Optika
  {
    re: /linza|ko‘zgu|sinish|interferensiya|difraksiya|prizma|spektr|yorug‘lik|optik|geometrik\s*optika|to‘lqin\s*optika|polarizatsiya|fotoeffekt/i,
    kind: "optics_lens_rays",
  },
  // Elektr / magnit (rezistor zanjir emas)
  {
    re: /elektromagnit|generator|transformator|magnit\s*maydon|kondensator|kulon|elektrostatik|tok\s*kuchi|joule|induksiya|lorens|amper|reaktiv|ac\s*zanjir|elektr\s*zanjir\s*kirish/i,
    kind: "electric_coil_lab",
  },
  // Kimyo: pH / eritma
  { re: /pH|eritma|titr|neytroll|kislota|ishqor|tuzlar|molyar|konsentratsiya/i, kind: "chem_ph_lab" },
  // Kimyo: molekula / atom / bog‘lanish
  {
    re: /molekula|atom|birikma|valent|suvning\s*tarkibi|h₂o|redoks|gaz\s*ajralish|kimyoviy\s*tenglama/i,
    kind: "chem_molecule_lab",
  },
  // Mexanika: harakat / kinematika
  {
    re: /tekis\s*harakat|notekis|impuls|zarbalar|nyuton|ishqalanish|moment|mexanik\s*energiya|qattiq\s*jism\s*aylanishi|bosim|arximed|zichlik/i,
    kind: "kinematics_track_lab",
  },
  // Energiya
  { re: /quyosh|shamol|panel|batareya|invertor|mppt|GES|microgrid|lcoE|pv|turbina/i, kind: "power_renewable_lab" },
  // Robot
  { re: /servo|motor|sensor|pid|kinematika|arduino|microcontroller|encoder|ros|plc/i, kind: "robot_arm_lab" },
  // Agro: maxsus laboratoriyalar
  {
    re: /tomchilatib|irrigatsiya|irrigation|sug‘orish\s*tarmoq|suv\s*balans|evapotranspiratsiya|namlik\s*sensori|fertigatsiya|precision\s*irrigation|et0|klapan|nasos/i,
    kind: "agro_irrigation_lab",
  },
  {
    re: /issiqxona|greenhouse|ventilyatsiya|mikroiqlim|co2|harorat\s*nazorati|iqlim\s*monitoring|digital\s*twin|climate-smart|mikroiqlim\s*indeksi/i,
    kind: "agro_greenhouse_lab",
  },
  {
    re: /ndvi|dron|remote\s*sensing|sun’iy\s*yo‘ldosh|agro\s*xarita|image-based\s*monitoring|hosil\s*prognozi|satellite\s*data|geo-tagging|stress\s*indeksi/i,
    kind: "agro_drone_ndvi_lab",
  },
  {
    re: /tuproq|hosil|ekin|fotosintez|o‘g‘it|npk|agroekolog|fermer\s*kundaligi/i,
    kind: "agro_crop_lab",
  },
  // AI / ML
  {
    re: /machine\s*learning|neural|dataset|accuracy|prompt|chatbot|transformer|nlp|vision|deployment|bias|epoch|model/i,
    kind: "ai_training_lab",
  },
];

function normalizeTitle(title: string): string {
  const t = title.toLowerCase();
  const idx = t.indexOf(" · ");
  return idx === -1 ? t : t.slice(0, idx).trim();
}

/** Katalog mavzusi va fan bo‘yicha qaysi amaliy laboratoriya dvigatelini ochishni aniqlash. */
export function resolveLabInteraction(title: string, moduleId: EduModuleId): LabInteractionId {
  const n = normalizeTitle(title);
  for (const r of RULES) {
    if (r.re.test(n)) return r.kind;
  }
  return MODULE_DEFAULT[moduleId];
}
