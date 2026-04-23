import type { FormEvent } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { deleteCurrentUser, getCurrentUser, updateUserProfile } from "../auth/session";
import { eduModules, type EduModuleId } from "../data/eduModules";
import styles from "./ProfilePage.module.css";

type ProfilePrefs = {
  school?: string;
  phone?: string;
  bio?: string;
  preferredGrade?: number;
  preferredModule?: EduModuleId;
  notifications?: {
    reminders: boolean;
    newLabs: boolean;
    weeklyReport: boolean;
  };
};

const PREFS_KEY = "innolab-profile-prefs";

function readPrefs(): ProfilePrefs {
  const raw = localStorage.getItem(PREFS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as ProfilePrefs;
  } catch {
    return {};
  }
}

function writePrefs(prefs: ProfilePrefs): void {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

export function ProfilePage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const prefs = readPrefs();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [school, setSchool] = useState(prefs.school ?? "");
  const [phone, setPhone] = useState(prefs.phone ?? "");
  const [bio, setBio] = useState(prefs.bio ?? "");
  const [preferredGrade, setPreferredGrade] = useState<number>(prefs.preferredGrade ?? 9);
  const [preferredModule, setPreferredModule] = useState<EduModuleId>(prefs.preferredModule ?? "fizika");
  const [reminders, setReminders] = useState<boolean>(prefs.notifications?.reminders ?? true);
  const [newLabs, setNewLabs] = useState<boolean>(prefs.notifications?.newLabs ?? true);
  const [weeklyReport, setWeeklyReport] = useState<boolean>(prefs.notifications?.weeklyReport ?? false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);

  if (!user) return <Navigate to="/auth" replace />;
  const currentUser = user;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      setOk(false);
      setMessage("Yangi parol tasdiqlash bilan bir xil emas.");
      return;
    }
    const res = updateUserProfile({
      currentEmail: currentUser.email,
      name,
      email,
      currentPassword: currentPassword || undefined,
      newPassword: newPassword || undefined,
    });
    setOk(res.ok);
    setMessage(res.message);
    if (res.ok) {
      writePrefs({
        school: school.trim(),
        phone: phone.trim(),
        bio: bio.trim(),
        preferredGrade,
        preferredModule,
        notifications: { reminders, newLabs, weeklyReport },
      });
      localStorage.setItem("innolab-selected-grade", String(preferredGrade));
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  function handleDeleteProfile() {
    const yes = window.confirm("Profilni butunlay o‘chirmoqchimisiz? Bu amalni qaytarib bo‘lmaydi.");
    if (!yes) return;
    const res = deleteCurrentUser(currentUser.email);
    if (res.ok) {
      localStorage.removeItem(PREFS_KEY);
      navigate("/auth", { replace: true });
    } else {
      setOk(false);
      setMessage(res.message);
    }
  }

  const completedLabs = (() => {
    const raw = localStorage.getItem("innolab-completed-labs");
    if (!raw) return 0;
    try {
      const arr = JSON.parse(raw) as string[];
      return Array.isArray(arr) ? arr.length : 0;
    } catch {
      return 0;
    }
  })();

  return (
    <section className={styles.wrap}>
      <header className={styles.head}>
        <p className={styles.kicker}>Profil sozlamalari</p>
        <h1 className={styles.title}>Shaxsiy ma’lumotlarni tahrirlash</h1>
        <p className={styles.lead}>Ism, email va parolni shu sahifada yangilashingiz mumkin.</p>
      </header>

      <div className={styles.stats}>
        <article><strong>{completedLabs}</strong><span>Yakunlangan laboratoriyalar</span></article>
        <article><strong>{preferredGrade}-sinf</strong><span>Standart sinf darajasi</span></article>
        <article><strong>{eduModules.find((m) => m.id === preferredModule)?.title}</strong><span>Afzal fan yo‘nalishi</span></article>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.field}>
          <span>Ism</span>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Maktab / OTM</span>
          <input value={school} onChange={(e) => setSchool(e.target.value)} placeholder="Masalan: GulDU" />
        </label>
        <label className={styles.field}>
          <span>Telefon</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+998..." />
        </label>
        <label className={styles.field}>
          <span>Qisqa bio</span>
          <input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="O‘quvchi / o‘qituvchi..." />
        </label>

        <div className={styles.gridTwo}>
          <label className={styles.field}>
            <span>Standart sinf</span>
            <select value={preferredGrade} onChange={(e) => setPreferredGrade(Number(e.target.value))}>
              {[7, 8, 9, 10, 11].map((g) => (
                <option key={g} value={g}>{g}-sinf</option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>Afzal fan</span>
            <select value={preferredModule} onChange={(e) => setPreferredModule(e.target.value as EduModuleId)}>
              {eduModules.map((m) => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.separator}>Bildirishnomalar</div>
        <div className={styles.switches}>
          <label><input type="checkbox" checked={reminders} onChange={(e) => setReminders(e.target.checked)} /> Eslatma xabarlari</label>
          <label><input type="checkbox" checked={newLabs} onChange={(e) => setNewLabs(e.target.checked)} /> Yangi laboratoriyalar</label>
          <label><input type="checkbox" checked={weeklyReport} onChange={(e) => setWeeklyReport(e.target.checked)} /> Haftalik hisobot</label>
        </div>

        <div className={styles.separator}>Parolni yangilash (ixtiyoriy)</div>

        <label className={styles.field}>
          <span>Joriy parol</span>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Faqat yangi parol qo‘ysangiz kiriting"
          />
        </label>
        <label className={styles.field}>
          <span>Yangi parol</span>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Yangi parolni tasdiqlash</span>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>

        <button className={styles.submit} type="submit">
          Saqlash
        </button>
        <button className={styles.dangerBtn} type="button" onClick={handleDeleteProfile}>
          Profilni o‘chirish
        </button>
        {message ? (
          <p className={`${styles.msg} ${ok ? styles.msgOk : styles.msgErr}`}>{message}</p>
        ) : null}
      </form>
    </section>
  );
}
