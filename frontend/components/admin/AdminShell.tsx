"use client";
import { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const CRUMBS: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/apply": "Apply",
  "/admin/search": "Search",
  "/admin/institutions": "Institution",
  "/admin/programs": "Program",
  "/admin/programs/waivers": "Application Fee Waivers",
  "/admin/programs/faculties": "Faculties",
  "/admin/programs/levels": "Study Levels",
  "/admin/programs/durations": "Durations",
  "/admin/leads": "Leads",
  "/admin/visitors": "Visitors",
  "/admin/followups": "Followups",
  "/admin/students": "Students",
  "/admin/students/new": "Add New Student",
  "/admin/students/pending": "Students",
  "/admin/students/verified": "Students",
  "/admin/students/success": "Students",
  "/admin/applications": "Applications",
  "/admin/live-classes": "Live Classes",
  "/admin/agents": "Agents",
  "/admin/commissions": "Commission Invoice",
  "/admin/announcements": "Announcement",
  "/admin/news": "News",
  "/admin/blogs": "Blogs",
  "/admin/reviews": "Reviews",
  "/admin/staff": "Staff",
  "/admin/settings": "Settings",
  "/admin/profile": "Profile",
  "/admin/change-password": "Change Password",
};

function ShellInner({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const path = usePathname();
  const sp = useSearchParams();
  const tab = sp.get("tab");
  const { user, ready } = useAuth();
  const router = useRouter();

  if (ready && user && user.role !== "ADMIN") {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 p-6">
        <div className="max-w-md rounded-xl border bg-white p-8 text-center">
          <h1 className="text-xl font-bold">Admins only</h1>
          <p className="mt-2 text-sm text-slate-500">Your account ({user.role}) cannot access the admin panel.</p>
          <button onClick={() => router.push("/")} className="mt-4 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const tabLabels: Record<string, string> = {
    review: "Under Review",
    accepted: "Accepted Applications",
    rejected: "Rejected Applications",
    deferral: "Deferral Request",
    refund: "Refund Request",
    checklist: "Application Checklist Templates",
    visa: "Visa Checklist Templates",
    agreement: "Agreement",
    agent: "Agent Commission",
    roles: "Roles & Permissions",
  };
  let crumb = CRUMBS[path] ?? path.split("/").pop()?.replace(/-/g, " ") ?? "Dashboard";
  if (tab && tabLabels[tab]) crumb = tabLabels[tab];
  const pretty = crumb.charAt(0).toUpperCase() + crumb.slice(1);

  return (
    <div className={cn("min-h-screen", dark ? "bg-[#0b1526] text-slate-100" : "bg-[#f7f9fc] text-slate-800")}>
      <div className="flex">
        <AdminSidebar active={tab ? `${path}?tab=${tab}` : path} />
        <div className="min-w-0 flex-1">
          <AdminTopbar dark={dark} onDark={() => setDark((d) => !d)} crumb={pretty} />
          <main className={cn("mx-auto max-w-[1280px]", dark && "[&_div]:!border-slate-700 [&_.bg-white]:!bg-slate-900")}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <ShellInner>{children}</ShellInner>
    </Suspense>
  );
}
