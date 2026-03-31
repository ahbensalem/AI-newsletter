import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getEdition } from "../data";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ArticleSection from "../components/article/ArticleSection";
import SidebarTOC from "../components/edition/SidebarTOC";

export default function EditionPage() {
  const { slug } = useParams();
  const edition = getEdition(slug);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!edition) {
    return (
      <div className="min-h-screen bg-page-bg">
        <Navbar />
        <div className="max-w-[1240px] mx-auto px-6 py-24 text-center">
          <h1 className="text-[40px] font-extrabold text-text">Edition not found.</h1>
          <p className="text-[18px] text-text-2 mt-4">
            Return to the{" "}
            <Link to="/archive" className="text-accent hover:text-accent/80 transition-colors font-extrabold">
              archive
            </Link>{" "}
            to browse all editions.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />

      {/* Edition header */}
      <div className="bg-page-bg pt-12 pb-8">
        <div className="max-w-[1240px] mx-auto px-6">
          <h1 className="text-[40px] font-extrabold text-text">
            {edition.month} {edition.year}
          </h1>
          <p className="text-[18px] text-text-2 mt-2">
            Issue #{edition.issue} — {edition.articles.length} articles
          </p>
        </div>
      </div>

      {/* Two-column layout — NO overflow: hidden on ANY ancestor */}
      <div className="max-w-[1240px] mx-auto px-6 pb-[100px]">
        <div className="grid lg:grid-cols-[1fr_260px] gap-8">
          <main>
            {edition.articles.map((article) => (
              <ArticleSection
                key={article.id}
                article={article}
                onInView={setActiveId}
              />
            ))}
          </main>
          <aside className="hidden lg:block self-start sticky top-[80px]">
            <SidebarTOC articles={edition.articles} activeId={activeId} />
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
