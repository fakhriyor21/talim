import { Link, Navigate, useParams } from "react-router-dom";
import { eduModules } from "../../data/eduModules";
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
  const src = `/labs/stem-practice.html?title=${encodeURIComponent(lab.title)}&module=${encodeURIComponent(moduleLabel)}&moduleId=${encodeURIComponent(lab.moduleId)}&grade=${grade}&labId=${encodeURIComponent(lab.id)}&accent=${encodeURIComponent(accent)}`;

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <Link className={styles.back} to="/labs">
          ← Laboratoriyalar ro‘yxati
        </Link>
        <div className={styles.info}>
          <strong>{lab.title}</strong>
          <span>{moduleLabel} · {grade}-sinf · 3D amaliy topshiriq</span>
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
