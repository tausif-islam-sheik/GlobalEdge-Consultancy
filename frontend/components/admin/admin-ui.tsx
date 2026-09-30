import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function PageCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded border border-slate-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,.05)] dark:border-white/[0.07] dark:bg-[#121214] dark:shadow-none", className)}>{children}</div>;
}

export function Stat({ label, value, tone = "blue", link, icon }: { label: string; value: string | number; tone?: "blue" | "green" | "amber" | "red"; link?: string; icon?: React.ReactNode }) {
  const cardTones: Record<string, string> = {
    blue: "bg-[#eaf5fb] border-[#cde8f5] dark:bg-[rgba(56,189,248,0.09)] dark:border-[rgba(56,189,248,0.3)]",
    green: "bg-[#eaf5ec] border-[#cde6d2] dark:bg-[rgba(34,197,94,0.1)] dark:border-[rgba(34,197,94,0.28)]",
    amber: "bg-[#fdf3d7] border-[#f3e0a8] dark:bg-[rgba(245,158,11,0.13)] dark:border-[rgba(245,158,11,0.32)]",
    red: "bg-[#fdecec] border-[#f5cdcd] dark:bg-[rgba(248,113,113,0.09)] dark:border-[rgba(248,113,113,0.28)]",
  };
  const textTones: Record<string, string> = {
    blue: "text-[#1d8fc2] dark:text-sky-400",
    green: "text-green-700 dark:text-green-400",
    amber: "text-amber-700 dark:text-amber-400",
    red: "text-red-500 dark:text-red-400",
  };
  const iconTones: Record<string, string> = {
    blue: "bg-sky-100 text-sky-600 dark:bg-sky-400/[0.14] dark:text-sky-400",
    green: "bg-green-100 text-green-700 dark:bg-green-400/[0.14] dark:text-green-400",
    amber: "bg-amber-200/70 text-amber-800 dark:bg-amber-400/[0.14] dark:text-amber-400",
    red: "bg-red-100 text-red-500 dark:bg-red-400/[0.14] dark:text-red-400",
  };
  return (
    <PageCard className={cn("p-5", cardTones[tone])}>
      <div className="flex items-start justify-between gap-3">
        <div className="text-[12px] font-medium tracking-wide text-slate-500 dark:text-zinc-500">{label}</div>
        {icon && <span className={cn("grid size-10 shrink-0 place-items-center rounded", iconTones[tone])}>{icon}</span>}
      </div>
      <div className={cn("mt-1 text-[32px] leading-none font-extrabold", textTones[tone])}>{value}</div>
      {link && <Link href={link} className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-sky-600">View <ArrowRight className="size-3.5" /></Link>}
    </PageCard>
  );
}

export function SearchInput({ placeholder, className }: { placeholder: string; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
      <input placeholder={placeholder} className="w-full rounded border border-slate-200 bg-white pl-9 pr-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400 dark:border-white/10 dark:bg-[#17181c] dark:text-zinc-100 dark:placeholder:text-zinc-600" />
    </div>
  );
}

export function Select({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <select className="w-full appearance-none rounded border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400 dark:border-white/10 dark:bg-[#17181c] dark:text-zinc-200">
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
    </div>
  );
}

export function Pill({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "green" | "amber" | "gray" | "red" }) {
  const map: Record<string, string> = {
    blue: "bg-sky-50 text-sky-700",
    green: "bg-green-50 text-green-700 border border-green-200",
    amber: "bg-amber-50 text-amber-700 border border-amber-200",
    gray: "bg-slate-100 text-slate-600",
    red: "bg-red-50 text-red-600",
  };
  return <span className={cn("inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[12px] font-medium", map[tone])}>{children}</span>;
}

export function Field({ label, required, children, className }: { label: string; required?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-[13.5px] font-semibold text-slate-800">{label} {required && <span className="text-red-500">*</span>}</span>
      {children}
    </label>
  );
}

export const inputCls = "w-full rounded border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400 placeholder:text-slate-400 dark:border-white/10 dark:bg-[#17181c] dark:text-zinc-100 dark:placeholder:text-zinc-600";
