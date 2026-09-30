import Link from "next/link";
import { getCountries } from "@/lib/api-server";
import { Button } from "@/components/ui/button";

const FALLBACK_IMG: Record<string, string> = {
  uk: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=600&q=80",
  usa: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80",
  canada: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&q=80",
  malaysia: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80",
};

export async function Countries() {
  const countries = await getCountries();
  return (
    <section className="bg-slate-50 py-14">
      <div className="container grid items-center gap-10 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          {countries.slice(0, 4).map((c) => (
            <Link key={c.slug} href={`/countries/${c.slug}`} className="group relative h-52 overflow-hidden rounded">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img ?? FALLBACK_IMG[c.slug] ?? FALLBACK_IMG.malaysia} alt={c.name} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105" />
              <span className="absolute inset-0 bg-navy-950/30" />
              <span className="absolute bottom-3 left-4 font-bold text-white">{c.tag ?? c.name}</span>
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
