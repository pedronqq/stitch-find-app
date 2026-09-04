import { createFileRoute } from "@tanstack/react-router";
import { Check, GraduationCap } from "lucide-react";

import { BottomNav } from "@/components/bottom-nav";

const COURSES = [
  { title: "Como precificar seus serviços de costura", duration: "1h 20min", level: "Iniciante" },
  { title: "Modelagem e ajustes para um caimento perfeito", duration: "2h 05min", level: "Intermediário" },
  { title: "Bordado criativo aplicado à moda", duration: "1h 45min", level: "Iniciante" },
  { title: "Upcycling e recriação de roupas", duration: "2h 30min", level: "Avançado" },
  { title: "Gestão e atendimento para ateliês de moda", duration: "1h 10min", level: "Intermediário" },
];

export const Route = createFileRoute("/cursos")({
  head: () => ({
    meta: [
      { title: "Cursos de costura e moda — Costura Fácil" },
      {
        name: "description",
        content:
          "Cursos rápidos de costura, modelagem, bordado e gestão para profissionais que querem se qualificar.",
      },
      { property: "og:title", content: "Cursos de costura e moda — Costura Fácil" },
      {
        property: "og:description",
        content: "Qualifique-se com cursos de costura, modelagem, bordado e gestão.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CursosPage,
});

function CursosPage() {
  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background px-5 pb-28 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <h1 className="text-2xl font-bold text-foreground">Cursos</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Aprenda novas técnicas e destaque seu perfil na plataforma.
      </p>

      <div className="mt-5 flex flex-col gap-3">
        {COURSES.map((course) => (
          <article key={course.title} className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border/60">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-profile-course-soft text-profile-course">
                <GraduationCap className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <h2 className="font-semibold leading-snug text-foreground">{course.title}</h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-profile-green" />
                  {course.duration} • {course.level}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
