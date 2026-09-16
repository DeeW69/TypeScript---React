// src/composants/CarteFilm.tsx
//
// Adaptateur : traduit un film OMDB en props pour la Carte du TP2,
// qu'il ne modifie pas.
import { Carte } from "./Carte";
import { Badge } from "./Badge";
import type { FilmOmdb } from "../lib/omdb";

export interface CarteFilmProps {
  film: FilmOmdb;
}

const libelleParType: Record<string, string> = {
  movie: "Film",
  series: "Série",
  game: "Jeu",
};

export function CarteFilm({ film }: CarteFilmProps) {
  return (
    <Carte titre={film.Title} sousTitre={film.Year}>
      {film.Poster === "N/A" ? (
        <div className="flex h-48 w-full items-center justify-center rounded-md bg-slate-100 text-sm text-slate-400">
          Pas d'affiche
        </div>
      ) : (
        <img
          src={film.Poster}
          alt={`Affiche de ${film.Title}`}
          className="h-48 w-full rounded-md object-cover"
        />
      )}
      <div className="mt-2">
        <Badge texte={libelleParType[film.Type] ?? film.Type} ton="info" />
      </div>
    </Carte>
  );
}
