import type { CSSProperties } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { eduModules } from "../../data/eduModules";
import { catalogLabs } from "../../data/virtualLabs";
import styles from "./LabsIndexPage.module.css";

export function LabsIndexPage() {
  const totalLabs = catalogLabs.length;
  const liveLabs = catalogLabs.filter((l) => l.status === "live").length;

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash.startsWith("module-")) return;
    const el = document.getElementById(hash);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.intro}>
        <p className={styles.kicker}>YECHIM</p>
        <h1 className={styles.title}>Virtual laboratoriya katalogi</h1>
        <p className={styles.lead}>
          InnoLab Edu platformasida modullar bo‘yicha ko‘plab yo‘nalishlar amaliy 3D topshiriqlar
          bilan berilgan. Har bir laboratoriya ochiladi va mashg‘ulot bajarishga tayyor.
        </p>
        <div className={styles.metrics}>
          <article>
            <strong>{totalLabs}+</strong>
            <span>Jami laboratoriya</span>
          </article>
          <article>
            <strong>{liveLabs}</strong>
            <span>Hozir ishlaydigan 3D</span>
          </article>
          <article>
            <strong>{eduModules.length}</strong>
            <span>Asosiy modul</span>
          </article>
        </div>
        <div className={styles.intro3d} aria-hidden>
          <div className={styles.orbit} />
          {Array.from({ length: 16 }, (_, i) => (
            <span
              key={i}
              className={styles.cube}
              style={
                {
                  "--i": i,
                  "--x": `${(i % 8) * 11 + 8}%`,
                  "--y": `${Math.floor(i / 4) * 20 + 14}%`,
                  "--d": `${8 + (i % 6)}s`,
                  "--delay": `${-i * 0.55}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>

      {eduModules.map((mod) => {
        const labs = catalogLabs.filter((l) => l.moduleId === mod.id);
        return (
          <section key={mod.id} className={styles.moduleBlock} id={`module-${mod.id}`}>
            <header className={styles.moduleHead}>
              <span
                className={styles.moduleDot}
                style={{ background: mod.accent }}
                aria-hidden
              />
              <div className={styles.moduleHeadInfo}>
                <h2 className={styles.moduleTitle}>{mod.title}</h2>
                <p className={styles.moduleMeta}>{mod.footerLabel} · pitch deck</p>
              </div>
              <Link className={styles.modulePageLink} to={`/labs/module/${mod.id}`}>
                Mashg‘ulotni boshlash
              </Link>
            </header>
            <ul className={styles.labList}>
              {labs.map((lab) => (
                <li key={lab.id}>
                  {lab.status === "live" && lab.slug ? (
                    <Link className={styles.labRow} to={`/labs/view/${lab.slug}`}>
                      <span className={styles.labTitle}>{lab.title}</span>
                      <span className={styles.pillLive}>3D demo</span>
                    </Link>
                  ) : (
                    <Link className={styles.labRow} to={`/labs/practice/${lab.id}`}>
                      <span className={styles.labTitle}>{lab.title}</span>
                      <span className={styles.pillSoon}>Amaliy 3D</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <footer className={styles.pageFooter}>
        <p>
          CDN orqali Three.js yuklanishi uchun laboratoriya sahifalarini ochishda internet zarur.
        </p>
      </footer>
    </div>
  );
}
