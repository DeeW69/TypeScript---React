import type { ReactNode } from "react";

export interface CarteProps {
  titre: string;
  sousTitre?: string;
  children: ReactNode;
  actions?: ReactNode;
}

function Carte({ titre, sousTitre, children, actions }: CarteProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h2 className="font-bold">{titre}</h2>
      {sousTitre && <p className="text-sm text-gray-500">{sousTitre}</p>}
      <div className="mt-2">{children}</div>
      {actions && <div className="mt-4">{actions}</div>}
    </div>
  );
}

export default Carte;
