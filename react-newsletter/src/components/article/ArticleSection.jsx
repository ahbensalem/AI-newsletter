import { useScrollSpy } from "../../hooks/useScrollSpy";
import CategoryPill from "./CategoryPill";
import { Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function ArticleSection({ article, onInView }) {
  const ref = useScrollSpy(article.id, onInView);

  return (
    <section
      id={article.id}
      ref={ref}
      className="py-12 border-b border-border-subtle last:border-b-0"
      style={{ scrollMarginTop: "80px" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {/* Category pill + reading time */}
        <div className="flex items-center gap-3">
          <CategoryPill categoryId={article.category} />
          <span className="flex items-center gap-1 text-[13px] text-text-3 font-extrabold">
            <Clock size={14} />
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-[24px] font-extrabold text-text mt-4">{article.title}</h2>

        {/* Image */}
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full rounded-2xl mt-6 object-cover max-h-[400px]"
          />
        )}

        {/* Body paragraphs */}
        <div className="prose prose-lg prose-stone max-w-none mt-6">
          {article.body.map((paragraph, i) => (
            <p key={i} className="text-[18px] text-text-2 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Gallery */}
        {article.gallery && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {article.gallery.map((src, i) => (
              <figure key={i}>
                <img
                  src={src}
                  alt={article.galleryTitles?.[i] || ""}
                  className="rounded-xl w-full h-[200px] object-cover"
                />
                {article.galleryTitles?.[i] && (
                  <figcaption className="text-[13px] text-text-3 mt-2">
                    {article.galleryTitles[i]}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        {/* Sources */}
        {article.sources?.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-6">
            {article.sources.map((source, i) => (
              <a
                key={i}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-accent hover:text-accent/80 transition-colors"
              >
                <ExternalLink size={14} />
                {source.name}
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
