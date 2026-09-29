"use client";
import { useState } from "react";
import {
  Search, Plus, Pencil, Trash2, Copy, Eye, MapPin, Mail, Phone, ShieldCheck,
  BadgeCheck, Receipt, Wallet, Users, GraduationCap, Building2, FileText, UserPlus, Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- shared ---------- */
function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-xl border bg-white shadow-[0_1px_2px_rgba(0,0,0,.05)]", className)}>{children}</div>;
}
function SearchBox({ placeholder, className }: { placeholder: string; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      <input placeholder={placeholder} className="w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-sky-400" />
    </div>
  );
}
function FilterSelect({ options, className, defaultValue }: { options: string[]; className?: string; defaultValue?: string }) {
  const [v, setV] = useState(defaultValue ?? options[0]);
  return (
    <div className={cn("relative", className)}>
      <select value={v} onChange={(e) => setV(e.target.value)} className="w-full appearance-none rounded-lg border bg-white px-3 py-2.5 pr-8 text-sm outline-none focus:border-sky-400">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">⌄</span>
    </div>
  );
}
function FooterPager({ left, right = true }: { left: React.ReactNode; right?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-1 py-3 text-[13px] text-slate-500">
      <span className="flex items-center gap-2">{left}</span>
      {right && (
        <span className="flex items-center gap-2"><b className="text-slate-800">Page 1 of 1</b>
          <button className="rounded-lg border bg-white px-3 py-1.5 text-slate-400">‹ Prev</button>
          <button className="rounded-lg border bg-white px-3 py-1.5">Next ›</button>
        </span>
      )}
    </div>
  );
}
function EditDelete() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button className="flex items-center justify-center gap-1.5 rounded-lg border bg-white px-3 py-2 text-sm font-semibold"><Pencil className="size-4" /> Edit</button>
      <button className="flex items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600"><Trash2 className="size-4" /> Delete</button>
    </div>
  );
}
function Banner({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="relative h-[190px] overflow-hidden rounded-t-xl bg-gradient-to-br from-sky-600 via-indigo-700 to-slate-900 p-4 text-white">
      <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 80% 20%, #fbbf24 0, transparent 40%), radial-gradient(circle at 10% 90%, #22d3ee 0, transparent 40%)" }} />
      <div className="relative text-[11px] font-bold tracking-wide text-sky-200">CREATIVE CONSULTANCY × PARTNER</div>
      <div className="relative mt-1 text-[17px] font-extrabold leading-tight">{title}</div>
      {sub && <div className="relative mt-1 text-[12px] text-sky-100">{sub}</div>}
      <div className="absolute bottom-3 left-4 rounded bg-black/40 px-2 py-1 text-[10px]">ccapply.com</div>
    </div>
  );
}

