import { useEffect, useState } from "react";

export interface EtatFetch<T> {
  donnees: T | null;
  chargement: boolean;
  erreur: string | null;
}

export function useFetch<T>(url: string | null): EtatFetch<T> {
  const [donnees, setDonnees] = useState<T | null>(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setDonnees(null);
      setErreur(null);
      return;
    }

    let annule = false;

    async function charger() {
      setChargement(true);
      setErreur(null);
      try {
        const reponse = await fetch(url!);
        if (!reponse.ok) {
          throw new Error("Erreur HTTP " + reponse.status);
        }
        const json: T = await reponse.json();
        if (annule) return;
        setDonnees(json);
      } catch (e) {
        if (annule) return;
        setErreur(e instanceof Error ? e.message : "Erreur inconnue");
        setDonnees(null);
      } finally {
        if (!annule) {
          setChargement(false);
        }
      }
    }

    charger();

    return () => {
      annule = true;
    };
  }, [url]);

  return { donnees, chargement, erreur };
}

export function useDebounce<T>(valeur: T, delai = 400): T {
  const [differee, setDifferee] = useState(valeur);

  useEffect(() => {
    const id = setTimeout(() => {
      setDifferee(valeur);
    }, delai);

    return () => clearTimeout(id);
  }, [valeur, delai]);

  return differee;
}
