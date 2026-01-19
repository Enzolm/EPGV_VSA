import AdminNavBar from "@/composant/Admin_Navbar";
import { useLocation } from "react-router";
import UtilisateurGestion from "@/Page/Admin/Utilisateur/Utilisateur_gestion";
import ActusGesiton from "@/Page/Admin/Actualité/Actus_gestion";
import { useEffect, useState } from "react";

const Panel = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <div className="flex h-dvh w-dvw">
        <AdminNavBar />
        <section id="main" className="p-4 w-full max-h-full overflow-x-scroll">
          <div
            className={`transform transition-all duration-300 ease-out ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            {location.pathname.startsWith("/gestion/actus") && <ActusGesiton />}
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
