import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-footer-bg">
      <div className="max-w-[1240px] mx-auto px-6 py-16">
        {/* Top row: Brand + tagline */}
        <div className="mb-8">
          <p className="text-white font-extrabold text-lg mb-2">The Gradient</p>
          <p className="text-footer-text">
            Monthly AI intelligence for builders and explorers.
          </p>
        </div>

        {/* Middle row: Navigation links */}
        <div className="flex items-center gap-6 mb-8">
          <Link
            to="/"
            className="text-footer-text hover:text-white transition-colors duration-200 text-[13px] font-extrabold uppercase tracking-wider"
          >
            Home
          </Link>
          <Link
            to="/archive"
            className="text-footer-text hover:text-white transition-colors duration-200 text-[13px] font-extrabold uppercase tracking-wider"
          >
            Archive
          </Link>
        </div>

        {/* Bottom row: Copyright */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-text-3 text-sm">
            &copy; 2026 The Gradient. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
