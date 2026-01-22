import AdminNavBar from "@/composant/Admin_Navbar";
import { useLocation } from "react-router";
import UtilisateurGestion from "@/Page/Admin/Utilisateur/Utilisateur_gestion";
import ActusGesiton from "@/Page/Admin/Actualité/Actus_gestion";
import { useEffect, useState } from "react";
import Actus_creation from "./Actualité/Actus_creation";
import Actus_edition from "./Actualité/Actus_Edition";

const Panel = () => {
  const location = useLocation();

  console.log("Current pathname:", location.pathname);
  console.log("isVisible state:", location.pathname === "/gestion/actus");

  return (
    <>
      <div className="flex h-dvh w-dvw">
        <AdminNavBar />
        <section id="main" className="p-4 w-full max-h-full overflow-x-scroll">
          <div className="transform transition-all duration-300 ease-out">
            {location.pathname === "/gestion/actus" && <ActusGesiton />}
            {location.pathname === "/gestion/actus/creation" && (
              <Actus_creation />
            )}
            {location.pathname.startsWith("/gestion/actus/edition/") && (
              <Actus_edition />
            )}

            {location.pathname === "/gestion/utilisateur" && (
              <UtilisateurGestion />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Panel;
