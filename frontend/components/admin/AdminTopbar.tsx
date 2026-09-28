"use client";
import Link from "next/link";
import { Search, Plus, House, Moon, Sun, Bookmark, Bell, LifeBuoy, MessageCircle, PanelLeft } from "lucide-react";

export function AdminTopbar({ dark, onDark, crumb = "Dashboard" }: { dark: boolean; onDark: () => void; crumb?: string }) {
  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b">
      <div className="flex items-center gap-2 px-4 py-2.5">
        <button className="p-2 rounded-lg hover:bg-slate-100" aria-label="collapse"><PanelLeft className="size-5" /></button>
        <span className="text-[14px] text-slate-500">Admin</span>
        <span className="text-slate-400">›</span>
        <span className="text-[14px] font-semibold text-slate-900">{crumb}</span>
        <div className="ml-auto flex items-center gap-2 flex-wrap justify-end">
          <button className="hidden md:flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
            <Search className="size-4" /> Search
            <kbd className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-500">⌘K</kbd>
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-[#1d8fc2] px-3.5 py-2 text-sm font-semibold text-white">
            <Plus className="size-4" /> Add
          </button>
          <Link href="/" className="hidden sm:flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium">
            <House className="size-4" /> Home
          </Link>
          <button onClick={onDark} className="hidden sm:flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium">
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />} {dark ? "Light Mode" : "Dark Mode"}
          </button>
          <button className="rounded-lg border p-2" aria-label="saved"><Bookmark className="size-4" /></button>
          <button className="relative rounded-lg border p-2" aria-label="alerts">
            <Bell className="size-4" />
            <span className="absolute -top-1.5 -right-1.5 grid size-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">8</span>
          </button>
          <button className="hidden md:flex items-center gap-1.5 rounded-lg bg-amber-400 px-3 py-2 text-sm font-semibold text-slate-900">
            <LifeBuoy className="size-4" /> Support
          </button>
          <button className="relative flex items-center gap-1.5 rounded-lg bg-[#1d8fc2] px-3 py-2 text-sm font-semibold text-white">
            <MessageCircle className="size-4" /> Live Chat
            <span className="absolute -top-1.5 -right-1.5 grid size-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">1</span>
          </button>
        </div>
      </div>
    </div>
  );
}
