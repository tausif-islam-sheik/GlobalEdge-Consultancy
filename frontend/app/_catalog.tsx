import { countries, institutions, programs } from "@/lib/data";
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

export function catalogPage(kind: string) {
  if (kind === "countries")
    return (
      <Section title="Countries">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {countries.map((c) => (
            <Card key={c.slug}><CardContent><b>{c.name}</b><p className="text-sm text-slate-500">{c.tag}</p><Link href={`/countries/${c.slug}`}><Button className="mt-3" >View</Button></Link></CardContent></Card>
          ))}
        </div>
      </Section>
    );
  if (kind === "institutions")
    return (
      <Section title="Institutions">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {institutions.map((u) => (
            <Card key={u.short}><CardContent><b style={{ color: u.color }}>{u.short}</b><p className="text-sm text-slate-500">{u.name}</p></CardContent></Card>
          ))}
        </div>
      </Section>
    );
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
