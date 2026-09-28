import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function PageCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-xl border bg-white shadow-[0_1px_2px_rgba(0,0,0,.05)]", className)}>{children}</div>;
}

export function Stat({ label, value, tone = "blue", link }: { label: string; value: string | number; tone?: "blue" | "green" | "amber" | "red"; link?: string }) {
  const tones: Record<string, string> = {
    blue: "bg-[#eaf5fb] border-[#cde8f5] text-[#1d8fc2]",
    green: "bg-[#eaf5ec] border-[#cde6d2] text-green-700",
    amber: "bg-[#fdf3d7] border-[#f3e0a8] text-amber-700",
    red: "bg-[#fdecec] border-[#f5cdcd] text-red-500",
  };
  return (
    <PageCard className={cn("p-5", tones[tone].split(" ").slice(0, 2).join(" "))}>
      <div className="text-[12px] font-medium tracking-wide text-slate-500">{label}</div>
      <div className={cn("mt-1 text-[32px] leading-none font-extrabold", tones[tone].split(" ").slice(2).join(" "))}>{value}</div>
      {link && <Link href={link} className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-sky-600">View <ArrowRight className="size-3.5" /></Link>}
    </PageCard>
  );
}

export function SearchInput({ placeholder, className }: { placeholder: string; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
      <input placeholder={placeholder} className="w-full rounded-lg border bg-white pl-9 pr-3 py-2.5 text-sm outline-none focus:border-sky-400" />
    </div>
  );
}

export function Select({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <select className="w-full appearance-none rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-400">
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

export const inputCls = "w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-400 placeholder:text-slate-400";
