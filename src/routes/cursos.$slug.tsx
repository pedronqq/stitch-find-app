import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Award,
  BadgeCheck,
  Check,
  ChevronLeft,
  Clock,
  GraduationCap,
  ListChecks,
  PlayCircle,
  Users,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCourse } from "@/lib/courses";

export const Route = createFileRoute("/cursos/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return course;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Costura Fácil` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.title} — Costura Fácil` },
          { property: "og:description", content: loaderData.description },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Curso não encontrado — Costura Fácil" }, { name: "robots", content: "noindex" }],
  }),
  component: CoursePage,
});

function CoursePage() {
  const course = Route.useLoaderData();
  const [enrolled, setEnrolled] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-profile-shell pb-32 text-foreground">
      <main className="mx-auto w-full max-w-md bg-card md:mt-8 md:max-w-3xl md:rounded-3xl md:shadow-sm">
        <header className="flex items-center justify-between px-5 pb-4 pt-[max(1.25rem,env(safe-area-inset-top))]">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-card shadow-profile-action hover:bg-secondary"
            aria-label="Voltar"
          >
            <Link to="/cursos">
              <ChevronLeft className="h-7 w-7" strokeWidth={2.5} />
            </Link>
          </Button>
          <span className="rounded-full bg-profile-course-soft px-4 py-1.5 text-sm font-semibold text-profile-course">
            {course.category}
          </span>
        </header>

        <div className="px-5">
          <div className="flex aspect-[1.72] items-center justify-center rounded-3xl bg-profile-cover">
            <GraduationCap className="h-28 w-28 text-profile-blue" strokeWidth={1.5} />
          </div>

          <section className="pb-7 pt-7">
            <h1 className="text-[2rem] font-bold leading-tight">{course.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-profile-blue" /> {course.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <PlayCircle className="h-4 w-4 text-profile-blue" /> {course.lessons} aulas
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-profile-blue" /> {course.students} alunas
              </span>
            </div>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">
              <BadgeCheck className="h-4 w-4 text-profile-green" /> Nível {course.level}
            </span>
          </section>
        </div>

        <div className="h-px bg-border" />

        <div className="space-y-9 px-5 pb-10 pt-7">
          <section>
            <h2 className="text-2xl font-bold">Sobre o curso</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{course.description}</p>
          </section>

          <section>
            <div className="flex items-center gap-3">
              <ListChecks className="h-8 w-8 text-profile-course" />
              <h2 className="text-2xl font-bold">O que você vai aprender</h2>
            </div>
            <ul className="mt-4 space-y-3">
              {course.learn.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl bg-profile-course-soft px-5 py-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-profile-course text-primary-foreground">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-medium leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Conteúdo do curso</h2>
            <div className="mt-5 space-y-4">
              {course.modules.map((module, index) => (
                <div key={module.title} className="rounded-2xl bg-secondary/60 p-5 ring-1 ring-border/50">
                  <p className="font-bold">
                    <span className="text-profile-blue">Módulo {index + 1}</span> — {module.title}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {module.lessons.map((lesson) => (
                      <li key={lesson} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <PlayCircle className="h-4 w-4 shrink-0 text-profile-blue/70" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Como funciona</h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3 rounded-2xl bg-profile-media px-5 py-4">
                <Video className="mt-0.5 h-6 w-6 shrink-0 text-profile-blue" />
                <p className="leading-relaxed text-muted-foreground">{course.format}</p>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-profile-media px-5 py-4">
                <Award className="mt-0.5 h-6 w-6 shrink-0 text-profile-gold" />
                <p className="leading-relaxed text-muted-foreground">{course.certificate}</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md md:max-w-3xl md:rounded-t-3xl bg-card/95 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-profile-footer backdrop-blur">
        <Button
          className="h-14 w-full rounded-2xl text-lg font-semibold shadow-profile-button"
          onClick={() => setEnrolled(true)}
        >
          {enrolled ? <Check className="h-6 w-6" /> : <PlayCircle className="h-6 w-6" />}
          {enrolled ? "Inscrição confirmada" : "Começar curso"}
        </Button>
      </div>
    </div>
  );
}
