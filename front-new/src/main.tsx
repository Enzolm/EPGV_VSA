import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router";
import { Toaster } from "@/components/ui/sonner";

import "./index.css";
import Accueil from "@/Page/Accueil/Accueil";
import Actu_page from "@/Page/Actualite/Actu_page";
import Contact from "@/Page/Contact/Contact";
import Panel from "@/Page/Admin/Panel";
import Login from "@/Page/Admin/Login";
import ForgotPassword from "./Page/Admin/ForgotPassword";
import Create_MDP from "@/Page/Admin/Create_MDP";
import Actu_info from "./Page/Actualite/Actu_info";
import AuthProvider from "@/lib/ProtectedRoute";
import ForgotPasswordEmail from "./Page/Admin/ForgotEmail";
import MentionLegal from "@/Page/MentionLegal/MentionLegal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-right" />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/news" element={<Actu_page />} />
        <Route path="/news/:pagination" element={<Actu_page />} />
        <Route path="/news/info/:id" element={<Actu_info />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/gestion/*"
          element={
            <AuthProvider AdminRoute={false}>
              <Panel />
            </AuthProvider>
          }
        />
        {/* <Route path="/gestion/actus/creation" element={<AuthProvider><Panel /></AuthProvider>} /> */}
        <Route path="/gestion/actus/edition/:id" element={<Panel />} />

        <Route path="/login" element={<Login />} />
        <Route path="/forgot/email" element={<ForgotPasswordEmail />} />
        <Route path="/reset-password/:token" element={<ForgotPassword />} />
        <Route path="/create_mdp" element={<Create_MDP />} />
        <Route path="/mention-légal" element={<MentionLegal />} />

        <Route path="*" element={<Accueil />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
