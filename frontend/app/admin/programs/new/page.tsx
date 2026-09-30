"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Plus, Trash2, Upload, ImagePlus, ChevronDown, ChevronsUpDown,
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Code2, Link2, Image as ImageIcon, Table, Undo2, Highlighter,
} from "lucide-react";
import { PageCard, Field, inputCls } from "@/components/admin/admin-ui";
import { cn } from "@/lib/utils";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function EditorToolbar() {
  return (
    <div className="flex flex-wrap items-center gap-1.5 border-b px-3 py-2 text-slate-600">
      <span className="flex items-center gap-1 rounded border px-2.5 py-1.5 text-[13px] text-slate-500">Paragraph <ChevronDown className="size-3.5" /></span>
      <span className="flex items-center gap-1 rounded border px-2.5 py-1.5 text-[13px] text-slate-500">Font <ChevronDown className="size-3.5" /></span>
      <span className="flex items-center gap-1 rounded border px-2.5 py-1.5 text-[13px] text-slate-500">Size <ChevronDown className="size-3.5" /></span>
      <span className="mx-1 h-6 w-px bg-slate-200" />
      <button className="p-1.5 hover:bg-slate-100 rounded"><Bold className="size-4" /></button>
      <button className="p-1.5 hover:bg-slate-100 rounded"><Italic className="size-4" /></button>
      <button className="p-1.5 hover:bg-slate-100 rounded"><Underline className="size-4" /></button>
      <button className="p-1.5 hover:bg-slate-100 rounded"><Strikethrough className="size-4" /></button>
      <span className="ml-1 flex items-center gap-1 text-[12px] font-medium">Text <span className="grid size-4 place-items-center rounded border bg-slate-900" /></span>
      <span className="flex items-center gap-1 text-[12px] font-medium">Fill <span className="grid size-4 place-items-center rounded border bg-slate-900" /></span>
      <span className="mx-1 h-6 w-px bg-slate-200" />
      <button className="p-1.5 hover:bg-slate-100 rounded"><AlignLeft className="size-4" /></button>
      <button className="p-1.5 hover:bg-slate-100 rounded"><AlignCenter className="size-4" /></button>
      <button className="p-1.5 hover:bg-slate-100 rounded"><AlignRight className="size-4" /></button>
      <button className="p-1.5 hover:bg-slate-100 rounded"><AlignJustify className="size-4" /></button>
      <span className="mx-1 h-6 w-px bg-slate-200" />
      <button className="p-1.5 hover:bg-slate-100 rounded"><List className="size-4" /></button>
      <button className="p-1.5 hover:bg-slate-100 rounded"><ListOrdered className="size-4" /></button>
      <button className="p-1.5 hover:bg-slate-100 rounded"><Quote className="size-4" /></button>
      <button className="p-1.5 hover:bg-slate-100 rounded"><Code2 className="size-4" /></button>
      <span className="mx-1 h-6 w-px bg-slate-200" />
      <button className="p-1.5 hover:bg-slate-100 rounded"><Link2 className="size-4" /></button>
      <button className="p-1.5 hover:bg-slate-100 rounded"><ImageIcon className="size-4" /></button>
      <button className="p-1.5 hover:bg-slate-100 rounded"><Trash2 className="size-4" /></button>
      <button className="p-1.5 hover:bg-slate-100 rounded"><Table className="size-4" /></button>
      <button className="p-1.5 hover:bg-slate-100 rounded"><Highlighter className="size-4" /></button>
      <button className="p-1.5 hover:bg-slate-100 rounded"><Undo2 className="size-4" /></button>
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      role="switch" aria-checked={on} onClick={onChange}
      className={cn("relative h-7 w-12 shrink-0 rounded-full border transition-colors", on ? "border-sky-500 bg-sky-500" : "border-slate-200 bg-slate-100")}
    >
      <span className={cn("absolute top-1/2 size-5 -translate-y-1/2 rounded-full bg-white shadow transition-all", on ? "right-1" : "left-1")} />
    </button>
  );
}

