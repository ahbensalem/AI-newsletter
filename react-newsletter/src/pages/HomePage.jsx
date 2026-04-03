import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import ArticleCard from "../components/article/ArticleCard";
import ArticleModal from "../components/article/ArticleModal";
import CategoryPill from "../components/article/CategoryPill";
import { useArticleModal } from "../hooks/useArticleModal";
import { latestEdition } from "../data";
import { assetUrl } from "../utils/assetUrl";

/* ═══════════════ HeroSection ═══════════════ */
function HeroSection({ onOpenArticle }) {
  const featured = latestEdition.articles.find(a => a.featured);
  const secondary = latestEdition.articles.filter(a => !a.featured).slice(0, 2);

  return (
    <section className="hero-glow" style={{ paddingTop: "40px", paddingBottom: "56px" }} aria-label="Featured articles">
      <div className="w-full relative z-10" style={{ paddingLeft: "24px", paddingRight: "24px" }}>
        {/* Edition header */}
        <motion.div
          style={{ marginBottom: "56px", textAlign: "center" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wide text-accent" style={{ marginBottom: "16px" }}>
            Issue #{latestEdition.issue} &middot; {latestEdition.articles.length} articles
          </span>
          <h1
            className="font-bold text-text leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
          >
            {latestEdition.month}
            <span className="text-text-3" style={{ marginLeft: "12px" }}>{latestEdition.year}</span>
          </h1>
          <motion.div
            className="flex justify-center"
            style={{ marginTop: "24px" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
          >
            <div style={{ width: "80px", height: "2px", background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }} />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: "20px" }}>
          {/* Featured overlay card */}
          {featured && (
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              whileTap={{ scale: 0.985 }}
            >
              <div
                onClick={() => onOpenArticle(featured.id)}
                role="button"
                tabIndex={0}
                aria-label={`Read article: ${featured.title}`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpenArticle(featured.id); } }}
                className="block relative rounded-xl overflow-hidden h-[360px] sm:h-[440px] lg:h-[500px] group cursor-pointer border border-border hover:border-accent/30 transition-[border-color,box-shadow] duration-300 hover-glow-lg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg outline-none"
              >
                <img
                  src={assetUrl(featured.image)}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <motion.div
                  className="absolute bottom-0 left-0 z-10"
                  style={{ padding: "32px", paddingBottom: "40px", maxWidth: "42rem" }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 1, 0.5, 1] }}
                >
                  <CategoryPill categoryId={featured.category} />
                  <h2
                    className="text-white font-semibold leading-[1.35] line-clamp-3 drop-shadow-lg"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", marginTop: "16px" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-white/70 text-base leading-relaxed line-clamp-3" style={{ marginTop: "16px", maxWidth: "32rem" }}>
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center text-accent text-sm font-semibold group-hover:gap-3 transition-all duration-300" style={{ gap: "6px", marginTop: "24px" }} aria-hidden="true">
                    Read article <ChevronRight size={14} />
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Secondary cards */}
          <div className="flex flex-col sm:flex-row lg:flex-col" style={{ gap: "20px" }}>
            {secondary.map((article, i) => (
              <motion.div
                key={article.id}
                className="flex-1"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: [0.25, 1, 0.5, 1] }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.975 }}
              >
                <div
                  onClick={() => onOpenArticle(article.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Read article: ${article.title}`}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpenArticle(article.id); } }}
                  className="block relative rounded-xl overflow-hidden h-[220px] lg:h-full lg:min-h-[238px] group cursor-pointer border border-border hover:border-accent/30 transition-[border-color,box-shadow] duration-300 hover-glow focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg outline-none"
                >
                  {article.image ? (
                    <img
                      src={assetUrl(article.image)}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-card-hover to-card-bg" aria-hidden="true" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  <div className="absolute inset-0 z-10 flex flex-col justify-end" style={{ padding: "32px", paddingBottom: "36px" }}>
                    <CategoryPill categoryId={article.category} />
                    <h3 className="text-white text-xl font-semibold leading-[1.35] line-clamp-2 drop-shadow-md" style={{ marginTop: "16px" }}>
                      {article.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2" style={{ marginTop: "12px" }}>
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ ArticlesGrid ═══════════════ */
function ArticlesGrid({ onOpenArticle }) {
  const articles = latestEdition.articles.filter(a => !a.featured);

  return (
    <section className="section-glow bg-section-alt" style={{ paddingTop: "80px", paddingBottom: "80px" }} aria-label="All articles">
      <div className="w-full" style={{ paddingLeft: "24px", paddingRight: "24px" }}>
        <motion.div
          style={{ marginBottom: "56px", textAlign: "center" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wide text-accent" style={{ marginBottom: "16px" }}>
            This month
          </span>
          <h2
            className="font-bold text-text tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Latest Stories
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "24px" }}>
          {articles.map((article, i) => {
            const isWide = i === 0 || i === 5;
            return (
              <motion.div
                key={article.id}
                className={isWide ? "sm:col-span-2" : ""}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.3) }}
              >
                <ArticleCard article={article} onOpenArticle={onOpenArticle} wide={isWide} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ Page ═══════════════ */
export default function HomePage() {
  const { selectedArticle, openArticle, closeArticle } = useArticleModal(latestEdition.articles);

  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />
      <main id="main-content">
        <HeroSection onOpenArticle={openArticle} />
        <ArticlesGrid onOpenArticle={openArticle} />
      </main>

      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal article={selectedArticle} onClose={closeArticle} />
        )}
      </AnimatePresence>
    </div>
  );
}
