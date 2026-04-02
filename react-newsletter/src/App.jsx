import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditionPage from "./pages/EditionPage";
import ArchivePage from "./pages/ArchivePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/edition/:slug" element={<EditionPage />} />
      <Route path="/archive" element={<ArchivePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
