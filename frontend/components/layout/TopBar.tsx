"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

type Tab = { label: string; href: string; bold?: boolean };

const baseTabs: Tab[] = [
  { label: "For Students", href: "/" },
  { label: "For Institutions", href: "/dashboard/institution" },
  { label: "For Agents", href: "/dashboard/agent" },
];

const adminTab: Tab = { label: "Admin Panel", href: "/admin", bold: true };

export function TopBar() {
  const path = usePathname();
  const { user } = useAuth();
  // Admin Panel tab is only visible to logged-in admins
  const tabs = user?.role === "ADMIN" ? [...baseTabs, adminTab] : baseTabs;
  return (
    <div className="bg-navy-900 text-white text-[13px]">
      <div className="container flex items-center gap-1 overflow-x-auto no-scrollbar">
        {tabs.map((t, i) => (
          <Link
            key={t.label}
            href={t.href}
            className={cn(
              "px-5 py-2.5 whitespace-nowrap transition-colors",
              i === 0 || path === t.href ? "bg-brand-500 font-medium" : "hover:bg-white/10",
              t.bold && i !== 0 && "font-semibold"
            )}
          >
            {t.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
