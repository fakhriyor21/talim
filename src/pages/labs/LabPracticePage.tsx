import { Link, Navigate, useParams } from "react-router-dom";
import { eduModules } from "../../data/eduModules";
import { resolveLabInteraction } from "../../data/labInteractions";
import { getCatalogLabById, getLabGrades } from "../../data/virtualLabs";
import styles from "./LabPracticePage.module.css";

export function LabPracticePage() {
  const { labId } = useParams();
  const lab = labId ? getCatalogLabById(labId) : undefined;

  if (!labId || !lab) return <Navigate to="/labs" replace />;
  if (lab.slug) return <Navigate to={`/labs/view/${lab.slug}`} replace />;

  const mod = eduModules.find((m) => m.id === lab.moduleId);
  const moduleLabel = mod?.title ?? "STEM";
  const accent = mod?.accent ?? "#008b9c";
  const grade = getLabGrades(lab)[0] ?? 7;
  const qs = new URLSearchParams({
    title: lab.title,
    module: moduleLabel,
    moduleId: lab.moduleId,
    grade: String(grade),
    labId: lab.id,
    accent,
    interaction: resolveLabInteraction(lab.title, lab.moduleId),
  });
  const src = `/labs/stem-practice.html?${qs.toString()}`;

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <Link className={styles.back} to="/labs">
          ← Laboratoriyalar ro‘yxati
        </Link>
        <div className={styles.info}>
          <strong>{lab.title}</strong>
          <span>{moduleLabel} · {grade}-sinf · interaktiv amaliy laboratoriya</span>
        </div>
      </div>
      <iframe
        className={styles.frame}
        title={lab.title}
        src={src}
        sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups"
      />
    </div>
  );
}
