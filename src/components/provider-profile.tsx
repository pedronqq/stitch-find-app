import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  Check,
  ChevronLeft,
  GraduationCap,
  Heart,
  Info,
  MapPin,
  MessageCircle,
  Scissors,
  Shirt,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { MapView } from "@/components/map-view";
import { RepositionableImage } from "@/components/repositionable-image";
import { ThemeToggle } from "@/components/theme-toggle";
import { providerPhoto } from "@/lib/photos";
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
    <div className="min-h-[100dvh] bg-profile-shell pb-32 text-foreground">
      <main className="mx-auto w-full max-w-md bg-card md:mt-8 md:max-w-3xl md:rounded-3xl md:shadow-sm">
        <header className="flex items-center justify-between px-5 pb-4 pt-[max(1.25rem,env(safe-area-inset-top))]">
          <Button asChild variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-card shadow-profile-action hover:bg-secondary" aria-label="Voltar">
            <Link to="/">
              <ChevronLeft className="h-7 w-7" strokeWidth={2.5} />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden h-12 w-12 bg-card shadow-profile-action hover:bg-secondary md:inline-flex" />
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-card shadow-profile-action hover:bg-secondary"
              aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              onClick={() => setFavorite((value) => !value)}
            >
              <Heart className={`h-7 w-7 ${favorite ? "fill-primary text-primary" : "text-foreground"}`} />
            </Button>
          </div>
        </header>

        <div className="px-5">
          {providerPhoto(provider.slug) ? (
            <img
              src={providerPhoto(provider.slug)}
              alt={`Foto de ${provider.name}`}
              className="aspect-[1.72] w-full rounded-3xl object-cover"
            />
          ) : (
            <div className="flex aspect-[1.72] items-center justify-center rounded-3xl bg-profile-cover">
              <Scissors className="h-28 w-28 text-profile-blue" strokeWidth={1.7} />
            </div>
          )}

          <section className="pb-7 pt-7">
            <h1 className="text-[2rem] font-bold leading-tight">{provider.name}</h1>
            {provider.verified && (
              <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-profile-blue">
                <BadgeCheck className="h-5 w-5 fill-profile-blue text-primary-foreground" />
                Documento verificado
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </section>
        </div>

        <div className="h-px bg-border" />

        <div className="space-y-9 px-5 pb-10 pt-7">
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
            <div className="mt-5 grid grid-cols-3 gap-3 md:gap-5">
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
            <p className="mt-3 flex items-center gap-1.5 text-lg text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              {provider.neighborhood}, Rio de Janeiro
            </p>
            <div className="relative mt-5 h-64 overflow-hidden rounded-2xl">
              <MapView
                providers={[provider]}
                center={[provider.coords.lat, provider.coords.lng]}
                zoom={15}
                activeSlug={provider.slug}
              />
            </div>
          </section>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md bg-card/95 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-profile-footer backdrop-blur md:max-w-3xl md:rounded-t-3xl">
        <Button
          className="h-14 w-full rounded-2xl text-lg font-semibold shadow-profile-button"
          onClick={() => setContacted(true)}
        >
          {contacted ? <Check className="h-6 w-6" /> : <MessageCircle className="h-6 w-6 fill-current" />}
          {contacted ? "Contato solicitado" : "Entrar em Contato"}
        </Button>
      </div>
    </div>
  );
}
