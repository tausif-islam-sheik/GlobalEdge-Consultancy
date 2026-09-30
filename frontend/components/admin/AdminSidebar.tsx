"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutGrid, FilePlus2, Search, GraduationCap, BookOpen, Users, Eye,
  MessagesSquare, ChevronDown, ChevronRight, MonitorPlay, Briefcase,
  ClipboardList, Megaphone, Newspaper, PenLine, Star, Settings, ChevronsUpDown,
  UserRound, KeyRound, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

type Item = {
  label: string; href: string; icon: any; badge?: number | string;
  children?: { label: string; href: string }[];
};

const NAV: Item[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutGrid },
  { label: "Apply", href: "/admin/apply", icon: FilePlus2 },
  { label: "Search", href: "/admin/search", icon: Search },
  { label: "Institution", href: "/admin/institutions", icon: GraduationCap, badge: 39 },
  {
    label: "Program", href: "/admin/programs", icon: BookOpen, badge: 1609,
    children: [
      { label: "All Programs", href: "/admin/programs" },
      { label: "Application Fee Waivers", href: "/admin/programs/waivers" },
      { label: "Faculties", href: "/admin/programs/faculties" },
      { label: "Study Levels", href: "/admin/programs/levels" },
      { label: "Durations", href: "/admin/programs/durations" },
    ],
  },
  { label: "Leads", href: "/admin/leads", icon: Users, badge: 19 },
  { label: "Visitors", href: "/admin/visitors", icon: Eye, badge: 12 },
  { label: "Followups", href: "/admin/followups", icon: MessagesSquare, badge: 4 },
  {
    label: "Students", href: "/admin/students", icon: GraduationCap, badge: 57,
    children: [
      { label: "All Students", href: "/admin/students" },
      { label: "Add New Student", href: "/admin/students/new" },
      { label: "Pending Students", href: "/admin/students/pending" },
      { label: "Verified Students", href: "/admin/students/verified" },
      { label: "Success Students", href: "/admin/students/success" },
    ],
  },
  {
    label: "Applications", href: "/admin/applications", icon: ClipboardList, badge: 43,
    children: [
      { label: "All Applications", href: "/admin/applications" },
      { label: "Under Review", href: "/admin/applications?tab=review" },
      { label: "Accepted Applications", href: "/admin/applications?tab=accepted" },
      { label: "Rejected Applications", href: "/admin/applications?tab=rejected" },
      { label: "Deferral Request", href: "/admin/applications?tab=deferral" },
      { label: "Refund Request", href: "/admin/applications?tab=refund" },
      { label: "Application Checklist Templates", href: "/admin/applications?tab=checklist" },
      { label: "Visa Checklist Templates", href: "/admin/applications?tab=visa" },
    ],
  },
  { label: "Live Classes", href: "/admin/live-classes", icon: MonitorPlay, badge: 1 },
  {
    label: "Agents", href: "/admin/agents", icon: Briefcase, badge: 8,
    children: [
      { label: "All Agents", href: "/admin/agents" },
      { label: "Agreement", href: "/admin/agents?tab=agreement" },
    ],
  },
  {
    label: "Commission Inv...", href: "/admin/commissions", icon: ClipboardList, badge: 1,
    children: [
      { label: "Commission Invoice", href: "/admin/commissions" },
      { label: "Agent Commission", href: "/admin/commissions?tab=agent" },
    ],
  },
  { label: "Announcement", href: "/admin/announcements", icon: Megaphone, badge: 13 },
  { label: "News", href: "/admin/news", icon: Newspaper, badge: 5 },
  { label: "Blogs", href: "/admin/blogs", icon: PenLine, badge: 5 },
  { label: "Reviews", href: "/admin/reviews", icon: Star, badge: 75 },
  {
    label: "Staff", href: "/admin/staff", icon: Users,
    children: [
      { label: "Staff List", href: "/admin/staff" },
      { label: "Roles & Permissions", href: "/admin/staff?tab=roles" },
    ],
  },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function isActivePath(active: string, href: string) {
  if (href === "/admin") return active === "/admin";
  return active === href || active.startsWith(href + "/");
}

