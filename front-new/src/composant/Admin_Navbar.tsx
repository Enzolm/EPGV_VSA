import logo_sf from "@/assets/logo_sf.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useUserStore } from "@/lib/store/userStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  LogOut,
  UserRound,
  FilesIcon,
  Users2Icon,
  Undo2Icon,
} from "lucide-react";
import { useGetProfileImage } from "@/hooks/useUtilisateur";
import { use, useEffect, useState } from "react";
import GestionProfile from "@/Page/Admin/GestionProfile";

function AdminNavBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const { imageUrl, loading, error, fetchImageUrl } = useGetProfileImage();

  useEffect(() => {
    if (user) {
      fetchImageUrl(user.id.toString());
    }
  }, [user?.id, open]);

  useEffect(() => {
    console.log("################## :", user);
  }, [user, open]);

  return (
    <>
      <nav className="flex flex-col h-full border overflow-hidden  lg:w-64 border-black/10 bg-white lg:p-2 p-0 gap-6 shadow-md over">
        <img
          className="lg:h-20 lg:w-20 h-10 w-10"
          src={logo_sf}
          alt="Logo Gymnastique Volontaire"
        />
        <div className="flex flex-col h-full">
          <Button
            onClick={() => navigate("/gestion/actus")}
            className=" lg:justify-start  md-text"
            variant="ghost"
          >
            <FilesIcon className="lg:mr-2" />
            <span className="hidden lg:block">Actualités</span>
          </Button>
          <Button
            onClick={() => navigate("/gestion/utilisateur")}
            className="lg:justify-start"
            variant="ghost"
          >
            <Users2Icon className="lg:mr-2" />
            <span className="hidden lg:block">Utilisateurs</span>
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="mt-auto lg:justify-start "
            variant="ghost"
          >
            <Undo2Icon className="lg:mr-2" />
            <span className="hidden lg:block">Retour au site</span>
          </Button>
          <Popover>
            <PopoverTrigger className=" text-left">
              <div className="flex gap-1 hover:bg-[#FAFAFA] hover:cursor-pointer p-2 rounded-lg items-center">
                <img
                  className=" w-9 lg:h-9 rounded-full bg-gray-200 object-cover"
                  src={imageUrl}
                  alt="Photo de profil"
                />
                <div className="hidden lg:block">
                  <p className="text-sm font-medium">
                    {user?.prenom} {user?.nom}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-42 m-0 gap-0 p-0">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className=" justify-start">
                    <UserRound className="mr-2" />
                    Mon profil
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="text-lg font-semibold mb-4">
                    Modifier mon profil
                  </DialogTitle>
                  <GestionProfile
                    id={user?.id || null}
                    onClose={() => setOpen(false)}
                  />
                </DialogContent>
              </Dialog>
              <Button
                onClick={() => (
                  navigate("/"),
                  localStorage.removeItem("token")
                )}
                variant="ghost"
                className="justify-start text-red-500 hover:text-red-500"
              >
                <LogOut className="mr-2" />
                Se déconnecter
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </>
  );
}

export default AdminNavBar;
