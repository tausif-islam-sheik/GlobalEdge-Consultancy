import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinderBanner() {
  return (
    <section className="container py-6">
      <div className="grid gap-6 rounded bg-gradient-to-r from-[#1f8fc4] to-[#29a9e1] p-7 md:p-9 text-white shadow-soft lg:grid-cols-[1fr_auto] lg:items-center overflow-hidden relative">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-white/10 skew-x-0 hidden lg:block" />
        <div className="relative">
          <div className="flex items-start gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded bg-white/20"><Compass className="size-7" /></span>
            <div>
              <h2 className="text-2xl md:text-[32px] font-bold leading-tight">Find the right program for your study abroad plan</h2>
              <p className="mt-2 text-white/85">Compare programs and institutions before you apply.</p>
            </div>
          </div>
        </div>
        <div className="relative flex flex-wrap gap-3">
          <Link href="/programs"><Button className="bg-white text-[#1d8fc2] hover:bg-slate-100 h-11 px-6 font-semibold">Search programs</Button></Link>
          <Link href="/institutions"><Button variant="outline" className="border-white/50 bg-transparent text-white hover:bg-white/10 h-11 px-6 font-semibold">Browse institutions</Button></Link>
        </div>
      </div>
    </section>
  );
}
