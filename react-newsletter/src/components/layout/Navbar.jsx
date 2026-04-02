import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Navbar() {
  return (
    <>
      {/* Skip to content — visible only on keyboard focus */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-accent focus:text-page-bg focus:rounded-lg focus:text-sm focus:font-semibold outline-none"
        style={{ padding: "8px 16px" }}
      >
        Skip to content
      </a>

      <nav className="navbar-frosted sticky top-0 z-50 backdrop-blur-xl bg-nav-bg border-b border-border-subtle" aria-label="Main navigation">
        <div className="w-full flex items-center justify-between" style={{ paddingLeft: "32px", paddingRight: "32px", height: "64px" }}>
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center group focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg outline-none rounded-lg"
            style={{ gap: "10px" }}
            aria-label="The Gradient — Home"
          >
            <span className="relative flex items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300" style={{ width: "32px", height: "32px" }} aria-hidden="true">
              <Zap size={16} className="text-accent" />
            </span>
            <span className="text-base font-semibold text-text">
              The Gradient
            </span>
          </Link>

          {/* Navigation links */}
          <div className="flex items-center" style={{ gap: "32px" }}>
            <Link
              to="/"
              className="text-sm text-text-3 hover:text-text transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg outline-none rounded"
            >
              Home
            </Link>
            <Link
              to="/archive"
              className="text-sm text-text-3 hover:text-text transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg outline-none rounded"
            >
              Archive
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
