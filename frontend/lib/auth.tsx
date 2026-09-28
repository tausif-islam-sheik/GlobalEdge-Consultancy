"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type AuthUser = { id: string; email: string; role: string; name?: string };

type AuthCtx = {
  user: AuthUser | null;
  token: string | null;
  ready: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
};

const Ctx = createContext<AuthCtx>({
  user: null,
  token: null,
  ready: false,
  login: () => {},
  logout: () => {},
});

const TOKEN_KEY = "ge_token";
const USER_KEY = "ge_user";

function readStored(): { token: string | null; user: AuthUser | null } {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const raw = localStorage.getItem(USER_KEY);
    return { token, user: raw ? (JSON.parse(raw) as AuthUser) : null };
  } catch {
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = readStored();
    setToken(s.token);
    setUser(s.user);
    setReady(true);
    const sync = () => {
      const v = readStored();
      setToken(v.token);
      setUser(v.user);
    };
    window.addEventListener("storage", sync);
    window.addEventListener("ge-auth-change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("ge-auth-change", sync);
    };
  }, []);

  const login = useCallback((t: string, u: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, t);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setToken(t);
    setUser(u);
    window.dispatchEvent(new Event("ge-auth-change"));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
    window.dispatchEvent(new Event("ge-auth-change"));
  }, []);

  return <Ctx.Provider value={{ user, token, ready, login, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);

export const dashboardFor = (role?: string) =>
  role === "ADMIN"
    ? "/admin"
    : role === "AGENT"
      ? "/dashboard/agent"
      : role === "INSTITUTION_STAFF"
        ? "/dashboard/institution"
        : "/dashboard/student";
