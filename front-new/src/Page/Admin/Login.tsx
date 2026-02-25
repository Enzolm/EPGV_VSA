import Logo from "../../assets/logo_sf.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { use, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { isAuthenticated, login, loading, error } = useAuth();
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isAuthenticated.success) {
      navigate("/gestion");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data: FormData) => {
    console.log("Tentative de connexion avec les données:", data);
    login(data.email, data.password).then((success) => {
      if (success) {
        navigate("/gestion");
      }
    });
  };

  return (
    <div className="w-screen flex flex-col h-dvh items-center  text-end justify-center align-middle">
      <div className="bg-white rounded-lg flex flex-col items-center p-6 shadow-md">
        <img className="h-32 w-32" src={Logo} alt="Logo EPGV" />
        <h1 className="text-2xl font-semibold mb-6">Connexion</h1>
        <form
          className="flex flex-col gap-4 max-w-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label>Email</Label>
          <Input
            {...register("email")}
            type="text"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2"
          />
          <Label>Mot de passe</Label>
          <Input
            {...register("password")}
            type="password"
            placeholder="Mot de passe"
            className="border border-gray-300 rounded-md p-2"
          />
          <Button type="submit" className=" text-white hover:cursor-pointer">
            Se connecter
          </Button>
          {error && <p className="text-red-500 text-start">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
