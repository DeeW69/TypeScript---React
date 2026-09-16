export type VarianteBouton = "primaire" | "secondaire" | "danger";

export interface BoutonProps {
  libelle: string;
  variante?: VarianteBouton;
  desactive?: boolean;
  onClick?: () => void;
}

const classesParVariante: Record<VarianteBouton, string> = {
  primaire: "bg-blue-600 text-white hover:bg-blue-700",
  secondaire: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

function Bouton({ libelle, variante = "primaire", desactive = false, onClick }: BoutonProps) {
  return (
    <button
      type="button"
      disabled={desactive}
      onClick={onClick}
      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${classesParVariante[variante]}`}
    >
      {libelle}
    </button>
  );
}

export default Bouton;
