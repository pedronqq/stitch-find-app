export type Course = {
  slug: string;
  title: string;
  category: string;
  duration: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  lessons: number;
  students: number;
  description: string;
  learn: string[];
  modules: { title: string; lessons: string[] }[];
  format: string;
  certificate: string;
};

export const COURSES: Course[] = [
  {
    slug: "precificar-servicos-de-costura",
    title: "Como precificar seus serviços de costura",
    category: "Negócios",
    duration: "1h 20min",
    level: "Iniciante",
    lessons: 8,
    students: 1240,
    description:
      "Aprenda a calcular o preço justo para cada serviço, considerando seu tempo, materiais e o valor do seu trabalho — sem perder clientes nem trabalhar no prejuízo.",
    learn: [
      "Calcular o custo real de cada serviço (tempo, material, energia)",
      "Definir sua hora de trabalho de forma justa",
      "Montar uma tabela de preços por tipo de serviço",
      "Comunicar aumentos de preço sem perder clientes",
    ],
    modules: [
      {
        title: "Entendendo seus custos",
        lessons: ["Quanto vale sua hora", "Custos escondidos: linha, agulha, energia"],
      },
      {
        title: "Montando sua tabela",
        lessons: ["Preço por serviço", "Pacotes e fidelização"],
      },
      {
        title: "Vendendo seu preço",
        lessons: ["Como justificar o valor", "Lidando com pedidos de desconto"],
      },
    ],
    format: "Videoaulas curtas que você assiste no celular, no seu ritmo, com planilha de precificação para baixar.",
    certificate: "Certificado digital ao concluir 100% das aulas.",
  },
  {
    slug: "modelagem-e-ajustes",
    title: "Modelagem e ajustes para um caimento perfeito",
    category: "Técnicas de costura",
    duration: "2h 05min",
    level: "Intermediário",
    lessons: 12,
    students: 860,
    description:
      "Domine ajustes de caimento em calças, vestidos e blazers: aprenda a tirar medidas corretamente, marcar a peça no corpo e executar ajustes que valorizam qualquer tipo de silhueta.",
    learn: [
      "Tirar medidas corporais com precisão",
      "Marcar ajustes diretamente na peça com alfinetes e giz",
      "Ajustar cós, cava, comprimento e barra",
      "Erros mais comuns de caimento e como corrigir",
    ],
    modules: [
      {
        title: "Medidas e marcação",
        lessons: ["Medidas essenciais", "Marcação na peça", "Prova com o cliente"],
      },
      {
        title: "Ajustes por tipo de peça",
        lessons: ["Calças", "Vestidos", "Blazers e paletós"],
      },
      {
        title: "Acabamento profissional",
        lessons: ["Rebater costuras", "Acabamentos internos invisíveis"],
      },
    ],
    format: "Videoaulas com demonstrações em peças reais, mais guia de medidas em PDF.",
    certificate: "Certificado digital ao concluir 100% das aulas.",
  },
  {
    slug: "bordado-criativo",
    title: "Bordado criativo aplicado à moda",
    category: "Criatividade",
    duration: "1h 45min",
    level: "Iniciante",
    lessons: 9,
    students: 640,
    description:
      "Do ponto atrás ao ponto cheio: aprenda os pontos essenciais do bordado livre e como aplicá-los em roupas e acessórios para criar peças únicas e personalizadas.",
    learn: [
      "Preparar bastidor, linha e tecido corretamente",
      "Executar os 8 pontos essenciais do bordado livre",
      "Transferir desenhos para o tecido",
      "Bordar em jeans, camisetas e acessórios",
    ],
    modules: [
      {
        title: "Primeiros pontos",
        lessons: ["Materiais e preparação", "Ponto atrás e ponto haste"],
      },
      {
        title: "Pontos de preenchimento",
        lessons: ["Ponto cheio", "Ponto rococó e nó francês"],
      },
      {
        title: "Aplicação em peças",
        lessons: ["Bordando uma camiseta", "Bordado em jeans"],
      },
    ],
    format: "Videoaulas em close dos pontos, com 5 riscos exclusivos para baixar e praticar.",
    certificate: "Certificado digital ao concluir 100% das aulas.",
  },
  {
    slug: "upcycling-recriacao-de-roupas",
    title: "Upcycling e recriação de roupas",
    category: "Criatividade",
    duration: "2h 30min",
    level: "Avançado",
    lessons: 14,
    students: 420,
    description:
      "Transforme peças paradas no armário em roupas novas e atuais. Aprenda técnicas de recriação, customização e reaproveitamento de tecidos com olhar de design.",
    learn: [
      "Avaliar uma peça e enxergar possibilidades de transformação",
      "Desconstruir e remontar peças com segurança",
      "Combinar tecidos e texturas diferentes",
      "Criar uma mini coleção a partir de peças usadas",
    ],
    modules: [
      {
        title: "Olhar criativo",
        lessons: ["Analisando a peça", "Inspiração e referências"],
      },
      {
        title: "Técnicas de recriação",
        lessons: ["Desconstrução", "Corte e remontagem", "Mix de tecidos"],
      },
      {
        title: "Projeto final",
        lessons: ["Planejando sua peça", "Execução completa", "Acabamento e apresentação"],
      },
    ],
    format: "Videoaulas com projetos completos do início ao fim, acompanhando cada etapa da transformação.",
    certificate: "Certificado digital ao concluir 100% das aulas.",
  },
  {
    slug: "gestao-e-atendimento-para-atelies",
    title: "Gestão e atendimento para ateliês de moda",
    category: "Negócios",
    duration: "1h 10min",
    level: "Intermediário",
    lessons: 7,
    students: 530,
    description:
      "Organize a rotina do seu ateliê: agenda de pedidos, atendimento ao cliente, prazos de entrega e divulgação do seu trabalho para atrair mais encomendas.",
    learn: [
      "Organizar agenda e prazos de pedidos",
      "Fazer um atendimento que fideliza clientes",
      "Criar um processo de prova e entrega sem erros",
      "Divulgar seu ateliê nas redes sociais",
    ],
    modules: [
      {
        title: "Organização do ateliê",
        lessons: ["Agenda e prazos", "Ficha de pedido"],
      },
      {
        title: "Atendimento que encanta",
        lessons: ["Primeiro contato", "Prova e entrega"],
      },
      {
        title: "Divulgação",
        lessons: ["Fotografando suas peças", "Redes sociais para ateliês"],
      },
    ],
    format: "Videoaulas objetivas com modelos de ficha de pedido e planner de agenda para baixar.",
    certificate: "Certificado digital ao concluir 100% das aulas.",
  },
];

export const COURSE_CATEGORIES = [...new Set(COURSES.map((course) => course.category))];

export function getCourse(slug: string) {
  return COURSES.find((course) => course.slug === slug);
}
