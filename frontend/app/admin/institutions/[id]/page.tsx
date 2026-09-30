"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, MapPin, CalendarDays, ShieldCheck, LogIn, Pencil,
  GraduationCap, Phone, Mail, Globe2, BookOpen, ArrowRight,
} from "lucide-react";
import { PageCard, Pill } from "@/components/admin/admin-ui";
import { cn } from "@/lib/utils";

const OVERVIEW_SHORT =
  "Krirk University is one of the most reputable universities in Thailand. It was founded in 1952 by Dr. Krirk Mangkhlaphrik and has been promoting higher education in the country since 1970. At first, it used the Ratchadamnoen Buidling. Krirk was upgraded to university status in 1995. Dr. Krirk was a renowned educator both in Thailand and abroad. He received an honorary doctorate in education from David & Elkins College, USA. Owing to his high competence in teaching English, his high…";
const OVERVIEW_FULL =
  "Krirk University is one of the most reputable universities in Thailand. It was founded in 1952 by Dr. Krirk Mangkhlaphrik and has been promoting higher education in the country since 1970. At first, it used the Ratchadamnoen Building. Krirk was upgraded to university status in 1995. Dr. Krirk was a renowned educator both in Thailand and abroad. He received an honorary doctorate in education from David & Elkins College, USA. Owing to his high competence in teaching English, his high standards of academic leadership shaped the university's international outlook, with strong faculties in Business Administration, Communication Arts, Law, and Liberal Arts.";

const PROGRAMS = [
  {
    title: "Doctor of Philosophy (PhD) in Business Administration (DBA)",
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80",
  },
  {
    title: "Doctor of Philosophy (PhD) in Business and Management",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
  },
  {
    title: "Master of Business Administration (MBA) in International Business",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
  },
];

