import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
      cache: "no-store",
    });
  } catch {
    throw new Error("API offline — is the backend running?");
  }
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const msg = body?.message;
    throw new Error(Array.isArray(msg) ? msg.join(", ") : msg || `API ${res.status}`);
  }
  return res.json();
}
