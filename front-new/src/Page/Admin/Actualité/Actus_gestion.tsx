import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Actus_creation from "@/Page/Admin/Actualité/Actus_creation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAdminAllArticles, useDeleteArticle } from "@/hooks/useArticle";
import type { Article } from "@/hooks/useArticle";
import { Info } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Megaphone } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Actus_edition from "./Actus_Edition";
import { toast } from "sonner";

function ActusGesiton() {
  const navigate = useNavigate();
  const [DialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [SelectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { articles, loading, error, refresh } = useAdminAllArticles();
  const {
    deleteArticle,
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = useDeleteArticle(SelectedArticle ? SelectedArticle.id_publication : "");

  useEffect(() => {
    if (deleteError) {
      toast.error(`Erreur lors de la suppression: ${deleteError}`);
    }
  }, [deleteError]);

  useEffect(() => {
    if (deleteSuccess) {
      setDialogDeleteOpen(false);
      setSelectedArticle(null);
      toast.success("Article supprimé avec succès !");
      refresh();
    }
  }, [deleteSuccess]);

  if (loading) {
    return <div>Chargement des articles...</div>;
  }

  const handledeleteArticle = () => {
    if (SelectedArticle) {
      deleteArticle();
    }
  };

  console.log("Articles administrateur chargés:", articles);

  return (
    <div className="flex flex-nowrap gap-8 h-full">
      <Dialog open={DialogDeleteOpen} onOpenChange={setDialogDeleteOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Supprimer une publication</DialogTitle>
            <DialogDescription>
              Voulez-vous réellement supprimer la publication:{" "}
              {SelectedArticle?.titre} ?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button
              variant="destructive"
              type="submit"
              onClick={handledeleteArticle}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Suppression..." : "Supprimer la publication"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div
        className={`flex flex-col gap-4 transition-all duration-300 ease-out overflow-hidden w-full
        }`}
      >
        <section id="info" className="flex">
          <div className="flex align-center justify-between w-2/2 items-center">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-green-800">
                Actualités
              </h2>
              <p className="text-gray-700">
                Ajoutez, modifiez ou supprimez des articles pour tenir vos
                visiteurs informés des dernières nouvelles et événements.
              </p>
            </div>
            <Button
              className="align-center "
              onClick={() => navigate("/gestion/actus/creation")}
            >
              Créer une publication
            </Button>
          </div>
        </section>
        <section id="actu-list" className="flex flex-wrap gap-4">
          {loading &&
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className=" relative border border-black/10 w-71.75 rounded-lg bg-white hover:shadow-md cursor-pointer mb-4 animate-pulse"
              >
                <Skeleton className="h-30" />
                <div className="p-4">
                  <Skeleton className="h-6 mb-2 w-3/4" />
                  <Skeleton className="h-4 mb-2 w-1/2" />
                  <Skeleton className="h-4 mb-2 w-full" />
                  <Skeleton className="h-4 mb-4 w-5/6" />
                  <div className="flex gap-4 flex-col mt-2">
                    <hr className=" " />
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-8 bg-gray-300 w-20"></Skeleton>
                      <Skeleton className="h-8 bg-gray-300 w-20"></Skeleton>
                      <Skeleton className="h-8 bg-gray-300 w-20"></Skeleton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {!loading &&
            articles.map((article) => (
              <div
                key={article.id_publication}
                className=" relative border border-black/10 w-71.75 rounded-lg bg-white hover:shadow-md cursor-pointer mb-4 overflow-hidden "
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="absolute bottom-0 right-0"
                      variant="ghost"
                    >
                      <Info className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="flex-col gap-6">
                    <p className="mb-2">
                      Dernière modification:{" "}
                      {new Date(article.updated_at).toLocaleDateString(
                        "fr-FR",
                        {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                    <p className="mb-2">
                      Créer le:{" "}
                      {new Date(article.created_at).toLocaleDateString(
                        "fr-FR",
                        {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                    <p>
                      Publié le:{" "}
                      {new Date(article.publication_date).toLocaleDateString(
                        "fr-FR",
                        {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </TooltipContent>
                </Tooltip>
                <img
                  className="w-full h-48 object-cover"
                  src={`${import.meta.env.VITE_URL_UPLOAD}/${article.img}`}
                  alt={article.titre}
                />
                <div className="p-4">
                  <div className="flex gap-2 mt-3 pl-4">
                    {article.type === "annonce_importante" && (
                      <Megaphone className="text-yellow-500" />
                    )}
                    <p
                      className={`text-sm font-normal ${article.type === "annonce_importante" ? "text-yellow-500" : "text-primary"}`}
                    >
                      {" "}
                      {article?.type === "actualite"
                        ? "Actualité"
                        : article?.type === "evenement"
                          ? "Événement"
                          : article?.type === "annonce"
                            ? "Annonce"
                            : article?.type === "annonce_importante"
                              ? "Annonce importante"
                              : ""}
                    </p>
                  </div>
                  <h3>{article.titre}</h3>
                  {article.statut === "brouillon" ? (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Brouillon créer le{" "}
                      {new Date(article.created_at).toLocaleDateString(
                        "fr-FR",
                        {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                        },
                      )}
                    </Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-800">
                      Publié le{" "}
                      {new Date(article.publication_date).toLocaleDateString(
                        "fr-FR",
                        {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                        },
                      )}
                    </Badge>
                  )}
                  <p className="line-clamp-3 h-18">description</p>
                  <div className="flex gap-4 flex-col mt-2">
                    <hr className=" " />
                    <div className="flex gap-2 mb-4">
                      <Button
                        onClick={() =>
                          navigate(
                            `/gestion/actus/edition/${article.id_publication}`,
                          )
                        }
                        color="tertiary"
                        className=""
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setSelectedArticle(article);
                          setDialogDeleteOpen(true);
                        }}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </section>
      </div>
    </div>
  );
}

export default ActusGesiton;
