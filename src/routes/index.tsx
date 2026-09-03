import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Scissors,
  Building2,
  Search,
  Star,
  ChevronDown,
  ChevronRight,
  MapPin,
  BadgeCheck,
} from "lucide-react";

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

type Tab = "costureiras" | "atelies";

type Provider = {
  name: string;
  rating: number;
  reviews: number;
  tags: string[];
  distance: string;
  neighborhood: string;
  color: string;
  verified: boolean;
};

const COSTUREIRAS: Provider[] = [
  {
    name: "Dona Lúcia Costureira",
    rating: 4.9,
    reviews: 120,
    tags: ["Consertos", "Recriação de roupas"],
    distance: "0.8 km",
    neighborhood: "Gávea",
    color: "oklch(0.62 0.19 250)",
    verified: true,
  },
  {
    name: "Tia Joana Home",
    rating: 4.7,
    reviews: 210,
    tags: ["Peças de decoração", "Consertos"],
    distance: "3.1 km",
    neighborhood: "Copacabana",
    color: "oklch(0.7 0.17 60)",
    verified: true,
  },
  {
    name: "Atelier da Marta",
    rating: 4.8,
    reviews: 86,
    tags: ["Roupas sob medida", "Ajustes finos"],
    distance: "1.4 km",
    neighborhood: "Leblon",
    color: "oklch(0.6 0.15 160)",
    verified: false,
  },
  {
    name: "Seu Antônio Alfaiate",
    rating: 4.6,
    reviews: 54,
    tags: ["Roupas sob medida", "Consertos"],
    distance: "2.2 km",
    neighborhood: "Botafogo",
    color: "oklch(0.62 0.14 330)",
    verified: true,
  },
];

const ATELIES: Provider[] = [
  {
    name: "Ateliê Fio & Forma",
    rating: 4.8,
    reviews: 95,
    tags: ["Roupas sob medida", "Alta costura"],
    distance: "1.1 km",
    neighborhood: "Gávea",
    color: "oklch(0.58 0.16 300)",
    verified: true,
  },
  {
    name: "Oficina do Tecido",
    rating: 4.5,
    reviews: 142,
    tags: ["Consertos", "Bordados"],
    distance: "2.6 km",
    neighborhood: "Ipanema",
    color: "oklch(0.6 0.15 200)",
    verified: false,
  },
  {
    name: "Ateliê Casa Nova",
    rating: 4.9,
    reviews: 63,
    tags: ["Recriação de roupas", "Roupas sob medida"],
    distance: "3.8 km",
    neighborhood: "Copacabana",
    color: "oklch(0.68 0.15 40)",
    verified: true,
  },
];

const LOCATIONS = [
  "Rua Marquês de São Vicente, 225",
  "Av. Atlântica, 1702 — Copacabana",
  "Rua Visconde de Pirajá, 500 — Ipanema",
];

const FILTER_CHIPS: Record<Tab, string[]> = {
  costureiras: ["Consertos", "Roupas sob medida", "Recriação de roupas", "Ajustes finos"],
  atelies: ["Consertos", "Roupas sob medida", "Alta costura", "Bordados"],
};

function AvatarBlock({ provider }: { provider: Provider }) {
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
    <button className="group flex w-full items-center gap-4 rounded-2xl bg-card p-4 text-left shadow-sm ring-1 ring-border/60 transition-shadow hover:shadow-md">
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
        <div className="mt-1 flex items-center gap-1.5">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-foreground">{provider.rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({provider.reviews})</span>
        </div>
        <p className="mt-1 truncate text-sm text-muted-foreground">
          {provider.tags.join(" • ")}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {provider.distance} • {provider.neighborhood}
        </p>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

function Index() {
  const [tab, setTab] = useState<Tab>("costureiras");
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [locationOpen, setLocationOpen] = useState(false);

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
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background px-5 pb-10 pt-8">
      {/* Location selector */}
      <div className="relative">
        <p className="text-sm text-muted-foreground">Sua localização</p>
        <button
          onClick={() => setLocationOpen((o) => !o)}
          className="mt-1 flex items-center gap-1.5 text-xl font-bold text-foreground"
        >
          <MapPin className="h-5 w-5 text-primary" />
          <span className="truncate">{location}</span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-primary transition-transform ${locationOpen ? "rotate-180" : ""}`}
          />
        </button>
        {locationOpen && (
          <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl bg-card shadow-lg ring-1 ring-border">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => {
                  setLocation(loc);
                  setLocationOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-4 py-3 text-left text-sm transition-colors hover:bg-accent ${
                  loc === location ? "font-semibold text-primary" : "text-foreground"
                }`}
              >
                <MapPin className="h-4 w-4 shrink-0" />
                {loc}
              </button>
            ))}
          </div>
        )}
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
      <div className="mt-6 grid grid-cols-2 gap-1 rounded-full bg-secondary p-1">
        <button
          onClick={() => selectTab("costureiras")}
          className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-all ${
            tab === "costureiras"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Scissors className="h-4 w-4" />
          Costureiras
        </button>
        <button
          onClick={() => selectTab("atelies")}
          className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-all ${
            tab === "atelies"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Building2 className="h-4 w-4" />
          Ateliês
        </button>
      </div>

      {/* Filter chips */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTER_CHIPS[tab].map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveFilter(activeFilter === chip ? null : chip)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeFilter === chip
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mt-5 flex flex-col gap-3">
        {results.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Nenhum resultado encontrado.
          </p>
        ) : (
          results.map((p) => <ProviderCard key={p.name} provider={p} />)
        )}
      </div>
    </div>
  );
}
