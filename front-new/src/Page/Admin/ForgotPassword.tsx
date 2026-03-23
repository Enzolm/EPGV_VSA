import Logo from "../../assets/logo_sf.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useForgotPassword } from "@/hooks/useUtilisateur";
import { toast } from "sonner";

type FormData = {
  password: string;
  confirmPassword: string;
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { register, handleSubmit, watch } = useForm<FormData>();
  const [samePasswordError, setSamePasswordError] = useState<string | null>(
    null,
  );
  const { resetPassword, loading } = useForgotPassword();

  useEffect(() => {
    console.log("Token reçu:", token);
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    setSamePasswordError(null);
  }, [watch("password"), watch("confirmPassword")]);

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      setSamePasswordError("Les mots de passe ne correspondent pas");
    } else {
      console.log("Données du formulaire:", data);
      setSamePasswordError(null);
      const response = await resetPassword(
        token,
        data.password,
        data.confirmPassword,
      );
      if (response.success) {
        toast.success(
          response.message || "Mot de passe réinitialisé avec succès",
        );
        navigate("/login");
      } else {
        setSamePasswordError(
          response.message ||
            "Erreur lors de la réinitialisation du mot de passe",
        );
      }
    }
  };

  return (
    <div className="w-screen flex flex-col h-dvh items-center  text-end justify-center align-middle">
      <div className="bg-white rounded-lg flex flex-col items-center p-6 shadow-md">
        <img
          className="h-32 w-32 hover:cursor-pointer"
          src={Logo}
          alt="Logo EPGV"
          onClick={() => navigate("/")}
        />
        <h1 className="text-2xl font-semibold mb-6">
          Rénitialiser son mot de passe
        </h1>
        <form
          className="flex flex-col gap-4 max-w-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label>Nouveau mot de passe</Label>
          <Input
            {...register("password", { required: true })}
            type="password"
            placeholder="Mot de passe"
            className="border border-gray-300 rounded-md p-2"
          />
          <Label>Confirmer le nouveau mot de passe</Label>
          <Input
            {...register("confirmPassword", { required: true })}
            type="password"
            placeholder="Mot de passe"
            className="border border-gray-300 rounded-md p-2"
          />
          <Button
            disabled={loading}
            type="submit"
            className=" text-white hover:cursor-pointer"
            // disabled={loading}
          >
            {loading
              ? "Réinitialisation en cours..."
              : "Rénitialiser mon mot de passe"}
          </Button>
          {samePasswordError && (
            <p className="text-red-500 text-start">{samePasswordError}</p>
          )}
          {/* {error &&
            error.code !== "NO_TOKEN" &&
            error.code !== "INVALID_TOKEN" && (
              <p className="text-red-500 text-start">{error.message}</p>
            )} */}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
