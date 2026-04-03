import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Newspaper } from "lucide-react";
import { assetUrl } from "../../utils/assetUrl";

export default function EditionCard({ edition }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="rounded-xl overflow-hidden group transition-all duration-300 border border-border hover:border-accent/30 hover-glow"
    >
      <Link
        to={`/edition/${edition.slug}`}
        className="block focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg outline-none rounded-xl"
        aria-label={`${edition.month} ${edition.year} — Issue #${edition.issue}, ${edition.articles.length} articles`}
      >
        {/* Cover image or gradient header */}
        {edition.coverImage ? (
          <div className="aspect-[16/9] overflow-hidden relative">
            <img
              src={assetUrl(edition.coverImage)}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-card-bg/30 to-transparent" />
            <div className="absolute" style={{ bottom: "16px", left: "24px" }}>
              <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wide text-accent bg-accent-soft backdrop-blur-sm rounded-full" style={{ gap: "6px", padding: "4px 10px" }}>
                <BookOpen size={10} aria-hidden="true" />
                Issue #{edition.issue}
              </span>
            </div>
          </div>
        ) : (
          <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-card-hover via-card-bg to-page-bg flex items-end">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]" aria-hidden="true">
              <Newspaper size={120} className="text-text" />
            </div>
            <div className="relative" style={{ padding: "24px" }}>
              <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wide text-accent bg-accent-soft rounded-full" style={{ gap: "6px", padding: "4px 10px" }}>
                <BookOpen size={10} aria-hidden="true" />
                Issue #{edition.issue}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="bg-card-bg group-hover:bg-card-hover transition-colors duration-300" style={{ padding: "28px 32px 32px" }}>
          <h3 className="text-xl font-semibold text-text group-hover:text-accent transition-colors duration-300">
            {edition.month} {edition.year}
          </h3>

          <p className="text-sm text-text-3" style={{ marginTop: "12px" }}>
            {edition.articles.length} articles
          </p>

          <div className="flex items-center text-accent font-semibold text-sm group-hover:gap-3 transition-all duration-300" style={{ gap: "6px", marginTop: "24px" }} aria-hidden="true">
            Read edition
            <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
