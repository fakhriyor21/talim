import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { eduModules, type EduModuleId } from "../../data/eduModules";
import { getLabGrades, labsForModuleAndGrade } from "../../data/virtualLabs";
import styles from "./LabsModulePage.module.css";

const moduleImageById: Record<EduModuleId, string> = {
  fizika: "/it-template/assets/images/service/ser1-1.svg",
  kimyo: "/it-template/assets/images/service/ser1-2.svg",
  robot: "/it-template/assets/images/service/ser1-3.svg",
  agro: "/it-template/assets/images/service/ser1-4.svg",
  energiya: "/it-template/assets/images/service/ser1-5.svg",
  ai: "/it-template/assets/images/service/ser1-6.svg",
};

export function LabsModulePage() {
  const { moduleId } = useParams();
  const mod = eduModules.find((m) => m.id === moduleId);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  if (!moduleId || !mod) return <Navigate to="/labs" replace />;

  useEffect(() => {
    const raw = localStorage.getItem("innolab-selected-grade");
    if (!raw) return;
    const value = Number(raw);
    if (Number.isInteger(value) && value >= 7 && value <= 11) setSelectedGrade(value);
  }, []);

  const labs = selectedGrade != null ? labsForModuleAndGrade(mod.id, selectedGrade) : [];

  function pickGrade(grade: number) {
    if (selectedGrade === grade) return;
    setLoading(true);
    setSelectedGrade(grade);
    localStorage.setItem("innolab-selected-grade", String(grade));
    window.setTimeout(() => setLoading(false), 520);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.topbar}>
        <Link className={styles.back} to="/labs">
          ← Barcha laboratoriyalar
        </Link>
      </div>

      <section className={styles.hero} style={{ "--module-accent": mod.accent } as CSSProperties}>
        <img className={styles.heroIcon} src={moduleImageById[mod.id]} alt="" aria-hidden />
        <div>
          <p className={styles.kicker}>Fan bo‘limi</p>
          <h1 className={styles.title}>{mod.title} laboratoriyalari</h1>
          <p className={styles.lead}>
            {mod.footerLabel} yo‘nalish bo‘yicha mashg‘ulotlar. Har bir laboratoriya alohida sahifada
            3D amaliy topshiriq formatida ochiladi.
          </p>
          <ul className={styles.topics}>
            {mod.topics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.listSection}>
        <div className={styles.gradeGate}>
          <div>
            <p className={styles.gradeLabel}>Sinf darajasi</p>
            <strong className={styles.gradeTitle}>
              {selectedGrade ? `${selectedGrade}-sinf tanlangan` : "Mashg‘ulotni boshlash uchun sinfni tanlang"}
            </strong>
          </div>
          <div className={styles.gradeButtons}>
            {[7, 8, 9, 10, 11].map((g) => (
              <button
                key={g}
                type="button"
                className={`${styles.gradeBtn} ${selectedGrade === g ? styles.gradeBtnActive : ""}`}
                onClick={() => pickGrade(g)}
              >
                {g}-sinf
              </button>
            ))}
          </div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.toolbarTabs}>
            <button type="button" className={`${styles.tab} ${styles.tabActive}`}>Qo‘llash</button>
            <button type="button" className={styles.tab}>Izohlash</button>
          </div>
          <p className={styles.toolbarResult}>
            Natija: {selectedGrade ? `${labs.length} ta mashg‘ulot` : "sinf tanlang"}
          </p>
        </div>

        {selectedGrade == null ? (
          <p className={styles.empty}>Davom etish uchun 7–11 sinflardan birini tanlang.</p>
        ) : null}

        {loading ? (
          <div className={styles.loadingWrap} role="status" aria-live="polite">
            <div className={styles.loader} />
            <p>{selectedGrade}-sinf laboratoriyalari yuklanmoqda...</p>
          </div>
        ) : null}

        <ul className={styles.labGrid} aria-busy={loading}>
          {labs.map((lab, idx) => {
            const route = lab.status === "live" && lab.slug ? `/labs/view/${lab.slug}` : `/labs/practice/${lab.id}`;
            return (
              <li key={lab.id}>
                <article className={styles.card}>
                  <header className={styles.cardTop}>
                    <span className={styles.num}>№{idx + 1}</span>
                    <span className={lab.status === "live" ? styles.badgeLive : styles.badgeMethod}>
                      {lab.status === "live" ? "Interaktiv" : "Metodik"}
                    </span>
                  </header>
                  <h3 className={styles.cardTitle}>{lab.title}</h3>
                  <p className={styles.cardMeta}>
                    {idx + 1} BOB · {mod.title} · {getLabGrades(lab).join(", ")}-sinf
                  </p>
                  <p className={styles.cardDesc}>Amaliy topshiriqni bosqichma-bosqich bajarish va natijani tahlil qilish.</p>
                  <Link className={styles.openBtn} to={route}>
                    Ochish
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
