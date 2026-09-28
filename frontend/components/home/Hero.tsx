"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80", label: "Study Abroad" },
  { img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80", label: "Top Universities" },
];

export function Hero() {
  const [i, setI] = useState(0);
  return (
    <section className="relative h-[300px] md:h-[440px] overflow-hidden bg-sky-200">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={slides[i].img} alt={slides[i].label} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-900/10 to-transparent" />
      <button onClick={() => setI((i + slides.length - 1) % slides.length)} aria-label="prev" className="absolute left-4 top-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full bg-white/40 text-white backdrop-blur hover:bg-white/60"><ChevronLeft /></button>
      <button onClick={() => setI((i + 1) % slides.length)} aria-label="next" className="absolute right-4 top-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full bg-white/40 text-white backdrop-blur hover:bg-white/60"><ChevronRight /></button>
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, d) => (
          <span key={d} onClick={() => setI(d)} className={`h-2.5 cursor-pointer rounded-full transition-all ${d === i ? "w-8 bg-white" : "w-2.5 bg-white/60"}`} />
        ))}
      </div>
    </section>
  );
}
