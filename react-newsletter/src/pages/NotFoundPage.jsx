import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />
      <main id="main-content" className="w-full px-6 sm:px-10 lg:px-16 py-24 text-center">
        <span className="text-8xl font-bold text-accent/20">404</span>
        <h1 className="text-2xl font-semibold text-text mt-4">Page not found</h1>
        <p className="text-base text-text-2 mt-3 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-accent hover:text-accent/80 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg outline-none rounded"
        >
          Back to home
        </Link>
      </main>
    </div>
  );
}
