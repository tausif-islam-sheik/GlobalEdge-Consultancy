"use client";
import { useState } from "react";
import { Heart, Scale } from "lucide-react";
import { PageCard, Select } from "@/components/admin/admin-ui";
import { programs } from "@/components/admin/admin-lists";

const IMGS = ["bg-gradient-to-br from-sky-200 to-amber-100", "bg-gradient-to-br from-slate-700 to-amber-100"];

export default function SearchPage() {
  const [mode, setMode] = useState<"Programs" | "Institutions">("Programs");
  return (
    <div className="flex gap-4 p-4">
      <PageCard className="hidden w-[300px] shrink-0 self-start p-4 md:block">
        <h3 className="font-bold">Filter programs</h3>
        <div className="mt-3 grid grid-cols-2 rounded bg-sky-200/70 p-1 text-sm font-medium">
          {(["Programs", "Institutions"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} className={mode === m ? "rounded bg-white px-3 py-2 text-sky-600 shadow" : "px-3 py-2"}>{m}</button>
          ))}
        </div>
        <input placeholder="Search program, institution, fi" className="mt-3 w-full rounded border px-3 py-2.5 text-sm outline-none focus:border-sky-400" />
        <div className="mt-4 space-y-3 border-t pt-4 text-sm">
          {[["Destination", "All countries"], ["Institution", "All institutions"], ["Study level", "All levels"], ["Field of study", "All fields"], ["Course duration", "Any duration"]].map(([l, p]) => (
            <div key={l}>
              <div className="mb-1 font-semibold">{l}</div>
              <Select><option>{p}</option></Select>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2">
            <div><div className="mb-1 font-semibold">Open intake</div><Select><option>Any</option></Select></div>
            <div><div className="mb-1 font-semibold">Study mode</div><Select><option>Any</option></Select></div>
          </div>
        </div>
      </PageCard>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold">We found <span className="text-sky-600">1603</span> programs for you.</h2>
          <div className="flex gap-2">
            <Select className="w-[200px]"><option>Alphabetically (A–Z)</option></Select>
            <Select className="w-[120px]"><option>🇧🇩 BDT</option></Select>
          </div>
        </div>
        <div className="mt-3 space-y-4">
          {programs.map((p, i) => (
            <PageCard key={p.title} className="overflow-hidden">
              <div className="grid sm:grid-cols-[240px_1fr]">
                <div className={`relative min-h-[180px] ${IMGS[i % 2]}`}>
                  <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-medium shadow"><Scale className="size-3.5" /> Compare</span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5 text-[11.5px]">
                      <span className="rounded-full border px-2.5 py-1">{p.level}</span>
                      <span className="rounded-full border px-2.5 py-1">On-campus</span>
                      {i === 0 && <span className="rounded-full bg-amber-500 px-2.5 py-1 font-semibold text-white">★ Featured</span>}
                    </div>
                    <button className="rounded border p-2"><Heart className={`size-4 ${i === 1 ? "fill-red-500 text-red-500" : ""}`} /></button>
                  </div>
                  <h3 className="mt-2 font-bold leading-snug">{p.title}</h3>
                  <p className="text-[13px] text-slate-500">🏛 {p.inst} · {p.loc}</p>
                  <div className="mt-3 grid grid-cols-3 gap-2 border-t pt-3 text-[13px]">
                    <div><div className="text-slate-500">Duration</div><div className="font-bold">{p.years}</div></div>
                    <div><div className="text-slate-500">Processing time</div><div className="font-bold">{p.proc}</div></div>
                    <div><div className="text-slate-500">Next intake</div><div className="font-bold">January 2028</div></div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-end justify-between gap-2 border-t pt-3 text-[13px]">
                    <div><div className="text-slate-500">Application fee</div><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[12px]">Contact CCApply</span></div>
                    <div><div className="text-slate-500">Tuition fee (per year)</div><div className="font-bold">{p.fee}</div></div>
                    <div><div className="text-slate-500">Total cost (estimated)</div><div className="font-bold">{p.fee}</div></div>
                    <button className="rounded bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white">Manage program</button>
                  </div>
                </div>
              </div>
            </PageCard>
          ))}
        </div>
      </div>
    </div>
  );
}
