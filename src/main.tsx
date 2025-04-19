import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import CameraPage from "./pages/camera/index.tsx";
import HomePage from "./pages/home/index.tsx";
import PhotoViewerPage from "./pages/photo-viewer/index.tsx";
import GlobalProviders from "./providers/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/photo" element={<PhotoViewerPage />} />
        </Routes>
      </BrowserRouter>
    </GlobalProviders>
  </StrictMode>
);
