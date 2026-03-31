import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditionPage from "./pages/EditionPage";
import ArchivePage from "./pages/ArchivePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/edition/:slug" element={<EditionPage />} />
      <Route path="/archive" element={<ArchivePage />} />
    </Routes>
  );
}
