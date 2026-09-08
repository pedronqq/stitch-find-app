import { createFileRoute } from "@tanstack/react-router";
import { Bell, ChevronRight, CircleUserRound, Heart, MapPin, Settings } from "lucide-react";

import { BottomNav } from "@/components/bottom-nav";

const ITEMS = [
  { label: "Favoritos", icon: Heart },
  { label: "Meu endereço", icon: MapPin },
  { label: "Notificações", icon: Bell },
  { label: "Configurações", icon: Settings },
];

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — Costura Fácil" },
      {
        name: "description",
        content: "Gerencie seus favoritos, endereço, notificações e preferências no Costura Fácil.",
      },
      { property: "og:title", content: "Meu perfil — Costura Fácil" },
      {
        property: "og:description",
        content: "Favoritos, endereço e preferências da sua conta Costura Fácil.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PerfilPage,
});

function PerfilPage() {
  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background px-5 pb-28 pt-[max(1.5rem,env(safe-area-inset-top))] md:max-w-3xl md:px-8 md:pb-16 md:pt-24">
      <h1 className="text-2xl font-bold text-foreground">Perfil</h1>

      <div className="mt-5 flex items-center gap-4 rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border/60">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-secondary text-primary">
          <CircleUserRound className="h-9 w-9" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-foreground">Visitante</p>
          <p className="truncate text-sm text-muted-foreground">Rua Marquês de São Vicente, 225</p>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border/60">
        {ITEMS.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-3 border-b border-border/60 px-4 py-4 last:border-b-0"
          >
            <Icon className="h-5 w-5 shrink-0 text-primary" />
            <span className="min-w-0 flex-1 truncate text-foreground">{label}</span>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/60" />
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
