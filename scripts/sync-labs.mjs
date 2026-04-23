/**
 * Ixtiyoriy: Desktop'dagi qo‘shimcha HTML laboratoriya fayllarini public/labs/ ga nusxalaydi.
 * Asosiy STEM laboratoriyalari repozitoriyada `public/labs/stem-*.html` ko‘rinishida saqlanadi.
 *
 * Muhit o'zgaruvchisi: LAB_HTML_SRC — manba papka (default: %USERPROFILE%/OneDrive/Desktop)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const destDir = path.join(root, "public", "labs");

const defaultSrc =
  process.env.LAB_HTML_SRC ||
  path.join(process.env.USERPROFILE || "", "OneDrive", "Desktop");

/** Desktopdan ixtiyoriy qo‘shimcha nusxa (bo‘lmasa ogohlantirish chiqadi, xato emas) */
const copies = [];

fs.mkdirSync(destDir, { recursive: true });

let ok = 0;
for (const [rel, name] of copies) {
  const from = path.join(defaultSrc, rel);
  const to = path.join(destDir, name);
  if (!fs.existsSync(from)) {
    console.warn("[sync-labs] topilmadi:", from);
    continue;
  }
  fs.copyFileSync(from, to);
  console.log("[sync-labs] OK:", name);
  ok++;
}

if (ok === 0 && copies.length > 0) {
  console.warn(
    "[sync-labs] Hech narsa nusxalanmadi. LAB_HTML_SRC yoki Desktop yo'lini tekshiring.",
  );
}
