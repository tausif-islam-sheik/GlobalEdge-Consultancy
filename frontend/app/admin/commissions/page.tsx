"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CommissionInvoicePage, AgentCommissionPage } from "@/components/admin/cms-staff-ui";

function Body() {
  const sp = useSearchParams();
  const tab = (sp.get("tab") ?? "").toLowerCase();
  if (tab === "agent") return <AgentCommissionPage />;
  return <CommissionInvoicePage />;
}
export default function Page() {
  return <Suspense><Body /></Suspense>;
}