/* ---------- 1. Commission Invoice ---------- */
export function CommissionInvoicePage() {
  return (
    <div className="space-y-4 p-4">
      <div><h1 className="text-[24px] font-bold">Commission Invoice</h1>
        <p className="text-[14px] text-slate-500">Generate and manage commissions for approved student visa applications.</p></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { l: "APPROVED VISAS", v: "1", icon: <BadgeCheck className="size-5 text-sky-500" /> },
          { l: "COMMISSIONS GENERATED", v: "1", icon: <Receipt className="size-5 text-green-600" /> },
          { l: "PAID", v: "1", icon: <span className="text-[18px] text-sky-600">✓✓</span> },
          { l: "DIRECT STUDENTS", v: "1", icon: <Users className="size-5 text-sky-500" /> },
        ].map((s) => (
          <Card key={s.l} className="border-sky-200 bg-sky-50/60 p-5">
            <div className="flex items-start justify-between"><span className="text-[12px] font-medium text-slate-500">{s.l}</span><span className="grid size-10 place-items-center rounded-lg bg-sky-100">{s.icon}</span></div>
            <div className="mt-1 text-[30px] font-extrabold leading-none text-sky-500">{s.v}</div>
          </Card>
        ))}
      </div>
      <div className="grid gap-2 md:grid-cols-[350px_260px]">
        <SearchBox placeholder="Search student, program..." />
        <FilterSelect options={["All institutions", "ALFA University College (AUC)", "SEGi University"]} />
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-[14px]">
          <thead><tr className="border-b text-left"><th className="px-4 py-3"><input type="checkbox" className="size-4" /></th><th className="px-2 py-3 font-semibold">Student</th><th className="px-2 py-3 font-semibold">University / Program</th><th className="px-2 py-3 font-semibold">Agent</th><th className="px-2 py-3 font-semibold">Commission</th><th className="px-2 py-3 font-semibold">Status</th><th className="px-4 py-3" /></tr></thead>
          <tbody>
            <tr>
              <td className="px-4 py-4"><input type="checkbox" className="size-4" /></td>
              <td className="px-2 py-4"><div className="font-bold">Pixlabit IT</div><div className="text-slate-500">pixlabit@gmail.com</div><span className="mt-1 inline-block rounded-full border px-2.5 py-0.5 text-[12px]">Direct</span></td>
              <td className="px-2 py-4"><div className="font-bold">ALFA University College (AUC)</div><div className="text-slate-500">Bachelor of Computer Science (Cyber Security and Networks)</div></td>
              <td className="px-2 py-4 text-slate-500">—</td>
              <td className="px-2 py-4"><div className="font-bold">MYR 640.00</div><div className="text-slate-500">4% of fee</div></td>
              <td className="px-2 py-4"><span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[12px] font-semibold text-green-700">Paid</span></td>
              <td className="px-4 py-4 text-right font-bold">•••</td>
            </tr>
          </tbody>
        </table>
      </Card>
      <FooterPager left={<>SHOWING <span className="rounded-lg border bg-white px-3 py-1.5">20 ⌄</span> 1 approved visa student</>} />
    </div>
  );
}

/* ---------- 2. Agent Commission ---------- */
export function AgentCommissionPage() {
  return (
    <div className="space-y-4 p-4">
      <div><h1 className="text-[24px] font-bold">Agent Commission</h1>
        <p className="text-[14px] text-slate-500">Commission invoices agents have claimed, and their payment status.</p></div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-sky-200 bg-sky-50/60 p-5"><div className="flex justify-between"><span className="text-[12px] text-slate-500">INVOICES CLAIMED</span><span className="grid size-10 place-items-center rounded-lg bg-sky-100"><FileText className="size-5 text-sky-500" /></span></div><div className="mt-1 text-[30px] font-extrabold text-sky-500">0</div></Card>
        <Card className="border-green-200 bg-green-50/60 p-5"><div className="flex justify-between"><span className="text-[12px] text-slate-500">PAID</span><span className="grid size-10 place-items-center rounded-lg bg-green-100"><BadgeCheck className="size-5 text-green-600" /></span></div><div className="mt-1 text-[30px] font-extrabold text-green-700">0</div><span className="text-[13px] font-medium text-green-700">View →</span></Card>
        <Card className="border-sky-200 bg-sky-50/60 p-5"><div className="flex justify-between"><span className="text-[12px] text-slate-500">PAID AMOUNT</span><span className="grid size-10 place-items-center rounded-lg bg-sky-100"><Wallet className="size-5 text-sky-600" /></span></div><div className="mt-1 text-[30px] font-extrabold text-sky-700">$0.00</div></Card>
      </div>
      <div className="grid gap-2 md:grid-cols-[400px_240px]">
        <SearchBox placeholder="Search agent, student, institution, invoice..." />
        <FilterSelect options={["All statuses", "Paid", "Pending", "Claimed"]} />
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-[14px]">
          <thead><tr className="border-b text-left"><th className="px-4 py-3 font-semibold">Agent</th><th className="px-2 py-3 font-semibold">Student / Program</th><th className="px-2 py-3 font-semibold">Institution</th><th className="px-2 py-3 font-semibold">Amount</th><th className="px-2 py-3 font-semibold">Claimed On</th><th className="px-4 py-3 font-semibold">Status</th></tr></thead>
          <tbody><tr><td colSpan={6} className="px-4 py-14 text-center text-slate-500">No agent has claimed a commission invoice yet.</td></tr></tbody>
        </table>
      </Card>
      <FooterPager left={<>SHOWING <span className="rounded-lg border bg-white px-3 py-1.5">10 ⌄</span> 0 of 0 row(s) selected.</>} />
    </div>
  );
}

