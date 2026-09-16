import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

import { BottomNav } from "@/components/bottom-nav";

const CONVERSATIONS = [
  { name: "Ana Paula", lastMessage: "Oi! Posso levar a calça amanhã?", time: "09:40" },
  { name: "Marcos Vinícius", lastMessage: "Ficou perfeito, muito obrigado!", time: "Ontem" },
  { name: "Beatriz Lima", lastMessage: "Qual o valor do ajuste de barra?", time: "Ontem" },
];

export const Route = createFileRoute("/mensagens")({
  head: () => ({
    meta: [
      { title: "Mensagens — Costurando" },
      {
        name: "description",
        content: "Converse com seus clientes e acompanhe pedidos de orçamento.",
      },
      { property: "og:title", content: "Mensagens — Costurando" },
      { property: "og:description", content: "Converse com seus clientes na plataforma." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MensagensPage,
});

function MensagensPage() {
  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background px-5 pb-28 pt-[max(1.5rem,env(safe-area-inset-top))] md:max-w-3xl md:px-8 md:pb-16 md:pt-24">
      <h1 className="text-2xl font-bold text-foreground">Mensagens</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Converse com seus clientes e combine detalhes do serviço.
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border/60">
        {CONVERSATIONS.map((conversation) => (
          <div
            key={conversation.name}
            className="flex items-center gap-3 border-b border-border/60 px-4 py-4 last:border-b-0"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-foreground">{conversation.name}</p>
              <p className="truncate text-sm text-muted-foreground">{conversation.lastMessage}</p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">{conversation.time}</span>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
