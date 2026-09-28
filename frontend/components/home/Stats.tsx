import { Users, BookOpen, Landmark, Globe } from "lucide-react";
import { stats } from "@/lib/data";

const icons: Record<string, React.ReactNode> = {
  users: <Users className="size-7 text-brand-500" />,
  book: <BookOpen className="size-7 text-brand-500" />,
  campus: <Landmark className="size-7 text-brand-500" />,
  globe: <Globe className="size-7 text-brand-500" />,
};

export function Stats() {
  return (
    <section className="bg-white">
      <div className="container grid grid-cols-2 lg:grid-cols-4 gap-6 py-8">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-brand-50">{icons[s.icon]}</span>
            <span>
              <span className="block text-2xl font-bold text-brand-500">{s.value}</span>
              <span className="block text-xs font-medium tracking-wide text-slate-500">{s.label}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
