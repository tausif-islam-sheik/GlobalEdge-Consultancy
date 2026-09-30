"use client";
import Link from "next/link";
import { Search, Bookmark, Scale, ChevronDown, GraduationCap, Globe2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, dashboardFor } from "@/lib/auth";

const links = [
  { label: "COUNTRIES", href: "/countries", drop: true },
  { label: "INSTITUTIONS", href: "/institutions", drop: true },
  { label: "EXAMS", href: "/exams", drop: true },
  { label: "PROGRAMS", href: "/programs" },
  { label: "REVIEWS", href: "/reviews" },
  { label: "NEWS", href: "/news" },
  { label: "ANNOUNCEMENTS", href: "/announcements" },
  { label: "BLOGS", href: "/blogs" },
  { label: "SERVICES", href: "/services" },
];

export function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-[0_1px_8px_rgba(0,0,0,.05)]">
      <div className="container flex items-center gap-6 py-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-navy-900 to-brand-500 text-white">
            <Globe2 className="size-5" />
          </span>
          <span className="leading-none">
            <span className="flex items-center gap-1 font-extrabold tracking-tight text-navy-900 text-lg">
              <GraduationCap className="size-5 text-brand-500" /> GLOBALEDGE
            </span>
            <span className="text-[13px] font-bold tracking-[.2em] text-brand-500">CONSULTANCY</span>
          </span>
        </Link>
        <nav className="hidden xl:flex items-center gap-5 text-[13px] font-medium text-slate-700">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="flex items-center gap-1 hover:text-brand-600">
              {l.label} {l.drop && <ChevronDown className="size-3.5" />}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <button aria-label="search" className="p-2 text-slate-500 hover:text-brand-600"><Search className="size-5" /></button>
          <Link aria-label="wishlist" href="/wishlist" className="p-2 text-slate-500 hover:text-brand-600"><Bookmark className="size-5" /></Link>
          <Link aria-label="compare" href="/compare" className="p-2 text-slate-500 hover:text-brand-600"><Scale className="size-5" /></Link>
          {user ? (
            <>
              <span className="hidden md:block max-w-[160px] truncate text-xs font-medium text-slate-500">{user.email}</span>
              <Link href={dashboardFor(user.role)}><Button variant="outline" size="sm" className="h-10 px-5 rounded font-semibold">Dashboard</Button></Link>
              <Button size="sm" onClick={logout} className="h-10 px-5 rounded font-semibold bg-navy-900 hover:bg-navy-800"><LogOut /> Logout</Button>
            </>
          ) : (
            <>
              <Link href="/auth/register"><Button variant="outline" size="sm" className="h-10 px-5 rounded font-semibold">Register</Button></Link>
              <Link href="/auth/login"><Button size="sm" className="h-10 px-7 rounded font-semibold">Login</Button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
