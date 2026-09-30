"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PageCard, SearchInput, Select, Stat, Pill } from "@/components/admin/admin-ui";
import { visitors } from "@/components/admin/admin-lists";
import { Pencil, Trash2 } from "lucide-react";

export default function VisitorsPage() {
  const [tab, setTab] = useState("Pending");
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[24px] font-bold">Visitors</h1>
        <div className="flex flex-wrap gap-2 text-sm">
          {["All", "Pending", "Completed"].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={cn("rounded border bg-white px-3 py-2 font-medium", tab === t && "bg-sky-600 text-white border-sky-600")}>{t}</button>
          ))}
          <button className="rounded border bg-white px-3 py-2 font-medium">Get Visit Link</button>
          <button className="rounded bg-sky-600 px-3 py-2 font-semibold text-white">Log Visit</button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="WAITING NOW" value={1} tone="amber" />
        <Stat label="SCHEDULED TODAY" value={1} tone="blue" />
        <Stat label="COMPLETED TODAY" value={0} tone="green" />
        <Stat label="NO-SHOWS" value={0} tone="red" />
      </div>
      <div className="flex flex-wrap gap-2">
        <SearchInput placeholder="Search name, email, or phone" className="min-w-[240px] flex-1" />
        <Select className="w-[180px]"><option>All types</option></Select>
        <Select className="w-[180px]"><option></option></Select>
        <Select className="w-[200px]"><option>All counsellors</option></Select>
      </div>
      <PageCard className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-[13.5px]">
          <thead>
            <tr className="border-b text-left">
              <th className="px-4 py-3"><input type="checkbox" /></th>
              <th className="px-2 py-3 font-semibold">Visitor</th>
              <th className="px-2 py-3 font-semibold">Scheduled</th>
              <th className="px-2 py-3 font-semibold">Purpose</th>
              <th className="px-2 py-3 font-semibold">Notes</th>
              <th className="px-2 py-3 font-semibold">Counsellor</th>
              <th className="px-2 py-3 font-semibold">Status</th>
              <th className="px-2 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {visitors.map((v) => (
              <tr key={v.email}>
                <td className="px-4 py-4"><input type="checkbox" /></td>
                <td className="px-2 py-4">
                  <div className="flex gap-2.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-100 text-[11px] font-bold">{v.initials}</span>
                    <span><span className="block font-bold">{v.name}</span><span className="block text-slate-500">{v.phone}</span><span className="block text-slate-500">{v.email}</span></span>
                  </div>
                </td>
                <td className="px-2 py-4 text-slate-500">{v.when}</td>
                <td className="px-2 py-4 max-w-[260px]">{v.purpose}</td>
                <td className="px-2 py-4 text-slate-400">—</td>
                <td className="px-2 py-4"><div className="font-semibold">{v.counsellor}</div><div className="text-slate-500">Managing Director</div></td>
                <td className="px-2 py-4"><div className="space-y-1"><Pill tone="gray">Scheduled</Pill><div><Pill tone="gray">Appointment</Pill></div></div></td>
                <td className="px-2 py-4"><div className="flex gap-1.5"><button className="flex items-center gap-1 rounded border px-3 py-1.5 text-[12.5px] font-medium"><Pencil className="size-3.5" /> Edit</button><button className="rounded border px-2.5 py-1.5 text-red-500"><Trash2 className="size-3.5" /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageCard>
    </div>
  );
}
