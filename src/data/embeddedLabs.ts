/** Virtual STEM laboratoriyalari — `public/labs/` ichidagi HTML */

export type EmbeddedLab = {
  slug: string;
  file: string;
  title: string;
  subtitle: string;
  badge: string;
};

export const embeddedLabs: EmbeddedLab[] = [
  {
    slug: "stem-fizika",
    file: "stem-fizika.html",
    title: "Virtual fizika laboratoriyasi",
    subtitle: "Matematik mayatnichik · gravitatsiya · davr",
    badge: "Fizika",
  },
  {
    slug: "stem-kimyo",
    file: "stem-kimyo.html",
    title: "Virtual kimyo laboratoriyasi",
    subtitle: "Suv molekulasi (H₂O) · 3D molekulyar model",
    badge: "Kimyo",
  },
  {
    slug: "stem-robotika",
    file: "stem-robotika.html",
    title: "Virtual robototexnika laboratoriyasi",
    subtitle: "Manipulyator · bo‘g‘imlar burchagi",
    badge: "Robototexnika",
  },
  {
    slug: "stem-agro",
    file: "stem-agro.html",
    title: "Virtual agrotexnologiya laboratoriyasi",
    subtitle: "Issiqxona · sug‘orish va yorug‘lik · 3D",
    badge: "Agro",
  },
  {
    slug: "stem-energiya",
    file: "stem-energiya.html",
    title: "Virtual energiya laboratoriyasi",
    subtitle: "Quyosh paneli · quvvat baholash · 3D",
    badge: "Energiya",
  },
];

export function getEmbeddedLab(slug: string): EmbeddedLab | undefined {
  return embeddedLabs.find((l) => l.slug === slug);
}
