"use client";
import Link from "next/link";
import { Heart, Scale, Clock, CalendarDays, Building2, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { programs } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function PopularPrograms() {
  const [wish, setWish] = useState<string[]>([]);
  return (
    <section className="container py-12">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold text-navy-900">Most Popular Programs for Education Abroad from <span className="text-brand-500">Bangladesh</span></h2>
      <p className="mt-2 text-center text-slate-500">Explore our curated list of trending programs.</p>
      <div className="relative mt-8">
        <div className="grid gap-5">
          {programs.slice(0, 1).map((p) => (
            <article key={p.slug} className="grid overflow-hidden rounded-xl border shadow-soft md:grid-cols-[280px_1fr]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="relative h-52 md:h-full bg-slate-200">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" alt={p.title} className="absolute inset-0 h-full w-full object-cover" />
                <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium"><input type="checkbox" className="size-4" /> <Scale className="size-3.5" /> Compare</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap gap-2"><Badge>{p.level}</Badge><Badge>{p.mode}</Badge></div>
                    <h3 className="mt-2 font-semibold text-navy-900">{p.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500"><Building2 className="size-4" /> {p.university} · MY {p.country}</p>
                  </div>
                  <button aria-label="wishlist" onClick={() => setWish((w) => (w.includes(p.slug) ? w.filter((x) => x !== p.slug) : [...w, p.slug]))} className={`grid size-10 shrink-0 place-items-center rounded-lg border ${wish.includes(p.slug) ? "text-rose-500 border-rose-200 bg-rose-50" : ""}`}><Heart className="size-5" /></button>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 border-t pt-4 text-sm">
                  <span><span className="flex items-center gap-1 text-xs text-slate-500"><Clock className="size-3.5" /> Duration</span><b>{p.duration}</b></span>
                  <span><span className="flex items-center gap-1 text-xs text-slate-500"><Clock className="size-3.5" /> Processing time</span><b>{p.processing}</b></span>
                  <span><span className="flex items-center gap-1 text-xs text-slate-500"><CalendarDays className="size-3.5" /> Next intake</span><b>{p.intake}</b><span className="block text-xs font-normal text-slate-500">+13 more</span></span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-4 text-sm md:grid-cols-[1fr_1fr_1fr_1.2fr_auto] md:items-end">
                  <span><span className="text-xs text-slate-500">Application fee</span><span className="block"><Badge>{p.appFee}</Badge></span></span>
                  <span><span className="text-xs text-slate-500">Tuition fee (per year)</span><b className="block">৳ {p.tuition}</b><span className="text-xs text-slate-500">{p.tuitionFx}</span></span>
                  <span><span className="text-xs text-slate-500">Deposit</span><b className="block">৳ {p.deposit}</b><span className="text-xs text-slate-500">{p.depositFx}</span></span>
                  <span><span className="text-xs text-slate-500">Total cost (estimated)</span><b className="block text-base">৳ {p.total}</b><span className="text-xs text-slate-500">{p.totalFx}</span></span>
                  <Link href={`/programs/${p.slug}`}><Button>View details <ArrowRight /></Button></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <button aria-label="prev" className="absolute -left-4 top-1/2 hidden size-9 -translate-y-1/2 place-items-center rounded-full border bg-white shadow md:grid"><ChevronLeft className="size-4" /></button>
        <button aria-label="next" className="absolute -right-4 top-1/2 hidden size-9 -translate-y-1/2 place-items-center rounded-full border bg-white shadow md:grid"><ChevronRight className="size-4" /></button>
      </div>
      <div className="mt-8 text-center"><Link href="/programs"><Button variant="outline" size="pill">Explore All Programs</Button></Link></div>
    </section>
  );
}
