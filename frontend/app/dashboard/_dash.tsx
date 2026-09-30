export default function Dash({ params }: { params: { title?: string } }) {
  return null;
}
export function dashPage(title: string, desc: string) {
  return (
    <section className="container py-12">
      <h1 className="text-3xl font-extrabold text-navy-900">{title}</h1>
      <p className="mt-2 text-slate-500">{desc}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {["Overview", "Applications", "Documents"].map((c) => (
          <div key={c} className="rounded border bg-white p-6 shadow-soft"><b>{c}</b><p className="text-sm text-slate-500">Connect NestJS API to load live data.</p></div>
        ))}
      </div>
    </section>
  );
}
