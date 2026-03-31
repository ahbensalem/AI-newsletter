import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";
import CategoryPill from "./CategoryPill";

export default function ArticleCard({ article, editionSlug }) {
  const href = editionSlug
    ? `/edition/${editionSlug}#${article.id}`
    : "/";

  return (
    <motion.article
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.10)" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="rounded-3xl border border-border bg-card-bg overflow-hidden group"
    >
      <Link to={href} className="block h-full">
        {/* Image container */}
        {article.image && (
          <div className="h-[180px] overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Category pill */}
          <CategoryPill categoryId={article.category} />

          {/* Title */}
          <h3 className="text-[24px] font-extrabold leading-tight text-text mt-3 group-hover:text-accent transition-colors duration-300">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[18px] text-text-2 leading-relaxed mt-2 line-clamp-2">
            {article.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-text-3" />
              <span className="text-[13px] text-text-3 font-extrabold">
                {article.readTime}
              </span>
            </div>
            <span className="text-[13px] font-extrabold text-accent flex items-center gap-1">
              Read Now
              <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
