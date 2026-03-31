import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import EditionCard from "../components/edition/EditionCard";
import { allEditions } from "../data";

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />
      <div className="bg-page-bg py-[100px]">
        <div className="max-w-[1240px] mx-auto px-6">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-[40px] font-extrabold text-text">Archive</h1>
            <p className="text-[18px] text-text-2 mt-2">Browse all past editions of The Gradient.</p>
          </motion.div>

          {/* Edition card grid */}
          {allEditions.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[18px] text-text-2">The archive is empty.</p>
              <p className="text-[14px] text-text-3 mt-2">The first edition is coming soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {allEditions.map((edition, i) => (
                <motion.div
                  key={edition.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <EditionCard edition={edition} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
