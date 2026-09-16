import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { urlRecherche, type ReponseRecherche } from "../lib/omdb";
import { CarteFilm } from "../composants/CarteFilm";

export function Recherche() {
  const [terme, setTerme] = useState("");
  const { donnees, chargement, erreur } = useFetch<ReponseRecherche>(
    terme ? urlRecherche(terme) : null,
  );

  const gererSaisie = (e: ChangeEvent<HTMLInputElement>) => {
    setTerme(e.target.value);
  };

  function afficherResultats() {
    if (!terme) {
      return <p className="text-slate-500">Tapez un titre pour lancer la recherche.</p>;
    }
    if (chargement) {
      return <p className="text-slate-500">Chargement…</p>;
    }
    if (erreur) {
      return <p className="text-red-600">{erreur}</p>;
    }

    if (donnees?.Response === "False") {
      if (donnees.Error === "Movie not found!") {
        return <p className="text-slate-500">Aucun film ne correspond à « {terme} ».</p>;
      }
      return <p className="text-red-600">{donnees.Error ?? "Recherche impossible."}</p>;
    }

    const films = donnees?.Search ?? [];
    if (films.length === 0) {
      return <p className="text-slate-500">Aucun film ne correspond à « {terme} ».</p>;
    }

    return (
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {films.map((film) => (
          <li key={film.imdbID}>
            <Link to={`/films/${film.imdbID}`}>
              <CarteFilm film={film} />
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-slate-900">Recherche</h1>
      <input
        type="text"
        value={terme}
        onChange={gererSaisie}
        placeholder="Titre d'un film…"
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {afficherResultats()}
    </div>
  );
}
