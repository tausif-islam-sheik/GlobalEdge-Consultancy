"use client";
import { PageCard, SearchInput, Select, Stat } from "@/components/admin/admin-ui";
import { programs } from "@/components/admin/admin-lists";

export default function ProgramsPage() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold">Programs</h1>
        <button className="rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white">+ Add Program</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="TOTAL PROGRAMS" value={1609} tone="blue" />
        <Stat label="INSTITUTIONS" value={39} tone="blue" />
        <Stat label="LEVELS" value={8} tone="amber" />
        <Stat label="COUNTRIES" value={8} tone="green" />
      </div>
      <div className="flex flex-wrap gap-2">
        <SearchInput placeholder="Search programs, institutions..." className="min-w-[240px] flex-1" />
        <Select className="w-[160px]"><option>All Countries</option></Select>
        <Select className="w-[170px]"><option>All Institutions</option></Select>
        <Select className="w-[140px]"><option>All Levels</option></Select>
        <button className="rounded-lg border bg-white px-3 py-2 text-sm">Reset</button>
        <button className="rounded-lg border bg-white px-3 py-2 text-sm font-semibold">🇧🇩 BDT</button>
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
              <tr key={p.title}>
                <td className="px-4 py-4"><input type="checkbox" /></td>
                <td className="px-2 py-4"><div className="font-bold">{p.title}</div><div className="text-slate-500">{p.level}</div><div className="text-slate-500">{p.field}</div><div className="text-slate-500">{p.years} • Processing: {p.proc}</div></td>
                <td className="px-2 py-4"><div className="font-semibold">{p.inst}</div><div className="text-slate-500">• Main campus</div></td>
                <td className="px-2 py-4"><div className="font-semibold">🇲🇾 {p.loc}</div></td>
                <td className="px-2 py-4 text-slate-500">Not set</td>
                <td className="px-2 py-4"><div className="font-bold">{p.fee}</div><div className="text-slate-500">{p.orig}</div></td>
                <td className="px-2 py-4">
                  <div className="flex flex-col gap-1.5">
                    <button className="whitespace-nowrap rounded-lg border px-3 py-1.5 text-[12.5px] font-medium">Commission rules</button>
                    <button className="whitespace-nowrap rounded-lg border px-3 py-1.5 text-[12.5px] font-medium">Edit fees</button>
                    <button className="whitespace-nowrap rounded-lg border px-3 py-1.5 text-[12.5px] font-medium">Duplicate</button>
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
