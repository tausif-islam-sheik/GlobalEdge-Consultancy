"use client";
import { useState } from "react";
import {
  FileText, Plane, Award, GraduationCap, Search, Link2, Send, Copy,
  MessageCircle, Clock, FileCheck, Pencil, Trash2, Plus, Eye, UserPlus, LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { allApplications, appChecklists, visaChecklists, liveCourses, agents, appStats, type AppRow } from "./ccapply-data";

/* ---------- shared bits ---------- */

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded border bg-white shadow-[0_1px_2px_rgba(0,0,0,.05)]", className)}>{children}</div>;
}

function FilterSelect({ value, options, className }: { value?: string; options: string[]; className?: string }) {
  const [v, setV] = useState(value ?? options[0]);
  return (
    <div className={cn("relative", className)}>
      <select value={v} onChange={(e) => setV(e.target.value)}
        className="w-full appearance-none rounded border bg-white px-3 py-2.5 pr-8 text-sm text-slate-600 outline-none focus:border-sky-400">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">⇅</span>
    </div>
  );
}

function SearchBox({ placeholder, className }: { placeholder: string; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      <input placeholder={placeholder} className="w-full rounded border bg-white py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-sky-400" />
    </div>
  );
}

function StatusPill({ s }: { s: AppRow["status"] }) {
  const map: Record<string, string> = {
    DRAFT: "bg-amber-400 text-slate-900",
    "UNDER REVIEW": "bg-orange-50 text-orange-700 border border-orange-200",
    ACCEPTED: "bg-sky-50 text-sky-600 border border-sky-200",
    REJECTED: "bg-red-50 text-red-600 border border-red-200",
  };
  return <span className={cn("whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-bold", map[s])}>{s}</span>;
}

export function AppStatCards() {
  return (
    <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
      <Card className="border-sky-200 bg-sky-50/70 p-5">
        <div className="flex items-start justify-between">
          <span className="text-[12px] font-medium tracking-wide text-slate-500">TOTAL APPLICATIONS</span>
          <span className="grid size-10 place-items-center rounded bg-sky-100 text-sky-600"><FileText className="size-5" /></span>
        </div>
        <div className="mt-1 text-[34px] font-extrabold leading-none text-sky-500">43</div>
        <div className="mt-4 space-y-1.5 border-t border-sky-200/60 pt-3 text-[13px]">
          <div className="flex justify-between"><span className="text-slate-500">Draft:</span><span>12 <span className="ml-1 font-medium text-sky-600">View →</span></span></div>
          <div className="flex justify-between"><span className="text-slate-500">Applied:</span><span>31 <span className="ml-1 font-medium text-sky-600">View →</span></span></div>
          <span className="inline-flex items-center gap-1 pt-1 font-medium text-sky-600">View all →</span>
        </div>
      </Card>
      <Card className="border-amber-200 bg-amber-100/70 p-5">
        <div className="flex items-start justify-between">
          <span className="text-[12px] font-medium tracking-wide text-slate-500">TOTAL VISA</span>
          <span className="grid size-10 place-items-center rounded bg-amber-200 text-amber-800"><Plane className="size-5" /></span>
        </div>
        <div className="mt-1 text-[34px] font-extrabold leading-none text-amber-700">14</div>
        <div className="mt-4 space-y-1.5 border-t border-amber-200/70 pt-3 text-[13px]">
          <div className="flex justify-between"><span className="text-slate-500">On process:</span><span className="font-medium">13</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Completed:</span><span className="font-medium">1</span></div>
        </div>
      </Card>
      <Card className="border-green-200 bg-green-50/70 p-5">
        <div className="flex items-start justify-between">
          <span className="text-[12px] font-medium tracking-wide text-slate-500">OFFER LETTERS</span>
          <span className="grid size-10 place-items-center rounded bg-green-100 text-green-700"><Award className="size-5" /></span>
        </div>
        <div className="mt-1 text-[34px] font-extrabold leading-none text-green-700">14</div>
        <div className="mt-4 space-y-1.5 border-t border-green-200/60 pt-3 text-[13px]">
          <div className="flex justify-between"><span className="text-slate-500">Pending review:</span><span className="font-medium">0</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Sent to student:</span><span className="font-medium">14</span></div>
        </div>
      </Card>
      <Card className="border-green-200 bg-green-50/50 p-5">
        <div className="flex items-start justify-between">
          <span className="text-[12px] font-medium tracking-wide text-slate-500">INSTITUTE REGISTRATION</span>
          <span className="grid size-10 place-items-center rounded bg-green-100 text-green-700"><GraduationCap className="size-5" /></span>
        </div>
        <div className="mt-1 text-[34px] font-extrabold leading-none text-green-700">0</div>
        <div className="mt-4 space-y-1.5 border-t border-green-200/60 pt-3 text-[13px]">
          <div className="flex justify-between"><span className="text-slate-500">On process:</span><span className="font-medium">0</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Completed:</span><span className="font-medium">0</span></div>
        </div>
      </Card>
    </div>
  );
}