export function AdminSidebar({ active = "/admin", dark = false }: { active?: string; dark?: boolean }) {
  const [open, setOpen] = useState<string[]>(["Program", "Students", "Applications", "Agents", "Commission Inv...", "Staff"]);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();
  const toggle = (label: string) =>
    setOpen((p) => (p.includes(label) ? p.filter((x) => x !== label) : [...p, label]));

  useEffect(() => {
    if (!menu) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [menu ]);

  const displayName = user?.name ?? "Dr. Ekramul Haque";
  const displayEmail = user?.email ?? "admin@globaledge.com";

  return (
    <aside className={cn(
      "hidden lg:flex w-[280px] shrink-0 flex-col border-r min-h-screen sticky top-0 h-screen",
      dark ? "bg-[#0a0a0a] border-white/[0.06]" : "bg-white"
    )}>
      <div className="flex items-center gap-2 px-4 py-4">
        <span className={cn("grid size-10 place-items-center rounded border font-black", dark ? "bg-white/[0.06] border-white/10 text-sky-400" : "bg-white text-brand-600")}>🌐</span>
        <span className="leading-tight">
          <span className={cn("block font-bold text-[15px]", dark ? "text-zinc-100" : "text-slate-900")}>GlobalEdge Consultancy</span>
          <span className={cn("block text-[12px]", dark ? "text-zinc-500" : "text-slate-500")}>Admin Panel</span>
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5 text-[14.5px]">
        {NAV.map((item) => {
          const parentActive = isActivePath(active, item.href);
          const isOpen = open.includes(item.label) || parentActive;
          const Icon = item.icon;
          return (
            <div key={item.label}>
              <div
                className={cn(
                  "flex items-center gap-3 rounded px-3 py-2 cursor-pointer",
                  parentActive && !item.children
                    ? "bg-sky-50 text-sky-700 font-semibold dark:bg-[#1a2634] dark:text-sky-300"
                    : parentActive
                      ? "text-sky-700 font-semibold dark:text-sky-300"
                      : dark ? "text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-100" : "text-slate-800 hover:bg-slate-50"
                )}
              >
                <Icon className="size-[18px]" />
                <Link href={item.href} className="flex-1 truncate">{item.label}</Link>
                {item.badge != null && (
                  <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", dark ? "bg-white/[0.07] text-zinc-300" : "bg-sky-50 text-sky-700")}>{item.badge}</span>
                )}
                {item.children && (
                  <button aria-label="toggle" onClick={() => toggle(item.label)} className="p-1">
                    {open.includes(item.label) || parentActive ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                  </button>
                )}
              </div>
              {item.children && isOpen && (
                <div className={cn("ml-6 border-l pl-4 mt-1 mb-1 space-y-1", dark && "border-white/[0.07]")}>
                  {item.children.map((c) => {
                    const childActive = active === c.href;
                    return (
                      <Link
                        key={c.label}
                        href={c.href}
                        className={cn(
                          "block truncate rounded px-2 py-1.5 text-[14px]",
                          childActive
                            ? "bg-sky-50 text-sky-700 font-medium dark:bg-[#1a2634] dark:text-sky-200"
                            : dark ? "text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200" : "text-slate-700 hover:bg-slate-50 hover:text-sky-700"
                        )}
                      >
                        {c.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div ref={menuRef} className="relative border-t p-3">
        {menu && (
          <div className={cn(
            "absolute bottom-full left-2 right-2 mb-2 overflow-hidden rounded border shadow-xl",
            dark ? "border-white/10 bg-[#121214]" : "bg-white"
          )}>
            <div className="flex items-center gap-2.5 px-3.5 py-3">
              <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-slate-200 text-xs font-bold text-slate-600">👤</span>
              <span className="min-w-0 leading-tight">
                <span className={cn("block truncate text-[13.5px] font-semibold", dark ? "text-zinc-100" : "text-slate-800")}>{displayName}</span>
                <span className="block truncate text-[11.5px] text-slate-500">{displayEmail}</span>
              </span>
            </div>
            <div className={cn("border-t", dark ? "border-white/[0.07]" : "border-slate-100")}>
              <Link
                href="/admin/profile"
                onClick={() => setMenu(false)}
                className={cn("flex items-center gap-2.5 px-3.5 py-2.5 text-[13.5px]", dark ? "text-zinc-200 hover:bg-white/[0.06]" : "text-slate-800 hover:bg-slate-50")}
              >
                <UserRound className="size-4" /> Profile
              </Link>
              <Link
                href="/admin/change-password"
                onClick={() => setMenu(false)}
                className={cn("flex items-center gap-2.5 px-3.5 py-2.5 text-[13.5px]", dark ? "text-zinc-200 hover:bg-white/[0.06]" : "text-slate-800 hover:bg-slate-50")}
              >
                <KeyRound className="size-4" /> Change Password
              </Link>
            </div>
            <div className={cn("border-t", dark ? "border-white/[0.07]" : "border-slate-100")}>
              <button
                onClick={() => { setMenu(false); logout(); router.push("/auth/login"); }}
                className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-[13.5px] font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <LogOut className="size-4" /> Log out
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setMenu((m) => !m)}
          className={cn("flex w-full items-center gap-2 rounded p-1.5 text-left", menu && !dark && "bg-sky-50", menu && dark && "bg-white/[0.06]")}
        >
          <span className="grid size-9 place-items-center rounded-full bg-slate-900 text-white text-xs font-bold">DE</span>
          <span className="leading-tight min-w-0">
            <span className={cn("block truncate text-[13px] font-semibold", dark ? "text-sky-300" : "text-sky-700")}>{displayName}</span>
            <span className="block truncate text-[11px] text-slate-500">{displayEmail}</span>
          </span>
          <ChevronsUpDown className="ml-auto size-4 text-slate-500" />
        </button>
      </div>
    </aside>
  );
}
