import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function EditionCard({ edition }) {
  return (
    <motion.article
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.10)" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="rounded-3xl border border-border bg-card-bg overflow-hidden group"
    >
      <Link to={`/edition/${edition.slug}`} className="block p-6">
        {/* Edition title */}
        <h3 className="text-[24px] font-extrabold text-text">
          {edition.month} {edition.year}
        </h3>

        {/* Meta row */}
        <div className="flex items-center gap-4 mt-2">
          <span className="text-[13px] text-text-3 font-extrabold">
            Issue #{edition.issue}
          </span>
          <span className="text-[13px] text-text-3 font-extrabold">
            {edition.articles.length} articles
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-1 mt-4 text-accent font-extrabold text-[13px]">
          View Edition
          <ArrowRight size={14} />
        </div>
      </Link>
    </motion.article>
  );
}