function slugToName(slug: string) {
  return decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function InstitutionDetailsPage({ params }: { params: { id: string } }) {
  const raw = params?.id ?? "krirk-university";
  const displayName = raw.toLowerCase().includes("krirk") ? "Krirk University" : slugToName(raw);
  const [active, setActive] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-4 p-4">
      <Link href="/admin/institutions" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-slate-900 hover:text-sky-700">
        <ArrowLeft className="size-4" /> Back to institutions
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="grid h-12 w-20 shrink-0 place-items-center overflow-hidden rounded bg-white text-[13px] font-black text-green-700">
            KRIRK <span className="ml-1 text-[9px] font-medium text-slate-500">มหาวิทยาลัยเกริก</span>
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="blue">{active ? "ACTIVE" : "INACTIVE"}</Pill>
              <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[12px] font-semibold text-slate-900">Thailand</span>
            </div>
            <h1 className="mt-1.5 text-[30px] font-bold leading-tight text-slate-900">{displayName}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-1 text-[14px] text-slate-500">
              <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" /> Bang Khen, Bangkok, Thailand</span>
              <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4" /> Established 1022</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActive((a) => !a)}
            className="flex items-center gap-1.5 rounded border bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            <ShieldCheck className="size-4" /> {active ? "Set inactive" : "Set active"}
          </button>
          <button className="flex items-center gap-1.5 rounded border bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">
            <LogIn className="size-4" /> Login as
          </button>
          <div className="w-full sm:w-auto">
            <button className="flex items-center gap-1.5 rounded bg-[#1d8fc2] px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
              <Pencil className="size-4" /> Edit profile
            </button>
          </div>
        </div>
      </div>

      {/* Featured */}
      <PageCard className="flex items-center justify-between gap-4 p-5">
        <div>
          <h2 className="text-[18px] font-bold text-slate-900">Featured Institution</h2>
          <p className="mt-0.5 text-[14px] text-slate-500">Featured institutions appear at the top of search results.</p>
        </div>
        <button
          role="switch"
          aria-checked={featured}
          onClick={() => setFeatured((f) => !f)}
          className={cn(
            "relative h-7 w-12 shrink-0 rounded-full border transition-colors",
            featured ? "border-sky-500 bg-sky-500" : "border-slate-200 bg-slate-100"
          )}
        >
          <span
            className={cn(
              "absolute top-1/2 size-5 -translate-y-1/2 rounded-full bg-white shadow transition-all",
              featured ? "right-1" : "left-1"
            )}
          />
        </button>
      </PageCard>

      <div className="grid items-start gap-4 xl:grid-cols-[1fr_360px]">
        {/* Left column */}
        <div className="min-w-0 space-y-4">
          <PageCard className="overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=1400&q=80"
              alt={`${displayName} campus`}
              className="h-[300px] w-full object-cover sm:h-[360px]"
            />
          </PageCard>

          <PageCard className="p-6">
            <h2 className="text-[24px] font-bold text-slate-900">Overview</h2>
            <p className="mt-0.5 text-[14px] text-slate-500">Public-facing institution information.</p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-slate-900">
              {expanded ? OVERVIEW_FULL : OVERVIEW_SHORT}
            </p>
            <button onClick={() => setExpanded((e) => !e)} className="mt-3 text-[15px] font-medium text-sky-600 hover:underline">
              {expanded ? "Read less" : "Read more"}
            </button>
          </PageCard>

          <PageCard className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-[24px] font-bold text-slate-900">Programs</h2>
                <p className="mt-0.5 text-[14px] text-slate-500">Available programs from this institution.</p>
              </div>
              <button className="flex shrink-0 items-center gap-1.5 rounded border bg-white px-3.5 py-2 text-sm font-semibold hover:bg-slate-50">
                <BookOpen className="size-4" /> Show all
              </button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PROGRAMS.map((p) => (
                <div key={p.title} className="overflow-hidden rounded border bg-white shadow-[0_1px_2px_rgba(0,0,0,.06)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.title} className="h-[130px] w-full object-cover" />
                  <div className="p-3.5">
                    <h3 className="line-clamp-2 min-h-[44px] text-[15px] font-semibold leading-snug text-slate-900">{p.title}</h3>
                    <div className="mt-2.5 flex items-center gap-2">
                      <span className="grid size-8 shrink-0 place-items-center rounded border bg-slate-50 text-[8px] font-black text-green-700">KRIRK</span>
                      <div className="min-w-0">
                        <div className="truncate text-[14px] font-semibold text-slate-900">{displayName}</div>
                        <div className="truncate text-[12.5px] text-slate-500">Bang Khen, Thailand</div>
                      </div>
                    </div>
                    <span className="mt-2.5 inline-flex items-center gap-1.5 text-[14px] font-medium text-sky-600">
                      View programme <ArrowRight className="size-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </PageCard>
        </div>

        {/* Right column */}
        <PageCard className="p-6 xl:sticky xl:top-[70px]">
          <h2 className="text-[22px] font-bold text-slate-900">Institution Information</h2>
          <p className="mt-0.5 text-[14px] text-slate-500">Core profile details for this institution.</p>
          <div className="mt-5 space-y-5">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded bg-sky-50 text-sky-600"><GraduationCap className="size-5" /></span>
              <div>
                <div className="text-[12.5px] font-medium tracking-wide text-slate-500">TOTAL PROGRAMS</div>
                <div className="text-[15px] font-bold text-slate-900">8</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded bg-sky-50 text-sky-600"><Phone className="size-5" /></span>
              <div>
                <div className="text-[12.5px] font-medium tracking-wide text-slate-500">CONTACT NUMBERS</div>
                <div className="text-[15px] font-bold text-slate-900">+66 29705820</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded bg-sky-50 text-sky-600"><Mail className="size-5" /></span>
              <div>
                <div className="text-[12.5px] font-medium tracking-wide text-slate-500">EMAIL</div>
                <a href="mailto:info@krirk.ac.th" className="text-[15px] font-semibold text-sky-600 hover:underline">info@krirk.ac.th</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded bg-sky-50 text-sky-600"><Globe2 className="size-5" /></span>
              <div className="min-w-0">
                <div className="text-[12.5px] font-medium tracking-wide text-slate-500">WEBSITE</div>
                <a href="https://www.krirk.ac.th/en/" target="_blank" rel="noreferrer" className="break-all text-[15px] font-semibold text-sky-600 hover:underline">
                  https://www.krirk.ac.th/en/
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded bg-sky-50 text-sky-600"><MapPin className="size-5" /></span>
              <div>
                <div className="text-[12.5px] font-medium tracking-wide text-slate-500">FULL ADDRESS</div>
                <div className="text-[15px] font-medium leading-snug text-slate-900">3 Ram Inthra Rd, Anusawari, Bang Khen, Bangkok 10220, Thailand</div>
              </div>
            </div>
          </div>
        </PageCard>
      </div>
    </div>
  );
}
