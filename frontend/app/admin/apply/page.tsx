"use client";
import { useState } from "react";
import { FilePlus2 } from "lucide-react";
import { PageCard, SearchInput, Pill } from "@/components/admin/admin-ui";
import { applyStudents } from "@/components/admin/admin-lists";

export default function ApplyPage() {
  const [q, setQ] = useState("");
  const rows = applyStudents.filter((s) =>
    (s.name + s.email + s.id).toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div className="space-y-4 p-4">
      <PageCard className="flex flex-wrap items-center gap-4 border-sky-200 p-5">
        <div className="min-w-[220px] flex-1">
          <h1 className="text-[22px] font-bold text-sky-600">Apply for Student</h1>
          <p className="text-[13.5px] text-slate-500">Select a student and complete the application process without leaving the admin panel.</p>
        </div>
        <button className="rounded bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white">Add Student and Apply</button>
      </PageCard>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-bold">Select a student</h2>
          <p className="text-[13.5px] text-slate-500">Choose the student whose application you want to create.</p>
        </div>
        <div className="w-full sm:w-[320px]">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search students, email, ID..." className="w-full rounded border bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-400" />
        </div>
      </div>

      <PageCard className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-[13.5px]">
          <thead>
            <tr className="border-b text-left font-semibold">
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">ID Info</th>
              <th className="px-4 py-3">Agent</th>
              <th className="px-4 py-3">Counsellor</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-4">
                  <div className="flex gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-slate-100 text-[12px] font-bold text-slate-500">{s.initials}</span>
                    <span>
                      <span className="block font-bold">{s.name}</span>
                      <span className="block text-slate-500">{s.country}</span>
                      <span className="block text-slate-500">{s.passport}</span>
                      <span className="block text-slate-500">{s.email}</span>
                      <span className="block text-slate-500">{s.phone}</span>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-600"><div className="font-medium text-slate-800">{s.id}</div><div>{s.date}</div><div>{s.src}</div></td>
                <td className="px-4 py-4">
                  {s.agent === "Direct Student" ? <Pill tone="gray">Direct Student</Pill> : (
                    <span><span className="block font-semibold">{s.agent}</span><span className="block text-slate-500">{s.agentSub}</span><span className="block">{s.agentPhone}</span><span className="block text-slate-500">{s.agentEmail}</span></span>
                  )}
                </td>
                <td className="px-4 py-4"><span className="block font-semibold">{s.counsellor}</span><span className="block text-slate-500">{s.counsRole}</span><span className="block text-slate-500">{s.counsPhone}</span></td>
                <td className="px-4 py-4"><Pill>Verified</Pill><div className="mt-1 text-slate-500">{s.app}</div><div className="text-slate-500">{s.docs}</div></td>
                <td className="px-4 py-4 text-right">
                  <button className="inline-flex items-center gap-1.5 rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white ring-4 ring-sky-100"><FilePlus2 className="size-4" /> Apply</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageCard>
    </div>
  );
}
