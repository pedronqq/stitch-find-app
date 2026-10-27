import type { CSSProperties } from "react";

import ateliesAsset from "@/assets/icons/atelies.svg.asset.json";
import costureirasAsset from "@/assets/icons/costureiras.svg.asset.json";
import cursosAsset from "@/assets/icons/cursos.svg.asset.json";
import mapaAsset from "@/assets/icons/mapa.svg.asset.json";
import trabalhosAsset from "@/assets/icons/trabalhos-realizados.svg.asset.json";

export const ICON_URLS = {
  atelies: ateliesAsset.url,
  costureiras: costureirasAsset.url,
  cursos: cursosAsset.url,
  mapa: mapaAsset.url,
  trabalhos: trabalhosAsset.url,
} as const;

type IconProps = { className?: string; style?: CSSProperties; strokeWidth?: number };

/**
 * Renders an uploaded SVG as a mask filled with the current text color,
 * so custom icons follow theme colors exactly like lucide icons.
 */
function makeIcon(url: string, name: string) {
  function Icon({ className = "h-6 w-6", style }: IconProps) {
    return (
      <span
        aria-hidden="true"
        className={`inline-block shrink-0 bg-current ${className}`}
        style={{
          WebkitMaskImage: `url("${url}")`,
          maskImage: `url("${url}")`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          ...style,
        }}
      />
    );
  }
  Icon.displayName = name;
  return Icon;
}

export const AteliesIcon = makeIcon(ICON_URLS.atelies, "AteliesIcon");
export const CostureirasIcon = makeIcon(ICON_URLS.costureiras, "CostureirasIcon");
export const CursosIcon = makeIcon(ICON_URLS.cursos, "CursosIcon");
export const MapaIcon = makeIcon(ICON_URLS.mapa, "MapaIcon");
export const TrabalhosIcon = makeIcon(ICON_URLS.trabalhos, "TrabalhosIcon");
