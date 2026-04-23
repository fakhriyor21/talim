import { Link, Navigate, useParams } from "react-router-dom";
import { getEmbeddedLab } from "../../data/embeddedLabs";
import styles from "./LabEmbedPage.module.css";

export function LabEmbedPage() {
  const { slug } = useParams();
  const lab = slug ? getEmbeddedLab(slug) : undefined;

  if (!slug) return <Navigate to="/labs" replace />;
  if (!lab) return <Navigate to="/labs" replace />;

  const src = `/labs/${lab.file}`;

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <Link className={styles.back} to="/labs">
          ← Laboratoriyalar ro‘yxati
        </Link>
        <div className={styles.info}>
          <strong>{lab.title}</strong>
          <span>{lab.subtitle}</span>
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
