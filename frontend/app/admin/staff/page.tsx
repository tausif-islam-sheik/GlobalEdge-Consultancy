"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { StaffPage, RolesPage } from "@/components/admin/cms-staff-ui";

function Body() {
  const sp = useSearchParams();
  const tab = (sp.get("tab") ?? "").toLowerCase();
  if (tab === "roles") return <RolesPage />;
  return <StaffPage />;
}
export default function Page() {
  return <Suspense><Body /></Suspense>;
}
