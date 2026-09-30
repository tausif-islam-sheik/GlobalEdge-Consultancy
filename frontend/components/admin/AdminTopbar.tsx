"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Plus, House, Moon, Sun, Bookmark, Bell, LifeBuoy, MessageCircle, PanelLeft, GraduationCap, BookOpen, Users } from "lucide-react";

import { cn, API_URL } from "@/lib/utils";

type Hit = { kind: "student" | "program" | "institution"; title: string; sub?: string; href: string };

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQ("");
      setHits([]);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open ]);

  useEffect(() => {
    if (!open || q.trim().length < 2) { setHits([]); setBusy(false); return; }
    setBusy(true);
    const t = setTimeout(async () => {
      try {
        const query = encodeURIComponent(q.trim());
        const [students, programs, institutions] = await Promise.all([
          fetch(`${API_URL}/admin/students?search=${query}`, { cache: "no-store" }).then((r) => (r.ok ? r.json() : [])).catch(() => []),
          fetch(`${API_URL}/programs?search=${query}`, { cache: "no-store" }).then((r) => (r.ok ? r.json() : [])).catch(() => []),
          fetch(`${API_URL}/institutions?search=${query}`, { cache: "no-store" }).then((r) => (r.ok ? r.json() : [])).catch(() => []),
        ]);
        const out: Hit[] = [
          ...(students ?? []).slice(0, 4).map((s: { id: string; name: string; email?: string }) => ({
            kind: "student" as const, title: s.name, sub: s.email ?? "", href: "/admin/students",
          })),
          ...(programs ?? []).slice(0, 4).map((p: { id: string; title?: string; name?: string; university?: string }) => ({
            kind: "program" as const, title: p.title ?? p.name ?? "Program", sub: p.university ?? "",
            href: `/admin/programs/${p.id}`,
          })),
          ...(institutions ?? []).slice(0, 4).map((u: { name: string; slug?: string; country?: string }) => ({
            kind: "institution" as const, title: u.name, sub: u.country ?? "",
            href: `/admin/institutions/${u.slug ?? slugify(u.name)}`,
          })),
        ];
        setHits(out);
      } catch { setHits([]); }
      setBusy(false);
    }, 300);
    return () => clearTimeout(t);
  }, [q, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  const icons = { student: Users, program: BookOpen, institution: GraduationCap };
  return (
    <div className="fixed inset-0 z-50 grid justify-items-center bg-black/60 p-4 pt-[18vh]" onClick={onClose}>
      <div
        className="h-fit w-full max-w-[560px] rounded border border-white/10 bg-[#121214] p-3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search students, applications, programs, institutions..."
            className="w-full rounded border border-white/10 bg-white/[0.06] py-2.5 pl-10 pr-3 text-[14px] text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-sky-500/50"
          />
        </div>
        {q.trim().length < 2 ? (
          <p className="px-2 py-5 text-center text-[15px] text-zinc-200">Start typing to search across the whole system.</p>
        ) : busy ? (
          <p className="px-2 py-5 text-center text-[14px] text-zinc-500">Searching...</p>
        ) : hits.length === 0 ? (
          <p className="px-2 py-5 text-center text-[14px] text-zinc-500">No results for &ldquo;{q.trim()}&rdquo;.</p>
        ) : (
          <div className="mt-2 max-h-[320px] overflow-y-auto">
            {hits.map((h, i) => {
              const Icon = icons[h.kind];
              return (
                <button
                  key={`${h.kind}-${i}`}
                  onClick={() => { onClose(); router.push(h.href); }}
                  className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-left hover:bg-white/[0.06]"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded bg-white/[0.06] text-sky-400"><Icon className="size-4" /></span>
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-medium text-zinc-100">{h.title}</span>
                    {(h.sub || h.kind) && <span className="block truncate text-[12px] text-zinc-500">{h.sub ? `${h.sub} · ` : ""}{h.kind}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export function AdminTopbar({ dark, onDark, crumb = "Dashboard", trail }: { dark: boolean; onDark: () => void; crumb?: string; trail?: { label: string; href?: string }[] }) {
  const [palette, setPalette] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={cn("sticky top-0 z-30 backdrop-blur border-b", dark ? "bg-[#0a0a0a]/95 border-white/[0.06]" : "bg-white/95")}>
      <div className="flex items-center gap-2 px-4 py-2.5">
        <button className={cn("p-2 rounded", dark ? "hover:bg-white/[0.06] text-zinc-300" : "hover:bg-slate-100")} aria-label="collapse"><PanelLeft className="size-5" /></button>
        {trail ? (
          <span className="flex min-w-0 items-center gap-2 text-[14px]">
            {trail.map((t, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-slate-400">›</span>}
                {t.href && i < trail.length - 1 ? (
                  <Link href={t.href} className="text-slate-500 hover:text-sky-600">{t.label}</Link>
                ) : (
                  <span className={cn(i === trail.length - 1 ? "font-semibold truncate" : "text-slate-500", i === trail.length - 1 && (dark ? "text-zinc-100" : "text-slate-900"))}>{t.label}</span>
                )}
              </span>
            ))}
          </span>
        ) : (
          <>
            <span className="text-[14px] text-slate-500">Admin</span>
            <span className="text-slate-400">›</span>
            <span className={cn("text-[14px] font-semibold", dark ? "text-zinc-100" : "text-slate-900")}>{crumb}</span>
          </>
        )}
        <div className="ml-auto flex items-center gap-2 flex-wrap justify-end">
          <button onClick={() => setPalette(true)} className={cn("hidden md:flex items-center gap-2 rounded border px-3 py-2 text-sm", dark ? "border-white/10 bg-[#17181c] text-zinc-200" : "")}>
            <Search className="size-4" /> Search
            <kbd className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-500">⌘K</kbd>
          </button>
          <button className="flex items-center gap-1.5 rounded bg-[#1d8fc2] px-3.5 py-2 text-sm font-semibold text-white">
            <Plus className="size-4" /> Add
          </button>
          <Link href="/" className={cn("hidden sm:flex items-center gap-1.5 rounded border px-3 py-2 text-sm font-medium", dark ? "border-white/10 bg-[#17181c] text-zinc-200" : "")}>
            <House className="size-4" /> Home
          </Link>
          <button onClick={onDark} className={cn("hidden sm:flex items-center gap-1.5 rounded border px-3 py-2 text-sm font-medium", dark ? "border-white/10 bg-[#17181c] text-zinc-200" : "")}>
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />} {dark ? "Light Mode" : "Dark Mode"}
          </button>
          <button className={cn("rounded border p-2", dark ? "border-white/10 bg-[#17181c] text-zinc-200" : "")} aria-label="saved"><Bookmark className="size-4" /></button>
          <button className={cn("relative rounded border p-2", dark ? "border-white/10 bg-[#17181c] text-zinc-200" : "")} aria-label="alerts">
            <Bell className="size-4" />
            <span className="absolute -top-1.5 -right-1.5 grid size-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">8</span>
          </button>
          <button className="hidden md:flex items-center gap-1.5 rounded bg-amber-400 px-3 py-2 text-sm font-semibold text-slate-900">
            <LifeBuoy className="size-4" /> Support
          </button>
          <button className="relative flex items-center gap-1.5 rounded bg-[#1d8fc2] px-3 py-2 text-sm font-semibold text-white">
            <MessageCircle className="size-4" /> Live Chat
            <span className="absolute -top-1.5 -right-1.5 grid size-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">1</span>
          </button>
        </div>
      </div>
      <SearchPalette open={palette} onClose={() => setPalette(false)} />
    </div>
  );
}
