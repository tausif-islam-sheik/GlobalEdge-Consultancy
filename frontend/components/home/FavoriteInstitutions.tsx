import Link from "next/link";
import { countries } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function FavoriteInstitutions() {
  const cards = [
    { name: "Asia Pacific University of Technology & Innovation (APU)", loc: "Malaysia, Kuala Lumpur", img: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80", est: "Est. 1993", n: "127 Programs", qs: "QS #597" },
    { name: "INTI International University & Colleges", loc: "Malaysia, Kampung Baharu Nilai", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80", est: "Est. 1986", n: "145 Programs", qs: "QS #406" },
    { name: "SEGi University & Colleges", loc: "Malaysia, Petaling Jaya", img: "https://images.unsplash.com/photo-1591123120675-6f7fcaaae0e5?w=600&q=80", est: "Est. 1977", n: "140 Programs", qs: "QS #701-710" },
  ];
  return (
    <section className="container py-12">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold text-navy-900">Students&apos; Favorite <span className="text-brand-500">Top Institutions</span> for Higher Education from Bangladesh</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <article key={c.name} className="overflow-hidden rounded-2xl border bg-white shadow-soft">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.img} alt={c.name} className="h-56 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-bold text-navy-900 leading-snug">{c.name}</h3>
              <p className="mt-1 text-sm text-slate-500">🇲🇾 {c.loc}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-amber-50 border border-amber-100 px-3 py-1">📅 {c.est}</span>
                <span className="rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1">🎓 {c.n}</span>
                <span className="rounded-full bg-purple-50 border border-purple-100 px-3 py-1">🏆 {c.qs}</span>
              </div>
              <Link href="/institutions"><Button className="mt-4">Learn More</Button></Link>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 text-center"><Link href="/institutions"><Button size="pill">View All Institutions</Button></Link></div>
    </section>
  );
}
