import Logo from "../../assets/logo_sf.webp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { isAuthenticated, login, error, loading } = useAuth();
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isAuthenticated.success) {
      navigate("/gestion");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data: FormData) => {
    login(data.email, data.password).then((success) => {
      if (success) {
        navigate("/gestion");
      }
    });
  };

  return (
    <div className="bg-background w-screen flex flex-col h-dvh items-center  text-end justify-center align-middle">
      <div className="bg-card rounded-lg border border-border flex flex-col items-center p-6 shadow-md">
        <img
          onClick={() => navigate("/")}
          className="h-32 w-32 hover:cursor-pointer"
          src={Logo}
          alt="Logo EPGV"
        />
        <h1 className="text-2xl font-semibold mb-6 text-foreground">
          Connexion
        </h1>
        <form
          className="flex flex-col gap-4 max-w-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label className="text-foreground">Email</Label>
          <Input {...register("email")} type="text" placeholder="Email" />
          <Label className="text-foreground">Mot de passe</Label>
          <Input
            {...register("password")}
            type="password"
            placeholder="Mot de passe"
          />
          <Label className="text-sm text-gray-600 justify-end flex">
            <a
              className="text-blue-500 hover:underline text-right"
              href="/forgot/email"
            >
              Mot de passe oublié ?
            </a>
          </Label>
          <Button
            type="submit"
            className="hover:cursor-pointer"
            disabled={loading}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </Button>
          {error &&
            error.code !== "NO_TOKEN" &&
            error.code !== "INVALID_TOKEN" && (
              <p className="text-red-500 text-start">{error.message}</p>
            )}
        </form>
      </div>
    </div>
  );
};

export default Login;
