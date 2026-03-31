import { colorClasses } from "../../utils/colorClasses";
import { cn } from "../../lib/cn";

export default function CategoryPill({ categoryId }) {
  const cat = colorClasses[categoryId];

  if (!cat) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[13px] font-extrabold",
        cat.pill
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", cat.dot)} />
      {cat.label}
    </span>
  );
}
