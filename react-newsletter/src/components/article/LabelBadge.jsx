import { labelClasses } from "../../utils/colorClasses";
import { cn } from "../../lib/cn";

export default function LabelBadge({ labelId }) {
  const config = labelClasses[labelId];
  if (!config) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md text-[0.65rem] font-medium tracking-wide",
        config.bg,
        config.text
      )}
      style={{ padding: "2px 8px" }}
    >
      {config.label}
    </span>
  );
}
