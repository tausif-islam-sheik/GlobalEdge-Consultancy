import Link from "next/link";
import { getUniversities } from "@/lib/api-server";
import { Button } from "@/components/ui/button";

const COLORS = ["#e8821a", "#b3123f", "#a4123f", "#e8a020", "#174a8b", "#0ea5e9", "#e11d48", "#166534"];

export async function TopInstitutions() {
  const institutions = await getUniversities();
  return (
    <section className="hero-grid-bg py-12">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900">
          Top Institutions We Consult for Higher <span className="text-brand-500">Education Abroad</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-500">We partner with leading institutions worldwide to provide you with the best education opportunities.</p>
        <div className="mt-8 flex gap-5 overflow-x-auto no-scrollbar pb-2 snap-x">
          {institutions.slice(0, 8).map((u, i) => (
            <div key={u.slug} className="snap-start shrink-0 w-[240px] rounded bg-white p-6 shadow-soft border">
              <div className="grid h-16 place-items-center text-2xl font-extrabold" style={{ color: u.color ?? COLORS[i % COLORS.length] }}>
                {u.short ?? u.shortName ?? u.name}
              </div>
              <p className="mt-1 text-[11px] text-slate-400 line-clamp-2">{u.name}</p>
            </div>
          ))}
        </div>
        <Link href="/institutions"><Button variant="outline" size="pill" className="mt-8">Explore All Institutions</Button></Link>
      </div>
    </section>
  );
}
