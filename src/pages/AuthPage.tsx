import type { CSSProperties, FormEvent } from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getRegisteredUsersCount,
  isAuthenticated,
  loginUser,
  registerUser,
  saveSession,
} from "../auth/session";
import styles from "./AuthPage.module.css";

export function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const hasUsers = getRegisteredUsersCount() > 0;

  if (isAuthenticated()) return <Navigate to="/" replace />;

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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !password.trim() || (mode === "signup" && !name.trim())) {
      setMessage("Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }
    if (mode === "signup") {
      const result = registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      setMessage(result.message);
      if (result.ok) {
        setMode("login");
        setPassword("");
      }
      return;
    }

    const login = loginUser({ email: email.trim(), password });
    if (!login.ok || !login.user) {
      setMessage(login.message);
      return;
    }
    saveSession({
      mode: "login",
      name: login.user.name,
      email: login.user.email,
    });
    navigate("/", { replace: true });
  }

  return (
    <main className={styles.page}>
      <div className={styles.themeSwitch}>
        <label className={styles.themeToggle} title="Light / Dark mode">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={(e) => changeTheme(e.target.checked ? "dark" : "light")}
          />
          <span className={styles.themeTrack}>
            <span className={styles.themeKnob} />
          </span>
        </label>
      </div>

      <div className={styles.bg} aria-hidden>
        {Array.from({ length: 48 }, (_, i) => (
          <span
            key={i}
            className={styles.cube}
            style={
              {
                "--x": `${(i * 37) % 100}%`,
                "--y": `${(i * 19 + 14) % 100}%`,
                "--s": `${12 + (i % 5) * 5}px`,
                "--t": `${10 + (i % 7)}s`,
                "--delay": `${-i * 0.6}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <section className={styles.layout}>
        <article className={styles.showcase}>
          <p className={styles.kicker}>INNOLAB EDU</p>
          <h1 className={styles.title}>Virtual STEM laboratoriya platformasi</h1>
          <p className={styles.lead}>
            Kurslar va laboratoriyalar haqida ma’lumot faqat tizimga kirgan foydalanuvchilarga
            ochiladi. Avval ro‘yxatdan o‘ting, keyin login qiling.
          </p>
          <ul className={styles.points}>
            <li>Har bir foydalanuvchi uchun alohida profil</li>
            <li>3D amaliy mashg‘ulotlar va modul bo‘yicha katalog</li>
            <li>Bir marta kirganingizdan so‘ng qayta login so‘ralmaydi</li>
          </ul>
        </article>

        <article className={styles.card}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${mode === "login" ? styles.active : ""}`}
            onClick={() => setMode("login")}
            disabled={!hasUsers}
            title={!hasUsers ? "Avval sign up qiling" : undefined}
          >
            Login
          </button>
          <button
            type="button"
            className={`${styles.tab} ${mode === "signup" ? styles.active : ""}`}
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {mode === "signup" ? (
            <label className={styles.field}>
              <span>Ism</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ismingiz" />
            </label>
          ) : null}
          <label className={styles.field}>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label className={styles.field}>
            <span>Parol</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>
          <button className={styles.submit} type="submit">
            {mode === "login" ? "Tizimga kirish" : "Ro‘yxatdan o‘tish"}
          </button>
          {!hasUsers ? <p className={styles.note}>Birinchi foydalanuvchi sifatida avval sign up qiling.</p> : null}
          {message ? <p className={styles.msg}>{message}</p> : null}
        </form>
        </article>
      </section>
    </main>
  );
}
