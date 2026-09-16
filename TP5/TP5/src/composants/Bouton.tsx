export type VarianteBouton = "primaire" | "secondaire" | "danger";

export interface BoutonProps {
  libelle: string;
  variante?: VarianteBouton;
  desactive?: boolean;
  onClick?: () => void;
}

function getClassesVariante(variante: VarianteBouton) {
  if (variante === "secondaire") {
    return "bg-slate-200 text-slate-900 hover:bg-slate-300 focus:ring-slate-400";
  }
  if (variante === "danger") {
    return "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400";
  }
  return "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400";
}

export function Bouton({ libelle, variante = "primaire", desactive = false, onClick }: BoutonProps) {
  const classes =
    "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed " +
    getClassesVariante(variante);

  return (
    <button type="button" disabled={desactive} onClick={onClick} className={classes}>
      {libelle}
    </button>
  );
}
