"use client";
import { usePathname } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWidgets } from "@/components/layout/FloatingWidgets";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const isAdmin = path?.startsWith("/admin");
  if (isAdmin) return <>{children}</>;
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
