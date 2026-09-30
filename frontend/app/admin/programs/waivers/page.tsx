"use client";
import { useState } from "react";
import { X, ChevronDown, ChevronsUpDown, CalendarDays } from "lucide-react";
import { PageCard } from "@/components/admin/admin-ui";
import { cn } from "@/lib/utils";

const inputCls = "w-full rounded border bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-400 placeholder:text-slate-400";

function Label({ children }: { children: React.ReactNode }) {
  return <div className="mb-1.5 text-[14.5px] font-bold text-slate-900">{children}</div>;
}

export default function WaiversPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-bold">Application Fee Waivers</h1>
          <p className="text-[13.5px] text-slate-500">Configure waiver offers that target many programs at once. Active waivers show on the agent, student, and public portals.</p>
        </div>
        <button onClick={() => setOpen(true)} className="rounded bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white">+ New waiver</button>
      </div>
      <PageCard className="grid place-items-center p-14 text-[14px] text-slate-500">
        No fee waivers yet. Create one to get started.
      </PageCard>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-900/30 p-4" onClick={() => setOpen(false)}>
          <div
            className="my-8 w-full max-w-[720px] rounded border bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-5">
              <h2 className="text-[17px] font-bold text-slate-900">New application fee waiver</h2>
              <button onClick={() => setOpen(false)} aria-label="close" className="rounded p-1.5 hover:bg-slate-100"><X className="size-5" /></button>
            </div>

            <div className="max-h-[75vh] space-y-4 overflow-y-auto px-6 py-5">
              <div>
                <Label>Name</Label>
                <input placeholder="e.g. Autumn 2026 Application Fee Waiver" className={inputCls} />
              </div>
              <div>
                <Label>Description</Label>
                <textarea rows={3} className={cn(inputCls, "resize-y")} />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label>Waiver type</Label>
                  <span className="relative block">
                    <select className={cn(inputCls, "appearance-none pr-8")} defaultValue="Percentage (%)">
                      <option>Percentage (%)</option>
                      <option>Fixed amount</option>
                      <option>Full waiver</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  </span>
                </div>
                <div>
                  <Label>Percent off</Label>
                  <input defaultValue="100" className={inputCls} />
                </div>
                <div>
                  <Label>Currency</Label>
                  <span className="relative block">
                    <select className={cn(inputCls, "appearance-none pr-8")} defaultValue="BDT">
                      <option>BDT</option><option>USD</option><option>MYR</option><option>AED</option>
                    </select>
                    <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  </span>
                </div>
                <div>
                  <Label>Valid from</Label>
                  <span className="relative block">
                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                    <input type="date" className={cn(inputCls, "pl-9 text-slate-500")} />
                  </span>
                </div>
                <div>
                  <Label>Valid until</Label>
                  <span className="relative block">
                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                    <input type="date" className={cn(inputCls, "pl-9 text-slate-500")} />
                  </span>
                </div>
                <div>
                  <Label>Status</Label>
                  <span className="relative inline-block w-[110px]">
                    <select className={cn(inputCls, "appearance-none pr-8")} defaultValue="Active">
                      <option>Active</option><option>Paused</option><option>Expired</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  </span>
                </div>
              </div>

              <div className="rounded border p-4">
                <h3 className="text-[15px] font-bold text-slate-900">Targeting</h3>
                <p className="mt-1 text-[13.5px] leading-snug text-slate-500">
                  Leave a list empty to apply with no restriction on that dimension. A program is covered when it matches every non-empty list.
                </p>
                <div className="mt-4 space-y-4">
                  <div>
                    <Label>Institutions</Label>
                    <span className="relative block">
                      <select className={cn(inputCls, "appearance-none pr-9 text-slate-500")} defaultValue="">
                        <option value="" disabled>All institutions</option>
                        <option>Krirk University</option><option>Lincoln University College</option>
                      </select>
                      <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    </span>
                  </div>
                  <div>
                    <Label>Program levels</Label>
                    <span className="relative block">
                      <select className={cn(inputCls, "appearance-none pr-9 text-slate-500")} defaultValue="">
                        <option value="" disabled>All program levels</option>
                        <option>Bachelor&apos;s Degree</option><option>Master&apos;s Degree</option><option>Diploma</option>
                      </select>
                      <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    </span>
                  </div>
                  <div>
                    <Label>Specific programs (optional)</Label>
                    <span className="relative block">
                      <select className={cn(inputCls, "appearance-none pr-9 text-slate-500")} defaultValue="">
                        <option value="" disabled>All programs (within the targets above)</option>
                        <option>Bachelor in Nutrition (Honours)</option>
                      </select>
                      <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 border-t px-6 py-4">
              <button onClick={() => setOpen(false)} className="text-[15px] font-semibold text-slate-900 hover:text-slate-600">Cancel</button>
              <button className="rounded bg-[#1d8fc2] px-4 py-2 text-[15px] font-semibold text-white hover:bg-sky-700">Create waiver</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
