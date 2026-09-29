"use client";
import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

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

type Stored = { token: string | null; user: AuthUser | null };

// Cached snapshot so getSnapshot() returns a stable reference
// when nothing changed (required by useSyncExternalStore).
let cacheKey = "";
let cacheVal: Stored = { token: null, user: null };

function readStored(): Stored {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const raw = localStorage.getItem(USER_KEY);
    const key = `${token}|${raw}`;
    if (key !== cacheKey) {
      cacheKey = key;
      cacheVal = { token, user: raw ? (JSON.parse(raw) as AuthUser) : null };
    }
    return cacheVal;
  } catch {
    return { token: null, user: null };
  }
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener("ge-auth-change", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("ge-auth-change", cb);
  };
}

const getSnapshot = () => readStored();
const getServerSnapshot = (): Stored => ({ token: null, user: null });
const subscribeToNothing = () => () => {};
// true on client after hydration, false during SSR/prerender
const getMounted = () => true;
const getUnmounted = () => false;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, user } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(subscribeToNothing, getMounted, getUnmounted);

  const login = useCallback((t: string, u: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, t);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    window.dispatchEvent(new Event("ge-auth-change"));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
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
