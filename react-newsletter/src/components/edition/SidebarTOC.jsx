import { colorClasses } from "../../utils/colorClasses";
import { cn } from "../../lib/cn";

export default function SidebarTOC({ articles, activeId }) {
  return (
    <div className="bg-sidebar-bg rounded-2xl p-6 border border-border-subtle">
      <p className="text-[13px] font-extrabold uppercase tracking-wider text-text-3 mb-6">
        In this edition
      </p>
      <nav className="flex flex-col gap-1">
        {articles.map((article) => (
          <button
            key={article.id}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(article.id);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={cn(
              "text-left pl-3 py-2 border-l-2 transition-colors duration-200 text-[14px] leading-snug",
              activeId === article.id
                ? "border-accent text-accent font-extrabold"
                : "border-transparent text-text-3 hover:text-text hover:border-border"
            )}
          >
            <span
              className={cn(
                "inline-block w-1.5 h-1.5 rounded-full mr-2",
                colorClasses[article.category]?.dot
              )}
            />
            {article.title}
          </button>
        ))}
      </nav>
    </div>
  );
}
