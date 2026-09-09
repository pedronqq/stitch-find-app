import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";

import type { Provider } from "@/lib/providers";

const RioMap = lazy(() => import("@/components/rio-map"));

type Props = {
  providers: Provider[];
  center?: [number, number];
  zoom?: number;
  activeSlug?: string;
  onSelect?: (provider: Provider) => void;
  className?: string;
};

function Placeholder({ className }: { className?: string }) {
  return <div className={`h-full w-full animate-pulse bg-secondary ${className ?? ""}`} />;
}

export function MapView(props: Props) {
  return (
    <ClientOnly fallback={<Placeholder className={props.className} />}>
      <Suspense fallback={<Placeholder className={props.className} />}>
        <RioMap {...props} />
      </Suspense>
    </ClientOnly>
  );
}
