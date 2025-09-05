import React, { useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Playlists() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const { language } = useLanguage();
  const isEs = language === "es";

  const t = isEs
    ? {
        title: "Listas seleccionadas",
        subtitle:
          "Sets seleccionados a mano para cada estado de ánimo y momento. Sumérgete en un paisaje sonoro bañado en neón.",
        highlights: [
          "Deep house, grooves tech y ritmos hipnóticos. Actualizado con frecuencia.",
          "Texturas ambientales exuberantes y downtempo nocturno para concentración y flow.",
          "Selecciones de alta energía para sesiones listas para club y picos de cardio.",
        ],
      }
    : {
        title: "Curated Playlists",
        subtitle:
          "Hand-picked sets to match every mood and moment. Immerse yourself in a neon-drenched soundscape.",
        highlights: [
          "Deep house, tech grooves, and hypnotic rhythms. Updated frequently.",
          "Lush ambient textures and late-night downtempo for focus and flow.",
          "High-energy selects for club-ready sessions and cardio peaks.",
        ],
      };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.innerHTML = "";

    const widget = document.createElement("div");
    widget.className = "elfsight-app-13a51074-5f49-4ef3-a0d5-13957756da12";
    widget.setAttribute("data-elfsight-app-lazy", "true");

    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;

    host.appendChild(script);
    host.appendChild(widget);

    return () => {
      host.innerHTML = "";
    };
  }, []);

  return (
    <div className="dark relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Animated neon background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        {/* radial glows */}
        <div
          className="absolute -top-24 -left-24 h-[60vh] w-[60vw] rounded-full blur-[120px] opacity-25"
          style={{
            background:
              "radial-gradient(closest-side, rgba(110,255,248,0.25), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 h-[60vh] w-[60vw] rounded-full blur-[120px] opacity-20"
          style={{
            background:
              "radial-gradient(closest-side, rgba(110,255,248,0.2), transparent 70%)",
          }}
        />
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(110,255,248,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(110,255,248,0.25) 1px, transparent 1px)",
            backgroundSize: "40px 40px, 40px 40px",
            backgroundPosition: "0 0, 0 0",
            animation: "gridMove 28s linear infinite",
          }}
        />
        {/* scanning light */}
        <div
          className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[rgba(110,255,248,0.07)] to-transparent"
          style={{ animation: "scan 12s linear infinite" }}
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 pb-24 pt-24 md:pt-28">
        {/* Header */}
        <header className="text-center">
          <h1 className="hero-title hero-title-glow text-4xl font-bold tracking-tight md:text-6xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {t.subtitle}
          </p>
        </header>

        {/* Player Card */}
        <section
          id="player"
          className="relative w-full max-w-5xl rounded-xl border border-[rgba(110,255,248,0.25)] bg-card/10 p-3 shadow-[0_0_30px_rgba(110,255,248,0.12)] backdrop-blur-md transition-all hover:shadow-[0_0_44px_rgba(110,255,248,0.2)] md:p-6"
        >
          <div className="pointer-events-none absolute -inset-px rounded-xl ring-1 ring-[rgba(110,255,248,0.25)]" />
          <div className="relative w-full overflow-hidden rounded-lg border border-[rgba(110,255,248,0.2)] bg-black/40">
            <div ref={hostRef} className="w-full" />
          </div>
        </section>

        {/* Highlights */}
        <section className="grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-[rgba(110,255,248,0.2)] bg-card/10 p-4 text-sm text-muted-foreground shadow-[0_0_14px_rgba(110,255,248,0.08)]">
            {t.highlights[0]}
          </div>
          <div className="rounded-lg border border-[rgba(110,255,248,0.2)] bg-card/10 p-4 text-sm text-muted-foreground shadow-[0_0_14px_rgba(110,255,248,0.08)]">
            {t.highlights[1]}
          </div>
          <div className="rounded-lg border border-[rgba(110,255,248,0.2)] bg-card/10 p-4 text-sm text-muted-foreground shadow-[0_0_14px_rgba(110,255,248,0.08)]">
            {t.highlights[2]}
          </div>
        </section>
      </div>
    </div>
  );
}
