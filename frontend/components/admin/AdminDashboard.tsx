"use client";
import { useState } from "react";
import Link from "next/link";
import { Clock, GraduationCap, FileText, Briefcase, ArrowRight, Bell, Check, ChevronDown, CircleAlert, ArrowUpRight } from "lucide-react";
import { adminCounts, recentApplications, notifications, newAccounts, recentActivities, funnelSteps } from "./admin-data";
import { cn } from "@/lib/utils";

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-xl border bg-white shadow-[0_1px_2px_rgba(0,0,0,.05)]", className)}>{children}</div>;
}

function StatCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card className="bg-[#eaf5ec] border-[#cde6d2] p-5">
        <div className="flex items-start justify-between">
          <span className="text-[12px] font-medium tracking-wide text-slate-500">ON PROCESSING</span>
          <span className="grid size-10 place-items-center rounded-lg bg-[#cde6d2] text-green-700"><Clock className="size-5" /></span>
        </div>
        <div className="mt-1 text-[34px] leading-none font-extrabold text-green-700">{adminCounts.onProcessing}</div>
      </Card>
      <Card className="bg-[#eaf5fb] border-[#cde8f5] p-5">
        <div className="flex items-start justify-between">
          <span className="text-[12px] font-medium tracking-wide text-slate-500">TOTAL STUDENTS</span>
          <span className="grid size-10 place-items-center rounded-lg bg-[#cde8f5] text-sky-600"><GraduationCap className="size-5" /></span>
        </div>
        <div className="mt-1 text-[34px] leading-none font-extrabold text-[#1d8fc2]">{adminCounts.totalStudents}</div>
        <div className="mt-4 space-y-1.5 border-t border-sky-200/60 pt-3 text-[13px]">
          <div className="flex justify-between"><span className="text-slate-500">Student Agent:</span><span>0 <Link href="/admin/students" className="text-sky-600 font-medium">View →</Link></span></div>
          <div className="flex justify-between"><span className="text-slate-500">Corporate Agent:</span><span>4 <Link href="/admin/students" className="text-sky-600 font-medium">View →</Link></span></div>
          <Link href="/admin/students" className="inline-flex items-center gap-1 pt-1 text-sky-600 font-medium">View <ArrowRight className="size-3.5" /></Link>
        </div>
      </Card>
      <Card className="bg-[#fdf3d7] border-[#f3e0a8] p-5">
        <div className="flex items-start justify-between">
          <span className="text-[12px] font-medium tracking-wide text-slate-500">TOTAL APPLICATIONS</span>
          <span className="grid size-10 place-items-center rounded-lg bg-[#f3e0a8] text-amber-700"><FileText className="size-5" /></span>
        </div>
        <div className="mt-1 text-[34px] leading-none font-extrabold text-amber-700">{adminCounts.totalApplications}</div>
        <div className="mt-4 space-y-1.5 border-t border-amber-200/70 pt-3 text-[13px]">
          <div className="flex justify-between"><span className="text-slate-500">Student Agent:</span><span>0 <Link href="/admin/applications" className="text-amber-700 font-medium">View →</Link></span></div>
          <div className="flex justify-between"><span className="text-slate-500">Corporate Agent:</span><span>0 <Link href="/admin/applications" className="text-amber-700 font-medium">View →</Link></span></div>
          <Link href="/admin/applications" className="inline-flex items-center gap-1 pt-1 text-amber-700 font-medium">View <ArrowRight className="size-3.5" /></Link>
        </div>
      </Card>
      <Card className="bg-[#fdecec] border-[#f5cdcd] p-5">
        <div className="flex items-start justify-between">
          <span className="text-[12px] font-medium tracking-wide text-slate-500">TOTAL AGENTS</span>
          <span className="grid size-10 place-items-center rounded-lg bg-[#f5cdcd] text-red-500"><Briefcase className="size-5" /></span>
        </div>
        <div className="mt-1 text-[34px] leading-none font-extrabold text-red-500">{adminCounts.totalAgents}</div>
        <div className="mt-4 space-y-1.5 border-t border-red-200/70 pt-3 text-[13px]">
          <div className="flex justify-between"><span className="text-slate-500">Student Agent:</span><span>1 <Link href="/admin/agents" className="text-red-500 font-medium">View →</Link></span></div>
          <div className="flex justify-between"><span className="text-slate-500">Corporate Agent:</span><span>7 <Link href="/admin/agents" className="text-red-500 font-medium">View →</Link></span></div>
          <Link href="/admin/agents" className="inline-flex items-center gap-1 pt-1 text-red-500 font-medium">View <ArrowRight className="size-3.5" /></Link>
        </div>
      </Card>
    </div>
  );
}