function AppRowView({ r }: { r: AppRow }) {
  return (
    <tr className="align-top">
      <td className="px-4 py-4"><input type="checkbox" className="size-4 rounded border-slate-300" /></td>
      <td className="px-2 py-4 text-[13px]">
        <div className="font-medium text-slate-700">{r.id}</div>
        <div className="text-slate-500">{r.date}</div>
        <div className="text-slate-500">{r.time}</div>
        <div className="text-slate-500">{r.src}</div>
      </td>
      <td className="px-2 py-4">
        <div className="flex items-start gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-500">{r.initials || "👤"}</span>
          <span>
            <span className="block font-bold text-[14.5px] text-slate-900">{r.student}</span>
            {r.country && <span className="block text-[12.5px] text-slate-500">🇧🇩 {r.country}</span>}
            <span className="block text-[12.5px] text-slate-500">{r.passport}</span>
            <span className="mt-0.5 flex items-center gap-1.5 text-[13px] font-medium text-slate-700">{r.phone}
              <MessageCircle className="size-3.5 text-green-500" /><Copy className="size-3.5 text-slate-400" />
            </span>
            <span className="block max-w-[220px] truncate text-[12.5px] text-slate-500">{r.email} <Copy className="inline size-3 text-slate-400" /></span>
          </span>
        </div>
      </td>
      <td className="px-2 py-4"><span className="whitespace-nowrap rounded-full border bg-slate-50 px-3 py-1 text-[12px] font-medium text-slate-600">{r.agent}</span></td>
      <td className="px-2 py-4 text-[13px]">
        <div className="max-w-[300px] font-bold text-[14px] text-slate-900">{r.institution}</div>
        <div className="text-slate-500">🌍 {r.instCountry}</div>
        <div className="max-w-[300px] text-slate-500">{r.program}</div>
        {r.intake && <div className="text-slate-500">Intake: {r.intake}</div>}
        {r.duration && <div className="text-slate-500">Duration: {r.duration}</div>}
        {r.tuition && <div className="text-slate-500">Tuition fee: {r.tuition}</div>}
        {r.appFee && <div className="text-slate-500">Application fee: {r.appFee}</div>}
      </td>
      <td className="px-2 py-4 text-[13px]">
        <div className="flex items-center gap-1.5 font-bold text-slate-900">{r.counsellor} <UserPlus className="size-3.5 text-slate-400" /></div>
        <div className="text-slate-500">{r.counsRole}</div>
        <div className="mt-0.5 flex items-center gap-1 text-slate-600">{r.counsPhone} <MessageCircle className="size-3.5 text-green-500" /></div>
        <div className="flex items-center gap-1 text-slate-500">{r.counsEmail} <Copy className="size-3 text-slate-400" /></div>
      </td>
      <td className="px-2 py-4 text-[12.5px]">
        <StatusPill s={r.status} />
        <div className="mt-1.5 flex items-center gap-1 text-slate-500"><Clock className="size-3.5" /> Updated {r.updated}</div>
        <div className="mt-1 flex items-center gap-1 text-slate-500"><FileCheck className="size-3.5" /> {r.docs}</div>
      </td>
    </tr>
  );
}

/* ---------- main applications table ---------- */

