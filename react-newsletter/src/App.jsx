import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import EditionPage from "./pages/EditionPage";
import ArchivePage from "./pages/ArchivePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/article/:id" element={<ArticlePage />} />
      <Route path="/edition/:slug" element={<EditionPage />} />
      <Route path="/archive" element={<ArchivePage />} />
    </Routes>
  );
}
