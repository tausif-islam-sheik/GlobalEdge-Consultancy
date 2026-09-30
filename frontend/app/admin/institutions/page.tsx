"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, X } from "lucide-react";
import { PageCard, SearchInput, Select, Stat, Pill, Field, inputCls } from "@/components/admin/admin-ui";
import { institutions as fallbackInstitutions } from "@/components/admin/admin-lists";
import { getAdminInstitutions, useLive } from "@/lib/api";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function InstitutionsPage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const institutions = useLive(getAdminInstitutions, fallbackInstitutions);
  const goDetails = (name: string) => router.push(`/admin/institutions/${slugify(name)}`);
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold">Institution List</h1>
        <button onClick={() => setOpen(true)} className="rounded bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white">+ Add Institution</button>
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
              <tr
                key={r.name}
                onClick={() => goDetails(r.name)}
                onKeyDown={(e) => { if (e.key === "Enter") goDetails(r.name); }}
                tabIndex={0}
                className="cursor-pointer hover:bg-slate-50/60 focus:bg-sky-50/50 focus:outline-none"
                title={`View ${r.name} details`}
              >
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="cursor-pointer" onClick={(e) => e.stopPropagation()} /></td>
                <td className="px-2 py-4"><span className="font-bold hover:text-sky-700 hover:underline">{r.name}</span><div className="text-slate-500">{r.programs} • {r.campus}</div><div className="text-sky-600" onClick={(e) => e.stopPropagation()}>{r.web}</div></td>
                <td className="px-2 py-4"><div className="font-bold">🌍 {r.country}</div><div className="max-w-[260px] text-slate-500">{r.address}</div></td>
                <td className="px-2 py-4"><div className="font-semibold">{r.rep}</div><div className="text-slate-500">{r.repEmail}</div></td>
                <td className="px-2 py-4"><div className="font-semibold">{r.counsellor}</div><div className="text-slate-500">+880 01828921831</div><div className="text-slate-500">manager@gmail.com</div></td>
                <td className="px-2 py-4"><Pill tone="blue">ACTIVE</Pill></td>
                <td className="px-2 py-4" onClick={(e) => e.stopPropagation()}><button className="flex items-center gap-1.5 whitespace-nowrap rounded border bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"><LogIn className="size-4" /> Login as</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageCard>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/30 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-[640px] rounded border bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-[18px] font-bold text-slate-900">Add New Institution</h2>
                <p className="mt-0.5 text-[14px] text-slate-500">Create the institution and its representative login account.</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="close" className="rounded p-1.5 hover:bg-slate-100"><X className="size-5" /></button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Institution Name"><input placeholder="" className={inputCls} /></Field>
              <Field label="Representative Name"><input placeholder="" className={inputCls} /></Field>
              <Field label="Email Address"><input placeholder="" className={inputCls} /></Field>
              <Field label="Temporary Password"><input placeholder="" type="password" className={inputCls} /></Field>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="rounded border bg-white px-4 py-2 text-sm font-semibold">Cancel</button>
              <button className="rounded bg-[#1d8fc2] px-4 py-2 text-sm font-semibold text-white">Create Institution</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