export default function NewProgramPage() {
  const [years, setYears] = useState([{ id: 1, value: "" }]);
  const [otherFees, setOtherFees] = useState<{ id: number }[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [englishOn, setEnglishOn] = useState(false);
  const [studentType, setStudentType] = useState({ domestic: true, international: true });
  const [studyMode, setStudyMode] = useState<string[]>([]);

  const toggleMonth = (m: string) => setMonths((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]));
  const toggleMode = (m: string) => setStudyMode((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]));

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[26px] font-bold text-slate-900">Add Program</h1>
          <p className="mt-1 text-[14.5px] text-slate-500">Create a new program for this institution — no impersonation needed.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/programs" className="rounded border bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50">Cancel</Link>
          <button className="rounded bg-[#1d8fc2] px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">Create Program</button>
        </div>
      </div>

      <div className="h-px bg-slate-200" />

      <div className="grid items-start gap-4 xl:grid-cols-[1fr_380px]">
        {/* Left */}
        <div className="min-w-0 space-y-4">
          <PageCard className="p-6">
            <h2 className="text-[19px] font-bold text-slate-900">Basic Information</h2>
            <p className="mt-0.5 text-[14px] text-slate-500">Required fields are validated before publishing.</p>
            <div className="mt-5 space-y-5">
              <Field label="Program Name" required><input placeholder="e.g. Master of Data Science" className={inputCls} /></Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Faculty" required>
                  <span className="relative block">
                    <select className={cn(inputCls, "appearance-none pr-9 text-slate-500")} defaultValue="">
                      <option value="" disabled>Select faculty</option>
                      <option>Public Health</option><option>Business and Management</option><option>Computer Science and IT</option>
                    </select>
                    <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  </span>
                </Field>
                <Field label="Study Level" required>
                  <span className="relative block">
                    <select className={cn(inputCls, "appearance-none pr-9 text-slate-500")} defaultValue="">
                      <option value="" disabled>Select study level</option>
                      <option>Bachelor&apos;s Degree (Undergraduate)</option><option>Master&apos;s Degree (Postgraduate)</option><option>Diploma</option>
                    </select>
                    <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  </span>
                </Field>
                <Field label="Delivery">
                  <span className="relative block">
                    <select className={cn(inputCls, "appearance-none pr-9 font-medium")} defaultValue="On-campus">
                      <option>On-campus</option><option>Online</option><option>Hybrid</option>
                    </select>
                    <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  </span>
                </Field>
                <Field label="Student Type" required>
                  <span className={cn(inputCls, "flex items-center gap-5")}>
                    <label className="flex cursor-pointer items-center gap-2 text-[14px]">
                      <input type="checkbox" checked={studentType.domestic} onChange={() => setStudentType((s) => ({ ...s, domestic: !s.domestic }))} className="size-4 rounded accent-sky-600" /> Domestic
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 text-[14px]">
                      <input type="checkbox" checked={studentType.international} onChange={() => setStudentType((s) => ({ ...s, international: !s.international }))} className="size-4 rounded accent-sky-600" /> International
                    </label>
                  </span>
                </Field>
              </div>
              <Field label="Study Mode">
                <span className={cn(inputCls, "flex flex-wrap items-center gap-x-6 gap-y-2")}>
                  {["By Research", "Course Work", "Mixed/Hybrid"].map((m) => (
                    <label key={m} className="flex cursor-pointer items-center gap-2 text-[14px]">
                      <input type="checkbox" checked={studyMode.includes(m)} onChange={() => toggleMode(m)} className="size-4 rounded accent-sky-600" /> {m}
                    </label>
                  ))}
                </span>
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Duration" required>
                  <span className="relative block">
                    <select className={cn(inputCls, "appearance-none pr-9 text-slate-500")} defaultValue="">
                      <option value="" disabled>Select duration</option>
                      <option>1 Year</option><option>2 Years</option><option>3 Years</option><option>4 Years</option>
                    </select>
                    <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  </span>
                </Field>
                <Field label="Processing Time"><input placeholder="e.g. 4-6 weeks" className={inputCls} /></Field>
              </div>
            </div>
          </PageCard>

          <PageCard className="p-6">
            <h2 className="text-[19px] font-bold text-slate-900">Program Details</h2>
            <div className="mt-5">
              <div className="mb-2 text-[15px] font-semibold text-slate-900">Description</div>
              <div className="overflow-hidden rounded border">
                <EditorToolbar />
                <textarea placeholder="Program overview" rows={6} className="w-full resize-none bg-slate-50/40 p-4 text-sm outline-none placeholder:text-slate-400" />
              </div>
            </div>
            <div className="mt-6">
              <div className="mb-2 text-[15px] font-semibold text-slate-900">Academic Entry Requirements</div>
              <div className="overflow-hidden rounded border">
                <EditorToolbar />
                <textarea placeholder="Entry requirements" rows={6} className="w-full resize-none bg-slate-50/40 p-4 text-sm outline-none placeholder:text-slate-400" />
              </div>
            </div>
          </PageCard>

          <PageCard className="p-6">
            <h2 className="text-[19px] font-bold text-slate-900">Intakes</h2>
            <p className="mt-1 text-[14px] text-slate-500">Select the months this program opens each year, or add a custom intake below.</p>
            <div className="mt-4">
              <div className="mb-2 text-[15px] font-semibold text-slate-900">Intake Months <span className="text-red-500">*</span></div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 rounded border p-4 sm:grid-cols-3">
                {MONTHS.map((m) => (
                  <label key={m} className="flex cursor-pointer items-center gap-2 text-[14.5px] text-slate-800">
                    <input type="checkbox" checked={months.includes(m)} onChange={() => toggleMonth(m)} className="size-4 rounded accent-sky-600" /> {m}
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <div className="mb-2 text-[15px] font-semibold text-slate-900">Application Deadline Rule</div>
              <span className="relative block">
                <select className={cn(inputCls, "appearance-none pr-9")} defaultValue="No fixed deadline">
                  <option>No fixed deadline</option><option>Fixed deadline per intake</option><option>Rolling admission</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-3 rounded border p-4">
              <div>
                <div className="text-[15px] font-semibold text-slate-900">Custom intakes</div>
                <p className="max-w-[420px] text-[13px] text-slate-500">Add intakes that don&apos;t fit the standard months above, e.g. “Summer” or “Fall Early Decision”.</p>
              </div>
              <button className="flex items-center gap-1.5 rounded border px-3.5 py-2 text-sm font-semibold hover:bg-slate-50"><Plus className="size-4" /> Add custom intake</button>
            </div>
          </PageCard>

          <PageCard className="flex items-start justify-between gap-4 p-6">
            <div>
              <h2 className="text-[19px] font-bold text-slate-900">English Requirements</h2>
              <p className="mt-1 text-[14px] text-slate-500">Only add this when the program needs English proof.</p>
            </div>
            <Toggle on={englishOn} onChange={() => setEnglishOn((v) => !v)} />
          </PageCard>
        </div>

        {/* Right */}
        <div className="space-y-4">
          <PageCard className="p-6">
            <h2 className="text-[19px] font-bold text-slate-900">Tuition Fees</h2>
            <p className="mt-0.5 text-[14px] text-slate-500">Conversions are automatic.</p>
            <div className="mt-4">
              <div className="mb-2 text-[15px] font-semibold text-slate-900">Currency <span className="text-red-500">*</span></div>
              <span className="relative block">
                <select className={cn(inputCls, "appearance-none pr-9 font-semibold")} defaultValue="USD">
                  <option>🇺🇸 USD</option><option>🇲🇾 MYR</option><option>🇧🇩 BDT</option><option>🇦🇪 AED</option>
                </select>
                <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              </span>
              <p className="mt-2 text-[13.5px] text-slate-500">Defaults from institution country; falls back to USD.</p>
            </div>
            <div className="mt-4">
              <div className="mb-2 text-[15px] font-semibold text-slate-900">Tuition Fee Period</div>
              <span className="relative block">
                <select className={cn(inputCls, "appearance-none pr-9 font-medium")} defaultValue="Per year">
                  <option>Per year</option><option>Per semester</option><option>Total</option>
                </select>
                <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
              <div className="text-[15px] font-semibold text-slate-900">Tuition Fee by Year <span className="text-red-500">*</span></div>
              <button onClick={() => setYears((y) => [...y, { id: Date.now(), value: "" }])} className="flex items-center gap-1.5 rounded border px-3 py-1.5 text-sm font-semibold hover:bg-slate-50"><Plus className="size-4" /> Add year</button>
            </div>
            <p className="mt-1.5 text-[13.5px] leading-snug text-slate-500">Rows are seeded from the program duration and selected period. Add or remove years to match the program.</p>
            <div className="mt-3 space-y-3">
              {years.map((y, i) => (
                <div key={y.id} className="flex items-center gap-3">
                  <span className="w-[70px] shrink-0 text-[14.5px] text-slate-500">Year {i + 1}</span>
                  <input placeholder="0.00" className={cn(inputCls, "flex-1")} />
                  <button onClick={() => setYears((ys) => ys.filter((x) => x.id !== y.id))} aria-label="remove year" className="p-1.5 text-slate-400 hover:text-red-500"><Trash2 className="size-4" /></button>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded border px-4 py-2.5">
              <span className="text-[15px] font-semibold">Total tuition</span>
              <span className="text-[15px] font-semibold">USD 0</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Field label="Application Fee"><input placeholder="0.00" className={inputCls} /></Field>
              <Field label="Deposit"><input placeholder="0.00" className={inputCls} /></Field>
            </div>
            <div className="mt-4">
              <div className="mb-2 text-[15px] font-semibold text-slate-900">Estimated Total Program Cost</div>
              <input placeholder="0.00" className={inputCls} />
            </div>
            <div className="mt-5 flex items-start justify-between gap-2">
              <div>
                <div className="text-[15px] font-semibold text-slate-900">Other Fees</div>
                <p className="text-[13.5px] text-slate-500">Registration, lab, insurance, accommodation, or similar fee items.</p>
              </div>
              <button onClick={() => setOtherFees((f) => [...f, { id: Date.now() }])} className="flex shrink-0 items-center gap-1.5 rounded border px-3 py-1.5 text-sm font-semibold hover:bg-slate-50"><Plus className="size-4" /> Add Fee</button>
            </div>
            {otherFees.map((f) => (
              <div key={f.id} className="mt-3 flex items-center gap-2">
                <input placeholder="Fee name" className={cn(inputCls, "flex-1")} />
                <input placeholder="0.00" className={cn(inputCls, "w-[110px]")} />
                <button onClick={() => setOtherFees((fs) => fs.filter((x) => x.id !== f.id))} className="p-1.5 text-slate-400 hover:text-red-500"><Trash2 className="size-4" /></button>
              </div>
            ))}
            <div className="mt-4">
              <div className="mb-2 text-[15px] font-semibold text-slate-900">Fee Notes</div>
              <textarea placeholder="Short note about fee policy, if needed." rows={3} className={cn(inputCls, "resize-y")} />
            </div>
          </PageCard>

          <PageCard className="p-6">
            <h2 className="text-[19px] font-bold text-slate-900">Required Documents</h2>
            <span className="relative mt-3 block">
              <select className={cn(inputCls, "appearance-none pr-9 text-slate-500")} defaultValue="">
                <option value="" disabled>Select documents</option>
                <option>Passport</option><option>Academic certificates</option><option>IELTS / MOI</option>
              </select>
              <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            </span>
            <p className="mt-2.5 text-[15px] font-semibold text-slate-900">4 documents selected</p>
          </PageCard>

          <PageCard className="flex items-start justify-between gap-3 p-6">
            <div>
              <h2 className="text-[19px] font-bold text-slate-900">Program Image</h2>
              <p className="mt-0.5 text-[14px] text-slate-500">Hidden by default to keep this form focused.</p>
            </div>
            <button className="flex shrink-0 items-center gap-1.5 rounded border px-3 py-1.5 text-sm font-semibold hover:bg-slate-50"><ImagePlus className="size-4" /> Add Image</button>
          </PageCard>

          <PageCard className="flex items-start justify-between gap-3 p-6">
            <div>
              <h2 className="text-[19px] font-bold text-slate-900">Featured Program</h2>
              <p className="mt-0.5 text-[14px] text-slate-500">Featured programs appear at the top of search results.</p>
            </div>
            <Toggle on={featured} onChange={() => setFeatured((v) => !v)} />
          </PageCard>

          <PageCard className="p-6">
            <h2 className="text-[19px] font-bold text-slate-900">Documents</h2>
            <p className="mt-0.5 text-[14px] text-slate-500">Upload optional brochure, tuition document, and scholarship criteria.</p>
            {[
              { t: "Brochure" },
              { t: "Tuition Fees Document" },
              { t: "Scholarship Criteria (PDF)" },
            ].map((d) => (
              <div key={d.t} className="mt-4">
                <div className="mb-2 text-[15px] font-semibold text-slate-900">{d.t}</div>
                <button className="flex items-center gap-1.5 rounded border px-3.5 py-2 text-sm font-semibold hover:bg-slate-50"><Upload className="size-4" /> Upload</button>
              </div>
            ))}
          </PageCard>
        </div>
      </div>
    </div>
  );
}
