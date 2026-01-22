import { data, useLocation, useParams } from "react-router";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useCreateArticle, useArticleById } from "@/hooks/useArticle";
import type { Article } from "@/hooks/useArticle";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

function Actus_edition() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const { id } = useParams<{ id: string }>();
  const isCreationRoute = location.pathname === `/gestion/actus/edition/${id}`;
  const { loading, createArticle, error, success } = useCreateArticle();
  const {
    article: existingArticle,
    loading: loadingArticle,
    error: errorArticle,
  } = useArticleById("1");
  const { register, handleSubmit, control } = useForm<Partial<Article>>();

  const onSubmit: SubmitHandler<Partial<Article>> = (data) => {
    const formData = new FormData();

    formData.append("titre", existingArticle?.titre || "");
    formData.append("type", existingArticle?.type || "");
    formData.append("statut", isDraft ? "brouillon" : "publie");

    // Vérifier que le fichier existe et prendre le premier fichier du FileList
    if (data.img && data.img[0]) {
      formData.append("img", data.img[0]);
    }

    console.log("Données envoyées:", {
      titre: data.titre,
      type: data.type,
      statut: isDraft ? "brouillon" : "publie",
      hasFile: !!(data.img && data.img[0]),
    });

    // createArticle(formData);
  };

  useEffect(() => {
    if (success) {
      toast.success("Article modifié avec succès !");
    }
  }, [success]);

  useEffect(() => {
    if (isCreationRoute) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isCreationRoute]);

  return (
    <div
      className={`flex flex-col gap-4 transition-all duration-300 ease-out overflow-hidden ${
        isVisible ? "w-1/2" : "w-0"
      }`}
    >
      <h2 className="mb-4 text-2xl font-bold text-green-800">
        Modifier une publication
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Input
            {...register("titre")}
            type="text"
            defaultValue={existingArticle?.titre}
            placeholder="Titre de l'article"
          />
        </div>
        <div>
          <Controller
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={existingArticle?.type}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner le type d'article" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="evenement">Evènement</SelectItem>
                  <SelectItem value="actualite">Actualité</SelectItem>
                  <SelectItem value="annonce">Annonce</SelectItem>
                </SelectContent>
              </Select>
            )}
            control={control}
            name="type"
          />
        </div>
        <Input {...register("img")} type="file" />

        <div className="items-end flex gap-2 mt-auto flex-nowrap">
          {existingArticle?.statut === "brouillon" && (
            <Button type="submit" disabled={loading}>
              Publier
            </Button>
          )}
          <Button disabled={loading}>Modifier</Button>
          <Button onClick={() => navigate("/gestion/actus")}>Retour</Button>
        </div>
      </form>
    </div>
  );
}

export default Actus_edition;
