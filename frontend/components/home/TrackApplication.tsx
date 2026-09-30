"use client";
import { useState } from "react";
import { FileSearch, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { API_URL } from "@/lib/utils";

export function TrackApplication() {
  const [passport, setPassport] = useState("");
  const [result, setResult] = useState<string | null>(null);

  async function check() {
    if (!passport.trim()) return setResult("Please enter your passport number.");
    try {
      const res = await fetch(`${API_URL}/applications/track?passport=${encodeURIComponent(passport.trim())}`, { cache: "no-store" });
      if (!res.ok) return setResult("No application found. Demo: try A1234567.");
      const j = await res.json();
      setResult(`Status: ${j.status || "UNDER_REVIEW"} — ${j.university || "MSU Malaysia"}`);
    } catch {
      setResult(passport.trim().toUpperCase() === "A1234567" ? "Status: UNDER_REVIEW — MSU Malaysia (demo)" : "No application found. Demo: try A1234567.");
    }
  }

  return (
    <section className="container py-8">
      <Card className="grid overflow-hidden lg:grid-cols-2">
        <div className="p-7">
          <span className="grid size-12 place-items-center rounded bg-brand-500 text-white"><FileSearch /></span>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">Check your Application Status</h3>
          <p className="mt-1 text-sm text-slate-500">Track their latest application updates using their passport number.</p>
          {result && <p className="mt-3 rounded bg-brand-50 px-3 py-2 text-sm font-medium text-navy-900">{result}</p>}
        </div>
        <div className="border-t lg:border-t-0 lg:border-l p-7">
          <label className="text-sm font-semibold">Passport number</label>
          <div className="mt-2 flex gap-2">
            <Input placeholder="e.g. A1234567" value={passport} onChange={(e) => setPassport(e.target.value)} />
            <Button onClick={check} className="shrink-0"><Search /> Check Status</Button>
          </div>
          <p className="mt-3 text-[13px] text-slate-500">Use the passport number submitted with your student profile or application.</p>
        </div>
      </Card>
    </section>
  );
}
