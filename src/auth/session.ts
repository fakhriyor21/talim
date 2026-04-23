const SESSION_KEY = "innolab-user";
const USERS_KEY = "innolab-users";

export type SessionUser = {
  name: string;
  email: string;
  mode: "login" | "signup";
  signedAt: string;
};

type StoredUser = {
  name: string;
  email: string;
  password: string;
  createdAt: string;
};

function readUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as StoredUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem(SESSION_KEY));
}

export function saveSession(payload: { name: string; email: string; mode: "login" | "signup" }): void {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      ...payload,
      signedAt: new Date().toISOString(),
    }),
  );
}

export function getCurrentUser(): SessionUser | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getRegisteredUsersCount(): number {
  return readUsers().length;
}

export function registerUser(payload: { name: string; email: string; password: string }): {
  ok: boolean;
  message: string;
} {
  const email = payload.email.trim().toLowerCase();
  const users = readUsers();
  if (users.some((u) => u.email.toLowerCase() === email)) {
    return { ok: false, message: "Bu email allaqachon ro‘yxatdan o‘tgan." };
  }
  users.push({
    name: payload.name.trim(),
    email,
    password: payload.password,
    createdAt: new Date().toISOString(),
  });
  writeUsers(users);
  return { ok: true, message: "Ro‘yxatdan o‘tish muvaffaqiyatli. Endi login qiling." };
}

export function loginUser(payload: { email: string; password: string }): {
  ok: boolean;
  message: string;
  user?: { name: string; email: string };
} {
  const email = payload.email.trim().toLowerCase();
  const user = readUsers().find((u) => u.email.toLowerCase() === email);
  if (!user) {
    return { ok: false, message: "Bunday foydalanuvchi topilmadi. Avval sign up qiling." };
  }
  if (user.password !== payload.password) {
    return { ok: false, message: "Parol noto‘g‘ri." };
  }
  return { ok: true, message: "Muvaffaqiyatli kirildi.", user: { name: user.name, email: user.email } };
}
