import { useEffect, useState } from "react";

export type Role = "cliente" | "prestadora";

const STORAGE_KEY = "costurando-role";
const EVENT_NAME = "costurando-role-change";

function readRole(): Role {
  if (typeof window === "undefined") return "cliente";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "prestadora" ? "prestadora" : "cliente";
}

function writeRole(role: Role) {
  window.localStorage.setItem(STORAGE_KEY, role);
  window.dispatchEvent(new CustomEvent<Role>(EVENT_NAME, { detail: role }));
}

/**
 * Hook compartilhado para o papel ativo (Cliente ou Prestadora de serviço).
 * Persiste no localStorage e sincroniza entre componentes via CustomEvent,
 * assim a navegação (BottomNav) e a tela de Perfil ficam sempre de acordo.
 */
export function useRole() {
  const [role, setRoleState] = useState<Role>(readRole);

  useEffect(() => {
    setRoleState(readRole());
    function handleChange(event: Event) {
      const detail = (event as CustomEvent<Role>).detail;
      if (detail) setRoleState(detail);
    }
    window.addEventListener(EVENT_NAME, handleChange);
    return () => window.removeEventListener(EVENT_NAME, handleChange);
  }, []);

  function setRole(next: Role) {
    writeRole(next);
    setRoleState(next);
  }

  return { role, setRole };
}
