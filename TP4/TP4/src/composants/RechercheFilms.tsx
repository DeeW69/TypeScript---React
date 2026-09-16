// src/composants/RechercheFilms.tsx
import { useEffect, useState, type ChangeEvent } from "react";
import { construireUrlRecherche, type FilmOmdb, type ReponseRecherche } from "../lib/omdb";
import { CarteFilm } from "./CarteFilm";

export function RechercheFilms() {
  const [terme, setTerme] = useState("");
  const [films, setFilms] = useState<FilmOmdb[]>([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    if (!terme) {
      setFilms([]);
      setErreur(null);
      setChargement(false);
      return;
    }

    const controleur = new AbortController();

    async function rechercher() {
      setChargement(true);
      setErreur(null);
      try {
        const r = await fetch(construireUrlRecherche(terme), { signal: controleur.signal });
        if (!r.ok) throw new Error(`Erreur réseau (${r.status})`);

        const d: ReponseRecherche = await r.json();
        if (d.Response === "False") {
          // OMDB répond ainsi aussi bien pour « aucun résultat » que pour
          // une vraie erreur (clé invalide, etc.) : il faut distinguer les deux.
          if (d.Error === "Movie not found!") {
            setFilms([]);
          } else {
            throw new Error(d.Error ?? "Recherche impossible.");
          }
        } else {
          setFilms(d.Search ?? []);
        }
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setErreur(e instanceof Error ? e.message : "Erreur inconnue");
        setFilms([]);
      } finally {
        // Une requête annulée ne doit pas éteindre le chargement de la suivante.
        if (!controleur.signal.aborted) {
          setChargement(false);
        }
      }
    }

    rechercher();

    return () => controleur.abort();
  }, [terme]);

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
    if (films.length === 0) {
      return <p className="text-slate-500">Aucun film ne correspond à « {terme} ».</p>;
    }
    return (
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {films.map((film) => (
          <li key={film.imdbID}>
            <CarteFilm film={film} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-col gap-6">
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
