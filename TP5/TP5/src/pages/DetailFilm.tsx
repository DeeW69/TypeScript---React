import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { afficheDisponible, urlDetail, type FilmDetailOmdb } from "../lib/omdb";
import { Bouton } from "../composants/Bouton";
import { useFavoris } from "../contextes/FavorisContext";

export function DetailFilm() {
  const { id } = useParams();
  const { donnees, chargement, erreur } = useFetch<FilmDetailOmdb>(id ? urlDetail(id) : null);
  const { favoris, dispatch } = useFavoris();

  if (chargement) {
    return <p className="text-slate-500">Chargement…</p>;
  }
  if (erreur) {
    return <p className="text-red-600">{erreur}</p>;
  }
  if (!donnees || donnees.Response === "False") {
    return <p className="text-slate-500">Film introuvable.</p>;
  }

  const dejaFavori = favoris.some((f) => f.imdbID === donnees.imdbID);

  return (
    <article className="flex flex-col gap-6 sm:flex-row">
      {afficheDisponible(donnees.Poster) ? (
        <img
          src={donnees.Poster}
          alt={`Affiche de ${donnees.Title}`}
          className="aspect-[2/3] w-full max-w-xs rounded object-cover"
        />
      ) : (
        <div className="flex aspect-[2/3] w-full max-w-xs items-center justify-center rounded bg-slate-100 text-sm text-slate-400 dark:bg-slate-800">
          Pas d'affiche
        </div>
      )}

      <div className="flex-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {donnees.Title}{" "}
          <span className="font-normal text-slate-400">({donnees.Year})</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {donnees.Genre} · {donnees.Runtime}
        </p>
        <p className="mt-4 text-slate-700 dark:text-slate-300">{donnees.Plot}</p>

        <div className="mt-4">
          <Bouton
            libelle={dejaFavori ? "Déjà dans les favoris" : "Ajouter aux favoris"}
            desactive={dejaFavori}
            onClick={() => dispatch({ type: "ajouter", film: donnees })}
          />
        </div>
      </div>
    </article>
  );
}
