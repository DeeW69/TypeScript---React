// src/pages/Favoris.tsx
import { CarteFilm } from "../composants/CarteFilm";
import { Bouton } from "../composants/Bouton";
import { useFavoris } from "../contextes/FavorisContext";

export function Favoris() {
  const { favoris, dispatch } = useFavoris();

  if (favoris.length === 0) {
    return <p className="text-slate-500">Aucun favori pour le moment.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Favoris</h1>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {favoris.map((film) => (
          <li key={film.imdbID} className="flex flex-col gap-2">
            <CarteFilm film={film} />
            <Bouton
              libelle="Retirer"
              variante="danger"
              onClick={() => dispatch({ type: "retirer", id: film.imdbID })}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
