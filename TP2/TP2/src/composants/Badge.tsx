export type TonBadge = "neutre" | "succes" | "info" | "attention";

export interface BadgeProps {
  texte: string;
  ton?: TonBadge;
}

const classesParTon: Record<TonBadge, string> = {
  neutre: "bg-gray-200 text-gray-800",
  succes: "bg-green-100 text-green-800",
  info: "bg-blue-100 text-blue-800",
  attention: "bg-yellow-100 text-yellow-800",
};

function Badge({ texte, ton = "neutre" }: BadgeProps) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${classesParTon[ton]}`}>
      {texte}
    </span>
  );
}

export default Badge;
