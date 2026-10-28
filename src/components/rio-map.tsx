import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import type { Provider } from "@/lib/providers";
import { chipColor } from "@/lib/filter-colors";
import { iconSvgMarkup } from "@/components/custom-icons";

type Props = {
  providers: Provider[];
  center?: [number, number] | undefined;
  zoom?: number | undefined;
  activeSlug?: string | undefined;
  onSelect?: ((provider: Provider) => void) | undefined;
  className?: string | undefined;
};

function pinIcon(provider: Provider, active: boolean) {
  const size = active ? 46 : 38;
  const color = chipColor(provider.tags[0] ?? "");
  const glyphSize = Math.round(size * 0.56);
  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<span style="display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:9999px;background:${color};color:#fff;box-shadow:0 6px 16px rgba(0,0,0,.25);border:2px solid #fff;transition:transform .2s">
      ${iconSvgMarkup(provider.type === "costureiras" ? "costureiras" : "atelies", glyphSize)}
    </span>`,
  });
}

export default function RioMap({
  providers,
  center = [-22.9779, -43.2096],
  zoom = 13,
  activeSlug,
  onSelect,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center,
      zoom,
      zoomControl: false,
attributionControl: true,
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map);
    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 100);
    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};
    providers.forEach((provider) => {
      const marker = L.marker([provider.coords.lat, provider.coords.lng], {
        icon: pinIcon(provider, provider.slug === activeSlug),
        title: provider.name,
      }).addTo(map);
      if (onSelect) marker.on("click", () => onSelect(provider));
      else marker.bindPopup(`<b>${provider.name}</b><br/>${provider.neighborhood}`);
      markersRef.current[provider.slug] = marker;
    });
  }, [providers, activeSlug, onSelect]);

  return <div ref={containerRef} className={className} style={{ height: "100%", width: "100%" }} />;
}
