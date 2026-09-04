"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function AdminLogin() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("LOGIN ERROR:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      if (!data.session) {
        setError("Login succeeded, but no session was created.");
        setLoading(false);
        return;
      }

      router.replace("/admin/reservations");
      router.refresh();
    } catch (err) {
      console.error("LOGIN EXCEPTION:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in."
      );
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-nova-espresso px-5 text-background">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-orange-300" />

            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-orange-200">
              NOVA — Admin
            </span>

            <span className="h-px w-8 bg-orange-300" />
          </div>

          <h1 className="mt-6 font-display text-5xl tracking-[-0.04em]">
            Welcome back.
          </h1>

          <p className="mt-3 text-sm text-white/40">
            Sign in to manage reservations.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl sm:p-9"
        >
          <label className="block">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              Email
            </span>

            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
              className="mt-3 w-full border-b border-white/15 bg-transparent pb-3 text-sm text-white outline-none placeholder:text-white/20 transition-colors focus:border-orange-200"
            />
          </label>

          <label className="mt-7 block">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              Password
            </span>

            <input
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="mt-3 w-full border-b border-white/15 bg-transparent pb-3 text-sm text-white outline-none placeholder:text-white/20 transition-colors focus:border-orange-200"
            />
          </label>

          {error && (
            <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-full bg-background px-6 py-4 text-black transition-all duration-300 hover:bg-orange-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
              {loading ? "Signing in..." : "Sign in"}
            </span>
          </button>
        </form>
      </div>
    </main>
  );
}