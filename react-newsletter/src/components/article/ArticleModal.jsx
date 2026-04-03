import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { X, Clock, ExternalLink } from "lucide-react";
import CategoryPill from "./CategoryPill";
import { assetUrl } from "../../utils/assetUrl";

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ArticleModal({ article, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    previousFocus.current = document.activeElement;
    document.body.classList.add("modal-open");
    const timer = setTimeout(() => closeRef.current?.focus(), 80);
    return () => {
      document.body.classList.remove("modal-open");
      clearTimeout(timer);
      previousFocus.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = [...panel.querySelectorAll(FOCUSABLE)];
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  function handleBackdropClick(e) {
    if (panelRef.current && !panelRef.current.contains(e.target)) {
      onClose();
    }
  }

  const titleId = `modal-title-${article.id}`;

  return (
    <motion.div
      className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center overflow-y-auto"
      style={{ paddingTop: "40px", paddingBottom: "56px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        ref={panelRef}
        className="relative w-full max-w-3xl"
        style={{ marginLeft: "16px", marginRight: "16px", marginTop: "auto", marginBottom: "auto" }}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bg-card-bg rounded-xl overflow-hidden border border-border shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
          {/* Close button */}
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close article"
            className="absolute z-10 rounded-full bg-page-bg/80 backdrop-blur-sm border border-border flex items-center justify-center text-text-3 hover:text-text hover:border-accent/30 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card-bg outline-none"
            style={{ top: "16px", right: "16px", width: "40px", height: "40px" }}
          >
            <X size={18} />
          </button>

          {/* Hero image */}
          {article.image && (
            <div className="w-full overflow-hidden" style={{ maxHeight: "480px" }}>
              <img
                src={assetUrl(article.image)}
                alt=""
                className="w-full object-contain"
                style={{ maxHeight: "480px" }}
              />
            </div>
          )}

          {/* Content */}
          <div style={{ padding: "44px 40px 48px" }}>
            {/* Meta row */}
            <div className="flex items-center flex-wrap" style={{ gap: "16px" }}>
              <CategoryPill categoryId={article.category} />
              <span className="flex items-center text-sm text-text-3" style={{ gap: "6px" }}>
                <Clock size={14} aria-hidden="true" />
                {article.readTime}
              </span>
              {article.date && (
                <span className="text-sm text-text-3">&middot; {article.date}</span>
              )}
            </div>

            {/* Title */}
            <h1
              id={titleId}
              className="font-bold text-text leading-[1.3]"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", marginTop: "24px" }}
            >
              {article.title}
            </h1>

            {/* Divider */}
            <div className="bg-accent/30" style={{ width: "64px", height: "2px", marginTop: "32px" }} />

            {/* Body */}
            <div style={{ marginTop: "40px", maxWidth: "65ch" }}>
              {article.body.map((paragraph, i) => (
                <p key={i} className="text-text-2 leading-[1.9]" style={{ fontSize: "1.0625rem", marginTop: i > 0 ? "28px" : "0" }}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Gallery */}
            {article.gallery && (
              <div style={{ marginTop: "56px" }}>
                <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "16px" }}>
                  {article.gallery.map((src, i) => (
                    <figure key={i}>
                      <div className="rounded-lg overflow-hidden border border-border">
                        <img
                          src={assetUrl(src)}
                          alt={article.galleryTitles?.[i] || ""}
                          loading="lazy"
                          className="w-full object-cover hover:scale-105 transition-transform duration-500"
                          style={{ height: "200px" }}
                        />
                      </div>
                      {article.galleryTitles?.[i] && (
                        <figcaption className="text-xs text-text-3 leading-relaxed" style={{ marginTop: "10px" }}>
                          {article.galleryTitles[i]}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {/* Sources */}
            {article.sources?.length > 0 && (
              <div className="border-t border-border" style={{ marginTop: "56px", paddingTop: "40px" }}>
                <span className="text-xs font-semibold uppercase tracking-wide text-text-3">
                  Sources
                </span>
                <div className="flex flex-wrap" style={{ gap: "12px", marginTop: "16px" }}>
                  {article.sources.map((source, i) => (
                    <a
                      key={i}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent/80 transition-colors bg-accent-soft rounded-lg border border-accent/10 hover:border-accent/25 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card-bg outline-none"
                      style={{ gap: "6px", padding: "8px 16px" }}
                    >
                      <ExternalLink size={13} aria-hidden="true" />
                      {source.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
