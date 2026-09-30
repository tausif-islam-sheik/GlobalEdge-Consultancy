"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PageCard, SearchInput, Select, Stat, Pill } from "@/components/admin/admin-ui";
import { followups } from "@/components/admin/admin-lists";

export default function FollowupsPage() {
  const [tab, setTab] = useState("Pending");
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[24px] font-bold">Followup List</h1>
        <div className="flex flex-wrap gap-2 text-sm">
          {["All", "Pending", "Completed List", "Cancelled"].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={cn("rounded border bg-white px-3 py-2 font-medium", tab === t && "bg-sky-600 text-white border-sky-600")}>{t}</button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="TOTAL FOLLOWUPS" value={4} tone="blue" />
        <Stat label="PENDING" value={2} tone="amber" />
        <Stat label="COMPLETED" value={2} tone="green" />
        <Stat label="HIGH PRIORITY" value={0} tone="red" />
      </div>
      <div className="grid gap-2 md:grid-cols-[1fr_150px_150px_130px_150px_130px]">
        <SearchInput placeholder="Search student, email, or staff" />
        <Select><option>All modes</option></Select>
        <Select><option>All priorities</option></Select>
        <Select><option>Pending</option></Select>
        <Select><option>Date</option></Select>
        <Select><option>All staff</option></Select>
      </div>
      <PageCard className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-[13.5px]">
          <thead>
            <tr className="border-b text-left">
              <th className="px-4 py-3"><input type="checkbox" /></th>
              <th className="px-2 py-3 font-semibold">ID</th>
              <th className="px-2 py-3 font-semibold">Student</th>
              <th className="px-2 py-3 font-semibold">Followup By</th>
              <th className="px-2 py-3 font-semibold">Mode</th>
              <th className="px-2 py-3 font-semibold">Priority</th>
              <th className="px-2 py-3 font-semibold">Remarks</th>
              <th className="px-2 py-3 font-semibold">Status</th>
              <th className="px-2 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {followups.map((f) => (
              <tr key={f.id}>
                <td className="px-4 py-4"><input type="checkbox" /></td>
                <td className="px-2 py-4">{f.id}</td>
                <td className="px-2 py-4"><div className="font-bold">{f.student}</div><div className="text-slate-500">{f.meta}</div><div className="text-slate-500">{f.email}</div></td>
                <td className="px-2 py-4"><div className="font-semibold">{f.by}</div><div className="text-slate-500">Managing Director</div></td>
                <td className="px-2 py-4">{f.mode}</td>
                <td className="px-2 py-4"><Pill tone="gray">{f.priority}</Pill></td>
                <td className="px-2 py-4 text-slate-400">-</td>
                <td className="px-2 py-4"><Pill tone="amber">{f.status}</Pill></td>
                <td className="px-2 py-4"><button className="whitespace-nowrap rounded border px-3 py-1.5 text-[12.5px] font-medium">Add to Visitor</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageCard>
      <div className="flex items-center justify-between text-[13px] text-slate-500">
        <span>SHOWING 10 · 0 of 2 row(s) selected.</span>
        <span className="font-semibold text-slate-800">Page 1 of 1</span>
      </div>
    </div>
  );
}
