// src/contextes/AuthContext.tsx
//
// Le patron en quatre étapes : le contrat, le contexte créé à undefined,
// le Provider qui détient l'état, le hook de consommation qui refuse de
// renvoyer undefined.
import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContexte {
  pseudo: string | null;
  connecter: (pseudo: string) => void;
  deconnecter: () => void;
}

const Contexte = createContext<AuthContexte | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [pseudo, setPseudo] = useState<string | null>(null);

  const connecter = (nouveauPseudo: string) => setPseudo(nouveauPseudo);
  const deconnecter = () => setPseudo(null);

  return <Contexte.Provider value={{ pseudo, connecter, deconnecter }}>{children}</Contexte.Provider>;
}

export function useAuth(): AuthContexte {
  const contexte = useContext(Contexte);
  if (contexte === undefined) {
    throw new Error("useAuth doit être utilisé dans un <AuthProvider>");
  }
  return contexte;
}
