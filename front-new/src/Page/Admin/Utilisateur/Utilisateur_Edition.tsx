import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useAdminEditProfile,
  useGetUtilisateurById,
} from "@/hooks/useUtilisateur";
import { useEffect } from "react";
import { toast } from "sonner";

const UtilisateurEdition = ({
  id,
  onClose,
}: {
  id: string | null;
  onClose: () => void;
}) => {
  const { register, handleSubmit, control, setValue } = useForm();
  const { editProfile, loading: updateLoading } = useAdminEditProfile();
  const { utilisateur } = useGetUtilisateurById(id?.toString() || "");

  useEffect(() => {
    if (id && utilisateur) {
      setValue("nom", utilisateur.nom);
      setValue("prenom", utilisateur.prenom);
      setValue("email", utilisateur.email);
      setValue("role", utilisateur.role);
      setValue("isAdmin", utilisateur.isAdmin ? 1 : 0);
    }
  }, [id, utilisateur, setValue]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log("Données du formulaire à soumettre:", data);
    if (id) {
      const response = await editProfile(data, id);
      if (response.success) {
        toast.success(response.message);
        onClose();
      }
    }
  };

  return (
    <>
      <form action="submit" className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div>
            <label htmlFor="nom">Nom</label>
            <Input
              {...register("nom", { required: true })}
              type="text"
              placeholder="Nom"
            />
          </div>
          <div>
            <label htmlFor="prenom">Prénom</label>
            <Input
              {...register("prenom", { required: true })}
              type="text"
              placeholder="Prénom"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="role">Rôle</label>
          <Controller
            name="role"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger className="border border-gray-300 rounded-md p-2 mb-4 w-full text-left">
                  <SelectValue placeholder="Rôle de l'utilisateur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="president">Président(e)</SelectItem>
                  <SelectItem value="tresorier">Trésorier(ère)</SelectItem>
                  <SelectItem value="secretaire">Secrétaire</SelectItem>
                  <SelectItem value="secretaire-adjoint">Membre</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="flex items-center">
          <Controller
            name="isAdmin"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value === 1 ? true : false}
                id="isAdmin"
                className="mb-4"
                onCheckedChange={(checked) =>
                  setValue("isAdmin", checked ? 1 : 0)
                }
                {...field}
              />
            )}
          />
          <label htmlFor="isAdmin" className="ml-2 mb-4">
            Definir en tant qu'administrateur
          </label>
        </div>
        <Button
          disabled={updateLoading}
          type="submit"
          className="bg-green-900 text-white hover:bg-green-700 self-end"
          onClick={handleSubmit(onSubmit)}
        >
          {updateLoading
            ? "Enregistrement en cours..."
            : "Enregistrer les modifications"}
        </Button>
      </form>
    </>
  );
};

export default UtilisateurEdition;
