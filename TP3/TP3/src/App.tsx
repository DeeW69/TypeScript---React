import { useRef, useState } from "react";
import { FormulaireInscription } from "./composants/FormulaireInscription";
import { ListeInscriptions } from "./composants/ListeInscriptions";
import type { Inscription } from "./lib/inscription";

// Jamais de mot de passe conservé après l'inscription : dérivé de Inscription, pas réécrit.
export type InscriptionEnregistree = Omit<Inscription, "motDePasse" | "confirmation"> & {
  id: number;
};

function App() {
  const [inscriptions, setInscriptions] = useState<InscriptionEnregistree[]>([]);
  const prochainId = useRef(1);

  const gererInscription = (donnees: Inscription) => {
    const nouvelle: InscriptionEnregistree = {
      prenom: donnees.prenom,
      email: donnees.email,
      cgv: donnees.cgv,
      id: prochainId.current++,
    };
    setInscriptions((liste) => [nouvelle, ...liste]);
  };

  const gererSuppression = (id: number) => {
    setInscriptions((liste) => liste.filter((i) => i.id !== id));
  };

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-bold text-slate-900">
        TP3 — Formulaire d'inscription validé
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Inscription</h2>
          <FormulaireInscription onInscription={gererInscription} />
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Inscriptions ({inscriptions.length})
          </h2>
          <ListeInscriptions inscriptions={inscriptions} onSuppression={gererSuppression} />
        </section>
      </div>
    </main>
  );
}

export default App;
