import { Checkbox } from "@/components/ui/checkbox";
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
import { useCreateUtilisateur } from "@/hooks/useUtilisateur";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

type FormData = {
  nom: string;
  prenom: string;
  email: string;
  role: string;
  isAdmin: string;
};

const Utilisateur_creation = () => {
  const { createUtilisateur, loading, error } = useCreateUtilisateur();
  const { register, handleSubmit, control, setValue } = useForm<FormData>({
    defaultValues: {
      isAdmin: "false",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    createUtilisateur({
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      role: data.role,
      isAdmin: data.isAdmin === "true" ? true : false,
    });
  };

  return (
    <>
      <section id="info" className="flex flex-col">
        <div className="flex flex-col align-center justify-between w-2/2 items-center">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-green-800">
              Création d'un utilisateur
            </h2>
            <p className="text-gray-700">
              Remplissez le formulaire ci-dessous pour créer un nouvel
              utilisateur. Le nouvel utilisateur recevra un e-mail qui lui
              permettra de définir son mot de passe et de se connecter à son
              compte.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-88">
            <div className="flex md:gap-4 flex-wrap md:flex-nowrap ">
              <Field>
                <FieldLabel>Nom</FieldLabel>
                <Input
                  type="text"
                  placeholder="Nom"
                  className="border border-gray-300 rounded-md p-2 mb-4 min-w-28"
                  {...register("nom", { required: true })}
                />
              </Field>
              <Field>
                <FieldLabel>Prénom</FieldLabel>
                <Input
                  type="text"
                  placeholder="Prénom"
                  className="border border-gray-300 rounded-md p-2 mb-4 min-w-28"
                  {...register("prenom", { required: true })}
                />
              </Field>
            </div>
            <Field data-invalid={error === "Email déjà utilisé" ? true : false}>
              <FieldLabel>Adresse e-mail</FieldLabel>
              <Input
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded-md p-2"
                {...register("email", { required: true })}
              />
              <FieldDescription className="mb-4 text-red-600">
                {error === "Email déjà utilisé"
                  ? "Cette adresse e-mail est déjà utilisée."
                  : ""}
              </FieldDescription>
            </Field>
            <Select
              onValueChange={(value) => setValue("role", value)}
              {...register("role", { required: true })}
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
            <div className="flex items-center">
              <Controller
                name="isAdmin"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="isAdmin"
                    className="mb-4"
                    onCheckedChange={(checked) =>
                      setValue("isAdmin", checked ? "true" : "false")
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
              disabled={loading}
              type="submit"
              className="bg-green-800 text-white rounded-md p-2 hover:bg-green-700"
            >
              {loading ? "Création en cours..." : "Créer l'utilisateur"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Utilisateur_creation;
