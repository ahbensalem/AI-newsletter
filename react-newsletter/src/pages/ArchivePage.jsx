import { motion } from "framer-motion";
import { Library } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import EditionCard from "../components/edition/EditionCard";
import { allEditions } from "../data";

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />

      <main id="main-content">
        {/* Hero header */}
        <section className="section-glow" style={{ paddingTop: "56px", paddingBottom: "56px" }}>
          <div className="w-full" style={{ paddingLeft: "24px", paddingRight: "24px" }}>
            <motion.div
              style={{ textAlign: "center" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wide text-accent" style={{ gap: "8px", marginBottom: "16px" }}>
                <Library size={14} aria-hidden="true" />
                Archive
              </span>
              <h1
                className="font-bold text-text leading-none tracking-tight"
                style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}
              >
                Past Editions
              </h1>
              <div className="flex justify-center" style={{ marginTop: "24px" }}>
                <div style={{ width: "80px", height: "2px", background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }} />
              </div>
              <p className="text-text-3 leading-relaxed" style={{ fontSize: "15px", marginTop: "20px", letterSpacing: "0.02em", textAlign: "center", maxWidth: "28rem", marginLeft: "auto", marginRight: "auto" }}>
                Browse every issue of <span className="text-text font-medium">The Gradient</span>. Each edition captures the most important AI developments of the month.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Edition grid */}
        <section style={{ paddingTop: "56px", paddingBottom: "56px" }} aria-label="All editions">
          <div className="w-full" style={{ paddingLeft: "24px", paddingRight: "24px" }}>
            {allEditions.length === 0 ? (
              <div style={{ textAlign: "center", paddingTop: "80px", paddingBottom: "80px" }}>
                <p className="text-lg text-text-2">The archive is empty.</p>
                <p className="text-base text-text-3" style={{ marginTop: "8px" }}>The first edition is coming soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style={{ gap: "24px" }}>
                {allEditions.map((edition, i) => (
                  <motion.div
                    key={edition.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.08, 0.3) }}
                  >
                    <EditionCard edition={edition} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
