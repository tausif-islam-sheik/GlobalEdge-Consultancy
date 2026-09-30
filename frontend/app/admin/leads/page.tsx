"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PageCard, SearchInput, Select, Stat, Pill } from "@/components/admin/admin-ui";
import { leads } from "@/components/admin/admin-lists";

const TABS = ["All", "Pending", "Converted", "Lost"] as const;

export default function LeadsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Pending");
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-bold">Leads</h1>
          <p className="text-[13.5px] text-slate-500">Website inquiries and offline leads from calls, walk-ins, and events.</p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={cn("rounded border bg-white px-3 py-2 font-medium", tab === t && "bg-sky-600 text-white border-sky-600")}>{t}</button>
          ))}
          <button className="rounded border bg-white px-3 py-2 font-medium">Get Lead Link</button>
          <button className="rounded bg-sky-600 px-3 py-2 font-semibold text-white">Add Lead</button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="TOTAL LEADS" value={19} tone="blue" />
        <Stat label="NEW" value={16} tone="blue" />
        <Stat label="QUALIFIED" value={0} tone="amber" />
        <Stat label="CONVERTED" value={3} tone="green" />
      </div>
      <div className="grid gap-2 md:grid-cols-[1fr_160px_160px_170px_170px]">
        <SearchInput placeholder="Search by name, email, phone..." />
        <Select><option>New</option><option>All</option></Select>
        <Select><option>All sources</option></Select>
        <Select><option>All categories</option></Select>
        <Select><option>All counsellors</option></Select>
      </div>
      <PageCard className="overflow-x-auto">
        <table className="w-full min-w-[1020px] text-[13.5px]">
          <thead>
            <tr className="border-b text-left text-[12px] text-slate-500">
              <th className="px-4 py-3"><input type="checkbox" /></th>
              <th className="px-2 py-3 font-medium">LEAD</th>
              <th className="px-2 py-3 font-medium">INTEREST</th>
              <th className="px-2 py-3 font-medium">CATEGORY</th>
              <th className="px-2 py-3 font-medium">ASSIGNED</th>
              <th className="px-2 py-3 font-medium">FOLLOW-UP</th>
              <th className="px-2 py-3 font-medium">SUBMITTED</th>
              <th className="px-2 py-3 font-medium">STATUS</th>
              <th className="px-2 py-3 text-right font-medium">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {leads.map((l) => (
              <tr key={l.email}>
                <td className="px-4 py-4"><input type="checkbox" /></td>
                <td className="px-2 py-4"><div className="font-bold">{l.name}</div><div className="text-slate-500">{l.email}</div><div className="text-slate-500">{l.phone}</div><div className="text-slate-500">🇧🇩 {l.country}</div></td>
                <td className="px-2 py-4"><div className="font-semibold">{l.interest}</div><div className="text-slate-500">{l.inst}</div></td>
                <td className="px-2 py-4 text-slate-400">—</td>
                <td className="px-2 py-4"><div className="font-semibold">{l.assigned}</div><div className="text-slate-500">Managing Director</div></td>
                <td className="px-2 py-4 text-slate-400">—</td>
                <td className="px-2 py-4 text-slate-500">{l.submitted}</td>
                <td className="px-2 py-4"><Pill tone="blue">{l.status}</Pill><div className="mt-1"><Pill tone="gray">{l.link}</Pill></div></td>
                <td className="px-2 py-4">
                  <div className="flex flex-col items-end gap-1.5">
                    <Select className="w-[150px]"><option>Change status</option></Select>
                    <button className="rounded border px-3 py-1.5 text-[12.5px] font-medium">Add to Visitor</button>
                    <button className="rounded border px-3 py-1.5 text-[12.5px] font-medium text-sky-600">✓ Convert</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageCard>
    </div>
  );
}
