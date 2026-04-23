import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { eduModules } from "../data/eduModules";
import { embeddedLabs } from "../data/embeddedLabs";
import styles from "./HomePage.module.css";

const moduleImageById: Record<string, string> = {
  fizika: "/it-template/assets/images/service/ser1-1.svg",
  kimyo: "/it-template/assets/images/service/ser1-2.svg",
  robot: "/it-template/assets/images/service/ser1-3.svg",
  agro: "/it-template/assets/images/service/ser1-4.svg",
  energiya: "/it-template/assets/images/service/ser1-5.svg",
  ai: "/it-template/assets/images/service/ser1-6.svg",
};

export function HomePage() {
  const cubes = Array.from({ length: 36 }, (_, i) => i);

  return (
    <div className={styles.page}>
      <div className={styles.bg3d} aria-hidden>
        <div className={styles.bgGlowA} />
        <div className={styles.bgGlowB} />
        {cubes.map((i) => (
          <span
            key={i}
            className={styles.bgCube}
            style={
              {
                "--x": `${(i * 37) % 100}%`,
                "--y": `${(i * 29 + 11) % 100}%`,
                "--s": `${12 + (i % 6) * 5}px`,
                "--t": `${9 + (i % 7)}s`,
                "--delay": `${-i * 0.55}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <section className={styles.heroBand}>
        <div className={styles.carouselContainer}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.subTitle}>INNOLAB EDU</span>
              <h1 className={styles.heroTitle}>
                Virtual STEM laboratoriya <span>platformasiga xush kelibsiz</span>
              </h1>
              <p className={styles.heroLead}>
                Mohirdev uslubidagi zamonaviy landing formatida: foydalanuvchi birinchi sahifaning
                o‘zida ro‘yxatdan o‘tadi yoki tizimga kiradi, so‘ng fizika, kimyo, robototexnika,
                agro va energiya yo‘nalishlaridagi 3D laboratoriya mashg‘ulotlarini boshlaydi.
              </p>
              <div className={styles.heroBtnRow}>
                <Link className={styles.btnPrimary} to="/labs">
                  Barcha laboratoriyalar
                  <img src="/it-template/assets/images/icon/arrow.svg" alt="" width={18} height={18} />
                </Link>
                <a className={styles.btnGhost} href="#modullar">
                  Modullar
                </a>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <img
                className={styles.heroImg}
                src="/it-template/assets/images/hero/hero2-4.png"
                width={560}
                height={440}
                alt="Virtual STEM platforma illustratsiyasi"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionPad} id="loyiha">
        <div className={styles.carouselContainer}>
          <div className={styles.secTitle}>
            <span className={styles.subTitle}>LOYIHA MAQSADI</span>
            <h2 className={styles.secHeading}>
              Virtual STEM taʼlim ekotizimini <span> birlashtirish</span>
            </h2>
          </div>
          <div className={styles.goalGrid}>
            <article className={styles.goalCard}>
              <img
                className={styles.goalImage}
                src="/it-template/assets/images/icon/ser2-1.svg"
                width={42}
                height={42}
                alt=""
                aria-hidden
              />
              <h3>Rasmiy va ochiq</h3>
              <p>Guliston davlat universiteti loyihasi — maktab va OTM uchun rasmiy taqdimot formati.</p>
            </article>
            <article className={styles.goalCard}>
              <img
                className={styles.goalImage}
                src="/it-template/assets/images/icon/ser2-2.svg"
                width={42}
                height={42}
                alt=""
                aria-hidden
              />
              <h3>Keng qamrov</h3>
              <p>Fanlar kesimida 100+ virtual tajriba yo‘nalishlari va modullar bo‘yicha ro‘yxat.</p>
            </article>
            <article className={styles.goalCard}>
              <img
                className={styles.goalImage}
                src="/it-template/assets/images/icon/ser2-3.svg"
                width={42}
                height={42}
                alt=""
                aria-hidden
              />
              <h3>Xavfsiz laboratoriya</h3>
              <p>Kimyoviy xavfsizlik muammosi yo‘q — simulyatsiya va 3D muhitda sinov.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.sectionPad} ${styles.sectionMuted}`} id="modullar">
        <div className={styles.carouselContainer}>
          <div className={styles.secTitle}>
            <span className={styles.subTitle}>MODULLAR</span>
            <h2 className={styles.secHeading}>
              6 ta asosiy o‘quv moduli — <span>rang identifikatori bilan</span>
            </h2>
            <p className={styles.secLead}>
              Har bir modul o‘ziga xos yo‘nalishlar va statistik ko‘rsatkichlar bilan pitch deck
              tuzilmasiga mos keltirilgan.
            </p>
          </div>
          <div className={styles.moduleGrid}>
            {eduModules.map((m) => (
              <article
                key={m.id}
                className={styles.moduleCard}
                style={
                  {
                    "--m-accent": m.accent,
                    "--m-soft": m.softBg,
                    "--m-border": m.border,
                  } as CSSProperties
                }
              >
                <div className={styles.moduleIcon} aria-hidden>
                  <img
                    className={styles.moduleIconImage}
                    src={moduleImageById[m.id]}
                    width={26}
                    height={26}
                    alt=""
                  />
                </div>
                <h3 className={styles.moduleTitle}>{m.title}</h3>
                <ul className={styles.topicList}>
                  {m.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className={styles.moduleFooter}>{m.footerLabel}</div>
                <Link className={styles.moduleLink} to={`/labs/module/${m.id}`}>
                  Mashg‘ulotni boshlash
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionPad}>
        <div className={styles.carouselContainer}>
          <div className={styles.secTitle}>
            <span className={styles.subTitle}>Faol 3D demo laboratoriyalar</span>
            <h2 className={styles.secHeading}>
              Hozir ochilgan <span>interaktiv sahifalar</span>
            </h2>
          </div>
          <div className={styles.liveGrid}>
            {embeddedLabs.map((lab) => (
              <Link key={lab.slug} className={styles.liveCard} to={`/labs/view/${lab.slug}`}>
                <span className={styles.liveBadge}>{lab.badge}</span>
                <strong>{lab.title}</strong>
                <span className={styles.liveMeta}>{lab.subtitle}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.pageFooter} id="kontakt">
        <div className={styles.carouselContainer}>
          <p>
            <strong>Loyiha mualliflari:</strong> Yuldashev U., Egamberdiyeva R., Esonova Sh.
          </p>
          <p>
            Bog‘lanish: <a href="tel:+998972780539">+998 (97) 278-05-39</a>
          </p>
          <p className={styles.footerSmall}>
            Dizayn asoslari: «IT Solution» HTML shabloni aktivlari —{" "}
            <code className={styles.code}>public/it-template/assets</code>
          </p>
        </div>
      </footer>
    </div>
  );
}
