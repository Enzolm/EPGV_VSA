import { data, useLocation } from "react-router";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useCreateArticle } from "@/hooks/useArticle";
import type { Article } from "@/hooks/useArticle";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import type { Editor } from "@tiptap/core";

function Actus_creation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDraft, setIsDraft] = useState(false);
  const { loading, createArticle, error, success } = useCreateArticle();
  const { register, handleSubmit, control } = useForm<Partial<Article>>();
  const [editorValue, setEditorValue] = useState<Editor | null>(null);

  const onSubmit: SubmitHandler<Partial<Article>> = (data) => {
    const formData = new FormData();

    formData.append("titre", data.titre || "");
    formData.append("type", data.type || "");
    formData.append("description", editorValue ? editorValue.getHTML() : "");
    formData.append("statut", isDraft ? "brouillon" : "publie");

    if (data.img && data.img[0]) {
      formData.append("img", data.img[0]);
    }

    console.log("Données envoyées:", {
      titre: data.titre,
      type: data.type,
      description: editorValue ? editorValue.getHTML() : "",
      statut: isDraft ? "brouillon" : "publie",
      hasFile: !!(data.img && data.img[0]),
    });

    console.log("FormData entries:" + formData);

    createArticle(formData);
  };

  useEffect(() => {
    if (success) {
      navigate("/gestion/actus");
      toast.success("Article créé avec succès !");
    }
  }, [success]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="items-center justify-between flex gap-2 mt-auto flex-nowrap align-middle">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-green-800">Actualités</h2>
          <p className="text-gray-700">
            Créez une nouvelle actualité pour informer les membres du club des
          </p>
        </div>
        <div className="flex-nowrap gap-2 flex">
          <Button
            onClick={() => setIsDraft(false)}
            type="submit"
            disabled={loading}
          >
            Publier
          </Button>
          <Button onClick={() => setIsDraft(true)} disabled={loading}>
            Enregistrer le brouillon
          </Button>
          <Button onClick={() => navigate("/gestion/actus")}>Retour</Button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                  <SelectItem value="annonce_importante">
                    Annonce importante
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
            control={control}
            name="type"
          />
        </div>
        <Input {...register("img")} type="file" />
        <div className="">
          <SimpleEditor onEditorReady={setEditorValue} />
        </div>
      </form>
    </div>
  );
}

export default Actus_creation;
