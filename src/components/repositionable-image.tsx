import { useEffect, useRef, useState } from "react";
import { Check, Move } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  src: string;
  alt: string;
  storageKey: string;
  className?: string;
};

/** Banner com botão para arrastar a foto e reposicionar o enquadramento. */
export function RepositionableImage({ src, alt, storageKey, className }: Props) {
  const [position, setPosition] = useState(50);
  const [editing, setEditing] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ y: number; start: number } | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(`image-position:${storageKey}`);
    if (saved !== null) setPosition(Number(saved));
  }, [storageKey]);

  const onPointerDown = (event: React.PointerEvent) => {
    if (!editing) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { y: event.clientY, start: position };
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!editing || !drag.current) return;
    const height = frameRef.current?.clientHeight ?? 1;
    const delta = ((event.clientY - drag.current.y) / height) * 100;
    setPosition(Math.min(100, Math.max(0, drag.current.start - delta)));
  };

  const onPointerUp = () => {
    if (!drag.current) return;
    drag.current = null;
    window.localStorage.setItem(`image-position:${storageKey}`, String(Math.round(position)));
  };

  return (
    <div ref={frameRef} className={`relative overflow-hidden ${className ?? ""}`}>
      <img
        src={src}
        alt={alt}
        draggable={false}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ objectPosition: `50% ${position}%` }}
        className={`h-full w-full select-none object-cover ${editing ? "cursor-grab touch-none active:cursor-grabbing" : ""}`}
      />

      {editing && (
        <div className="pointer-events-none absolute inset-x-0 bottom-14 text-center text-sm font-medium text-primary-foreground drop-shadow">
          Arraste a foto para cima ou para baixo
        </div>
      )}

      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={() => setEditing((value) => !value)}
        className="absolute bottom-3 right-3 rounded-full shadow-profile-action"
      >
        {editing ? <Check className="h-4 w-4" /> : <Move className="h-4 w-4" />}
        {editing ? "Concluir" : "Ajustar foto"}
      </Button>
    </div>
  );
}
