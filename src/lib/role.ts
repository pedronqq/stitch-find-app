import { useEffect, useState } from "react";

export type Role = "cliente" | "prestadora";

const STORAGE_KEY = "costurando-role";
const EVENT_NAME = "costurando-role-change";
const LOADING_EVENT_NAME = "costurando-role-loading";
const ROLE_LOADING_DURATION = 2000;

function readRole(): Role {
  if (typeof window === "undefined") return "cliente";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "prestadora" ? "prestadora" : "cliente";
}

function writeRole(role: Role) {
  window.localStorage.setItem(STORAGE_KEY, role);
  window.dispatchEvent(new CustomEvent<Role>(EVENT_NAME, { detail: role }));
}

export function useRole() {
  const [role, setRoleState] = useState<Role>(readRole);
  const [isChangingRole, setIsChangingRole] = useState(false);

  useEffect(() => {
    setRoleState(readRole());

    function handleChange(event: Event) {
      const detail = (event as CustomEvent<Role>).detail;
      if (detail) setRoleState(detail);
    }

    function handleLoading(event: Event) {
      const detail = (event as CustomEvent<boolean>).detail;
      setIsChangingRole(Boolean(detail));
    }

    window.addEventListener(EVENT_NAME, handleChange);
    window.addEventListener(LOADING_EVENT_NAME, handleLoading);

    return () => {
      window.removeEventListener(EVENT_NAME, handleChange);
      window.removeEventListener(LOADING_EVENT_NAME, handleLoading);
    };
  }, []);

  function setRole(next: Role) {
    if (next === role || isChangingRole) return;

    setIsChangingRole(true);
    window.dispatchEvent(new CustomEvent<boolean>(LOADING_EVENT_NAME, { detail: true }));

    window.setTimeout(() => {
      writeRole(next);
      setRoleState(next);
      setIsChangingRole(false);
      window.dispatchEvent(new CustomEvent<boolean>(LOADING_EVENT_NAME, { detail: false }));
    }, ROLE_LOADING_DURATION);
  }

  return { role, setRole, isChangingRole };
}
