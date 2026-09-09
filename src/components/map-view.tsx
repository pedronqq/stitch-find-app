import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";

import type { Provider } from "@/lib/providers";

const RioMap = lazy(() => import("@/components/rio-map"));

type Props = {
  providers: Provider[];
  center?: [number, number] | undefined;
  zoom?: number | undefined;
  activeSlug?: string | undefined;
  onSelect?: ((provider: Provider) => void) | undefined;
  className?: string | undefined;
};

function Placeholder({ className }: { className?: string | undefined }) {
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
