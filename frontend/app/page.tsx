import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { FinderBanner } from "@/components/home/FinderBanner";
import { TrackApplication } from "@/components/home/TrackApplication";
import { TopInstitutions } from "@/components/home/TopInstitutions";
import { PopularPrograms } from "@/components/home/PopularPrograms";
import { FavoriteInstitutions } from "@/components/home/FavoriteInstitutions";
import { Countries } from "@/components/home/Countries";
import { News } from "@/components/home/News";
import { SuccessStories } from "@/components/home/SuccessStories";
import { Reviews } from "@/components/home/Reviews";
import { Community } from "@/components/home/Community";
import { Button } from "@/components/ui/button";

function ServicesStrip() {
  const items = ["Counseling", "Visa Assistance", "IELTS Prep", "Scholarships", "Application Filing", "Pre-departure Briefing"];
  return (
    <section className="container py-10 text-center">
      <div className="flex flex-wrap justify-center gap-3">
        {items.map((s) => (
          <span key={s} className="rounded-full border bg-white px-5 py-2 text-sm font-medium shadow-sm">{s}</span>
        ))}
      </div>
      <Button size="pill" className="mt-6">All Services</Button>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FinderBanner />
      <TrackApplication />
      <TopInstitutions />
      <PopularPrograms />
      <FavoriteInstitutions />
      <ServicesStrip />
      <Countries />
      <News />
      <SuccessStories />
      <Reviews />
      <Community />
    </>
  );
}
