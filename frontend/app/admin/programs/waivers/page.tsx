import { PageCard } from "@/components/admin/admin-ui";

export default function WaiversPage() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-bold">Application Fee Waivers</h1>
          <p className="text-[13.5px] text-slate-500">Configure waiver offers that target many programs at once. Active waivers show on the agent, student, and public portals.</p>
        </div>
        <button className="rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white">+ New waiver</button>
      </div>
      <PageCard className="grid place-items-center p-14 text-[14px] text-slate-500">
        No fee waivers yet. Create one to get started.
      </PageCard>
    </div>
  );
}
