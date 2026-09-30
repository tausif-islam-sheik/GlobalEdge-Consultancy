import { ChevronDown } from "lucide-react";
import { reviews } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function Reviews() {
  return (
    <section className="bg-slate-50 py-14">
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold">Student Reviews</h2>
        <p className="mt-2 text-center text-slate-500">What students say about their study abroad journey with us</p>
        <div className="mx-auto mt-8 grid max-w-5xl gap-5 md:grid-cols-2">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded border bg-white p-6 shadow-soft">
              <blockquote className="text-[15px] leading-7 text-slate-700">{r.text}</blockquote>
              <figcaption className="mt-6 border-t pt-4">
                <b className="block">{r.name}</b>
                <span className="text-xs text-slate-500">{r.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6 text-center"><Button variant="outline" className="rounded border-slate-200 text-navy-900">View More <ChevronDown /></Button></div>
      </div>
    </section>
  );
}
