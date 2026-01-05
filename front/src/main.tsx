import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Page/Home.tsx";
import Contact from "./Page/Contact.tsx";
import Panel from "./Page/Gestion/Panel.tsx";
import Login from "./Page/Gestion/Login.tsx";
import { Routes, Route, BrowserRouter } from "react-router";
import "@/styles/globals.css";
import Create_MDP from "./Page/Gestion/Create_MDP.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gestion/*" element={<Panel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create_mdp/:token" element={<Create_MDP />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
