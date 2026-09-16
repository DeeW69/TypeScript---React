// src/composants/Layout.tsx
//
// L'en-tête et le pied de page ne sont écrits qu'ici, une seule fois.
// <Outlet /> affiche la page courante au milieu.
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contextes/AuthContext";
import { useFavoris } from "../contextes/FavorisContext";
import { useTheme } from "../contextes/ThemeContext";
import { Bouton } from "./Bouton";

function classeLien({ isActive }: { isActive: boolean }) {
  return isActive
    ? "font-bold text-blue-600"
    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white";
}

export function Layout() {
  const { pseudo, deconnecter } = useAuth();
  const { favoris } = useFavoris();
  const { theme, basculer } = useTheme();

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col bg-white p-4 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-100">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b pb-4 dark:border-slate-700">
        <nav className="flex gap-4 text-sm">
          <NavLink to="/" end className={classeLien}>
            Accueil
          </NavLink>
          <NavLink to="/recherche" className={classeLien}>
            Recherche
          </NavLink>
          <NavLink to="/favoris" className={classeLien}>
            Favoris ({favoris.length})
          </NavLink>
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <Bouton
            libelle={theme === "sombre" ? "Mode clair" : "Mode sombre"}
            variante="secondaire"
            onClick={basculer}
          />
          {pseudo ? (
            <>
              <span className="text-slate-600 dark:text-slate-300">
                Connecté en tant que {pseudo}
              </span>
              <Bouton libelle="Déconnexion" variante="secondaire" onClick={deconnecter} />
            </>
          ) : (
            <NavLink to="/connexion" className={classeLien}>
              Connexion
            </NavLink>
          )}
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-8 border-t pt-4 text-center text-xs text-slate-400 dark:border-slate-700">
        TP5 — Application multi-pages
      </footer>
    </div>
  );
}
