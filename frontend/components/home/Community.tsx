import Link from "next/link";
import { Facebook, Instagram, MessageCircle, Youtube } from "lucide-react";

export function Community() {
  return (
    <section className="bg-[#2f7fe0] py-14 text-white">
      <div className="container text-center">
        <h2 className="text-3xl font-extrabold">Join our community</h2>
        <div className="mt-4 flex justify-center gap-4">
          <Facebook /><Instagram /><MessageCircle /><Youtube />
        </div>
        <div className="mx-auto mt-8 flex max-w-3xl flex-col sm:flex-row items-center gap-6 rounded-2xl bg-white p-6 text-left text-navy-900 shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&q=80" alt="community" className="size-28 rounded-full object-cover" />
          <div>
            <p className="text-lg font-medium">Get quality information about study abroad, events, and offers.</p>
            <Link href="#" className="mt-1 inline-block font-semibold text-blue-600 underline underline-offset-4">Join Our Community &gt;</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
