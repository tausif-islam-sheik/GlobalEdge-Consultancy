import Link from "next/link";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { news } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function News() {
  return (
    <section className="container py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900">Creative Consultancy News</h2>
          <p className="mt-2 text-slate-500">The latest updates, admission news, and study abroad insights.</p>
        </div>
        <Link href="/news"><Button size="pill">View All News</Button></Link>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {news.map((n) => (
          <article key={n.title} className="overflow-hidden rounded-xl border bg-white shadow-soft">
            <div className="grid h-40 place-items-center bg-gradient-to-br from-navy-900 via-brand-600 to-navy-900 p-4 text-center text-sm font-bold text-white">{n.tag}</div>
            <div className="p-4">
              <p className="flex items-center gap-1.5 text-xs text-slate-500"><CalendarDays className="size-3.5" /> {n.date}</p>
              <h3 className="mt-2 font-semibold leading-snug line-clamp-2">{n.title}</h3>
              <Link href="/news" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600">Read more <ArrowUpRight className="size-4" /></Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
