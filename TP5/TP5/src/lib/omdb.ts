export interface FilmOmdb {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface ReponseRecherche {
  Search?: FilmOmdb[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}

export interface FilmDetailOmdb {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Rated: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  imdbRating: string;
  Response: "True" | "False";
  Error?: string;
}

const CLE = import.meta.env.VITE_OMDB_KEY;
const BASE = "https://www.omdbapi.com/";

export function urlRecherche(terme: string) {
  return BASE + "?apikey=" + CLE + "&s=" + encodeURIComponent(terme);
}

export function urlDetail(id: string) {
  return BASE + "?apikey=" + CLE + "&i=" + id + "&plot=short";
}

export function afficheDisponible(poster: string) {
  if (!poster || poster === "N/A") {
    return false;
  }
  return poster.startsWith("http");
}
