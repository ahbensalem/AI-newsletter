import { motion, AnimatePresence } from "framer-motion";
import { labelClasses, ALL_LABELS } from "../../utils/colorClasses";
import { cn } from "../../lib/cn";

function FilterChip({ active, onClick, label, color }) {
  const config = color ? labelClasses[color] : null;
  const activeColor = config ? config.text.replace("text-", "") : "accent";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "relative rounded-full text-sm font-medium cursor-pointer border outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg transition-colors duration-200",
        active
          ? config
            ? `${config.bg} ${config.text} border-current`
            : "bg-accent-soft text-accent border-accent/30"
          : "bg-transparent text-text-3 border-border hover:text-text hover:border-text-3"
      )}
      style={{ padding: "6px 18px" }}
      aria-pressed={active}
    >
      <span className="relative z-10">{label}</span>
      <AnimatePresence>
        {active && (
          <motion.span
            layoutId="filter-active-glow"
            className={`absolute inset-0 rounded-full bg-${activeColor}/8`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{ pointerEvents: "none" }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function FilterBar({ activeLabel, onFilterChange }) {
  return (
    <motion.section
      className="w-full"
      style={{ paddingLeft: "24px", paddingRight: "24px", paddingTop: "48px", paddingBottom: "8px" }}
      aria-label="Filter articles by label"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="flex flex-wrap justify-center" style={{ gap: "10px" }}>
        <FilterChip
          active={activeLabel === null}
          onClick={() => onFilterChange(null)}
          label="All"
          color={null}
        />
        {ALL_LABELS.map((id) => (
          <FilterChip
            key={id}
            active={activeLabel === id}
            onClick={() => onFilterChange(activeLabel === id ? null : id)}
            label={labelClasses[id].label}
            color={id}
          />
        ))}
      </div>
    </motion.section>
  );
}
