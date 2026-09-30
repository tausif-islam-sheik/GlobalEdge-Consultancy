import Link from "next/link";
import { Globe2, GraduationCap, Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_.7fr_1.2fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-white/40 text-white"><Globe2 /></span>
            <span className="leading-none">
              <span className="flex items-center gap-1 text-xl font-extrabold text-white"><GraduationCap className="text-brand-500" /> GLOBALEDGE</span>
              <span className="text-sm font-bold tracking-[.2em] text-brand-500">CONSULTANCY</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            GlobalEdge Consultancy is a leading education consultancy firm, providing expert guidance for students aspiring to study abroad.
          </p>
          <div className="mt-4 flex gap-2">
            {[Facebook, Instagram, MessageCircle, Youtube].map((I, i) => (
              <span key={i} className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-brand-500 cursor-pointer"><I className="size-4" /></span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white text-sm tracking-wide">QUICK LINKS</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {["Countries", "Institutions", "Programs", "News", "Announcements", "Services"].map((x) => (
              <li key={x}><Link className="hover:text-brand-500" href={`/${x.toLowerCase()}`}>{x}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white text-sm tracking-wide">SERVICES</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {["Counseling", "Visa Assistance", "IELTS Prep", "Scholarships"].map((x) => (
              <li key={x}><Link className="hover:text-brand-500" href="/services">{x}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white text-sm tracking-wide">CONTACT US</h4>
          <p className="mt-4 text-sm">Ka-7/B, Bashundhara R/A Main Road, Dhaka, Bangladesh, 1229</p>
          <span className="mt-2 inline-flex items-center gap-1 rounded border border-white/20 px-3 py-1.5 text-xs"><MapPin className="size-3.5 text-brand-500" /> Google Map</span>
          <div className="mt-3 grid grid-cols-2 gap-1.5 text-[13px]">
            {["+8801788521234", "+8801332106562", "+8801332106563", "+8801332106564", "+8801332106565", "+8801332106566"].map((p) => (
              <span key={p} className="flex items-center gap-1.5"><Phone className="size-3 text-brand-500" />{p}</span>
            ))}
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-[13px]"><Mail className="size-3.5 text-brand-500" /> support@globaledge.com</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 py-4 text-xs text-slate-400">
          <p>© 2026 GlobalEdge Consultancy. All rights reserved.</p>
          <div className="flex gap-5"><Link href="/contact">Contact Us</Link><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Service</Link></div>
        </div>
      </div>
    </footer>
  );
}
