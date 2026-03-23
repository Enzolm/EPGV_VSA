import { useNavigate } from "react-router";
import Logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSendForgotPasswordEmail } from "@/hooks/useUtilisateur";
import { toast } from "sonner";

type FormData = {
  email: string;
};

const ForgotPasswordEmail = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();
  const { sendForgotPasswordEmail, loading, error } =
    useSendForgotPasswordEmail();

  const onSubmit = async (data: FormData) => {
    const result = await sendForgotPasswordEmail(data.email);
    if (result.success) {
      toast.success("Email de réinitialisation envoyé avec succès");
      navigate("/");
    }
  };

  return (
    <div className="w-screen flex flex-col h-dvh items-center text-center justify-center align-middle">
      <div className="bg-white rounded-lg flex flex-col items-center p-6 shadow-md">
        <img
          className="h-32 w-32 hover:cursor-pointer"
          src={Logo}
          alt="Logo EPGV"
          onClick={() => navigate("/")}
        />
        <h1 className="text-2xl font-semibold mb-6">
          Réinitialisation du mot de passe
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Entrez votre adresse email pour recevoir les instructions de
            réinitialisation
          </Label>
          <Input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 mt-2 mb-4"
          />

          <Button
            disabled={loading}
            type="submit"
            className=" text-white hover:cursor-pointer"
          >
            {loading ? "Envoi en cours..." : "Recevoir les instructions"}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordEmail;