export function ApplicationsTable({ filter }: { filter: "ALL" | "UNDER REVIEW" | "ACCEPTED" | "REJECTED" }) {
  const rows = filter === "ALL" ? allApplications : allApplications.filter((r) => r.status === filter);
  return (
    <div className="space-y-4">
      <div className="grid gap-2 lg:grid-cols-[1.4fr_170px_170px_170px_170px]">
        <SearchBox placeholder="Search applications..." />
        <FilterSelect options={["All Countries", "Malaysia", "Hungary", "Thailand"]} />
        <FilterSelect value={filter === "ALL" ? "All Status" : filter} options={["All Status", "UNDER REVIEW", "ACCEPTED", "REJECTED", "DRAFT"]} />
        <FilterSelect options={["All Institutions", "APU", "MSU", "Debrecen"]} />
        <FilterSelect options={["All Counsellors", "Jabbar Khan", "Karim Ali"]} />
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[1180px] text-[13.5px]">
          <thead>
            <tr className="border-b text-left text-[14px] text-slate-900">
              <th className="px-4 py-3.5"><input type="checkbox" className="size-4" /></th>
              <th className="px-2 py-3.5 font-semibold">Application ID</th>
              <th className="px-2 py-3.5 font-semibold">Student</th>
              <th className="px-2 py-3.5 font-semibold">Agent</th>
              <th className="px-2 py-3.5 font-semibold">Institution / Program</th>
              <th className="px-2 py-3.5 font-semibold">Counsellor</th>
              <th className="px-2 py-3.5 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((r) => <AppRowView key={r.id} r={r} />)}
            {rows.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-14 text-center text-[14px] text-slate-500">No matching applications.</td></tr>
            )}
          </tbody>
        </table>
        {filter === "REJECTED" && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-[13px] text-slate-500">
            <span className="flex items-center gap-2">SHOWING <span className="rounded border px-3 py-1.5">10 ⌄</span> 0 of 0 row(s) selected.</span>
            <span className="flex items-center gap-2"><b className="text-slate-800">Page 1 of 1</b>
              <button className="rounded border px-3 py-1.5">‹ Prev</button>
              <button className="rounded border px-3 py-1.5">Next ›</button>
            </span>
          </div>
        )}
      </Card>
    </div>
  );
}

export function ApplicationsHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-[26px] font-bold text-slate-900">Applications</h1>
      <div className="flex gap-2">
        <button className="flex items-center gap-1.5 rounded border bg-white px-3.5 py-2 text-sm font-semibold"><Link2 className="size-4" /> Application Link</button>
        <button className="flex items-center gap-1.5 rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white"><Send className="size-4" /> Apply</button>
      </div>
    </div>
  );
}

/* ---------- deferral / refund ---------- */

export function DeferralPage() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-bold">Deferral Request</h1>
          <p className="max-w-[720px] text-[14px] text-slate-500">Select an application and request that its admission be moved to a later intake. An admin reviews and approves or rejects each request.</p>
        </div>
        <button className="flex items-center gap-1.5 rounded bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white">🗎 New Deferral Request</button>
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-[14px]">
          <thead><tr className="border-b text-left font-semibold"><th className="px-4 py-3">Application</th><th className="px-4 py-3">Student</th><th className="px-4 py-3">Requested intake</th><th className="px-4 py-3">Submitted</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Action</th></tr></thead>
          <tbody><tr><td colSpan={6} className="px-4 py-12 text-center text-slate-500">No deferral requests yet.</td></tr></tbody>
        </table>
      </Card>
    </div>
  );
}

export function RefundPage() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-bold">Refund Request</h1>
          <p className="max-w-[720px] text-[14px] text-slate-500">Select an application and request a refund of fees already paid. A reason is required. An admin reviews and approves or rejects each request.</p>
        </div>
        <button className="flex items-center gap-1.5 rounded bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white">🗎 New Refund Request</button>
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-[14px]">
          <thead><tr className="border-b text-left font-semibold"><th className="px-4 py-3">Application</th><th className="px-4 py-3">Student</th><th className="px-4 py-3">Reason</th><th className="px-4 py-3">Submitted</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Action</th></tr></thead>
          <tbody><tr><td colSpan={6} className="px-4 py-12 text-center text-slate-500">No refund requests yet.</td></tr></tbody>
        </table>
      </Card>
    </div>
  );
}

/* ---------- checklist templates ---------- */

