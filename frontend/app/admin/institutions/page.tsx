"use client";
import { GraduationCap, Globe2, CircleCheck, Clock, LogIn } from "lucide-react";
import { PageCard, SearchInput, Select, Stat, Pill } from "@/components/admin/admin-ui";
import { institutions } from "@/components/admin/admin-lists";

export default function InstitutionsPage() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold">Institution List</h1>
        <button className="rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white">+ Add Institution</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="TOTAL INSTITUTIONS" value={39} tone="blue" link="/admin/institutions" />
        <Stat label="COUNTRIES" value={13} tone="green" />
        <Stat label="ACTIVE" value={39} tone="blue" />
        <Stat label="INACTIVE" value={0} tone="amber" />
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_220px_200px]">
        <SearchInput placeholder="Search institution, country, or province" />
        <Select><option>All Countries</option></Select>
        <Select><option>All Status</option></Select>
      </div>
      <PageCard className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-[13.5px]">
          <thead>
            <tr className="border-b text-left">
              <th className="px-4 py-3"><input type="checkbox" /></th>
              <th className="px-2 py-3 font-semibold">Institution ↕</th>
              <th className="px-2 py-3 font-semibold">Location ↕</th>
              <th className="px-2 py-3 font-semibold">Representative</th>
              <th className="px-2 py-3 font-semibold">Counsellor</th>
              <th className="px-2 py-3 font-semibold">Status ↕</th>
              <th className="px-2 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {institutions.map((r) => (
              <tr key={r.name}>
                <td className="px-4 py-4"><input type="checkbox" /></td>
                <td className="px-2 py-4"><div className="font-bold">{r.name}</div><div className="text-slate-500">{r.programs} • {r.campus}</div><div className="text-sky-600">{r.web}</div></td>
                <td className="px-2 py-4"><div className="font-bold">🌍 {r.country}</div><div className="max-w-[260px] text-slate-500">{r.address}</div></td>
                <td className="px-2 py-4"><div className="font-semibold">{r.rep}</div><div className="text-slate-500">{r.repEmail}</div></td>
                <td className="px-2 py-4"><div className="font-semibold">{r.counsellor}</div><div className="text-slate-500">+880 01828921831</div><div className="text-slate-500">manager@gmail.com</div></td>
                <td className="px-2 py-4"><Pill tone="blue">ACTIVE</Pill></td>
                <td className="px-2 py-4"><button className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-medium"><LogIn className="size-4" /> Login as</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageCard>
    </div>
  );
}
