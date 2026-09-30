import Link from "next/link";
import { Play } from "lucide-react";
import { videos } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function SuccessStories() {
  return (
    <section className="container py-6">
      <h2 className="text-center text-3xl font-extrabold text-brand-500">Institution Success Stories</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <div key={v.title} className="group relative h-52 cursor-pointer overflow-hidden rounded bg-navy-900">
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-brand-600/40 to-navy-950/70 p-6 text-center font-bold text-white">{v.title}</div>
            <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-red-600 text-white shadow-xl group-hover:scale-105"><Play className="ml-1" /></span>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center"><Link href="#"><Button size="pill">View More on YouTube</Button></Link></div>
    </section>
  );
}
