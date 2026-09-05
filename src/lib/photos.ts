/**
 * Fotos reais dos perfis. Basta colocar o arquivo em src/assets/photos/
 * com o nome igual ao slug do perfil (ex.: dona-lucia-costuras.jpg)
 * e a foto aparece automaticamente no card e na página do perfil.
 * Formatos aceitos: jpg, jpeg, png, webp.
 */
const PHOTOS = import.meta.glob<string>("../assets/photos/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const SUPPORTED = [".jpg", ".jpeg", ".png", ".webp"];

export function providerPhoto(slug: string): string | undefined {
  for (const ext of SUPPORTED) {
    const match = PHOTOS[`../assets/photos/${slug}${ext}`];
    if (match) return match;
  }
  return undefined;
}
