import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="navbar-frosted sticky top-0 z-50 backdrop-blur-md bg-nav-bg border-b border-border-subtle">
      <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between h-16">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[13px] font-extrabold tracking-wider uppercase text-text"
        >
          <Zap size={18} className="text-accent" />
          The Gradient
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-[13px] font-extrabold uppercase tracking-wider text-text-3 hover:text-accent transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/archive"
            className="text-[13px] font-extrabold uppercase tracking-wider text-text-3 hover:text-accent transition-colors duration-200"
          >
            Archive
          </Link>
        </div>
      </div>
    </nav>
  );
}
