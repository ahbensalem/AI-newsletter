import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { getEdition } from "../data";
import Navbar from "../components/layout/Navbar";
import ArticleCard from "../components/article/ArticleCard";
import ArticleModal from "../components/article/ArticleModal";
import CategoryPill from "../components/article/CategoryPill";
import LabelBadge from "../components/article/LabelBadge";
import FilterBar from "../components/filter/FilterBar";
import { useArticleModal } from "../hooks/useArticleModal";
import { assetUrl } from "../utils/assetUrl";

export default function EditionPage() {
  const { slug } = useParams();
  const edition = getEdition(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!edition) {
    return (
      <div className="min-h-screen bg-page-bg">
        <Navbar />
        <main id="main-content" className="w-full" style={{ padding: "80px 24px", textAlign: "center" }}>
          <h1 className="text-2xl font-semibold text-text">Edition not found.</h1>
          <p className="text-base text-text-2" style={{ marginTop: "12px" }}>
            Return to the{" "}
            <Link to="/archive" className="text-accent hover:text-accent/80 transition-colors font-semibold focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg outline-none rounded">
              archive
            </Link>{" "}
            to browse all editions.
          </p>
        </main>
      </div>
    );
  }

  return <EditionContent edition={edition} />;
}

function EditionContent({ edition }) {
  const { selectedArticle, openArticle, closeArticle } = useArticleModal(edition.articles);
  const [activeLabel, setActiveLabel] = useState(null);
  const featured = edition.articles.find(a => a.featured);
  const filtered = activeLabel
    ? edition.articles.filter(a => a.labels?.includes(activeLabel))
    : edition.articles.filter(a => !a.featured);

  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />

      <main id="main-content">
        {/* Edition header */}
        <div className="section-glow" style={{ paddingTop: "56px", paddingBottom: "56px" }}>
          <div className="w-full" style={{ paddingLeft: "24px", paddingRight: "24px" }}>
            <div style={{ textAlign: "left", marginBottom: "24px" }}>
              <Link
                to="/archive"
                className="inline-flex items-center text-sm text-text-3 hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg outline-none rounded"
                style={{ gap: "6px" }}
              >
                <ArrowLeft size={14} aria-hidden="true" />
                All Editions
              </Link>
            </div>
            <div style={{ textAlign: "center" }}>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent" style={{ marginBottom: "16px" }}>
                Issue #{edition.issue} &middot; {edition.articles.length} articles
              </span>
              <h1
                className="font-bold text-text leading-none tracking-tight"
                style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
              >
                {edition.month}
                <span className="text-text-3" style={{ marginLeft: "12px" }}>{edition.year}</span>
              </h1>
              <div className="flex justify-center" style={{ marginTop: "24px" }}>
                <div style={{ width: "80px", height: "2px", background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <FilterBar activeLabel={activeLabel} onFilterChange={setActiveLabel} />

        {/* Featured hero card — only when no filter active */}
        <AnimatePresence mode="wait">
        {!activeLabel && featured && (
          <motion.section
            key="featured-hero"
            className="hero-glow"
            style={{ paddingTop: "32px", paddingBottom: "24px", overflow: "hidden" }}
            aria-label="Featured article"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="w-full relative z-10" style={{ paddingLeft: "24px", paddingRight: "24px" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  onClick={() => openArticle(featured.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Read article: ${featured.title}`}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openArticle(featured.id); } }}
                  className="block relative rounded-xl overflow-hidden h-[320px] sm:h-[400px] lg:h-[460px] group cursor-pointer border border-border hover:border-accent/30 transition-all duration-300 hover-glow-lg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg outline-none"
                >
                  {featured.image && (
                    <img
                      src={assetUrl(featured.image)}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 z-10" style={{ padding: "32px", paddingBottom: "40px", maxWidth: "42rem" }}>
                    <div className="flex flex-wrap items-center" style={{ gap: "8px" }}>
                      <CategoryPill categoryId={featured.category} />
                      {featured.labels?.map((id) => <LabelBadge key={id} labelId={id} />)}
                    </div>
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
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
        </AnimatePresence>

        {/* Articles grid */}
        <section style={{ paddingTop: "48px", paddingBottom: "48px" }} aria-label="All articles">
          <div className="w-full" style={{ paddingLeft: "24px", paddingRight: "24px" }}>
            {/* Result count */}
            <AnimatePresence mode="wait">
              {activeLabel && (
                <motion.p
                  key="count"
                  className="text-sm text-text-3 text-center"
                  style={{ marginBottom: "24px" }}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                >
                  {filtered.length} {filtered.length === 1 ? "article" : "articles"} found
                </motion.p>
              )}
            </AnimatePresence>

            <LayoutGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "24px" }}>
                <AnimatePresence mode="popLayout">
                  {filtered.map((article, i) => {
                    const isWide = !activeLabel && (i === 0 || i === 5);
                    return (
                      <motion.div
                        key={article.id}
                        layout
                        className={isWide ? "sm:col-span-2" : ""}
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{
                          duration: 0.35,
                          delay: i * 0.06,
                          ease: [0.25, 1, 0.5, 1],
                          layout: { type: "spring", stiffness: 300, damping: 30 },
                        }}
                      >
                        <ArticleCard article={article} onOpenArticle={openArticle} wide={isWide} />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </LayoutGroup>

            <AnimatePresence mode="wait">
              {filtered.length === 0 && (
                <motion.div
                  key="empty"
                  className="text-center"
                  style={{ paddingTop: "64px", paddingBottom: "64px" }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                  <motion.span
                    className="inline-block text-5xl text-text-3/30"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                  >
                    ?
                  </motion.span>
                  <p className="text-text-3" style={{ marginTop: "16px" }}>No articles match this filter.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal article={selectedArticle} onClose={closeArticle} />
        )}
      </AnimatePresence>
    </div>
  );
}
