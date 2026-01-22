import logo_sf from "@/assets/logo_sf.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import img_profile from "@/assets/M_B.jpg";

function AdminNavBar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex flex-col h-full border w-64 border-black/10 bg-white p-2 gap-6 shadow-md">
        <img
          className="h-20 w-20"
          src={logo_sf}
          alt="Logo Gymnastique Volontaire"
        />
        <div className="flex flex-col h-full">
          <Button
            onClick={() => navigate("/gestion/actus")}
            className=" justify-start"
            variant="ghost"
          >
            Actualités
          </Button>
          <Button
            onClick={() => navigate("/gestion/utilisateur")}
            className="  justify-start"
            variant="ghost"
          >
            Utilisateurs
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="mt-auto justify-start"
            variant="ghost"
          >
            Retourner sur le site
          </Button>
          <div className="flex gap-1 hover:bg-[#FAFAFA] hover:cursor-pointer p-2 rounded-lg items-center">
            <img className="h-9 w-9 rounded-full" src={img_profile} alt="" />
            <div>
              <p className="text-sm font-medium">Michel BEMILI</p>
              <p className="text-xs text-gray-500">email.exemple@gmail.com</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNavBar;
