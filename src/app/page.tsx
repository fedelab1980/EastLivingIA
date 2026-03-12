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
    <>
      {/* ═══════════════════════════════════════════
          HERO — Fondo Azul Profundo
          ═══════════════════════════════════════════ */}
      <section className="flex min-h-screen flex-col items-center justify-center bg-azul-profundo px-6 text-center">
        {/* Logotipo */}
        <h1 className="flex flex-col items-center leading-none">
          <span className="font-sans text-[clamp(3rem,10vw,7.5rem)] font-semibold uppercase tracking-[0.3em] text-blanco-hueso">
            EAST
          </span>
          <span className="font-serif text-[clamp(2.5rem,8vw,6rem)] font-light italic text-blanco-hueso">
            Living
          </span>
        </h1>

        {/* Descriptor */}
        <p className="mt-6 font-sans text-[9px] font-light uppercase tracking-[0.4em] text-arena-suave">
          Arquitectura &amp; Desarrollo
        </p>

        {/* Separador */}
        <div className="mt-10 h-px w-16 bg-arena-suave/40" />

        {/* Slogan */}
        <p className="mt-10 font-serif text-2xl font-light italic text-blanco-hueso sm:text-3xl">
          Vivir el Este
        </p>
      </section>

      {/* ═══════════════════════════════════════════
          CUERPO — Fondo Blanco Hueso
          ═══════════════════════════════════════════ */}
      <section className="flex flex-col items-center bg-blanco-hueso px-6 py-24 text-center sm:py-32">
        {/* Tagline */}
        <h2 className="font-serif text-3xl font-light text-azul-profundo sm:text-4xl">
          Donde el paisaje es el proyecto.
        </h2>

        {/* Párrafo introductorio */}
        <p className="mt-8 max-w-xl font-sans text-base font-light leading-relaxed text-bronce sm:text-lg">
          Estamos creando una nueva forma de habitar Punta del Este. Desarrollos
          inmobiliarios donde la elegancia del diseño contemporáneo se integra en
          perfecta armonía con la naturaleza.
        </p>

        {/* Separador */}
        <div className="mt-16 h-px w-16 bg-arena-suave" />

        {/* ── Sección de captura ── */}
        <p className="mt-16 font-serif text-xl font-light italic text-azul-profundo sm:text-2xl">
          Sé el primero en descubrir nuestro próximo desarrollo.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border-b border-arena-suave bg-transparent px-4 py-3 font-sans text-sm text-azul-profundo outline-none placeholder:text-bronce/50 focus:border-azul-profundo"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded bg-terracota px-8 py-3 font-sans text-sm font-medium tracking-wider text-blanco-hueso transition hover:opacity-90 disabled:opacity-50"
          >
            {status === "loading" ? "Enviando..." : "Notificarme"}
          </button>
        </form>

        {/* Feedback */}
        {status === "success" && (
          <p className="mt-4 font-sans text-sm text-terracota">
            ¡Gracias! Te notificaremos con novedades.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 font-sans text-sm text-red-700">{errorMsg}</p>
        )}
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER — Fondo Azul Profundo
          ═══════════════════════════════════════════ */}
      <footer className="flex flex-col items-center gap-6 bg-azul-profundo px-6 py-16 text-center">
        <p className="font-sans text-xs font-light tracking-widest text-arena-suave/70">
          Punta del Este, Uruguay
        </p>

        <div className="flex flex-col items-center gap-1">
          <p className="font-sans text-sm font-light text-blanco-hueso">
            Federico La Buonora
          </p>
          <a
            href="mailto:federico@eastliving.uy"
            className="font-sans text-xs text-arena-suave transition hover:text-blanco-hueso"
          >
            federico@eastliving.uy
          </a>
          <a
            href="tel:+59899000000"
            className="font-sans text-xs text-arena-suave transition hover:text-blanco-hueso"
          >
            +598 99 000 000
          </a>
        </div>

        <div className="h-px w-12 bg-arena-suave/30" />

        <p className="font-sans text-[10px] text-arena-suave/50">
          &copy; {new Date().getFullYear()} EAST Living. Todos los derechos
          reservados.
        </p>
      </footer>
    </>
  );
}
