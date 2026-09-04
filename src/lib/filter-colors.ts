/** Cor fixa (token do design system) para cada cápsula de filtro. */
const PALETTE = [
  "var(--profile-blue)",
  "var(--profile-green)",
  "var(--profile-gold)",
  "var(--profile-pink)",
  "var(--profile-violet)",
  "var(--profile-cyan)",
  "var(--profile-coral)",
  "var(--profile-course)",
];

const ASSIGNED: Record<string, string> = {
  Consertos: "var(--profile-blue)",
  "Roupas sob medida": "var(--profile-violet)",
  "Recriação de roupas": "var(--profile-green)",
  "Peças de decoração": "var(--profile-coral)",
  "Alta costura": "var(--profile-pink)",
  Bordados: "var(--profile-gold)",
};

export function chipColor(label: string) {
  if (ASSIGNED[label]) return ASSIGNED[label];
  let hash = 0;
  for (let i = 0; i < label.length; i += 1) hash = (hash * 31 + label.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}

/** Estilos para a cápsula, ativa ou não. */
export function chipStyle(label: string, active: boolean) {
  const color = chipColor(label);
  return active
    ? {
        backgroundColor: color,
        color: "var(--color-card)",
        boxShadow: `0 8px 18px color-mix(in oklab, ${color} 35%, transparent)`,
      }
    : {
        backgroundColor: `color-mix(in oklab, ${color} 14%, var(--color-card))`,
        color: `color-mix(in oklab, ${color} 78%, var(--color-foreground))`,
      };
}
