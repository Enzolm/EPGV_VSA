import Logo from "../../assets/logo_sf.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="w-screen flex flex-col h-full items-center  text-end justify-center align-middle">
      <div className="bg-white rounded-lg flex flex-col items-center p-10 shadow-md">
        <img className="h-32 w-32" src={Logo} alt="Logo EPGV" />
        <h1 className="text-2xl font-semibold mb-6">Connexion</h1>
        <form className="flex flex-col gap-4 max-w-sm">
          <Button
            type="submit"
            className="bg-green-900 text-white hover:bg-green-700"
          >
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
