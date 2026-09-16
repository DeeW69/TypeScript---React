// src/lib/omdb.ts
//
// FilmOmdb, pas Film : src/lib/utils.ts exporte déjà un Film (TP1/TP2).
// Deux types du même nom dans un même projet finissent toujours par être
// importés l'un pour l'autre.

export interface FilmOmdb {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;      // "movie" | "series" | "game" — l'API n'est pas plus précise
  Poster: string;    // une URL, ou la chaîne "N/A"
}

export interface ReponseRecherche {
  Search?: FilmOmdb[];       // absent quand la recherche échoue
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}

export function construireUrlRecherche(terme: string): string {
  const cle = import.meta.env.VITE_OMDB_KEY;
  return `https://www.omdbapi.com/?apikey=${cle}&s=${encodeURIComponent(terme)}`;
}
