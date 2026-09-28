import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { SiteShell } from "@/components/layout/SiteShell";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GlobalEdge Consultancy | Study Abroad from Bangladesh",
  description:
    "GlobalEdge Consultancy — find programs, compare institutions, track applications, and get expert study-abroad guidance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans bg-white text-slate-800 antialiased">
        <AuthProvider>
          <SiteShell>{children}</SiteShell>
        </AuthProvider>
      </body>
    </html>
  );
}
