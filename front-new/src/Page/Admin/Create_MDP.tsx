import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo_sf.png";

const Create_MDP = () => {
  return (
    <div className="w-screen flex flex-col h-full items-center  text-end justify-center align-middle">
      <div className="bg-white rounded-lg flex flex-col items-center p-10 shadow-md">
        <img className="h-32 w-32" src={Logo} alt="Logo EPGV" />
        <h1 className="text-2xl font-semibold mb-6">
          Creation du mot de passe
        </h1>
        <form className="flex flex-col gap-4 max-w-sm">
          <Input type="password" placeholder="Entrez votre mot de passe" />
          <Input type="password" placeholder="Confirmer le mot de passe" />
          <Button
            type="submit"
            className="bg-green-900 text-white hover:bg-green-700"
          >
            Créer sont mot de passe
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Create_MDP;
