import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contextes/AuthContext";

export interface EtatConnexion {
  de?: ReturnType<typeof useLocation>;
}

export function RouteProtegee({ children }: { children: ReactNode }) {
  const { pseudo } = useAuth();
  const emplacement = useLocation();

  if (!pseudo) {
    const etat: EtatConnexion = { de: emplacement };
    return <Navigate to="/connexion" state={etat} replace />;
  }

  return <>{children}</>;
}
