import Logo from "../../assets/logo_sf.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="w-screen flex flex-col h-dvh items-center  text-end justify-center align-middle">
      <div className="bg-white rounded-lg flex flex-col items-center p-6 shadow-md">
        <img className="h-32 w-32" src={Logo} alt="Logo EPGV" />
        <h1 className="text-2xl font-semibold mb-6">Connexion</h1>
        <form className="flex flex-col gap-4 max-w-sm">
          <Label>Email</Label>
          <Input
            type="text"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2"
          />
          <Label>Mot de passe</Label>
          <Input
            type="password"
            placeholder="Mot de passe"
            className="border border-gray-300 rounded-md p-2"
          />
          <Button type="submit" className=" text-white hover:cursor-pointer">
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
