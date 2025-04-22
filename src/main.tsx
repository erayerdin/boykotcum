import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import MaterialLayout from "./layouts/material/index.tsx";
import AboutPage from "./pages/about/index.tsx";
import CameraPage from "./pages/camera/index.tsx";
import HomePage from "./pages/home/index.tsx";
import PhotoViewerPage from "./pages/photo-viewer/index.tsx";
import ProductLinksPage from "./pages/product-links/index.tsx";
import SettingsPage from "./pages/settings/index.tsx";
import GlobalProviders from "./providers/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route element={<MaterialLayout defaultTitle="Ayarlar" />}>
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/photo" element={<PhotoViewerPage />} />
          <Route element={<MaterialLayout defaultTitle="Bağlantılar" />}>
            <Route path="/links" element={<ProductLinksPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </GlobalProviders>
  </StrictMode>
);
