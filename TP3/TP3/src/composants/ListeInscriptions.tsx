// src/composants/ListeInscriptions.tsx
import { Carte } from "./Carte";
import { Badge } from "./Badge";
import { Bouton } from "./Bouton";
import type { InscriptionEnregistree } from "../App";

export interface ListeInscriptionsProps {
  inscriptions: InscriptionEnregistree[];
  onSuppression?: (id: number) => void;
}

export function ListeInscriptions({ inscriptions, onSuppression }: ListeInscriptionsProps) {
  if (inscriptions.length === 0) {
    return <p className="text-sm text-slate-500">Aucune inscription pour le moment.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {inscriptions.map((inscription) => (
        <li key={inscription.id}>
          <Carte
            titre={inscription.prenom}
            sousTitre={inscription.email}
            actions={
              onSuppression && (
                <Bouton
                  libelle="Supprimer"
                  variante="danger"
                  onClick={() => onSuppression(inscription.id)}
                />
              )
            }
          >
            <Badge texte="CGV acceptées" ton="succes" />
          </Carte>
        </li>
      ))}
    </ul>
  );
}
