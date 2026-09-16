// src/composants/RouteProtegee.tsx
//
// Une seule responsabilité : rediriger vers /connexion si personne n'est
// connecté. Le vrai statut de ce code : ça cache un affichage côté client,
// ça ne protège rien — la donnée arrive du serveur, c'est lui qui autorise.
//
// BONUS 7 : on mémorise l'emplacement demandé dans l'état de la
// redirection, pour pouvoir y renvoyer l'utilisateur après connexion.
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
