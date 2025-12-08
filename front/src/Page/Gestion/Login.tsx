import { Input } from "../../components/base/input/input";
import { Button } from "../../components/base/buttons/button";
import { Checkbox } from "../../components/base/checkbox/checkbox";
import Logo from "../../assets/logo_sf.png";

const Login = () => {
  return (
    <>
      <div className="w-full flex flex-col h-full justify-center items-center text-end">
        <img className="h-32 w-32 mb-6" src={Logo} alt="Logo EPGV" />
        <h1 className="text-2xl font-bold mb-6">Connexion</h1>
        <form className="flex flex-col gap-4 max-w-sm">
          <Input
            isRequired={true}
            label="Email"
            type="email"
            placeholder="Entrez votre email"
          />
          <Input
            isInvalid={true}
            isRequired={true}
            label="Mot de passe"
            type="password"
            placeholder="Entrez votre mot de passe"
            hint=""
          />
          <div className="w-full">
            <a href="#" className="text-sm text-green-600 hover:underline">
              Mot de passe oublié ?
            </a>
            <Checkbox className=" self-end" label="Se souvenir de moi" />
          </div>
          <Button
            type="submit"
            className="bg-green-900 text-white hover:bg-green-700"
          >
            Se connecter
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
