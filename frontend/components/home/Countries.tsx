import Link from "next/link";
import { countries } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function Countries() {
  return (
    <section className="bg-slate-50 py-14">
      <div className="container grid items-center gap-10 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          {countries.map((c) => (
            <Link key={c.slug} href={`/countries/${c.slug}`} className="group relative h-52 overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt={c.name} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105" />
              <span className="absolute inset-0 bg-navy-950/30" />
              <span className="absolute bottom-3 left-4 font-bold text-white">{c.tag}</span>
            </Link>
          ))}
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900">Best Countries For Study Abroad from BD</h2>
          <p className="mt-3 text-slate-500">We provide assistance for top destinations including UK, USA, Canada, Malaysia, and more.</p>
          <Link href="/countries"><Button size="pill" className="mt-6">Explore Countries</Button></Link>
        </div>
      </div>
    </section>
  );
}
