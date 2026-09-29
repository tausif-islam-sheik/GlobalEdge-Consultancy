"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AgentsPage, AgreementPage } from "@/components/admin/ccapply-ui";

function Body() {
  const sp = useSearchParams();
  const tab = (sp.get("tab") ?? "all").toLowerCase();
  if (tab === "agreement") return <AgreementPage />;
  return <AgentsPage />;
}

export default function Page() {
  return (
    <Suspense>
      <Body />
    </Suspense>
  );
}
