import { createFileRoute, notFound } from "@tanstack/react-router";

import { ProviderProfile } from "@/components/provider-profile";
import { getProvider } from "@/lib/providers";

export const Route = createFileRoute("/atelies/$slug")({
  loader: ({ params }) => {
    const provider = getProvider("atelies", params.slug);
    if (!provider) throw notFound();
    return provider;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — Costura Fácil` : "Ateliê não encontrado" },
      { name: "description", content: loaderData ? `Conheça ${loaderData.name}, veja serviços, portfólio, avaliações e entre em contato.` : "Perfil de ateliê indisponível." },
      { property: "og:title", content: loaderData ? `${loaderData.name} — Costura Fácil` : "Ateliê não encontrado" },
      { property: "og:description", content: loaderData ? `Serviços e portfólio de ${loaderData.name}.` : "Perfil de ateliê indisponível." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfileRoute,
});

function ProfileRoute() {
  const provider = Route.useLoaderData();
  return <ProviderProfile provider={provider} />;
}