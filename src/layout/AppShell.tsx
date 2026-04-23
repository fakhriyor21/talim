import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { clearSession, getCurrentUser } from "../auth/session";
import styles from "./AppShell.module.css";

const navItems: ({ to: string; label: string; end?: boolean } | { href: string; label: string })[] =
  [
    { to: "/", label: "Bosh sahifa", end: true },
    { href: "/#modullar", label: "Modullar" },
    { to: "/labs", label: "Laboratoriyalar" },
  ];

export function AppShell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const embedLab = pathname.startsWith("/labs/view");
  const user = getCurrentUser();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("innolab-theme");
    const initial = saved === "dark" ? "dark" : "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function changeTheme(next: "light" | "dark") {
    setTheme(next);
    localStorage.setItem("innolab-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  function handleLogout() {
    clearSession();
    navigate("/auth", { replace: true });
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link className={styles.brand} to="/">
            <span className={styles.logo} aria-hidden>
              ◆
            </span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>INNOLAB EDU</span>
              <span className={styles.brandSub}>Virtual STEM platformasi</span>
            </span>
          </Link>
          <nav className={styles.nav} aria-label="Asosiy menyu">
            {navItems.map((item) =>
              "href" in item ? (
                <a key={item.href} className={styles.link} href={item.href}>
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [styles.link, isActive ? styles.linkActive : ""].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>
          <div className={styles.userArea}>
            <label className={styles.themeSwitch} title="Light / Dark mode">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={(e) => changeTheme(e.target.checked ? "dark" : "light")}
              />
              <span className={styles.themeTrack}>
                <span className={styles.themeKnob} />
              </span>
            </label>
            {user ? (
              <Link className={styles.userChip} to="/profile" title="Profil sozlamalari">
                {user.name}
              </Link>
            ) : null}
            <Link className={styles.cta} to="/labs">
              3D laboratoriyalar
            </Link>
            <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
              Chiqish
            </button>
          </div>
        </div>
      </header>
      <main className={`${styles.main} ${embedLab ? styles.mainEmbed : ""}`}>
        <Outlet />
      </main>
      {!embedLab ? (
        <footer className={styles.footer}>
          <div className={styles.footerGrid}>
            <section>
              <h3 className={styles.footerTitle}>INNOLAB EDU</h3>
              <p className={styles.footerText}>
                Interaktiv laboratoriya mashg‘ulotlari, amaliy vazifalar va fanlar kesimidagi
                o‘quv kontentini yagona makonda boshqarish tizimi.
              </p>
            </section>
            <section>
              <h3 className={styles.footerTitle}>Asosiy bo‘limlar</h3>
              <p className={styles.footerText}>Bosh sahifa</p>
              <p className={styles.footerText}>Laboratoriyalar katalogi</p>
            </section>
            <section>
              <h3 className={styles.footerTitle}>Taqdimot holati</h3>
              <p className={styles.footerText}>
                Platforma taʼlim laboratoriyalari bo‘yicha taqdimotga tayyorlangan yagona katalog
                ko‘rinishida faoliyat yuritadi.
              </p>
            </section>
          </div>
          <p className={styles.copy}>© {new Date().getFullYear()} INNOLAB EDU</p>
        </footer>
      ) : null}
    </div>
  );
}
