import { getCountries, getUniversities, getPrograms } from "@/lib/api-server";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="container py-12">
      <h1 className="text-3xl font-extrabold text-navy-900">{title}</h1>
      <div className="mt-6">{children}</div>
    </section>
  );
}

const COLORS = ["#e8821a", "#b3123f", "#a4123f", "#e8a020", "#174a8b", "#0ea5e9", "#e11d48", "#166534"];

export async function catalogPage(kind: string) {
  if (kind === "countries") {
    const countries = await getCountries();
    return (
      <Section title="Countries">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {countries.map((c) => (
            <Card key={c.slug}><CardContent><b>{c.name}</b><p className="text-sm text-slate-500">{c.tag ?? c.isoCode ?? ""}</p><Link href={`/countries/${c.slug}`}><Button className="mt-3" >View</Button></Link></CardContent></Card>
          ))}
        </div>
      </Section>
    );
  }
  if (kind === "institutions") {
    const institutions = await getUniversities();
    return (
      <Section title="Institutions">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {institutions.map((u, i) => (
            <Card key={u.slug}><CardContent><b style={{ color: u.color ?? COLORS[i % COLORS.length] }}>{u.short ?? u.shortName ?? u.name}</b><p className="text-sm text-slate-500">{u.name}</p></CardContent></Card>
          ))}
        </div>
      </Section>
    );
  }
  const programs = await getPrograms();
  return (
    <Section title={kind[0].toUpperCase() + kind.slice(1)}>
      <div className="grid gap-4">
        {programs.map((p) => (
          <Card key={p.slug}><CardContent><b>{p.title}</b><p className="text-sm text-slate-500">{p.university} — {p.country}</p><Link href={`/programs/${p.slug}`}><Button className="mt-3">View details</Button></Link></CardContent></Card>
        ))}
      </div>
    </Section>
  );
}
