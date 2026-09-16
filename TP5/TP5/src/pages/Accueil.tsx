import { Link } from "react-router-dom";

export function Accueil() {
  return (
    <div className="flex flex-col items-start gap-3">
      <h1 className="text-2xl font-bold text-slate-900">Bienvenue</h1>
      <p className="text-slate-600">
        Cette application recherche des films grâce à l'API OMDB et vous laisse en garder
        certains de côté.
      </p>
      <p className="text-slate-600">Connectez-vous pour constituer votre liste de favoris.</p>
      <Link to="/recherche" className="mt-2 text-blue-600 underline">
        Lancer une recherche
      </Link>
    </div>
  );
}
