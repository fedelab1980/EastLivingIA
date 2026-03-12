"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";
import BrandLogo from "@/components/BrandLogo";

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
          HERO — Fondo Azul
          ═══════════════════════════════════════════ */}
      <section className="flex min-h-screen flex-col items-center justify-center bg-azul px-6">
        <div className="text-hueso">
          <BrandLogo size="lg" descriptorClassName="text-arena" />
        </div>

        {/* Separador */}
        <div className="mt-12 h-px w-16 bg-arena/30" />

        {/* Slogan */}
        <p className="mt-12 font-serif text-3xl font-light italic text-hueso sm:text-4xl">
          Vivir el Este
        </p>
      </section>

      {/* ═══════════════════════════════════════════
          SECCIÓN PRINCIPAL — Fondo Hueso
          ═══════════════════════════════════════════ */}
      <section className="flex flex-col items-center bg-hueso px-6 py-24 text-center sm:py-32">
        {/* Titular */}
        <h2 className="font-serif text-3xl font-light text-azul sm:text-4xl">
          Donde el paisaje es el proyecto.
        </h2>

        {/* Párrafo introductorio */}
        <p className="mt-8 max-w-xl font-sans text-base font-light leading-relaxed text-bronce sm:text-lg">
          Estamos creando una nueva forma de habitar Punta del Este. Desarrollos
          inmobiliarios donde la elegancia del diseño contemporáneo se integra en
          perfecta armonía con la naturaleza.
        </p>

        {/* Separador */}
        <div className="mt-16 h-px w-16 bg-arena" />

        {/* Call to action */}
        <p className="mt-16 font-serif text-xl font-light italic text-azul sm:text-2xl">
          Sé el primero en descubrir nuestro próximo desarrollo.
        </p>

        {/* Formulario */}
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
            className="flex-1 border-b border-arena bg-transparent px-4 py-3 font-sans text-sm text-azul outline-none placeholder:text-taupe focus:border-azul"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded bg-terra px-8 py-3 font-sans text-sm font-medium tracking-wider text-hueso transition hover:opacity-90 disabled:opacity-50"
          >
            {status === "loading" ? "Enviando..." : "Notificarme"}
          </button>
        </form>

        {/* Feedback */}
        {status === "success" && (
          <p className="mt-4 font-sans text-sm text-terra">
            ¡Gracias! Te notificaremos con novedades.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 font-sans text-sm text-red-700">{errorMsg}</p>
        )}
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER — Fondo Arena
          ═══════════════════════════════════════════ */}
      <footer className="bg-arena px-6 py-12 text-center">
        <p className="font-sans text-[10px] leading-relaxed tracking-wide text-azul/60">
          Federico La Buonora &nbsp;|&nbsp; federico@eastliving.uy
          &nbsp;|&nbsp; +598 99 000 000 &nbsp;|&nbsp; Punta del Este, Uruguay
        </p>
        <p className="mt-4 font-sans text-[10px] text-azul/40">
          &copy; {new Date().getFullYear()} EAST Living. Todos los derechos
          reservados.
        </p>
      </footer>
    </>
  );
}
