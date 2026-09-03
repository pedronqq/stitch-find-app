import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  Check,
  ChevronLeft,
  CircleUserRound,
  GraduationCap,
  Heart,
  Info,
  Map,
  MapPin,
  MessageCircle,
  Scissors,
  Search,
  Shirt,
  ShoppingBag,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Provider } from "@/lib/providers";

const portfolioIcons = {
  scissors: Scissors,
  shirt: Shirt,
  bag: ShoppingBag,
};

export function ProviderProfile({ provider }: { provider: Provider }) {
  const [favorite, setFavorite] = useState(false);
  const [contacted, setContacted] = useState(false);

  return (
    <div className="min-h-screen bg-profile-shell pb-44 text-foreground sm:py-8 sm:pb-48">
      <main className="mx-auto w-full max-w-2xl bg-card shadow-profile sm:overflow-hidden sm:rounded-profile">
        <header className="flex items-center justify-between px-6 pb-5 pt-7">
          <Button asChild variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-card shadow-profile-action hover:bg-secondary" aria-label="Voltar">
            <Link to="/">
              <ChevronLeft className="h-7 w-7" strokeWidth={2.5} />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-card shadow-profile-action hover:bg-secondary"
            aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            onClick={() => setFavorite((value) => !value)}
          >
            <Heart className={`h-7 w-7 ${favorite ? "fill-primary text-primary" : "text-foreground"}`} />
          </Button>
        </header>

        <div className="px-6">
          <div className="flex aspect-[1.72] items-center justify-center rounded-3xl bg-profile-cover">
            <Scissors className="h-28 w-28 text-profile-blue" strokeWidth={1.7} />
          </div>

          <section className="pb-7 pt-7">
            <h1 className="text-[2rem] font-bold leading-tight">{provider.name}</h1>
            {provider.verified && (
              <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-profile-blue">
                <BadgeCheck className="h-5 w-5 fill-profile-blue text-primary-foreground" />
                Documento verificado
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg">
              <span className="flex items-center gap-2 font-semibold">
                <Star className="h-6 w-6 fill-profile-star text-profile-star" />
                {provider.rating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">({provider.reviews}) avaliações</span>
              <span className="text-muted-foreground">•</span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="text-profile-green">▣</span>
                {provider.price}
              </span>
            </div>
          </section>
        </div>

        <div className="h-px bg-border" />

        <div className="space-y-10 px-6 pb-10 pt-8">
          <section>
            <h2 className="text-2xl font-bold">Sobre</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{provider.about}</p>
          </section>

          <section>
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-profile-course" />
              <h2 className="text-2xl font-bold">Formação e Aprendizado</h2>
            </div>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Esta profissional concluiu cursos na plataforma para se qualificar ainda mais.
            </p>
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-profile-course-soft px-5 py-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-profile-course text-primary-foreground">
                <Check className="h-4 w-4" />
              </span>
              <span className="font-medium">{provider.course}</span>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Serviços Oferecidos</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {provider.tags.map((tag, index) => (
                <span
                  key={tag}
                  className={`rounded-full px-5 py-2.5 font-medium ${index % 2 === 0 ? "bg-service-blue text-service-blue-foreground" : "bg-service-green text-service-green-foreground"}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Portfólio</h2>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {provider.portfolio.map((item) => {
                const Icon = portfolioIcons[item.icon];
                return (
                  <div key={item.title} className="min-w-0">
                    <div className="flex aspect-square items-center justify-center rounded-2xl bg-profile-media">
                      <Icon className="h-10 w-10 text-profile-blue" strokeWidth={2.3} />
                    </div>
                    <p className="mt-2 text-sm leading-snug text-muted-foreground">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Local de Atendimento</h2>
            <p className="mt-3 text-lg text-muted-foreground">{provider.neighborhood}</p>
            <div className="profile-map relative mt-5 h-64 overflow-hidden rounded-2xl">
              <div className="profile-map-road profile-map-road-a" />
              <div className="profile-map-road profile-map-road-b" />
              <div className="profile-map-road profile-map-road-c" />
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-profile-blue text-primary-foreground shadow-profile-action">
                  <Scissors className="h-6 w-6" />
                </span>
                <span className="mt-1 max-w-48 truncate rounded bg-card/90 px-2 py-1 text-xs font-semibold shadow-sm">{provider.name}</span>
              </div>
              <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded bg-card/90 px-2 py-1 text-xs font-semibold">
                <MapPin className="h-3.5 w-3.5" /> {provider.neighborhood}
              </span>
            </div>
          </section>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-2xl bg-card/95 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-profile-footer backdrop-blur">
        <Button
          className="h-14 w-full rounded-2xl text-lg font-semibold shadow-profile-button"
          onClick={() => setContacted(true)}
        >
          {contacted ? <Check className="h-6 w-6" /> : <MessageCircle className="h-6 w-6 fill-current" />}
          {contacted ? "Contato solicitado" : "Entrar em Contato"}
        </Button>
        <nav className="mt-3 grid h-16 grid-cols-4 rounded-full bg-background px-2 shadow-profile-nav" aria-label="Navegação principal">
          <Link to="/" className="flex flex-col items-center justify-center gap-0.5 rounded-full bg-secondary text-xs font-semibold text-primary">
            <Search className="h-6 w-6" />
            Início
          </Link>
          <span className="flex flex-col items-center justify-center gap-0.5 text-xs font-medium"><Map className="h-6 w-6" />Mapa</span>
          <span className="flex flex-col items-center justify-center gap-0.5 text-xs font-medium"><GraduationCap className="h-6 w-6" />Cursos</span>
          <span className="flex flex-col items-center justify-center gap-0.5 text-xs font-medium"><CircleUserRound className="h-6 w-6" />Perfil</span>
        </nav>
      </div>
    </div>
  );
}