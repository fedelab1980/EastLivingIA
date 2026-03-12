"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const { error } = await getSupabase().from("waitlist").insert({ email });

    if (error) {
      setStatus("error");
      if (error.code === "23505") {
        setErrorMsg("Este email ya está registrado.");
      } else {
        setErrorMsg("Ocurrió un error. Intentá de nuevo.");
      }
      return;
    }

    setStatus("success");
    setEmail("");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Cuando tengas el logo, reemplazá el h1 por <Image src="/logo.svg" ... /> */}
      <h1 className="text-5xl font-bold tracking-tight text-brand-primary sm:text-6xl">
        East Living
      </h1>

      <p className="mt-4 max-w-md text-lg text-muted">
        El futuro de la gestión de desarrollos inmobiliarios en Uruguay.
      </p>

      {/* Separador decorativo */}
      <div className="mt-8 h-px w-24 bg-brand-secondary" />

      {/* Formulario Waitlist */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex w-full max-w-sm flex-col gap-3 sm:flex-row"
      >
        <input
          type="email"
          required
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm text-foreground outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {status === "loading" ? "Enviando..." : "Suscribirse"}
        </button>
      </form>

      {/* Mensajes de feedback */}
      {status === "success" && (
        <p className="mt-4 text-sm text-brand-accent">
          ¡Gracias! Te avisaremos cuando lancemos.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-600">{errorMsg}</p>
      )}

      {/* Footer */}
      <footer className="mt-16 text-xs text-muted">
        &copy; {new Date().getFullYear()} East Living. Todos los derechos
        reservados.
      </footer>
    </main>
  );
}