/* ---------- 3/4/5 generic post cards ---------- */
export type Post = { date: string; title: string; excerpt: string; badge?: string };
export function PostCards({ title, sub, cta, posts }: { title: string; sub: string; cta: string; posts: Post[] }) {
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h1 className="text-[26px] font-bold">{title}</h1><p className="text-[14px] text-slate-500">{sub}</p></div>
        <button className="flex items-center gap-1 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white"><Plus className="size-4" /> {cta}</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((p) => (
          <Card key={p.title} className="overflow-hidden">
            <Banner title={p.title.slice(0, 42)} />
            <div className="space-y-2.5 p-4">
              <div className="flex items-center justify-between text-[13.5px]"><span className="text-slate-500">{p.date}</span>{p.badge && <span className="rounded-full bg-amber-400 px-3 py-0.5 text-[12px] font-bold">{p.badge}</span>}</div>
              <h3 className="line-clamp-2 min-h-[52px] text-[17px] font-bold leading-snug">{p.title}</h3>
              <p className="line-clamp-3 text-[14px] text-slate-500">{p.excerpt}</p>
              <EditDelete />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export const announcementPosts: Post[] = [
  { date: "14 Mar 2026", badge: "Student", title: "Study in UK from Bangladesh", excerpt: "Are you a Bangladeshi student dreaming of a degree from a prestigious UK university? With world-class education, a vibrant multicultural environment, and th..." },
  { date: "14 Mar 2026", badge: "Student", title: "Study Abroad Without IELTS for Bangladeshi Students", excerpt: "Are you dreaming of a world-class degree but feel held back by the IELTS exam? In Bangladesh, the English language proficiency test is often seen as a..." },
  { date: "14 Mar 2026", badge: "Student", title: "Top 20 Countries for MBBS Abroad for Bangladeshi Students: 2025–2026 Ultimat...", excerpt: "For a Bangladeshi student, the journey to becoming a doctor is one of the most respected yet challenging paths. With over 1.5 lakh students appearing for the..." },
];
export const newsPosts: Post[] = [
  { date: "08 Sept 2026", title: "Creative Consultancy Partners with SEGi University Malaysia to Strengthen Student...", excerpt: "Looking for SEGi University admission in Bangladesh? Creative Consultancy supports students with programme selection, applications, scholarships, EMG..." },
  { date: "07 Sept 2026", title: "Creative Consultancy Becomes an Official Recruitment Partner of INTI International...", excerpt: "Creative Consultancy signed its official recruitment agreement with INTI International University in September 2024, strengthening admission support fo..." },
  { date: "07 Sept 2026", title: "Creative Consultancy Strengthens Partnership with University of Cyberjaya...", excerpt: "A partnership built on trust, performance, and a shared commitment to helping students make better decisions about their future. Creative Consultancy is proud to..." },
];
export const blogPosts: Post[] = [
  { date: "19 Aug 2026", title: "Creative Consultancy (CCApply): Four Consecutive Years of Connecting Quality...", excerpt: "Quality Students. Responsible Recruitment. Stronger University Partnerships. For four consecutive years, Creative Consultancy (CCApply) has worked with a cle..." },
  { date: "09 Aug 2026", title: "About CCApply – A Global Study Abroad and International Education Platform", excerpt: "CCApply is an international education and study abroad brand that helps students explore global higher education opportunities and supports their journey..." },
  { date: "09 Aug 2026", title: "Creative Consultancy Is CCApply: One Company, One Brand, One Global Educati...", excerpt: "If you've come across Creative Consultancy and CCApply , you may have had a simple question: Are they the same company? Yes, they are. There aren't t..." },
];

/* ---------- 6. Reviews ---------- */
export function ReviewsPage() {
  const cards = [
    { name: "Sheikh Sigma Alam Mishu", prog: "Diploma in Information & Communicati...", title: "A New Beginning at APU Malaysia with My Student Visa Approval", text: "Receiving my Malaysian student visa is an exciting milestone as I prepare to study Information and Communication Technology at Asia Pacific University (APU). I appreciate Creative Consultancy for helping ..." },
    { name: "Mahir Abhsar Dhrubo", prog: "Foundation in Business | INTI Internation...", title: "Starting My International Education Journey at INTI Malaysia", text: "Alhamdulillah! My Malaysian student visa has been approved, and I am ready to begin my Foundation in Business at INTI International University. I would like to express my gratitude to Creative Consultancy for..." },
    { name: "MD Tanjijul Alam Saif", prog: "Bachelor of Arts (Honours) in Marketing...", title: "Turning My Digital Marketing Ambitions into Reality at APU Malaysia", text: "I am thrilled to have secured my Malaysian student visa to study Marketing Management with a specialism in Digital Marketing at Asia Pacific University (APU). My thanks go to Creative Consultancy for their assistance..." },
  ];
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h1 className="text-[26px] font-bold">Student Reviews</h1><p className="text-[14px] text-slate-500">Manage public student testimonials shown on the website.</p></div>
        <button className="flex items-center gap-1 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white"><Plus className="size-4" /> Create Review</button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-sky-200 bg-sky-50/60 p-5"><div className="flex justify-between"><span className="text-[12px] text-slate-500">TOTAL REVIEWS</span><span className="grid size-10 place-items-center rounded-lg bg-sky-100">💬</span></div><div className="mt-1 text-[30px] font-extrabold text-sky-500">75</div></Card>
        <Card className="border-sky-200 bg-sky-50/60 p-5"><div className="flex justify-between"><span className="text-[12px] text-slate-500">WITH IMAGES</span><span className="grid size-10 place-items-center rounded-lg bg-sky-100">🖼️</span></div><div className="mt-1 text-[30px] font-extrabold text-sky-600">75</div></Card>
        <Card className="border-green-200 bg-green-50/60 p-5"><div className="flex justify-between"><span className="text-[12px] text-slate-500">SHOWING</span><span className="grid size-10 place-items-center rounded-lg bg-green-100">👤</span></div><div className="mt-1 text-[30px] font-extrabold text-green-700">12</div></Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.name} className="p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-sky-200 to-green-200 text-lg">👤</span>
              <div className="min-w-0"><div className="truncate text-[16px] font-bold">{c.name}</div><div className="truncate text-[13px] text-slate-500">{c.prog}</div></div>
            </div>
            <h3 className="mt-3 text-[16px] font-bold leading-snug">{c.title}</h3>
            <div className="text-[13px] text-slate-500">24 Sept 2026</div>
            <p className="mt-3 line-clamp-4 text-[14px] text-slate-500">{c.text}</p>
            <div className="mt-4"><EditDelete /></div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------- 7. Staff ---------- */
export function StaffPage() {
  const rows = [
    { name: "Dr. Ekramul Haque", badge: "Account owner", id: "Staff ID: 2dc5fc4f", email: "eakramulhaque.edu@gmail.com", role: "Managing Director", phone: "+880 01788521234", rolePill: "SUPER_ADMIN", status: "2 students / 0 institutes / 0 agents", created: "10 Feb 2026" },
    { name: "Takrima Tajnoor Tofa", id: "Staff ID: 2026001", email: "takrimatajnoor@gmail.com", role: "", phone: "", rolePill: "Teacher", status: "0 students / 0 institutes / 0 agents", created: "29 Sept 2026" },
    { name: "Sadia Alam", id: "Staff ID: CC66655554", email: "teacher@ccapply.com", role: "Teacher", phone: "+880 01712345678", rolePill: "Teacher", status: "0 students / 0 institutes / 0 agents", created: "16 Sept 2026" },
  ];
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h1 className="text-[24px] font-bold">Staff Members</h1><p className="text-[14px] text-slate-500">Manage team access, roles, and staff accounts.</p></div>
        <button className="flex items-center gap-1 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white"><Plus className="size-4" /> Add Staff</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-sky-200 bg-sky-50/60 p-5"><div className="flex justify-between"><span className="text-[12px] text-slate-500">TOTAL STAFF</span><span className="grid size-10 place-items-center rounded-lg bg-sky-100">👥</span></div><div className="mt-1 text-[30px] font-extrabold text-sky-500">9</div></Card>
        <Card className="border-green-200 bg-green-50/60 p-5"><div className="flex justify-between"><span className="text-[12px] text-slate-500">ACTIVE</span><span className="grid size-10 place-items-center rounded-lg bg-green-100">🧑‍💼</span></div><div className="mt-1 text-[30px] font-extrabold text-green-700">9</div></Card>
        <Card className="border-amber-200 bg-amber-100/70 p-5"><div className="flex justify-between"><span className="text-[12px] text-slate-500">INACTIVE</span><span className="grid size-10 place-items-center rounded-lg bg-amber-200">🚫</span></div><div className="mt-1 text-[30px] font-extrabold text-amber-700">0</div></Card>
        <Card className="border-sky-200 bg-sky-50/60 p-5"><div className="flex justify-between"><span className="text-[12px] text-slate-500">ROLES</span><span className="grid size-10 place-items-center rounded-lg bg-sky-100"><ShieldCheck className="size-5 text-sky-600" /></span></div><div className="mt-1 text-[30px] font-extrabold text-sky-600">8</div></Card>
      </div>
      <div className="grid gap-2 md:grid-cols-[400px_280px]">
        <SearchBox placeholder="Search staff, email, role, or status" />
        <FilterSelect options={["All roles", "SUPER_ADMIN", "Teacher", "HR Admin", "Director"]} />
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[1020px] text-[14px]">
          <thead><tr className="border-b text-left"><th className="px-4 py-3"><input type="checkbox" className="size-4" /></th><th className="px-2 py-3 font-semibold">Staff Member</th><th className="px-2 py-3 font-semibold">Roles</th><th className="px-2 py-3 font-semibold">Status</th><th className="px-2 py-3 font-semibold">Created</th><th className="px-2 py-3 font-semibold">NID</th><th className="px-4 py-3" /></tr></thead>
          <tbody className="divide-y">
            {rows.map((r) => (
              <tr key={r.email} className="align-top">
                <td className="px-4 py-4"><input type="checkbox" className="size-4" /></td>
                <td className="px-2 py-4"><div className="flex items-center gap-2"><span className="grid size-10 place-items-center rounded-full bg-slate-200">👤</span><span className="font-bold">{r.name}</span>{r.badge && <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[12px] font-bold">{r.badge}</span>}</div>
                  <div className="mt-1 text-slate-500">{r.id}</div><div className="text-slate-500">{r.email} <Copy className="inline size-3" /></div>
                  {r.role && <div className="text-slate-500">{r.role}</div>}{r.phone && <div className="text-slate-500">{r.phone}</div>}</td>
                <td className="px-2 py-4"><span className="rounded-full border px-3 py-1 text-[12px] font-semibold">{r.rolePill}</span></td>
                <td className="px-2 py-4"><span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[12px] font-bold text-sky-600">ACTIVE</span><div className="mt-1 text-[12.5px] text-slate-500">{r.status}</div></td>
                <td className="px-2 py-4 text-slate-500">{r.created}</td>
                <td className="px-2 py-4 text-slate-500">Not uploaded</td>
                <td className="px-4 py-4 font-bold">•••</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ---------- 8. Roles ---------- */
export function RolesPage() {
  const roles = [
    { name: "Teacher", perms: "22 permissions", menus: "8 menus", pills: ["admin.view_dashboard", "admin.view_institutions", "admin.view_programs", "admin.view_applications", "admin.view_students", "admin.manage_live_classes", "live_classes.view.own", "live_classes.add"], more: "+14" },
    { name: "Director", perms: "52 permissions", menus: "14 menus", pills: ["admin.manage_leads", "admin.manage_reviews", "admin.view_dashboard", "admin.view_institutions", "admin.activate_institutions", "admin.delete_institutions", "admin.view_programs", "admin.view_applications"], more: "+44" },
    { name: "HR Admin", perms: "40 permissions", menus: "12 menus", pills: ["admin.manage_leads", "admin.view_dashboard", "admin.view_institutions", "admin.activate_institutions", "admin.view_programs", "admin.delete_programs", "admin.view_applications", "admin.view_students"], more: "+32" },
    { name: "Agent Counsellor", sys: true, perms: "21 permissions", menus: "15 menus", pills: ["admin.view_dashboard", "admin.view_leads", "admin.view_students"], more: "+18" },
  ];
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h1 className="text-[24px] font-bold">Roles & Permissions</h1><p className="text-[14px] text-slate-500">Create custom admin staff roles with permission and menu access controls.</p></div>
        <button className="flex items-center gap-1 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white"><Plus className="size-4" /> Create Role</button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5"><div className="text-[12px] text-slate-500">ROLES</div><div className="text-[26px] font-bold">7</div></Card>
        <Card className="p-5"><div className="text-[12px] text-slate-500">PERMISSIONS</div><div className="text-[26px] font-bold">83</div></Card>
        <Card className="p-5"><div className="text-[12px] text-slate-500">MENU OPTIONS</div><div className="text-[26px] font-bold">19</div></Card>
      </div>
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3 p-5">
          <div><h2 className="text-[17px] font-bold">Role Access</h2><p className="text-[13.5px] text-slate-500">Manage action permissions and sidebar visibility for admin staff.</p></div>
          <SearchBox placeholder="Search roles" className="w-[280px]" />
        </div>
        <div className="divide-y border-t">
          {roles.map((r) => (
            <div key={r.name} className="flex flex-wrap items-start justify-between gap-3 p-5">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2"><b>{r.name}</b>{r.sys && <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[12px] font-bold">System role</span>}<span className="rounded-full border px-2.5 py-0.5 text-[12px]">{r.perms}</span><span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[12px] font-bold">{r.menus}</span></div>
                <div className="mt-2 flex flex-wrap gap-1.5">{r.pills.map((p) => <span key={p} className="rounded-full bg-amber-400 px-2.5 py-1 text-[12px] font-semibold">{p}</span>)}<span className="rounded-full border px-2.5 py-1 text-[12px]">{r.more}</span></div>
              </div>
              <div className="flex gap-2"><button className="flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-semibold"><Pencil className="size-4" /> Edit</button><button className="rounded-lg border p-2"><Copy className="size-4" /></button><button className="rounded-lg bg-red-50 p-2 text-red-500"><Trash2 className="size-4" /></button></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ---------- 9. Settings ---------- */
export function SettingsPage() {
  const [phones, setPhones] = useState(["+8801788521234", "+8801332106562", "+8801332106563", "+8801332106564"]);
  const [tab, setTab] = useState("Contact");
  const tabs = ["Contact", "Website", "Media", "Pages", "Configuration", "Email Templates", "Backup", "Commissions", "Modules", "System"];
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h1 className="text-[26px] font-bold">System Settings</h1><p className="text-[14px] text-slate-500">Manage website content, footer contact details, media, and legal pages.</p></div>
        <button className="flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white"><Save className="size-4" /> Save Changes</button>
      </div>
      <div className="flex flex-wrap gap-1 rounded-xl bg-sky-200/70 p-1.5">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold", tab === t ? "bg-white text-sky-600 shadow" : "text-slate-800 hover:bg-white/60")}><MapPin className={cn("size-4", tab === t && "text-sky-500")} />{t}</button>
        ))}
      </div>
      <Card className="p-6">
        <div className="flex items-start gap-3"><span className="grid size-11 place-items-center rounded-lg bg-sky-50 text-sky-500"><MapPin className="size-5" /></span>
          <div><h2 className="text-[18px] font-bold">Footer Contact</h2><p className="text-[14px] text-slate-500">Contact information displayed in the public footer.</p></div></div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="block"><span className="mb-1.5 block text-[14px] font-semibold">Support Email</span>
            <span className="flex items-center gap-2 rounded-lg border px-3 py-2.5"><Mail className="size-4 text-slate-400" /><input defaultValue="support@ccapply.com" className="w-full bg-transparent text-sm outline-none" /></span></label>
          <label className="block"><span className="mb-1.5 block text-[14px] font-semibold">Google Map Location Link</span>
            <span className="flex items-center gap-2 rounded-lg border px-3 py-2.5"><MapPin className="size-4 text-slate-400" /><input defaultValue="https://maps.app.goo.gl/NG69g2jhnJ1XLwP4A" className="w-full bg-transparent text-sm outline-none" /></span>
            <span className="mt-1 block text-[13px] text-slate-500">The public footer button opens this link in a new tab.</span></label>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between"><span className="text-[14px] font-semibold">Footer Phone Numbers</span><button onClick={() => setPhones((p) => [...p, ""])} className="flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-semibold"><Plus className="size-4" /> Add Phone</button></div>
          <div className="mt-3 space-y-2.5">
            {phones.map((ph, i) => (
              <div key={i} className="flex gap-2">
                <span className="flex flex-1 items-center gap-2 rounded-lg border px-3 py-2.5"><Phone className="size-4 text-slate-400" /><input value={ph} onChange={(e) => setPhones((p) => p.map((x, j) => (j === i ? e.target.value : x)))} className="w-full bg-transparent text-sm outline-none" /></span>
                <button onClick={() => setPhones((p) => p.filter((_, j) => j !== i))} className="rounded-lg border p-2.5"><Trash2 className="size-4" /></button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ---------- 10. Profile ---------- */
export function ProfilePage() {
  const [tab, setTab] = useState("Performance");
  return (
    <div className="grid gap-4 p-4 lg:grid-cols-[340px_1fr]">
      <Card className="h-fit p-6 text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-slate-200 text-3xl">👤</div>
        <h2 className="mt-3 text-[20px] font-bold">Dr. Eakramul Haque</h2>
        <div className="text-[14px] text-slate-500">Managing Director</div>
        <div className="text-[14px] text-slate-500">eakramulhaque.edu@gmail.com</div>
        <div className="text-[14px] text-slate-500">+880 1788521234 🟢</div>
        <div className="mt-2 flex justify-center gap-2"><span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-0.5 text-[12px] font-bold text-sky-600">Active</span><span className="rounded-full border px-3 py-0.5 text-[12px] font-semibold">SUPER_ADMIN</span></div>
        <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border py-2.5 text-sm font-semibold"><Pencil className="size-4" /> Edit profile</button>
      </Card>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1.5 text-sm font-semibold">
          {["Performance", "Reviews", "Overview", "Personal & Family", "Job & Education", "Documents"].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={cn("rounded-lg px-4 py-2", tab === t ? "bg-sky-100 text-sky-600" : "text-slate-500")}>{t}</button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { l: "STUDENTS", v: "2", icon: <GraduationCap className="size-5 text-sky-500" /> },
            { l: "INSTITUTES", v: "0", icon: <Building2 className="size-5 text-sky-600" /> },
            { l: "AGENTS", v: "0", icon: <UserPlus className="size-5 text-green-600" /> },
            { l: "APPLICATIONS", v: "2", icon: <FileText className="size-5 text-amber-700" /> },
          ].map((s) => (
            <Card key={s.l} className="border-sky-200 bg-sky-50/60 p-4"><div className="flex justify-between"><span className="text-[12px] text-slate-500">{s.l}</span><span className="grid size-10 place-items-center rounded-lg bg-sky-100">{s.icon}</span></div><div className="mt-1 text-[28px] font-extrabold text-sky-500">{s.v}</div></Card>
          ))}
        </div>
        <h3 className="text-[15px] font-bold">Recently assigned</h3>
        <div className="grid gap-4 xl:grid-cols-2">
          <Card>
            <div className="flex items-start justify-between border-b bg-sky-50/50 p-4"><div className="flex items-center gap-2"><span className="grid size-9 place-items-center rounded-lg bg-sky-100">👥</span><div><b>Leads</b><div className="text-[13px] text-slate-500">Most recent 5 assigned</div></div></div><span className="text-sm font-semibold">View more →</span></div>
            <div className="divide-y">{[["sadakj sadakj", "28 Sept 2026", "New"], ["Sumaiya Jannat Rayha", "28 Sept 2026", "New"], ["Dr. NUSRAT JAHAN NISHU", "12 Sept 2026", "New"], ["MD FORHAD HOSEN", "08 Sept 2026", "New"], ["SUJAN SAMI", "23 Aug 2026", "Converted"]].map(([n, d, s]) => (
              <div key={n} className="flex items-center justify-between px-4 py-2.5"><div><div className="font-semibold">{n}</div><div className="text-[12.5px] text-slate-500">{d}</div></div><span className="rounded-full border px-2.5 py-0.5 text-[12px]">{s}</span></div>
            ))}</div>
          </Card>
          <Card>
            <div className="flex items-start justify-between border-b bg-green-50/50 p-4"><div className="flex items-center gap-2"><span className="grid size-9 place-items-center rounded-lg bg-green-100">👥</span><div><b>Visitors</b><div className="text-[13px] text-slate-500">Most recent 5 assigned</div></div></div><span className="text-sm font-semibold">View more →</span></div>
            <div className="divide-y">{[["APPOINTMENT", "28 Sept 2026", "Scheduled"], ["PhD in Public Health", "12 Sept 2026", "Completed"], ["Low budget higher education flying wit...", "08 Sept 2026", "Scheduled"]].map(([n, d, s]) => (
              <div key={n} className="flex items-center justify-between px-4 py-2.5"><div><div className="font-semibold">{n}</div><div className="text-[12.5px] text-slate-500">{d}</div></div><span className="rounded-full border px-2.5 py-0.5 text-[12px]">{s}</span></div>
            ))}</div>
          </Card>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          <Card className="border-amber-300 bg-amber-50/50 p-4"><div className="flex justify-between"><b>Followups</b><span className="text-sm font-semibold">View more →</span></div><div className="text-[13px] text-slate-500">Most recent 5 assigned</div></Card>
          <Card className="border-violet-300 bg-violet-50/50 p-4"><div className="flex justify-between"><b>Students</b><span className="text-sm font-semibold">View more →</span></div><div className="text-[13px] text-slate-500">Most recent 5 assigned</div></Card>
        </div>
      </div>
    </div>
  );
}

/* ---------- 11. Change password ---------- */
export function ChangePasswordPage() {
  const [show, setShow] = useState([false, false, false]);
  const toggle = (i: number) => setShow((s) => s.map((v, j) => (j === i ? !v : v)));
  const fields = [
    { label: "Current password", ph: "Enter your current password", hint: "" },
    { label: "New password", ph: "Enter a new password", hint: "Use at least 8 characters with uppercase, lowercase, and a number." },
    { label: "Confirm new password", ph: "Re-enter your new password", hint: "" },
  ];
  return (
    <div className="mx-auto max-w-[820px] space-y-4 p-4">
      <div><h1 className="text-[26px] font-bold">Change Password</h1><p className="text-[14px] text-slate-500">Update the password you use to access your admin account.</p></div>
      <Card className="overflow-hidden">
        <div className="flex items-start gap-3 border-b p-5"><span className="grid size-11 place-items-center rounded-lg bg-sky-50 text-sky-500"><ShieldCheck className="size-5" /></span>
          <div><h2 className="text-[17px] font-bold">Security</h2><p className="text-[14px] text-slate-500">Choose a strong password that you do not use elsewhere.</p></div></div>
        <div className="space-y-4 p-5">
          {fields.map((f, i) => (
            <label key={f.label} className="block">
              <span className="mb-1.5 block text-[14px] font-semibold">{f.label}</span>
              <span className="flex items-center gap-2 rounded-lg border px-3 py-2.5">
                <input type={show[i] ? "text" : "password"} placeholder={f.ph} className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
                <button type="button" onClick={() => toggle(i)}><Eye className="size-4 text-slate-400" /></button>
              </span>
              {f.hint && <span className="mt-1 block text-[13px] text-slate-500">{f.hint}</span>}
            </label>
          ))}
          <div className="flex justify-end"><button className="rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white">Update Password</button></div>
        </div>
      </Card>
    </div>
  );
}
