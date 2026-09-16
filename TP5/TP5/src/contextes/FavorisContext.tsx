// src/contextes/FavorisContext.tsx
//
// Même patron que AuthContext, mais l'état est piloté par un reducer.
// BONUS 8 inclus : lecture de localStorage à l'initialisation du
// useReducer, écriture dans un effet qui dépend de l'état — jamais dans
// le reducer, qui reste une fonction pure.
import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from "react";
import type { FilmOmdb } from "../lib/omdb";

type ActionFavoris =
  | { type: "ajouter"; film: FilmOmdb }
  | { type: "retirer"; id: string }
  | { type: "vider" };

function reducerFavoris(etat: FilmOmdb[], action: ActionFavoris): FilmOmdb[] {
  switch (action.type) {
    case "ajouter":
      // Un utilisateur qui clique deux fois sur le même film est le cas
      // normal : pas de doublon.
      if (etat.some((f) => f.imdbID === action.film.imdbID)) return etat;
      return [...etat, action.film];
    case "retirer":
      return etat.filter((f) => f.imdbID !== action.id);
    case "vider":
      return [];
  }
}

const CLE_STOCKAGE = "tp5-favoris";

function chargerFavoris(favorisParDefaut: FilmOmdb[]): FilmOmdb[] {
  try {
    const brut = localStorage.getItem(CLE_STOCKAGE);
    return brut ? (JSON.parse(brut) as FilmOmdb[]) : favorisParDefaut;
  } catch {
    return favorisParDefaut;
  }
}

interface FavorisContexte {
  favoris: FilmOmdb[];
  dispatch: Dispatch<ActionFavoris>;
}

const Contexte = createContext<FavorisContexte | undefined>(undefined);

export function FavorisProvider({ children }: { children: ReactNode }) {
  const [favoris, dispatch] = useReducer(reducerFavoris, [], chargerFavoris);

  useEffect(() => {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(favoris));
  }, [favoris]);

  return <Contexte.Provider value={{ favoris, dispatch }}>{children}</Contexte.Provider>;
}

export function useFavoris(): FavorisContexte {
  const contexte = useContext(Contexte);
  if (contexte === undefined) {
    throw new Error("useFavoris doit être utilisé dans un <FavorisProvider>");
  }
  return contexte;
}
