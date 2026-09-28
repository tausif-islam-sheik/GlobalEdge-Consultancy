"use client";
import { PageCard, SearchInput, Select, Stat, Pill } from "@/components/admin/admin-ui";
import { allStudents } from "@/components/admin/admin-lists";

export type StudentFilter = "all" | "pending" | "verified" | "success";

const TITLES: Record<StudentFilter, string> = {
  all: "All Students",
  pending: "Pending Students",
  verified: "Verified Students",
  success: "Success Students",
};

export function StudentsTable({ filter }: { filter: StudentFilter }) {
  const rows =
    filter === "all" ? allStudents.slice(0, 3)
    : filter === "pending" ? allStudents.filter((s) => s.status === "Pending")
    : filter === "verified" ? allStudents.filter((s) => s.status === "Verified")
    : allStudents.filter((s) => s.name === "Pixlabit IT");

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold">{TITLES[filter]}</h1>
        <button className="rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white">+ Create Student</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Stat label="TOTAL STUDENTS" value={57} tone="blue" />
        <Stat label="PENDING" value={27} tone="amber" />
        <Stat label="VERIFIED" value={30} tone="green" />
        <Stat label="SUCCESS STUDENTS" value={1} tone="blue" />
        <Stat label="AGENT CREATED" value={4} tone="blue" />
      </div>
      <div className="flex flex-wrap gap-2">
        <SearchInput placeholder="Search students, email, ID..." className="min-w-[240px] flex-1" />
        <Select className="w-[200px]"><option>All Counsellors</option></Select>
        <Select className="w-[200px]"><option>{TITLES[filter]}</option></Select>
      </div>
      <PageCard className="overflow-x-auto">
        <table className="w-full min-w-[1080px] text-[13.5px]">
          <thead>
            <tr className="border-b text-left">
              <th className="px-4 py-3"><input type="checkbox" /></th>
              <th className="px-2 py-3 font-semibold">ID Info</th>
              <th className="px-2 py-3 font-semibold">Student ↕</th>
              <th className="px-2 py-3 font-semibold">Agent</th>
              <th className="px-2 py-3 font-semibold">Counsellor</th>
              <th className="px-2 py-3 font-semibold">Status</th>
              <th className="px-2 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-4"><input type="checkbox" /></td>
                <td className="px-2 py-4 text-slate-500"><div className="font-semibold text-slate-800">{s.id}</div><div>{s.date}</div><div>{s.src}</div></td>
                <td className="px-2 py-4">
                  <div className="flex gap-2.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-100 text-[11px] font-bold">{s.initials}</span>
                    <span><span className="block font-bold">{s.name}</span><span className="block text-slate-500">{s.country} {s.passport}</span><span className="block">{s.phone}</span><span className="block text-slate-500">{s.email}</span></span>
                  </div>
                </td>
                <td className="px-2 py-4">{s.agent === "Direct Student" ? <Pill tone="gray">Direct Student</Pill> : <span className="font-semibold">{s.agent}</span>}</td>
                <td className="px-2 py-4"><div className="font-semibold">{s.counsellor}</div></td>
                <td className="px-2 py-4">
                  <Pill tone={s.status === "Verified" ? "green" : "gray"}>{s.status}</Pill>
                  <div className="mt-1 text-slate-500">{s.app}</div>
                  <div className="text-slate-500">{s.docs}</div>
                </td>
                <td className="px-2 py-4">
                  <div className="flex flex-wrap justify-end gap-1.5">
                    <button className="rounded-lg border px-2.5 py-1 text-[12px] font-medium">Login As</button>
                    <button className="rounded-lg border px-2.5 py-1 text-[12px] font-medium">Followup</button>
                    <button className="rounded-lg border px-2.5 py-1 text-[12px] font-medium">Add to Visitor</button>
                    <button className="rounded-lg border px-2.5 py-1 text-[12px] font-medium">Apply Now</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageCard>
      <div className="flex items-center justify-between text-[13px] text-slate-500">
        <span>SHOWING 10 · 0 of {rows.length} row(s) selected.</span>
        <span className="font-semibold text-slate-800">Page 1 of 1</span>
      </div>
    </div>
  );
}
