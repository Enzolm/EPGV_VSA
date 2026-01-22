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
import { useUpdateArticle, useArticleById } from "@/hooks/useArticle";
import type { Article } from "@/hooks/useArticle";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import type { Editor } from "@tiptap/react";

function Actus_edition() {
  const location = useLocation();
  const navigate = useNavigate();
  const [editorValue, setEditorValue] = useState<Editor | null>(null);
  const [isDraft, setIsDraft] = useState(false);
  const { id } = useParams<{ id: string }>();

  const { loading, updateArticle, error, success } = useUpdateArticle(id || "");
  const {
    article: existingArticle,
    imageUrl,
    loading: loadingArticle,
    error: errorArticle,
  } = useArticleById(id || null);

  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const { register, handleSubmit, control, setValue } = useForm<
    Partial<Article>
  >({
    defaultValues: {
      type: existingArticle?.type || "",
      titre: existingArticle?.titre || "",
    },
  });

  useEffect(() => {
    if (existingArticle?.type) {
      setValue("type", existingArticle.type);
    }
    if (existingArticle?.titre) {
      setValue("titre", existingArticle.titre);
    }
  }, [existingArticle, setValue]);

  useEffect(() => {
    if (existingArticle?.description && editorValue) {
      editorValue.commands.setContent(existingArticle.description);
    }
  }, [existingArticle, editorValue]);

  const onSubmit: SubmitHandler<Partial<Article>> = (data) => {
    const formData = new FormData();

    formData.append("titre", data.titre || "");
    formData.append("type", data.type || existingArticle?.type || "");
    formData.append("statut", isDraft ? "brouillon" : "publie");
    formData.append("description", editorValue ? editorValue.getHTML() : "");

    if (data.img && data.img[0]) {
      formData.append("img", data.img[0]);
    }

    if (removeImage) {
      formData.append("removeImage", "true");
    }

    updateArticle(formData);
  };

  useEffect(() => {
    if (success) {
      toast.success("Article modifié avec succès !");
      navigate("/gestion/actus");
    }
  }, [success]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setLocalPreview(preview);
      setRemoveImage(false);
    }
  };

  const handleRemoveImage = () => {
    setLocalPreview(null);
    setRemoveImage(true);
  };

  return (
    <div className="flex flex-col gap-4 transition-all duration-300 ease-out overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="items-center justify-between flex gap-2 mt-auto flex-nowrap align-middle">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-green-800">
              Actualités
            </h2>
            <p className="text-gray-700">
              Créez une nouvelle actualité pour informer les membres du club des
            </p>
          </div>
          <div className="flex-nowrap gap-2 flex">
            {existingArticle?.statut === "brouillon" && (
              <Button type="submit" disabled={loading}>
                Publier
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              Modifier
            </Button>
            <Button onClick={() => navigate("/gestion/actus")}>Retour</Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            {...register("titre")}
            type="text"
            placeholder="Titre de l'article"
          />
        </div>

        <div>
          <Controller
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
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

        <div className="flex flex-col gap-2">
          {(localPreview || imageUrl) && !removeImage && (
            <img
              src={localPreview || imageUrl || undefined}
              alt="Aperçu"
              className="h-40 w-auto rounded border"
            />
          )}

          <div className="flex gap-2">
            {(localPreview || imageUrl) && !removeImage && (
              <Button
                type="button"
                variant="secondary"
                onClick={handleRemoveImage}
              >
                Supprimer l'image
              </Button>
            )}
          </div>

          <Input {...register("img")} type="file" onChange={handleFileChange} />
        </div>

        <div className="">
          <SimpleEditor onEditorReady={setEditorValue} />
        </div>
      </form>
    </div>
  );
}

export default Actus_edition;
