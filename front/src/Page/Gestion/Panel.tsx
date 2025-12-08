import AdminNavBar from "../../composant/AdminNavBar";
import { useLocation } from "react-router";
import UtilisateurGestion from "./Utilisateur/Utilisateur_gestion";
import ActusGesiton from "./Actualité/Actus_gestion";

const Panel = () => {
  const location = useLocation();

  return (
    <>
      <div className="flex h-dvh w-dvw">
        <AdminNavBar />
        <section id="main" className=" p-4 w-full max-h-full overflow-x-scroll">
          {location.pathname === "/gestion/actus" && <ActusGesiton />}
          {location.pathname === "/gestion/utilisateur" && (
            <UtilisateurGestion />
          )}
        </section>
      </div>
    </>
  );
};

export default Panel;
