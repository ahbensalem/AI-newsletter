import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CategoryPill from "./CategoryPill";

export default function ArticleCard({ article, onOpenArticle, wide = false }) {
  const shared = "rounded-xl bg-card-bg overflow-hidden group h-full hover:bg-card-hover transition-all duration-300 cursor-pointer border border-border hover:border-accent/30 hover-glow active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg outline-none";

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={wide ? `${shared} flex flex-col sm:flex-row` : `${shared} flex flex-col`}
      onClick={() => onOpenArticle(article.id)}
      role="button"
      tabIndex={0}
      aria-label={`Read article: ${article.title}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpenArticle(article.id); } }}
    >
      {/* Image */}
      {article.image ? (
        <div className={wide ? "sm:w-[45%] sm:min-h-[260px] aspect-[16/10] sm:aspect-auto overflow-hidden relative shrink-0" : "aspect-[16/10] overflow-hidden relative"}>
          <img
            src={article.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card-bg/40 via-transparent to-transparent" />
          <div className="absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ top: "16px", right: "16px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }} aria-hidden="true">
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </div>
      ) : (
        <div className={wide ? "sm:w-[45%] sm:min-h-[260px] aspect-[16/10] sm:aspect-auto relative overflow-hidden bg-gradient-to-br from-card-hover to-card-bg shrink-0" : "aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-card-hover to-card-bg"} aria-hidden="true">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-accent/15 text-6xl font-bold select-none">{article.title.charAt(0)}</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1" style={{ padding: wide ? "32px 40px" : "32px" }}>
        {/* Top meta */}
        <div className="flex items-center justify-between" style={{ gap: "12px" }}>
          <CategoryPill categoryId={article.category} />
          {article.date && (
            <span className="text-xs text-text-3 shrink-0">{article.date}</span>
          )}
        </div>

        {/* Title */}
        <h3 className={wide
          ? "text-xl font-semibold leading-[1.5] text-text group-hover:text-accent transition-colors duration-300 line-clamp-2"
          : "text-lg font-semibold leading-[1.5] text-text group-hover:text-accent transition-colors duration-300 line-clamp-2"
        } style={{ marginTop: "20px" }}>
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-base text-text-2 leading-[1.8] line-clamp-3 flex-1" style={{ marginTop: "16px" }}>
          {article.excerpt}
        </p>

        {/* Bottom meta */}
        <div className="flex items-center justify-between border-t border-border/40" style={{ paddingTop: "20px", marginTop: "24px" }}>
          <span className="text-sm text-text-3">{article.readTime}</span>
          <span className="text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center" style={{ gap: "4px" }} aria-hidden="true">
            Read <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
