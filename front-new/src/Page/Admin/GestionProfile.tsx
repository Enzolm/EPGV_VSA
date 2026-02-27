import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useEditMyProfile,
  useGetProfileImage,
  useGetUtilisateurById,
} from "@/hooks/useUtilisateur";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { useUserStore } from "@/lib/store/userStore";

const GestionProfile = ({
  id,
  onClose,
}: {
  id: number | null;
  onClose: () => void;
}) => {
  const { imageUrl, loading, error, fetchImageUrl } = useGetProfileImage();
  const {
    utilisateur,
    loading: utilisateurLoading,
    error: utilisateurError,
  } = useGetUtilisateurById(id?.toString() || "");
  const { register, control, handleSubmit, setValue } = useForm();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {
    editMyProfile,
    loading: updateLoading,
    error: updateError,
    success,
  } = useEditMyProfile();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (id !== null) {
      fetchImageUrl(id.toString());
    }
  }, [id]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (utilisateur) {
      console.log("Utilisateur chargé :", utilisateur);
      setValue("nom", utilisateur.nom);
      setValue("prenom", utilisateur.prenom);
      setValue("email", utilisateur.email);
    }
    console.log(
      "Dépendances de useEffect ?????????????????????????????????????????????????????????????????????????????????:",
      utilisateur,
    );
  }, [utilisateur, loading, utilisateurLoading, setValue]);

  const onSubmit = async (data: any) => {
    const response = await editMyProfile(data, id?.toString() || "");
    if (response.success) {
      toast.success("Profil mis à jour avec succès !");
      setUser({ ...utilisateur, ...data });
      onClose();
    } else {
      toast.error(
        "Erreur lors de la mise à jour du profil : " + response.message,
      );
    }
  };

  return (
    <div>
      {loading && <p>Chargement de l'image de profil...</p>}
      {error && <p>Erreur lors du chargement de l'image de profil</p>}
      <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="min-w-16 group/item relative flex items-center justify-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Photo de profil"
              className="w-16 h-16 rounded-full bg-gray-200 object-cover p-0 m-0"
            />
          ) : (
            <img
              src={imageUrl}
              alt="Photo de profil"
              className="w-16 h-16 rounded-full bg-gray-200 object-cover p-0 m-0"
            />
          )}
          <Plus className="absolute w-9 h-9 group-hover/item:text-white text-transparent transition-colors duration-200 rounded-full p-1" />
          <Controller
            control={control}
            name="profileImage"
            defaultValue={null}
            render={({ field: { onChange, ref, name, onBlur } }) => (
              <Input
                type="file"
                ref={ref}
                name={name}
                onBlur={onBlur}
                accept="image/*"
                className="absolute border-2 shadow-none w-16 h-16 opacity-0 rounded-full hover:cursor-pointer p-0 m-0"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  onChange(file); // met le File dans react-hook-form

                  if (previewUrl) URL.revokeObjectURL(previewUrl);
                  setPreviewUrl(file ? URL.createObjectURL(file) : null);
                }}
              />
            )}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex gap-2">
            <Input {...register("nom")} type="text" placeholder="Nom" />
            <Input {...register("prenom")} type="text" placeholder="Prénom" />
          </div>
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
          ></Input>
          <Button
            disabled={updateLoading}
            type="submit"
            className="bg-green-900 text-white hover:bg-green-700 self-end"
          >
            {updateLoading
              ? "Enregistrement en cours..."
              : "Enregistrer les modifications"}
            <Save className="ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GestionProfile;
