"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/utils";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "STUDENT", passportNumber: "" });
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const j = await api<{ email: string; role: string }>("/auth/register", { method: "POST", body: JSON.stringify(form) });
      setMsg(`Registered ${j.email} as ${j.role}. Now login.`);
    } catch (err) { setMsg(err instanceof Error ? err.message : "Failed"); }
  }
  return (
    <section className="container max-w-md py-14">
      <Card><CardContent className="pt-6">
        <h1 className="text-2xl font-bold">Register</h1>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <Input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Input placeholder="Passport No (students)" value={form.passportNumber} onChange={(e) => setForm({ ...form, passportNumber: e.target.value })} />
          <select className="h-11 w-full rounded border px-3 text-sm" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="STUDENT">Student</option><option value="AGENT">Agent</option><option value="INSTITUTION_STAFF">Institution</option>
          </select>
          <Button className="w-full">Create account</Button>
        </form>
        {msg && <p className="mt-3 text-sm">{msg}</p>}
      </CardContent></Card>
    </section>
  );
}
