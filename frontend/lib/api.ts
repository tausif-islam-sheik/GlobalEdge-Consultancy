"use client";
import { useEffect, useState } from "react";

export {
  getCountries,
  getUniversities,
  getPrograms,
  getPosts,
  getAdminInstitutions,
  getAdminPrograms,
  getAdminStudents,
} from "./api-server";
export type { Country, University, Program, Post, AdminStudent } from "./api-server";

/* ---------- client hook ---------- */
export function useLive<T>(fetcher: () => Promise<T>, fallback: T): T {
  const [data, setData] = useState<T>(fallback);
  useEffect(() => {
    let on = true;
    fetcher().then((d) => { if (on) setData(d); }).catch(() => {});
    return () => { on = false; };
  }, []);
  return data;
}
