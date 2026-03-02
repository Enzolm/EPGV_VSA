import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useChangePassword } from "@/hooks/useAuth";
import { toast } from "sonner";

const GestionPassword = ({
  id,
  onClose,
}: {
  id: number | null;
  onClose: () => void;
}) => {
  const { register, handleSubmit, watch } = useForm();
  const [samePasswordError, setSamePasswordError] = useState<string | null>(
    null,
  );
  const { changePassword, loading } = useChangePassword();

  useEffect(() => {
    setSamePasswordError(null);
  }, [watch("password"), watch("confirmPassword"), watch("oldPassword")]);

  const onSubmit = async (data: any) => {
    if (data.oldPassword === "") {
      setSamePasswordError("Veuillez entrer votre mot de passe actuel");
    } else if (data.oldPassword === data.password) {
      setSamePasswordError(
        "Le nouveau mot de passe doit être différent de l'ancien",
      );
    } else if (data.password !== data.confirmPassword) {
      setSamePasswordError("Les mots de passe ne correspondent pas");
    } else {
      setSamePasswordError(null);
      if (id) {
        const response = await changePassword(
          id,
          data.oldPassword,
          data.password,
          data.confirmPassword,
        );
        if (response && response.success) {
          onClose();
          toast.success(response.message || "Mot de passe changé avec succès");
        } else {
          setSamePasswordError(
            response?.message || "Erreur lors du changement de mot de passe",
          );
        }
      }
    }
  };

  return (
    <>
      <div>
        <form
          action="submit"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2 mb-4">
            <Label>Ancien mot de passe</Label>
            <Input
              type="password"
              placeholder="Ancien mot de passe"
              {...register("oldPassword")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Nouveau mot de passe</Label>
            <Input
              type="password"
              placeholder="Nouveau mot de passe"
              {...register("password")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Confirmer le nouveau mot de passe</Label>
            <Input
              type="password"
              placeholder="Confirmer le nouveau mot de passe"
              {...register("confirmPassword")}
            />
          </div>
          <Button
            disabled={loading}
            type="submit"
            className="bg-green-900 text-white hover:bg-green-700"
          >
            {loading ? "Modification en cours..." : "Modifier mon mot de passe"}
          </Button>
          {samePasswordError && (
            <p className="text-red-500 text-start">{samePasswordError}</p>
          )}
        </form>
      </div>
    </>
  );
};

export default GestionPassword;
