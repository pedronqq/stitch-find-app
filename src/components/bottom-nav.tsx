import { Link } from "@tanstack/react-router";
import { CircleUserRound, GraduationCap, Map, Search } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Início", icon: Search },
  { to: "/mapa", label: "Mapa", icon: Map },
  { to: "/cursos", label: "Cursos", icon: GraduationCap },
  { to: "/perfil", label: "Perfil", icon: CircleUserRound },
] as const;

export function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md border-t border-border bg-card/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur"
      aria-label="Navegação principal"
    >
      <div className="grid grid-cols-4">
        {ITEMS.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="flex flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 text-[0.7rem] font-medium text-muted-foreground"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            <Icon className="h-6 w-6" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
