import { colorClasses } from "../../utils/colorClasses";
import { cn } from "../../lib/cn";

export default function CategoryPill({ categoryId }) {
  const cat = colorClasses[categoryId];

  if (!cat) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full text-xs font-semibold uppercase tracking-wide",
        cat.pill
      )}
      style={{ gap: "6px", padding: "4px 10px" }}
    >
      <span className={cn("rounded-full", cat.dot)} style={{ width: "6px", height: "6px" }} />
      {cat.label}
    </span>
  );
}
