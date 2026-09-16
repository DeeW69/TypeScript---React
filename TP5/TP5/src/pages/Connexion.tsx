// src/pages/Connexion.tsx
import { useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bouton } from "../composants/Bouton";
import type { EtatConnexion } from "../composants/RouteProtegee";
import { useAuth } from "../contextes/AuthContext";

export function Connexion() {
  const [pseudo, setPseudo] = useState("");
  const { connecter } = useAuth();
  const naviguer = useNavigate();
  const emplacement = useLocation();
  const etat = emplacement.state as EtatConnexion | null;

  const gererSaisie = (e: ChangeEvent<HTMLInputElement>) => {
    setPseudo(e.target.value);
  };

  const gererConnexion = () => {
    const nettoye = pseudo.trim();
    if (!nettoye) return;
    connecter(nettoye);
    // BONUS 7 : on renvoie l'utilisateur là où il allait, pas toujours à l'accueil.
    naviguer(etat?.de ?? "/", { replace: true });
  };

  return (
    <div className="flex max-w-sm flex-col gap-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Connexion</h1>
      <p className="text-slate-600 dark:text-slate-400">Aucun mot de passe : un pseudo suffit.</p>

      <div className="flex flex-col gap-1">
        <label htmlFor="pseudo" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Pseudo
        </label>
        <input
          id="pseudo"
          name="pseudo"
          type="text"
          value={pseudo}
          onChange={gererSaisie}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      <Bouton libelle="Se connecter" onClick={gererConnexion} desactive={!pseudo.trim()} />
    </div>
  );
}
