import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Bell,
  Briefcase,
  ChevronRight,
  CircleUserRound,
  GraduationCap,
  Heart,
  Images,
  LoaderCircle,
  MapPin,
  Settings,
} from "lucide-react";

import { BottomNav } from "@/components/bottom-nav";
import { useRole } from "@/lib/role";

const CLIENT_ITEMS = [
  { label: "Favoritos", icon: Heart },
  { label: "Meu endereço", icon: MapPin },
  { label: "Notificações", icon: Bell },
  { label: "Configurações", icon: Settings },
];

const PROVIDER_ITEMS = [
  { label: "Meus serviços", icon: Briefcase },
  { label: "Trabalhos realizados", icon: Images },
  { label: "Cursos concluídos", icon: GraduationCap },
  { label: "Verificação de documento", icon: BadgeCheck },
  { label: "Configurações", icon: Settings },
];

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — Costurando" },
      {
        name: "description",
        content: "Gerencie seus favoritos, endereço, notificações e preferências no Costurando.",
      },
      { property: "og:title", content: "Meu perfil — Costurando" },
      {
        property: "og:description",
        content: "Favoritos, endereço e preferências da sua conta Costurando.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PerfilPage,
});

function PerfilPage() {
  const { role, setRole, isChangingRole } = useRole();
  const items = role === "cliente" ? CLIENT_ITEMS : PROVIDER_ITEMS;

  return (
    <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background px-5 pb-28 pt-[max(1.5rem,env(safe-area-inset-top))] md:max-w-3xl md:px-8 md:pb-16 md:pt-24">
      <h1 className="text-2xl font-bold text-foreground">Perfil</h1>

      <div className={`mt-4 grid grid-cols-2 gap-1 rounded-full bg-secondary p-1 transition-opacity ${isChangingRole ? "pointer-events-none opacity-50" : ""}`}>
        <button
          type="button"
          onClick={() => setRole("cliente")}
          disabled={isChangingRole}
          className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-all active:scale-95 ${
            role === "cliente" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
          }`}
        >
          <CircleUserRound className="h-4 w-4" />
          Cliente
        </button>
        <button
          type="button"
          onClick={() => setRole("prestadora")}
          disabled={isChangingRole}
          className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-all active:scale-95 ${
            role === "prestadora" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
          }`}
        >
          <Briefcase className="h-4 w-4" />
          Prestadora
        </button>
      </div>

      <div className={`mt-4 flex items-center gap-4 rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border/60 transition-opacity ${isChangingRole ? "opacity-30" : ""}`}>
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-secondary text-primary">
          <CircleUserRound className="h-9 w-9" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-foreground">
            {role === "cliente" ? "Visitante" : "Minha Costura Atelier"}
          </p>
          <p className="truncate text-sm text-muted-foreground">Rua Marquês de São Vicente, 225</p>
          {role === "prestadora" && (
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-profile-blue">
              <BadgeCheck className="h-3.5 w-3.5" />
              Documento verificado
            </span>
          )}
        </div>
      </div>

      <div className={`mt-4 overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border/60 transition-opacity ${isChangingRole ? "opacity-30" : ""}`}>
        {items.map(({ label, icon: Icon }, index) => (
          <div
            key={label}
            className="flex items-center gap-3 border-b border-border/60 px-4 py-4 transition-colors last:border-b-0 active:bg-secondary/60"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <Icon className="h-5 w-5 shrink-0 text-primary" />
            <span className="min-w-0 flex-1 truncate text-foreground">{label}</span>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/60" />
          </div>
        ))}
      </div>

      {isChangingRole && (
        <div className="absolute inset-0 z-50 flex min-h-[100dvh] flex-col items-center justify-center bg-background/90 px-8 text-center backdrop-blur-sm animate-in fade-in duration-300">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            <LoaderCircle className="h-10 w-10 animate-spin" />
          </div>
          <h2 className="mt-5 text-xl font-bold text-foreground">Preparando seu espaço</h2>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Estamos alternando para o modo {role === "cliente" ? "prestadora de serviço" : "cliente"}.
          </p>
          <div className="mt-5 h-1.5 w-48 overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
