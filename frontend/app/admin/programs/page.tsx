"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, Building2, Layers, Globe2 } from "lucide-react";
import { PageCard, SearchInput, Select, Stat } from "@/components/admin/admin-ui";
import { programs as fallbackPrograms, institutions as fallbackInstitutions } from "@/components/admin/admin-lists";
import { getAdminInstitutions, getAdminPrograms, useLive } from "@/lib/api";
import { cn } from "@/lib/utils";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ProgramsPage() {
  const router = useRouter();
  const goDetails = (title: string) => router.push(`/admin/programs/${slugify(title)}`);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const programs = useLive(getAdminPrograms, fallbackPrograms);
  const institutions = useLive(getAdminInstitutions, fallbackInstitutions);
  const filtered = institutions.filter((i) =>
    `${i.name} ${i.country}`.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold">Programs</h1>
        <button onClick={() => setPickerOpen(true)} className="rounded bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white">+ Add Program</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="TOTAL PROGRAMS" value={1609} tone="blue" icon={<BookOpen className="size-5" />} />
        <Stat label="INSTITUTIONS" value={39} tone="blue" icon={<Building2 className="size-5" />} />
        <Stat label="LEVELS" value={8} tone="amber" icon={<Layers className="size-5" />} />
        <Stat label="COUNTRIES" value={8} tone="green" icon={<Globe2 className="size-5" />} />
      </div>
      <div className="flex flex-wrap gap-2">
        <SearchInput placeholder="Search programs, institutions..." className="min-w-[240px] flex-1" />
        <Select className="w-[160px]"><option>All Countries</option></Select>
        <Select className="w-[170px]"><option>All Institutions</option></Select>
        <Select className="w-[140px]"><option>All Levels</option></Select>
        <button className="rounded border bg-white px-3 py-2 text-sm">Reset</button>
        <button className="rounded border bg-white px-3 py-2 text-sm font-semibold">🇧🇩 BDT</button>
      </div>
      <PageCard className="overflow-x-auto">
        <table className="w-full min-w-[1020px] text-[13.5px]">
          <thead>
            <tr className="border-b text-left">
              <th className="px-4 py-3"><input type="checkbox" /></th>
              <th className="px-2 py-3 font-semibold">Program</th>
              <th className="px-2 py-3 font-semibold">Institution</th>
              <th className="px-2 py-3 font-semibold">Location</th>
              <th className="px-2 py-3 font-semibold">Commission</th>
              <th className="px-2 py-3 font-semibold">Fees</th>
              <th className="px-2 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {programs.map((p) => (
              <tr
                key={p.title}
                onClick={() => goDetails(p.title)}
                onKeyDown={(e) => { if (e.key === "Enter") goDetails(p.title); }}
                tabIndex={0}
                className="cursor-pointer hover:bg-slate-50/60 focus:bg-sky-50/50 focus:outline-none"
                title={`View ${p.title} details`}
              >
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="cursor-pointer" onClick={(e) => e.stopPropagation()} /></td>
                <td className="px-2 py-4"><div className="font-bold hover:text-sky-700 hover:underline">{p.title}</div><div className="text-slate-500">{p.level}</div><div className="text-slate-500">{p.field}</div><div className="text-slate-500">{p.years} • Processing: {p.proc}</div></td>
                <td className="px-2 py-4"><div className="font-semibold">{p.inst}</div><div className="text-slate-500">• Main campus</div></td>
                <td className="px-2 py-4"><div className="font-semibold">🇲🇾 {p.loc}</div></td>
                <td className="px-2 py-4 text-slate-500">Not set</td>
                <td className="px-2 py-4"><div className="font-bold">{p.fee}</div><div className="text-slate-500">{p.orig}</div></td>
                <td className="px-2 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-col gap-1.5">
                    <button className="whitespace-nowrap rounded border bg-white px-3 py-1.5 text-[12.5px] font-medium hover:bg-slate-50">Commission rules</button>
                    <button className="whitespace-nowrap rounded border bg-white px-3 py-1.5 text-[12.5px] font-medium hover:bg-slate-50">Edit fees</button>
                    <button className="whitespace-nowrap rounded border bg-white px-3 py-1.5 text-[12.5px] font-medium hover:bg-slate-50">Duplicate</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageCard>
      {pickerOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/30 p-4" onClick={() => setPickerOpen(false)}>
          <div className="w-full max-w-[560px] rounded border bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-[18px] font-bold text-slate-900">Add Program</h2>
                <p className="mt-0.5 text-[15px] text-slate-500">Select an institution to create a new program for.</p>
              </div>
              <button onClick={() => setPickerOpen(false)} aria-label="close" className="rounded p-1.5 hover:bg-slate-100"><X className="size-5" /></button>
            </div>
            <div className="mt-4 rounded border p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search institutions..."
                  className="w-full rounded bg-slate-100 py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:bg-white focus:ring-1 focus:ring-sky-400"
                />
              </div>
              <div className="mt-2 max-h-[320px] divide-y overflow-y-auto">
                {filtered.map((i) => (
                  <button
                    key={i.name}
                    onClick={() => setPicked(i.name)}
                    className={cn("flex w-full items-center gap-3 px-2 py-2.5 text-left hover:bg-slate-50", picked === i.name && "bg-sky-50/60")}
                  >
                    <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded bg-slate-50 text-[8px] font-black">
                      {i.name.includes("Krirk") ? "KRIRK" : i.name.includes("Lincoln") ? "🏫" : i.name.includes("Britts") ? "🎓" : i.name.includes("Regent") ? "RGNT" : i.name.includes("Montfort") ? "DMU" : "GBS"}
                    </span>
                    <span>
                      <span className="block text-[15px] font-medium text-slate-900">{i.name}</span>
                      <span className="block text-[13.5px] text-slate-500">
                        {i.name === "Krirk University" ? "Bangkok, Thailand" : i.name === "Lincoln University College" ? "Kelantan, Malaysia" : "United Arab Emirates"}
                      </span>
                    </span>
                  </button>
                ))}
                {filtered.length === 0 && <p className="px-2 py-8 text-center text-sm text-slate-500">No institutions found.</p>}
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setPickerOpen(false)} className="rounded border bg-white px-4 py-2 text-sm font-semibold">Cancel</button>
              <button
                disabled={!picked}
                onClick={() => { setPickerOpen(false); router.push(`/admin/programs/new?institution=${encodeURIComponent(picked ?? "")}`); }}
                className={cn("rounded px-4 py-2 text-sm font-semibold text-white", picked ? "bg-[#1d8fc2] hover:bg-sky-700" : "cursor-not-allowed bg-sky-300/70")}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
