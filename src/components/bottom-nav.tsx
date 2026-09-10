import { Link } from "@tanstack/react-router";
import { CircleUserRound, GraduationCap, Map, Scissors, Search } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";

const ITEMS = [
  { to: "/", label: "Início", icon: Search },
  { to: "/mapa", label: "Mapa", icon: Map },
  { to: "/cursos", label: "Cursos", icon: GraduationCap },
  { to: "/perfil", label: "Perfil", icon: CircleUserRound },
] as const;

export function BottomNav() {
  return (
    <>
      {/* Mobile: barra inferior */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md border-t border-border bg-card/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden"
        aria-label="Navegação principal"
      >
        <div className="grid grid-cols-4">
          {ITEMS.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 text-[0.7rem] font-medium text-muted-foreground transition-colors"
              activeProps={{ className: "text-primary font-semibold" }}
            >
              <Icon className="h-6 w-6" />
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop: barra superior */}
      <nav
        className="fixed inset-x-0 top-0 z-40 hidden border-b border-border bg-card/90 backdrop-blur md:block"
        aria-label="Navegação principal"
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-8">
          <Link to="/" className="flex items-center gap-2 font-bold text-foreground">
            <Scissors className="h-5 w-5 text-primary" />
            Costura Fácil
          </Link>
          <div className="flex items-center gap-1">
            {ITEMS.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/" }}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-primary font-semibold" }}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <span className="mx-1 h-6 w-px bg-border" />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}
