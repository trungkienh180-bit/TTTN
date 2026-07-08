import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import RenderPage from "./pages/RenderPage";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/editor/:pageId" element={<Editor />} />
        {/* Route để hiển thị (render) các trang dựa trên slug */}
        <Route path="*" element={<RenderPage />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
