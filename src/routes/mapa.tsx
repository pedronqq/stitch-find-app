import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, ChevronRight, MapPin, Scissors, X } from "lucide-react";

import { BottomNav } from "@/components/bottom-nav";
import { PROVIDERS, type Provider } from "@/lib/providers";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa de costureiras e ateliês — Costura Fácil" },
      {
        name: "description",
        content:
          "Veja no mapa as costureiras e os ateliês próximos, toque em um marcador e abra o perfil completo do profissional.",
      },
      { property: "og:title", content: "Mapa de costureiras e ateliês — Costura Fácil" },
      {
        property: "og:description",
        content: "Explore no mapa os profissionais de costura perto de você.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MapaPage,
});

function MapaPage() {
  const [selected, setSelected] = useState<Provider | null>(null);

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background">
      <header className="px-5 pt-[max(1.5rem,env(safe-area-inset-top))]">
        <h1 className="text-2xl font-bold text-foreground">Mapa</h1>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          Rua Marquês de São Vicente, 225
        </p>
      </header>

      <div className="relative mt-4 flex-1 overflow-hidden pb-20">
        <div className="profile-map absolute inset-0">
          <div className="profile-map-road profile-map-road-a" />
          <div className="profile-map-road profile-map-road-b" />
          <div className="profile-map-road profile-map-road-c" />

          {PROVIDERS.map((provider) => {
            const Icon = provider.type === "costureiras" ? Scissors : Building2;
            const active = selected?.slug === provider.slug;
            return (
              <button
                key={provider.slug}
                type="button"
                onClick={() => setSelected(provider)}
                aria-label={provider.name}
                className="absolute -translate-x-1/2 -translate-y-full"
                style={{ left: `${provider.map.x}%`, top: `${provider.map.y}%` }}
              >
                <span
                  className={`flex items-center justify-center rounded-full text-primary-foreground shadow-profile-action transition-transform ${
                    active ? "h-12 w-12 scale-110" : "h-10 w-10"
                  }`}
                  style={{ backgroundColor: provider.color }}
                >
                  <Icon className={active ? "h-6 w-6" : "h-5 w-5"} />
                </span>
              </button>
            );
          })}
        </div>

        {selected && (
          <div className="absolute inset-x-3 bottom-24 z-30">
            <div className="rounded-3xl bg-card p-4 shadow-profile">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <p className="truncate text-lg font-bold text-foreground">{selected.name}</p>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">
                    {selected.tags.join(" • ")}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {selected.distance} • {selected.neighborhood}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Fechar"
                  className="shrink-0 rounded-full bg-secondary p-2 text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <Link
                to={selected.type === "costureiras" ? "/costureiras/$slug" : "/atelies/$slug"}
                params={{ slug: selected.slug }}
                className="mt-3 flex h-12 w-full items-center justify-center gap-1.5 rounded-2xl bg-primary text-base font-semibold text-primary-foreground"
              >
                Ver perfil completo
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
