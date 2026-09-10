import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Scissors, Building2, Search, ChevronRight, MapPin, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/bottom-nav";
import { PROVIDERS, type Provider, type ProviderType } from "@/lib/providers";
import { providerPhoto } from "@/lib/photos";
import { chipStyle } from "@/lib/filter-colors";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Costura Fácil — Encontre costureiras e ateliês perto de você" },
      {
        name: "description",
        content:
          "Busque costureiras e ateliês perto de você, filtre por serviço e encontre o profissional ideal para consertos e roupas sob medida.",
      },
      { property: "og:title", content: "Costura Fácil — Costureiras e ateliês perto de você" },
      {
        property: "og:description",
        content:
          "Busque costureiras e ateliês perto de você, filtre por serviço e encontre o profissional ideal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Tab = ProviderType;

const COSTUREIRAS = PROVIDERS.filter((provider) => provider.type === "costureiras");
const ATELIES = PROVIDERS.filter((provider) => provider.type === "atelies");

const LOCATION = "Rua Marquês de São Vicente, 225";

const FILTER_CHIPS: Record<Tab, string[]> = {
  costureiras: ["Consertos", "Roupas sob medida", "Recriação de roupas", "Peças de decoração"],
  atelies: ["Consertos", "Roupas sob medida", "Alta costura", "Bordados"],
};

function AvatarBlock({ provider }: { provider: Provider }) {
  const photo = providerPhoto(provider.slug);
  if (photo) {
    return (
      <img
        src={photo}
        alt={`Foto de ${provider.name}`}
        className="h-20 w-20 shrink-0 rounded-2xl object-cover"
      />
    );
  }
  return (
    <div
      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl"
      style={{ backgroundColor: `color-mix(in oklab, ${provider.color} 12%, white)` }}
    >
      <Scissors className="h-9 w-9" style={{ color: provider.color }} strokeWidth={1.8} />
    </div>
  );
}

function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Link
      to={provider.type === "costureiras" ? "/costureiras/$slug" : "/atelies/$slug"}
      params={{ slug: provider.slug }}
      className="group flex w-full items-center gap-4 rounded-2xl bg-card p-4 text-left shadow-sm ring-1 ring-border/60 transition-shadow hover:shadow-md"
    >
      <AvatarBlock provider={provider} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-lg font-semibold text-foreground">
            {provider.name}
          </span>
          {provider.verified && (
            <BadgeCheck className="h-5 w-5 shrink-0 text-primary" fill="var(--color-primary)" stroke="var(--color-card)" />
          )}
        </div>
        <p className="mt-1 truncate text-sm text-muted-foreground">
          {provider.tags.join(" • ")}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {provider.distance} • {provider.neighborhood}
        </p>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function Index() {
  const [tab, setTab] = useState<Tab>("costureiras");
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const providers = tab === "costureiras" ? COSTUREIRAS : ATELIES;

  const results = useMemo(() => {
    let list = providers;
    if (activeFilter) {
      list = list.filter((p) => p.tags.some((t) => t === activeFilter));
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.neighborhood.toLowerCase().includes(q)
      );
    }
    return list;
  }, [providers, activeFilter, query]);

  const selectTab = (t: Tab) => {
    setTab(t);
    setActiveFilter(null);
  };

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background px-5 pb-28 pt-[max(1.5rem,env(safe-area-inset-top))] md:max-w-5xl md:px-8 md:pb-16 md:pt-24">
      {/* Location (estática) */}
      <div>
        <p className="text-sm text-muted-foreground">Sua localização</p>
        <p className="mt-1 flex items-center gap-1.5 text-lg font-bold text-foreground">
          <MapPin className="h-5 w-5 shrink-0 text-primary" />
          <span className="truncate">{LOCATION}</span>
        </p>
      </div>

      {/* Search bar */}
      <div className="mt-5 flex items-center gap-3 rounded-full bg-card px-5 py-3.5 shadow-sm ring-1 ring-border/70">
        <Search className="h-5 w-5 shrink-0 text-primary" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar costureiras…"
          className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* Tabs */}
      <div className="mt-6 grid grid-cols-2 gap-1 rounded-full bg-secondary p-1 md:max-w-md">
        <Button
          variant="ghost"
          onClick={() => selectTab("costureiras")}
          className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-all ${
            tab === "costureiras"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Scissors className="h-4 w-4" />
          Costureiras
        </Button>
        <Button
          variant="ghost"
          onClick={() => selectTab("atelies")}
          className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-all ${
            tab === "atelies"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Building2 className="h-4 w-4" />
          Ateliês
        </Button>
      </div>

      {/* Filter chips */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTER_CHIPS[tab].map((chip) => {
          const active = activeFilter === chip;
          return (
            <Button
              variant="ghost"
              key={chip}
              onClick={() => setActiveFilter(active ? null : chip)}
              style={chipStyle(chip, active)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-transparent ${
                active ? "" : "hover:brightness-95"
              }`}
            >
              {chip}
            </Button>
          );
        })}
      </div>

      {/* Results */}
      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {results.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Nenhum resultado encontrado.
          </p>
        ) : (
          results.map((p) => <ProviderCard key={p.name} provider={p} />)
        )}
      </div>

      <BottomNav />
    </div>
  );
}
