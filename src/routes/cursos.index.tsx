import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, Clock, GraduationCap } from "lucide-react";

import { BottomNav } from "@/components/bottom-nav";
import { COURSES, COURSE_CATEGORIES } from "@/lib/courses";
import { chipStyle } from "@/lib/filter-colors";

export const Route = createFileRoute("/cursos/")({
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
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const results = useMemo(
    () => (activeCategory ? COURSES.filter((course) => course.category === activeCategory) : COURSES),
    [activeCategory],
  );

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background px-5 pb-28 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <h1 className="text-2xl font-bold text-foreground">Cursos</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Aprenda novas técnicas e destaque seu perfil na plataforma.
      </p>

      {/* Category filters */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {COURSE_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
            style={chipStyle(category, activeCategory === category)}
            className="shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {results.map((course) => (
          <Link
            key={course.slug}
            to="/cursos/$slug"
            params={{ slug: course.slug }}
            className="group block rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border/60 transition-all hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-profile-course-soft text-profile-course">
                <GraduationCap className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold leading-snug text-foreground">{course.title}</h2>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-profile-blue" />
                  {course.duration} • {course.lessons} aulas • {course.level}
                </p>
                <span
                  style={chipStyle(course.category, false)}
                  className="mt-2.5 inline-block rounded-full px-3 py-1 text-xs font-medium"
                >
                  {course.category}
                </span>
              </div>
              <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
