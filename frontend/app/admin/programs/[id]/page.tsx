"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, FileInput, BadgeDollarSign, Pencil, ExternalLink, Eye,
  GraduationCap, Languages, CheckCircle2, Image as ImageIcon, ChevronsUpDown,
} from "lucide-react";
import { PageCard } from "@/components/admin/admin-ui";
import { cn } from "@/lib/utils";

function slugToName(slug: string) {
  return decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const FEES = [
  { label: "TUITION (PER YEAR)", myr: "30,863 MYR", bdt: "931,653 BDT" },
  { label: "APPLICATION FEE", myr: "Not set", bdt: "Not set" },
  { label: "DEPOSIT BEFORE FLY", myr: "34,455 MYR", bdt: "1,040,084 BDT" },
  { label: "EMGS FEE (AFTER OFFER LETTER)", myr: "8,010 MYR", bdt: "241,796 BDT" },
  { label: "ANNUAL & VISA RENEWAL FEE", myr: "2,550 MYR", bdt: "76,976 BDT" },
  { label: "PEC / SOFT SKILLS", myr: "697 MYR", bdt: "21,040 BDT" },
  { label: "EXAM FEE", myr: "345 MYR", bdt: "10,414 BDT" },
];

const DOCS = [
  "Passport",
  "SSC certificates /O Level certificates / Secondary School certificates",
  "SSC marksheets /O Level marksheets / Secondary School marksheets",
  "Passport size photo 35 mm× 45 mm (white background image)",
  "HSC certificates /A Level certificates / Higher Secondary School Certificates",
  "HSC marksheets /A Level marksheets / Higher Secondary School marksheet",
  "Research proposal",
  "IELTS/MOI",
  "CV",
];

const OVERVIEW_SHORT =
  "The increased prevalence of overweight and obesity together with other non-communicable diseases (NCDs) has led to more attention given to the role of nutrition in preventing chronic diseases. The current shift towards preventive healthcare, where nutrition plays a key role, leads to more people being interested in taking charge of their health through diet and nutrition....";
const OVERVIEW_FULL =
  "The increased prevalence of overweight and obesity together with other non-communicable diseases (NCDs) has led to more attention given to the role of nutrition in preventing chronic diseases. The current shift towards preventive healthcare, where nutrition plays a key role, leads to more people being interested in taking charge of their health through diet and nutrition. This Bachelor in Nutrition (Honours) programme builds strong foundations in human nutrition, dietetics, food science and public health practice, preparing graduates for clinical, community and food-industry careers.";

export default function ProgramDetailsPage({ params }: { params: { id: string } }) {
  const raw = params?.id ?? "bachelor-in-nutrition-honours";
  const title = raw.toLowerCase().includes("nutrition") ? "Bachelor in Nutrition (Honours)" : slugToName(raw);
  const [overviewMore, setOverviewMore] = useState(false);
  const [academicMore, setAcademicMore] = useState(false);

  return (
    <div className="space-y-4 p-4">
      {/* Back + actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/programs" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-slate-900 hover:text-sky-700">
          <ArrowLeft className="size-4" /> Back to programs
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-1.5 rounded bg-[#1d8fc2] px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
            <FileInput className="size-4" /> Apply
          </button>
          <button className="flex items-center gap-1.5 rounded border bg-white px-3.5 py-2 text-sm font-medium hover:bg-slate-50">
            <BadgeDollarSign className="size-4" /> Commission rules
          </button>
          <button className="flex items-center gap-1.5 rounded border bg-white px-3.5 py-2 text-sm font-medium hover:bg-slate-50">
            <Pencil className="size-4" /> Edit
          </button>
          <button className="flex items-center gap-1.5 rounded border bg-white px-3.5 py-2 text-sm font-medium hover:bg-slate-50">
            <ExternalLink className="size-4" /> Preview
          </button>
          <button className="flex items-center gap-1.5 rounded border bg-white px-3.5 py-2 text-sm font-medium hover:bg-slate-50">
            <Eye className="size-4" /> View Tuition document
          </button>
        </div>
      </div>

      {/* Title header */}
      <div className="flex items-start gap-4">
        <span className="grid h-[92px] w-[92px] shrink-0 place-items-center overflow-hidden rounded border bg-[#f1f1f1]">
          <span className="bg-white px-2 py-1 text-center text-[15px] font-black leading-none text-red-600">msu <span className="block text-[6px] font-semibold tracking-wide text-slate-700">MANAGEMENT & SCIENCE UNIVERSITY</span></span>
        </span>
        <div className="min-w-0">
          <h1 className="text-[28px] font-bold leading-tight text-slate-900 sm:text-[32px]">{title}</h1>
          <p className="mt-1 text-[15px] text-slate-500">
            Public Health at <span className="font-semibold text-slate-900">Management & Science University (MSU)</span>
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[13px]">
            <span className="rounded-full bg-amber-400 px-3 py-1 font-semibold text-slate-900">Bachelor&apos;s Degree (Undergraduate)</span>
            <span className="rounded bg-slate-100 px-3 py-1 text-slate-500">Program duration: <b className="font-semibold text-slate-800">4 Years</b></span>
            <span className="rounded bg-slate-100 px-3 py-1 text-slate-500">Processing time: <b className="font-semibold text-slate-800">4-6 Week</b></span>
          </div>
        </div>
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[1fr_360px]">
        {/* Left */}
        <div className="min-w-0 space-y-4">
          <PageCard className="overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1400&q=80"
              alt={title}
              className="h-[280px] w-full object-cover sm:h-[340px]"
            />
          </PageCard>

          <PageCard className="p-6">
            <h2 className="text-[17px] font-semibold text-slate-900">Overview</h2>
            <h3 className="mt-3 text-[18px] font-bold text-slate-900">About the Course</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{overviewMore ? OVERVIEW_FULL : OVERVIEW_SHORT}</p>
            <button onClick={() => setOverviewMore((v) => !v)} className="mt-3 text-[15px] font-medium text-sky-600 hover:underline">
              {overviewMore ? "Read less" : "Read more"}
            </button>
          </PageCard>

          <PageCard className="p-6">
            <h2 className="text-[17px] font-semibold text-slate-900">Available Campuses</h2>
            <div className="mt-4 max-w-[400px] overflow-hidden rounded border bg-white">
              <div className="grid h-[180px] place-items-center bg-[#f1f2f4] text-slate-500">
                <span className="flex flex-col items-center gap-2 text-[14px]">
                  <ImageIcon className="size-8" />
                  No campus photo uploaded
                </span>
              </div>
              <div className="p-4">
                <div className="text-[16px] font-semibold text-slate-900">Main campus</div>
                <div className="mt-0.5 text-[14.5px] text-slate-500">Shah Alam, Malaysia</div>
                <div className="mt-1 text-[13.5px] leading-snug text-slate-500">4, Persiaran Olahraga, Section 13, 40000 Shah Alam, Selangor, Malaysia</div>
              </div>
            </div>
          </PageCard>

          <PageCard className="p-6">
            <h2 className="text-[17px] font-semibold text-slate-900">Entry Requirements</h2>
            <div className="mt-4 overflow-hidden rounded border">
              <div className="flex items-center gap-2 border-b bg-slate-50 px-4 py-3 text-[15px] font-bold tracking-wide text-slate-900">
                <GraduationCap className="size-5 text-sky-600" /> ACADEMIC REQUIREMENTS
              </div>
              <div className="px-4 py-4 text-[15px] leading-relaxed text-slate-800">
                <p>A pass in STPM or its equivalent, with a minimum of Grade C+ (GPA 2.33) in any TWO (2) of the following subjects:</p>
                <p className="mt-1">• Chemistry</p>
                <p>• Biology/Physics/Mathematics</p>
                {academicMore ? (
                  <p className="mt-2">OR a pass in STPM with a minimum of Grade C (GPA 2.00) in any TWO (2) subjects including Chemistry plus a pass in SPM with 5 credits including Chemistry and Biology/Physics/Mathematics; OR Matriculation/Foundation with minimum CGPA 2.33 including Chemistry and Biology/Physics/Mathematics; OR Diploma in related field with minimum CGPA 2.75.</p>
                ) : (
                  <p className="mt-1">OR...</p>
                )}
                <button onClick={() => setAcademicMore((v) => !v)} className="mt-3 font-medium text-sky-600 hover:underline">
                  {academicMore ? "Read less" : "Read more"}
                </button>
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded border">
              <div className="flex items-center gap-2 border-b bg-slate-50 px-4 py-3 text-[15px] font-bold tracking-wide text-slate-900">
                <Languages className="size-5 text-sky-600" /> ENGLISH REQUIREMENTS
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                {[
                  { t: "IELTS Academic", v: "Overall 5.5" },
                  { t: "TOEFL iBT", v: "Overall 550" },
                  { t: "PTE Academic", v: "Overall 65" },
                  { t: "MUET", v: "Overall 3" },
                ].map((e) => (
                  <div key={e.t} className="rounded border p-3.5">
                    <div className="text-[15px] font-bold text-slate-900">{e.t}</div>
                    <div className="mt-0.5 text-[14.5px] text-slate-500">{e.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </PageCard>
        </div>

        {/* Right */}
        <div className="space-y-4">
          <PageCard className="p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[18px] font-semibold text-slate-900">Tuition & Fees</h2>
              <button className="flex items-center gap-1.5 rounded border px-3 py-1.5 text-sm font-bold">🇧🇩 BDT <ChevronsUpDown className="size-4 text-slate-400" /></button>
            </div>
            <div className="mt-4 overflow-hidden rounded border text-[13.5px]">
              <div className="grid grid-cols-[1fr_110px_120px] bg-slate-50/70 text-right text-[12px] font-medium text-slate-500">
                <span className="px-3 py-2.5 text-left" />
                <span className="border-l px-3 py-2.5">MYR</span>
                <span className="border-l px-3 py-2.5">BDT</span>
              </div>
              {FEES.map((f) => (
                <div key={f.label} className="grid grid-cols-[1fr_110px_120px] border-t text-right">
                  <span className="px-3 py-2.5 text-left font-medium text-slate-500">{f.label}</span>
                  <span className={cn("border-l px-3 py-2.5 font-semibold text-slate-900", f.myr === "Not set" && "font-normal text-slate-900")}>{f.myr}</span>
                  <span className="border-l px-3 py-2.5 text-slate-500">{f.bdt}</span>
                </div>
              ))}
              <div className="grid grid-cols-[1fr_110px_120px] border-t bg-slate-50/60 text-right font-bold text-slate-900">
                <span className="px-3 py-2.5 text-left">ESTIMATED TOTAL</span>
                <span className="border-l px-3 py-2.5">42,465 MYR</span>
                <span className="border-l px-3 py-2.5">1,281,880 BDT</span>
              </div>
            </div>
          </PageCard>

          <PageCard className="p-5">
            <h2 className="text-[18px] font-semibold text-slate-900">Required Documents</h2>
            <ul className="mt-3 space-y-2.5 text-[14.5px] text-slate-800">
              {DOCS.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-sky-600" />
                  <span className="leading-snug">{d}</span>
                </li>
              ))}
            </ul>
          </PageCard>

          <PageCard className="p-5">
            <h2 className="text-[18px] font-semibold text-slate-900">More Information</h2>
            <div className="mt-3 space-y-4">
              <div>
                <div className="text-[12.5px] font-medium tracking-wide text-slate-500">FACULTY</div>
                <div className="mt-0.5 text-[15.5px] font-bold text-slate-900">Public Health</div>
              </div>
              <div>
                <div className="text-[12.5px] font-medium tracking-wide text-slate-500">PROCESSING TIME</div>
                <div className="mt-0.5 text-[15.5px] font-bold text-slate-900">4-6 Week</div>
              </div>
              <div>
                <div className="text-[12.5px] font-medium tracking-wide text-slate-500">INTAKE MONTHS</div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {["February", "April", "June", "September", "November"].map((m) => (
                    <span key={m} className="rounded-full bg-amber-400 px-3 py-1 text-[13px] font-semibold text-slate-900">{m}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[12.5px] font-medium tracking-wide text-slate-500">STUDENT TYPE</div>
                <div className="mt-0.5 text-[15.5px] font-bold text-slate-900">Domestic, International</div>
              </div>
            </div>
          </PageCard>
        </div>
      </div>
    </div>
  );
}
