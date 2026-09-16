import ListeFilms from "./composants/ListeFilms";
import { FILMS, trierPar, filtrerParGenre } from "./lib/utils";

function App() {
  const filmsTries = trierPar(FILMS, "titre");
  const filmsHorreur = filtrerParGenre(filmsTries, "Horreur");
  const filmsComedie = filtrerParGenre(filmsTries, "Comédie");

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4">
      <section>
        <h2 className="mb-4 text-xl font-bold">Tous les films</h2>
        <ListeFilms films={filmsTries} onSelection={(film) => alert(film.titre)} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Genre : Horreur</h2>
        <ListeFilms films={filmsHorreur} onSelection={(film) => alert(film.titre)} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Genre : Comédie</h2>
        <ListeFilms films={filmsComedie} messageVide="Aucun film de comédie pour l'instant." />
      </section>
    </div>
  );
}

export default App;
