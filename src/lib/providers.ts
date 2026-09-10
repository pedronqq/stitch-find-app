export type ProviderType = "costureiras" | "atelies";

export type Provider = {
  slug: string;
  type: ProviderType;
  name: string;
  rating: number;
  reviews: number;
  tags: string[];
  distance: string;
  neighborhood: string;
  color: string;
  verified: boolean;
  price: string;
  about: string;
  course: string;
  portfolio: { title: string; icon: "scissors" | "shirt" | "bag" }[];
  /** Posição relativa no mapa ilustrativo (0-100). */
  map: { x: number; y: number };
  /** Coordenadas (fictícias) no Rio de Janeiro. */
  coords: { lat: number; lng: number };
};

export const PROVIDERS: Provider[] = [
  {
    slug: "lucia-ferreira",
    type: "costureiras",
    name: "Lúcia Ferreira",
    rating: 4.9,
    reviews: 120,
    tags: ["Consertos", "Recriação de roupas"],
    distance: "0.8 km",
    neighborhood: "Gávea",
    color: "var(--profile-blue)",
    verified: true,
    price: "$$  (R$ 30 - R$ 80)",
    about: "Trabalho com costura há mais de 20 anos. Sou especialista em consertos rápidos.",
    course: "Como precificar seus serviços de costura",
    portfolio: [
      { title: "Ajuste de calça social", icon: "scissors" },
      { title: "Conserto de zíper", icon: "shirt" },
      { title: "Reforma de blazer", icon: "bag" },
    ],
    map: { x: 32, y: 58 },
    coords: { lat: -22.9772, lng: -43.2318 },
  },
  {
    slug: "joana-ribeiro",
    type: "costureiras",
    name: "Joana Ribeiro",
    rating: 4.7,
    reviews: 210,
    tags: ["Peças de decoração", "Consertos"],
    distance: "3.1 km",
    neighborhood: "Copacabana",
    color: "var(--profile-gold)",
    verified: true,
    price: "$$  (R$ 35 - R$ 120)",
    about: "Costuro peças para a casa e faço consertos com acabamento cuidadoso e atendimento próximo.",
    course: "Acabamentos profissionais para peças decorativas",
    portfolio: [
      { title: "Capa de almofada", icon: "shirt" },
      { title: "Ajuste de cortina", icon: "scissors" },
      { title: "Bolsa de tecido", icon: "bag" },
    ],
    map: { x: 70, y: 30 },
    coords: { lat: -22.9711, lng: -43.1822 },
  },
  {
    slug: "marta-nogueira",
    type: "costureiras",
    name: "Marta Nogueira",
    rating: 4.8,
    reviews: 86,
    tags: ["Roupas sob medida", "Peças de decoração"],
    distance: "1.4 km",
    neighborhood: "Leblon",
    color: "var(--profile-green)",
    verified: false,
    price: "$$$  (R$ 80 - R$ 260)",
    about: "Crio peças sob medida e realizo ajustes finos, sempre respeitando o caimento e o estilo de cada cliente.",
    course: "Modelagem e ajustes para um caimento perfeito",
    portfolio: [
      { title: "Vestido sob medida", icon: "shirt" },
      { title: "Ajuste de barra", icon: "scissors" },
      { title: "Reforma de vestido", icon: "bag" },
    ],
    map: { x: 22, y: 34 },
    coords: { lat: -22.9847, lng: -43.2222 },
  },
  {
    slug: "antonio-moreira",
    type: "costureiras",
    name: "Antônio Moreira",
    rating: 4.6,
    reviews: 54,
    tags: ["Roupas sob medida", "Consertos"],
    distance: "2.2 km",
    neighborhood: "Botafogo",
    color: "var(--profile-pink)",
    verified: true,
    price: "$$$  (R$ 70 - R$ 300)",
    about: "Alfaiataria tradicional, ternos sob medida e consertos precisos feitos com experiência e atenção.",
    course: "Técnicas modernas de alfaiataria",
    portfolio: [
      { title: "Paletó sob medida", icon: "shirt" },
      { title: "Ajuste de manga", icon: "scissors" },
      { title: "Reforma de terno", icon: "bag" },
    ],
    map: { x: 56, y: 72 },
    coords: { lat: -22.9519, lng: -43.1808 },
  },
  {
    slug: "fio-e-forma",
    type: "atelies",
    name: "Ateliê Fio & Forma",
    rating: 4.8,
    reviews: 95,
    tags: ["Roupas sob medida", "Peças de decoração"],
    distance: "1.1 km",
    neighborhood: "Gávea",
    color: "var(--profile-violet)",
    verified: true,
    price: "$$$  (R$ 120 - R$ 450)",
    about: "Ateliê especializado em roupas sob medida e peças de decoração feitas com acabamento cuidadoso.",
    course: "Gestão e atendimento para ateliês de moda",
    portfolio: [
      { title: "Vestido de festa", icon: "shirt" },
      { title: "Modelagem exclusiva", icon: "scissors" },
      { title: "Bolsa artesanal", icon: "bag" },
    ],
    map: { x: 45, y: 22 },
    coords: { lat: -22.9741, lng: -43.2385 },
  },
  {
    slug: "oficina-do-tecido",
    type: "atelies",
    name: "Oficina do Tecido",
    rating: 4.5,
    reviews: 142,
    tags: ["Consertos", "Recriação de roupas"],
    distance: "2.6 km",
    neighborhood: "Ipanema",
    color: "var(--profile-cyan)",
    verified: false,
    price: "$$  (R$ 40 - R$ 180)",
    about: "Uma oficina criativa para consertos e recriação de roupas, dando nova vida às suas peças favoritas.",
    course: "Upcycling e recriação de roupas",
    portfolio: [
      { title: "Camisa recriada", icon: "shirt" },
      { title: "Reparo invisível", icon: "scissors" },
      { title: "Ecobag de retalhos", icon: "bag" },
    ],
    map: { x: 78, y: 62 },
    coords: { lat: -22.984, lng: -43.1986 },
  },
  {
    slug: "casa-nova",
    type: "atelies",
    name: "Ateliê Casa Nova",
    rating: 4.9,
    reviews: 63,
    tags: ["Recriação de roupas", "Roupas sob medida"],
    distance: "3.8 km",
    neighborhood: "Copacabana",
    color: "var(--profile-coral)",
    verified: true,
    price: "$$$  (R$ 90 - R$ 360)",
    about: "Transformamos roupas afetivas em peças atuais e criamos modelos sob medida com personalidade.",
    course: "Upcycling e recriação de roupas",
    portfolio: [
      { title: "Vestido recriado", icon: "shirt" },
      { title: "Customização jeans", icon: "scissors" },
      { title: "Bolsa reaproveitada", icon: "bag" },
    ],
    map: { x: 62, y: 48 },
    coords: { lat: -22.9663, lng: -43.178 },
  },
];

export function getProvider(type: ProviderType, slug: string) {
  return PROVIDERS.find((provider) => provider.type === type && provider.slug === slug);
}