function RegistrationsChart() {
  // Simple area chart matching reference peak around Apr
  const path = "M0,210 L120,210 L190,210 L250,110 L300,30 L350,120 L410,205 L470,120 L530,45 L600,75 L600,230 L0,230 Z";
  const line = "M0,210 L120,210 L190,210 L250,110 L300,30 L350,120 L410,205 L470,120 L530,45 L600,75";
  return (
    <Card className="overflow-hidden">
      <div className="flex items-start justify-between p-5">
        <div>
          <h3 className="font-semibold text-[16px]">Student Registrations</h3>
          <p className="text-[13px] text-slate-500">Monthly • 57 total</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">Monthly <ChevronDown className="size-4" /></button>
      </div>
      <div className="relative border-t px-2 pb-2">
        <svg viewBox="0 0 600 235" className="w-full h-[240px]">
          <defs>
            <linearGradient id="regFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#29a9e1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#29a9e1" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {[40, 120, 200].map((y) => (
            <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#eef2f7" strokeWidth="1" />
          ))}
          <path d={path} fill="url(#regFill)" />
          <path d={line} fill="none" stroke="#29a9e1" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="300" cy="30" r="5" fill="#29a9e1" stroke="#fff" strokeWidth="2" />
        </svg>
        <div className="absolute left-[48%] top-[52%] rounded-lg border bg-white px-3 py-2 text-[12px] shadow-lg">
          <div className="font-semibold">Apr 2026</div>
          <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-[#29a9e1]" /> Student registrations <b>16</b></div>
        </div>
      </div>
    </Card>
  );
}

function StatusPie() {
  return (
    <Card className="p-5">
      <h3 className="text-center font-semibold text-[16px]">Applications Status</h3>
      <p className="text-center text-[13px] text-slate-500">43 total applications</p>
      <div className="mx-auto mt-4 size-[240px] rounded-full"
        style={{ background: "conic-gradient(#10b981 0% 26%, #3b82f6 26% 33%, #0891b2 33% 100%)" }} />
      <div className="mt-4 flex items-center justify-center gap-4 text-[12.5px]">
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#10b981]" /> Accepted</span>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#3b82f6]" /> On Processing</span>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#0891b2]" /> Under Review</span>
      </div>
    </Card>
  );
}

function Funnel() {
  const max = Math.max(...funnelSteps.map((s) => s.value));
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-[16px]">Application Conversion Funnel</h3>
          <p className="text-[13px] text-slate-500">Student progress from registration through accepted applications</p>
        </div>
        <div className="rounded-lg border-l-4 border-l-green-500 bg-green-50 px-4 py-2 text-right">
          <div className="text-[12px] text-slate-500">Accepted conversion</div>
          <div className="text-[20px] font-bold">23%</div>
        </div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_220px]">
        <div className="space-y-4">
          {funnelSteps.map((s) => (
            <div key={s.label} className="grid grid-cols-[150px_1fr_30px] items-center gap-3 text-[13px]">
              <span className="text-right text-slate-500">{s.label}</span>
              <div className="h-[38px] rounded-r-lg rounded-l-sm" style={{ width: `${Math.max((s.value / max) * 100, s.value === 0 ? 2 : 8)}%`, background: s.color }} />
              <span className="font-medium">{s.value}</span>
            </div>
          ))}
        </div>
        <div className="space-y-3 text-[13px]">
          {[
            { t: "Students Applied", p: "54%", c: "green" },
            { t: "Sent to University", p: "13%", c: "blue" },
            { t: "Offer Received", p: "0%", c: "amber" },
            { t: "Accepted Applications", p: "0%", c: "green" },
          ].map((x) => (
            <div key={x.t} className={cn(
              "rounded-lg border-l-4 bg-slate-50 p-3",
              x.c === "green" && "border-l-green-500 bg-green-50/60",
              x.c === "blue" && "border-l-blue-500 bg-blue-50/60",
              x.c === "amber" && "border-l-amber-500 bg-amber-50/60",
            )}>
              <div className="flex justify-between font-semibold"><span>{x.t}</span><span>{x.p}</span></div>
              <div className="text-slate-500">from previous step</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function Notifications() {
  const [read, setRead] = useState(false);
  return (
    <Card>
      <div className="flex items-start justify-between p-5">
        <div className="flex items-start gap-2">
          <Bell className="mt-1 size-5 text-sky-500" />
          <div>
            <h3 className="font-semibold text-[18px]">Notifications</h3>
            <p className="text-[13px] text-slate-500">New students, applications, offer letters, tuition payments, and flight dates.</p>
          </div>
        </div>
        <button onClick={() => setRead(true)} className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium">
          <Check className="size-4" /> Mark all read ({read ? 0 : 8})
        </button>
      </div>
      <div className="divide-y border-t">
        {notifications.map((n, i) => (
          <div key={i} className={cn("flex gap-3 px-5 py-3.5", n.unread && !read && "bg-sky-50/50")}>
            {n.unread && !read && <span className="mt-2 size-2 shrink-0 rounded-full bg-sky-600" />}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                {n.tag && <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-slate-500">{n.tag}</span>}
                <span className="font-semibold text-[14.5px]">{n.title}</span>
              </div>
              <p className="truncate-2 text-[13.5px] text-slate-500">{n.desc}</p>
            </div>
            <span className="shrink-0 text-[12px] text-slate-500">{n.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function OnProcess() {
  const rows = [
    { label: "Student", sep: 0, aug: 0, all: 0 },
    { label: "Corporate", sep: 0, aug: 0, all: 0 },
    { label: "Total", sep: 3, aug: 0, all: 3, bold: true },
  ];
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-[18px]">On Process</h3>
          <p className="text-[13px] text-slate-500">Applications with payment complete and visa processing underway.</p>
        </div>
        <Link href="/admin/applications" className="flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold">View <ArrowRight className="size-4" /></Link>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="bg-slate-50 text-[12px] tracking-wide text-slate-500">
              <th className="rounded-l-lg px-4 py-2.5 text-left font-medium"></th>
              <th className="px-4 py-2.5 text-right font-medium">SEPTEMBER</th>
              <th className="px-4 py-2.5 text-right font-medium">AUGUST</th>
              <th className="rounded-r-lg px-4 py-2.5 text-right font-medium">OVERALL</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((r) => (
              <tr key={r.label}>
                <td className={cn("px-4 py-3 text-slate-500", r.bold && "font-semibold text-slate-900")}>{r.label}</td>
                <td className={cn("px-4 py-3 text-right", r.bold && "font-semibold")}>{r.sep}</td>
                <td className={cn("px-4 py-3 text-right", r.bold && "font-semibold")}>{r.aug}</td>
                <td className={cn("px-4 py-3 text-right", r.bold && "font-semibold")}>{r.all}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function NeedsAttention() {
  const items = [
    { v: "2", l: "New leads today" },
    { v: "27", l: "Pending applications" },
    { v: "0", l: "Follow-ups due" },
    { v: "1", l: "Unassigned students" },
    { v: "0", l: "Pending offer letters" },
    { v: "0", l: "Pending invoices" },
    { v: "0", l: "Pending commissions" },
    { v: "349", l: "Visa tasks needing update" },
  ];
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-[18px]">Needs Attention</h3>
          <p className="text-[13px] text-slate-500">Operational items that may need admin action.</p>
        </div>
        <CircleAlert className="size-5 text-sky-500" />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((x) => (
          <div key={x.l} className="rounded-xl border bg-white p-4">
            <div className="text-[24px] font-bold">{x.v}</div>
            <div className="text-[13.5px] text-slate-500">{x.l}</div>
            <Link href="/admin/search" className="mt-1 inline-flex items-center gap-1 text-[13.5px] font-medium text-sky-600">View <ArrowRight className="size-3.5" /></Link>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RecentApplications() {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-[18px]">Recent Applications</h3>
          <p className="text-[13px] text-slate-500">Latest application movement across students and institutions.</p>
        </div>
        <Link href="/admin/applications" className="flex items-center gap-1 font-medium text-sky-600">View all <ArrowRight className="size-4" /></Link>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[820px] text-[13.5px]">
          <thead>
            <tr className="border-b text-left text-[11.5px] tracking-wide text-slate-500">
              <th className="px-3 py-3 font-medium">STUDENT</th>
              <th className="px-3 py-3 font-medium">INSTITUTION / PROGRAM</th>
              <th className="px-3 py-3 font-medium">STATUS</th>
              <th className="px-3 py-3 font-medium">ASSIGNED</th>
              <th className="px-3 py-3 font-medium">LAST UPDATED</th>
              <th className="px-3 py-3 text-right font-medium">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {recentApplications.map((r, i) => (
              <tr key={i} className={i >= 3 ? "bg-slate-50/50" : ""}>
                <td className="px-3 py-4 font-semibold whitespace-nowrap">{r.student}</td>
                <td className="px-3 py-4">
                  <div className="font-semibold text-slate-900">{r.institution}</div>
                  <div className="text-slate-500">{r.program}</div>
                </td>
                <td className="px-3 py-4"><span className="whitespace-nowrap rounded-full bg-sky-50 px-3 py-1 text-[12px] font-medium text-sky-600">{r.status}</span></td>
                <td className="px-3 py-4 whitespace-nowrap text-slate-500">{r.assigned}</td>
                <td className="px-3 py-4 whitespace-nowrap text-slate-500">{r.updated}</td>
                <td className="px-3 py-4 text-right"><Link href="/admin/applications" className="font-medium text-sky-600">Review</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function NewAccounts() {
  const cols = [
    { title: "Students (5)", items: newAccounts.students },
    { title: "Agents (5)", items: newAccounts.agents },
    { title: "Institutions (4)", items: newAccounts.institutions },
  ];
  return (
    <Card className="p-5">
      <h3 className="font-semibold text-[18px]">New Accounts</h3>
      <p className="text-[13px] text-slate-500">Recently added students, agents, and institutions.</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {cols.map((c) => (
          <div key={c.title} className="rounded-xl border p-4">
            <h4 className="mb-3 font-semibold">{c.title}</h4>
            <div className="space-y-2.5">
              {c.items.map((a) => (
                <Link key={a.name} href="/admin/search" className="flex items-center gap-2 rounded-lg border px-3 py-2.5 hover:border-sky-300">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-[14px]">{a.name}</span>
                    <span className="block truncate text-[12px] text-slate-500">{a.sub}</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-slate-500" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RecentActivities() {
  return (
    <Card>
      <div className="flex items-center justify-between p-5 pb-3">
        <h3 className="text-[13px] font-semibold tracking-wide text-sky-500">RECENT ACTIVITIES</h3>
        <span className="text-[12px] text-slate-500">5 total</span>
      </div>
      <div className="divide-y border-t">
        {recentActivities.map((a, i) => (
          <div key={i} className="flex items-start justify-between gap-4 px-5 py-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[14px]">{a.action}</span>
                <span className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-600">USER</span>
              </div>
              <p className="text-[13.5px] text-slate-500">{a.desc}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[12px] text-slate-500">{a.by}</div>
              <div className="text-[13px] font-semibold">{a.date}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function AdminDashboard() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-[26px] font-bold text-slate-900">Dashboard</h1>
      <StatCards />
      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <RegistrationsChart />
        <StatusPie />
      </div>
      <Funnel />
      <Notifications />
      <OnProcess />
      <NeedsAttention />
      <RecentApplications />
      <NewAccounts />
      <RecentActivities />
      <Link href="/admin/search" className="flex items-center justify-center gap-2 rounded-xl border bg-white py-3 text-[13px] text-slate-500">
        End of dashboard — open Search for full reports <ArrowUpRight className="size-4" />
      </Link>
    </div>
  );
}
