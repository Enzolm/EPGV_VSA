import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Page/Home.tsx";
import Contact from "./Page/Contact.tsx";
import Panel from "./Page/Gestion/Panel.tsx";
import Login from "./Page/Gestion/Login.tsx";
import { Routes, Route, BrowserRouter } from "react-router";
import "@/styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gestion/*" element={<Panel />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
