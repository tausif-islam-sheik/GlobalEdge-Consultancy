"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ApplicationsHeader, AppStatCards, ApplicationsTable, DeferralPage, RefundPage, ChecklistPage } from "@/components/admin/ccapply-ui";

function Body() {
  const sp = useSearchParams();
  const tab = (sp.get("tab") ?? "all").toLowerCase();
  if (tab === "deferral") return <DeferralPage />;
  if (tab === "refund") return <RefundPage />;
  if (tab === "checklist") return <ChecklistPage kind="app" />;
  if (tab === "visa") return <ChecklistPage kind="visa" />;
  const filter = tab === "review" ? "UNDER REVIEW" : tab === "accepted" ? "ACCEPTED" : tab === "rejected" ? "REJECTED" : "ALL";
  return (
    <div className="space-y-4 p-4">
      <ApplicationsHeader />
      <AppStatCards />
      <ApplicationsTable filter={filter} />
    </div>
  );
}

export default function ApplicationsPage() {
  return (
    <Suspense>
      <Body />
    </Suspense>
  );
}