export function ChecklistPage({ kind }: { kind: "app" | "visa" }) {
  const isApp = kind === "app";
  const rows = isApp ? appChecklists : visaChecklists;
  return (
    <div className="mx-auto max-w-[940px] space-y-4 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[26px] font-bold">{isApp ? "Application Checklist Templates" : "Visa Checklist Templates"}</h1>
          <p className="mt-1 text-[14.5px] text-slate-500">{isApp ? "Create and manage the checklists that can be assigned to student applications." : "Create and manage the checklists that can be assigned to a student's visa case."}</p>
        </div>
        <button className="flex items-center gap-1 rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white"><Plus className="size-4" /> New Template</button>
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-[14.5px]">
          <thead><tr className="border-b text-left"><th className="px-4 py-3"><input type="checkbox" className="size-4" /></th><th className="px-2 py-3 font-semibold">Country</th><th className="px-2 py-3 font-semibold">Name</th><th className="px-2 py-3 text-right font-semibold">Items</th><th className="px-4 py-3 text-right font-semibold">Actions</th></tr></thead>
          <tbody className="divide-y">
            {rows.map((r) => (
              <tr key={r.name}>
                <td className="px-4 py-4"><input type="checkbox" className="size-4" /></td>
                <td className="px-2 py-4 font-bold">{r.country}</td>
                <td className="px-2 py-4">{r.name}</td>
                <td className="px-2 py-4 text-right">{r.items}</td>
                <td className="px-4 py-4"><span className="flex justify-end gap-3"><Pencil className="size-4 cursor-pointer" /><Trash2 className="size-4 cursor-pointer text-red-500" /></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="text-[14px] text-slate-500">0 of 2 row(s) selected.</p>
    </div>
  );
}

/* ---------- live classes ---------- */

export function LiveClassesPage() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-[24px] font-bold text-sky-600">🎥 <span className="text-slate-900">Live Classes</span></h1>
        <button className="flex items-center gap-1 rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white"><Plus className="size-4" /> New Course</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { l: "TOTAL COURSES", v: "1", c: "text-sky-600 bg-sky-50/70 border-sky-200", icon: "🎥", link: true },
          { l: "ACTIVE COURSES", v: "1", c: "text-green-700 bg-green-50/70 border-green-200", icon: "((•))", link: true },
          { l: "TOTAL CLASSES", v: "2", c: "text-sky-700 bg-sky-50/50 border-sky-200", icon: "📅" },
          { l: "STUDENTS ENROLLED", v: "3", c: "text-amber-700 bg-amber-100/70 border-amber-200", icon: "👥" },
        ].map((s) => (
          <Card key={s.l} className={cn("p-5", s.c.split(" ").slice(1).join(" "))}>
            <div className="flex items-start justify-between">
              <span className="text-[12px] font-medium tracking-wide text-slate-500">{s.l}</span>
              <span className="grid size-10 place-items-center rounded bg-sky-100 text-[16px]">{s.icon}</span>
            </div>
            <div className={cn("mt-1 text-[32px] font-extrabold leading-none", s.c.split(" ")[0])}>{s.v}</div>
            {s.link && <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-sky-600">View →</span>}
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SearchBox placeholder="Search courses..." className="w-full max-w-[350px]" />
        <FilterSelect options={["All statuses", "Active", "Draft", "Completed"]} className="w-[220px]" />
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-[14px]">
          <thead><tr className="border-b text-left"><th className="px-4 py-3"><input type="checkbox" className="size-4" /></th><th className="px-2 py-3 font-semibold">Course</th><th className="px-2 py-3 font-semibold">Staff</th><th className="px-2 py-3 font-semibold">Classes</th><th className="px-2 py-3 font-semibold">Enrolled</th><th className="px-2 py-3 font-semibold">Status</th><th className="px-4 py-3" /></tr></thead>
          <tbody>
            {liveCourses.map((c) => (
              <tr key={c.title}>
                <td className="px-4 py-4"><input type="checkbox" className="size-4" /></td>
                <td className="px-2 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-20 place-items-center overflow-hidden rounded bg-gradient-to-br from-amber-300 via-pink-300 to-sky-300 text-[10px] font-bold">30-DAY BANNER</span>
                    <span><span className="block max-w-[280px] truncate font-semibold">{c.title}</span><span className="block max-w-[280px] truncate text-slate-500">{c.desc}</span></span>
                  </div>
                </td>
                <td className="px-2 py-4"><div>Teacher: <b>{c.teacher}</b></div><div className="text-slate-500">Manager: {c.manager}</div></td>
                <td className="px-2 py-4">{c.classes}</td>
                <td className="px-2 py-4">{c.enrolled}</td>
                <td className="px-2 py-4"><span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[12px] font-bold text-sky-600">{c.status}</span></td>
                <td className="px-4 py-4"><span className="flex justify-end gap-4"><UserPlus className="size-4" /><Pencil className="size-4" /><Trash2 className="size-4 text-red-500" /></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="text-[13.5px] text-slate-500">course(s) selected</p>
    </div>
  );
}

/* ---------- agents ---------- */

export function AgentsPage() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[24px] font-bold">Agents</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded border bg-white px-3.5 py-2 text-sm font-semibold"><Link2 className="size-4" /> Get Agent Registration Link</button>
          <button className="flex items-center gap-1 rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white"><Plus className="size-4" /> Add Agent</button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-sky-200 bg-sky-50/70 p-5"><div className="flex justify-between"><span className="text-[12px] text-slate-500">TOTAL AGENTS</span><span className="grid size-10 place-items-center rounded bg-sky-100">👥</span></div><div className="mt-1 text-[32px] font-extrabold text-sky-500">8</div><span className="mt-1 inline-block text-[13px] font-medium text-sky-600">View all →</span></Card>
        <Card className="border-green-200 bg-green-50/70 p-5"><div className="flex justify-between"><span className="text-[12px] text-slate-500">VERIFIED</span><span className="grid size-10 place-items-center rounded bg-green-100">✅</span></div><div className="mt-1 text-[32px] font-extrabold text-green-700">5</div><span className="mt-1 inline-block text-[13px] font-medium text-green-700">View →</span></Card>
        <Card className="border-amber-200 bg-amber-100/70 p-5"><div className="flex justify-between"><span className="text-[12px] text-slate-500">PENDING</span><span className="grid size-10 place-items-center rounded bg-amber-200">🕒</span></div><div className="mt-1 text-[32px] font-extrabold text-amber-700">3</div><span className="mt-1 inline-block text-[13px] font-medium text-amber-700">View →</span></Card>
        <Card className="border-sky-200 bg-sky-50/50 p-5"><div className="flex justify-between"><span className="text-[12px] text-slate-500">VISA SUCCESS</span><span className="grid size-10 place-items-center rounded bg-sky-100">🛫</span></div><div className="mt-1 text-[32px] font-extrabold text-sky-600">0</div><span className="mt-1 inline-block text-[13px] font-medium text-sky-600">View agents →</span></Card>
      </div>
      <div className="grid gap-2 lg:grid-cols-[1.5fr_220px_200px_200px]">
        <SearchBox placeholder="Search agents, email, location..." />
        <FilterSelect options={["Newest first", "Oldest first", "Top rank"]} />
        <FilterSelect options={["All Status", "Verified", "Pending"]} />
        <FilterSelect options={["All counsellors", "Karim Ali"]} />
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[1180px] text-[13.5px]">
          <thead><tr className="border-b text-left text-[14px]"><th className="px-4 py-3"><input type="checkbox" className="size-4" /></th><th className="px-2 py-3 font-semibold">Agent ID</th><th className="px-2 py-3 font-semibold">Agent</th><th className="px-2 py-3 font-semibold">Contact Person</th><th className="px-2 py-3 font-semibold">Status</th><th className="px-2 py-3 font-semibold">Performance</th><th className="px-2 py-3 font-semibold">Counsellor</th><th className="px-4 py-3" /></tr></thead>
          <tbody className="divide-y">
            {agents.map((a) => (
              <tr key={a.id} className="align-top">
                <td className="px-4 py-4"><input type="checkbox" className="size-4" /></td>
                <td className="px-2 py-4"><div className="flex items-center gap-1 font-medium">{a.id} <Copy className="size-3.5 text-slate-400" /></div><div className="mt-1 text-slate-500">Joined: {a.joined}</div></td>
                <td className="px-2 py-4">
                  <div className="flex items-start gap-2"><span className="grid size-10 place-items-center rounded border bg-slate-50">🏢</span>
                    <span><span className="block font-bold text-[15px]">{a.name}</span><span className="block text-slate-500">{a.type}</span><span className="block text-slate-500">🇧🇩 {a.country}</span><span className="block max-w-[220px] truncate text-slate-500">{a.email}</span>{a.web && <span className="block text-slate-500">🌐 {a.web}</span>}</span></div>
                </td>
                <td className="px-2 py-4"><div className="font-bold text-[15px]">{a.contact}</div><div className="flex items-center gap-1">{a.contactPhone} <MessageCircle className="size-3.5 text-green-500" /></div><div className="max-w-[220px] truncate text-slate-500">{a.contactEmail} <Copy className="inline size-3" /></div></td>
                <td className="px-2 py-4"><span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[12px] font-semibold text-green-700">{a.status}</span><div className="mt-1.5 text-slate-500">{a.students}</div><div className="text-slate-500">Last update: {a.updated}</div></td>
                <td className="px-2 py-4"><div><b className="text-red-500">{a.rank}</b> <span className="text-slate-500">{a.score}</span></div><div className="text-slate-500">{a.visa}</div><div className="text-slate-500">{a.apps}</div><div className="text-slate-500">{a.process}</div></td>
                <td className="px-2 py-4"><div className="flex items-center gap-1 font-bold">{a.counsellor} <UserPlus className="size-3.5 text-slate-400" /></div><div className="text-slate-500">{a.counsRole}</div><div className="flex items-center gap-1">{a.counsPhone} <MessageCircle className="size-3.5 text-green-500" /></div><div className="text-slate-500">{a.counsEmail} <Copy className="inline size-3" /></div></td>
                <td className="px-4 py-4"><button className="flex items-center gap-1.5 whitespace-nowrap rounded border px-3 py-2 text-[13px] font-semibold"><LogIn className="size-4" /> Login As</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ---------- agreement ---------- */

export function AgreementPage() {
  const [name, setName] = useState("Eakramul Haque");
  const [role, setRole] = useState("Managing Director");
  return (
    <div className="mx-auto max-w-[1000px] space-y-5 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[26px] font-bold">Agreement</h1>
          <p className="mt-1 max-w-[760px] text-[14.5px] text-slate-500">Edit the Recruitment Partner Agreement wording and the CCApply signatory stamped onto every generated agreement and certificate.</p>
        </div>
        <button className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white">Save Changes</button>
      </div>
      <Card className="p-6">
        <div className="flex items-start gap-3">
          <span className="grid size-11 place-items-center rounded bg-sky-50 text-sky-500">🖊️</span>
          <div><h2 className="text-[18px] font-bold">Signatory</h2>
            <p className="text-[14px] text-slate-500">Signature and signatory details stamped onto generated Recruitment Partner agreements and certificates.</p></div>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <div className="mb-1.5 text-[14px] font-semibold">Authorised Signature</div>
            <div className="grid h-[130px] place-items-center rounded border border-dashed bg-slate-50/50">
              <span className="text-[42px] italic" style={{ fontFamily: "cursive" }}>𝓔kramul</span>
            </div>
            <p className="mt-2 text-[13px] text-slate-500">PNG with a transparent background works best.<br />Recommended around 400×120.</p>
          </div>
          <div className="space-y-4">
            <label className="block"><span className="mb-1.5 block text-[14px] font-semibold">Signatory Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded border px-3 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
            <label className="block"><span className="mb-1.5 block text-[14px] font-semibold">Designation</span>
              <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded border px-3 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="grid size-11 place-items-center rounded bg-sky-50 text-sky-500">🗎</span>
            <div><h2 className="text-[18px] font-bold">Agreement Text</h2>
              <p className="max-w-[720px] text-[14px] text-slate-500">The full Recruitment Partner Agreement wording rendered into the PDF a corporate agent signs. Keep the [[PLACEHOLDER]] tokens as plain text — they&apos;re substituted with the actual partner/date/signatory details when a PDF is generated.</p></div>
          </div>
          <button className="flex shrink-0 items-center gap-1.5 rounded border px-3.5 py-2 text-sm font-semibold"><Eye className="size-4" /> Preview</button>
        </div>
        <div className="mt-4 rounded border bg-slate-50/60 p-4 text-[13.5px] text-slate-500">
          Recruitment Partner Agreement — [[AGENCY_NAME]] ([[AGENCY_EMAIL]]) signed on [[DATE]] by {name || "[[SIGNATORY_NAME]]"}, {role || "[[DESIGNATION]]"}...
        </div>
      </Card>
    </div>
  );
}

export function useTab() {
  return null;
}

export { appStats };
