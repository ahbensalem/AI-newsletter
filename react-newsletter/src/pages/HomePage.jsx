import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Mail } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ArticleCard from "../components/article/ArticleCard";
import CategoryPill from "../components/article/CategoryPill";
import { latestEdition } from "../data";

/* ═══════════════ HeroSection ═══════════════ */
function HeroSection() {
  const featured = latestEdition.articles.find(a => a.featured);
  const secondary = latestEdition.articles.filter(a => !a.featured).slice(0, 2);

  return (
    <section className="bg-page-bg py-[100px]">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Featured overlay card */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to={`/edition/${latestEdition.slug}`}
              className="block relative rounded-3xl overflow-hidden min-h-[400px] lg:min-h-[500px] group"
            >
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 lg:p-12 z-10">
                <CategoryPill categoryId={featured.category} />
                <h2 className="text-white text-[28px] lg:text-[40px] font-extrabold leading-tight mt-3 max-w-3xl">
                  {featured.title}
                </h2>
                <p className="text-white/80 text-[18px] mt-3 max-w-xl leading-relaxed">
                  {featured.excerpt}
                </p>
                <span className="text-accent text-[13px] font-extrabold flex items-center gap-1 mt-4">
                  Read Now <ChevronRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Two secondary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          {secondary.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            >
              <Link
                to={`/edition/${latestEdition.slug}#${article.id}`}
                className="block relative rounded-3xl overflow-hidden h-[260px] lg:h-[300px] group"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 z-10">
                  <CategoryPill categoryId={article.category} />
                  <h3 className="text-white text-[20px] font-extrabold leading-tight mt-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <span className="text-accent text-[13px] font-extrabold flex items-center gap-1 mt-3">
                    Read Now <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ RecentArticlesGrid ═══════════════ */
function RecentArticlesGrid() {
  const recentArticles = latestEdition.articles.filter(a => !a.featured).slice(0, 6);

  return (
    <section className="bg-section-alt py-[100px]">
      <div className="max-w-[1240px] mx-auto px-6">
        <h2 className="text-[24px] font-extrabold text-text">Latest Stories</h2>
        <p className="text-[18px] text-text-2 mt-2">
          The most important AI developments from this month's edition.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {recentArticles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <ArticleCard article={article} editionSlug={latestEdition.slug} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to={`/edition/${latestEdition.slug}`}
            className="text-accent font-extrabold text-[13px] flex items-center gap-1 hover:gap-2 transition-all"
          >
            View all articles <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ NewsletterSignup ═══════════════ */
function NewsletterSignup() {
  return (
    <section className="bg-page-bg py-[100px]">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Mail size={40} className="text-accent mx-auto" />
          <h2 className="text-[24px] font-extrabold text-text mt-6">
            Stay ahead of the curve
          </h2>
          <p className="text-[18px] text-text-2 mt-3 leading-relaxed">
            One email per month. No spam. The most important AI developments, curated for builders and explorers.
          </p>
          <form className="flex gap-3 mt-8 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-border bg-card-bg px-4 py-3 text-text placeholder:text-text-3 focus:outline-none focus:border-accent/50 transition-colors"
            />
            <button
              type="submit"
              className="bg-accent text-white font-extrabold text-[13px] rounded-xl px-6 py-3 hover:bg-accent/90 transition-colors cursor-pointer border-none whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════ Page ═══════════════ */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />
      <HeroSection />
      <RecentArticlesGrid />
      <NewsletterSignup />
      <Footer />
    </div>
  );
}
