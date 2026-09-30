import { API_URL } from "./utils";
import {
  countries as fallbackCountries,
  institutions as fallbackInstitutions,
  programs as fallbackPrograms,
  news as fallbackNews,
} from "./data";
import {
  institutions as fallbackAdminInstitutions,
  programs as fallbackAdminPrograms,
  allStudents as fallbackStudents,
} from "@/components/admin/admin-lists";

/* ---------- types (backend shapes) ---------- */
export type Country = { id: string; name: string; slug: string; isoCode?: string; tag?: string; img?: string };
export type University = {
  id: string; name: string; slug: string; short?: string; shortName?: string;
  country?: string | null; location?: string | null; website?: string | null;
  programs?: number; color?: string;
};
export type Program = {
  id: string; title: string; slug: string; level?: string | null; field?: string | null;
  duration?: string | null; processing?: string | null; tuition?: string | null;
  currency?: string | null; university?: string | null; country?: string | null;
  [k: string]: unknown;
};
export type Post = { id?: string; title: string; date?: string; tag?: string };
export type AdminStudent = {
  id: string; name: string; email?: string; phone?: string | null;
  country?: string | null; passport?: string | null; agent?: string;
  status?: string; createdAt?: string;
};

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/* ---------- one-shot fetchers with static fallback ---------- */
export async function getCountries(): Promise<Country[]> {
  const live = await get<Country[]>("/countries");
  if (live?.length) return live;
  return fallbackCountries.map((c) => ({ id: c.slug, ...c }));
}

export async function getUniversities(): Promise<University[]> {
  const live = await get<University[]>("/institutions");
  if (live?.length) return live;
  return fallbackInstitutions.map((u) => ({ id: u.short, slug: u.short.toLowerCase(), ...u }));
}

export async function getPrograms(): Promise<Program[]> {
  const live = await get<Program[]>("/programs");
  if (live?.length) return live;
  return fallbackPrograms as unknown as Program[];
}

export async function getPosts(kind: "news" | "announcements" | "blogs" = "news"): Promise<Post[]> {
  const live = await get<Post[]>(`/${kind}`);
  if (live?.length) return live;
  return fallbackNews;
}

export async function getAdminInstitutions() {
  const live = await get("/institutions");
  if (Array.isArray(live) && live.length) {
    return (live as University[]).map((u) => ({
      name: u.name,
      programs: typeof u.programs === "number" ? `${u.programs} programs` : "—",
      campus: "Main campus",
      web: u.website ?? "",
      country: u.country ?? "",
      address: u.location ?? "",
      rep: "—",
      repEmail: "",
      counsellor: "Unassigned",
    }));
  }
  return fallbackAdminInstitutions;
}

export async function getAdminPrograms() {
  const live = await get<Program[]>("/programs");
  if (live?.length) {
    return live.map((p) => ({
      title: p.title,
      level: p.level ?? "",
      field: p.field ?? "",
      years: p.duration ?? "",
      proc: p.processing ?? "",
      inst: p.university ?? "",
      loc: p.country ?? "",
      fee: p.tuition ? `${p.currency ?? ""} ${p.tuition}` : "Contact",
      orig: "",
    }));
  }
  return fallbackAdminPrograms;
}

export async function getAdminStudents(): Promise<AdminStudent[]> {
  const live = await get<AdminStudent[]>("/admin/students");
  return live ?? [];
}
