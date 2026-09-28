"use client";
import { Phone, MessageCircle, Send, Maximize2, VolumeX } from "lucide-react";

export function FloatingWidgets() {
  return (
    <>
      <div className="fixed bottom-4 left-4 z-50 w-[150px] rounded-3xl border-4 border-white bg-white shadow-2xl overflow-hidden">
        <div className="relative bg-navy-900 text-white text-center">
          <div className="grid place-items-center h-[150px] bg-gradient-to-b from-slate-600 to-slate-800 text-5xl">👨‍💼</div>
          <span className="absolute top-2 right-14 rounded-full bg-cyan-400 px-4 py-1.5 text-sm font-bold text-white">Welcome!</span>
          <span className="absolute left-2 top-2"><VolumeX className="size-4 opacity-70" /></span>
          <span className="absolute bottom-2 right-2 grid size-7 place-items-center rounded-full bg-black/60"><Maximize2 className="size-3.5" /></span>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        <a href="tel:+8801788521234" aria-label="call" className="grid size-12 place-items-center rounded-full bg-brand-500 text-white shadow-xl hover:scale-105"><Phone className="size-5" /></a>
        <a href="#" aria-label="messenger" className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-xl hover:scale-105"><MessageCircle className="size-5" /></a>
        <a href="#" aria-label="whatsapp" className="grid size-12 place-items-center rounded-full bg-green-500 text-white shadow-xl hover:scale-105"><Send className="size-5" /></a>
      </div>
    </>
  );
}
