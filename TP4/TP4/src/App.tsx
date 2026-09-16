import { RechercheFilms } from "./composants/RechercheFilms";

function App() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-2xl font-bold text-slate-900">TP4 — Recherche de films</h1>
      <p className="mt-2 text-slate-600">Cherchez un film par son titre (source : OMDB).</p>
      <div className="mt-6">
        <RechercheFilms />
      </div>
    </main>
  );
}

export default App;
