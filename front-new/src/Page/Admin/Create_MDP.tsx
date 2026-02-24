import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo_sf.png";
import { useCheckTokenCreationValidity } from "@/hooks/useUtilisateur";
import { useEffect, useState } from "react";
import { useParams, useNavigate, data } from "react-router";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useActiveAccount } from "@/hooks/useUtilisateur";

type FormData = {
  password: string;
  confirmPassword: string;
};

const Create_MDP = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [tokenData, setTokenData] = useState<any>(null);
  const { checkTokenValidity, loading, error } =
    useCheckTokenCreationValidity();
  const { register, handleSubmit, getValues, watch } = useForm<FormData>();
  const [samePasswordError, setSamePasswordError] = useState<string | null>(
    null,
  );
  const {
    createPassword,
    loading: activeAccountLoading,
    error: activeAccountError,
  } = useActiveAccount();

  useEffect(() => {
    const verify = async () => {
      if (token) {
        const result = await checkTokenValidity(token);
        setTokenData(result);
      }
    };
    verify();
    console.log("tokenData", token);
  }, [token]);

  useEffect(() => {
    const password = getValues("password");
    const confirmPassword = getValues("confirmPassword");
    if (password !== confirmPassword) {
      setSamePasswordError("Les mots de passe ne correspondent pas");
    } else {
      setSamePasswordError(null);
    }
  }, [watch("password"), watch("confirmPassword")]);

  useEffect(() => {
    if (tokenData && !tokenData.valid) {
      toast.error(tokenData.message || "Token invalide");
      navigate("/");
    }
  }, [tokenData]);

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      setSamePasswordError("Les mots de passe ne correspondent pas");
    } else {
      setSamePasswordError(null);
      const result = await createPassword({ token, password: data.password });
      console.log("result", result);
      if (result && result.success) {
        toast.success("Mot de passe créé avec succès");
        navigate("/login");
      } else {
        toast.error(
          result?.message || "Erreur lors de la création du mot de passe",
        );
      }
    }
  };

  return (
    <div className="w-screen flex flex-col h-full items-center  text-end justify-center align-middle">
      <div className="bg-white rounded-lg flex flex-col items-center p-10 shadow-md">
        <img className="h-32 w-32" src={Logo} alt="Logo EPGV" />
        {loading && <p>Vérification du token...</p>}
        {tokenData && tokenData.valid && (
          <>
            <h1 className="text-2xl font-semibold mb-6">
              Créer votre mot de passe
            </h1>
            <form
              className="flex flex-col gap-4 max-w-sm"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                type="password"
                placeholder="Entrez votre mot de passe"
                {...register("password", { required: true })}
              />
              <Input
                type="password"
                placeholder="Confirmer le mot de passe"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => {
                    const password = getValues("password");
                    return (
                      password === value ||
                      "Les mots de passe ne correspondent pas"
                    );
                  },
                })}
              />
              {samePasswordError && (
                <p className="text-red-500">{samePasswordError}</p>
              )}
              <Button
                disabled={activeAccountLoading}
                type="submit"
                className="bg-green-900 text-white hover:bg-green-700"
              >
                {activeAccountLoading
                  ? "Création en cours..."
                  : "Créer mon mot de passe"}
              </Button>
            </form>
          </>
        )}
        {tokenData && !tokenData.valid && (
          <p className="text-red-500">{tokenData.message}</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Create_MDP;
