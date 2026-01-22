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
import Create_MDP from "@/Page/Admin/Create_MDP";
import Actu_info from "./Page/Actualite/Actu_info";

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
        <Route path="/gestion/*" element={<Panel />} />
        {/* <Route path="/gestion/actus/creation" element={<Panel />} /> */}
        <Route path="/gestion/actus/edition/:id" element={<Panel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create_mdp/:token" element={<Create_MDP />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
