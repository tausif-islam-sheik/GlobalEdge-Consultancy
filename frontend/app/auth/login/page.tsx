"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth, dashboardFor } from "@/lib/auth";
import { api } from "@/lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    try {
      const j = await api<{ access_token: string; user: { id: string; email: string; role: string; name?: string } }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      login(j.access_token, j.user);
      router.push(dashboardFor(j.user?.role));
    } catch (err) { setMsg(err instanceof Error ? err.message : "Login failed."); }
  }
  return (
    <section className="container max-w-md py-14">
      <Card><CardContent className="pt-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="mt-1 text-sm text-slate-500">Demo admin: admin@globaledge.com / admin123</p>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button className="w-full">Login</Button>
        </form>
        {msg && <p className="mt-3 text-sm">{msg}</p>}
      </CardContent></Card>
    </section>
  );
}
